import RandomNumberGenerator from './RandomNumberGenerator.js';

const colors = Object.freeze([
  '#ef5777',
  '#575fcf',
  '#4bcffa',
  '#34e7e4',
  '#0be881',
  '#f53b57',
  '#3c40c6',
  '#0fbcf9',
  '#00d8d6',
  '#05c46b',
  '#75623e',
  '#ffdd59',
  '#ff5e57',
  '#d2dae2',
  '#485460',
  '#ffa801',
  '#ffd32a',
  '#ff3f34',
]);

const changeBackgroundColor = (function () {
  let previousNumbers = null;
  const body = document.querySelector('body');
  return function closuer() {
    const randomNumberGenerator = new RandomNumberGenerator(colors.length);
    const RandomNumbers = randomNumberGenerator.run();
    if (isNotSameAsPerviousNumbers(RandomNumbers, previousNumbers)) {
      previousNumbers = RandomNumbers;
      const [first, second] = RandomNumbers;
      return (body.style.background = `linear-gradient(${colors[first]}, ${colors[second]})`);
    }
    closuer();
  };
})();

function isNotSameAsPerviousNumbers(RandomNumbers, previousNumbers) {
  return JSON.stringify(RandomNumbers) !== JSON.stringify(previousNumbers);
}

export default changeBackgroundColor;
