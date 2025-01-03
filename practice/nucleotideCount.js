/**
 * @param {string} strand
 * @returns {string}
 */
export const countNucleotides = (strand) => {
  const d = {};

  for (const c of [...strand]) {
    if (!(['A', 'C', 'G', 'T']).includes(c)) {
      throw new Error('Invalid nucleotide in strand');
    }

    d[c] = d[c] + 1 || 1;
  }

  return `${d['A'] || 0} ${d['C'] || 0} ${d['G'] || 0} ${d['T'] || 0}`;
}
