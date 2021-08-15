const InstSortable = () => {
  const allFather = document.querySelector('.allFather');

  //* Sortabilisng all nested elements
  let allNested = document.querySelectorAll('.nested');
  for (let i = 0; i < allNested.length; i++) {
    new Sortable(allNested[i], {
      group: 'nested',
      animation: 150,
      fallbackOnBody: true,
      swapThreshold: 0.65,
    });
  }

  //* Initiating sortable
  let sorty = new Sortable(allFather, {
    group: 'nested',
    handle: '.optBtns',

    onEnd: (evt) => {
      console.log(evt);
    },

    onSort: (evt) => {
      console.log('changed');
    },
  });
};
