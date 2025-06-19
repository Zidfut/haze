(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
new Swiper("[data-rewiew-slider-js]", {
  // loop: true,
  slidesPerView: "auto",
  spaceBetween: 32,
  // loopAdditionalSlides: 1,
  centeredSlides: true,
  grabCursor: true,
  pagination: {
    el: ".reviews__slider-pagination"
  },
  navigation: {
    nextEl: ".reviews__slider-button-next",
    prevEl: ".reviews__slider-button-prev"
  },
  breakpoints: {
    768: {
      centeredSlides: false
    }
  }
});
new Swiper("[data-ugc-slider-js]", {
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 32,
  loopAdditionalSlides: 2,
  centeredSlides: true,
  grabCursor: true,
  navigation: {
    nextEl: ".ugc__slider-button-next",
    prevEl: ".ugc__slider-button-prev"
  }
});
