//A tod setup
class todS {
  constructor(title, children = [], state = false, showing = false) {
    this.title = title;
    this.children = children;
    this.state = state;
    this.showing = showing; //this value doesn't matter for tasks, only for carets
  }

  //Method for editing the title
  editTitle() {
    const newTitle = prompt('New title', this.title);

    //checking if the input string is proper
    //! Check for other elements that are named the same thing
    if (newTitle != '' && newTitle != null) {
      this.title = newTitle;
      return this;
    } else if (newTitle == '') {
      alert('You need to input a text bruh');
      return this;
    }
  }

  // Method for adding to the objects children
  addChild() {
    //getting the new task's title
    const newTask = prompt('A new task??').trim();

    //Checking if the input string is proper
    if (newTask != '' && newTask != null) {
      //Meant to check if there's a child with the exact same title
      let clear = true;
      this.children.forEach((n) => {
        if (n.title == newTask) {
          alert(
            `There's a ${
              n.isCaret() ? 'caret' : 'task'
            } called '${newTask}' already...`
          );
          clear = false;
        }
      });

      //If there's no other child with the same title, new task will be added
      if (clear) {
        this.children.unshift(new todS(newTask));
      }

      return this;
    }
    //Pointing out the erro of the user's ways
    else if (newTask == '') {
      alert('You need to input a text bruh');
    }

    return this;
  }

  // Check if the this is a caret or a task
  isCaret() {
    if (this.children.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  // Method for deleting the specified task
  deleteChild(task) {
    this.children = this.children.filter((n) => n.title != task);
    return this;
  }

  // Flip the state from true to false or false to true
  flip() {
    //Carets only
    if (this.isCaret()) {
      //Checks if all children are done (their state is true)
      for (const i of this.children) {
        if (!i.state) {
          // Means theres a false within the children
          this.state = false;
          return this;
        }
      }

      //Only when all children are done, the state will be lipped to true
      this.state = true;
      return this;
    }
    //Tasks only
    else {
      this.state = this.state ? false : true;
      return this;
    }
  }

  //Method to flip the showing property
  flipShowing() {
    //If showing is true
    if (this.showing) {
      this.showing = false;

      //Collapese all children so that showing will be false
      //! Just incase some fool uses this on a task
      if (this.isCaret()) {
        const turn_of_all_children = (arr) => {
          arr.forEach((n) => {
            n.showing = false;
            turn_of_all_children(n.children);
          });
        };

        turn_of_all_children(this.children);
      }
    }
    //If showing is false
    else {
      this.showing = true;
    }

    return this;
  }

  // Deletes all the done tasks/carets
  delAllDone() {
    //Filters out the done tasks
    this.children = this.children.filter((n) => !n.state);
    return this;
  }

  //Method to delete all done children (state = true)
  delAll() {
    this.children = [];
    return this;
  }
}
