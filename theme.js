const themeToggle = document.getElementById("theme-toggle");
let isDarkTheme = false;

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    isDarkTheme = !isDarkTheme;
    themeToggle.textContent = isDarkTheme ? "🌙" : "🌞";
});
