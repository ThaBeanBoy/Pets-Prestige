//Helper
const delay = (n)=>{
    n = n || 2000;

    return new Promise(resolve => {
        setTimeout(resolve, n);
    })
}

const loadingScreen = document.querySelector('.loading-screen');

barba.init({
    transitions: [{
        async leave(data){
            await gsap.to(loadingScreen, {
                delay: 0.5,
                height: innerHeight,
            })

            data.current.container.remove();
        },

        async enter(data){
            await gsap.to(loadingScreen, {
                delay: 0.5,
                height: 0
            })
        }
    }]
})