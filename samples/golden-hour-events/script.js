/* =========================================
   GOLDEN HOUR EVENTS
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  // Update the copyright year.
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // -----------------------------------------
  // MOBILE NAVIGATION
  // -----------------------------------------

  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");

  if (menuToggle && mainNav) {
    function closeMenu() {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
    }

    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Close the menu after selecting a navigation link.
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close the menu when clicking outside it.
    document.addEventListener("click", (event) => {
      if (
        mainNav.classList.contains("open") &&
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    // Close the mobile menu when returning to desktop width.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }

  // -----------------------------------------
  // DARK / LIGHT THEME
  // -----------------------------------------

  const themeToggle = document.getElementById("theme-toggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark-theme");

      themeToggle.textContent = isDark ? "☀" : "☾";
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
      );
    });
  }

  // -----------------------------------------
  // SERVICE FILTERS
  // -----------------------------------------

  const filterButtons = document.querySelectorAll(".filter-btn");
  const serviceCards = document.querySelectorAll(".service-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      // Update the active filter button.
      filterButtons.forEach((item) => {
        const isActive = item === button;

        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      // Show only cards matching the selected category.
      serviceCards.forEach((card) => {
        const category = card.dataset.category;
        const shouldShow =
          selectedFilter === "all" || category === selectedFilter;

        card.hidden = !shouldShow;
      });
    });
  });

  // -----------------------------------------
  // PACKAGE SELECTION
  // -----------------------------------------

  const packageSelect = document.getElementById("package");
  const packageButtons = document.querySelectorAll(".package-select");

  packageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedPackage = button.dataset.package;

      if (packageSelect && selectedPackage) {
        packageSelect.value = selectedPackage;
      }
    });
  });

  // -----------------------------------------
  // EVENT DATE VALIDATION
  // -----------------------------------------

  const eventDateInput = document.getElementById("event-date");

  if (eventDateInput) {
    const today = new Date();
    const localToday = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0")
    ].join("-");

    eventDateInput.min = localToday;
  }

  // -----------------------------------------
  // CONTACT FORM
  // -----------------------------------------

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  /*
    IMPORTANT:
    Replace this demo number with the business's real WhatsApp
    number, including the country code, with digits only.

    Example format for Jamaica: 1876XXXXXXX
    Do not include +, spaces, dashes, or brackets.
  */
  const WHATSAPP_NUMBER = "18760000000";

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.reportValidity()) {
        return;
      }

      // Prevent the demo number from being used by mistake.
      if (
        !/^\d{8,15}$/.test(WHATSAPP_NUMBER) ||
        WHATSAPP_NUMBER === "18760000000"
      ) {
        if (formStatus) {
          formStatus.textContent =
            "The enquiry form is ready, but the business WhatsApp number must be added in script.js before it can open WhatsApp.";
          formStatus.className = "form-status error";
        }

        return;
      }

      const formData = new FormData(contactForm);

      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const eventType = String(formData.get("eventType") || "").trim();
      const eventDate = String(formData.get("eventDate") || "").trim();
      const selectedPackage = String(formData.get("package") || "Not sure yet").trim();
      const message = String(formData.get("message") || "").trim();

      const enquiry = [
        "Hello Golden Hour Events!",
        "",
        "I'd like to enquire about an event.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Event type: ${eventType}`,
        `Event date: ${eventDate || "Not decided yet"}`,
        `Package: ${selectedPackage || "Not sure yet"}`,
        "",
        "My event vision:",
        message
      ].join("\n");

      const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(enquiry)}`;

      if (formStatus) {
        formStatus.textContent =
          "Opening WhatsApp with your enquiry. Please review the message and press Send in WhatsApp.";
        formStatus.className = "form-status success";
      }

      // Open WhatsApp; the visitor still needs to send the message.
      const whatsappWindow = window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
      );

      // If the browser blocks the new tab, provide a clickable fallback.
      if (!whatsappWindow && formStatus) {
        formStatus.textContent =
          "Your enquiry is prepared. Your browser may have blocked the WhatsApp tab. Allow pop-ups or open WhatsApp manually.";
      }
    });
  }
});
