const editorInitialisation = (task) => {
    const options = $('.options');
  
    //All option buttons classess
    optBtns = [
      'icon-plus',
      'icon-minus-squared',
      'icon-pencil',
      'icon-flow-cascade',
      'icon-minus-squared-alt',
      'icon-cancel',
    ];
  
    //Attaching all the buttons to the sidebar
    optBtns.forEach((n) => {
      const i = $(`<i class="${n}"></i>`);
      options.append(i);
    });
  
    //Giving the appropriate class name
    options.addClass(task.path.isCaret() ? 'caretBar' : 'taskBar');
  
    //Puting the task's title in the head
    $('.editor-head').text(task.path.title);
  };
  