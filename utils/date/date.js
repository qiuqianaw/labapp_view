export function getDay(num, str) {
  var today = new Date();
  var nowTime = today.getTime();
  var ms = 24 * 3600 * 1000 * num;
  today.setTime(parseInt(nowTime + ms));
  var oYear = today.getFullYear();
  var oMoth = (today.getMonth() + 1).toString();
  if (oMoth.length <= 1) oMoth = "0" + oMoth;
  var oDay = today.getDate().toString();
  if (oDay.length <= 1) oDay = "0" + oDay;
  return oYear + str + oMoth + str + oDay;
}
// 格式化日期
export function formatDate(date) {
  date = new Date(date);
  let myyear = date.getFullYear();
  let mymonth = date.getMonth() + 1;
  let myweekday = date.getDate();
  mymonth < 10 ? (mymonth = "0" + mymonth) : mymonth;
  myweekday < 10 ? (myweekday = "0" + myweekday) : myweekday;
  return `${myyear} ${mymonth} ${myweekday}`;
}

// 获取当前月的天数
export function mGetDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var d = new Date(year, month, 0);
  return d.getDate();
}
// 获取本周的日期
export function getWeekDay() {
  let dateString = formatDate(new Date()); //当天的日期，例如2020-2-28
  let presentDate = new Date(dateString);
  let today = presentDate.getDay() !== 0 ? presentDate.getDay() : 7;

  return Array.from(new Array(7), function (val, index) {
    return formatDate(
      new Date(
        presentDate.getTime() - (today - index - 1) * 24 * 60 * 60 * 1000
      )
    );
  });
}
// 获取当前月的所有日期
export function getNowM(e) {
  let now = new Date();
  let current_month_num = mGetDate();
  let current_month = [];
  for (let i = 1; i <= current_month_num; i++) {
    let day = now.setDate(i);
    let everyDay = formatDate(day);
    current_month.push(everyDay);
  }
  return current_month;
}

// 获取上周的日期
export function getLastWeekDay() {
  let day = new Date();
  let dateString = formatDate(
    day.setTime(day.getTime() - 24 * 7 * 60 * 60 * 1000)
  );
  let presentDate = new Date(dateString);
  let today = presentDate.getDay() !== 0 ? presentDate.getDay() : 7;

  return Array.from(new Array(7), function (val, index) {
    return formatDate(
      new Date(
        presentDate.getTime() - (today - index - 1) * 24 * 60 * 60 * 1000
      )
    );
  });
}

// 获取下周的日期
export function getNextWeekDay() {
  let day = new Date();
  let dateString = formatDate(
    day.setTime(day.getTime() + 24 * 7 * 60 * 60 * 1000)
  );
  let presentDate = new Date(dateString);
  let today = presentDate.getDay() !== 0 ? presentDate.getDay() : 7;

  return Array.from(new Array(7), function (val, index) {
    return formatDate(
      new Date(
        presentDate.getTime() - (today - index - 1) * 24 * 60 * 60 * 1000
      )
    );
  });
}

export function formatDateNoSpace(date) {
  // console.log(date)
  date = new Date(date);
  let myyear = date.getFullYear();
  let mymonth = date.getMonth() + 1;
  let myweekday = date.getDate();
  mymonth < 10 ? (mymonth = "0" + mymonth) : mymonth;
  myweekday < 10 ? (myweekday = "0" + myweekday) : myweekday;
  return `${myyear}${mymonth}${myweekday}`;
}

// 根据基准日起，获取当前周的日期
export function getBaseWeekDay(day) {
  let dateString = formatDateNoSpace(day); //当天的日期，例如2020-2-28
  let presentDate = new Date(dateString);
  let today = presentDate.getDay() !== 0 ? presentDate.getDay() : 7;

  return Array.from(new Array(7), function (val, index) {
    return formatDateNoSpace(
      new Date(
        presentDate.getTime() - (today - index - 1) * 24 * 60 * 60 * 1000
      )
    );
  });
}
