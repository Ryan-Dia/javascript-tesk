export default class RandomNumberGenerator {
  constructor(colorLength) {
    this.colorLength = colorLength;
  }

  #randomNumber() {
    return Math.floor(Math.random() * this.colorLength);
  }

  run() {
    let numberBox = [];
    let previousNumber;
    while (this.#isNotMoreThanTwoNumbers(numberBox)) {
      const RandomeNumber = this.#randomNumber();
      if (previousNumber !== RandomeNumber) {
        numberBox.push(RandomeNumber);
        previousNumber = RandomeNumber;
      }
    }
    return numberBox;
  }

  #isNotMoreThanTwoNumbers(numberBox) {
    return numberBox.length < 2;
  }
}
