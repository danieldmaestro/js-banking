'use strict';
const btnScrollTo = document.querySelector('.btn--scroll-to');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const contents = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const allSections = document.querySelectorAll(".section")
const slides = document.querySelectorAll(".slide");
const imageTargets = document.querySelectorAll("img[data-scr]");
const btnRight = document.querySelector(".slider__btn--right")
const btnLeft = document.querySelector(".slider__btn--left")
///////////////////////////////////////
// Modal window
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btns => {
  btns.addEventListener('click', openModal);
  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
});
//IMPLEMENTING SMOOTH SCROLL
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});
//IMPLEMENTING PAGE NAVIGATION
// document.querySelectorAll('.nav__link').forEach(function (anchorEl) {
//   anchorEl.addEventListener('click', function (e) {
//     e.preventDefault()
//     const id = this.getAttribute("href")
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior : "smooth"})
//   });
// });
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
// BUILDING TABBED COMPONENT
tabsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('operations__tab')) {
    tabs.forEach(el => {
      el.classList.remove('operations__tab--active');
    });
    e.target.classList.add('operations__tab--active');
  }
  // REMOVING ACTIVE CLASS
  contents.forEach(el => {
    el.classList.remove('operations__content--active');
  });
  document
    .querySelector(`.operations__content--${e.target.dataset.tab}`)
    .classList.add('operations__content--active');
  // if (e.target.classList.contains('operations__tab')) {
  //   contents.forEach(el => {
  //     el.classList.remove('operations__content--active')
  //   })
  //   contents.forEach((el, i) => {
  //     if (e.target.classList.contains(`operations__tab--${i + 1}`)) {
  //       el.classList.toggle('operations__content--active');
  //     }
  //   });
  // }
});
// IMPLEMENTING THE FADEOUT FEATURE
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
    siblings.forEach(el => {
      if (e.target !== el) {
        el.style.opacity = opacity;
      }
    });
  }
};
nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

// INTERSECTION OBSERVER API
// // const section1 = document.querySelector('#section--1');
// const callBackFn = function(entries, observer){
//   console.log(entries);
// }

// const observerOptions = {
//   threshold : 0
// }
// const observer = new IntersectionObserver(callBackFn, observerOptions)
// observer.observe(section1)

const header = document.querySelector('.header');
const stickyNav = function (entries, observerHeader) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const observerOptions = {
  threshold: 0,
  root: null,
  rootMargin: "-90px" 
};
const observerHeader = new IntersectionObserver(stickyNav, observerOptions);
observerHeader.observe(header);

// fade stuff
const obsFn = function (entries, obsOpt) {
  const [entry] = entries;
  // console.log(entry);
  if(entry.isIntersecting){
    entry.target.classList.remove('section--hidden');
  }

};
const obsOpt = {
  root: null,
  threshold: 0.15,
};
const observer = new IntersectionObserver(obsFn, obsOpt);
allSections.forEach(section => {
  section.classList.add('section--hidden');
  observer.observe(section);
});

//IMPLEMENTING LAZY LOADING IMAGES
// const loadingImg = function (entries, imgObserver) {
//   const [entry] = entries;
//   entry.target.src = entry.target.dataset.src;
//   entry.target.addEventListener('load', function () {
//     entry.target.classList.remove('lazy-img');
//   });
// };
// const imgObserver = new IntersectionObserver(loadingImg, {
//   root: null,
//   threshold: 0,
//   rootMargin: '200px',
// });
// imageTargets.forEach(img => {
//   imgObserver.observe(img);
// });

// SLIDER
const maxNumberOfSlides = slides.length - 1;
// console.log(slides);
let currentSlide = 0;
slides.forEach((slide, i) => {
  slide.style.transform = `translateX(${100 * i}%)`
  // console.log(slide)
})

btnRight.addEventListener("click", function(){
  if (currentSlide === maxNumberOfSlides){
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`
})
})

btnLeft.addEventListener("click", function(){
  if (currentSlide === 0){
    currentSlide = maxNumberOfSlides;
  } else {
    currentSlide--;
  }
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`
})
})
// LECTURES//////////////////////////////////////////////

//SELECTING ELEMENTS
// const section = document.querySelector('.section');

// // console.log(section);
// // console.log(allSections);
// // const section1 = document.getElementById("section--1")
// // console.log(section1);
// // const navItems = document.getElementsByClassName("nav__item")
// // console.log(navItems);
// // const allButtons = document.getElementsByTagName("button");
// // console.log(allButtons);
// const header = document.querySelector('.header');

// //CREATING AND INSERTING ELEMENTS
// //insertAdjacentHTML
// const myDiv = document.createElement('div');
// // header.append(myDiv.cloneNode(true))
// myDiv.classList.add('cookie-message');
// myDiv.innerHTML = `We use cookies for improved accessibility and functionality <button class="btn--close-cookie">Got it</button>`;
// console.log(myDiv);
// header.append(myDiv);

// //Deleting elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     myDiv.remove();
//   });

//STYLES, ATTRIBUTES AND CLASSES
// myDiv.style.backgroundColor = 'slateblue';
// myDiv.style.width = '100%';
// console.log(myDiv.style.height);
// console.log(myDiv.style.backgroundColor);
// console.log(myDiv.style.width);
// console.log(getComputedStyle(myDiv).height);
// myDiv.style.height = parseFloat(getComputedStyle(myDiv).height) + 20 + 'px';

// const logo = document.querySelector('.nav__logo');
// console.log(logo.src);
// console.log(logo.id);
// console.log(logo.className);

// console.log(logo.getAttribute("src"));
// console.log(logo.getAttribute("id"));
// console.log(logo.getAttribute("class"));

// logo.setAttribute("id", "Enaira");

//classes

//  console.log(logo.classList);
// logo.classList.add("j");
// logo.classList.remove("j");
// logo.classList.toggle("k");
// logo.classList.contains("n");

//TYPES OF EVENT AND EVENT HANDLER
// const h1 = document.querySelector('h1');
// const x = function () {
//   alert('You just moved over the H1 element');
//   h1.removeEventListener('mouseenter', x);
// };
// h1.addEventListener('mouseenter', x);

// h1.onclick = function(){
//   alert("You just moved over the H1 element")
// }

//EVENT PROPAGATION IN PRACTICE
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = 'seagreen';
//   console.log(e.target);
//   console.log(this===e.currentTarget);
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = 'sandybrown';
//   console.log(e.target);
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = 'tomato';
//   console.log(e.target);
// });

// DOM TRAVERSING
// const h1 = document.querySelector('h1');

// console.log(h1.querySelectorAll(".highlight"))
// console.log(h1.childNodes);
// console.log(h1.children)
// h1.firstElementChild.style.color = "red"
// h1.lastElementChild.style.color = "red"

// GOING UPWARDS
// console.log(h1.parentNode)
// console.log(h1.parentElement)
// console.log(h1.closest(""))

// // going sideways
// console.log(h1.previousElementSibling)
// console.log(h1.nextElementSibling)
// const arrOfEl = [...h1.parentElement.children]
// console.log(arrOfEl);
// arrOfEl.forEach((el) => {
//   if(el !== h1){
//     el.style.transform = "rotate(5deg)"
//   }
// })
