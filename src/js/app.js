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
  },
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

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".faq__accordion-item-header").forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.closest(".faq__accordion-item");

      const isActive = item.classList.contains("active");

      document
        .querySelectorAll(".faq__accordion-item.active")
        .forEach((activeItem) => {
          activeItem.classList.remove("active");
        });

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  const filterLinks = document.querySelectorAll(".faq__accordion-filters a");
  const items = document.querySelectorAll(".faq__accordion-item");

  filterLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      filterLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      const filter = link.dataset.filter;

      items.forEach((item) => {
        const category = item.dataset.category;
        if (filter === "All" || category === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});

const phoneInput = document.querySelector("#phone");
window.intlTelInput(phoneInput, {
  containerClass: "contact__form-phone",
  initialCountry: "us",
  separateDialCode: true,
  loadUtils: () =>
    import(
      "https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/utils.js"
    ),
});

const itiWrapper = phoneInput.closest(".iti");

phoneInput.addEventListener("focus", () => {
  itiWrapper.classList.add("is-focused");
});

phoneInput.addEventListener("blur", () => {
  itiWrapper.classList.remove("is-focused");
});

function updatePadding() {
  const flagContainer = phoneInput.closest(".iti")?.querySelector(".iti__country-container");
  if (flagContainer) {
    const flagWidth = flagContainer.offsetWidth;
    const finalPadding = flagWidth + 16;

    phoneInput.style.paddingLeft = `${finalPadding}px`;
  }
}

requestAnimationFrame(() => {
  updatePadding();
});

phoneInput.addEventListener("countrychange", () => {
  updatePadding();
});
