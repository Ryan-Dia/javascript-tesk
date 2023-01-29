const toDoForm = document.querySelector('.toDo-form');
const toDoInput = document.querySelector('input');
const toDoList = document.querySelector('.toDo-list_toDoList');
const finishList = document.querySelector('.toDo-list_finished');

const TODOS_LS = 'toDos';
const FINISHED_LS = 'finished';

let toDos = [];
let finished = [];
let finish = [];
let moveFromToDos = [];
let finishToToDos = [];

function passToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const passedToDos = toDos.filter(function (toDo) {
    return toDo.id === parseInt(li.id);
  });
  Array.prototype.push.apply(finish, passedToDos);
  paintFinished(finish[finish.length - 1].text, finish[finish.length - 1].id);
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function passBack(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const passBacks = finished.filter(function (finished) {
    return finished.id === parseInt(li.id);
  });
  Array.prototype.push.apply(finishToToDos, passBacks);

  paintToDo(finishToToDos[finishToToDos.length - 1].text, finishToToDos[finishToToDos.length - 1].id);
  finishList.removeChild(li);
  const cleanFinished = finished.filter(function (finishe) {
    return finishe.id !== parseInt(li.id);
  });
  finished = cleanFinished;
  saveFinished();
}

function deLeteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function deLeteFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishList.removeChild(li);
  const cleanFinished = finished.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  console.log(cleanFinished);
  finished = cleanFinished;
  saveFinished();
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);

  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text, toDo.id);
    });
  }
}

function loadFinished() {
  const loadedFinished = localStorage.getItem(FINISHED_LS);

  if (loadedFinished !== null) {
    const parsedFinished = JSON.parse(loadedFinished);

    parsedFinished.forEach(function (finished) {
      paintFinished(finished.text, finished.id);
    });
  }
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function saveFinished() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
}

function paintFinished(text, id) {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  const clearBtn = document.createElement('button');
  delBtn.innerText = '❌';
  delBtn.addEventListener('click', deLeteFinished);
  clearBtn.innerText = '⏮';
  clearBtn.addEventListener('click', passBack);
  const span = document.createElement('span');
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(clearBtn);
  li.id = id;
  finishList.appendChild(li);

  const finishedObj = {
    text: text,
    id: id,
  };
  finished.push(finishedObj);
  saveFinished();
}

function paintToDo(text, id) {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  const clearBtn = document.createElement('button');
  delBtn.innerText = '❌';
  delBtn.addEventListener('click', deLeteToDo);
  clearBtn.innerText = '✔';
  clearBtn.addEventListener('click', passToDo);
  const span = document.createElement('span');
  let date = new Date();
  const newId = date.getTime();
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(clearBtn);
  li.id = id ? id : newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text,
    id: id || newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = '';
}

function init() {
  loadToDos();
  loadFinished();
  toDoForm.addEventListener('submit', handleSubmit);
}
init();
