const { active } = require("browser-sync");
const { byteLength } = require("engine.io-client/build/esm/util");


function openMenu() {
   document.querySelector(".menu-list").classList.toggle('menu-list--active');
   document.querySelector(".navbar-btn").classList.toggle('navbar-btn--active');
};
function closeMenu() {
   document.querySelector(".menu-list").classList.toggle('menu-list--active');
   document.querySelector(".navbar-btn").classList.toggle('navbar-btn--active ');
};

function startAnimate() {
   document.querySelector(".about").classList.add('animated');
   var items = document.querySelectorAll(".about-block__text-item");
   for (var i = 0; i < items.length; ++i) {
      items[i].classList.add('animated');
   }
};

