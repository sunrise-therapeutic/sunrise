document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', mainNav.classList.contains('active'));
    });
    // Handle submenu toggling on mobile
    document.querySelectorAll('.main-nav li > a + .submenu').forEach(submenu => {
      const parentLink = submenu.previousElementSibling;
      parentLink.addEventListener('click', e => {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          submenu.classList.toggle('active');
        }
      });
    });
  }
});