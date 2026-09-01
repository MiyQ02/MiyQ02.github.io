/* ==========================================================================
   cursor-settings.js — 網頁自訂游標切換（僅桌機三個頁面）
   --------------------------------------------------------------------------
   ▸ 100% 尺寸：游標集的 --cur-* 變數靜態寫在 cursor-settings.css，
     換頁首幀由頁內 head 的內联腳本提前設 <html data-cursor>，不需 JS 注入。
   ▸ 非 100% 尺寸：CSS 無法直接放大 .cur，故用 canvas 把 .cur 重繪成
     64×比例 的 PNG dataURL 產生覆蓋樣式（--cur-* 改指 dataURL），
     并把結果快取到 localStorage，讓「重整後首幀」能同步套用。
   ▸ 多語翻譯：見 I18N（zh-TW / en / ja）。角色顯示名改 roles / borders。
   ▸ grab / grabbing / zoom-in / zoom-out 為 Windows 正常無法替換、
     且作者未製作 .cur 的狀態，一律不套自訂游標（維持原生）。
   ========================================================================== */
(function () {
    'use strict';

    /* 只在桌機頁運作：手機版（mobile-navbar）完全跳過 */
    if (document.querySelector('.mobile-navbar') ||
        /_mobile\.html$/.test(location.pathname)) {
        return;
    }

    /* ===== 儲存機制 ===== */
    const STORAGE_KEY = 'cursor-set';
    const SCALE_KEY = 'cursor-scale';
    const IMG_CACHE_KEY = 'cursorImgCacheV2';  /* 最近鄰版；換鍵讓舊平滑快取失效 */
    const CSS_CACHE_KEY = 'cursorCssCacheV2';  /* 最近鄰版覆蓋樣式快取 */
    const DEFAULT_VALUE = 'default';
    const SCALE_MAX = 200;                        /* 最高 200%（更大瀏覽器顯示不了） */
    const CUR_BASE_PX = 64;                       /* .cur 內嵌圖為 64×64 */

    /* 四檔大小按鈕：預設 / 小 / 中 / 大 = 100 / 125 / 150 / 200%（互不相同） */
    const SIZE_OPTIONS = [
        { scale: 100, key: 'default' },
        { scale: 125, key: 'small' },
        { scale: 150, key: 'medium' },
        { scale: 200, key: 'large' }
    ];

    /* ===== 游標集清單 ===== */
    const CURSOR_SETS = [
        { id: 'Chito/no_border',     role: 'Chito',   border: 'no_border' },
        { id: 'Chito/white_border',  role: 'Chito',   border: 'white_border' },
        { id: 'Yuuri/no_border',     role: 'Yuuri',   border: 'no_border' },
        { id: 'Yuuri/white_border',  role: 'Yuuri',   border: 'white_border' },
        { id: 'Shijima/no_border',   role: 'Shijima', border: 'no_border' },
        { id: 'Shijima/white_border', role: 'Shijima', border: 'white_border' },
        { id: 'Majime/no_border',    role: 'Majime',  border: 'no_border' },
        { id: 'Majime/white_border', role: 'Majime',  border: 'white_border' }
    ];
    const CURSET_BASE_URL = 'page_cursor/';

    /* 依角色分組（左欄每個角色一列：無邊框 / 白邊框 並排） */
    const ROLES = ['Chito', 'Yuuri', 'Shijima', 'Majime'];

    /* Cursor-Test 右欄：只列 page_cursor 實際存在的 17 種狀態。
       [檔名, 原生 fallback 關鍵字, hotspot]。標籤維持英文檔名。
       Person / Pin / Handwriting 在「預設游標」下各自用不同、且非純箭頭
       的原生關鍵字（cell / context-menu / copy），避免三格看起來一模一樣。 */
    const CURSOR_TEST_STATES = [
        ['Normal', 'auto', '0 0'],
        ['Link', 'pointer', '0 0'],
        ['Text', 'text', '9 11'],
        ['Busy', 'wait', '32 32'],
        ['Working', 'progress', '0 0'],
        ['Alternate', 'alias', '32 32'],
        ['Move', 'move', '32 32'],
        ['Precision', 'crosshair', '32 32'],
        ['Handwriting', 'copy', '0 0'],
        ['Help', 'help', '0 0'],
        ['Person', 'cell', '0 0'],
        ['Pin', 'context-menu', '0 0'],
        ['Unavailable', 'not-allowed', '0 0'],
        ['Horizontal', 'ew-resize', '32 32'],
        ['Vertical', 'ns-resize', '32 32'],
        ['Diagonal1', 'nwse-resize', '32 32'],
        ['Diagonal2', 'nesw-resize', '32 32']
    ];

    /* 站方 CSS 實際用到的四個覆蓋變數（縮放時只需重建這四個）
       [CSS 變數後綴, 檔名, baseHotX, baseHotY, 原生關鍵字] */
    const PAGE_CURSOR_STATES = [
        ['normal', 'Normal', 0, 0, 'auto'],
        ['link', 'Link', 0, 0, 'pointer'],
        ['text', 'Text', 9, 11, 'text'],
        ['not-allowed', 'Unavailable', 0, 0, 'not-allowed']
    ];

    /* ===== 多語翻譯（使用者要改游標顯示名稱，改 roles / borders） ===== */
    const I18N = {
        'zh-TW': {
            settingsLabel: '游標設定',
            modalTitle: '游標設定',
            closeLabel: '關閉',
            defaultOption: '恢復預設游標',
            hint: '點選即可即時切換；游標移到選項上可直接試用該組游標。選擇會自動記住，換頁或重新整理都會保留。',
            chooseCursor: '游標集',
            sizeLabel: '游標大小',
            sizeHint: '僅套用於自訂游標集；恢復預設游標時不可調整。',
            sizeOptions: { default: '預設', small: '小', medium: '中', large: '大' },
            testEmpty: '請在左邊選擇一個游標',
            roles: { Chito: '千都', Yuuri: '尤莉', Shijima: '靜寂', Majime: '真面目' },
            borders: { no_border: '無邊框', white_border: '白邊框' }
        },
        'en': {
            settingsLabel: 'Cursor settings',
            modalTitle: 'Cursor settings',
            closeLabel: 'Close',
            defaultOption: 'Restore default cursor',
            hint: 'Pick one to switch instantly. Hover an option to try its cursor. Your choice is saved and kept across pages and reloads.',
            chooseCursor: 'Cursor sets',
            sizeLabel: 'Cursor size',
            sizeHint: 'Applies to custom cursor sets only; disabled for the default cursor.',
            sizeOptions: { default: 'Default', small: 'Small', medium: 'Medium', large: 'Large' },
            testEmpty: 'Select a cursor on the left',
            roles: { Chito: 'Chito', Yuuri: 'Yuuri', Shijima: 'Shijima', Majime: 'Majime' },
            borders: { no_border: 'No border', white_border: 'White border' }
        },
        'ja': {
            settingsLabel: 'カーソル設定',
            modalTitle: 'カーソル設定',
            closeLabel: '閉じる',
            defaultOption: '既定のカーソルに戻す',
            hint: 'クリックで即座に切り替わります。オプションにカーソルを合わせると試用できます。選択は保存され、ページ移動や更新後も維持されます。',
            chooseCursor: 'カーソル集合',
            sizeLabel: 'カーソルサイズ',
            sizeHint: 'カスタムカーソルのみに適用。既定のカーソルでは調整できません。',
            sizeOptions: { default: '既定', small: '小', medium: '中', large: '大' },
            testEmpty: '左側からカーソルを選択してください',
            roles: { Chito: 'チト', Yuuri: 'ユーリ', Shijima: 'シジマ', Majime: 'マジメ' },
            borders: { no_border: '枠なし', white_border: '白枠' }
        }
    };

    /* ===== 小工具 ===== */
    function normalizeLang(lang) {
        return lang === 'en' || lang === 'ja' ? lang : 'zh-TW';
    }

    function currentLang() {
        return normalizeLang(document.documentElement.lang || localStorageGet('lang') || 'zh-TW');
    }

    function t(key) {
        const dict = I18N[currentLang()] || I18N['zh-TW'];
        return dict[key];
    }

    function setLabel(cursorSet) {
        const roles = t('roles');
        const borders = t('borders');
        return (roles[cursorSet.role] || cursorSet.role) + '・' + (borders[cursorSet.border] || cursorSet.border);
    }

    function localStorageGet(key) {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }

    function localStorageSet(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            /* 無痕模式：忽略儲存失敗 */
        }
    }

    function readJson(key) {
        try {
            return JSON.parse(localStorageGet(key) || '{}') || {};
        } catch (error) {
            return {};
        }
    }

    function readStoredSet() {
        const value = localStorageGet(STORAGE_KEY);
        if (!value || value === DEFAULT_VALUE) {
            return DEFAULT_VALUE;
        }
        const exists = CURSOR_SETS.some(function (set) { return set.id === value; });
        return exists ? value : DEFAULT_VALUE;
    }

    /* 把任意值對齊到四檔之一（並夾在 100–200 內），讓舊 localStorage 值自動修正 */
    function clampScale(v) {
        if (isNaN(v)) {
            return 100;
        }
        const bounded = Math.min(SCALE_MAX, Math.max(100, v));
        let best = SIZE_OPTIONS[0].scale;
        let bestDiff = Math.abs(bounded - best);
        SIZE_OPTIONS.forEach(function (opt) {
            const diff = Math.abs(bounded - opt.scale);
            if (diff < bestDiff) {
                best = opt.scale;
                bestDiff = diff;
            }
        });
        return best;
    }

    function readStoredScale() {
        return clampScale(parseInt(localStorageGet(SCALE_KEY), 10));
    }

    /* ===== 縮放游標產生（canvas 重繪 .cur → PNG dataURL） ===== */
    function scaledHotspot(baseX, baseY, scale) {
        return Math.round(baseX * scale / 100) + ' ' + Math.round(baseY * scale / 100);
    }

    function fileUrl(setId, file) {
        return CURSET_BASE_URL + setId + '/' + file + '.cur';
    }

    /* 回傳 Promise<dataURL>：把 setId/file 的 .cur 以 scale% 重繪為 PNG。
       已有快取則直接回傳（同步值包成 Promise 統一介面）。 */
    const inflight = {};
    function scaledCursor(setId, file, scale) {
        const imgCache = readJson(IMG_CACHE_KEY);
        const ckey = setId + '|' + scale + '|' + file;
        if (imgCache[ckey]) {
            return Promise.resolve(imgCache[ckey]);
        }
        if (inflight[ckey]) {
            return inflight[ckey];
        }
        inflight[ckey] = new Promise(function (resolve) {
            const img = new Image();
            img.onload = function () {
                let dataUrl = '';
                try {
                    const size = Math.round(CUR_BASE_PX * scale / 100);
                    const canvas = document.createElement('canvas');
                    canvas.width = size;
                    canvas.height = size;
                    const ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, size, size);
                    ctx.imageSmoothingEnabled = false;   /* 最近鄰：硬邊鋸齒、不模糊 */
                    ctx.drawImage(img, 0, 0, size, size);   /* imageSmoothingEnabled=false 套在 drawImage 前 */
                    dataUrl = canvas.toDataURL('image/png');
                } catch (error) {
                    dataUrl = '';   /* 不透明來源或 canvas 受限：退回靜態檔案游標 */
                }
                if (dataUrl) {
                    const cache = readJson(IMG_CACHE_KEY);
                    cache[ckey] = dataUrl;
                    localStorageSet(IMG_CACHE_KEY, JSON.stringify(cache));
                }
                delete inflight[ckey];
                resolve(dataUrl);
            };
            img.onerror = function () {
                delete inflight[ckey];
                resolve('');
            };
            img.src = fileUrl(setId, file);
        });
        return inflight[ckey];
    }

    /* 產生覆蓋 CSS：:root[data-cursor="setId"] 內把四個 --cur-* 換成 dataURL */
    function buildScaleCss(setId, scale) {
        return Promise.all(PAGE_CURSOR_STATES.map(function (row) {
            return scaledCursor(setId, row[1], scale);
        })).then(function (urls) {
            const lines = [':root[data-cursor="' + setId + '"]{'];
            let complete = true;
            PAGE_CURSOR_STATES.forEach(function (row, i) {
                if (!urls[i]) {
                    complete = false;
                    return;
                }
                const hot = scaledHotspot(row[2], row[3], scale);
                lines.push('--cur-' + row[0] + ': url("' + urls[i] + '") ' + hot + ', ' + row[4] + ';');
            });
            lines.push('}');
            if (!complete) {
                return '';   /* 有素材未取得 → 不覆蓋，維持靜態檔案游標 */
            }
            const css = lines.join('');
            const cssCache = readJson(CSS_CACHE_KEY);
            cssCache[setId + '|' + scale] = css;
            localStorageSet(CSS_CACHE_KEY, JSON.stringify(cssCache));
            return css;
        });
    }

    /* ===== 樣式節點：100% 或預設→移除；非100%→注入覆蓋（先快取同步，再非同步補） ===== */
    function scaleStyleNode() {
        let el = document.getElementById('cursor-scale-style');
        if (!el) {
            el = document.createElement('style');
            el.id = 'cursor-scale-style';
            document.head.appendChild(el);
        }
        return el;
    }

    function applyScaleStyle() {
        const setId = readStoredSet();
        const scale = readStoredScale();
        const el = scaleStyleNode();
        if (setId === DEFAULT_VALUE || scale === 100) {
            el.textContent = '';
            return;
        }
        const cached = readJson(CSS_CACHE_KEY)[setId + '|' + scale];
        if (cached) {
            el.textContent = cached;   /* 首幀同步套用 */
        }
        /* 無論有無快取都確保產生/更新（非同步；產生後覆寫） */
        buildScaleCss(setId, scale).then(function (css) {
            if (css && readStoredSet() === setId && readStoredScale() === scale) {
                document.getElementById('cursor-scale-style').textContent = css;
                if (modal && modal.classList.contains('is-open')) {
                    refreshSelectedState();
                }
            }
        });
    }

    /* ===== 切換 ===== */
    function applySet(setId) {
        const root = document.documentElement;
        if (setId === DEFAULT_VALUE) {
            root.removeAttribute('data-cursor');
        } else {
            root.setAttribute('data-cursor', setId);
        }
        localStorageSet(STORAGE_KEY, setId);
        applyScaleStyle();
    }

    function setScale(scale) {
        const v = clampScale(scale);
        localStorageSet(SCALE_KEY, String(v));
        applyScaleStyle();
        updateSizeControl();
        if (modal && modal.classList.contains('is-open')) {
            refreshSelectedState();
        }
    }

    /* ===== 彈窗 ===== */
    let modal = null;
    let optionButtons = [];

    function optionCursorPreview(setId) {
        return 'url("' + CURSET_BASE_URL + setId + '/Normal.cur") 0 0, auto';
    }

    function buildOptions() {
        const list = modal.querySelector('.cursor-option-list');
        list.innerHTML = '';
        optionButtons = [];

        const defaultButton = document.createElement('button');
        defaultButton.type = 'button';
        defaultButton.className = 'cursor-option cursor-option--default';
        defaultButton.dataset.value = DEFAULT_VALUE;
        defaultButton.innerHTML =
            '<span class="cursor-option-swatch cursor-option-swatch--default" aria-hidden="true"></span>' +
            '<span class="cursor-option-name"></span>';
        defaultButton.querySelector('.cursor-option-name').textContent = t('defaultOption');
        list.appendChild(defaultButton);
        optionButtons.push(defaultButton);

        const roles = t('roles');
        const borders = t('borders');
        ROLES.forEach(function (role) {
            const header = document.createElement('div');
            header.className = 'cursor-option-group-label';
            header.textContent = roles[role] || role;
            list.appendChild(header);

            CURSOR_SETS.filter(function (set) { return set.role === role; })
                .forEach(function (set) {
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.className = 'cursor-option';
                    button.dataset.value = set.id;
                    button.style.setProperty('cursor', optionCursorPreview(set.id), 'important');
                    button.innerHTML =
                        '<span class="cursor-option-swatch" style="--swatch:url(\'' + CURSET_BASE_URL + set.id + '/Normal.cur\')" aria-hidden="true"></span>' +
                        '<span class="cursor-option-name"></span>';
                    button.querySelector('.cursor-option-name').textContent = borders[set.border] || set.border;
                    list.appendChild(button);
                    optionButtons.push(button);
                });
        });

        optionButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                applySet(button.dataset.value);
                refreshSelectedState();
            });
        });
        refreshSelectedState();
    }

    /* 游標大小：預設 / 小 / 中 / 大 四按鈕（僅自訂集可用） */
    function buildSizeControl() {
        const wrap = modal.querySelector('.cursor-size');
        if (!wrap) {
            return;
        }
        wrap.innerHTML =
            '<span class="cursor-size-label"></span>' +
            '<div class="cursor-size-buttons" role="group">' +
                SIZE_OPTIONS.map(function (opt) {
                    return '<button type="button" class="cursor-size-btn" data-scale="' + opt.scale +
                        '" data-key="' + opt.key + '" aria-pressed="false"></button>';
                }).join('') +
            '</div>' +
            '<p class="cursor-size-hint"></p>';
        Array.prototype.forEach.call(wrap.querySelectorAll('.cursor-size-btn'), function (btn) {
            btn.addEventListener('click', function () {
                if (btn.disabled) {
                    return;
                }
                setScale(parseInt(btn.dataset.scale, 10));
            });
        });
        updateSizeControl();
    }

    function updateSizeControl() {
        const wrap = modal && modal.querySelector('.cursor-size');
        if (!wrap) {
            return;
        }
        const scale = readStoredScale();
        const isDefault = readStoredSet() === DEFAULT_VALUE;
        const sizeOpt = t('sizeOptions');
        const label = wrap.querySelector('.cursor-size-label');
        const hint = wrap.querySelector('.cursor-size-hint');
        const group = wrap.querySelector('.cursor-size-buttons');
        if (label) { label.textContent = t('sizeLabel'); }
        if (hint) { hint.textContent = t('sizeHint'); }
        if (group) { group.setAttribute('aria-label', t('sizeLabel')); }
        Array.prototype.forEach.call(wrap.querySelectorAll('.cursor-size-btn'), function (btn) {
            const s = parseInt(btn.dataset.scale, 10);
            btn.textContent = sizeOpt[btn.dataset.key] || (s + '%');
            const selected = !isDefault && s === scale;
            btn.classList.toggle('is-selected', selected);
            btn.setAttribute('aria-pressed', selected ? 'true' : 'false');
            btn.disabled = isDefault;
        });
        wrap.classList.toggle('is-disabled', isDefault);
    }

    /* 右欄 Cursor-Test：預設模式只顯示一行提示；自訂模式顯示 17 格示範 */
    function updateTestGrid(setId) {
        const grid = modal.querySelector('.cursor-test-grid');
        if (!grid) {
            return;
        }
        grid.innerHTML = '';
        if (setId === DEFAULT_VALUE) {
            const empty = document.createElement('div');
            empty.className = 'cursor-test-empty';
            empty.textContent = t('testEmpty');
            grid.appendChild(empty);
            return;
        }
        const scale = readStoredScale();
        CURSOR_TEST_STATES.forEach(function (entry) {
            const file = entry[0];
            const keyword = entry[1];
            const hotspot = entry[2];
            const tile = document.createElement('div');
            tile.className = 'cursor-test-tile';
            tile.style.setProperty('cursor', 'url("' + fileUrl(setId, file) + '") ' + hotspot + ', ' + keyword, 'important');
            if (scale !== 100) {
                /* 非同步取縮放 dataURL 後再套用；先以原始檔案游標佔位 */
                scaledCursor(setId, file, scale).then(function (dataUrl) {
                    if (!dataUrl) {
                        return;
                    }
                    const hot = scaledHotspotFromStr(hotspot, scale);
                    tile.style.setProperty('cursor', 'url("' + dataUrl + '") ' + hot + ', ' + keyword, 'important');
                });
            }
            const label = document.createElement('span');
            label.className = 'cursor-test-label';
            label.textContent = file;
            tile.appendChild(label);
            grid.appendChild(tile);
        });
    }

    function scaledHotspotFromStr(hotspotStr, scale) {
        const parts = hotspotStr.split(' ');
        return Math.round(parseInt(parts[0], 10) * scale / 100) + ' ' +
               Math.round(parseInt(parts[1], 10) * scale / 100);
    }

    function refreshSelectedState() {
        const active = readStoredSet();
        optionButtons.forEach(function (button) {
            const on = button.dataset.value === active;
            button.classList.toggle('is-selected', on);
            button.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        updateSizeControl();
        updateTestGrid(active);
    }

    function updateModalLanguage() {
        if (!modal) {
            return;
        }
        modal.querySelector('.cursor-modal-title').textContent = t('modalTitle');
        modal.querySelector('.cursor-modal-close').setAttribute('aria-label', t('closeLabel'));
        modal.querySelector('.cursor-hint').textContent = t('hint');
        const chooseTitle = modal.querySelector('[data-col="choose"]');
        if (chooseTitle) {
            chooseTitle.textContent = t('chooseCursor');
        }
        const trigger = getTrigger();
        if (trigger) {
            trigger.setAttribute('title', t('settingsLabel'));
        }
        buildOptions();
        updateSizeControl();
    }

    function createModal() {
        const el = document.createElement('div');
        el.id = 'cursor-settings-modal';
        el.className = 'cursor-modal';
        el.setAttribute('role', 'dialog');
        el.setAttribute('aria-modal', 'true');
        el.innerHTML =
            '<div class="cursor-modal-panel">' +
                '<div class="cursor-modal-header">' +
                    '<h2 class="cursor-modal-title"></h2>' +
                    '<button type="button" class="cursor-modal-close" aria-label="">&times;</button>' +
                '</div>' +
                '<div class="cursor-modal-body">' +
                    '<div class="cursor-col cursor-col--left">' +
                        '<h3 class="cursor-col-title" data-col="choose"></h3>' +
                        '<div class="cursor-option-list"></div>' +
                        '<div class="cursor-size"></div>' +
                        '<p class="cursor-hint"></p>' +
                    '</div>' +
                    '<div class="cursor-col cursor-col--right">' +
                        '<h3 class="cursor-col-title">Cursor-Test</h3>' +
                        '<div class="cursor-test-grid"></div>' +
                    '</div>' +
                '</div>' +
            '</div>';
        document.body.appendChild(el);
        return el;
    }

    function getTrigger() {
        return document.getElementById('cursor-settings-btn');
    }

    function openModal() {
        modal.classList.add('is-open');
        getTrigger().setAttribute('aria-expanded', 'true');
        updateModalLanguage();
    }

    function closeModal() {
        modal.classList.remove('is-open');
        getTrigger().setAttribute('aria-expanded', 'false');
    }

    function bindEvents() {
        const trigger = getTrigger();
        if (trigger) {
            trigger.addEventListener('click', openModal);
        }
        modal.querySelector('.cursor-modal-close').addEventListener('click', closeModal);
        modal.addEventListener('click', function (event) {
            if (event.target === modal) {
                closeModal();
            }
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && modal.classList.contains('is-open')) {
                closeModal();
            }
        });
    }

    /* ===== 語言切換跟隨 ===== */
    function watchLanguageChanges() {
        const observer = new MutationObserver(function () {
            updateModalLanguage();
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    }

    /* ===== 跨分頁同步：游標集或尺寸改變即時跟進 ===== */
    function watchStorageChanges() {
        window.addEventListener('storage', function (event) {
            if (event.key !== STORAGE_KEY && event.key !== SCALE_KEY) {
                return;
            }
            applySet(readStoredSet());
            if (modal && modal.classList.contains('is-open')) {
                refreshSelectedState();
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        applySet(readStoredSet());
        modal = createModal();
        buildSizeControl();
        bindEvents();
        updateModalLanguage();
        watchLanguageChanges();
        watchStorageChanges();
    });
})();
