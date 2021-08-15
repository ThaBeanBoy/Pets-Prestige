const liClick = () => {
  //Checking if the clicked is a task or an options button
  const targetClass = $(event.target);
  isEventTargetTask = {
    li:
      targetClass.hasClass('not-done') ||
      targetClass.hasClass('done') ||
      targetClass.hasClass('show-off-task'),
    text: targetClass.hasClass('task-txt'),
  };

  if (
    !$(event.target).hasClass('caret') &&
    (isEventTargetTask.li || isEventTargetTask.text)
  ) {
    //Getting the proper element
    let clicked = isEventTargetTask.text
      ? event.target.parentNode
      : event.target;

    //Getting the path from the mem
    const path = findAdress(clicked, mem);
    path.checkout.forEach((n) => {
      //Fliping all Parents
      n.flip();
    });
  }

  //Refreshing the allFather
  refresh();
};
