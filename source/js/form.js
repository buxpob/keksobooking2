import { getFormSubmit } from './form-hundler.js';
import { addMainPinMarker } from './map.js';

const Price = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const PRICE_FILTER = {
  LOW: 10000,
  HIGH: 50000,
};

const mapFilterForm = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
const formTitle = document.querySelector('#title');
const formTypeHouse = document.querySelector('#type');
const formPrice = document.querySelector('#price');
const formTimeIn = document.querySelector('#timein');
const formTimeOut = document.querySelector('#timeout');
const capacityRooms = document.querySelector('#room_number');
const capacityGuests = document.querySelector('#capacity');
const formFilter = document.querySelector('.map__filters');

formTypeHouse.addEventListener('change', () => {
  formPrice.placeholder = Price[formTypeHouse.value];
});

formTimeIn.addEventListener('change', () => {
  formTimeOut.value = formTimeIn.value;
});

formTimeOut.addEventListener('change', () => {
  formTimeIn.value = formTimeOut.value;
});

formTitle.addEventListener('invalid', () => {
  if (formTitle.validity.tooShort) {
    formTitle.setCustomValidity(
      'Название должно состоять минимум из 30 символов',
    );
  } else if (formTitle.validity.tooLong) {
    formTitle.setCustomValidity(
      'Название должно состоять максимум из 100 символов',
    );
  } else if (formTitle.validity.valueMissing) {
    formTitle.setCustomValidity('Обязательное поле');
  } else {
    formTitle.setCustomValidity('');
  }
});

const changeCapacityRooms = function () {
  const rooms = Number(capacityRooms.value);

  for (let i = 0; i < capacityGuests.length; i++) {
    const guests = Number(capacityGuests[i].value);

    if (guests <= rooms && guests !== 0) {
      capacityGuests[i].disabled = false;
      capacityGuests[i].selected = true;
    } else {
      capacityGuests[i].disabled = true;
    }

    if (rooms === 100 && guests > 0) {
      capacityGuests[i].disabled = true;
      capacityGuests[i].selected = false;
    }

    if (rooms === 100 && guests === 0) {
      capacityGuests[i].disabled = false;
      capacityGuests[i].selected = true;
    }
  }
};

changeCapacityRooms();

capacityRooms.onchange = () => {
  changeCapacityRooms();
};

export const formReset = () => {
  mapFilterForm.reset();
  adForm.reset();
  getFormSubmit();
  addMainPinMarker();
};

const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  formReset();
});

const houseTypeFilterForm = document.querySelector('#housing-type');
const priceFilterForm = document.querySelector('#housing-price');
const capacityRoomsFilterForm = document.querySelector('#housing-rooms');
const capacityGuestsFilterForm = document.querySelector('#housing-guests');
const filterWifi = document.querySelector('#filter-wifi');
const filterDishwasher = document.querySelector('#filter-dishwasher');
const filterParking = document.querySelector('#filter-parking');
const filterWasher = document.querySelector('#filter-washer');
const filterElevator = document.querySelector('#filter-elevator');
const filterconditioner = document.querySelector('#filter-conditioner');

const filterAmount = (item, el, field) => {
  if (
    item.value === 'any' ||
    item.value === el.offer[`${field}`] ||
    Number(item.value) === el.offer[`${field}`]
  ) {
    return true;
  }
};

const filterPrice = (item, el) => {
  if (
    item.value === 'any' ||
    (item.value === 'middle' &&
      el.offer.price > PRICE_FILTER.LOW &&
      el.offer.price < PRICE_FILTER.HIGH) ||
    (item.value === 'low' && el.offer.price < PRICE_FILTER.LOW) ||
    (item.value === 'high' && el.offer.price > PRICE_FILTER.HIGH)
  ) {
    return true;
  }
};

const filterFeatures = (item, el) => {
  if (
    item.checked === false ||
    (item.checked === true && el.offer.features.includes(item.value))
  ) {
    return true;
  }
};

export const filterAd = (el) => {
  if (
    filterAmount(houseTypeFilterForm, el, 'type') &&
    filterAmount(capacityRoomsFilterForm, el, 'rooms') &&
    filterAmount(capacityGuestsFilterForm, el, 'guests') &&
    filterPrice(priceFilterForm, el) &&
    filterFeatures(filterWifi, el) &&
    filterFeatures(filterDishwasher, el) &&
    filterFeatures(filterParking, el) &&
    filterFeatures(filterWasher, el) &&
    filterFeatures(filterElevator, el) &&
    filterFeatures(filterconditioner, el)
  ) {
    return true;
  }
};

export const changeTypeItemForm = (cb) => {
  formFilter.addEventListener('change', () => {
    cb();
  });
};
