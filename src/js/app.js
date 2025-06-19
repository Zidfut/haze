const swiper = new Swiper("[data-rewiew-slider-js]", {
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 32,
  loopAdditionalSlides: 1,
  centeredSlides: true,
  grabCursor: true,
  pagination: {
    el: ".reviews__slider-pagination",
  },
  navigation: {
    nextEl: ".reviews__slider-button-next",
    prevEl: ".reviews__slider-button-prev",
  },
});
