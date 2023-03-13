function openMenu() {
   document.querySelector(".menu-list").classList.toggle('menu-list--active');
   document.querySelector(".navbar-btn").classList.toggle('navbar-btn--active');
};
function closeMenu() {
   document.querySelector(".menu-list").classList.remove('menu-list--active');
   document.querySelector(".navbar-btn").classList.remove('navbar-btn--active');

};

// скрыть - меню навигации при прокрутке вниз
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
   closeMenu();
   var currentScrollPos = window.pageYOffset;
   if (prevScrollpos > currentScrollPos) {
      document.querySelector(".header").style.top = "0";
   } else {
      document.querySelector(".header").style.top = "-80px";
   }
   prevScrollpos = currentScrollPos;
}

// Рандомно перемешивает элементы блока
const carusel = document.querySelector('.services-block');
carusel.innerHTMl = '';
[...carusel.children]
   .sort(() => Math.random() - 0.5)
   .forEach(v => carusel.append(v));


// Проверяет поддерживает ли браузер касание
if ('ontouchstart' in window) {
   console.log("/* browser with Touch Events support */");
} else {
   console.log("/* browser with Touch Events NO support */");
};
// Создаёт событие которое отслеживает касание на объекте about
document.addEventListener("DOMContentLoaded", startup);
function startup() {
   var el = document.querySelector(".about");
   el.addEventListener("touchstart", handleStart, false);
}
// в случае срабатывания запускает функцию StartAnimate()
function handleStart(evt) {
   console.log("startAnimate");
   startAnimate();
}

function startAnimate() {
   document.querySelector(".about").classList.add('animated');
   var items = document.querySelectorAll(".about-block__text-item");
   for (var i = 0; i < items.length; ++i) {
      items[i].classList.add('animated');
   };
   closeMenu();
};

// Задержка  перед выполнением ссылки в одну секунду.
window.onload = function () {
   var body = document.querySelector('body');
   var links = document.querySelectorAll('a');

   links.forEach(function (link) {
      link.addEventListener('click', onLinkClicked);

      function onLinkClicked(event) {
         event.preventDefault();
         setTimeout(onAnimationComplete, 1000);
      }

      function onAnimationComplete() {
         window.location = link.href;
      }
   });

}

