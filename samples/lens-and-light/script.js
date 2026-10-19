/* ==================================================
   SCRIPT FILE: Lens & Light Photography
   Small interactive features for the website.
   Each part checks that its required element exists.
================================================== */

document.addEventListener("DOMContentLoaded", function () {

  // -----------------------------------------------
  // 1) FOOTER YEAR: automatically update copyright
  // -----------------------------------------------

  const yearElement = document.getElementById("yr");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // -----------------------------------------------
  // 2) MOBILE NAVIGATION: open and close the menu
  // -----------------------------------------------

  const menuButton = document.getElementById("menu-toggle");
  const navigation = document.getElementById("main-nav");

  if (menuButton && navigation) {

    // Helper function: close the menu and reset its button.
    function closeMenu() {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      menuButton.textContent = "☰";
    }

    // Clicking the menu button toggles the mobile navigation.
    menuButton.addEventListener("click", function () {
      const isOpen = navigation.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

      menuButton.textContent = isOpen ? "✕" : "☰";
    });

    // Close the menu when a navigation link is selected.
    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Close the menu when the visitor clicks outside it.
    document.addEventListener("click", function (event) {
      if (
        navigation.classList.contains("open") &&
        !navigation.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        closeMenu();
      }
    });

    // Reset the mobile menu when switching back to desktop width.
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }

  // -----------------------------------------------
  // 3) PORTFOLIO FILTERS:
  //    show cards whose data-c matches the selected
  //    filter button's data-f value.
  // -----------------------------------------------

  const filterButtons = document.querySelectorAll(".tabs button");
  const portfolioCards = document.querySelectorAll("#items .portfolio-card");

  filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {
      const selectedFilter = button.dataset.f;

      // Remove the active state from every filter button.
      filterButtons.forEach(function (otherButton) {
        otherButton.classList.remove("on");
        otherButton.setAttribute("aria-pressed", "false");
      });

      // Highlight the button that was clicked.
      button.classList.add("on");
      button.setAttribute("aria-pressed", "true");

      // Show all cards, or only those matching the category.
      portfolioCards.forEach(function (card) {
        const category = card.dataset.c;

        const shouldShow =
          selectedFilter === "all" ||
          category === selectedFilter;

        card.hidden = !shouldShow;
      });
    });
  });

  // -----------------------------------------------
  // 4) DARK / LIGHT MODE:
  //    toggle the 'dark' class on the body.
  // -----------------------------------------------

  const themeButton = document.getElementById("theme");

  if (themeButton) {

    themeButton.addEventListener("click", function () {
      const isDark = document.body.classList.toggle("dark");

      // Update the button icon and accessibility state.
      themeButton.textContent = isDark ? "☀" : "☾";

      themeButton.setAttribute("aria-pressed", String(isDark));

      themeButton.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
      );
    });
  }

  // -----------------------------------------------
  // 5) PACKAGE SELECTION:
  //    clicking a package fills in the contact form.
  // -----------------------------------------------

  const packageDropdown = document.getElementById("package-choice");
  const packageButtons = document.querySelectorAll(".package-select");

  packageButtons.forEach(function (button) {

    button.addEventListener("click", function () {
      const selectedPackage = button.dataset.package;

      if (packageDropdown && selectedPackage) {
        packageDropdown.value = selectedPackage;
      }

      // The link then scrolls to the contact form.
    });
  });

  // -----------------------------------------------
  // 6) DATE FIELD:
  //    prevent selecting a date earlier than today.
  // -----------------------------------------------

  const dateInput = document.getElementById("session-date");

  if (dateInput) {
    const today = new Date();

    // Build a local YYYY-MM-DD date without UTC conversion.
    const localDate = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0")
    ].join("-");

    dateInput.min = localDate;
  }

  // -----------------------------------------------
  // 7) CONTACT FORM:
  //    validate fields and prepare a WhatsApp enquiry.
  //
  //    IMPORTANT:
  //    Replace the demo WhatsApp number below with the
  //    real business number, including the country code.
  //    Use digits only: no spaces, plus signs, or dashes.
  //
  //    Example format for Jamaica: 1876XXXXXXX
  //
  //    This demo does not send email or store form data.
  // -----------------------------------------------

  const contactForm = document.getElementById("f");
  const messageStatus = document.getElementById("msg");

  // Replace this placeholder before using the enquiry form.
  const WHATSAPP_NUMBER = "18760000000";

  if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

      // Keep the visitor on the page instead of submitting to nowhere.
      event.preventDefault();

      // Let the browser check required fields and valid input.
      if (!contactForm.reportValidity()) {
        return;
      }

      // Stop the demo from accidentally opening a placeholder number.
      const isValidNumber = /^\d{8,15}$/.test(WHATSAPP_NUMBER);
      const isPlaceholder = WHATSAPP_NUMBER === "18760000000";

      if (!isValidNumber || isPlaceholder) {
        if (messageStatus) {
          messageStatus.textContent =
            "The form is ready, but the business WhatsApp number needs to be configured in script.js before you can send an enquiry.";

          messageStatus.className = "form-status error";
        }

        return;
      }

      // Collect the visitor's answers from the form.
      const formData = new FormData(contactForm);

      const customerName = String(formData.get("name") || "").trim();
      const customerContact = String(formData.get("contact") || "").trim();
      const service = String(formData.get("service") || "").trim();
      const selectedPackage = String(formData.get("package") || "").trim();
      const preferredDate = String(formData.get("date") || "").trim();
      const customerMessage = String(formData.get("message") || "").trim();

      // Build a readable enquiry message for WhatsApp.
      const enquiry = [
        "Hello Lens & Light Photography!",
        "",
        "I would like to enquire about a photography session.",
        "",
        "Name: " + customerName,
        "Phone or email: " + customerContact,
        "Photography service: " + service,
        "Package: " + (selectedPackage || "Not sure yet"),
        "Preferred date: " + preferredDate,
        "",
        "Session details:",
        customerMessage
      ].join("\n");

      // Encode the message so spaces and special characters work in the URL.
      const whatsappURL =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(enquiry);

      // Explain what will happen before opening WhatsApp.
      if (messageStatus) {
        messageStatus.textContent =
          "Your enquiry is prepared. WhatsApp will open so you can review the message and press Send.";

        messageStatus.className = "form-status success";
      }

      // Open WhatsApp in a new tab; the visitor must send the message.
      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
  }

  // -----------------------------------------------
  // 8) REVIEWS:
  //    intentionally no JavaScript is required.
  //    The review cards stay visible at the bottom
  //    of the page. There is no rotating slider,
  //    interval, arrow button, or pause button.
  // -----------------------------------------------

});
