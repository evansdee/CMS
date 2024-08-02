


import { isAfter } from 'date-fns';

export function isCurrentDayGreaterThanEndDate(endDate) {
  const currentDate = new Date();
  return isAfter(endDate,currentDate);
}