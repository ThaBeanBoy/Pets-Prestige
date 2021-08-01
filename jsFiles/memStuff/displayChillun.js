const closeFlowBox = () => {
    //Removing save-changes button
    $('.save-changes').remove();
  
    //Closing edit flow box
    $('.edit-flow-box').css('width', '0');
  
    //Emptying flow body
    $('.edit-flow-body').empty();
  };
  
  function displayOptions(task) {
    // Finding the adress
    task = task.parentNode;
    $(task).attr('data-state', 'showing');
    task = findAdress(task, mem);
    
  
    //Initialising the editor
    editorInitialisation(task);
  
    //Setting up the required events
    editorEvents(task);
  
    // Open up shop and shut'em down
    $('.editor').css('width', '100%');
  }
  
  //Used to create .nested elements
  const displayChillun = (ul, kinders) => {
    //Setting up new ul element
    let newUl = $(`<ul class="nested"></ul>`);
  
    kinders.forEach((n) => {
      //Setting up the done class
      const done = n.state ? 'done' : 'not-done';
  
      //If n is a caret
      if (n.isCaret()) {
        //Setting up the data-state
        const show = n.showing ? 'showing' : 'not-showing';
  
        //Craeting the div
        const div = $(
          `<div class="caret ${done}" data-state="${show}"><span class="task-txt">${n.title}</span><span class="icon-ellipsis-vert optBtns"></span></div>`
        );
  
        //Appending the div to the newUl
        newUl.append(div);
  
        //Recursive function
        displayChillun(newUl, n.children);
      }
      //If n is just a task
      else {
        //Craeting the li
        const li = $(
          `<li class="${done}"><span class="task-txt">${n.title}</span><span class="icon-ellipsis-vert optBtns"></span></li>`
        );
  
        //Appending the new li to the newUl
        newUl.append(li);
      }
    });
    $(ul).append(newUl);
  };
  