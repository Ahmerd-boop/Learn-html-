// Function to save the last visited lesson
function saveLastLesson(lessonPage) {
    localStorage.setItem("lastLesson", lessonPage); // Save in localStorage
}

// Function to continue from the last visited lesson
function continueLastLesson() {
    let lastLesson = localStorage.getItem("lastLesson"); // Get last saved lesson

    if (lastLesson) {
        window.location.href = lastLesson; // Redirect to the last lesson
    } else {
        alert("You haven't started a lesson yet!"); // Show message if no lesson is saved
    }
}

// Automatically save the current page when the user visits a lesson
document.addEventListener("DOMContentLoaded", function () {
    let currentPage = window.location.pathname.split("/").pop(); // Get current page name
    if (currentPage !== "index.html" && currentPage !== "lessons.html") {
        saveLastLesson(currentPage); // Save the lesson page
    }
});
document.addEventListener("DOMContentLoaded", function () {
    let currentPage = window.location.pathname.split("/").pop(); // Get current page name

    if (currentPage.includes("lesson")) { // Save only lesson pages
        saveLastLesson(currentPage);
    }
});
