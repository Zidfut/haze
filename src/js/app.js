const rewiewSlider = new Swiper("[data-rewiew-slider-js]", {
  // loop: true,
  slidesPerView: "auto",
  spaceBetween: 32,
  // loopAdditionalSlides: 1,
  centeredSlides: true,
  grabCursor: true,
  pagination: {
    el: ".reviews__slider-pagination",
  },
  navigation: {
    nextEl: ".reviews__slider-button-next",
    prevEl: ".reviews__slider-button-prev",
  },
  breakpoints: {
    768: {
      centeredSlides: false,
    },
  }
});

const ugcSlider = new Swiper("[data-ugc-slider-js]", {
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 32,
  loopAdditionalSlides: 2,
  centeredSlides: true,
  grabCursor: true,
  navigation: {
    nextEl: ".ugc__slider-button-next",
    prevEl: ".ugc__slider-button-prev",
  },
});
