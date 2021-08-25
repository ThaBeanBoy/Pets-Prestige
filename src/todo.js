//Styles stuff
import { gsap } from 'gsap';
import './todo.scss';
import './fontello-976026c7/fontello-976026c7/css/fontello-embedded.css';
import { rootEdits } from './Js/memoryConversions';

//Manipulates the clock at the top
import { newClock, clockFunctions, adjustAllfatherHeight } from './Js/clock.js';
setInterval(() => {
  newClock();
}, 1000);

//Display the data
import displayAll from './Js/memStuff.js';
displayAll();

const mainBtns = document.querySelector('.mainBtns');
$('#bottomPiece').click(() => {
  gsap.to(mainBtns, {
    width: '90%',
    height: '10vh',

    duration: 0.25,

    onComplete() {
      //Closes of the main buttons after x milliseconds
      setTimeout(() => {
        gsap.to(mainBtns, {
          width: '30%',
          height: '0',

          duration: 0.25,
        });
      }, 2000);
    },
  });
});

//Deleting all done tasks and carets from the root
$('#del-checked').click(() => {
  rootEdits.delChecked();
});

$('#add').click(() => {
  rootEdits.addChild();
});

$('#del-all').click(() => {
  rootEdits.delAll();
});

//Save the scroll position at the end of each scroll
$('.allFather').scroll(() => {
  localStorage.removeItem('scrollPos');
  localStorage.setItem(
    'scrollPos',
    JSON.stringify($('.allFather').scrollTop())
  );
});
