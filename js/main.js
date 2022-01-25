let getRandomInt = (min, max) => {
  if (min < 0 || min >= max) {
    return -1;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let getRandomIntFixedPoint = function (min, max, number) {
  if (min < 0 || min >= max) {
    return -1;
  }

  return ((Math.random() * (max - min + 1)) + min).toFixed(number);
};

const AD_COUNT = 10;
const TYPE_HOUSING = ['palace', 'flat', 'house', 'bungalow'];
const TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const Count = {
  MIN: 1,
  MAX: 10,
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

const createAuthorAd = function () {
  return {
    avatar: `img/avatars/user0${getRandomInt(1, 8)}.png`,
  };
};

const createOfferAd = function () {
  return {
    title: 'Заголовок',
    address: 1,
    price: `${getRandomInt(Count.MIN, Count.MAX)}`,
    type: getRandomArrayElement(TYPE_HOUSING),
    rooms: `${getRandomInt(Count.MIN, Count.MAX)}`,
    guests: `${getRandomInt(Count.MIN, Count.MAX)}`,
    checkin: getRandomArrayElement(TIME),
    checkout: getRandomArrayElement(TIME),
    features: getRandomArrayLength(FEATURES),
    description: 'Описание помещения',
    photos: getRandomArrayLength(PHOTOS),
  };
};

const createLocationAd = function () {
  return {
    x: getRandomIntFixedPoint(35.65000, 35.70000, 5),
    y: getRandomIntFixedPoint(139.70000, 139.80000, 5),
  };
};

const createAd = function () {
  return {
    author: createAuthorAd(),
    offer: createOfferAd(),
    location: createLocationAd(),
  }
};

const arrayAds = new Array(AD_COUNT).fill(null).map(() => createAd());

console.log(arrayAds);
