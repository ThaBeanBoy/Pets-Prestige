import { createPopper } from '@popperjs/core';
import tippy from 'tippy.js';
import findAdress from './findAddress';
import refresh from './refresh';
import { sortInsts } from './sortableStuff';

const openTippy = () => {
  if (!JSON.parse(sessionStorage.getItem('ThersOpenTippy'))) {
    sortInsts.forEach((n) => {
      n.destroy();
    });
    sortInsts = [];

    const Li = event.target.parentElement.parentElement;
    const isACaretShowOff = $(Li).hasClass('caret-show-off');
    console.log(Li, isACaretShowOff);
    const child = $(Li);

    // * Setting transition speed for GSAP animation and setting default attributes for tippy
    const transitionTime = 0.25;
    const padding = parseFloat(child.css('padding-top'));

    const offsetY =
      padding +
      (isACaretShowOff ? parseFloat($(Li.firstChild).css('padding-top')) : 0);
    console.log(offsetY, parseFloat($(Li.firstChild).css('padding-top')));

    const editOPts = tippy(event.target, {
      zIndex: '999',
      theme: 'todTheme',
      arrow: false,
      allowHTML: true,
      placement: 'top',
      sticky: true,

      trigger: 'click',
      interactive: true,
      appendTo: document.querySelector('body'),
      offset: [0, offsetY],

      onShow(inst) {
        sessionStorage.setItem('ThersOpenTippy', true);
      },
    });

    //* Finding the clicked element's address
    const accessedTod = findAdress(Li);

    //* Increase the height of the nested

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

      placement: 'top-end',

      animateFill: true,

      hideOnClick: false,

      onClickOutside(inst, ev) {
        // console.log("out side click");
        editOPts.hide();

        gsap.to(Li, {
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

    //* Setting the css
    let borderWidth = parseFloat(child.css('border-top-width'));
    $('.tippy-box')
      .css('background-color', child.css('background-color'))
      .css(
        'border-width',
        `${borderWidth}px ${borderWidth}px 0px ${borderWidth}px`
      )
      .css('border-color', `${child.css('border-top-color')}`);
    $('.tippy-box .tippy-content h1 i').css('color', child.css('color'));
    $('.tippy-box .tippy-content h1 .icon-trash-empty').css('color', '#f57a62');

    //* Setting up the events for the editing of tasks
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

    gsap.to(Li, {
      marginTop: `${childMarginTop + tippyHeight}px`,

      duration: 0.25,
    });
  }
};

export default openTippy;
