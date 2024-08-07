import { isSameDay, parse, subDays } from 'date-fns';
import { isAfter } from "date-fns";

export function isCurrentDayGreaterThanEndDate(endDate) {
  const currentDate = new Date();
  return isAfter(endDate, currentDate);
}



export function formatToNaira(amount) {
  // Create a new instance of Intl.NumberFormat for Nigerian currency
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  });

  // Format the given amount
  return formatter.format(amount);
}


export const getDateFromOneDayAgo = () => {
  return subDays(new Date(), 1);
};
const parseDate = (date) => {
  if (typeof date === 'string') {
    return parse(date, 'dd-MMMM-yy', new Date());
  } else if (date instanceof Date) {
    return date;
  }
  return null;
};

export function filterDataFromOneDayAgo(data){
  const oneDayAgo = getDateFromOneDayAgo();
  return data.filter(item => isSameDay(parseDate(item.enrollDate), oneDayAgo));
}