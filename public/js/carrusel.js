document.addEventListener('DOMContentLoaded', function () {
    console.log("Cargado correctamente");
    const slider = document.getElementById('image-slider');
    const dotsContainer = document.getElementById('carousel-dots');

    if (!slider || !dotsContainer) {
        console.error("El carrusel no pudo inicializarse: flatan elementos en el DOM");
        return;
    }
    const images = slider.querySelectorAll('img');
    const imageCount = images.length;

    if (imageCount === 0) {
        console.error("El carrusel no tiene imagenes");
        return;
    }
    let currentIndex = 0;
    let intervalId;

    //create point of navegation
    // --- VERSIÓN DE DEPURACIÓN ---
    // Reemplaza el bucle 'for' original por este
    for (let i = 0; i < imageCount; i++) {
        const dot = document.createElement('button');
        dot.classList.add('w-3', 'h-3', 'bg-gray-500', 'rounded-full', 'focus:outline-none', 'transition-all', 'duration-300');
        if (i === 0) {
            dot.classList.remove('bg-gray-500');
            dot.classList.add('bg-blue-500');
        }
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
        console.log(`punto de navegacion${i} creado y añadido`);
    }
    const dots = dotsContainer.querySelectorAll('button');

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        //update point
        dots.forEach((dot, index) => {
            if (index == currentIndex) {
                dot.classList.remove('bg-gray-500');
                dot.classList.add('bg-blue-500');
            } else {
                dot.classList.remove('bg-blue-500');
                dot.classList.add('bg-gray-500');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % imageCount;
        updateSlider();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
        //reinicia intercallo al dar click
        resetInterval();
    }

    function startInterval() {
        intervalId = setInterval(nextSlide, 4000);
    }

    function resetInterval() {
        clearInterval(intervalId);
        startInterval();
    }


    //start carrusel
    updateSlider();
    startInterval();
});