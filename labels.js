/* ==========================================================
 * 滅Q 站內搜尋與三語標籤（labels.js）
 * ----------------------------------------------------------
 * 由 gallery.html / gallery_mobile.html / manga.html /
 * manga_mobile.html 以 <script src="labels.js" defer> 載入。
 *
 * 標籤對照表在本檔案維護：
 *   key   = 作品檔名（與 galleryWorkInfoData 的鍵、
 *           MANGA_LIBRARY 的 id／作品鍵一致）
 *   value = 標籤陣列，每個標籤寫成「中文|英文|日文」字串。
 *
 * 沒有設定標籤的作品不顯示標籤列。
 * 搜尋會比對：三語作品標題＋全部標籤（三語）＋檔名。
 * ========================================================== */
window.MIYQ_LABELS = {
    gallery: {
        // ===== 2026 =====
        '140':   ['蘑菇的擬態日常|Shimeji Simulation|シメジ シミュレーション', '靜寂的姐姐|Big Sis|しじまの姉', '游標|Cursor|カーソル'],
        '139': ['少女終末旅行|Girls’ Last Tour|少女終末旅行', '千都|Chito|チト', '尤莉|Yuuri|ユーリ', '後室|Backrooms|バックルーム'],
        '138': ['NYN姉貴|NYN-neesan|NYN姉貴', '貼圖|Sticker|スタンプ'],
        '137': ['少女終末旅行|Girls’ Last Tour|少女終末旅行', '尤莉|Yuuri|ユーリ'],
        '136': ['吻|Kiss|キス'],
        '135': ['蘑菇的擬態日常|Shimeji Simulation|シメジ シミュレーション'],
        '134': ['兼任 MagicalDraw|MagicalDraw|MagicalDraw'],
        '133': ['蘑菇的擬態日常|Shimeji Simulation|シメジ シミュレーション', '山下真面目|Yamashita Majime|山下まじめ', '游標|Cursor|カーソル'],
        '132': ['蘑菇的擬態日常|Shimeji Simulation|シメジ シミュレーション', '月島靜寂|Tsukishima Shijima|月島しじま', '游標|Cursor|カーソル'],
        '131': ['蘑菇的擬態日常|Shimeji Simulation|シメジ シミュレーション'],
        '130-2': ['蘑菇的擬態日常|Shimeji Simulation|シメジ シミュレーション'],
        '130-1': ['蘑菇的擬態日常|Shimeji Simulation|シメジ シミュレーション'],
        '129': ['蘑菇的擬態日常|Shimeji Simulation|シメジ シミュレーション', '游標|Cursor|カーソル'],
        '128-2': ['少女終末旅行|Girls’ Last Tour|少女終末旅行', '桌布|Wallpaper|壁紙'],
        '128-1': ['少女終末旅行|Girls’ Last Tour|少女終末旅行', '桌布|Wallpaper|壁紙'],

        // ===== 2025 =====
        '127': ['筆記本|Notebook|ノート', '塗鴉|Doodle|落書き'],
        '126': ['少女終末旅行|Girls’ Last Tour|少女終末旅行', '尤莉|Yuuri|ユーリ'],
        '125': ['筆記本|Notebook|ノート', '塗鴉|Doodle|落書き'],
        '124': ['少女終末旅行|Girls’ Last Tour|少女終末旅行'],
        '123': ['BanG Dream!|BanG Dream!|バンドリ!', '豐川祥子|Sakiko Togawa|豊川祥子'],
        '122': ['雪|Snow|雪'],
        '120': ['少女終末旅行|Girls’ Last Tour|少女終末旅行', '千都|Chito|チト', '游標|Cursor|カーソル'],
        '119': ['MGR姉貴|MGR-neesan|MGR姉貴'],
        '117': ['尹曉風|Yin Xiaofeng|尹曉風'],
        '116': ['小紅帽|Red Riding Hood|赤ずきん'],
        '115': ['少女終末旅行|Girls’ Last Tour|少女終末旅行', '尤莉|Yuuri|ユーリ', '游標|Cursor|カーソル'],
        '114': ['兼任 MagicalDraw|MagicalDraw|MagicalDraw'],
        '113': ['存檔點|Save Point|セーブポイント'],
        '112': ['會計學|Accounting|会計学', '教科書|Textbook|教科書', '塗鴉|Doodle|落書き'],
        '111': ['筆記本|Notebook|ノート', '塗鴉|Doodle|落書き'],
        '110': ['會計學|Accounting|会計学', '教科書|Textbook|教科書', '塗鴉|Doodle|落書き'],
        '109': ['筆記本|Notebook|ノート', '塗鴉|Doodle|落書き'],
        '108': ['經濟學|Economics|経済学', '教科書|Textbook|教科書', '塗鴉|Doodle|落書き'],
        '107': ['筆記本|Notebook|ノート', '塗鴉|Doodle|落書き'],
        '106': ['筆記本|Notebook|ノート', '塗鴉|Doodle|落書き'],
        '105': ['練習|Practice|練習'],
        '104': ['RPG Maker MV|RPG Maker MV|RPG Maker MV'],
        '103': ['A4紙|A4 Paper|A4用紙', '塗鴉|Doodle|落書き'],
        '102': ['兼任 MagicalDraw|MagicalDraw|MagicalDraw'],
        '101': ['BanG Dream!|BanG Dream!|バンドリ!', '若葉睦|Mutsumi Wakaba|若葉睦'],
        '100': ['筆記本|Notebook|ノート', '塗鴉|Doodle|落書き'],

        // ===== 2024 =====
        '99': ['OC交換|OC Exchange|OC交換会'],
        '98': ['筆記本|Notebook|ノート', '塗鴉|Doodle|落書き'],
        '97': ['經濟學|Economics|経済学', '教科書|Textbook|教科書', '塗鴉|Doodle|落書き'],
        '96': ['筆記本|Notebook|ノート', '塗鴉|Doodle|落書き'],
        '95': ['筆記本|Notebook|ノート', '塗鴉|Doodle|落書き'],
        '94': ['筆記本|Notebook|ノート', '塗鴉|Doodle|落書き'],
        '93': ['筆記本|Notebook|ノート', '塗鴉|Doodle|落書き'],
        '92': ['筆記本|Notebook|ノート', '塗鴉|Doodle|落書き'],
        '91': ['失溫|Hypothermia|低体温'],
        '90': ['月亮|Moon|月'],
        '89': ['筆記本|Notebook|ノート', '塗鴉|Doodle|落書き'],
        '88': ['初音未來|Hatsune Miku|初音ミク'],
        '87': ['明日方舟|Arknights|アークナイツ', '凱爾希|Kal’tsit|ケルシー'],
        '86': ['MGR姉貴|MGR-neesan|MGR姉貴'],
        '85': ['生日|Birthday|誕生日'],
        '84': ['少女終末旅行|Girls’ Last Tour|少女終末旅行', '千都|Chito|チト'],
        '83': ['練習|Practice|練習'],
        '82': ['生日|Birthday|誕生日'],
        '81': ['少女終末旅行|Girls’ Last Tour|少女終末旅行', '尤莉|Yuuri|ユーリ'],
        '80': ['明日方舟|Arknights|アークナイツ', '凱爾希|Kal’tsit|ケルシー'],
        '79-2': ['初音未來|Hatsune Miku|初音ミク'],
        '79-1': ['初音未來|Hatsune Miku|初音ミク'],
        '78': ['生日|Birthday|誕生日'],
        '77': ['Drugsneko|Drugsneko|Drugsneko'],
        '76': ['小畫家|MS Paint|ペイント'],
        '74': ['筆記本|Notebook|ノート', '塗鴉|Doodle|落書き'],
        '73': ['筆記本|Notebook|ノート', '塗鴉|Doodle|落書き'],
        '72': ['練習|Practice|練習'],
        '71': ['筆記本|Notebook|ノート', '塗鴉|Doodle|落書き'],

        // ===== 2023 =====
        '70': ['筆記本|Notebook|ノート', '塗鴉|Doodle|落書き'],
        '68': ['筆記本|Notebook|ノート', '塗鴉|Doodle|落書き'],
        '56': ['筆記本|Notebook|ノート', '塗鴉|Doodle|落書き'],
        '55': ['筆記本|Notebook|ノート', '塗鴉|Doodle|落書き'],
        '43': ['筆記本|Notebook|ノート', '塗鴉|Doodle|落書き']
    },
    manga: {}
};

/* ==========================================================
 * 以下為搜尋與標籤顯示邏輯，一般不需要修改。
 * ========================================================== */
(function () {
    'use strict';


    const DL_TEXT = {
        'zh-TW': { placeholder: '搜尋作品名稱或標籤…', aria: '搜尋作品', empty: '找不到符合的作品' },
        'en':    { placeholder: 'Search titles or tags…', aria: 'Search works', empty: 'No matching works' },
        'ja':    { placeholder: 'タイトル・タグを検索…', aria: '作品を検索', empty: '一致する作品がありません' }
    };

    function currentLang() {
        try {
            const lang = localStorage.getItem('lang');
            return (lang === 'en' || lang === 'ja') ? lang : 'zh-TW';
        } catch (error) {
            return 'zh-TW';
        }
    }

    function normalize(text) {
        return String(text).toLowerCase().replace(/\s+/g, ' ').trim();
    }

    function parseLabel(entry) {
        const parts = String(entry).split('|');
        return {
            zh: (parts[0] || '').trim(),
            en: (parts[1] || '').trim(),
            ja: (parts[2] || '').trim()
        };
    }

    function labelsFor(bucket, key) {
        const table = window.MIYQ_LABELS[bucket];
        const raw = table && table[key];
        if (!raw || !raw.length) {
            return [];
        }
        return raw.map(parseLabel);
    }

    /* 建立單件作品的可搜尋字串（三語標題＋三語標籤＋檔名） */
    function buildSearchCorpus(keys) {
        return normalize(keys.filter(Boolean).join('\n'));
    }

    function galleryCorpus(filename) {
        const parts = [filename];
        const labels = labelsFor('gallery', filename);

        ['zh-TW', 'en', 'ja'].forEach((lang) => {
            const info = galleryWorkInfoData[lang] && galleryWorkInfoData[lang][filename];
            if (info && info.title) {
                parts.push(info.title);
            }
        });

        labels.forEach((label) => {
            parts.push(label.zh, label.en, label.ja);
        });

        return buildSearchCorpus(parts);
    }

    /* 蒐集某作品鍵在三語圖庫中的所有標題 */
    function mangaTitles(workId) {
        const titles = [workId];
        Object.keys(MANGA_LIBRARY.short || {}).forEach((lang) => {
            ((MANGA_LIBRARY.short && MANGA_LIBRARY.short[lang]) || [])
                .forEach((work) => {
                    if (work.id === workId) {
                        titles.push(work.title);
                    }
                });
        });
        return titles;
    }

    function mangaCorpus(workId) {
        const parts = mangaTitles(workId);
        labelsFor('manga', workId).forEach((label) => {
            parts.push(label.zh, label.en, label.ja);
        });
        return buildSearchCorpus(parts);
    }

    /* ---------------- 搜尋列 UI ---------------- */
    function createSearchBar(onInput) {
        const bar = document.createElement('div');
        bar.className = 'miyq-search-bar';

        const input = document.createElement('input');
        input.type = 'search';
        input.className = 'miyq-search-input';
        input.autocomplete = 'off';
        input.spellcheck = false;
        input.addEventListener('input', () => onInput(normalize(input.value)));

        bar.appendChild(input);
        bar._input = input;
        return bar;
    }

    function syncSearchBar(bar) {
        const text = DL_TEXT[currentLang()] || DL_TEXT['zh-TW'];
        bar._input.placeholder = text.placeholder;
        bar._input.setAttribute('aria-label', text.aria);
    }

    function makeEmptyLine() {
        const line = document.createElement('div');
        line.className = 'miyq-search-empty';
        return line;
    }

    function showEmptyLine(container, shown) {
        let line = container.querySelector(':scope > .miyq-search-empty');
        if (!shown) {
            if (line) line.remove();
            return;
        }
        if (!line) {
            line = makeEmptyLine();
            container.appendChild(line);
        }
        line.textContent = (DL_TEXT[currentLang()] || DL_TEXT['zh-TW']).empty;
    }

    /* ---------------- 繪畫頁 ---------------- */
    function installGallery() {
        const grid = document.getElementById('gallery-grid');
        if (!grid || typeof window.renderGallery !== 'function' ||
            typeof window.createGalleryItem !== 'function') {
            return;
        }

        let query = '';

        // 每件卡片補上搜尋索引與檔名（供燈箱標籤使用）
        const origCreateItem = window.createGalleryItem;
        window.createGalleryItem = function (work) {
            origCreateItem(work);
            const item = grid.lastElementChild;
            if (item && item.classList.contains('gallery-item')) {
                item.dataset.filename = work.filename;
                item.dataset.search = galleryCorpus(work.filename);
            }
        };

        const origRender = window.renderGallery;
        window.renderGallery = function () {
            origRender();
            applyFilter();
            syncSearchBar(searchBar);
        };

        function applyFilter() {
            let currentDivider = null;
            let groupVisible = false;
            let matched = 0;

            const flush = () => {
                if (currentDivider) {
                    currentDivider.style.display =
                        (groupVisible || !query) ? '' : 'none';
                }
            };

            // 依 children 順序線性掃描：分隔線 → 該年份卡片群
            Array.prototype.forEach.call(grid.children, (el) => {
                if (el.classList.contains('gallery-year-divider')) {
                    flush();
                    currentDivider = el;
                    groupVisible = false;
                    return;
                }

                if (el.classList.contains('gallery-item')) {
                    const hit = !query || (el.dataset.search || '').includes(query);
                    el.style.display = hit ? '' : 'none';
                    if (hit) {
                        groupVisible = true;
                        matched += 1;
                    }
                }
            });
            flush();

            showEmptyLine(grid, Boolean(query) && matched === 0);
        }

        const searchBar = createSearchBar((value) => {
            query = value;
            applyFilter();
        });

        const layout = grid.closest('.gallery-layout');
        if (layout) {
            layout.insertAdjacentElement('beforebegin', searchBar);
        } else {
            grid.insertAdjacentElement('beforebegin', searchBar);
        }
        syncSearchBar(searchBar);
        renderGallery();
    }

    /* ---------------- 漫畫頁 ---------------- */
    function installManga() {
        const shortGrid = document.getElementById('manga-short-grid');
        if (!shortGrid || typeof window.renderShortWorks !== 'function' ||
            typeof window.renderLongWorks !== 'function') {
            return;
        }

        let query = '';

        function filterCards(grid, works) {
            let visible = 0;
            works.forEach((work, index) => {
                if (!work.matched) return;
                work.matched.style.display =
                    (!query || work.search.includes(query)) ? '' : 'none';
                if (work.matched.style.display !== 'none') {
                    visible += 1;
                }
            });
            showEmptyLine(grid, Boolean(query) && visible === 0);
        }

        const origShort = window.renderShortWorks;
        window.renderShortWorks = function (grid, empty, lang) {
            origShort(grid, empty, lang);

            const library = (MANGA_LIBRARY.short && MANGA_LIBRARY.short[lang]) || [];
            const cards = grid.querySelectorAll('.manga-work-card');
            const entries = [];
            library.forEach((work, index) => {
                entries.push({
                    search: mangaCorpus(work.id),
                    matched: cards[index] || null
                });
            });
            // 他語言 fallback 的準備中卡（manga.html 產生，附 dataset.search）
            for (let i = library.length; i < cards.length; i++) {
                entries.push({
                    search: (cards[i].dataset.search || '').toLowerCase(),
                    matched: cards[i]
                });
            }
            filterCards(grid, entries);
        };

        const origLong = window.renderLongWorks;
        window.renderLongWorks = function (grid, empty, lang) {
            origLong(grid, empty, lang);

            const seriesMap = (MANGA_LIBRARY.long && MANGA_LIBRARY.long[lang]) || {};
            const workIds = Object.keys(seriesMap);
            // grid 內為「卡片、章節面板」交替排列
            const cards = grid.querySelectorAll('.manga-work-card');
            const entries = [];
            workIds.forEach((workId, index) => {
                entries.push({
                    search: mangaCorpus(workId),
                    matched: cards[index] || null
                });
            });
            // 他語言 fallback 的準備中卡（manga.html 產生，附 dataset.search）
            for (let i = workIds.length; i < cards.length; i++) {
                entries.push({
                    search: (cards[i].dataset.search || '').toLowerCase(),
                    matched: cards[i]
                });
            }
            filterCards(grid, entries);
        };

        const origRenderList = window.renderMangaList;
        window.renderMangaList = function (lang) {
            origRenderList(lang);
            syncSearchBar(searchBar);
        };

        const searchBar = createSearchBar((value) => {
            query = value;
            renderMangaList(mangaCurrentLang);
        });

        const main = shortGrid.closest('main') || shortGrid.parentElement;
        main.insertBefore(searchBar, main.querySelector('.manga-section'));
        syncSearchBar(searchBar);
        renderMangaList(mangaCurrentLang);
    }

    /* ---------------- 彈窗標籤 ---------------- */
    function installLightboxTags() {
        const infoBox = document.getElementById('gallery-work-info');
        const description = document.getElementById('gallery-work-description');
        if (!infoBox || !description || typeof window.openGalleryLightbox !== 'function') {
            return;
        }

        function renderTags(filename) {
            const old = infoBox.querySelector('.work-tags');
            if (old) {
                old.remove();
            }
            if (!filename) {
                return;
            }

            const lang = currentLang();
            const langKey = lang === 'zh-TW' ? 'zh' : lang;
            const labels = labelsFor('gallery', filename);
            if (!labels.length) {
                return;
            }

            const box = document.createElement('div');
            box.className = 'work-tags';

            labels.forEach((label) => {
                const text = label[langKey] || label.zh || label.en || label.ja;
                if (!text) {
                    return;
                }
                const chip = document.createElement('span');
                chip.textContent = text;
                box.appendChild(chip);
            });

            if (box.children.length) {
                description.insertAdjacentElement('afterend', box);
            }
        }

        const origOpen = window.openGalleryLightbox;
        window.openGalleryLightbox = function (item) {
            origOpen(item);
            renderTags(item && item.dataset ? item.dataset.filename : '');
        };
    }

    document.addEventListener('DOMContentLoaded', () => {
        installGallery();
        installManga();
        installLightboxTags();
    });
})();
