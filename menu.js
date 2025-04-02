document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const menuNav = document.querySelector('.menu ul');
    
    if (menuToggle && menuNav) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            menuToggle.classList.toggle('active');
            menuNav.classList.toggle('active');
            console.log('Menu toggled');  // Debug line
        });
    }
});