document.addEventListener('DOMContentLoaded', function() {
  const shareBtn = document.getElementById('forward-btn');
  const shareModal = document.querySelector('.share-modal');
  const closeModal = document.querySelector('.close-modal');
  const copyBtn = document.querySelector('.copy-btn');
  const nativeShareBtn = document.getElementById('native-share');
  const url = "https://www.webintoapp.com/store/666174";
  
  // Modern share button with loading state
  shareBtn.addEventListener('click', function() {
    // Show loading state
    shareBtn.querySelector('.btn-content').style.opacity = '0';
    shareBtn.querySelector('.btn-loader').style.opacity = '1';
    
    setTimeout(() => {
      // Show modal after slight delay
      shareModal.classList.add('show-modal');
      
      // Reset button
      shareBtn.querySelector('.btn-content').style.opacity = '1';
      shareBtn.querySelector('.btn-loader').style.opacity = '0';
    }, 500);
  });
  
  // Close modal
  closeModal.addEventListener('click', () => {
    shareModal.classList.remove('show-modal');
  });
  
  // Click outside to close
  shareModal.addEventListener('click', (e) => {
    if (e.target === shareModal) {
      shareModal.classList.remove('show-modal');
    }
  });
  
  // Copy link functionality
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(url).then(() => {
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
      }, 2000);
    }).catch(() => {
      // Fallback for older browsers
      const input = document.querySelector('.link-container input');
      input.select();
      document.execCommand('copy');
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
      }, 2000);
    });
  });
  
  // Native share API
  nativeShareBtn.addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({
        title: 'Learn HTML App',
        text: 'Check out this awesome app for learning HTML!',
        url: url
      }).catch(() => {
        // User cancelled share
      });
    } else {
      // Fallback for browsers without Web Share API
      window.open(`https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20app%20for%20learning%20HTML!&url=${encodeURIComponent(url)}`, '_blank');
    }
  });
  
  // Social sharing
  document.querySelectorAll('[data-share]').forEach(btn => {
    btn.addEventListener('click', function() {
      const platform = this.dataset.share;
      let shareUrl = '';
      
      switch(platform) {
        case 'whatsapp':
          shareUrl = `https://wa.me/?text=${encodeURIComponent('Check out this app: ' + url)}`;
          break;
        case 'telegram':
          shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent('Learn HTML App')}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out this app: ' + url)}`;
          break;
      }
      
      window.open(shareUrl, '_blank', 'width=550,height=420');
    });
  });
});