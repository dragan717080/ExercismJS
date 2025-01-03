const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const getDayOfWeekForFirst = (year, month) => {
  const options = { weekday: 'long' };
  const d = new Date(year, month, 1);

  return d.toLocaleDateString('en-US', options);
}

/** Gets the first date of month with the given weekday. */
const getFirstDateForWeekday = (weekdayForFirst, weekday) => 1 + (7 + DAYS_OF_WEEK.indexOf(weekdayForFirst) - DAYS_OF_WEEK.indexOf(weekday)) % 7;

const isLearYear = (year) => year % 4 === 0 && (year % 400 === 0 || year % 100 !== 0);

/** Gets the date when it is the last given weekday */
const getLastDateForWeekday = (year, month, firstDateForWeekday) => {
  let DAYS_OF_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (isLearYear(year)) {
    DAYS_OF_MONTH[1] = 29;
  }

  const availableDays = DAYS_OF_MONTH[month] - firstDateForWeekday;

  return availableDays >= 28 ? firstDateForWeekday + 28 : firstDateForWeekday + 21;
}

const getTeenth = (firstDateForWeekDay) => firstDateForWeekDay > 5 ? firstDateForWeekDay + 7 : firstDateForWeekDay + 14;

/**
 * @param {number} year
 * @param {number} month
 * @param {string} order
 * @param {string} dayOfWeek
 * @returns {Date}
 */
export const meetup = (year, month, order, dayOfWeek) => {
  // Months are zero-based
  month -= 1;

  const dayOfWeekForFirst = getDayOfWeekForFirst(year, month);
  const firstDateForWeekDay = getFirstDateForWeekday(dayOfWeek, dayOfWeekForFirst);

  let dateForDay;

  switch (order) {
    case 'first': dateForDay = firstDateForWeekDay; break;
    case 'second': dateForDay = firstDateForWeekDay + 7; break;
    case 'third': dateForDay = firstDateForWeekDay + 7 * 2; break;
    case 'fourth': dateForDay = firstDateForWeekDay + 7 * 3; break;
    case 'last': dateForDay = getLastDateForWeekday(year, month, firstDateForWeekDay); break;
    case 'teenth': dateForDay = getTeenth(firstDateForWeekDay);
  }

  return new Date(year, month, dateForDay);
};
