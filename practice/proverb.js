/**
 * @param {Array<string>} args
 * @returns {string}
 */
export const proverb = (...args) => {
  if (!args.length) {
    return '';
  }

  // Whether the optional param was used
  const withQualifier = typeof(args[args.length - 1]) === 'object';
  const endIndex = withQualifier ? args.length - 2 : args.length - 1;

  let result = [];

  for (let i = 0; i < endIndex; i++) {
    result.push(`For want of a ${args[i]} the ${args[i + 1]} was lost.`)
  }

  result.push(`And all for the want of a${withQualifier ? ' ' + args[endIndex + 1].qualifier : ''} ${args[0] || 'nail'}.`);

  return result.join('\n');
};
