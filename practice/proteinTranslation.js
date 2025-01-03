const PROTEINS = {
  'AUG': 'Methionine',
  'UUU': 'Phenylalanine',
  'UUC': 'Phenylalanine',
  'UUA': 'Leucine',
  'UUG': 'Leucine',
  'UCU': 'Serine',
  'UCC': 'Serine',
  'UCA': 'Serine',
  'UCG': 'Serine',
  'UAU': 'Tyrosine',
  'UAC': 'Tyrosine',
  'UGU': 'Cysteine',
  'UGC': 'Cysteine',
  'UGG': 'Tryptophan',
  'UAA': 'STOP',
  'UAG': 'STOP',
  'UGA': 'STOP'
}

/**
 * @param {Array<any>} arr
 * @param {number} size
 * @param {Array<any>}
 */
const splitArrayToChunks = (arr, size) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    // Since it is a string, use `join`
    arr.slice(i * size, i * size + size).join('')
  );
}

/**
 * @param {string} s
 * @returns {Array<string>}
 */
export const translate = (s) => {
  if (!s) {
    return [];
  }

  const chunks = splitArrayToChunks([...s], 3);

  const result = [];

  for (const codon of Object.values(chunks)) {
    if (!(codon in PROTEINS)) {
      throw new Error('Invalid codon');
    }

    const protein = PROTEINS[codon];
  
    if (protein === 'STOP') {
      break;
    } else {
      result.push(protein);
    }
  }

  return result;
};
