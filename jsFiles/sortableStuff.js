let sortInsts = [];
const InitiateSortable = () => {
  let selectedObj;
  //* Sortabilisng all nested elements
  let allSortableNested = [
    document.querySelector('.allFather'),
    ...document.querySelectorAll('.nested'),
  ];

  let sortArrays = {
    old: '',
    new: '',
  };
  let anyChanges;

  for (let i = 0; i < allSortableNested.length; i++) {
    let sort = new Sortable(allSortableNested[i], {
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
        selectedObj = findAdress(evt.item);

        $(evt.item).attr('data-state', 'not-showing');
        // console.log(selectedObj.path.isCaret());
        selectedObj.path.isCaret()
          ? [...evt.item.children].forEach((n) =>
              $(n).css('background-color', 'orange')
            )
          : $(evt.item).css('background-color', 'orange');
        $(evt.item.firstChild).attr('data-state', 'not-showing');

        // console.log(selectedObj);
        sortArrays.old = document
          .querySelector('.allFather')
          .innerHTML.replace('draggable="true"', '');
      },

      onMove(evt) {
        /*
         * Helps with the transition of element from 1 nested to another,
         * Since the styling changes so much and the styling is heavily reliant on classes
         */
        const tooRoot = $(evt.to).hasClass('allFather');

        // console.log(movingCaret);
        if (!tooRoot && selectedObj.path.isCaret()) {
          //caret: root -> sub task position
          $(evt.dragged)
            .removeClass('show-off')
            .removeClass('caret-show-off')
            .addClass('li-caret')
            .css('background-color', '#adb6c4');
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
          $(evt.dragged).addClass('show-off').addClass('show-off-task');
        }
      },

      onUnchoose() {
        sortArrays.new = document
          .querySelector('.allFather')
          .innerHTML.replace('draggable="false"', '');
        NoChanges = sortArrays.old === sortArrays.new;
        if (anyChanges) {
          sort.destroy();
          refresh();
          console.log('Changes');
        }

        // console.log(sortArrays.old);
        // console.log(sortArrays.new);
        // console.log(NoChanges);
      },

      onEnd(evt) {
        //Sortable logic (add the object to specified location)
        // console.log(evt);
        const NewParent = findAdress(evt.item).checkout[1];
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

          mem.forEach((n) => {
            console.log(n);
          });
          mem.splice(correctIndx, 0, selectedObj.path);
          // mem.splice(mem.length + 1 - evt.newIndex, 0, selectedObj.path);
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

          NewParent.children.forEach((n) => {
            console.log(n);
          });

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

        refresh();
        console.log('refresh, end');
      },
    });

    sortInsts[i] = sort;
  }
};
