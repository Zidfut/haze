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
  const flagContainer = phoneInput
    .closest(".iti")
    ?.querySelector(".iti__country-container");
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

const searchInput = document.querySelector(".faq__accordion-search-input");
const faqItems = document.querySelectorAll(".faq__accordion-item");

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

function handleSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const enableSearch = searchTerm.length >= 2;

  faqItems.forEach((item) => {
    const titleEl = item.querySelector(".faq__accordion-item-header-title");
    const bodyEl = item.querySelector(".faq__accordion-item-body");

    const titleText = titleEl?.textContent.toLowerCase() || "";
    const bodyText = bodyEl?.textContent.toLowerCase() || "";

    const matches =
      enableSearch &&
      (titleText.includes(searchTerm) || bodyText.includes(searchTerm));

    item.style.display = matches || !enableSearch ? "block" : "none";
  });
}

searchInput.addEventListener("input", debounce(handleSearch, 300));

const stores = [
  { name: "New York Store", address: "New York, NY", lat: 40.7128, lon: -74.0060 },
  { name: "Los Angeles Branch", address: "Los Angeles, CA", lat: 34.0522, lon: -118.2437 },
  { name: "Chicago Shop", address: "Chicago, IL", lat: 41.8781, lon: -87.6298 },
  { name: "Houston Outlet", address: "Houston, TX", lat: 29.7604, lon: -95.3698 },
  { name: "Phoenix Location", address: "Phoenix, AZ", lat: 33.4484, lon: -112.0740 },
];

const storeIcon = L.icon({
  iconUrl: "/assets/pin.svg",
  iconSize: [63, 73],
  iconAnchor: [31, 73],
});

const map = L.map("map", {
  zoomControl: false,
  scrollWheelZoom: true,
  center: [34.0522, -118.2437],
  zoom: 14,
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(map);

function getDistance([lat1, lon1], [lat2, lon2]) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function clearStoreMarkers() {
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker && layer.options.icon === storeIcon) {
      map.removeLayer(layer);
    }
  });
}

function showStores(userCoords = null) {
  clearStoreMarkers();

  let nearestStore = null;
  let minDistance = Infinity;

  stores.forEach((store) => {
    const marker = L.marker([store.lat, store.lon], { icon: storeIcon }).addTo(map);
    store.marker = marker;

    if (userCoords) {
      const dist = getDistance(userCoords, [store.lat, store.lon]);
      if (dist < minDistance) {
        minDistance = dist;
        nearestStore = store;
      }
    }
  });

  if (nearestStore) {
    map.setView([nearestStore.lat, nearestStore.lon], 12);
  }
}

function geocodeAddress(address) {
  if (!address || address.length < 3) return;

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const coords = [+lat, +lon];
        showStores(coords);
      }
    })
    .catch((err) => console.error("Geocoding error:", err));
}

document.getElementById("locator__form-input").addEventListener("change", (e) => {
  geocodeAddress(e.target.value);
});
document.querySelector(".locator__form-search-button").addEventListener("click", (e) => {
  e.preventDefault();
  const input = document.getElementById("locator__form-input");
  geocodeAddress(input.value);
});

showStores();

