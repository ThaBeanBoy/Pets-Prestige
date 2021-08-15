const allFather = document.querySelector('.allFather');

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

    onEnd() {
      //Sortable logic
      //refresh()
    },
  });
}
