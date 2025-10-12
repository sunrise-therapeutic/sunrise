/* -----------------------------------------------------------
   menu-2.js – hamburger toggle + multi‑level accordion for mobile
   ----------------------------------------------------------- */

export function initMenu() {
    const header   = document.querySelector('.site-header');
    const nav      = header.querySelector('.main-nav');
    const menu     = nav.querySelector('.menu');
    const toggle   = header.querySelector('.nav-toggle');

    /* -------------------------------------------------------
       1️⃣ Hamburger (mobile) – show / hide the whole menu
       ------------------------------------------------------- */
    toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        menu.classList.toggle('open');          // .open makes the <ul> visible
    });

    /* -------------------------------------------------------
       2️⃣ Multi‑level accordion for mobile - FIXED for nested submenus
       ------------------------------------------------------- */
    // Grab **every** <li class="has-submenu"> – first, second, third level, etc.
    const submenuParents = nav.querySelectorAll('li.has-submenu');

    submenuParents.forEach(li => {
        const link = li.querySelector('a');

        // Make the link focusable (helps keyboard users)
        link.setAttribute('tabindex', '0');

        // ARIA attributes for accessibility
        link.setAttribute('aria-haspopup', 'true');
        link.setAttribute('aria-expanded', 'false');

        // Click / tap on the link → toggle its own submenu
        link.addEventListener('click', e => {
            // Only treat it as an accordion on small screens
            if (window.innerWidth <= 768) {
                e.preventDefault();                 // stop navigation to href
                
                // Close other submenus at the same level
                const siblings = Array.from(li.parentElement.children).filter(
                    child => child !== li && child.classList.contains('has-submenu')
                );
                
                siblings.forEach(sibling => {
                    sibling.classList.remove('open');
                    const siblingLink = sibling.querySelector('a');
                    if (siblingLink) siblingLink.setAttribute('aria-expanded', 'false');
                });

                // Toggle current submenu
                const isOpen = li.classList.contains('open');
                li.classList.toggle('open', !isOpen);
                link.setAttribute('aria-expanded', String(!isOpen));
            }
            // On larger screens we let the normal hover/focus behaviour run
        });

        // Keyboard support – Enter or Space also toggles
        link.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();                 // stop page scroll on Space
                link.click();                       // reuse the click handler above
            }
        });
    });

    /* -------------------------------------------------------
       3️⃣ Close any open submenu when clicking outside (desktop UX)
       ------------------------------------------------------- */
    document.addEventListener('click', e => {
        if (!nav.contains(e.target)) {
            submenuParents.forEach(li => {
                li.classList.remove('open');
                const a = li.querySelector('a');
                if (a) a.setAttribute('aria-expanded', 'false');
            });
        }
    });
}