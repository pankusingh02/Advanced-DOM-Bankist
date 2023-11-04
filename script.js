"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector('.nav');


const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const header = document.querySelector(".header");

//Creating and inserting elements
const message = document.createElement("div");
message.classList.add("cookie-message");

message.innerHTML =
  'we use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it </button>';

header.prepend(message);
//header.append(message);

//header.before(message)
//header.after(message)

//Delete elements
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });

//styles
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

/** we can only get a style that we have created inline like
 *
 * console.log(message.style.backgroundColor) and not console.log(message.style.height)
 */

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + "px";

// REading Attributed ( attributes of <img> are src, alt, class)
/**  Reading standard attributes */
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.className); //nav__logo
console.log(logo.src); //https://3zw7hf.csb.app/img/logo.png
console.log(logo.getAttribute("src")); //img/logo.png

//Non-standard attributes

console.log(logo.designer); // undefined
console.log(logo.getAttribute("designer")); // PAnkaj singh

// Setting the attributes
logo.alt = "Pankaj singh logo";
console.log(logo.alt); //Pankaj singh logo

logo.setAttribute("company", "bankist");

console.log("just adding a line")

btnScrollTo.addEventListener("click", function (e) {
  /** -------old school way for smooth scrolling--------*/

  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log("Current scrool x/y", window.pageXOffset, window.pageYOffset);
  // console.log(
  //   "height/width of the viewport",
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  // //Scrolling
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.right + window.pageYOffset,
  //   behavior: "smooth"
  // });

  /** -------New way for smooth scrolling--------*/

  section1.scrollIntoView({ behavior: "smooth" });
});

// const alertH1 = function (e) {
//   alert("Hi its me");
//   h1.removeEventListener("mouseenter", alertH1);
// };

// const h1 = document.querySelector("h1");

// h1.onmouseenter = alertH1;

// h1.addEventListener("mouseenter", alertH1);

document.querySelector(".nav__links").addEventListener("click", function (e) {e.preventDefault();
  let name = e.target;
  console.log(name); //<a class="nav__link" href="#section--1">Features</a>

  if (e.target.classList.contains("nav__link")) {
    console.log("It is this ===> ", this);
    const id = this.getAttribute("href");

    document.querySelector(id).scrollIntoView({
      behavior: "smooth"
    });
  }
});

//Tabbed Component

const tabs=document.querySelectorAll('.operations__tab');
const tabsContainer =document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click',function (e){

  let clicked= e.target.closest('.operations__tab')

  console.log("clicked =====>",clicked)

//Guard clause
if(!clicked) return;

//Remove active classes

tabs.forEach(t=>t.classList.remove('operations__tab--active'));
tabsContent.forEach(c=>c.classList.remove('operations__content--active'))


//Activate tab
clicked.classList.add( 'operations__tab--active' )

//Activate content area
document.querySelector(`.operations__content--${clicked.dataset.tab}`)
.classList.add('operations__content--active')

});

//Menu fade animation

const handleHover = function (e,opacity){
  if(e.target.classList.contains('nav__link')){

    const link  = e.target;

    console.log("target hadlehover=====>", link)
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')  ;

    console.log("siblings======>", siblings)
    const logo =link.closest('.nav').querySelector('img');

    siblings.forEach(el=>{
      if(el !==link) el.style.opacity= opacity;
    });

    logo.style.opacity= opacity;
  }
}

//Passing "Arguments" into handler

nav.addEventListener("mouseover", function(e){
  handleHover(e,0.5)
});
nav.addEventListener("mouseout", function(e){
  handleHover(e,1)
});

/**Implementing a sticky navigation */

// const intialCords = section1.getBoundingClientRect();
// console.log(intialCords);

// window.addEventListener("scroll", function () {
//   console.log(window.scrollY);

//   if (window.scrollY > intialCords.top) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// });

/**Implementing a sticky navigation using Intersection observer API*/

const navHeight = nav.getBoundingClientRect().height;

const stickyNav=function(entries){
  const[entry]=entries;
  console.log(entry);

  if(!entry.isIntersecting){ nav.classList.add( "sticky" );}
  else nav.classList.remove('.sticky')
}

const headerObserver=new IntersectionObserver(stickyNav,{
  root:null,
  threshold:0,
  rootMargin: `-${navHeight}px`
});

headerObserver.observe(header)
/** Rvelling element on scroll */

//Reavel section

const allSections=document.querySelectorAll('.section')
const revealSection= function (entries,observer){
  const [entry]= entries

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  obersver.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection,{
  root: null,
  threshold: 0.15,
})

allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden')
})

/** Lazzy Loading images */

const imgTargets=document.querySelectorAll('img[data-src]');


const loadImg = function(entries, observer){
  const[entry]= entries;

  if(!entry.isIntersecting) return;

  entry.target.src= entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
  })

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root:null,
  threshold:0,
  rootMargin:'200px'
})

imgTargets.forEach(img=>imgObserver.observe(img));

// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

/** Lifecycle Dom Events */

// document.addEventListener('DOMcontentLoaed', function (e){
//   console.log(e);

// })

// window.addEventListener('load',function (e) {
//   console.log("page fully loaded")
// })

// window.addEventListener('beforeunload', function(event) {
//   event.preventDefault();
//   event.returnValue = '';
// });