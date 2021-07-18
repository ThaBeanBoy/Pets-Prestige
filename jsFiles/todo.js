//Finds title in a given array, will return the index number, if not found, -1 will be returned
const findTitle = (title, arr = allTods) => {
  let indX = 0;

  //Used to tell the function if the index is found or not
  let found = false;
  for (const el of arr) {
    if (el.title == title) {
      found = true;
      break;
    } else {
      indX++;
    }
  }

  //returns index number if found and -1 if not found
  indx = found ? indX : -1;
  return indx;
};
  