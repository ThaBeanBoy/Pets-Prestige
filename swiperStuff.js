const mobileBreakpoint = 720;
const hamBurger = document.querySelector('#hamburger');
const sassTransitionTime = 500;
const sassBarHeight = '0.2em'; //* searchIn(_top.scss, $bar-height)
const sassOuterBarDistance = '0.2em'; //* searchIn(_top.scss, $outer-bar-distance)*/
let openNav;
let initialized;

//Initializing swiper
var swiper = new Swiper('.swiper-container', {
  slidesPerView: 'auto',
  initialSlide: 1,
  resistanceRatio: 1,
  slideToClickedSlide: true,

  edgeSwipeThreshold: 1,
  allowTouchMove: true,
  //Disabling swiper if in pc mode
  breakpoints: {
    mobileBreakpoint: {
      allowTouchMove: false,
    },
  },

  on: {
    afterInit: () => {
      initialized = true;
      openNav = false;
    },
    slideChange: () => {
      //*Happens after initializing and scrolled to 1st swiper element is set up
      if (initialized) {
        const openingNav = swiper.activeIndex === 1 ? true : false;
        const [bar1, bar2, bar3] = hamburger.children;

        //*What happens when opening mobile nav
        //console.log(`current index: ${swiper.activeIndex}`);
        if (!openingNav) {
          bar2.style.width = '0';
          setTimeout(() => {
            bar1.style.top = sassBarHeight;
            bar3.style.top = '-' + sassBarHeight;

            setTimeout(() => {
              bar1.style.transform = 'rotate(45deg)';
              bar1.style.width = '50%';
              bar3.style.transform = 'rotate(-45deg)';
              bar3.style.width = '50%';
            }, sassTransitionTime / 2);
          }, sassTransitionTime / 2);
        }
        //*What happens when closing mobile nav
        else {
          bar1.style.transform = 'rotate(0deg)';
          bar1.style.width = '75%';
          bar3.style.transform = 'rotate(0deg)';
          bar3.style.width = '75%';
          setTimeout(() => {
            bar1.style.top = '-' + sassOuterBarDistance;
            bar3.style.top = sassOuterBarDistance;

            setTimeout(() => {
              bar2.style.width = '100%';
            }, sassTransitionTime / 2);
          }, sassTransitionTime / 2);
        }
      }

      /* console.log('Yo'); */
    },
  },
});
hamBurger.addEventListener('click', () => {
  swiper.slideTo(openNav ? 1 : 0, 200);
  openNav = openNav ? false : true;
});

//Event for browser window resizing and using features accordingly
window.addEventListener('resize', () => {
  //Enabling sliding nav thing when in mobile version
  swiper.allowTouchMove = innerWidth <= mobileBreakpoint ? true : false;

  //what happens when disabling the sliding nav feature
  if (innerWidth <= mobileBreakpoint) {
  }
});
