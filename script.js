// SCROLL SUAVE
const links = document.querySelectorAll('a[href^="#"]');

function ScrollLinks(event) {
  event.preventDefault();
  const href = event.currentTarget.getAttribute("href");
  const target = document.querySelector(href);

  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

links.forEach((link) => {
  link.addEventListener("click", ScrollLinks);
});

// -------------------------------------------------

// Menu Hamburger

const menuToggle = document.querySelector(".menu-toggle");
const headerMenu = document.querySelector(".header-menu");

menuToggle.addEventListener("click", () => {
  headerMenu.classList.toggle("active");
  menuToggle.classList.toggle("active");
});
