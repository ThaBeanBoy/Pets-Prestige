const caretClick = () => {
  //Checking if the clicked element is the div or task-text
  //If its the task-txt, parent node will be returned. If div, the div will be returned
  const clicked = $(event.target).hasClass('task-txt')
    ? event.target.parentNode
    : event.target;

  //Making sure the clicked isn't the options button
  // console.log($(clicked))
  if (!$(clicked).hasClass('optBtns') && !$(clicked).hasClass('.tippy-content')) {
    console.log('opening caret')
    //Finding address of selected element in memory
    findAdress(clicked).path.flipShowing();
    // console.log(clicked);

    //Refreshing the allFather
    refresh();
  }
};
  