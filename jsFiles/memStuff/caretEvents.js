const caretClick = () => {
  //Checking if the clicked element is the div or task-text
  //If its the task-txt, parent node will be returned. If div, the div will be returned

  let clicked = $(event.target).hasClass('task-txt')
    ? event.target.parentNode
    : event.target;

  // clicked = $(clicked).children('span')[0];
  if (
    !$(clicked).hasClass('optBtns') &&
    !$(clicked).hasClass('.tippy-content')
  ) {
    //Finding address of selected element in memory
    findAdress(clicked).path.flipShowing();

    //Refreshing the allFather
    refresh();
  }
};
