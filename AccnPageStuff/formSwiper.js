const formSwiper = new Swiper('.forms', {
    slidesPerView: 'auto',
    initialSlide: 1,
    resistanceRatio: 0,
    slideToClickedSlide: true,
    allowTouchMove: false,
});

const change = document.querySelector('#change');
const submit = document.querySelector('#submit');

formSwiper.slideTo(0)
change.addEventListener('click', ()=>{
    formSwiper.slideTo(formSwiper.activeIndex == 0 ? 1 : 0);

    //Rewriting some details bro
    if(formSwiper.activeIndex == 0){
        //On Sign up form

        document.querySelectorAll('.state').forEach(n=>{
            n.innerHTML = "Sign Up"
        });
        document.querySelector('.state-opp').innerHTML = 'Login';
    }else{
        //On Login form

        document.querySelectorAll('.state').forEach(n=>{
            n.innerHTML = "Login"
        });
        document.querySelector('.state-opp').innerHTML = 'Sign Up';
    }
})