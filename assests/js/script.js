// Wait for the document to fully load
document.addEventListener('DOMContentLoaded', function () {
    applySettings(); // Apply saved settings when page loads

    // Open/Close Settings Menu
    document.getElementById('settings-btn').addEventListener('click', function () {
        document.getElementById('settings-menu').style.display = 'block';
    });
    document.getElementById('close-settings').addEventListener('click', function () {
        document.getElementById('settings-menu').style.display = 'none';
    });

    // Change Mode Toggle
    document.getElementById('mode').addEventListener('change', function () {
        let isDarkMode = this.checked;
        localStorage.setItem('mode', isDarkMode ? 'dark' : 'light'); // Save mode to localStorage
        applySettings(); // Apply changes immediately
    });

    // Font Size Change
    document.getElementById('font-size').addEventListener('change', function () {
        let size = this.value;
        let fontSize = size === 'small' ? '11px' : size === 'medium' ? '13px' : '15px';

        localStorage.setItem('fontSize', fontSize); // Save font size to localStorage
        applySettings(); // Apply changes immediately
    });
});

// Function to Apply Saved Settings on Page Load
function applySettings() {
    // Apply Dark Mode
    let savedMode = localStorage.getItem('mode') || 'light';
    let isDarkMode = savedMode === 'dark';

    document.documentElement.style.setProperty('--bg-color', isDarkMode ? 'linear-gradient(135deg, gray, #555)' : 'linear-gradient(135deg, #007bff, #00d4ff)');
    document.documentElement.style.setProperty('--text-color', 'white');
    
    let modeSwitch = document.getElementById('mode');
    if (modeSwitch) {
        modeSwitch.checked = isDarkMode;
    }

    // Apply Font Size
    let savedFontSize = localStorage.getItem('fontSize') || '13px';
    document.documentElement.style.setProperty('--font-size', savedFontSize);

    let fontSizeSelect = document.getElementById('font-size');
    if (fontSizeSelect) {
        fontSizeSelect.value = savedFontSize === '11px' ? 'small' : savedFontSize === '13px' ? 'medium' : 'large';
    }
}

// Reset Settings Button
document.getElementById('reset-settings').addEventListener('click', function () {
    localStorage.clear(); // Remove all saved settings
    location.reload(); // Refresh the page to reset
});

//OFFLINE 
document.addEventListener('DOMContentLoaded', async function () {
    const db = await openDatabase();

    // ✅ Check if IndexedDB already has saved pages
    const hasOfflineData = await checkIfDataExists();

    if (navigator.onLine || !hasOfflineData) {
        console.log('✅ Online OR First Time: Fetching and saving all pages.');
        await saveAllPagesToDB();
    } else {
        console.log('❌ Offline: Loading saved content.');
        loadContentFromDB();
    }

    // ✅ Handle internal link clicks
    document.body.addEventListener('click', function (event) {
        if (event.target.tagName === 'A' && event.target.href.startsWith(location.origin)) {
            event.preventDefault();
            navigateTo(event.target.href);
        }
    });
});

// ✅ Open IndexedDB Database
async function openDatabase() {
    return new Promise((resolve, reject) => {
        let request = indexedDB.open('offlineDatabase', 1);
        request.onupgradeneeded = function (event) {
            let db = event.target.result;
            if (!db.objectStoreNames.contains('pages')) {
                db.createObjectStore('pages', { keyPath: 'url' });
            }
        };
        request.onsuccess = function (event) {
            resolve(event.target.result);
        };
        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}

// ✅ Check if IndexedDB has saved pages
async function checkIfDataExists() {
    const db = await openDatabase();
    const transaction = db.transaction(['pages'], 'readonly');
    const store = transaction.objectStore('pages');
    const request = store.getAllKeys();

    return new Promise((resolve) => {
        request.onsuccess = function () {
            resolve(request.result.length > 0);
        };
        request.onerror = function () {
            resolve(false);
        };
    });
}

// ✅ Save all pages & assets to IndexedDB (First Visit)
async function saveAllPagesToDB() {
    const db = await openDatabase();
    const transaction = db.transaction(['pages'], 'readwrite');
    const store = transaction.objectStore('pages');

    const pages = [
        '/', '/index.html', '/assests/css/style.css', '/script.js',
        '/assests/js/continue.js', '/assests/js/download.js',
        '/assests/js/editor.js', '/assests/js/example-editor.js',
        '/assests/js/server.js', '/assests/js/welcome.js',
        '/assests/js/script.js', '/assests/js/payment-method.js',
        '/assests/js/games.js', '/assests/icons/email.png',
        '/assests/icons/SeTTiNGSS_enhanced.png', '/assests/icons/share.png',
        '/editor.html', '/assests/games/game1.html', '/games.html',
        '/lessons.html', '/quiz-certificate.html', '/styled-html.html',
        '/kofar-guga-katsina.jpg', '/assests/images/community.png',
        '/assests/images/editor.png', '/assests/images/games.png',
        '/assests/images/gidan-sarki.jpg', '/video.mp4', '/audio.mp3',
        '/sw.js', '/manifest.json'
    ];

    for (let page of pages) {
        try {
            let response = await fetch(page);
            let contentType = response.headers.get('content-type');

            let content;
            if (contentType.includes('text') || contentType.includes('json')) {
                content = await response.text(); // For HTML, CSS, JS, JSON
            } else {
                content = await response.blob(); // For images, videos, audio
            }

            store.put({ url: page, content, contentType });
        } catch (error) {
            console.error(`❌ Error fetching ${page}:`, error);
        }
    }
}

// ✅ Load content from IndexedDB (Offline)
async function loadContentFromDB() {
    const db = await openDatabase();
    const transaction = db.transaction(['pages'], 'readonly');
    const store = transaction.objectStore('pages');
    const request = store.get(window.location.pathname);

    request.onsuccess = function () {
        if (request.result) {
            let { content, contentType } = request.result;

            if (contentType.includes('text')) {
                document.open();
                document.write(content);
                document.close();
            } else {
                console.log(`⚠️ Non-text content detected: ${contentType}`);
            }
        } else {
            console.log('⚠️ No saved data available for this page.');
        }
    };
}

// ✅ Handle Internal Link Navigation (Offline)
async function navigateTo(url) {
    if (navigator.onLine) {
        window.location.href = url;
    } else {
        const db = await openDatabase();
        const transaction = db.transaction(['pages'], 'readonly');
        const store = transaction.objectStore('pages');
        const request = store.get(new URL(url).pathname);

        request.onsuccess = function () {
            if (request.result) {
                document.open();
                document.write(request.result.content);
                document.close();
            } else {
                alert('⚠️ This page is not available offline.');
            }
        };
    }
}

// ✅ Back Navigation
function handleBackNavigation() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        if (confirm('Exit the app?')) {
            if (typeof navigator.app !== 'undefined') {
                navigator.app.exitApp();
            } else {
                window.close();
            }
        }
    }
}

document.addEventListener('backbutton', function (e) {
    e.preventDefault();
    handleBackNavigation();
}, false);

window.onpopstate = function () {
    handleBackNavigation();
};
