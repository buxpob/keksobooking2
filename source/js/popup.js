import { addAdsPinMarker } from './map.js';
import { filterAd } from './form.js';

const AD_COUNT = 10;
const listDescriptionObjects = document.querySelector('.map__canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const cardFragment = document.createDocumentFragment();

const createItemCard = function (el, className, item) {
  el.querySelector(className).textContent = item;
  if (item === undefined || item.length === 0) {
    el.querySelector(className).remove();
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

let adList = [];
const filterAdsArray = (arr) => {
  adList = [];
  for (let i = 0; i < arr.length; i++) {
    if (filterAd(arr[i])) {
      adList.push(arr[i]);
    }
    if (adList.length >= AD_COUNT) {
      break;
    }
  }
}

export const createPopups = function (ads) {

  filterAdsArray(ads);

  adList.forEach((ad) => {

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

    cardFragment.appendChild(cardElement);
  });

  listDescriptionObjects.querySelectorAll('.popup').forEach((el) => {
    el.remove();
  })

  listDescriptionObjects.appendChild(cardFragment);

  addAdsPinMarker(adList, listDescriptionObjects.querySelectorAll('.popup'));
};
