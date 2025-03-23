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

//offline
document.addEventListener('DOMContentLoaded', async function () {
    const db = await openDatabase();
  
    // ✅ Check if pages are already stored offline
    const hasOfflineData = await checkIfDataExists();
    
    if (navigator.onLine || !hasOfflineData) {
        console.log('✅ Online OR First Time: Fetching and saving all pages.');
        await saveAllPagesToDB(); // Save all pages for offline use
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
  
  // ✅ Check if IndexedDB already has saved pages
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
  
  // ✅ Save all pages to IndexedDB (First Visit)
  async function saveAllPagesToDB() {
    const db = await openDatabase();
    const transaction = db.transaction(['pages'], 'readwrite');
    const store = transaction.objectStore('pages');
  
    const pages = [
        '/',  
        '/index.html',
        '/about.html',
        '/contact.html',
        '/editor.html',
        '/games.html',
        '/lessons.html',
        '/quiz-certificate.html',
        '/styled-html.html'
    ];
  
    for (let page of pages) {
        try {
            let response = await fetch(page);
            let content = await response.text();
            store.put({ url: page, content });
        } catch (error) {
            console.error(`❌ Error fetching ${page}:`, error);
        }
    }
  }
  
  // ✅ Save the current page content to IndexedDB
  async function saveContentToDB() {
    const db = await openDatabase();
    const transaction = db.transaction(['pages'], 'readwrite');
    const store = transaction.objectStore('pages');
  
    const pageData = {
        url: window.location.pathname,
        content: document.documentElement.innerHTML
    };
  
    store.put(pageData);
  }
  
  // ✅ Load the saved page content from IndexedDB when offline
  async function loadContentFromDB() {
    const db = await openDatabase();
    const transaction = db.transaction(['pages'], 'readonly');
    const store = transaction.objectStore('pages');
    const request = store.get(window.location.pathname);
  
    request.onsuccess = function () {
        if (request.result) {
            document.open();
            document.write(request.result.content);
            document.close();
        } else {
            console.log('⚠️ No saved data available for this page.');
        }
    };
  }
  
  // ✅ Handle Internal Link Navigation (Offline Mode)
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
  