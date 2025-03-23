function runCode(button) { const container = button.closest(".example-editor");
const code = container.querySelector(".codeEditor").value;    
const outputFrame = container.querySelector(".output");
outputFrame.srcdoc = code; }  function autoRunCode(textarea) {     
const container = textarea.closest(".example-editor");
clearTimeout(container.autoRunTimer);
container.autoRunTimer = setTimeout(() => runCode(container.querySelector("button")), 500);}  
function downloadCode(button) {     const container = button.closest(".example-editor");     
const code = container.querySelector(".codeEditor").value;     
const blob = new Blob([code], { type: "text/html" });     
const link = document.createElement("a");     
link.href = URL.createObjectURL(blob);     
link.download = "CodeNova.html";     link.click(); }  window.onload = () => {     
document.querySelectorAll(".example-editor").forEach(editor => {         
runCode(editor.querySelector("button"));     }); };           


//offline
// ✅ Register the Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('✅ Service Worker Registered!', reg))
        .catch(err => console.log('❌ Service Worker Registration Failed:', err));
}

// ✅ Save and Restore Page Content
document.addEventListener('DOMContentLoaded', function () {
    let contentElement = document.getElementById('content');

    if (contentElement) {
        let savedContent = localStorage.getItem('savedContent');

        // If offline and saved content exists, load it
        if (!navigator.onLine && savedContent) {
            contentElement.innerHTML = savedContent;
        }

        // Save the current content to local storage
        localStorage.setItem('savedContent', contentElement.innerHTML);
    }
});

// ✅ Monitor Online/Offline Status
window.addEventListener('online', () => {
    console.log('✅ Online: Connection restored.');
    alert('✅ You are back online!');
});

window.addEventListener('offline', () => {
    console.log('❌ Offline: No internet connection.');
    alert('❌ You are offline. Some features may not work.');
});

// ✅ Save Additional Dynamic Content
function saveDynamicContent() {
    let dynamicElements = document.querySelectorAll('[data-save]');
    dynamicElements.forEach(element => {
        localStorage.setItem('saved-' + element.id, element.innerHTML);
    });
}

// ✅ Restore Additional Dynamic Content When Offline
function restoreDynamicContent() {
    let dynamicElements = document.querySelectorAll('[data-save]');
    dynamicElements.forEach(element => {
        let savedData = localStorage.getItem('saved-' + element.id);
        if (savedData) {
            element.innerHTML = savedData;
        }
    });
}

// ✅ Restore Content If Offline
if (!navigator.onLine) {
    restoreDynamicContent();
}

// ✅ Auto-Save Dynamic Content Every 5 Seconds
setInterval(saveDynamicContent, 5000);
