const refresh = () => {
  sessionStorage.setItem('ThersOpenTippy', false);
  memConversions.save_memory_changes();

  sortInsts.forEach((n) => {
    n.destroy();
  });
  sortInsts = [];
  sessionStorage.setItem('inSortMode', false);

  //emptying the allfather
  $('.allFather').empty();

  //!UPDATING MAINBTNS EVENTS (for root array edits)
  //!These were exactly copied from events.js
  //!Couldn' make functions because those functions would work with the previous memory and not the current one
  const mainBtns = [
    $('<i id="del-checked" class="icon-minus-squared-alt"></i>'),
    $('<i id="add" class="icon-plus"></i>'),
    $('<i id="edit-flow-of-root-arr" class="icon-flow-cascade"></i>'),
    $('<i id="del-all" class="icon-minus-squared"></i>'),
  ];

  //updating minus all checked event
  mainBtns[0].click(() => {
    //Getting all the done tasks
    const allDone = mem.filter((n) => n.state);
    console.log(allDone);
    if (allDone.length >= 1) {
      const yes = confirm('All done tasks/packages will be deleted');

      //If the user is sure
      if (yes) {
        mem = mem.filter((n) => n.state == false);
        refresh();
      }
      //If the users cancels
      else {
        alert('Action Cancelled');
      }
    }
    //If there are no done tasks
    else {
      alert('There are no done tasks in the root');
    }
  });

  //updating the add event
  mainBtns[1].click(() => {
    const newTask = prompt('The title of the new task').trim();
    if (newTask != '' && newTask != null) {
      console.log('We are in the clear');
      let clear = true;
      mem.forEach((n) => {
        if (n.title == newTask) {
          clear = false;
        }
      });

      if (clear) {
        mem.push(new todS(newTask));
        refresh();
      } else {
        alert("There's already a task with that title");
      }
    } else if (newTask == '') {
      alert('You need a title');
    }
  });

  //updating the edit flow event
  mainBtns[2].click(openFlowBox(mem, true));

  //updating the delete all event
  mainBtns[3].click(() => {
    const yes = confirm('Are you sure, everything will be deleted');
    if (yes) {
      mem = [];
      refresh();
    } else {
      alert('Action canceled');
    }
  });

  $('.mainBtns').empty();

  //Appending each button
  mainBtns.forEach((n) => {
    $('.mainBtns').append(n);
  });

  displayAll();

  console.log('refreshed');
};
