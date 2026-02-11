function initFadeSlider(wrapperId) {
    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) return; // Safety check

    const container = wrapper.querySelector('.slider-container');
    const images = container.querySelectorAll('img');
    const dotContainer = wrapper.querySelector('.slider-dots');
    let currentIndex = 0;

    // 1. SET INITIAL STATE: Show the first image immediately
    if (images.length > 0) {
        images[0].classList.add('active');
    }

    // 2. CREATE DOTS
    images.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = i === 0 ? 'dot active' : 'dot';
        dot.addEventListener('click', () => goToSlide(i));
        dotContainer.appendChild(dot);
    });

    const dots = dotContainer.querySelectorAll('.dot');

    // 3. FADE LOGIC
    function goToSlide(index) {
        // Handle wrapping around
        if (index >= images.length) index = 0;
        if (index < 0) index = images.length - 1;
        
        // Remove active from current image and dot
        images[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');

        currentIndex = index;

        // Add active to new image and dot
        images[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    // 4. ATTACH ARROWS (Matches your HTML classes)
    const leftBtn = wrapper.querySelector('.nav-arrow.left');
    const rightBtn = wrapper.querySelector('.nav-arrow.right');

    if (leftBtn) leftBtn.onclick = () => goToSlide(currentIndex - 1);
    if (rightBtn) rightBtn.onclick = () => goToSlide(currentIndex + 1);

    // 5. AUTO-PLAY (4 seconds)
    setInterval(() => goToSlide(currentIndex + 1), 4000);
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

    //Chairs
    initFadeSlider('amRev-slider');
    initFadeSlider('ant-slider');
    initFadeSlider('disec-slider');
    initFadeSlider('globalFin-slider');
    initFadeSlider('gsec-slider');
    initFadeSlider('stalin-slider');
    initFadeSlider('theBoys-slider');
    initFadeSlider('trump-slider');
    initFadeSlider('who-slider');
});
