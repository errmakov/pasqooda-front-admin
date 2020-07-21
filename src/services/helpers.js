export function convertDate(date, isTime) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
  
    day = day.toString().padStart(2,'0');
    month = month.toString().padStart(2,'0');
    hours = hours.toString().padStart(2,'0');
    mins = mins.toString().padStart(2,'0');
    secs = secs.toString().padStart(2,'0');
  
    //let result = day + '.' + month + '.' + year;
    let result = year  + '-' + month + '-' + day;
  
    if (isTime) {
      //result += ' ' + hours + ':' + mins + ':' + secs;
      result += '-' + hours + '-' + mins + '-' + secs;
    }
  
    return result;
  }

  export function clearMoney(val) {
    let match = val.match(/(.*)\sруб\s(.*)\sкоп/);
    let sum = match[1] + '.' + match[2];
    sum = sum.replace(" ","");
    let sumFloat = parseFloat(sum);
    sumFloat = sumFloat.toFixed(2);
    return sumFloat;
  }

  export let money  = {
    decimal: ' руб ',
    thousands: ' ',
    prefix: '',
    suffix: ' коп',
    precision: 2,
    masked: false
  }

  export let doclist = ['Договор займа', 'Кредитный договор', 'Договор купли-продажи', 'Договор найма (аренды)', 'Расписка']