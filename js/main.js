const getRandomInt = (min, max) => {
  if (min < 0) {
    alert('Минимальное значение должно быть больше нуля');
  }
  if (max <= min) {
    alert('Максимальное значение должно быть больше минимального');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInt(1, 5);

const getRandomIntFloatPoint = (min, max, floatPoint = 2) => {
  if (min < 0) {
    alert('Минимальное значение должно быть больше нуля');
  }
  if (max <= min) {
    alert('Максимальное значение должно быть больше минимального');
  }

  return ((Math.random() * (max - min) + min)).toFixed(floatPoint);
}

getRandomIntFloatPoint(1, 5, 2);

const createAd = (fn) => {
  let author = {
    avatar: 'img/avatars/user' + '0' + fn + '.png',
  }

  return author;
};

console.log(createAd(getRandomInt(1, 8)));


