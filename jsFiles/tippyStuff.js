const openTippy = (target) => {
  if (!JSON.parse(sessionStorage.getItem('ThersOpenTippy'))) {
    // debugger
    // * Setting transition speed for GSAP animation and setting default attributes for tippy
    const transitionTime = 0.25;
    const editOPts = tippy(target, {
      zIndex: '999',
      theme: 'todTheme',
      arrow: false,
      allowHTML: true,
      placement: 'top',
      sticky: true,

      trigger: 'click',
      interactive: true,
      appendTo: document.querySelector('body'),

      onShow(inst) {
        sessionStorage.setItem('ThersOpenTippy', true);
      },
    });

    //* Finding the clicked element's address
    const accessedTod = findAdress($(target.parentElement).children('span')[0]);

    //* Increase the height of the nested
    const IsAShowOff =
      $(target.parentElement.parentElement).hasClass('show-off') ||
      $(target.parentElement).hasClass('show-off');

    const childDOM = IsAShowOff
      ? $(target.parentElement).is('li')
        ? target.parentElement
        : target.parentElement.parentElement
      : target.parentElement;
    const child = $(childDOM);

    const InitalMarginTop = parseFloat(child.css('margin-top'));

    editOPts.setProps({
      //* Setting the right buttons for editing
      content: `
        <h1>
          <i class="icon-pencil"></i>
          ${
            accessedTod.path.isCaret()
              ? '<i class="icon-minus-squared"></i>'
              : ''
          }
          <i class="icon-plus"></i>
          ${
            accessedTod.path.isCaret()
              ? '<i class="icon-minus-squared-alt"></i>'
              : ''
          }
          <i class="icon-trash-empty"></i>
        </h1>
      `,

      //* Setting the right theme Pt 2
      theme: 'todTheme',

      placement: 'top-end',

      animateFill: true,

      hideOnClick: false,

      onClickOutside(inst, ev) {
        // console.log("out side click");
        editOPts.hide();

        gsap.to(childDOM, {
          marginTop: `${InitalMarginTop}px`,

          duration: transitionTime,
          onComplete: () => {
            editOPts.destroy();
            refresh();
          },
        });
      },
    });

    editOPts.show();
    const childMarginTop = parseFloat(child.css('margin-top'));
    const tippyHeight = parseFloat($('.tippy-box').css('height'));

    let offset =
      parseFloat(child.css('padding-top')) -
      parseFloat(child.css('border-top-width'));
    console.log(offset);
    editOPts.setProps({
      offset: [0, offset],
    });

    // editOPts.hide();
    //* Setting the css
    const borderWidth = parseFloat(child.css('border-top-width'));
    $('.tippy-box')
      .css('background-color', child.css('background-color'))
      .css('border-width', `${borderWidth} ${borderWidth} 0 ${borderWidth}`)
      .css('border-color', `${child.css('border-top-color')}`);
    $('.tippy-box .tippy-content h1 i').css('color', child.css('color'));
    $('.tippy-box .tippy-content h1 .icon-trash-empty').css('color', '#f57a62');

    const editorBtns = {
      editTitle() {
        accessedTod.path.editTitle();
        editOPts.hide();
        editOPts.destroy();
        refresh();
      },

      addChild() {
        //Adding newtask to memory
        accessedTod.path.addChild();

        //Flipping all parents state's
        accessedTod.checkout.forEach((n) => {
          n.flip();
        });

        editOPts.destroy();
        refresh();
      },

      delete() {
        const youSure = confirm('Are you sure?');
        if (youSure) {
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

      delAllDone() {
        let allDones = accessedTod.path.children.filter((n) => n.state);

        //if there are any done tasks
        if (allDones.length > 0) {
          //firing confirmation prompt
          const confirmation = confirm(
            'Are You Sure? All done tasks and carets will be deleted'
          );

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

      delAll() {
        //Confirmation prompt fired
        const confirmation = confirm(
          'Are You Sure? Everything will be deleted...'
        );

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
      },
    };

    $('.tippy-box .icon-pencil').click(() => {
      editorBtns.editTitle();
    });
    $('.tippy-box .icon-minus-squared').click(() => {
      editorBtns.delAll();
    });
    $('.tippy-box .icon-plus').click(() => {
      editorBtns.addChild();
    });
    $('.tippy-box .icon-trash-empty').click(() => {
      editorBtns.delete();
    });
    $('.tippy-box .icon-minus-squared-alt').click(() => {
      editorBtns.delAllDone();
    });

    gsap.to(childDOM, {
      marginTop: `${childMarginTop + tippyHeight}px`,

      duration: 0.25,
      onComplete: () => {
        // editOPts.show();
        // editOPts.hide();
      },
    });
  }
};
