import { mem } from './memoryConversions';

import displayChillun from './memStuff/displayChillun';

import caretClick from './memStuff/caretEvents';
import liClick from './memStuff/liEvents';

import { InitiateSortable } from './sortableStuff';
import openTippy from './tippyStuff';

function displayAll() {
  //Blood Hound: "I call upon the all father for and an empty slate"
  const allFather = $('.allFather'); //! Call upon me when NEEDED my children...

  //Pathfinder: "Attaching all the tings from the memory friends."
  mem.forEach((n) => {
    let endLi;
    const done = n.state ? 'done' : 'not-done';

    //for carets that reside in the face of the Allfather
    if (n.isCaret()) {
      const showing = n.showing ? 'showing' : 'not-showing';

      //Making the proper endli
      endLi = `<li class="show-off ${done} caret-show-off">
        <div class="caret ${done} caret-show-off" data-state="${showing}"><span class="task-txt">${n.title}</span><span class="icon-ellipsis-vert optBtns"></span></div></li>`;

      //Attaching the endLi to the allFather
      allFather.prepend(endLi);

      //Production of the .nested
      const sisterWife = $('.show-off')[0];
      displayChillun(sisterWife, n.children);
    }
    //for task that reside in the face of the Allfather
    else {
      //Making the proper endli
      endLi = `
      <li class="show-off show-off-task ${done}"><div class="task"><span class="task-txt ${done}">${n.title}</span><span span class="icon-ellipsis-vert optBtns"></span></div><ul class="nested"></ul></li>`;

      // displayChillun(sisterWife, []);

      //Attaching the endLi to the allFather
      allFather.prepend(endLi);
    }
  });

  //Octane: "Eh amigos, i'll quickly manipulate of showing the carets and scroll position. stimed up and ready to go!!"
  allFather.scrollTop(JSON.parse(localStorage.getItem('scrollPos')));

  //Setting up events for caret
  $('.caret').click(caretClick);

  $('.optBtns').click(() => {
    openTippy();
  });

  //Mirage: "Hey hey guys, check it out, check it out. I set the li events. It's not a bamboozle this time."
  //Setting up events for all tasks
  $('.nested li, .show-off-task, .task')
    .not('.li-caret')
    .not('.optBtns')
    .click(() => {
      // console.log('li click');
      liClick();
    });

  InitiateSortable();
}

export default displayAll;
