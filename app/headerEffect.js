window.addEventListener('scroll', () => {
    const navHeader = document.querySelector('.navHeader');
    if (window.scrollY > 0) {
        navHeader.style.marginTop = '0';
        navHeader.style.marginBottom = '0';
    } else {
        navHeader.style.marginTop = '30px';
        navHeader.style.marginBottom = '30px';
    }
});