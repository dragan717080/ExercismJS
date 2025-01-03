/**
 * @param {Date} startDate
 * @returns {Date}
 */
export const gigasecond = (startDate) => {
  const newDate = new Date(startDate);
  newDate.setSeconds(newDate.getSeconds() + 1_000_000_000);

  return newDate;
}
