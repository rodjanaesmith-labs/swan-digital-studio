
// =========================================================
// SPARKLE HOME CLEANING
// Website interactions by Swan Digital Studio.
//
// Features:
// 1. Automatic copyright year
// 2. Service category filters
// 3. Mobile navigation
// 4. Dark and light mode
// 5. Service and package selection
// 6. Preferred-date validation
// 7. WhatsApp enquiry preparation
// =========================================================


// 1. AUTOMATIC COPYRIGHT YEAR
// Keeps the footer year up to date.
const yearElement = document.getElementById("yr");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// 2. SERVICE FILTERS
// Each filter's data-f value matches the service card's data-c value.
const filterButtons = document.querySelectorAll(".filter-btn");
const serviceCards = document.querySelectorAll("#items .service-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.f;

    // Highlight the selected filter and update its accessibility state.
    filterButtons.forEach((filter) => {
      const isActive = filter === button;

      filter.classList.toggle("on", isActive);
      filter.setAttribute("aria-pressed", String(isActive));
    });

    // Show all services or only the selected category.
    serviceCards.forEach((card) => {
      const matches =
        selectedCategory === "all" ||
        card.dataset.c === selectedCategory;

      card.hidden = !matches;
    });
  });
});


// 3. MOBILE NAVIGATION
// Opens the navigation on mobile screens and closes it after selection.
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

  // Close the mobile menu after clicking a navigation link.
  mainNav.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
    });
  });

  // Reset the navigation when switching back to desktop width.
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
// The stylesheet changes the colours when body has the "dark" class.
const themeButton = document.getElementById("theme");

if (themeButton) {
  themeButton.addEventListener("click", () => {
    const darkModeEnabled = document.body.classList.toggle("dark");

    themeButton.textContent = darkModeEnabled ? "☀" : "☾";

    themeButton.setAttribute(
      "aria-pressed",
      String(darkModeEnabled)
    );

    themeButton.setAttribute(
      "aria-label",
      darkModeEnabled ? "Switch to light theme" : "Switch to dark theme"
    );
  });
}


// 5. SERVICE AND PACKAGE SELECTION
// Clicking a service link fills the service field in the enquiry form.
const serviceLinks = document.querySelectorAll(".service-link[data-service]");
const serviceSelect = document.getElementById("service-choice");
const packageButtons = document.querySelectorAll(".package-select");
const packageSelect = document.getElementById("package-choice");

serviceLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (serviceSelect) {
      const requestedService = link.dataset.service;

      // Select the matching option if it exists in the form.
      const matchingOption = Array.from(serviceSelect.options).find(
        (option) => option.value === requestedService ||
          option.textContent.trim() === requestedService
      );

      if (matchingOption) {
        serviceSelect.value = matchingOption.value;
      }
    }
  });
});

packageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (packageSelect) {
      packageSelect.value = button.dataset.package || "";
    }
  });
});


// 6. PREFERRED-DATE VALIDATION
// Prevents the visitor from choosing a date in the past.
const dateInput = document.getElementById("preferred-date");

if (dateInput) {
  const today = new Date();

  // Use the visitor's local date instead of UTC.
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  dateInput.min = `${year}-${month}-${day}`;
}


// 7. WHATSAPP ENQUIRY FORM
// Prepares a message in WhatsApp for the customer to review and send.
//
// IMPORTANT:
// - Replace the placeholder number below with the real business number.
// - Use the international country code and digits only.
// - This does not send an email, save submissions, or confirm bookings.

const WHATSAPP_NUMBER = "18760000000";
const PLACEHOLDER_NUMBER = "18760000000";

const contactForm = document.getElementById("f");
const formMessage = document.getElementById("msg");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    // Prevent normal form submission to a nonexistent server.
    event.preventDefault();

    // Ask the browser to validate required fields.
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      formMessage.textContent =
        "Please complete the required fields before continuing.";
      return;
    }

    // Do not pretend to send a message using the sample number.
    if (
      !/^\d{8,15}$/.test(WHATSAPP_NUMBER) ||
      WHATSAPP_NUMBER === PLACEHOLDER_NUMBER
    ) {
      formMessage.textContent =
        "The WhatsApp number has not been configured yet. " +
        "Replace the sample number in script.js and index.html.";
      return;
    }

    // Read the submitted form values.
    const formData = new FormData(contactForm);

    const name = String(formData.get("name") || "").trim();
    const contact = String(formData.get("contact") || "").trim();
    const service = String(formData.get("service") || "");
    const packageName = String(formData.get("package") || "Not sure yet");
    const preferredDate = String(formData.get("date") || "");
    const message = String(formData.get("message") || "").trim();

    // Format the preferred date when one has been selected.
    let formattedDate = "Flexible / not specified";

    if (preferredDate) {
      const [year, month, day] = preferredDate.split("-").map(Number);

      // Create a local date to avoid timezone shifts.
      const localDate = new Date(year, month - 1, day);

      formattedDate = localDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }

    // Build a readable enquiry message.
    const enquiry = [
      "Hello Sparkle Home Cleaning!",
      "",
      "I would like to request a cleaning quote.",
      "",
      `Name: ${name}`,
      `Phone or email: ${contact}`,
      `Service requested: ${service}`,
      `Package interest: ${packageName}`,
      `Preferred date: ${formattedDate}`,
      "",
      "Details about my space:",
      message,
      "",
      "Please let me know the price and availability."
    ].join("\n");

    // Encode the message for the WhatsApp URL.
    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(enquiry)}`;

    // Open WhatsApp for the customer to review and send.
    const newWindow = window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );

    if (newWindow) {
      formMessage.textContent =
        "Your enquiry has been prepared in WhatsApp. " +
        "Review the details and press Send to contact the business.";
    } else {
      // Fallback for browsers that block new tabs.
      formMessage.textContent =
        "Your enquiry is ready, but the browser may have blocked the new tab. " +
        "Allow pop-ups and try again.";
    }
  });
}
