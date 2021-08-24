import findAdress from '../findAddress';
import refresh from '../refresh';

const liClick = () => {
  if (!JSON.parse(sessionStorage.getItem('inSortMode'))) {
    //Checking if the clicked is a task or an options button
    const targetClass = $(event.target);
    let isEventTargetTask = {
      li:
        targetClass.hasClass('not-done') ||
        targetClass.hasClass('done') ||
        targetClass.hasClass('show-off-task'),
      text: targetClass.hasClass('task-txt'),
      div: targetClass.hasClass('task'),
    };

    if (
      !$(event.target).hasClass('caret') &&
      (isEventTargetTask.li || isEventTargetTask.text || isEventTargetTask.div)
    ) {
      //Getting the proper element
      let clicked = isEventTargetTask.li
        ? event.target
        : $(event.target).parents('li')[0];
      // console.log(clicked);

      //Getting the path from the mem
      const path = findAdress(clicked);
      path.checkout.forEach((n) => {
        //Fliping all Parents
        n.flip();
      });

      //Refreshing the allFather
      refresh();
    }
  }
};

export default liClick;
