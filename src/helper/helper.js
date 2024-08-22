import { format, isSameDay, parse, subDays,startOfDay, endOfDay, isWithinInterval } from 'date-fns';
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



export function filterDataFromLastThreeDays(data) {
  return data?.filter(item => {
    const parsedDate = parseDate(item.enrollDate);
    if (parsedDate) {
      const threeDaysAgo = startOfDay(subDays(new Date(), 2)); // Start of the day 2 days ago
      const today = new Date(); // Now (includes the whole current day)
      
      return isWithinInterval(parsedDate, { start: threeDaysAgo, end: today });
    } else {
      return false;
    }
  });
}

export function filterDataFromSevenDays(data) {
  return data?.filter(item => {
    const parsedDate = parseDate(item.enrollDate);
    if (parsedDate) {
      const threeDaysAgo = startOfDay(subDays(new Date(), 6)); 
      const today = new Date(); 
      
      return isWithinInterval(parsedDate, { start: threeDaysAgo, end: today });
    } else {
      return false;
    }
  });
}