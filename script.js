if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw-1.js')
      .then(() => console.log('✅ Service Worker Registered!'))
      .catch(error => console.log('❌ Service Worker Registration Failed:', error));
}

