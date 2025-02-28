// Main Slider Functionality
(function initMainSlider() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) slide.classList.add('active');
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Initialize slider
    showSlide(currentSlide);
    setInterval(nextSlide, 5000);
})();

// Mobile Menu Functionality
(function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    }

    menuToggle.addEventListener('click', toggleMenu);
})();

// Category Carousel Scroll Behavior
(function initCategoryCarousel() {
    const categoryGrid = document.querySelector('.category-grid');
    if (!categoryGrid) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    categoryGrid.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - categoryGrid.offsetLeft;
        scrollLeft = categoryGrid.scrollLeft;
    });

    categoryGrid.addEventListener('mouseleave', () => {
        isDown = false;
    });

    categoryGrid.addEventListener('mouseup', () => {
        isDown = false;
    });

    categoryGrid.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - categoryGrid.offsetLeft;
        const walk = (x - startX) * 2;
        categoryGrid.scrollLeft = scrollLeft - walk;
    });

    // Add touch support
    categoryGrid.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - categoryGrid.offsetLeft;
        scrollLeft = categoryGrid.scrollLeft;
    });

    categoryGrid.addEventListener('touchend', () => {
        isDown = false;
    });

    categoryGrid.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - categoryGrid.offsetLeft;
        const walk = (x - startX) * 2;
        categoryGrid.scrollLeft = scrollLeft - walk;
    });
})();