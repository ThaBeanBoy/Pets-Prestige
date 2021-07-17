let accnSession = sessionStorage;
accnSession.setItem('Which', true)

const navLogin = document.querySelectorAll('.accn-effect')[0];
const navSignup = document.querySelectorAll('.accn-effect')[1];


navLogin.addEventListener('click', ()=>{
    accnSession.setItem('Which', false);
});

navSignup.addEventListener('click', ()=>{
    accnSession.setItem('Which', true);
})