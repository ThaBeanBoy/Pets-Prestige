const openFlowBox = (arr, isRoot, task) => {
    return function () {
      $('.edit-flow-background').css('width', '100%');
  
      //Adding the 'save changes' button
      $('.edit-flow-head').prepend(
        $('<div class="save-changes">Save Changes</div>')
      );
  
      //! mem is reversed because the root array is in reverse.(Dumb mistake i made, even if root is fixed, UI just gets all messed up)
      if (isRoot) {
        mem = mem.reverse();
      }
      //Appending to the flow body
      arr.forEach((n) => {
        //Making the li
        const li = $(`<li class="edit-flow-sub-task draggable">${n.title}</li>`);
  
        //Appending the li to ul
        $('.edit-flow-body').append(li);
      });
      if (isRoot) {
        mem = mem.reverse();
      }
  
      //Setting up the drag and drop function
      const flowBox = $('.edit-flow-body');
      flowBox.sortable({
        delay: 750,
        animation: 200,
        chosenClass: 'ghostClass',
        dragClass: 'draggedClass',
      });
  
      //Setting up the save changes ting
      $('.save-changes').click(() => {
        //Getting the changes the user made
        let changes = $('.edit-flow-body').children();
        delete changes.length;
        delete changes.prevObject;
        console.log(changes);
  
        //Making the obtained changes into a useable array
        changes = Object.values(changes);
        changes = changes.map((n) => {
          return $(n).text();
        });
  
        //Getting the original memory
        const og = isRoot ? mem.reverse() : task.path.children;
        let theOriginals = JSON.stringify(
          og.map((n) => {
            return n.title;
          })
        );
  
        //Comparing the original to the changes, to detect changes...
        if (theOriginals != JSON.stringify(changes)) {
          //Askin if the user actually wants to perfom the action
          const confirmation = confirm('All Changes Will Be Permanent');
  
          if (confirmation) {
            //Making new children set
            let newChildrenSet = [];
  
            //Constructing the new set into useable mem
            changes.forEach((n) => {
              const indX = findTitle(n, isRoot ? mem : task.path.children);
              newChildrenSet.push(isRoot ? mem[indX] : task.path.children[indX]);
            });
  
            //Saving the changes
            if (isRoot) {
              //user is editing flow of root
              mem = mem.reverse();
              mem = newChildrenSet;
              mem = mem.reverse();
            } else {
              //user is editing flow within inner carets
              task.path.children = newChildrenSet;
  
              //Only applies when dealing with editor side bars
              if (!task.path.isCaret()) {
                $('.options').removeClass('caretBar').addClass('taskBar');
              }
            }
  
            closeFlowBox();
            $('.edit-flow-background').css('width', '0%');
            refresh();
          }
        } else {
          alert('There Were No Changes...');
        }
      });
  
      //Opening the flow box
      $('.edit-flow-box').css('width', '93vw');
    };
  };
  