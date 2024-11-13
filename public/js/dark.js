// dark-mode.js
document.addEventListener('DOMContentLoaded', () => {
    // Check localStorage for dark mode preference
    const darkModeEnabled = localStorage.getItem('dark-mode') === 'true';

    // Apply the dark mode class to the body
    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
    }

    // Toggle dark mode on button click
    document.getElementById('toggle-dark-mode').addEventListener('click', () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('dark-mode', isDarkMode);
    });
});
