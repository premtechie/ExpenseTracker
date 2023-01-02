import moment from "moment";
import { some } from "../../dummyData";
// import { response } from "../../dummyData";
interface MyObject {
  [key: string]: {
    expenseName: string;
    category: string[];
    amount: number;
    date: number;
    id: string;
  };
}
export const sampleUid = 'MAmbNaMMQSTNDoZAy6qBSl81ggI2';

export const getNumOfYears = (response:any) => {
  const yearData: {}[] = []
  //   response.map((year:any)=> {
  //     if(!yearData.includes(new Date(year.date).getFullYear())) {
  //       yearData.push(new Date(year.date).getFullYear())
  //     }
  //   })
  // })
  const data: MyObject = response;
  const keys = Object.keys(data);

  keys.map((key) => {
    if(!yearData.includes(moment(data[key].date).year())){
      yearData.push(new Date(data[key].date).getFullYear())
    }
  })
  return yearData;
}

export const filterByYear = (selectedYear:number, response: any) => {
  // return response.filter((exp:any)=> selectedYear === new Date(exp.date).getFullYear());
  const data: MyObject = response;
  const keys = Object.keys(data);
  const returnObj:MyObject = {}
  keys.map((key) => {
    if (moment(data[key].date).year() === selectedYear) {
      returnObj[key] = data[key]
    }
  })
  console.log(returnObj);

  return returnObj;
}

export const filterByMonth = (list:MyObject) => {
  const filteredData:any = {};
  console.log("LIST_DATA",list)
  const keys = Object.keys(list);

  keys.map((key:any) => {
    const month = toMonthName(list[key].date);
    console.log("KEY",moment().month(moment(list[key].date).month()).format("MMMM"))
    if(!filteredData[month]){
      filteredData[month] = [];
      console.log("ERROR CHECK",filteredData[month])
    }
    console.log("MONTH_CHECK",filteredData);
    filteredData[month].push(list[key]);
  })
  console.log(filteredData)
  return filteredData;
}

export function toMonthName(monthNumber: number) {
  const date = new Date();
  date.setMonth(monthNumber);
  return moment().month(moment(monthNumber).month()).format("MMMM");
}
export function isEmpty(obj: {}) {
  return Object.keys(obj).length === 0;
}

export const setTimeZone = (date:any) => {
  if(!date) return moment().set({hour:0,minute:0,second:0,millisecond:0}).valueOf();

  return moment(date).set({hour:0,minute:0,second:0,millisecond:0}).valueOf()
}