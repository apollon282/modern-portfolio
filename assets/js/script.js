"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// mobile sidebar clicked by default
sidebarBtn.click();

// auto scrolling Tech Skills
const list = document.querySelector(".technologies-list");
const listItems = list.querySelectorAll(".technologies-item");
const scrollSpeed = 0.7; // speed
const intervalDuration = 10; // smoothness
const totalWidth = list.scrollWidth - list.clientWidth;
let scrollPosition = 0;
let scrolling = false;

function startScrolling() {
  if (!scrolling) {
    scrolling = true;
    const interval = setInterval(() => {
      scrollPosition += scrollSpeed;

      if (scrollPosition >= totalWidth) {
        scrollPosition = 0;
      }

      if (!scrolling) {
        clearInterval(interval);
      }

      list.scrollLeft = scrollPosition;
    }, intervalDuration);
  }
}

function stopScrolling() {
  scrolling = false;
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startScrolling();
      } else {
        stopScrolling();
      }
    });
  },
  { threshold: 0 }
);

observer.observe(list);

list.addEventListener("mouseenter", () => {
  stopScrolling();
});

list.addEventListener("mouseleave", () => {
  startScrolling();
});

// variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  filterItems.forEach(item => {
    const categories = item.dataset.category.split(' ');
    if (selectedValue === "all" || categories.includes(selectedValue)) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};


// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
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

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetSection = this.getAttribute("data-target-section")
      ? this.getAttribute("data-target-section")
      : this.innerHTML.toLowerCase();

    for (let i = 0; i < pages.length; i++) {
      if (targetSection === pages[i].dataset.page) {
        pages[i].classList.add("active");

        if (navigationLinks[i]) {
          navigationLinks[i].classList.add("active");
        }
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");

        if (navigationLinks[i]) {
          navigationLinks[i].classList.remove("active");
        }
      }
    }
  });
}

// open certificates on click
function imgWindow() {
  window.open("image");
}

// copy email address
function copyEmail(e) {
  var email = document.querySelector(".email-text");
  var range = document.createRange();
  range.selectNode(email);
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  e.target.innerText = "Copied"
  setTimeout(()=>{
    e.target.innerText="Copy";
  }, 300)
}

// Animated percentage bar
function increaseProgress(element, targetWidth) {
  var currentWidth = 0;
  var increment = 1;
  var interval = 10;

  var timer = setInterval(function () {
    currentWidth += increment;
    element.style.width = currentWidth + "%";
    if (currentWidth >= targetWidth) {
      clearInterval(timer);
    }
  }, interval);
}

function startAnimationOnScroll() {
  var progressFillElements = document.querySelectorAll(
    ".languages-progress-fill"
  );

  var options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var targetWidth = parseInt(entry.target.style.width);
        increaseProgress(entry.target, targetWidth);
        observer.unobserve(entry.target);
      }
    });
  }, options);

  progressFillElements.forEach(function (element) {
    observer.observe(element);
  });
}

startAnimationOnScroll();

// Loading Animation
window.addEventListener("DOMContentLoaded", (event) => {
  const imageContainers = document.querySelectorAll(".project-img");
  imageContainers.forEach((container) => {
    const image = container.querySelector("img");
    image.addEventListener("load", function () {
      container.classList.remove("loading");
    });
  });
});

// Age Counter Animation
function countTo(target, duration) {
  const start = 0;
  const increment = (target / duration) * 50;

  let current = start;
  const timer = setInterval(function () {
    current += increment;
    document.getElementById("age").textContent =
      Math.floor(current) + " years old";

    if (current >= target) {
      clearInterval(timer);
      document.getElementById("age").textContent = target + " years old";
    }
  }, 50);
}

function calculateAge(birthDate) {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

const ageElement = document.getElementById("age");
ageElement.textContent = "0 years old";

setTimeout(function () {
  countTo(calculateAge("1994-07-01"), 1000);
}, 1000);

// Motto Animation
const text = Array.from({ length: 20 }, () =>
  Array.from({ length: 16 }, () => Math.round(Math.random())).join("")
);
text.push("Full Stack Developer !");
const mottoElement = document.getElementById("motto");
let index = 0;

function flipmotto() {
  mottoElement.textContent = text[index];

  if (text[index] === "Full Stack Developer !") {
    clearInterval(intervalId);
  }

  index = (index + 1) % text.length;
}

const intervalId = setInterval(flipmotto, 100);

// Expanding About Text
function toggleText() {
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("toggle-button");

  if (moreText.style.display === "none") {
    moreText.style.display = "block";
    btnText.innerHTML = "&uarr; &nbsp; &nbsp; Hide text &nbsp; &nbsp; &uarr;";
  } else {
    moreText.style.display = "none";
    btnText.innerHTML = "&darr; &nbsp; &nbsp; Show more &nbsp; &nbsp; &darr;";
  }
}


// For animated cursor
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#6e6bff", "#6c69fd", "#6663f8", "#6461f5", "#615eef", "#605dec", "#5f5ce3",
  "#5f5cdf", "#5b58d5", "#5552d1", "#4441c5", "#3e3bc0", "#2f2cb2", "#2926ac",
  "#18159c", "#120f95", "#030083", "#02007c", "#020068", "#020060", "#02005f",
  "#02005e"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.4;
    y += (nextCircle.y - y) * 0.4;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();


var x;
var $cards = $(".card");
var $style = $(".hover");

$cards
  .on("mousemove touchmove", function(e) { 
    // normalise touch/mouse
    var pos = [e.offsetX,e.offsetY];
    e.preventDefault();
    if ( e.type === "touchmove" ) {
      pos = [ e.touches[0].clientX, e.touches[0].clientY ];
    }
    var $card = $(this);
    // math for mouse position
    var l = pos[0];
    var t = pos[1];
    var h = $card.height();
    var w = $card.width();
    var px = Math.abs(Math.floor(100 / w * l)-100);
    var py = Math.abs(Math.floor(100 / h * t)-100);
    var pa = (50-px)+(50-py);
    // math for gradient / background positions
    var lp = (50+(px - 50)/1.5);
    var tp = (50+(py - 50)/1.5);
    var px_spark = (50+(px - 50)/7);
    var py_spark = (50+(py - 50)/7);
    var p_opc = 20+(Math.abs(pa)*1.5);
    var ty = ((tp - 50)/2) * -1;
    var tx = ((lp - 50)/1.5) * .5;
    // css to apply for active card
    var grad_pos = `background-position: ${lp}% ${tp}%;`
    var sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`
    var opc = `opacity: ${p_opc/100};`
    var tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`
    // need to use a <style> tag for psuedo elements
    var style = `
      .card:hover:before { ${grad_pos} }  /* gradient */
      .card:hover:after { ${sprk_pos} ${opc} }   /* sparkles */ 
    `
    // set / apply css class and style
    $cards.removeClass("active");
    $card.removeClass("animated");
    $card.attr( "style", tf );
    $style.html(style);
    if ( e.type === "touchmove" ) {
      return false; 
    }
    clearTimeout(x);
  }).on("mouseout touchend touchcancel", function() {
    // remove css, apply custom animation on end
    var $card = $(this);
    $style.html("");
    $card.removeAttr("style");
    x = setTimeout(function() {
      $card.addClass("animated");
    },2500);
  });