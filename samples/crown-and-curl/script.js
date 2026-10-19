
const stylesheet = document.createElement("style");
stylesheet.textContent = `
/* =========================================
   CROWN & CURL SALON
   Website styling by Swan Digital Studio
   ========================================= */

/* 1. Theme variables */
:root {
  --c: #7a3e9d;
  --c-dark: #592a76;
  --bg: #fffdfd;
  --tx: #302437;
  --muted: #756779;
  --card: #ffffff;
  --soft: #f6effa;
  --border: #e8dcec;
  --shadow: 0 8px 25px rgba(83, 44, 102, 0.09);
}

/* Dark mode */
body.dark {
  --bg: #17131b;
  --tx: #f2eaf5;
  --muted: #c3b3ca;
  --card: #251d2c;
  --soft: #30243a;
  --border: #49364f;
  --shadow: 0 8px 25px rgba(0, 0, 0, 0.22);
}

/* 2. Base styles */
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 90px;
}

body {
  margin: 0;
  font: 16px/1.7 Georgia, "Times New Roman", serif;
  background: var(--bg);
  color: var(--tx);
  transition: background 0.25s, color 0.25s;
}

a {
  color: inherit;
}

button {
  font: inherit;
  cursor: pointer;
}

section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 72px 24px;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h2 {
  margin-bottom: 12px;
  font-size: clamp(1.9rem, 4vw, 2.7rem);
  line-height: 1.25;
}

h3 {
  line-height: 1.35;
}

/* 3. Navigation */
.bar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 6%;
  border-bottom: 1px solid var(--border);
  background: var(--bg);
}

.logo {
  font-size: 1.3rem;
  font-weight: 700;
  text-decoration: none;
}

.bar nav {
  display: flex;
  align-items: center;
  gap: 20px;
}

.bar nav a {
  font-size: 0.95rem;
  text-decoration: none;
}

.bar nav a:hover {
  color: var(--c);
}

.theme-btn {
  width: 40px;
  height: 40px;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: var(--card);
  color: var(--tx);
}

/* 4. Hero */
.hero {
  max-width: none;
  display: grid;
  place-items: center;
  min-height: 440px;
  padding: 85px 24px;
  text-align: center;
  color: #ffffff;
  background:
    radial-gradient(
      circle at 15% 20%,
      rgba(255, 255, 255, 0.18),
      transparent 28%
    ),
    linear-gradient(135deg, #49205f, #7a3e9d 60%, #b58bc9);
}

.hero-content {
  max-width: 760px;
}

.hero h1 {
  margin-bottom: 18px;
  font-size: clamp(2.5rem, 7vw, 4.6rem);
  line-height: 1.12;
}

.hero-content > p:not(.eyebrow) {
  max-width: 650px;
  margin: 0 auto 28px;
  font-size: 1.1rem;
}

.eyebrow {
  margin-bottom: 12px;
  color: var(--c);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.hero .eyebrow {
  color: #f6e6ff;
}

/* 5. Buttons */
.btn {
  display: inline-block;
  padding: 12px 23px;
  border: 0;
  border-radius: 9px;
  font-family: inherit;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
}

.hero-btn {
  background: #ffffff;
  color: #592a76;
}

.contact-btn {
  background: var(--c);
  color: #ffffff;
}

.contact-btn:hover {
  background: var(--c-dark);
}

/* 6. Section headings */
.section-heading {
  margin-bottom: 30px;
  text-align: center;
}

.section-heading > p:last-child {
  color: var(--muted);
}

/* 7. Service filters */
.tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 28px;
}

.tabs button {
  padding: 9px 18px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--card);
  color: var(--tx);
  font-family: inherit;
}

.tabs button:hover {
  border-color: var(--c);
}

.tabs button.on {
  border-color: var(--c);
  background: var(--c);
  color: #ffffff;
}

/* 8. Service cards */
.grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.card {
  padding: 22px;
  border: 1px solid var(--border);
  border-top: 4px solid var(--c);
  border-radius: 14px;
  background: var(--card);
  box-shadow: var(--shadow);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 14px 30px rgba(83, 44, 102, 0.14);
}

.service-icon {
  display: grid;
  place-items: center;
  min-height: 105px;
  margin-bottom: 18px;
  border-radius: 10px;
  background: var(--soft);
  font-size: 2.7rem;
}

.category {
  margin-bottom: 7px;
  color: var(--c);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.card h3 {
  margin-bottom: 8px;
}

.card p:last-child {
  margin-bottom: 0;
  color: var(--muted);
}

.empty,
.service-note {
  margin-top: 24px;
  color: var(--muted);
  text-align: center;
}

/* 9. About section */
.about-section {
  max-width: none;
  background: var(--soft);
}

.about-content {
  max-width: 740px;
  margin: 0 auto;
}

.about-content > p:not(.eyebrow) {
  color: var(--muted);
}

.text-link {
  display: inline-block;
  margin-top: 6px;
  color: var(--c);
  font-weight: 700;
  text-decoration: none;
}

.text-link:hover {
  text-decoration: underline;
}

/* 10. Contact section */
.contact-section {
  text-align: center;
}

.contact-info {
  max-width: 650px;
  margin: 0 auto 25px;
  padding: 22px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--card);
  text-align: left;
}

.contact-info p {
  margin-bottom: 9px;
}

.contact-info p:last-child {
  margin-bottom: 0;
}

.contact-note {
  margin-top: 15px;
  color: var(--muted);
  font-size: 0.88rem;
}

/* 11. Footer */
footer {
  padding: 30px 20px;
  border-top: 1px solid var(--border);
  text-align: center;
}

footer p {
  margin-bottom: 4px;
}

.credit {
  color: var(--muted);
  font-size: 0.9rem;
}

/* 12. Keyboard accessibility */
a:focus-visible,
button:focus-visible {
  outline: 3px solid var(--c);
  outline-offset: 4px;
}

/* 13. Tablet */
@media (max-width: 850px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* 14. Mobile */
@media (max-width: 560px) {
  section {
    padding: 52px 18px;
  }

  .bar {
    padding: 12px 14px;
  }

  .bar nav {
    gap: 10px;
  }

  .bar nav a {
    font-size: 0.8rem;
  }

  .logo {
    font-size: 1.05rem;
  }

  .hero {
    min-height: 370px;
    padding: 60px 18px;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}

/* 15. Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
`;
document.head.appendChild(stylesheet);
