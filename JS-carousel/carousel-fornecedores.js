function initializeCarousel(wrapperSelector, carouselSelector) {
    const wrapper = document.querySelector(wrapperSelector);
    const carousel = document.querySelector(carouselSelector);
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    const arrowButtons = wrapper.querySelectorAll(".carousel-control"); // Use the new class
    const carouselChildren = [...carousel.children];
    let isDragging = false,
      isAutoPlay = true,
      startX,
      startScrollLeft,
      timeoutId;
    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
  
    // Clone cards for infinite scrolling
    carouselChildren.slice(-cardPerView).reverse().forEach((card) => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });
    carouselChildren.slice(0, cardPerView).forEach((card) => {
      carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });
  
    // Initial scroll position
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  
    // Arrow button event listeners
    arrowButtons.forEach((button) => {
      button.addEventListener("click", () => {
        carousel.scrollLeft +=
          button.id === "left" ? -firstCardWidth : firstCardWidth;
      });
    });
  
    // Dragging functionality
    const dragStart = (e) => {
      isDragging = true;
      carousel.classList.add("dragging");
      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
    };
  
    const dragging = (e) => {
      if (!isDragging) return;
      carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };
  
    const dragStop = () => {
      isDragging = false;
      carousel.classList.remove("dragging");
    };
  
    // Infinite scroll logic
    const infiniteScroll = () => {
      if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
        carousel.classList.remove("no-transition");
      } else if (
        Math.ceil(carousel.scrollLeft) ===
        carousel.scrollWidth - carousel.offsetWidth
      ) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
      }
      clearTimeout(timeoutId);
      if (!wrapper.matches(":hover")) autoPlay();
    };
  
    // Autoplay functionality
    const autoPlay = () => {
      if (window.innerWidth < 800 || !isAutoPlay) return;
      timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
    };
  
    autoPlay();
  
    // Event listeners
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);
  }
  
  // Initialize both carousels
  initializeCarousel(".wrapper", ".carousel");
  initializeCarousel(".wrapper-B", ".carousel-B");