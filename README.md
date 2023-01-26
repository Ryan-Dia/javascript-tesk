#css 배경바꾸기 과제

정말 간단한 과제이다.  
버튼을 누르면 `colors`배열에서 두 가지 색상이 랜덤으로 선택되어야 한다.  
또한 `body`태그의 `style`을 랜덤으로 선택된 두 가지 색상을 사용해 `linear-gradient`로 변경하는 것이다.

> 여기에 조건을 추가해 줬다.

- 랜덤한 숫자를 뽑을 때 앞서 뽑은 숫자와 중복되는 숫자는 허용하지 않는다.
- 버튼을 눌렀을 때 이전의 색상과 똑같은 조합은 허용하지 않는다.

---

## RandomNumberGenerator

```js
export default class RandomNumberGenerator {
  constructor(colorLength) {
    this.colorLength = colorLength;
  }

  // 랜덤한 숫자를 color 길이에 알맞게 생성해 준다.
  #randomNumber() {
    return Math.floor(Math.random() * this.colorLength);
  }
  // 랜덤한 숫자 2개를 return하는데 중복없이 return 해준다.
  run() {
    const numberBox = new Set();
    while (this.#isNotMoreThanTwoNumbers(numberBox)) {
      numberBox.add(this.#randomNumber());
    }
    return [...numberBox];
  }

  #isNotMoreThanTwoNumbers(numberBox) {
    return numberBox.size < 2;
  }
}
```

---

## changeBackgroundColor

```js
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
  const firstCase = JSON.stringify(RandomNumbers) !== JSON.stringify(previousNumbers);
  const secondCase = JSON.stringify(RandomNumbers.reverse()) !== JSON.stringify(previousNumbers);
  return firstCase || secondCase;
}

export default changeBackgroundColor;
```
