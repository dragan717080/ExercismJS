export const eggCount = (displayValue) => [...Number(displayValue).toString(2)].filter(c => c === '1').length;
