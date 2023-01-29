const form = document.querySelector('.logIn-form'),
  input = form.querySelector('.logIn-form_input'),
  greeting = document.querySelector('.logIn-greetings'),
  aa = document.querySelector('.aa');

const USER_LS = 'currentUser',
  SHOWING_CN = 'showing';

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handlesubmit(event) {
  event.preventDefault();
  const currenValue = input.value;
  paintGreeting(currenValue);
  saveName(currenValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  aa.classList.add(SHOWING_CN);
  form.addEventListener('submit', handlesubmit);
}
function rreturn() {
  greeting.classList.remove(SHOWING_CN);
  form.classList.add(SHOWING_CN);
  aa.classList.add(SHOWING_CN);
}

function deLeteName(event) {
  localStorage.removeItem(USER_LS);
  rreturn();
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  aa.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
  const ddelBtn = document.createElement('button');
  ddelBtn.innerText = '❌';
  ddelBtn.addEventListener('click', deLeteName);
  greeting.append(ddelBtn);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
