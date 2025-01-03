export class Cipher {
  /**
   * @param {string} [key]
   */
  constructor(key='') {
    this.key = key || this.generateRandomKey();
  }

  /**
   * @param {string} message
   * @returns {string}
   */
  encode(message) {
    return this.processString(message);
  }

  /**
   * @param {string} message
   * @returns {string}
   */
  decode(message) {
    return this.processString(message, false);
  }

  /**
   * Can both encode and decode
   * 
   * @param {string} message
   * @param {isEncode} [boolean] - Defaults to true
   * @returns {string}
   */
  processString(message, isEncode=true) {
    let result = '';

    for (const i in message) {
      const messageCharCode = message.charCodeAt(i) - 97;
      const keyCharCode = this.key.charCodeAt(i % this.key.length) - 97;
      const newCharCode = isEncode ? messageCharCode + keyCharCode : messageCharCode - keyCharCode;

      result += String.fromCharCode(97 + (26 + newCharCode) % 26);
    }

    return result;
  }

  /**
   * @returns {string}
   */
  generateRandomKey() {
    return Array.from({ length: 100 }).map(x => String.fromCharCode(97 + Math.round(Math.random() * 25))).join('');
  }
}
