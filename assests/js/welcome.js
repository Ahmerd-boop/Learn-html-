document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("firstVisit")) {
        // Show welcome popup
        let welcomePopup = document.createElement("div");
        welcomePopup.id = "welcome-popup";
        welcomePopup.innerHTML = `
            <div class="welcome-content">
                <h2>🎉 Welcome to CodeNova Learn HTML App!</h2>
                <p>We are happy to have you here! 🚀 Explore and enjoy learning.</p>
                <button id="welcome-btn">Get Started</button>
            </div>
        `;
        document.body.appendChild(welcomePopup);

        // When the user clicks "Get Started", close the popup
        document.getElementById("welcome-btn").addEventListener("click", function () {
            localStorage.setItem("firstVisit", "true"); // Mark as visited
            closeWelcomePopup();
        });
    }

    function closeWelcomePopup() {
        let popup = document.getElementById("welcome-popup");
        if (popup) popup.remove();
    }
});
