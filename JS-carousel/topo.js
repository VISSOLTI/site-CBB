(function() {
    const carousel = document.querySelector('.carousel-topo');
    const slides = Array.from(carousel.children);
  
    let currentIndex_topo = 0;
  
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? 1 : 0;
      });
    }
  
    function nextSlide() {
      currentIndex_topo = (currentIndex_topo + 1) % slides.length;
      showSlide(currentIndex_topo);
    }
  
    showSlide(currentIndex_topo);
    setInterval(nextSlide, 5000);
  })();