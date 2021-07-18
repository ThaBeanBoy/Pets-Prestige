const editorEvents = (task) => {
    const options = $('.options');
  
    //Adding event
    $('.options > .icon-plus').click(() => {
      //getting the new task's title
      const input = prompt('A new task??').trim();
  
      //changes side bar from one for task to one for caret
      //changes only happens if the selected task/caret is not a caret, title isn't a null and title is'nt an empty string
      if (!task.path.isCaret() && input != null && input != '') {
        options.removeClass('taskBar').addClass('caretBar');
      }
  
      //Adding newtask to memory
      task.path.addChild(input);
  
      //Flipping all parents state's
      task.checkout.forEach((n) => {
        n.flip();
      });
  
      //refreshing the allFather
      refresh();
    });
  
    //Ediit title event
    $('.options > .icon-pencil').click(() => {
      //Editment
      task.path.editTitle();
  
      //Change editor head to new title
      $('.editor-head').text(task.path.title);
  
      //Refresh the allFather
      refresh();
    });
  
    //Delete all children event
    $('.options > .icon-minus-squared').click(() => {
      //Confirmation prompt fired
      const confirmation = confirm('Are You Sure? Everything will be deleted...');
  
      //If user wants to continue...
      if (confirmation) {
        task.path.delAll();
  
        options.removeClass('caretBar').addClass('taskBar');
  
        refresh();
      }
      //If users cancels the action
      else {
        alert('Action cancelled');
      }
    });
  
    //Edit flow event
    $('.options > .icon-flow-cascade').click(
      openFlowBox(task.path.children, false, task)
    );
  
    //Delete all done children event
    $('.options > .icon-minus-squared-alt').click(() => {
      let allDones = task.path.children.filter((n) => n.state);
  
      //if there are any done tasks
      if (allDones.length > 0) {
        //firing confirmation prompt
        const confirmation = confirm(
          'Are You Sure? All done tasks and carets will be deleted'
        );
  
        //If there users wants to continue...
        if (confirmation) {
          //Delete all done method
          task.path.delAllDone();
  
          //Changes sidebar to taskbar if there are no children
          if (!task.path.isCaret()) {
            options.removeClass('caretBar').addClass('taskBar');
          }
  
          //Refreshing the allFather
          refresh();
        }
        //If the users is REMORSEFUL for such vile actions
        else {
          alert('Action Cancelled');
        }
      }
      //If there aren't any done tasks
      else {
        alert('There are no finished Task and/or Carets');
      }
    });
  
    $('.options > .icon-cancel').click(() => {
      // Deleting from the root array
      if (task.checkout.length == 1) {
        mem = mem.filter((n) => n.title != task.path.title);
      }
      // Proceed with normal function
      else {
        //Getting the parent
        const parent = task.checkout[1];
  
        //Deleting selected task/caret from it's parent
        parent.deleteChild(task.path.title);
  
        //Flipping all parents state's
        task.checkout.forEach((n) => {
          if (n.children != 0) {
            n.flip();
          }
        });
      }
  
      //closing the editor
      $('.editor').css('width', '0');
  
      //Removing the previous class
      options.empty().removeClass('taskBar').removeClass('caretBar');
  
      //Emptying the sidebar
      options.empty();
  
      //refreshing the allFather
      refresh();
    });
  };
  