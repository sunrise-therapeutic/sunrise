document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const subMenuParents = document.querySelectorAll('.main-nav li > a + .submenu');

    // Toggle main menu
    if (menuToggle && mainNav) {
        console.log('Menu elements found');  // Debug line
        menuToggle.addEventListener('click', () => {
            console.log('Menu clicked');     // Debug line
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            console.log('Menu state:', mainNav.classList.contains('active')); // Debug line
        });
    } else {
        console.log('Menu elements missing:', { menuToggle, mainNav }); // Debug line
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