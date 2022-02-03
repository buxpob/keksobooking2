const getRandomInt = (min, max) => {
  if (min < 0 || min >= max) {
    return -1;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomIntFixedPoint = function (min, max, number) {
  if (min < 0 || min >= max) {
    return -1;
  }

  return ((Math.random() * (max - min + 1)) + min).toFixed(number);
};

const getRandomArrayElement = function (array) {
  return array[getRandomInt(0, array.length - 1)];
};

const shuffleArray = function (array) {
  let rundomItem;
  let temp;

  for (let i = array.length - 1; i > 0; i--) {
    rundomItem = Math.floor(Math.random() * (i + 1));
    temp = array[rundomItem];
    array[rundomItem] = array[i];
    array[i] = temp;
  }

  return array;
};

const getRandomArrayLength = function (array) {
  let newArray = shuffleArray(array);
  let randomArray = [];
  let randomArrayLength = getRandomInt(1, array.length - 1);
  for (let i = 0; i < randomArrayLength; i++) {
    randomArray.push(newArray[i]);
  }

  return randomArray;
};

const addDisabledCondition = function (el, attributeName) {
  el.classList.add('ad-form--disabled');
  const itemList = document.querySelectorAll(`${attributeName}`);
  itemList.forEach((item) => {
    item.disabled = true;
  });
};

const removeDisabledCondition = function (el, attributeName) {
  el.classList.remove('ad-form--disabled');
  const itemList = document.querySelectorAll(`${attributeName}`);
  itemList.forEach((item) => {
    item.disabled = false;
  });
};


export {
  getRandomInt,
  getRandomIntFixedPoint,
  getRandomArrayElement,
  getRandomArrayLength,
  addDisabledCondition,
  removeDisabledCondition
};
