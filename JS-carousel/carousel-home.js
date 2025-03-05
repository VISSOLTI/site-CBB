document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-home');
    const images = document.querySelectorAll('.carousel-image-home');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    let index = 0;
  
  
    function updateCarousel() {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }
  
    setInterval(nextSlide, 10000); // Muda a imagem a cada 10 segundos
  
    function nextSlide() {
      index = (index + 1) % images.length;
      updateCarousel();
  }
  
  function prevSlide() {
      index = (index - 1 + images.length) % images.length;
      updateCarousel();
  }
  
  
    nextButton.addEventListener('click', nextSlide);
      prevButton.addEventListener('click', prevSlide);
  });



  window.addEventListener('scroll', revelar);

  function revelar() {
      var conteudos = document.querySelectorAll('.conteudo');
  
      for (var i = 0; i < conteudos.length; i++) {
          var alturaJanela = window.innerHeight;
          var topoConteudo = conteudos[i].getBoundingClientRect().top;
          var pontoRevelacao = 150;
  
          if (topoConteudo < alturaJanela - pontoRevelacao && topoConteudo > -conteudos[i].offsetHeight) {
              conteudos[i].classList.add('mostrar');
          } else {
              conteudos[i].classList.remove('mostrar');
          }
      }
  }
  
  
  
  