function unlockPremiumFeatures() {
    let lockedButtons = document.querySelectorAll('.editor-toolbar .locked');
    lockedButtons.forEach(button => {
        button.classList.remove('locked');
        button.style.background = '#007bff';
        button.style.pointerEvents = 'auto';
    });

    let upgradeButton = document.getElementById('upgrade');
    upgradeButton.innerText = '✅ Premium Unlocked!';
    upgradeButton.disabled = true;
    upgradeButton.style.background = '#ccc';
}


window.onload = function() {
    if (localStorage.getItem('premium') === 'unlocked') {
        unlockPremiumFeatures();
    }
};

// Function to unlock premium features
function unlockPremiumFeatures() {
    let lockedButtons = document.querySelectorAll('.editor-toolbar .locked');
    lockedButtons.forEach(button => {
        button.classList.remove('locked');
        button.style.background = '#007bff';
        button.style.pointerEvents = 'auto';
    });

    let upgradeButton = document.getElementById('upgrade');
    upgradeButton.innerText = '✅ Premium Unlocked!';
    upgradeButton.disabled = true;
    upgradeButton.style.background = '#ccc';
}

// Check if the user has premium when the page loads
window.onload = function () {
    if (localStorage.getItem('premium') === 'unlocked') {
        unlockPremiumFeatures();
    }
};

// Paystack payment function
function payWithPaystack() {
    let userEmail = prompt("Enter your email to proceed with payment:");
    if (!userEmail) {
        alert("Email is required to proceed.");
        return;
    }

    let handler = PaystackPop.setup({
        key: 'pk_live_080c02203f22a09741c46f0518e4b301322e3b87', // Your Paystack Public Key
        email: userEmail,
        amount: 70000, // NGN 700 in kobo
        currency: 'NGN',
        callback: function (response) {
            // Assuming payment is successful (should be verified by backend)
            alert('Payment successful! Premium unlocked.');
            localStorage.setItem('premium', 'unlocked');
            unlockPremiumFeatures();
        },
        onClose: function () {
            alert('Payment canceled.');
        }
    });

    handler.openIframe();
}
