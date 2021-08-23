let closeBottom = true;
$('#bottomPiece').click(() => {
  //Opening acces to main buttons
  $('.mainBtns').css('width', '90%');
  $('.mainBtns').css('height', '10vh');

  //Closes of the main buttons after x milliseconds
  setTimeout(() => {
    if (closeBottom) {
      $('.mainBtns').css('height', '0vh');
      $('.mainBtns').css('width', '30%');
    }
  }, 2000);
});

//Deleting all done tasks and carets from the root
$('#del-checked').click(() => {
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

$('#add').click(() => {
  let newTask = prompt('The title of the new task');
  newTask = newTask.trim();
  console.log(newTask);

  //Checking if th new task is a proper string
  if (newTask != '' && newTask != null) {
    //Checking if there's any task with the same title in the root
    let clear = true;
    mem.forEach((n) => {
      if (n.title == newTask) {
        clear = false;
      }
    });

    //If there are no tasks with the same name
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
let editingRoot = false;

$('#del-all').click(() => {
  const yes = confirm('Are you sure, everything will be deleted');
  if (yes) {
    mem = [];
    refresh();
  } else {
    alert('Action canceled');
  }
});

$('.go-back').click(() => {
  //closing the editor
  $('.editor').css('width', '0');

  //Removing all icons from side bar and taskbar/caretbar classes
  $('.options').empty().removeClass('taskBar').removeClass('caretBar');
  closeFlowBox();
});

//Save the scroll position at the end of each scroll
$('.allFather').scroll(() => {
  localStorage.removeItem('scrollPos');
  localStorage.setItem(
    'scrollPos',
    JSON.stringify($('.allFather').scrollTop())
  );
});
