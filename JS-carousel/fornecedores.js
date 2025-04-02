(function() {
  // Primeiro Carrossel
  const carousel_fornecedores = document.querySelector('.carousel-fornecedores');
  const images = carousel_fornecedores.querySelectorAll('img');
  let currentIndex_fornecedores = 0;
  const imageWidth = images[0].offsetWidth + 20;

  function moveCarousel() {
    currentIndex_fornecedores++;
    if (currentIndex_fornecedores > images.length - 6) {
      currentIndex_fornecedores = 0;
    }
    carousel_fornecedores.style.transform = `translateX(-${currentIndex_fornecedores * imageWidth}px)`;
  }

  setInterval(moveCarousel, 2000);

  // Segundo Carrossel
  const carousel_fornecedores2 = document.querySelector('.carousel-fornecedores-2');
  const images2 = carousel_fornecedores2.querySelectorAll('img');
  let currentIndex_fornecedores2 = 0;
  const imageWidth2 = images2[0].offsetWidth + 20;

  function moveCarousel2() {
    currentIndex_fornecedores2++;
    if (currentIndex_fornecedores2 > images2.length - 6) {
      currentIndex_fornecedores2 = 0;
    }
    carousel_fornecedores2.style.transform = `translateX(-${currentIndex_fornecedores2 * imageWidth2}px)`;
  }

  setInterval(moveCarousel2, 2000);
})();