document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.menu');
    const menuList = document.querySelector('.menu ul');
    
    // Debug logging
    console.log('Menu toggle:', menuToggle);
    console.log('Nav:', nav);
    console.log('Menu list:', menuList);
    
    if (menuToggle && nav && menuList) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            menuList.classList.toggle('active');
            console.log('Menu toggled');
        });
    }
});