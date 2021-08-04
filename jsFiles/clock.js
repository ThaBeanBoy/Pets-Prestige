//Adapting the size of the allfather properly
const adjustAllfatherHeight = ()=>{
  $('.allFather').css(
    'height',
    `calc(100vh - ${parseFloat($('.top').css('height'))}px)`
  );
}
adjustAllfatherHeight();



const clockFunctions = {
  zeroEffect: (x) => {
    if (x < 10) {
      return `0${x}`;
    } else {
      return `${x}`;
    }
  },

  //Returns the month
  getMonth: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],

  //Returns the day
  getDay: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
};

//update clock
const newClock = () => {
  const now = new Date();

  //displaying the time
  $('#hrs').text(clockFunctions.zeroEffect(now.getHours()));
  $('#mins').text(clockFunctions.zeroEffect(now.getMinutes()));
  $('#secs').text(clockFunctions.zeroEffect(now.getSeconds()));

  //Displaying date day and month
  $('#days').text(clockFunctions.getDay[now.getDay()]);
  $('#dates').text(now.getDate());
  $('#months').text(clockFunctions.getMonth[now.getMonth()]);
};
//newClock();

setInterval(newClock, 1000);
  