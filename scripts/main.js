function openMenu() {
   document.querySelector(".menu-list").classList.toggle('menu-list--active');
   document.querySelector(".navbar-btn").classList.toggle('navbar-btn--active');
};
function closeMenu() {
   document.querySelector(".menu-list").classList.remove('menu-list--active');
   document.querySelector(".navbar-btn").classList.remove('navbar-btn--active');

};

function startAnimate() {
   document.querySelector(".about").classList.add('animated');
   var items = document.querySelectorAll(".about-block__text-item");
   for (var i = 0; i < items.length; ++i) {
      items[i].classList.add('animated');
   }
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

