// =========================================================
// MANGO LANE JUICE BAR
// Starter website interactions by Swan Digital Studio.
// =========================================================

// 1. AUTOMATIC COPYRIGHT YEAR
// Keeps the footer year current without manual updates.
const yearElement = document.getElementById("yr");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// 2. MENU FILTERS
// Shows all items or only the selected category.
// The data-f value on each button matches the cards' data-c value.
const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll("#items .menu-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.f;

    // Update the active button and its accessibility state.
    filterButtons.forEach((item) => {
      const isActive = item === button;

      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    // Hide cards that do not belong to the selected category.
    menuCards.forEach((card) => {
      const matchesCategory =
        selectedCategory === "all" ||
        card.dataset.c === selectedCategory;

      card.hidden = !matchesCategory;
    });
  });
});


// 3. MOBILE NAVIGATION
// Opens and closes the navigation menu on smaller screens.
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  // Close the mobile menu after a navigation link is selected.
  mainNav.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
    });
  });

  // If the screen becomes wider, reset the mobile menu state.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
    }
  });
}


// 4. DARK MODE
// Toggles the "dark" class on the body.
// The stylesheet defines the dark theme's colours.
const themeButton = document.getElementById("theme");

if (themeButton) {
  themeButton.addEventListener("click", () => {
    const darkModeEnabled = document.body.classList.toggle("dark");

    themeButton.textContent = darkModeEnabled ? "☀" : "☾";
    themeButton.setAttribute("aria-pressed", String(darkModeEnabled));
    themeButton.setAttribute(
      "aria-label",
      darkModeEnabled ? "Switch to light theme" : "Switch to dark theme"
    );
  });
}
