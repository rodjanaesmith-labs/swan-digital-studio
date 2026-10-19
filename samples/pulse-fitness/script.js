/* =========================================================
   PULSE FITNESS STUDIO
   Website interactions by Swan Digital Studio.

   This script handles:
   1. Automatic footer year
   2. Class filters
   3. Mobile navigation
   4. Dark and light themes
   5. Membership selection
   6. Preferred-date validation
   7. WhatsApp enquiry preparation
   ========================================================= */


// 1. AUTOMATIC COPYRIGHT YEAR
// Updates the year in the footer automatically.
const yearElement = document.getElementById("yr");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// 2. CLASS FILTERS
// Shows only classes belonging to the selected category.
// Each button's data-f value matches a card's data-c value.
const filterButtons = document.querySelectorAll(".filter-btn");
const classCards = document.querySelectorAll("#items .class-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.f;

    // Highlight the selected filter and update accessibility state.
    filterButtons.forEach((filter) => {
      const isActive = filter === button;

      filter.classList.toggle("on", isActive);
      filter.setAttribute("aria-pressed", String(isActive));
    });

    // Hide cards that do not match the selected category.
    classCards.forEach((card) => {
      const matchesCategory =
        selectedCategory === "all" ||
        card.dataset.c === selectedCategory;

      card.hidden = !matchesCategory;
    });
  });
});


// 3. MOBILE NAVIGATION
// Opens and closes the navigation menu on small screens.
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

  // Close the menu after a visitor chooses a navigation link.
  mainNav.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
    });
  });

  // Reset the mobile menu if the screen becomes wider.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
    }
  });
}


// 4. DARK AND LIGHT MODE
// The CSS changes the website colours when body has class "dark".
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


// 5. MEMBERSHIP SELECTION
// Clicking a membership button fills the membership field in the form.
const packageButtons = document.querySelectorAll(".package-select");
const packageSelect = document.getElementById("package-choice");

packageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (packageSelect) {
      packageSelect.value = button.dataset.package || "";
    }
  });
});


// 6. PREFERRED-DATE VALIDATION
// Prevents visitors from selecting a date in the past.
const dateInput = document.getElementById("preferred-date");

if (dateInput) {
  const today = new Date();
  const localYear = today.getFullYear();
  const localMonth = String(today.getMonth() + 1).padStart(2, "0");
  const localDay = String(today.getDate()).padStart(2, "0");

  // Use the visitor's local date rather than UTC.
  dateInput.min = `${localYear}-${localMonth}-${localDay}`;
}


// 7. WHATSAPP ENQUIRY FORM
// Prepares an enquiry in WhatsApp for the visitor to review and send.
// This demo does not send email, store form entries, or book classes
// automatically. Replace the sample number before publishing.

const WHATSAPP_NUMBER = "18760000000";
const PLACEHOLDER_NUMBER = "18760000000";

const contactForm = document.getElementById("f");
const formMessage = document.getElementById("msg");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    // Keep the browser from submitting to a nonexistent server.
    event.preventDefault();

    // Check required fields and built-in browser validation.
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      formMessage.textContent =
        "Please complete all required fields correctly.";
      return;
    }

    // Stop before opening WhatsApp if the sample number is unchanged.
    if (
      !/^\d{8,15}$/.test(WHATSAPP_NUMBER) ||
      WHATSAPP_NUMBER === PLACEHOLDER_NUMBER
    ) {
      formMessage.textContent =
        "The studio's WhatsApp number has not been configured yet. " +
        "Please replace the sample number in script.js and index.html.";
      return;
    }

    // Read the form fields using their name attributes.
    const formData = new FormData(contactForm);

    const customerName = formData.get("name").trim();
    const customerContact = formData.get("contact").trim();
    const service = formData.get("service");
    const membership = formData.get("package") || "Not sure yet";
    const preferredDate = formData.get("date");
    const customerMessage = formData.get("message").trim();

    // Convert the date into a more readable format.
    const readableDate = new Date(
      `${preferredDate}T12:00:00`
    ).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    // Build a clear enquiry for the studio.
    const enquiry = [
      "Hello Pulse Fitness Studio!",
      "",
      "I would like to enquire about your services.",
      "",
      `Name: ${customerName}`,
      `Phone or email: ${customerContact}`,
      `Class or service: ${service}`,
      `Membership interest: ${membership}`,
      `Preferred date: ${readableDate}`,
      "",
      "Additional details:",
      customerMessage
    ].join("\n");

    // Encode the enquiry so it can be safely included in the URL.
    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(enquiry)}`;

    // Open WhatsApp in a new tab for the visitor to review and send.
    const whatsappWindow = window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );

    if (whatsappWindow) {
      formMessage.textContent =
        "Your enquiry has been prepared in WhatsApp. " +
        "Review the details and press Send to contact the studio.";
    } else {
      formMessage.textContent =
        "WhatsApp could not open automatically. " +
        "Please check your browser's pop-up settings and try again.";
    }
  });
}
