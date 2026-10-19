
/* =========================================
   BRIGHT MINDS TUTORING
   Interactive features by Swan Digital Studio
   ========================================= */

// 1. AUTOMATIC COPYRIGHT YEAR
const yearElement = document.getElementById("yr");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// 2. DARK MODE
const themeButton = document.getElementById("theme");

function updateThemeButton() {
  if (!themeButton) return;

  const isDark = document.body.classList.contains("dark");

  themeButton.textContent = isDark ? "☀️" : "🌙";

  themeButton.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
}

if (themeButton) {
  themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    updateThemeButton();
  });

  updateThemeButton();
}


// 3. WHATSAPP LINKS
// The HTML contains the sample number.
// Replace it in index.html with the real business number.
// Example format for Jamaica: https://wa.me/1876XXXXXXX
// Use the full international number with digits only.
