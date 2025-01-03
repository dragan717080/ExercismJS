export const encode = (message) => splitArrayToChunks([...message.toLowerCase()].reduce((acc, c) => {
  if (/[\s\.\,]/.test(c)) {
    return acc;
  } else if (/\d/.test(c)) {
    return acc + c;
  }

  return acc + getNewLetter(c);
}, ''), 5).join(' ');

export const decode = (message) => [...message.toLowerCase()].reduce((acc, c) => {
  if (/[\s\.\,]/.test(c)) {
    return acc;
  } else if (/\d/.test(c)) {
    return acc + c;
  }

  return acc + getNewLetter(c);
}, '');

const getNewLetter = (c) => String.fromCharCode(97 + 25 - (c.charCodeAt(0) - 97));

const splitArrayToChunks = (arr, size) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}
