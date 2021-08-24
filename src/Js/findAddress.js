import findTitle from './findTitle';
import { mem } from './memoryConversions';

export default function findAdress(ev) {
  //Estabrishing address in object form
  let parentsObj = $(ev).parents('.nested').prev('.caret').not('.nested');
  delete parentsObj.prevObject;
  delete parentsObj.length;
  // console.log(parentsObj);

  //Estabrishing da adress in Array
  let arr = Object.values(parentsObj).reverse();
  arr.push(ev);
  // console.log(arr);
  let adress = [];
  arr.forEach((n) => {
    // console.log($(n));
    adress.push(`${$(n).children()[0].textContent}`);
  });

  //Getting to the Estabrished adress in the memory
  let checkoutCodon = [];
  let path = mem[findTitle(adress[0], mem)];
  checkoutCodon.push(path);
  for (let i = 1; i < adress.length; i++) {
    if (path.isCaret()) {
      const arr = path.children;
      const titl = adress[i];
      const indx = findTitle(titl, arr);
      const newPath = arr[indx];
      path = newPath;
      checkoutCodon.push(path);
    }
  }

  //li caret checkout
  let checkout = checkoutCodon.reverse();

  return { path: path, checkout: checkout };
}
