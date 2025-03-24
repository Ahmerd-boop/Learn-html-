// Modern App Download Button Handler  
document.getElementById('forward-btn').addEventListener('click', async function() {
    const btn = this;
    
    // 1. Add click animation
    btn.classList.add('clicked');
    
    // 2. Track analytics (multiple providers support)
    trackEvent('app_download_click', {
      platform: detectPlatform(),
      location: window.location.pathname
    });
  
    // 3. Show loading state (UX improvement)
    btn.innerHTML = `
      <svg class="spinner" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>
      Redirecting...
    `;
  
    // 4. Device-specific handling
    const url = "https://www.webintoapp.com/store/666174";
    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
    
    try {
      // 5. Vibrate on mobile (if supported)
      if (isMobile && navigator.vibrate) {
        navigator.vibrate(50);
      }
  
      // 6. Smart redirection with delay for animation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 7. Progressive enhancement
      if (isMobile) {
        // Try deep linking first
        window.location.href = `intent://webintoapp.com/store/666174#Intent;package=com.webintoapp;scheme=https;end`;
        
        // Fallback after delay
        setTimeout(() => {
          window.open(url, '_blank');
        }, 500);
      } else {
        // Desktop experience
        const newWindow = window.open('', '_blank');
        newWindow.location.href = url;
      }
    } catch (e) {
      console.error('Redirect failed:', e);
      // Fallback for all errors
      window.location.href = url;
    } finally {
      // Reset button state after 1.5s
      setTimeout(() => {
        btn.innerHTML = `
          <img src="assests/icons/share (1).png" class="img-icon" alt="Download">
          <span>Get the App</span>
        `;
        btn.classList.remove('clicked');
      }, 1500);
    }
  });
  
  // Helper functions
  function trackEvent(event, data) {
    // Supports Google Analytics, Facebook Pixel, and others
    if (typeof gtag !== 'undefined') gtag('event', event, data);
    if (typeof fbq !== 'undefined') fbq('track', event, data);
    if (typeof amplitude !== 'undefined') amplitude.logEvent(event, data);
  }
  
  function detectPlatform() {
    const ua = navigator.userAgent;
    if (/Android/i.test(ua)) return 'android';
    if (/iPhone|iPad/i.test(ua)) return 'ios';
    return 'desktop';
  }