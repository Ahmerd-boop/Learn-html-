document.getElementById('forward-btn').addEventListener('click', function () {
    const appLink = "https://play.google.com/store/apps/details?id=com.htmlhausa";
    const message = "📢 Don't just learn alone! 🎉 Join me in mastering HTML in Hausa with this amazing app! Download now and start coding today! 🚀🔥\n\n" + appLink;

    if (navigator.share) {
        // Native Share API (for mobile users)
        navigator.share({
            title: "Learn HTML App by CodeNova",
            text: message,
            url: appLink
        }).then(() => console.log('Shared successfully'))
          .catch((error) => console.log('Error sharing:', error));
    } else {
        // Fallback for browsers that don't support navigator.share
        showShareOptions(message);
    }
});

// Function to show manual sharing options (WhatsApp, Facebook, Telegram)
function showShareOptions(message) {
    let encodedMessage = encodeURIComponent(message);

    let shareOptions = `
        <div id="share-options">
            <h3>📲 Share with Friends</h3>
            <a href="https://api.whatsapp.com/send?text=${encodedMessage}" target="_blank">📩 WhatsApp</a><br>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedMessage}" target="_blank">📘 Facebook</a><br>
            <a href="https://t.me/share/url?url=${encodedMessage}" target="_blank">✈️ Telegram</a><br>
            <a href="sms:?body=${encodedMessage}" target="_blank">📩 SMS</a><br>
            <a href="mailto:?subject=HTML Hausa App&body=${encodedMessage}" target="_blank">📧 Email</a><br>
            <button onclick="document.getElementById('share-options').remove()">❌ Close</button>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", shareOptions);
}
