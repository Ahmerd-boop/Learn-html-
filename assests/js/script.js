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
