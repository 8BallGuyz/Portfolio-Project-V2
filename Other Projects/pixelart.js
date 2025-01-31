document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.cyberpunk-carousel');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(track.querySelectorAll('.carousel-slide'));
        const prevButton = carousel.querySelector('.carousel-prev');
        const nextButton = carousel.querySelector('.carousel-next');

        let currentIndex = 0;

        // Initial setup
        function initCarousel() {
            // Set initial active state
            slides.forEach((slide, index) => {
                slide.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
                slide.classList.remove('active');
            });
            slides[currentIndex].classList.add('active');
        }

        // Move to next slide
        function moveToNextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        }

        // Move to previous slide
        function moveToPrevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        }

        // Update carousel position
        function updateCarousel() {
            slides.forEach((slide, index) => {
                slide.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
                slide.classList.remove('active');
            });
            slides[currentIndex].classList.add('active');
        }

        // Add event listeners to navigation buttons
        nextButton.addEventListener('click', moveToNextSlide);
        prevButton.addEventListener('click', moveToPrevSlide);

        // Initialize carousel
        initCarousel();

        // Optional: Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') moveToNextSlide();
            if (e.key === 'ArrowLeft') moveToPrevSlide();
        });

        // Optional: Add touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeDistance = touchEndX - touchStartX;
            if (swipeDistance > 50) {
                moveToPrevSlide();
            } else if (swipeDistance < -50) {
                moveToNextSlide();
            }
        }
    });
});