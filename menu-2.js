/* --------------------------------------------------------------
   menu-2.js – Handles mobile toggle and submenu accordion
   -------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const menu      = document.querySelector('.menu');

    // ---------- Mobile main‑menu toggle ----------
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !expanded);
        menu.classList.toggle('open');
    });

    // ---------- Sub‑menu accordion for touch devices ----------
    const submenuParents = document.querySelectorAll('.has-submenu');

    submenuParents.forEach(item => {
        const link = item.querySelector('a');

        // Only intercept clicks that are meant to open the submenu
        link.addEventListener('click', e => {
            // If we are on a small screen, prevent navigation and toggle
            if (window.innerWidth <= 768) {
                e.preventDefault();          // stop following the parent link
                item.classList.toggle('open');
            }
        });
    });

    // Optional: close menus when clicking outside
    document.addEventListener('click', e => {
        if (!e.target.closest('.site-header')) {
            menu.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
            submenuParents.forEach(i => i.classList.remove('open'));
        }
    });
});