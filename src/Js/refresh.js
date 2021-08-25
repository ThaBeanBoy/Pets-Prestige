import { clearSortInsts, sortInsts } from './sortableStuff';
import { memConversions } from './memoryConversions';
import displayAll from './memStuff';
import { rootEdits } from './memoryConversions';

const refresh = () => {
  sessionStorage.setItem('ThersOpenTippy', false);
  memConversions.save_memory_changes();

  // sortInsts.forEach((n) => {
  //   n.destroy();
  // });
  // sortInsts = [];
  clearSortInsts();
  sessionStorage.setItem('inSortMode', false);

  //emptying the allfather
  $('.allFather').empty();

  const mainBtns = [
    $('<i id="del-checked" class="icon-minus-squared-alt"></i>'),
    $('<i id="add" class="icon-plus"></i>'),
    $('<i id="del-all" class="icon-minus-squared"></i>'),
  ];

  //updating minus all checked event
  mainBtns[0].click(() => {
    rootEdits.delChecked();
  });

  //updating the add event
  mainBtns[1].click(() => {
    rootEdits.addChild();
  });

  //updating the delete all event
  mainBtns[2].click(() => {
    rootEdits.delAll();
  });

  $('.mainBtns').empty();

  //Appending each button
  mainBtns.forEach((n) => {
    $('.mainBtns').append(n);
  });

  displayAll();

  console.log('refreshed');
};

export default refresh;
