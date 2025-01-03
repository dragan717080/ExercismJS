const NUCLEOTIDES = {
  'G': 'C',
  'C': 'G',
  'T': 'A',
  'A': 'U'
}

/**
 * @param {string} sequence
 * @returns {string}
 */
export const toRna = (sequence) => Array.from(sequence).reduce((acc, c) => acc + NUCLEOTIDES[c], '');
