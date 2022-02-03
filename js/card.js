import { getArrayAds } from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const arrayAds = getArrayAds();

const createItemCard = function (el, className, item) {
  if (item) {
    el.querySelector(className).textContent = item;
  } else {
    el.innerHTML = '';
  }
};

const createImgCard = function (el, className, item) {
  el.querySelector(className).src = item;
};

const getTypeHouse = function (type) {
  switch (type) {
    case 'flat':
      return 'Квартира'
    case 'bungalow':
      return 'Бунгало'
    case 'house':
      return 'Дом'
    case 'palace':
      return 'Дворец'
  }
};

const createCard = function (ad) {

  const cardElement = cardTemplate.cloneNode(true);

  createItemCard(cardElement, '.popup__title', ad.offer.title);
  createItemCard(cardElement, '.popup__text--address', ad.offer.address);
  createItemCard(cardElement, '.popup__text--price', `${ad.offer.price} ₽/ночь`);
  createItemCard(cardElement, '.popup__type', getTypeHouse(ad.offer.type));
  createItemCard(cardElement, '.popup__text--capacity', `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`);
  createItemCard(cardElement, '.popup__text--time', `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`);
  createItemCard(cardElement, '.popup__features', ad.offer.features);
  createItemCard(cardElement, '.popup__description', ad.offer.description);
  createItemCard(cardElement, '.popup__photos', ad.offer.photos);
  createImgCard(cardElement, '.popup__avatar', ad.author.avatar);

  return cardElement;
};

export { createCard, arrayAds };
