import Sortable from 'sortablejs';
import findAdress from './findAddress';
import refresh from './refresh';
import { mem, rootEdits } from './memoryConversions';

let sortInsts = [];

const InitiateSortable = () => {
  let selectedCheckout, selectedObj, oldParent;

  //* Sortabilisng all nested elements
  let allSortableNested = [
    document.querySelector('.allFather'),
    ...document.querySelectorAll('.nested'),
  ];

  const tasksNotCaret = [...document.querySelectorAll('.nested')].filter(
    (n) => n.children.length === 0
  );
  const openSuroundingTasks = (item) => {
    const heightOfTask = parseFloat(
      $([...$('.task')][1].parentElement).css('height')
    );

    console.log(item);

    tasksNotCaret.forEach((n) => {
      if (
        (item.previousElementSibling !== null &&
          n === item.previousElementSibling.children[1] &&
          item.previousElementSibling.children[1].children.length === 0) ||
        (item.nextElementSibling !== null &&
          n === item.nextElementSibling.children[1] &&
          item.nextElementSibling.children[1].children.length === 0)
      ) {
        $(n).css('display', 'block');
        $(n).css('min-height', `${heightOfTask / 2}px`);
      } else if (n.children.length === 0) {
        $(n).css('display', 'none');
      }
    });
  };

  for (let i = 0; i < allSortableNested.length; i++) {
    let sort = new Sortable(allSortableNested[i], {
      group: 'nested',
      animation: 150,
      delay: 1000,
      fallbackOnBody: true,
      swapThreshold: 0.65,
      handle: '.optBtns',

      // ghostClass: 'ghostClass', // Class name for the drop placeholder
      // chosenClass: 'ghostClass', // Class name for the chosen item
      dragClass: 'draggedClass',

      onChoose(evt) {
        sessionStorage.setItem('ThersOpenTippy', true);
        sessionStorage.setItem('inSortMode', true);

        selectedCheckout = findAdress(evt.item).checkout;
        selectedObj = findAdress(evt.item).path;
        oldParent = selectedCheckout[1];

        console.log(`Here!!!`, evt.item.firstElementChild);
        $(evt.item).attr('data-state', 'not-showing');
        $(evt.item).css('background-color', 'orange');
        $(evt.item.firstElementChild).attr('data-state', 'not-showing');
        $(evt.item.firstElementChild).css('margin-bottom', '0');

        openSuroundingTasks(evt.item);
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

        // openSuroundingTasks(evt.dragged);
      },

      onChange(evt) {
        openSuroundingTasks(evt.item);
      },

      onUnchoose(evt) {
        //Reverting the effects of js css manipulation that happened in the onChoose event

        if (selectedObj.isCaret() && selectedObj.showing) {
          $(evt.item.children[0]).attr('data-state', 'showing');
        }
        $(evt.item).attr('style', '');
        $(tasksNotCaret).css('display', 'none');
      },

      // update() {},

      onEnd(evt) {
        //Sortable logic (add the object to specified location)
        console.log(findAdress(evt.item.parentElement.parentElement).path);
        const NewParent = findAdress(evt.item.parentElement.parentElement);
        const sameElementAlert = 'There was an element with the same name';

        let sameParent =
          evt.from.innerHTML.replace('draggable="false"', '') ===
          evt.to.innerHTML.replace('draggable="false"', '');

        let add = true;
        if (NewParent.path === undefined) {
          //* If there's another element with the same name, the process is cancelled
          //take into account, if changed from parent or moved to another
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
              rootEdits.delChild(selectedObj.title);
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
            rootEdits.addTaskObj(selectedObj, correctIndx);
          } else {
            //* There was an element with the same name
            alert(sameElementAlert);
          }
        } else {
          //*The object is moved to a sub task postion
          if (!sameParent) {
            for (let i = 0; i < NewParent.path.children.length; i++) {
              const element = NewParent.path.children[i];
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
              rootEdits.delChild(selectedObj.title);
            } else {
              // Was a sub task;
              oldParent.deleteChild(selectedObj.title);
            }

            //*Adding the object
            NewParent.path.addObj(selectedObj, evt.newIndex);
          } else {
            alert('There was an element with the same name');
          }
        }

        if (add) {
          //update the old parents
          selectedCheckout.forEach((n, indx) => {
            indx > 0 && n.isCaret() ? n.flip() : {};
          });

          //update the new parents
          console.log(NewParent);
          if (NewParent.path !== undefined) {
            console.log(NewParent);
            NewParent.checkout.forEach((n) => {
              n.flip();
            });
          }
        }

        refresh();
      },
    });

    sortInsts[i] = sort;
  }
};
const clearSortInsts = () => {
  sortInsts.forEach((n) => {
    n.destroy();
  });
  sortInsts = [];
};

export { InitiateSortable, clearSortInsts };