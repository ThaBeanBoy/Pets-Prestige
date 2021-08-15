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

    // ghostClass: 'ghostClass', // Class name for the drop placeholder
    chosenClass: 'ghostClass', // Class name for the chosen item
    dragClass: 'draggedClass',

    onChoose(evt) {
      $(evt.item).css('background-color', 'orange');
      // console.log(findAdress(evt.item));
      selectedObj = findAdress(evt.item);
    },

    onMove(evt) {
      // console.log(evt.to);
      // console.log(evt.dragged);
      if (
        $(evt.to).hasClass('allFather') &&
        $(evt.dragged).hasClass('li-caret')
      ) {
        console.log(evt.dragged);
        $(evt.dragged).attr('style', '').addClass('caret-show-off');
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

      refresh();
    },

    onUnchoose(evt) {
      refresh();
      // console.log('yup');
    },
  });
}
