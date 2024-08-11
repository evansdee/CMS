import { format, isSameDay, parse, subDays } from 'date-fns';
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



const parseDate = (date) => {
  if (typeof date === 'string') {
    return parse(date, 'dd MMMM yy, hh:mm aaa', new Date());
  } else if (date instanceof Date) {
    return date;
  }
  return null;
};

export const parseDateInclude = (date) => {
  if (date.includes("-")) {
    return format(
      parse(date, "dd-MMMM-yy", new Date()),
      "dd MMMM yy hh:MM aaa"
    );
  } else {
    return date;
  }
};


export function filterDataFromOneDayAgo(data) {

  return data?.filter(item => {
    const parsedDate = parseDate(item.enrollDate);
    if (parsedDate) {
      return isSameDay(parsedDate, new Date());
    } else {
      return false;
    }
  });
}