// 判断运行平台
let platform = uni.getSystemInfoSync().platform;

/**
 * 课表、预约组件需要处理数据的方法
 * author： qiuqian
 * @param {*} str
 * @returns
 */

export function iosTime(params) {
  return (
    params.substring(0, 4) +
    "/" +
    params.substring(4, 6) +
    "/" +
    params.substring(6, 8)
  );
}

/**
 * 自定义
 * @param {*} str
 * @returns
 */
export function Trim(str) {
  return str.replace(/\s*/g, "");
}

export function Trim2(str) {
  return str.replace(" ", "-");
}

export function Trim3(str) {
  return str.replace(" ", "");
}

/**
 * 日期格式转换 20210101 -> 01.01
 * @param {*} weekDay
 * @returns
 */
export function myFormatConversion(weekDay) {
  // console.log('weekDay', weekDay)
  // weekDay.forEach((element, index) => {
  //   console.log(element)
  //   weekDay[index] = element.substring(
  //     element.length - 5,
  //     element.length
  //   )
  //   console.log(element)
  //   weekDay[index] = element.replace(' ', '.')
  //   console.log(element)
  // })
  for (let i = 0; i < weekDay.length; i++) {
    weekDay[i] = weekDay[i].substring(weekDay[i].length - 5, weekDay[i].length);
    weekDay[i] = weekDay[i].replace(" ", ".");
    // console.log("weekDay",weekDay[i])
  }
  return weekDay;
}

/**
 * 根据日期初始化一个周的空数据
 * @param {*} days 格式为 yyyymmdd
 * @returns
 */
export function initializeAWeeksData(days) {
  let lessons = ["12", "34", "56", "78", "90", "11"];
  let gridItem = [];
  // 初始化 gridItem
  for (var i = 0; i < 42; i++) {
    var item = {
      labid: String,
      lesson: String,
      usedate: String,
      usestatus: String,
      usestatusname: String,
      taskid: String,
      openidstr: String,
      openid: String,
      userid: String,
      content: String,
      predate: String,
      usernum: String,
      status: String,
      note: String,
      orderdate: String,
      guideteacherid: String,
      guideteacher: String,
      explain: String,
      opentypeid: String,
      opentype: String,
      expend: String,
      remarks: String,
      opendatelist: String,
    };
    item.usedate = days[i % 7];

    if (i <= 6) {
      item.lesson = lessons[0];
    } else if (i >= 7 && i <= 13) {
      item.lesson = lessons[1];
    } else if (i >= 14 && i <= 20) {
      item.lesson = lessons[2];
    } else if (i >= 21 && i <= 27) {
      item.lesson = lessons[3];
    } else if (i >= 28 && i <= 34) {
      item.lesson = lessons[4];
    } else {
      item.lesson = lessons[5];
    }
    gridItem.push(item);
  }
  return gridItem;
}

export function mergeAndProcess(gridItem, labschedulelist) {
  /**
   * 原来 labschedulelist 只返回当前周的数据，现在返回的更多，还在待定中
   */
  // console.log("labschedulelist", labschedulelist)
  let gridItemSuccess = [];
  // // 合并接口数据到初始化
  for (var i = 0; i < gridItem.length; i++) {
    for (var j = 0; j < labschedulelist.length; j++) {
      if (
        gridItem[i].usedate == labschedulelist[j].usedate &&
        gridItem[i].lesson == labschedulelist[j].lesson
      ) {
        gridItem[i] = labschedulelist[j];
      }
    }
  }

  // // 数据处理为 7*6
  for (var i = 0; i < gridItem.length; i += 7) {
    gridItemSuccess.push(gridItem.slice(i, i + 7));
  }
  return gridItemSuccess;
}

// 根据基准日起，获取当前周的日期
export function getBaseWeekDay(day) {
  let dateString = formatDate(day); //当天的日期，例如2020-2-28

  if (platform == "ios") {
    dateString = dateString.toString();
    dateString =
      dateString.substring(0, 4) +
      "/" +
      dateString.substring(5, 7) +
      "/" +
      dateString.substring(8, 10);
  }
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

function timetrans(date) {
  var date = new Date(date); //如果date为13位不需要乘1000
  var Y = date.getFullYear() + " ";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + " ";
  var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "";
  return Y + M + D;
}

export function formatDate(date) {
  // console.log('formatDate被调用了，参数是原始date', date)
  // String
  // console.log('formatDate被调用了，参数是原始date 数据类型', typeof date)

  if (platform == "ios") {
    return timetrans(date);
  } else {
    date = new Date(date);
    let myyear = date.getFullYear();
    let mymonth = date.getMonth() + 1;
    let myweekday = date.getDate();
    mymonth < 10 ? (mymonth = "0" + mymonth) : mymonth;
    myweekday < 10 ? (myweekday = "0" + myweekday) : myweekday;
    // console.log({ myyear, mymonth, myweekday })

    return `${myyear} ${mymonth} ${myweekday}`;
  }
}

/**
 * 以下为预约组件使用
 */

export function initializeAWeeksDataReserve(days) {
  let lessons = ["12", "34", "56", "78", "90", "11"];
  let gridItem = [];
  // 初始化 gridItem
  for (var i = 0; i < 42; i++) {
    var item = {
      labid: String,
      lesson: String,
      usedate: String,
      usestatus: String,
      usestatusname: String,
      taskid: String,
      openidstr: String,
      openid: String,
      userid: String,
      content: String,
      predate: String,
      usernum: String,
      status: String,
      note: String,
      orderdate: String,
      guideteacherid: String,
      guideteacher: String,
      explain: String,
      opentypeid: String,
      opentype: String,
      expend: String,
      remarks: String,
      opendatelist: String,
      flag: Boolean,
    };
    item.usedate = days[i % 7];
    // console.log('item.flag', item.flag)
    item.flag = false;
    // console.log('item.flag', item.flag)

    if (i <= 6) {
      item.lesson = lessons[0];
    } else if (i >= 7 && i <= 13) {
      item.lesson = lessons[1];
    } else if (i >= 14 && i <= 20) {
      item.lesson = lessons[2];
    } else if (i >= 21 && i <= 27) {
      item.lesson = lessons[3];
    } else if (i >= 28 && i <= 34) {
      item.lesson = lessons[4];
    } else {
      item.lesson = lessons[5];
    }
    gridItem.push(item);
  }
  return gridItem;
}

export function mergeAndProcessReserve(gridItem, labschedulelist) {
  /**
   * 原来 labschedulelist 只返回当前周的数据，现在返回本月、上月及下月数据
   */
  // console.log("labschedulelist", labschedulelist)
  let gridItemSuccess = [];
  // // 合并接口数据到初始化
  for (var i = 0; i < gridItem.length; i++) {
    for (var j = 0; j < labschedulelist.length; j++) {
      if (
        gridItem[i].usedate == labschedulelist[j].usedate &&
        gridItem[i].lesson == labschedulelist[j].lesson
      ) {
        gridItem[i] = labschedulelist[j];
      }
    }
  }

  // // 数据处理为 7*6
  for (var i = 0; i < gridItem.length; i += 7) {
    gridItemSuccess.push(gridItem.slice(i, i + 7));
  }
  return gridItemSuccess;
}

// 根据基准日起，获取当前周的日期
export function getBaseWeekDay2(day) {
  let dateString = formatDate(day); //当天的日期，例如2020-2-28

  if (platform == "ios") {
    dateString = dateString.toString();
    dateString =
      dateString.substring(0, 4) +
      "/" +
      dateString.substring(5, 7) +
      "/" +
      dateString.substring(8, 10);
  }

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

/**
 * 对象数组去重
 * @param {*} obj
 * @returns
 */
export function deteleObject(obj) {
  var uniques = [];
  var stringify = {};
  for (var i = 0; i < obj.length; i++) {
    var keys = Object.keys(obj[i]);
    keys.sort(function (a, b) {
      return Number(a) - Number(b);
    });
    var str = "";
    for (var j = 0; j < keys.length; j++) {
      str += JSON.stringify(keys[j]);
      str += JSON.stringify(obj[i][keys[j]]);
    }
    if (!stringify.hasOwnProperty(str)) {
      uniques.push(obj[i]);
      stringify[str] = true;
    }
  }
  uniques = uniques;
  return uniques;
}

/**
 * 根据日期获取周几
 * @param {*} params
 * @returns
 */
export function getWeekByDay(params) {
  // console.log(params)
  params = params.toString();
  if (platform == "ios") {
    var res = iosTime(params);
  } else {
    var res =
      params.substring(0, 4) +
      "-" +
      params.substring(4, 6) +
      "-" +
      params.substring(6, 8);
  }

  // console.log('res', res)
  let weekArray = new Array("日", "一", "二", "三", "四", "五", "六");
  let week = weekArray[new Date(res).getDay()];
  return week;
}

export function baseDayPreNextFourWeekDay(baseDay, param) {
  // 基准日的第一天 格式转化
  let baseDaySt = getBaseWeekDay2(baseDay)[0];
  if (platform == "ios") {
    baseDaySt = iosTime(baseDaySt);
  } else {
    baseDaySt =
      baseDaySt.substring(0, 4) +
      "-" +
      baseDaySt.substring(4, 6) +
      "-" +
      baseDaySt.substring(6, 8);
  }

  // 转化为时间戳
  let baseDayStTimeStamp = new Date(baseDaySt);
  // 基准日周的第一天 减去4个周=28天
  if (param == "max") {
    var resTime = new Date(
      baseDayStTimeStamp.setTime(
        baseDayStTimeStamp.getTime() + 1000 * 60 * 60 * 24 * 7 * 4
      )
    );
  } else if (param == "min") {
    var resTime = new Date(
      baseDayStTimeStamp.setTime(
        baseDayStTimeStamp.getTime() - 1000 * 60 * 60 * 24 * 7 * 4
      )
    );
  }

  // 转化为日期
  let year = resTime.getFullYear() + "";
  let monthTemp = resTime.getMonth() + 1;
  let month = monthTemp < 10 ? "0" + monthTemp : monthTemp + "";
  let date =
    resTime.getDate() < 10 ? "0" + resTime.getDate() : resTime.getDate() + "";
  let res = year + "" + month + "" + date;

  return res;
}

export function calcuWeekDiff(starttime, baseday) {
  // console.log('baseDayJs', baseday)
  if (platform == "ios") {
    baseday =
      baseday.substring(0, 4) +
      "/" +
      baseday.substring(4, 6) +
      "/" +
      baseday.substring(6, 8);
  } else {
    baseday =
      baseday.substring(0, 4) +
      "-" +
      baseday.substring(4, 6) +
      "-" +
      baseday.substring(6, 8);
  }

  baseday = new Date(baseday);
  if (baseday >= new Date("2021-06-21") && baseday <= new Date("2021-07-11")) {
    starttime = new Date("2021-06-21");
  } else if (
    baseday >= new Date("2021-08-30") &&
    baseday <= new Date("2021-09-05")
  ) {
    return 4;
  } else if (
    baseday >= new Date("2021-7-12") &&
    baseday <= new Date("2021-08-29")
  ) {
    return "**";
  } else {
    starttime = new Date(starttime);
  }
  let diff = (baseday - starttime) / 1000 / 60 / 60 / 24 / 7;
  return Math.ceil(diff);
}
