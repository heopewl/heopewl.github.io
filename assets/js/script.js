'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

// add click event to all modal items
if (testimonialsItem) {
  for (let i = 0; i < testimonialsItem.length; i++) {

    testimonialsItem[i].addEventListener("click", function () {

      if (modalImg) {
        const avatar = this.querySelector("[data-testimonials-avatar]");
        if (avatar) {
          modalImg.src = avatar.src;
          modalImg.alt = avatar.alt;
        }
      }
      if (modalTitle) {
        const title = this.querySelector("[data-testimonials-title]");
        if (title) {
          modalTitle.textContent = title.textContent;
        }
      }
      if (modalText) {
        const text = this.querySelector("[data-testimonials-text]");
        if (text) {
          modalText.innerHTML = text.innerHTML;
        }
      }

      testimonialsModalFunc();

    });

  }
}

// add click event to modal close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
if (selectItems) {
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {

      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) {
        selectValue.innerText = this.innerText;
      }
      if (select) {
        elementToggleFunc(select);
      }
      filterFunc(selectedValue);

    });
  }
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  if (filterItems) {
    for (let i = 0; i < filterItems.length; i++) {

      if (selectedValue === "all") {
        filterItems[i].classList.add("active");
      } else if (selectedValue === filterItems[i].dataset.category) {
        filterItems[i].classList.add("active");
      } else {
        filterItems[i].classList.remove("active");
      }

    }
  }

}

// add event in all filter button items for large screen
if (filterBtn && filterBtn.length > 0) {
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {

    filterBtn[i].addEventListener("click", function () {

      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) {
        selectValue.innerText = this.innerText;
      }
      filterFunc(selectedValue);

      if (lastClickedBtn) {
        lastClickedBtn.classList.remove("active");
      }
      this.classList.add("active");
      lastClickedBtn = this;

    });

  }
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
if (form && formInputs && formInputs.length > 0 && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {

      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }

    });
  }
}



// portfolio modal variables
const portfolioItems = document.querySelectorAll("[data-project-img]");
const portfolioModalContainer = document.querySelector("[data-portfolio-modal-container]");
const portfolioModalCloseBtn = document.querySelector("[data-portfolio-modal-close-btn]");
const portfolioOverlay = document.querySelector("[data-portfolio-overlay]");

// portfolio modal variables
const portfolioModalImg = document.querySelector("[data-portfolio-modal-img]");
const portfolioModalTitle = document.querySelector("[data-portfolio-modal-title]");
const portfolioModalCategory = document.querySelector("[data-portfolio-modal-category]");

// portfolio modal toggle function
const portfolioModalFunc = function () {
  if (portfolioModalContainer && portfolioOverlay) {
    portfolioModalContainer.classList.toggle("active");
    portfolioOverlay.classList.toggle("active");
  }
}

// add click event to all portfolio items
if (portfolioItems && portfolioItems.length > 0) {
  for (let i = 0; i < portfolioItems.length; i++) {

    portfolioItems[i].addEventListener("click", function () {

      if (portfolioModalImg) {
        const img = this.querySelector("img");
        if (img) {
          portfolioModalImg.src = img.src;
          portfolioModalImg.alt = img.alt;
        }
      }
      if (portfolioModalTitle) {
        const title = this.parentElement.querySelector(".project-title");
        if (title) {
          portfolioModalTitle.textContent = title.textContent;
        }
      }
      if (portfolioModalCategory) {
        const category = this.parentElement.querySelector(".project-category");
        if (category) {
          portfolioModalCategory.textContent = category.textContent;
        }
      }

      portfolioModalFunc();

    });

  }
}

// add click event to portfolio modal close button
if (portfolioModalCloseBtn) {
  portfolioModalCloseBtn.addEventListener("click", portfolioModalFunc);
}
if (portfolioOverlay) {
  portfolioOverlay.addEventListener("click", portfolioModalFunc);
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
if (navigationLinks && pages) {
  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {

      const targetPage = this.textContent.trim().toLowerCase();

      // Toggle pages
      for (let j = 0; j < pages.length; j++) {
        if (targetPage === pages[j].dataset.page) {
          pages[j].classList.add("active");
        } else {
          pages[j].classList.remove("active");
        }
      }

      // Toggle all navigation links (handles dual-nav scenarios)
      for (let j = 0; j < navigationLinks.length; j++) {
        if (navigationLinks[j].textContent.trim().toLowerCase() === targetPage) {
          navigationLinks[j].classList.add("active");
        } else {
          navigationLinks[j].classList.remove("active");
        }
      }

      window.scrollTo(0, 0);

    });
  }
}
