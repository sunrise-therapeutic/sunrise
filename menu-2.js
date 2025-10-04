// menu-2.js – export a single init function
export function initMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const menu      = document.querySelector('.menu');

    if (!navToggle || !menu) return;   // safety net

    // -------- Mobile main‑menu toggle ----------
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !expanded);
        menu.classList.toggle('open');
    });

    // -------- Sub‑menu accordion for touch ----------
    const submenuParents = document.querySelectorAll('.has-submenu');

    submenuParents.forEach(item => {
        const link = item.querySelector('a');
        link.addEventListener('click', e => {
            if (window.innerWidth <= 768) {
                e.preventDefault();          // stop navigation on small screens
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
}