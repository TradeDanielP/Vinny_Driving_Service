document.addEventListener("DOMContentLoaded", function() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    const displayTime = 5000; // Time in milliseconds for each testimonial

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            dots[i].classList.remove('active');
            if (i === index) {
                testimonial.classList.add('active');
                dots[i].classList.add('active');
            }
        });
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }

    function setTestimonial(index) {
        currentIndex = index;
        showTestimonial(currentIndex);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            setTestimonial(index);
            clearInterval(autoChange);
            autoChange = setInterval(nextTestimonial, displayTime);
        });
    });

    showTestimonial(currentIndex);
    let autoChange = setInterval(nextTestimonial, displayTime);
});