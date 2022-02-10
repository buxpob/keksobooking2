import { getRandomInt, getRandomIntFixedPoint, getRandomArrayElement, getRandomArrayLength } from './util.js';

const TYPE_HOUSING = ['palace', 'flat', 'house', 'bungalow'];
const TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const Quantity = {
  MIN: 1,
  MAX: 10,
};

const createAuthorAd = function () {
  return {
    avatar: `img/avatars/user0${getRandomInt(1, 8)}.png`,
  };
};

const createOfferAd = function () {
  return {
    title: 'Заголовок',
    address: `${getRandomInt(1, 100)}, ${getRandomInt(1, 100)}`,
    price: getRandomInt(Quantity.MIN, Quantity.MAX),
    type: getRandomArrayElement(TYPE_HOUSING),
    rooms: getRandomInt(Quantity.MIN, Quantity.MAX),
    guests: getRandomInt(Quantity.MIN, Quantity.MAX),
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

