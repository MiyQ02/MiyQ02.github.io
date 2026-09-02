/* ==========================================================
 * 滅Q 下載頁（download-items.js）
 * ----------------------------------------------------------
 * 由 download.html / download_mobile.html 以 <script src="download-items.js" defer> 載入。
 *
 * 資源清單在本檔案上方維護，之後新增資源（桌布等）只需：
 *   1. 在 DL_ITEMS 追加一筆物件
 *   2. preview 放 ./img/download/ 下的展示圖
 *   3. links.win / links.linux 的下載網址由作者填入
 *      （目前為 '#' 佔位，點擊不會跳頁）
 *
 * 名稱／簡介／標籤一律三語（zh-TW / en / ja），
 * 搜尋會比對：三語名稱＋三語標籤＋分類名＋資源 id。
 * 點擊卡片縮圖可放大查看（簡化版燈箱）。
 * ========================================================== */
window.DL_ITEMS = [
    {
        id: 'cursor-chito',
        category: 'cursor',
        updated: '2025-08-31',
        preview: './img/download/cursor-chito.png',
        name: { 'zh-TW': '千都游標', en: 'Chito Desktop Cursor', ja: 'チト デスクトップカーソル' },
        desc: {
            'zh-TW': '少女終末旅行 千都造型桌面游標，含白邊／無白邊兩種版本、17 種狀態、64×64 解析度。',
            en: 'Chito (Girls’ Last Tour) desktop cursor set: white / no-border variants, 17 states, 64×64.',
            ja: '少女終末旅行チトのデスクトップカーソル。白フチ／フチなしの2種、17状態、64×64。'
        },
        tags: ['少女終末旅行|Girls’ Last Tour|少女終末旅行', '千都|Chito|チト', '游標|Cursor|カーソル'],
        links: {
            win: '#',    // TODO：Windows 版下載連結（由作者填入）
            linux: '#'   // TODO：Linux 版下載連結（由作者填入）
        }
    },
    {
        id: 'cursor-yuuri',
        category: 'cursor',
        updated: '2025-08-31',
        preview: './img/download/cursor-yuuri.png',
        name: { 'zh-TW': '尤莉游標', en: 'Yuuri Desktop Cursor', ja: 'ユーリ デスクトップカーソル' },
        desc: {
            'zh-TW': '少女終末旅行 尤莉造型桌面游標，含白邊／無白邊兩種版本、17 種狀態、64×64 解析度。',
            en: 'Yuuri (Girls’ Last Tour) desktop cursor set: white / no-border variants, 17 states, 64×64.',
            ja: '少女終末旅行ユーリのデスクトップカーソル。白フチ／フチなしの2種、17状態、64×64。'
        },
        tags: ['少女終末旅行|Girls’ Last Tour|少女終末旅行', '尤莉|Yuuri|ユーリ', '游標|Cursor|カーソル'],
        links: {
            win: '#',    // TODO：Windows 版下載連結（由作者填入）
            linux: '#'   // TODO：Linux 版下載連結（由作者填入）
        }
    },
    {
        id: 'cursor-shijima',
        category: 'cursor',
        updated: '2025-08-31',
        preview: './img/download/cursor-shijima.jpg',
        name: { 'zh-TW': '月島靜寂游標', en: 'Tsukishima Shizuka Desktop Cursor', ja: '月島しじま デスクトップカーソル' },
        desc: {
            'zh-TW': '蘑菇的擬態日常 月島靜寂造型桌面游標，含白邊／無白邊兩種版本、17 種狀態、64×64 解析度。',
            en: 'Tsukishima Shizuka (Shimeji Simulation) desktop cursor set: white / no-border variants, 17 states, 64×64.',
            ja: 'シメジ シミュレーション月島しじまのデスクトップカーソル。白フチ／フチなしの2種、17状態、64×64。'
        },
        tags: ['蘑菇的擬態日常|Shimeji Simulation|シメジ シミュレーション', '月島靜寂|Tsukishima Shizuka|月島しじま', '游標|Cursor|カーソル'],
        links: {
            win: '#',    // TODO：Windows 版下載連結（由作者填入）
            linux: '#'   // TODO：Linux 版下載連結（由作者填入）
        }
    },
    {
        id: 'cursor-majime',
        category: 'cursor',
        updated: '2025-08-31',
        preview: './img/download/cursor-majime.jpg',
        name: { 'zh-TW': '山下真面目游標', en: 'Yamashita Majime Desktop Cursor', ja: '山下まじめ デスクトップカーソル' },
        desc: {
            'zh-TW': '蘑菇的擬態日常 山下真面目造型桌面游標，含白邊／無白邊兩種版本、17 種狀態、64×64 解析度。',
            en: 'Yamashita Majime (Shimeji Simulation) desktop cursor set: white / no-border variants, 17 states, 64×64.',
            ja: 'シメジ シミュレーション山下まじめのデスクトップカーソル。白フチ／フチなしの2種、17状態、64×64。'
        },
        tags: ['蘑菇的擬態日常|Shimeji Simulation|シメジ シミュレーション', '山下真面目|Yamashita Majime|山下まじめ', '游標|Cursor|カーソル'],
        links: {
            win: '#',    // TODO：Windows 版下載連結（由作者填入）
            linux: '#'   // TODO：Linux 版下載連結（由作者填入）
        }
    }
];

/* 探索列表的分類定義（顺序即列表顺序；全部＝不分類） */
window.DL_CATEGORIES = [
    { id: 'cursor', name: { 'zh-TW': '游標', en: 'Cursors', ja: 'カーソル' } },
    { id: 'wallpaper', name: { 'zh-TW': '桌布', en: 'Wallpapers', ja: '壁紙' } }   // 預留：資源加入後自動出現
];

/* ==========================================================
 * 以下為頁面渲染、搜尋、探索列表與放大燈箱邏輯，
 * 一般不需要修改。
 * ========================================================== */
(function () {
    'use strict';

    const DL_TEXT = {
        'zh-TW': {
            'dl-placeholder': '搜尋資源名稱或標籤…',
            'dl-explore': '探索',
            'dl-all': '全部',
            'dl-count': '項',
            'dl-empty-search': '找不到符合的資源',
            'dl-empty-category': '這個分類還沒有資源，敬請期待',
            'dl-win': 'Windows 下載',
            'dl-linux': 'Linux 下載',
            'dl-updated': '更新',
            'dl-placeholder-link': '下載連結即將開放',
            'dl-zoom': '點擊縮圖可放大查看',
            'dl-close': '關閉'
        },
        'en': {
            'dl-placeholder': 'Search resources or tags…',
            'dl-explore': 'Explore',
            'dl-all': 'All',
            'dl-count': 'items',
            'dl-empty-search': 'No matching resources',
            'dl-empty-category': 'Nothing in this category yet — stay tuned',
            'dl-win': 'Download for Windows',
            'dl-linux': 'Download for Linux',
            'dl-updated': 'Updated',
            'dl-placeholder-link': 'Download link coming soon',
            'dl-zoom': 'Tap a thumbnail to zoom in',
            'dl-close': 'Close'
        },
        'ja': {
            'dl-placeholder': 'リソース名・タグを検索…',
            'dl-explore': '探索',
            'dl-all': 'すべて',
            'dl-count': '件',
            'dl-empty-search': '一致するリソースがありません',
            'dl-empty-category': 'このカテゴリーはまだ準備中です',
            'dl-win': 'Windows 版ダウンロード',
            'dl-linux': 'Linux 版ダウンロード',
            'dl-updated': '更新日',
            'dl-placeholder-link': 'ダウンロードリンク準備中',
            'dl-zoom': 'サムネイルをクリックで拡大',
            'dl-close': '閉じる'
        }
    };

    let dlLang = 'zh-TW';
    let dlQuery = '';
    let dlCategory = 'all';

    function normalize(text) {
        return String(text).toLowerCase().replace(/\s+/g, ' ').trim();
    }

    function t(key) {
        return (DL_TEXT[dlLang] || DL_TEXT['zh-TW'])[key];
    }

    function parseLabel(entry) {
        const parts = String(entry).split('|');
        return { zh: (parts[0] || '').trim(), en: (parts[1] || '').trim(), ja: (parts[2] || '').trim() };
    }

    function itemCorpus(item) {
        const parts = [item.id];
        ['zh-TW', 'en', 'ja'].forEach((lang) => {
            if (item.name[lang]) parts.push(item.name[lang]);
        });
        window.DL_CATEGORIES.forEach((cat) => {
            if (cat.id === item.category) {
                ['zh-TW', 'en', 'ja'].forEach((lang) => parts.push(cat.name[lang]));
            }
        });
        parts.push(item.category);
        (item.tags || []).forEach((entry) => {
            const label = parseLabel(entry);
            parts.push(label.zh, label.en, label.ja);
        });
        return normalize(parts.join('\n'));
    }

    function categoryOf(id) {
        return window.DL_CATEGORIES.find((cat) => cat.id === id) || { name: { 'zh-TW': id, en: id, ja: id } };
    }

    function categoryName(id) {
        if (id === 'all') {
            return t('dl-all');
        }
        const cat = categoryOf(id);
        return cat.name[dlLang] || cat.name['zh-TW'];
    }

    function sortedItems() {
        return window.DL_ITEMS.slice().sort((a, b) =>
            String(b.updated).localeCompare(String(a.updated))
        );
    }

    /* ---------------- 探索下拉列表 ---------------- */
    function latestDate(items) {
        return items.reduce((max, item) => (item.updated > max ? item.updated : max), '');
    }

    function buildExploreMenu() {
        const menu = document.getElementById('dl-explore-menu');
        if (!menu) return;
        menu.innerHTML = '';

        const groups = [
            { id: 'all', items: window.DL_ITEMS },
            ...window.DL_CATEGORIES.map((cat) => ({
                id: cat.id,
                items: window.DL_ITEMS.filter((item) => item.category === cat.id)
            }))
        ];

        groups.forEach((group) => {
            // 分類目前沒有資源就不列出（全部一律列出）
            if (group.id !== 'all' && group.items.length === 0) return;

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'dl-explore-item';
            if (group.id === dlCategory) {
                button.classList.add('is-active');
            }

            const label = document.createElement('span');
            label.className = 'dl-explore-name';
            label.textContent = categoryName(group.id);

            const count = document.createElement('span');
            count.className = 'dl-explore-count';
            count.textContent = `${group.items.length} ${t('dl-count')}`;

            const date = document.createElement('time');
            date.className = 'dl-explore-date';
            date.dateTime = latestDate(group.items) || '';
            date.textContent = latestDate(group.items) || '—';

            button.appendChild(label);
            button.appendChild(count);
            button.appendChild(date);
            button.addEventListener('click', () => {
                dlCategory = group.id;
                document.getElementById('dl-explore')?.classList.remove('is-open');
                renderDlPage();
            });
            menu.appendChild(button);
        });
    }

    /* ---------------- 放大燈箱 ---------------- */
    let dlLightbox = null;

    function ensureLightbox() {
        if (dlLightbox) return dlLightbox;

        dlLightbox = document.createElement('div');
        dlLightbox.className = 'dl-lightbox';
        dlLightbox.setAttribute('role', 'dialog');
        dlLightbox.setAttribute('aria-modal', 'true');

        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'dl-lightbox-close';
        closeBtn.textContent = '×';
        closeBtn.setAttribute('aria-label', t('dl-close'));
        closeBtn.addEventListener('click', closeLightbox);

        const img = document.createElement('img');
        img.alt = '';

        dlLightbox.appendChild(closeBtn);
        dlLightbox.appendChild(img);
        dlLightbox.addEventListener('click', (event) => {
            if (event.target === dlLightbox) closeLightbox();
        });
        document.body.appendChild(dlLightbox);
        return dlLightbox;
    }

    function openLightbox(src, alt) {
        const box = ensureLightbox();
        const img = box.querySelector('img');
        const closeBtn = box.querySelector('.dl-lightbox-close');
        img.src = src;
        img.alt = alt;
        closeBtn.setAttribute('aria-label', t('dl-close'));
        box.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!dlLightbox) return;
        dlLightbox.classList.remove('is-open');
        dlLightbox.querySelector('img').removeAttribute('src');
        document.body.style.overflow = '';
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && dlLightbox?.classList.contains('is-open')) {
            closeLightbox();
        }
    });

    /* ---------------- 卡片渲染 ---------------- */
    function createCard(item) {
        const card = document.createElement('article');
        card.className = 'dl-card';
        card.dataset.id = item.id;
        card.dataset.search = itemCorpus(item);

        const media = document.createElement('div');
        media.className = 'dl-card-media';
        media.title = t('dl-zoom');
        const img = document.createElement('img');
        img.src = item.preview;
        img.alt = item.name[dlLang] || item.name['zh-TW'];
        img.loading = 'lazy';
        media.appendChild(img);
        media.addEventListener('click', () => openLightbox(item.preview, img.alt));

        const body = document.createElement('div');
        body.className = 'dl-card-body';

        const head = document.createElement('div');
        head.className = 'dl-card-head';
        const title = document.createElement('h3');
        title.textContent = item.name[dlLang] || item.name['zh-TW'];
        const date = document.createElement('time');
        date.dateTime = item.updated;
        date.textContent = `${t('dl-updated')} · ${item.updated}`;
        head.appendChild(title);
        head.appendChild(date);

        const desc = document.createElement('p');
        desc.className = 'dl-card-desc';
        desc.textContent = item.desc[dlLang] || item.desc['zh-TW'];

        const tags = document.createElement('div');
        tags.className = 'work-tags';
        const langKey = dlLang === 'zh-TW' ? 'zh' : dlLang;
        (item.tags || []).forEach((entry) => {
            const label = parseLabel(entry);
            const text = label[langKey] || label.zh || label.en || label.ja;
            if (!text) return;
            const chip = document.createElement('span');
            chip.textContent = text;
            tags.appendChild(chip);
        });

        const actions = document.createElement('div');
        actions.className = 'dl-card-actions';
        [['win', 'dl-win'], ['linux', 'dl-linux']].forEach(([key, textKey]) => {
            const link = document.createElement('a');
            link.className = 'dl-btn';
            link.textContent = t(textKey);
            const href = item.links[key];
            if (!href || href === '#') {
                link.href = '#';
                link.classList.add('is-placeholder');
                link.title = t('dl-placeholder-link');
                link.addEventListener('click', (event) => event.preventDefault());
            } else {
                link.href = href;
            }
            actions.appendChild(link);
        });

        body.appendChild(head);
        body.appendChild(desc);
        body.appendChild(tags);
        body.appendChild(actions);
        card.appendChild(media);
        card.appendChild(body);
        return card;
    }

    function renderDlPage() {
        const list = document.getElementById('dl-list');
        if (!list) return;

        const searchInput = document.getElementById('dl-search-input');
        if (searchInput) {
            searchInput.placeholder = t('dl-placeholder');
        }
        const exploreBtn = document.querySelector('.dl-explore-btn-label');
        if (exploreBtn) {
            exploreBtn.textContent = t('dl-explore');
        }

        const visible = sortedItems().filter((item) => {
            if (dlCategory !== 'all' && item.category !== dlCategory) return false;
            if (dlQuery && !itemCorpus(item).includes(dlQuery)) return false;
            return true;
        });

        list.innerHTML = '';
        visible.forEach((item) => list.appendChild(createCard(item)));

        const notice = document.getElementById('dl-notice');
        if (notice) {
            if (visible.length === 0) {
                notice.hidden = false;
                notice.textContent = dlQuery ? t('dl-empty-search') : t('dl-empty-category');
            } else {
                notice.hidden = true;
            }
        }

        buildExploreMenu();
    }

    /* 供頁面全域語言切換呼叫（與 manga.html 的 updatePageLanguage 同規則） */
    window.updatePageLanguage = function (lang) {
        dlLang = DL_TEXT[lang] ? lang : 'zh-TW';

        const dict = window.DL_PAGE_I18N && window.DL_PAGE_I18N[dlLang];
        document.querySelectorAll('[data-i18n]').forEach((element) => {
            const key = element.getAttribute('data-i18n');
            if (dict && dict[key]) {
                element.textContent = dict[key];
            }
        });
        document.documentElement.lang = dlLang === 'ja' ? 'ja' : dlLang === 'en' ? 'en' : 'zh-TW';

        renderDlPage();
        document.documentElement.classList.remove('language-loading');
    };

    function init() {
        const searchInput = document.getElementById('dl-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                dlQuery = normalize(searchInput.value);
                renderDlPage();
            });
        }

        const explore = document.getElementById('dl-explore');
        const exploreBtn = explore?.querySelector('.dl-explore-btn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                explore.classList.toggle('is-open');
            });
            document.addEventListener('click', (event) => {
                if (!explore.contains(event.target)) {
                    explore.classList.remove('is-open');
                }
            });
        }

        let saved = 'zh-TW';
        try { saved = localStorage.getItem('lang') || 'zh-TW'; } catch (error) {}
        dlLang = DL_TEXT[saved] ? saved : 'zh-TW';
        renderDlPage();
        document.documentElement.classList.remove('language-loading');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
