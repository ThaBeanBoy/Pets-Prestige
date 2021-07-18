const caretClick = () => {
    //Checking if the clicked element is the div or task-text
    //If its the task-txt, parent node will be returned. If div, the div will be returned
    const clicked = $(event.target).hasClass('task-txt')
      ? event.target.parentNode
      : event.target;
  
    //Making sure the clicked isn't the options button
    if (!$(clicked).hasClass('optBtns')) {
      //Finding address of selected element in memory
      findAdress(clicked).path.flipShowing();
  
      //Refreshing the allFather
      refresh();
    }
  };
  
  const vertOptions = () => {
    //Display editor...
    displayOptions(event.target);
  };
  