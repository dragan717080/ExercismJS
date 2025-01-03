export class DiffieHellman {
  /**
   * @param {number} p
   * @param {number} g
   */
  constructor(p, g) {
    checkInput(p);
    checkInput(g);
  
    if (!isPrime(p) || !isPrime(g)) {
      throw new Error('p and g must be prime');
    }

    this.p = p;
    this.g = g;
  }

  getPublicKey(privateKey) {
    if (privateKey < 2 || privateKey >= this.p) {
      throw new Error('private key', privateKey, 'must be greater than 1 and less than modulus p');
    }

    return this.g**privateKey % this.p;
  }

  getSecret(theirPublicKey, myPrivateKey) {
    return theirPublicKey**myPrivateKey % this.p;
  }
}

/**
 * @param {number} n
 * @returns {void}
 */
const checkInput = (n) => {
  if (n < 2) {
    throw new Error(n, 'must be prime');
  }
}

/**
 * @param {number} n
 * @returns {boolean}
 */
const isPrime = (n) => {
  for (let i = 2; i < Math.ceil(Math.sqrt(n)); i++) {
    if (n % 2 === 0) {
      return false;
    }

    return true;
  }
}
