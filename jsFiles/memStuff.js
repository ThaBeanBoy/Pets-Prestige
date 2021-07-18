const displayAll = () => {
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
        endLi = `<li class="show-off ${done}"><div class="caret ${done}" data-state="${showing}"><span class="task-txt">${n.title}</span><span class="icon-ellipsis-vert optBtns"></span></div></li>`;
  
        //Attaching the endLi to the allFather
        allFather.prepend(endLi);
  
        //Production of the .nested
        const sisterWife = $('.show-off')[0];
        displayChillun(sisterWife, n.children);
      }
      //for task that reside in the face of the Allfather
      else {
        //Making the proper endli
        endLi = `<li class="show-off show-off-task ${done}"><span class="task-txt">${n.title}</span><span class="icon-ellipsis-vert optBtns"></span></li>`;
  
        //Attaching the endLi to the allFather
        allFather.prepend(endLi);
      }
    });
  
    //Octane: "Eh amigos, i'll quickly manipulate of showing the carets and scroll position. stimed up and ready to go!!"
    allFather.scrollTop(JSON.parse(localStorage.getItem('scrollPos')));
  
    //Setting up events for caret
    $('.caret').click(caretClick);
  
    //Setting up events for options buttons
    $('.optBtns').click(vertOptions);
  
    //Mirage: "Hey hey guys, check it out, check it out. I set the li events. It's not a bamboozle this time."
    let allCaretsObj = $('.caret');
    delete allCaretsObj.prevObject;
    delete allCaretsObj.length;
    let allCarets = Object.values(allCaretsObj);
  
    //Setting up events for all tasks
    $('.nested li, .show-off-task').on('click', () => {
      liClick(/* mem, */ allCarets);
    });
  };
  displayAll();
  