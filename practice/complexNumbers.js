export class ComplexNumber {
  constructor(real, imag) {
    this.innerReal = real;
    this.innerImag = imag;
  }

  get real() {
    return this.innerReal;
  }

  get imag() {
    return this.innerImag;
  }

  add(other) {
    return new ComplexNumber(this.innerReal + other.real, this.innerImag + other.imag);
  }

  sub(other) {
    return new ComplexNumber(this.innerReal - other.real, this.innerImag - other.imag);
  }

  div(other) {
    const quotient = other.real**2 + other.imag**2;
    const newReal = (this.innerReal * other.real + this.innerImag * other.imag) / quotient;
    const newImag = (this.innerImag * other.real - this.innerReal * other.imag) / quotient;

    return new ComplexNumber(newReal, newImag);
  }

  mul(other) {
    const newReal = this.innerReal * other.real - this.innerImag * other.imag;
    const newImag = this.innerReal * other.imag + this.innerImag * other.real;

    return new ComplexNumber(newReal, newImag);
  }

  get abs() {
    return Math.sqrt(this.innerReal**2 + this.innerImag**2);
  }

  get conj() {
    return new ComplexNumber(this.innerReal, this.innerImag === 0 ? 0 : -this.innerImag);
  }

  get exp() {
    return new ComplexNumber(
      Math.exp(this.real) * Math.cos(this.imag),
      Math.exp(this.real) * Math.sin(this.imag),
    );
  }
}
