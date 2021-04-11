const mobileBreakpoint = 720;
const hamBurger = document.querySelector('#hamburger');
const sassTransitionTime = 500;
const sassBarHeight = '0.2em'; //* searchIn(_top.scss, $bar-height)
const sassOuterBarDistance = '0.2em'; //* searchIn(_top.scss, $outer-bar-distance)*/
let openNav;
let initialized;

const openMenu = () => {
  swiper.slidePrev(400);
};

//Initializing swiper
var swiper = new Swiper('.swiper-container', {
  slidesPerView: 'auto',
  initialSlide: 1,
  resistanceRatio: 0,
  slideToClickedSlide: true,

  edgeSwipeThreshold: 20,
  allowTouchMove: true,
  /* allowTouchMove: true, */

  on: {
    afterInit: () => {
      initialized = true;
      hamBurger.addEventListener('click', openMenu, true);
    },
    //*Only allowing swiper to take effect in a certain range and when in mobile version
    touchStart: (e) => {
      const onMainPage = swiper.activeIndex == 1 ? true : false;
      const xPosOnSwipe = e.touches.startX;
      if (onMainPage) {
        swiper.allowTouchMove = xPosOnSwipe < 0.2 * innerWidth ? true : false;
      } else {
        swiper.allowTouchMove = true;
      }
    },
    //*Animation of the hamburger
    transitionEnd: () => {
      if (initialized) {
        const [bar1, bar2, bar3] = hamburger.children;

        const onMainPage = swiper.activeIndex === 1 ? true : false;
        if (onMainPage) {
          hamBurger.addEventListener('click', openMenu, true);
          bar1.style.transform = 'rotate(0deg)';
          bar3.style.transform = 'rotate(0deg)';
          setTimeout(() => {
            bar1.style.top = '-' + sassOuterBarDistance;
            bar3.style.top = sassOuterBarDistance;

            setTimeout(() => {
              bar2.style.width = '100%';
            }, sassTransitionTime / 2);
          }, sassTransitionTime / 2);
        } else {
          hamBurger.removeEventListener('click', openMenu, true);

          bar2.style.width = '0';
          setTimeout(() => {
            bar1.style.top = sassBarHeight;
            bar3.style.top = '-' + sassBarHeight;

            setTimeout(() => {
              bar1.style.transform = 'rotate(45deg)';
              bar3.style.transform = 'rotate(-45deg)';
            }, sassTransitionTime / 2);
          }, sassTransitionTime / 2);
        }
      }
    },
    resize: () => {
      //*Enabling sliding nav thing when in mobile version
      swiper.allowTouchMove = innerWidth <= mobileBreakpoint ? true : false;

      //*what happens when disabling the sliding nav feature
      if (innerWidth >= mobileBreakpoint) {
        swiper.slideTo(1, 400);
      }
    },
  },
});
