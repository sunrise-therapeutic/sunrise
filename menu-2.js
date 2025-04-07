document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const subMenuParents = document.querySelectorAll('.main-nav li > a + .submenu');

    // Toggle main menu
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Handle submenu toggles
    subMenuParents.forEach(submenu => {
        const parentLink = submenu.previousElementSibling;
        
        // Add indicator for submenus
        const indicator = document.createElement('span');
        indicator.classList.add('submenu-indicator');
        parentLink.appendChild(indicator);

        parentLink.addEventListener('click', (e) => {
            e.preventDefault();
            submenu.classList.toggle('active');
            parentLink.classList.toggle('expanded');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mainNav?.contains(e.target) && !menuToggle?.contains(e.target)) {
            mainNav?.classList.remove('active');
            menuToggle?.classList.remove('active');
            menuToggle?.setAttribute('aria-expanded', 'false');
        }
    });
});