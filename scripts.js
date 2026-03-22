function initFadeSlider(wrapperId) {
    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) return; 

    const container = wrapper.querySelector('.slider-container');
    const images = container.querySelectorAll('img');
    const dotContainer = wrapper.querySelector('.slider-dots');
    let currentIndex = 0;

    if (images.length === 0) return;

    // 1. SET INITIAL STATE: Class must be on the FIRST image
    images[0].classList.add('active');

    // 2. CREATE DOTS
    images.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = i === 0 ? 'dot active' : 'dot';
        dot.addEventListener('click', () => goToSlide(i));
        dotContainer.appendChild(dot);
    });

    // 3. FADE LOGIC
    function goToSlide(index) {
        const dots = dotContainer.querySelectorAll('.dot'); // Get dots inside the function
        
        if (index >= images.length) index = 0;
        if (index < 0) index = images.length - 1;
        
        images[currentIndex].classList.remove('active');
        if (dots[currentIndex]) dots[currentIndex].classList.remove('active');

        currentIndex = index;

        images[currentIndex].classList.add('active');
        if (dots[currentIndex]) dots[currentIndex].classList.add('active');
    }

    // 4. ATTACH ARROWS
    const leftBtn = wrapper.querySelector('.nav-arrow.left');
    const rightBtn = wrapper.querySelector('.nav-arrow.right');

    if (leftBtn) leftBtn.onclick = (e) => { e.preventDefault(); goToSlide(currentIndex - 1); };
    if (rightBtn) rightBtn.onclick = (e) => { e.preventDefault(); goToSlide(currentIndex + 1); };

    setInterval(() => goToSlide(currentIndex + 1), 8500);
}


// --- INITIALIZE SLIDERS ---
document.addEventListener('DOMContentLoaded', () => {
    
    //Secretariat
    initFadeSlider('adam-slider');
    initFadeSlider('deniana-slider');
        // Minis
        initFadeSlider('jack-slider');
        initFadeSlider('roman-slider');
        initFadeSlider('emile-slider');
        initFadeSlider('isaac-slider');

    //ACLU
    initFadeSlider('ed-slider');

    //Chairs
    initFadeSlider('amRev-slider');
    initFadeSlider('ant-slider');
    initFadeSlider('disec-slider');
    initFadeSlider('globalFin-slider');
    initFadeSlider('gsec-slider');
        //Stalin
        initFadeSlider('esme-slider');
        initFadeSlider('amir-slider');
    initFadeSlider('theBoys-slider');
    initFadeSlider('adhoc-slider');
    initFadeSlider('who-slider');

        // MOBILE WARNING FADE
    const warning = document.getElementById('mobile-warning');

    if (warning && window.innerWidth <= 768) {
        setTimeout(() => {
            warning.classList.add('fade-out');
        }, 6000);

        setTimeout(() => {
            warning.style.display = 'none';
        }, 6600);
    }
});

//SCROLL DOWN ARROW
// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    
    const scrollArrow = document.querySelector('.scroll-down-arrow');

    if (scrollArrow) {
        scrollArrow.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Finds the very first info section on your page
            const firstSection = document.querySelector('.info-section');
            
            if (firstSection) {
                firstSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const titleWrapper = document.querySelector('.title-wrapper-main');
    
    // Small timeout to ensure the browser has rendered before starting the animation
    setTimeout(() => {
        titleWrapper.classList.add('unfurl');
    }, 100);
});

//IMAGE FADES IN ON SCROLL
// 1. Define what happens when the image enters the viewport
const observerOptions = {
  root: null, // Use the browser viewport as the container
  threshold: 0.1 // Trigger when 10% of the image is visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 2. Add the visible class to trigger the CSS transition
      entry.target.classList.add('is-visible');
      
      // 3. Stop observing this element so it doesn't fade again
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// 4. Tell the observer to watch all elements with the 'reveal' class
document.querySelectorAll('.reveal').forEach(img => {
  observer.observe(img);
});

function initTeamCarousel(id) {
    const wrapper = document.getElementById(id);
    if (!wrapper) return;
    const track = wrapper.querySelector('.carousel-track');
    
    // 1. CLONE THE CONTENT FOR INFINITE LOOPING
    const originalContent = track.innerHTML;
    track.innerHTML = originalContent + originalContent; 

    const nextBtn = wrapper.querySelector('.carousel-nav.right');
    const prevBtn = wrapper.querySelector('.carousel-nav.left');
    
    let scrollPosition = 0;   // Where the carousel currently is
    let targetPosition = 0;   // Where we want it to be (nudge target)
    let direction = 1;        // 1 for right, -1 for left
    let baseSpeed = 0.8;      // Constant creep speed
    const nudgeAmount = 400;  // Pixels per click

    function animate() {
        const halfWidth = track.scrollWidth / 2;

        // 2. THE SMOOTHING MATH (Easing)
        // We move 10% of the distance to the target every frame (0.1)
        // This creates a "fast then slow" slide effect.
        scrollPosition += (targetPosition - scrollPosition) * 0.1;
        
        // 3. APPLY CONSTANT CREEP TO THE TARGET
        targetPosition += (baseSpeed * direction);

        // 4. SEAMLESS WRAP LOGIC
        // If the target or actual position crosses the boundary, snap both
        if (targetPosition >= halfWidth) {
            targetPosition -= halfWidth;
            scrollPosition -= halfWidth;
        } else if (targetPosition < 0) {
            targetPosition += halfWidth;
            scrollPosition += halfWidth;
        }

        track.style.transform = `translateX(-${scrollPosition}px)`;
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    // 5. BUTTONS (Update the target, not the current position)
    if (nextBtn) {
        nextBtn.onclick = (e) => {
            e.preventDefault();
            direction = 1;
            targetPosition += nudgeAmount;
        };
    }
    
    if (prevBtn) {
        prevBtn.onclick = (e) => {
            e.preventDefault();
            direction = -1;
            targetPosition -= nudgeAmount;
        };
    }
}

// Lightbox function
function openFullImage(src) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    modal.style.display = 'flex';
    modalImg.src = src;
}

// Initialize inside your existing DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initTeamCarousel('team-moments');
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }
});

//COUNTDOWN
function updateCountdown() {
    const targetDate = new Date("2026-04-04T08:00:00-05:00").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
        document.getElementById("countdown").innerHTML = "Conference has started!";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();
