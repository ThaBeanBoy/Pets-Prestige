const allFather = document.querySelector('.allFather');
let selectedObj;
//* Sortabilisng all nested elements
let allSortableNested = [
  document.querySelector('.allFather'),
  ...document.querySelectorAll('.nested'),
];
console.log(allSortableNested);
for (let i = 0; i < allSortableNested.length; i++) {
  new Sortable(allSortableNested[i], {
    group: 'nested',
    animation: 150,
    delay: 750,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    handle: '.optBtns',

    // ghostClass: 'ghostClass', // Class name for the drop placeholder
    // chosenClass: 'ghostClass', // Class name for the chosen item
    dragClass: 'draggedClass',

    onChoose(evt) {
      // console.log($(evt.item).children());

      $(evt.item).hasClass('li-caret')
        ? [...evt.item.children].forEach((n) =>
            $(n).css('background-color', 'orange')
          )
        : $(evt.item).css('background-color', 'orange');

      console.log(evt.item.firstChild);
      // $(evt.item).hasClass('li-caret')
      //   ?
      //   : {};
      $(evt.item.firstChild).attr('data-state', 'not-showing');

      selectedObj = findAdress(evt.item);
    },

    onMove(evt) {
      /*
       * Helps with the transition of element from 1 nested to another,
       * Since the styling changes so much and the styling is heavily reliant on classes
       */

      const tooRoot = $(evt.to).hasClass('allFather');

      if (!tooRoot && selectedObj.path.isCaret()) {
        //caret: root -> sub task position
        $(evt.dragged)
          .removeClass('show-off')
          .removeClass('caret-show-off')
          .addClass('li-caret')
          .css('background-color', '#adb6c4');

        console.log(evt.dragged.children);
        [...evt.dragged.children].forEach((n) =>
          $(n).css('background-color', 'orange')
        );
      } else if (tooRoot && selectedObj.path.isCaret()) {
        //caret: sub task position -> root
        $(evt.dragged)
          .addClass('show-off')
          .addClass('caret-show-off')
          .removeClass('li-caret')
          .attr('style', '')
          .css('background-color', 'orange');
      } else if (!tooRoot && !selectedObj.path.isCaret()) {
        //task : root -> sub task position
        $(evt.dragged).removeClass('show-off').removeClass('show-off-task');
        $(evt.dragged.firstChild).css('margin-bottom', '0');
      } else {
        //task : sub task position -> root
        /* 
        add classes show-off show-off-task
        */
        $(evt.dragged).addClass('show-off').addClass('show-off-task');
      }
    },

    onEnd(evt) {
      //Sortable logic (add the object to specified location)
      // console.log(evt);
      const NewParent = findAdress(evt.item).checkout[1];

      //Finding the index

      console.log(selectedObj);
      console.log(NewParent);

      if (NewParent === undefined) {
        //*The object is moved to the root array
        //Cut away object
        if (selectedObj.checkout.length === 1) {
          // From root
          mem = mem.filter((n) => n.title != selectedObj.path.title);
        } else {
          // Was a sub task;
          selectedObj.checkout[1].deleteChild(selectedObj.path.title);
        }

        //Place object
        let indxArr = [];
        for (let i = 0; i < mem.length + 1; i++) {
          indxArr.unshift(i);
        }
        const correctIndx = indxArr.indexOf(evt.newIndex);
        console.log(correctIndx);
        mem.splice(correctIndx, 0, selectedObj.path);
        // mem.splice(mem.length + 1 - evt.newIndex, 0, selectedObj.path);
        console.log('moved to root array');
      } else {
        //*The object is moved to a sub task postion
        //*Cut away object
        if (selectedObj.checkout.length === 1) {
          // From root
          mem = mem.filter((n) => n.title != selectedObj.path.title);
        } else {
          // Was a sub task;
          selectedObj.checkout[1].deleteChild(selectedObj.path.title);
        }

        //*Adding the object
        NewParent.addObj(selectedObj.path, evt.newIndex);
      }

      //update the old parents
      selectedObj.checkout.forEach((n, indx) => {
        indx > 0 ? n.flip() : {};
      });

      //update the new parents
      findAdress(evt.item).checkout.forEach((n, indx) => {
        indx > 0 ? n.flip() : {};
      });
      // refresh();
    },

    onUnchoose(evt) {
      // refresh();
      // console.log('yup');
    },
  });
}
