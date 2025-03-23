if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('Service Worker Registered!', reg))
        .catch(err => console.log('Service Worker Error:', err));
}

//local storage
document.addEventListener('DOMContentLoaded', function () {
    let content = document.getElementById('content').innerHTML;
    localStorage.setItem('savedContent', content);
});

document.addEventListener('DOMContentLoaded', function () {
    if (!navigator.onLine) {  // If offline
        let savedContent = localStorage.getItem('savedContent');
        if (savedContent) {
            document.getElementById('content').innerHTML = savedContent;
        }
    }
});
