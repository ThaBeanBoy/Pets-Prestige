let sortInsts = [];
const InitiateSortable = () => {
  let selectedCheckout, selectedObj, oldParent;

  //* Sortabilisng all nested elements
  let allSortableNested = [
    document.querySelector('.allFather'),
    ...document.querySelectorAll('.nested'),
  ];

  let sortArrays = {
    old: '',
    new: '',
  };

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
        selectedCheckout = findAdress(evt.item).checkout;
        selectedObj = findAdress(evt.item).path;
        oldParent = selectedCheckout[1];

        $(evt.item).attr('data-state', 'not-showing');
        $(evt.item).css('background-color', 'orange');
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
        if (!tooRoot && selectedObj.isCaret()) {
          //caret: root -> sub task position
          $(evt.dragged)
            .removeClass('show-off')
            .removeClass('caret-show-off')
            .addClass('li-caret')
            .css('background-color', '#adb6c4');
          [...evt.dragged.children].forEach((n) =>
            $(n).css('background-color', 'orange')
          );
        } else if (tooRoot && selectedObj.isCaret()) {
          //caret: sub task position -> root
          $(evt.dragged)
            .addClass('show-off')
            .addClass('caret-show-off')
            .removeClass('li-caret')
            .attr('style', '')
            .css('background-color', 'orange');
        } else if (!tooRoot && !selectedObj.isCaret()) {
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

        if (NoChanges) {
          refresh();
        }
      },

      onEnd(evt) {
        //Sortable logic (add the object to specified location)
        const NewParent = findAdress(evt.item).checkout[1];
        const sameElementAlert = 'There was an element with the same name';

        let sameParent =
          evt.from.innerHTML.replace('draggable="false"', '') ===
          evt.to.innerHTML.replace('draggable="false"', '');
        if (NewParent === undefined) {
          //* If there's another element with the same name, the process is cancelled
          //take into account, if changed from parent or moved to another
          let add = true;
          if (!sameParent) {
            for (let i = 0; i < mem.length; i++) {
              if (mem[i].title === selectedObj.title) {
                add = false;
                break;
              }
            }
          }

          if (add) {
            //*The object is moved to the root array
            //Cut away object
            if (selectedCheckout.length === 1) {
              // From root
              mem = mem.filter((n) => n.title != selectedObj.title);
            } else {
              // Was a sub task;
              oldParent.deleteChild(selectedObj.title);
            }
            //Place object
            let indxArr = [];
            for (let i = 0; i < mem.length + 1; i++) {
              indxArr.unshift(i);
            }
            const correctIndx = indxArr.indexOf(evt.newIndex);
            mem.splice(correctIndx, 0, selectedObj);
          } else {
            //* There was an element with the same name
            alert(sameElementAlert);
          }
        } else {
          //*The object is moved to a sub task postion
          let add = true;
          if (!sameParent) {
            for (let i = 0; i < NewParent.children.length; i++) {
              const element = NewParent.children[i];
              if (element.title === selectedObj.title) {
                add = false;
                break;
              }
            }
          }

          if (add) {
            //*Cut away object
            if (selectedCheckout.length === 1) {
              // From root
              mem = mem.filter((n) => n.title != selectedObj.title);
            } else {
              // Was a sub task;
              oldParent.deleteChild(selectedObj.title);
            }
            //*Adding the object

            NewParent.children.forEach((n) => {
              // console.log(n);
            });

            NewParent.addObj(selectedObj, evt.newIndex);
          } else {
            alert('There was an element with the same name');
          }
        }
        //update the old parents
        selectedCheckout.forEach((n, indx) => {
          indx > 0 ? n.flip() : {};
        });
        //update the new parents
        findAdress(evt.item).checkout.forEach((n, indx) => {
          indx > 0 ? n.flip() : {};
        });

        refresh();
        // console.log('refresh, end');
      },
    });

    sortInsts[i] = sort;
  }
};
