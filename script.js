const btnMobile = document.querySelector("#btn-mobile")

function toggleMenu(event) {
   if (event.type === 'touchstart') event.preventDefault()
   const nav = document.querySelector(".nav")
   nav.classList.toggle('active')
   const active = nav.classList.contains('active')
   event.currentTarget.setAttribute('aria-expanded', active)
   if (active) {
    event.currentTarget.setAttribute('aria-label', 'Fechar Menu') 
   } else {
      event.currentTarget.setAttribute('aria-label', 'Abrir Menu')
   }
}

btnMobile.addEventListener('click', toggleMenu)
btnMobile.addEventListener('touchstart', toggleMenu)


/*CAROSEL*/
const wrapper_B = document.querySelector(".wrapper-B");
const carousel_B = document.querySelector(".carousel-B");
const firstCardWidth_B = carousel_B.querySelector(".card").offsetWidth;
const arrowBtns_B = document.querySelectorAll(".wrapper-B i");
const carouselChildrens_B = [...carousel_B.children];


const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
let isDragging_B = false, isAutoPlay_B = true, startX_B, startScrollLeft_B, timeoutId_B;
// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
let cardPerView_B = Math.round(carousel_B.offsetWidth / firstCardWidth_B);
// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});
carouselChildrens_B.slice(-cardPerView).reverse().forEach(card => {
    carousel_B.insertAdjacentHTML("afterbegin", card.outerHTML);
});
// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
carouselChildrens_B.slice(0, cardPerView).forEach(card => {
    carousel_B.insertAdjacentHTML("beforeend", card.outerHTML);
});
// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel_B.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel_B.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");
carousel_B.classList.remove("no-transition");
// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});
arrowBtns_B.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel_B.scrollLeft += btn.id == "left" ? -firstCardWidth_B : firstCardWidth_B;
    });
});
const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}
const dragStart_B = (e) => {
    isDragging_B = true;
    carousel_B.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX_B = e.pageX_B;
    startScrollLeft_B = carousel_B.scrollLeft;
}


const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragging_B = (e) => {
    if(!isDragging_B) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel_B.scrollLeft = startScrollLeft_B- (e.pageX_B - startX_B);
}


const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}
const dragStop_B = () => {
    isDragging_B = false;
    carousel_B.classList.remove("dragging");
}


const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}
const infiniteScroll_B = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel_B.scrollLeft === 0) {
        carousel_B.classList.add("no-transition");
        carousel_B.scrollLeft = carousel.scrollWidth - (2 * carousel_B.offsetWidth);
        carousel_B.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel_B.scrollLeft) === carousel_B.scrollWidth - carousel_B.offsetWidth) {
        carousel_B.classList.add("no-transition");
        carousel_B.scrollLeft = carousel.offsetWidth;
        carousel_B.classList.remove("no-transition");
    }
    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId_B);
    if(!wrapper_B.matches(":hover")) autoPlay_B();
}


const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
const autoPlay_B = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId_B = setTimeout(() => carousel_B.scrollLeft += firstCardWidth_B, 2500);
}
autoPlay();
autoPlay_B();
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel_B.addEventListener("mousedown", dragStart);
carousel_B.addEventListener("mousemove", dragging);

document.addEventListener("mouseup", dragStop);

carousel.addEventListener("scroll", infiniteScroll);
carousel_B.addEventListener("scroll", infiniteScroll_B);

wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

wrapper_B.addEventListener("mouseenter", () => clearTimeout(timeoutId_B));
wrapper_B.addEventListener("mouseleave", autoPlay_B);
