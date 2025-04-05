
'use strict';
// Element toggle function
const elementToggleFunc = function (elem) {
    if (elem) {
        elem.classList.toggle("active");
    } else {
        console.error("Element not found for toggle.");
    }
};
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded");
    // Sidebar variables
    const sidebar = document.querySelector("[data-sidebar]");
    const sidebarBtn = document.querySelector("[data-sidebar-btn]");
    if (sidebar && sidebarBtn) {
        sidebarBtn.addEventListener("click", function () {
            elementToggleFunc(sidebar);
        });
    } else {
        console.error("Sidebar or Sidebar Button not found.");
    }
    // Testimonials modal
    const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
    const modalContainer = document.querySelector("[data-modal-container]");
    const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
    const overlay = document.querySelector("[data-overlay]");
    const modalImg = document.querySelector("[data-modal-img]");
    const modalTitle = document.querySelector("[data-modal-title]");
    const modalText = document.querySelector("[data-modal-text]");
    const testimonialsModalFunc = function () {
        if (modalContainer && overlay) {
            modalContainer.classList.toggle("active");
            overlay.classList.toggle("active");
        }
    };
    testimonialsItem.forEach(item => {
        item.addEventListener("click", function () {
            if (modalImg && modalTitle && modalText) {
                modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
                modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
                modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
                modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
                testimonialsModalFunc();
            }
        });
    });
    if (modalCloseBtn && overlay) {
        modalCloseBtn.addEventListener("click", testimonialsModalFunc);
        overlay.addEventListener("click", testimonialsModalFunc);
    }
    // Custom select functionality
    const select = document.querySelector("[data-select]");
    const selectItems = document.querySelectorAll("[data-select-item]");
    const selectValue = document.querySelector("[data-select-value]");
    const filterBtn = document.querySelectorAll("[data-filter-btn]");
    if (select) {
        select.addEventListener("click", function () {
            elementToggleFunc(this);
        });
    }
    selectItems.forEach(item => {
        item.addEventListener("click", function () {
            if (selectValue) {
                selectValue.innerText = this.innerText;
            }
            elementToggleFunc(select);
            filterFunc(this.innerText.toLowerCase());
        });
    });
    // Filtering functionality
    const filterItems = document.querySelectorAll("[data-filter-item]");
    const filterFunc = function (selectedValue) {
        filterItems.forEach(item => {
            if (selectedValue === "all" || selectedValue === item.dataset.category) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    };
    let lastClickedBtn = filterBtn.length ? filterBtn[0] : null;
    filterBtn.forEach(btn => {
        btn.addEventListener("click", function () {
            if (selectValue) {
                selectValue.innerText = this.innerText;
            }
            filterFunc(this.innerText.toLowerCase());
            
            if (lastClickedBtn) {
                lastClickedBtn.classList.remove("active");
            }
            this.classList.add("active");
            lastClickedBtn = this;
        });
    });
    // Contact form validation
    const form = document.querySelector("[data-form]");
    const formInputs = document.querySelectorAll("[data-form-input]");
    const formBtn = document.querySelector("[data-form-btn]");
    if (form) {
        formInputs.forEach(input => {
            input.addEventListener("input", function () {
                if (form.checkValidity()) {
                    formBtn.removeAttribute("disabled");
                } else {
                    formBtn.setAttribute("disabled", "");
                }
            });
        });
    }
    // Page navigation
    const navigationLinks = document.querySelectorAll("[data-nav-link]");
    const pages = document.querySelectorAll("[data-page]");
    navigationLinks.forEach((link, index) => {
        link.addEventListener("click", function () {
            pages.forEach((page, i) => {
                if (this.innerHTML.toLowerCase() === page.dataset.page) {
                    page.classList.add("active");
                    if (navigationLinks[i]) {
                        navigationLinks[i].classList.add("active");
                    }
                    window.scrollTo(0, 0);
                } else {
                    page.classList.remove("active");
                    if (navigationLinks[i]) {
                        navigationLinks[i].classList.remove("active");
                    }
                }
            });
        });
    });
});
