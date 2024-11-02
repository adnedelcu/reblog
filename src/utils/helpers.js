export const getFriendlyDate = (a) => {
  var months = [
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
  ];
  var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var day = days[a.getDay()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var timeFriendly = getTime(a);
  var time = {
    day: day,
    date: date,
    month: month,
    year: year,
    hour: hour,
    min: min,
    sec: sec,
    time_friendly: timeFriendly,
  };
  return time;
};

export const getTime = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ampm;
  return strTime;
};

export const stringToFriendlyDate = (date_string) => {
  const date = getFriendlyDate(new Date(date_string));
  const friendlyDate = `${date.month} ${date.date}, ${date.year}`;
  return friendlyDate;
};
