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
  // $('.optBtns').click(vertOptions);
  $('.optBtns').click(()=>{
    // debugger
    if(!JSON.parse(sessionStorage.getItem('ThersOpenTippy'))){
      // debugger
      // * Setting transition speed for GSAP animation and setting default attributes for tippy
      const transitionTime = 0.25;
      const editOPts = tippy(event.target, {
        // zIndex: '999',
        theme: 'todTheme',
        arrow: false,
        allowHTML: true,
        //! Make sure the offset automatically adjust to the padding
        placement: 'top',
  
        trigger: 'click',
        interactive: true,

        onShow(inst){
          sessionStorage.setItem('ThersOpenTippy', true);
        },
      });

      //* Finding the clicked element's address
      const accessedTod = findAdress(event.target.parentElement.firstChild);

      //* Increase the height of the nested
      const IsAShowOff = $(event.target.parentElement.parentElement).hasClass('show-off') || $(event.target.parentElement).hasClass('show-off');
      const childDOM = IsAShowOff ? (
        $(event.target.parentElement).is('li') ? event.target.parentElement : event.target.parentElement.parentElement
      ): event.target.parentElement;
      const child = $(childDOM)

      const InitalMarginTop = parseFloat(child.css('margin-top'));
      // console.log(parseFloat(child.css('padding-top')))
      editOPts.setProps({
        //* Setting the right buttons for editing 
        content: `
          <h1>
            <i class="icon-pencil"></i>
            ${accessedTod.path.isCaret()?'<i class="icon-minus-squared"></i>':''}
            <i class="icon-plus"></i>
            ${accessedTod.path.isCaret()?'<i class="icon-minus-squared-alt"></i>':''}
            <i class="icon-trash-empty"></i>
          </h1>
        `,

        //* Setting the offset
        offset: [0, (
          parseFloat(child.css('padding-top')) +
          ((IsAShowOff && !$(event.target.parentElement).is('li'))? parseFloat($(event.target.parentElement).css('padding-top')): 0) 
        )],

        //* Setting the right theme Pt 2
        theme: 'todTheme',

        // hideOnClick: 'toggle',

        placement: "top-end",

        animateFill: true,

        hideOnClick: true,

        onClickOutside(inst, ev){
          console.log('out side click')
          editOPts.hide();

          gsap.to(childDOM, {
            marginTop: `${InitalMarginTop}px`,

            duration: transitionTime,
            onComplete: ()=>{
              // sessionStorage.setItem('ThersOpenTippy', false)
              editOPts.destroy();
              refresh();
            }
          })
        },
      })

      editOPts.show();
      const childMarginTop = parseFloat(child.css('margin-top'));
      const tippyHeight = parseFloat($('.tippy-box').css('height'));
      editOPts.hide();


      const editorBtns = {
        editTitle(){
          accessedTod.path.editTitle();
          editOPts.hide();
          editOPts.destroy();
          refresh();
        },

        addChild(){
          //Adding newtask to memory
          accessedTod.path.addChild();
      
          //Flipping all parents state's
          accessedTod.checkout.forEach((n) => {
            n.flip();
          });

          editOPts.destroy();
          refresh();
        },

        delete(){
          const youSure = confirm('Are you sure?');
          if(youSure){
            // Deleting from the root array
            if (accessedTod.checkout.length == 1) {
              mem = mem.filter((n) => n.title != accessedTod.path.title);
            }
            // Deleting a sub child
            else {
              //Getting the parent
              const parent = accessedTod.checkout[1];
        
              //Deleting selected task/caret from it's parent
              parent.deleteChild(accessedTod.path.title);
        
              //Flipping all parents state's
              accessedTod.checkout.forEach((n) => {
                if (n.children != 0) {
                  n.flip();
                }
              });
            }

            editOPts.destroy();
            refresh();
          }
        },

        delAllDone(){
          let allDones = accessedTod.path.children.filter((n) => n.state);
  
          //if there are any done tasks
          if (allDones.length > 0) {
            //firing confirmation prompt
            const confirmation = confirm('Are You Sure? All done tasks and carets will be deleted');
      
            //If there users wants to continue...
            if (confirmation) {
              //Delete all done method
              accessedTod.path.delAllDone();
      
              //Refreshing the allFather
              editOPts.destroy();
              refresh();
            }
            //If the users is REMORSEFUL for such vile actions
            else {
              alert('Action Cancelled');
            }
          }
          //If there aren't any done tasks
          else {
            alert('There are no finished Task and/or Carets');
          }
        },

        delAll(){
          //Confirmation prompt fired
          const confirmation = confirm('Are You Sure? Everything will be deleted...');
      
          //If user wants to continue...
          if (confirmation) {
            accessedTod.path.delAll();
      
            editOPts.destroy();
            refresh();
          }
          //If users cancels the action
          else {
            alert('Action cancelled');
          }
        }
      }

      $('.tippy-box .icon-pencil').click(()=>{editorBtns.editTitle()})
      $('.tippy-box .icon-minus-squared').click(()=>{editorBtns.delAll()})
      $('.tippy-box .icon-plus').click(()=>{editorBtns.addChild()})
      $('.tippy-box .icon-trash-empty').click(()=>{editorBtns.delete()})
      $('.tippy-box .icon-minus-squared-alt').click(()=>{editorBtns.delAllDone()})

      // console.log(childDOM)
      gsap.to(childDOM, {
        marginTop: `${childMarginTop + tippyHeight}px`,
      
        duration: transitionTime,
        onComplete: ()=>{
          editOPts.show();
          
          //* Setting the css
          const borderWidth = parseFloat(child.css('border-top-width'));
          $('.tippy-box').css('background-color', child.css('background-color'))
            .css('border-width', `${borderWidth} ${borderWidth} 0 ${borderWidth}`)
              .css('border-color', `${child.css('border-top-color')}`);
          $('.tippy-box .tippy-content h1 i').css('color', child.css('color'));
          $('.tippy-box .tippy-content h1 .icon-trash-empty').css('color', '#f57a62')

          // console.log($('.tippy-box').children())
        },
      })
    }
  });

  //Mirage: "Hey hey guys, check it out, check it out. I set the li events. It's not a bamboozle this time."
  let allCaretsObj = $('.caret');
  delete allCaretsObj.prevObject;
  delete allCaretsObj.length;
  let allCarets = Object.values(allCaretsObj);

  //Setting up events for all tasks
  $('.nested li, .show-off-task').on('click', () => {
    liClick(/* mem, */ allCarets);
  });

  // tippy('.optBtns', )
};
displayAll();
  