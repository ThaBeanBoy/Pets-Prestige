//Class(framework) of a task.caret
import { todS } from './class.js';
import refresh from './refresh.js';

//Setting up the local storage for memory
if (localStorage.getItem('allTods') === null) {
  localStorage.setItem('allTods', JSON.stringify([]));
}
//Setting up storage for scrollPos
if (localStorage.getItem('scrollPos') === null) {
  localStorage.setItem('scrollPos', '0');
}

//Setting if there is a editOpts (tippy) open
sessionStorage.setItem('ThersOpenTippy', false);

//Setting if the user is using sortable
sessionStorage.setItem('inSortMode', false);

const memConversions = {
  //Converts saveable memory to useable memory
  internal_to_useable_memory: function (arr) {
    let useArr = [];
    arr.forEach((n) => {
      useArr.push(
        new todS(n[0], this.internal_to_useable_memory(n[1]), n[2], n[3])
      );
    });

    return useArr;
  },

  //Converts useable memory to saveable memory
  useable_to_internal_memory: function (arr) {
    let intArr = [];

    // console.log(arr);
    arr.forEach((n) => {
      const arrayVersion = [
        n.title,
        n.isCaret() ? this.useable_to_internal_memory(n.children) : [],
        n.state,
        n.showing,
      ];
      intArr.push(arrayVersion);
    });
    return intArr;
  },

  //Saves the new memory
  save_memory_changes: function () {
    //Removing allTods from local storage
    localStorage.removeItem('allTods');

    //Set the updated memory
    const new_allTods = JSON.stringify(this.useable_to_internal_memory(mem));
    localStorage.setItem('allTods', new_allTods);
  },
};
let internalMem = JSON.parse(localStorage.getItem('allTods'));
let mem = memConversions.internal_to_useable_memory(internalMem);

const rootEdits = {
  addChild() {
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
  },

  addTaskObj(taskObj, indx) {
    mem.splice(indx, 0, taskObj);
  },

  delChild(title) {
    mem = mem.filter((n) => n.title != title);
  },

  delChecked() {
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
  },

  delAll() {
    const yes = confirm('Are you sure, everything will be deleted');
    if (yes) {
      mem = [];
      refresh();
    } else {
      alert('Action canceled');
    }
  },
};

export { memConversions, mem, rootEdits };
