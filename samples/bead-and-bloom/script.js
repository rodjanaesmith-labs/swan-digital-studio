// ============================================
// BEAD & BLOOM — JAVASCRIPT
//
// This file controls:
// 1. The automatic copyright year.
// 2. Product category filters.
// 3. The dark-mode toggle.
// 4. The contact form and WhatsApp message.
//
// Make sure the IDs and class names below match
// the elements in index.html.
// ============================================


// --------------------------------------------
// 1. AUTOMATIC COPYRIGHT YEAR
// --------------------------------------------

// Find the footer's year element.
const yearElement = document.getElementById("yr");

// Display the current year automatically so the
// footer does not need to be updated every January.
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// --------------------------------------------
// 2. PRODUCT CATEGORY FILTERS
// --------------------------------------------

// Collect all category filter buttons.
const filterButtons = document.querySelectorAll(".tabs button");

// Collect all product cards.
const productCards = document.querySelectorAll(".card");

// Find the message displayed when no products match.
const emptyMessage = document.getElementById("empty");

// Apply a filter to the product collection.
function filterProducts(category) {
  // Count the cards that match the selected category.
  let visibleCount = 0;

  productCards.forEach(function (card) {
    // Each card has a data-c attribute in index.html.
    // Example: data-c="Bracelets"
    const productCategory = card.dataset.c;

    // The "all" category displays every product.
    // Otherwise, the category must match exactly.
    const shouldShow =
      category === "all" || productCategory === category;

    // The hidden property removes non-matching cards
    // from the visible page and its normal layout.
    card.hidden = !shouldShow;

    if (shouldShow) {
      visibleCount++;
    }
  });

  // Show the empty-state message if no cards match.
  if (emptyMessage) {
    emptyMessage.hidden = visibleCount !== 0;
  }
}

// Listen for clicks on every filter button.
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Read the selected category from data-f.
    const selectedCategory = button.dataset.f;

    // Update which products are visible.
    filterProducts(selectedCategory);

    // Update the selected button's visual appearance
    // and accessibility state.
    filterButtons.forEach(function (otherButton) {
      const isSelected = otherButton === button;

      otherButton.classList.toggle("on", isSelected);

      otherButton.setAttribute(
        "aria-pressed",
        String(isSelected)
      );
    });
  });
});

// Display every product when the page first loads.
filterProducts("all");


// --------------------------------------------
// 3. DARK-MODE TOGGLE
// --------------------------------------------

// Find the theme button.
const themeButton = document.getElementById("theme");

// Update the button icon and its accessible label
// to reflect the current theme.
function updateThemeButton() {
  if (!themeButton) {
    return;
  }

  const darkModeEnabled = document.body.classList.contains("dark");

  // The moon suggests switching to dark mode.
  // The sun suggests switching back to light mode.
  themeButton.textContent = darkModeEnabled ? "☀️" : "🌙";

  themeButton.setAttribute(
    "aria-label",
    darkModeEnabled
      ? "Switch to light mode"
      : "Switch to dark mode"
  );

  themeButton.title = darkModeEnabled
    ? "Switch to light mode"
    : "Switch to dark mode";
}

// Toggle the body.dark class when the button is clicked.
if (themeButton) {
  themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    // Refresh the icon and accessible label.
    updateThemeButton();
  });

  // Set the correct icon when the page initially loads.
  updateThemeButton();
}


// --------------------------------------------
// 4. WHATSAPP CONTACT FORM
// --------------------------------------------

// Find the contact form and its status message.
const contactForm = document.getElementById("f");
const messageStatus = document.getElementById("msg");

// IMPORTANT:
// Replace this placeholder with the real Bead & Bloom
// WhatsApp number before using the contact form.
//
// Use the international country code followed by digits.
// Example format: "1876XXXXXXX"
// Do not include spaces, plus signs, or dashes.
const WHATSAPP_NUMBER = "18760000000";

// Prepare a WhatsApp enquiry when the form is submitted.
if (contactForm && messageStatus) {
  contactForm.addEventListener("submit", function (event) {
    // Prevent the browser from submitting the form
    // and reloading the page.
    event.preventDefault();

    // Ask the browser to check required fields.
    // Stop if any field is invalid.
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    // Read the submitted form fields.
    const formData = new FormData(contactForm);

    const name = String(
      formData.get("name") || ""
    ).trim();

    const reply = String(
      formData.get("reply") || ""
    ).trim();

    const message = String(
      formData.get("message") || ""
    ).trim();

    // Do not open WhatsApp with a placeholder number.
    // Replace the placeholder above with the actual number.
    if (
      !WHATSAPP_NUMBER ||
      WHATSAPP_NUMBER === "18760000000" ||
      !/^\d+$/.test(WHATSAPP_NUMBER)
    ) {
      messageStatus.textContent =
        "The contact form is not connected yet. Please add the real Bead & Bloom WhatsApp number in script.js.";

      messageStatus.classList.add("error");
      return;
    }

    // Construct the message the customer will see in WhatsApp.
    const whatsappMessage = [
      "Hello Bead & Bloom!",
      "",
      "Name: " + name,
      "Email or phone: " + reply,
      "",
      "My message:",
      message
    ].join("\n");

    // Encode the message so spaces, punctuation, and
    // line breaks work correctly in the URL.
    const whatsappURL =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(whatsappMessage);

    // Tell the visitor what is happening.
    // The visitor must still press Send inside WhatsApp.
    messageStatus.classList.remove("error");
    messageStatus.textContent =
      "Opening WhatsApp with your prepared message. Review it and press Send to submit your enquiry.";

    // Open WhatsApp in a separate tab.
    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });
}
