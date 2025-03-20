let freeDownloads = localStorage.getItem("freeDownloads") ? parseInt(localStorage.getItem("freeDownloads")) : 1;
document.getElementById("free-count").textContent = freeDownloads;

function downloadFile(fileName) {
    if (freeDownloads > 0) {
        freeDownloads--;
        localStorage.setItem("freeDownloads", freeDownloads);
        document.getElementById("free-count").textContent = freeDownloads;
        window.location.href = fileName;  // Start download
    } else {
        initiatePayment(fileName);
    }
}

function initiatePayment(fileName) {
    let handler = PaystackPop.setup({
        key: "pk_live_080c02203f22a09741c46f0518e4b301322e3b87",  // Replace with your Paystack PUBLIC key
        email: "user@example.com",  // Replace with user's email
        amount: 300 * 100,  // Paystack uses kobo (₦1 = 100 kobo)
        currency: "NGN",
        callback: function(response) {
            checkPaymentStatus(response.reference, fileName);
        },
        onClose: function() {
            alert("❌ Payment was not completed.");
        }
    });
    handler.openIframe();
}

function checkPaymentStatus(reference, fileName) {
    alert("⏳ Verifying payment... Please wait.");

    fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer pk_live_080c02203f22a09741c46f0518e4b301322e3b87`,  // Public Key
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status && data.data.status === "success") {
            alert("✅ Payment successful! Your download will start now.");
            window.location.href = fileName;  // Start download
        } else {
            alert("❌ Payment verification failed. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error verifying payment:", error);
        alert("⚠️ Network error while verifying payment.");
    });
}