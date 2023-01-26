import RandomNumberGenerator from './RandomNumberGenerator.js';
const colors = [
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
];

const body = document.querySelector('body');
const button = document.querySelector('button');
const randomNumberGenerator = new RandomNumberGenerator(colors.length);
let previousNumber = null;

const handleBtn = () => {
  const RandomNumbers = randomNumberGenerator.run();
  if (JSON.stringify(RandomNumbers) !== JSON.stringify(previousNumber)) {
    previousNumber = RandomNumbers;
    const [first, second] = RandomNumbers;
    body.style.background = `linear-gradient(${colors[first]}, ${colors[second]})`;
    return;
  }
  handleBtn();
};

button.addEventListener('click', handleBtn);
