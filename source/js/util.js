const ALERT_SHOW_TIME = 5000;

export const getRandomInt = (min, max) => {
  if (min < 0 || min >= max) {
    return -1;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomIntFixedPoint = function (min, max, number) {
  if (min < 0 || min >= max) {
    return -1;
  }

  return ((Math.random() * (max - min + 1)) + min).toFixed(number);
};

export const getRandomArrayElement = function (array) {
  return array[getRandomInt(0, array.length - 1)];
};

export const shuffleArray = function (array) {
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

export const getRandomArrayLength = function (array) {
  let newArray = shuffleArray(array);
  let randomArray = [];
  let randomArrayLength = getRandomInt(1, array.length - 1);
  for (let i = 0; i < randomArrayLength; i++) {
    randomArray.push(newArray[i]);
  }

  return randomArray;
};

export const addDisabledCondition = function (el, attributeName) {
  el.classList.add('ad-form--disabled');
  const itemList = document.querySelectorAll(`${attributeName}`);
  itemList.forEach((item) => {
    item.disabled = true;
  });
};

export const removeDisabledCondition = function (el, attributeName) {
  el.classList.remove('ad-form--disabled');
  const itemList = document.querySelectorAll(`${attributeName}`);
  itemList.forEach((item) => {
    item.disabled = false;
  });
};

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 999;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '28px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = `${message}`;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export const showPopup = (className, classNameButton = null) => {
  const popupTemplateInfo = document.querySelector(`#${className}`).content.querySelector(`.${className}`);
  const popupTemplate = popupTemplateInfo.cloneNode(true);
  const main = document.querySelector('main');
  popupTemplate.style.zIndex = 999;
  main.append(popupTemplate);
  popupTemplate.style.display = 'block';

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      popupTemplate.style.display = 'none';
    }
  })

  window.addEventListener('click', (evt) => {
    if (evt.target == popupTemplate) {
      popupTemplate.style.display = 'none';
    }
  })

  if (classNameButton != null) {
    const buttonClose = popupTemplate.querySelector(`.${classNameButton}`);
    buttonClose.addEventListener('click', () => {
      popupTemplate.style.display = 'none';
    })
  }
}

