
// =========================================
// GLOW NAILS — JAVASCRIPT
// Handles service filters, dark mode, and year.
// =========================================

// 1. Update the copyright year automatically.
const yearElement = document.getElementById("yr");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// 2. SERVICE FILTERS
// Show only the services matching the selected category.
const filterButtons = document.querySelectorAll(".filter-btn");
const serviceCards = document.querySelectorAll("#service-grid .card");
const emptyMessage = document.getElementById("empty");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedCategory = button.dataset.f;
    let visibleCount = 0;

    // Update the selected filter button.
    filterButtons.forEach(function (item) {
      const isSelected = item === button;

      item.classList.toggle("on", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });

    // Show or hide each service card.
    serviceCards.forEach(function (card) {
      const matches =
        selectedCategory === "all" ||
        card.dataset.c === selectedCategory;

      card.hidden = !matches;

      if (matches) {
        visibleCount++;
      }
    });

    // Show a message if a category has no services.
    if (emptyMessage) {
      emptyMessage.hidden = visibleCount > 0;
    }
  });
});

// 3. DARK MODE
// Toggle the dark class on the body and update the button.
const themeButton = document.getElementById("theme");

if (themeButton) {
  themeButton.addEventListener("click", function () {
    const darkModeEnabled = document.body.classList.toggle("dark");

    themeButton.textContent = darkModeEnabled ? "☀" : "☾";
    themeButton.setAttribute(
      "aria-pressed",
      String(darkModeEnabled)
    );
    themeButton.setAttribute(
      "aria-label",
      darkModeEnabled ? "Switch to light mode" : "Switch to dark mode"
    );
  });
}
