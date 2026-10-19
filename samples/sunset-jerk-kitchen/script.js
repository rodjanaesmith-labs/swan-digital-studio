// =============================================
// SUNSET JERK KITCHEN
// Menu filters, mobile navigation, theme toggle,
// contact form, and automatic footer year.
// =============================================

// Replace this sample number with the business's
// WhatsApp number in international format.
// Jamaica's country code is 1, followed by the
// 10-digit phone number. Do not include + or spaces.
const WHATSAPP_NUMBER = "18760000000";

// Update the copyright year automatically.
const yearElement = document.getElementById("yr");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ---------------------------------------------
// 1. MENU FILTERS
// ---------------------------------------------
const filterButtons = document.querySelectorAll(".tabs button");
const menuCards = document.querySelectorAll("#items .card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.f;

    // Update the selected filter button.
    filterButtons.forEach((item) => {
      const isActive = item === button;

      item.classList.toggle("on", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    // Show all items or only the selected category.
    menuCards.forEach((card) => {
      const matches =
        selectedCategory === "all" ||
        card.dataset.c === selectedCategory;

      card.hidden = !matches;
    });
  });
});

// ---------------------------------------------
// 2. MOBILE NAVIGATION
// ---------------------------------------------
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
  });

  // Close the menu after selecting a navigation link.
  mainNav.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });

  // Close the menu if the screen becomes desktop-sized.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    }
  });
}

// ---------------------------------------------
// 3. DARK MODE
// ---------------------------------------------
const themeButton = document.getElementById("theme");

if (themeButton) {
  themeButton.addEventListener("click", () => {
    const darkModeEnabled = document.body.classList.toggle("dark");

    themeButton.setAttribute(
      "aria-pressed",
      String(darkModeEnabled)
    );

    themeButton.innerHTML = darkModeEnabled
      ? '<span aria-hidden="true">☀</span> Light'
      : '<span aria-hidden="true">☾</span> Dark';
  });
}

// ---------------------------------------------
// 4. CONTACT FORM
// ---------------------------------------------
const contactForm = document.getElementById("f");
const formMessage = document.getElementById("msg");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Browser validation handles required fields.
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      formMessage.textContent =
        "Please complete all required fields.";
      return;
    }

    // Collect the submitted values.
    const formData = new FormData(contactForm);

    const name = String(formData.get("name") || "").trim();
    const contact = String(formData.get("contact") || "").trim();
    const topic = String(formData.get("topic") || "").trim();
    const message = String(formData.get("message") || "").trim();

    // Prepare a readable message for WhatsApp.
    const whatsappMessage = [
      "Hello Sunset Jerk Kitchen!",
      "",
      `Name: ${name}`,
      `Contact: ${contact}`,
      `Enquiry: ${topic}`,
      "",
      "Message:",
      message
    ].join("\n");

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=` +
      encodeURIComponent(whatsappMessage);

    // Warn if the sample number has not been replaced.
    if (WHATSAPP_NUMBER === "18760000000") {
      formMessage.textContent =
        "Demo number detected. Replace WHATSAPP_NUMBER in script.js " +
        "with the real business number before accepting enquiries.";
      return;
    }

    // Open WhatsApp in a new tab. The visitor must
    // review the message and press Send in WhatsApp.
    const whatsappWindow = window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );

    if (whatsappWindow) {
      formMessage.textContent =
        "WhatsApp should open with your message prepared. " +
        "Review it and press Send to contact the kitchen.";
    } else {
      // Provide a usable link if the browser blocks the popup.
      formMessage.textContent =
        "Your message is ready. Use the WhatsApp link below to continue.";

      let fallbackLink = formMessage.querySelector("a");

      if (!fallbackLink) {
        fallbackLink = document.createElement("a");
        fallbackLink.textContent = " Open WhatsApp";
        fallbackLink.target = "_blank";
        fallbackLink.rel = "noopener noreferrer";
        formMessage.appendChild(fallbackLink);
      }

      fallbackLink.href = whatsappURL;
    }
  });
}
