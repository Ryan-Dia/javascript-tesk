import changeBackgroundColor from './changeBackgroundColor.js';

const button = document.querySelector('button');

const handleBtn = () => changeBackgroundColor();

button.addEventListener('click', handleBtn);
