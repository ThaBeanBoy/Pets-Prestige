//Setting up the local storage for memory
if (localStorage.getItem('allTods') == null) {
    localStorage.setItem('allTods', JSON.stringify([]));
  }
//Setting up storage for scrollPos
if (localStorage.getItem('scrollPos') == null) {
  localStorage.setItem('scrollPos', '0');
}

//Setting if there is a editOpts (tippy) open
if(sessionStorage.getItem('scrollPos') == null){
  sessionStorage.setItem('ThersOpenTippy', false);
}
  
let internalMem = JSON.parse(localStorage.getItem('allTods'));

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

let mem = memConversions.internal_to_useable_memory(internalMem);
