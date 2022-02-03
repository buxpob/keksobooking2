import { addDisabledCondition } from './util.js';

const Price = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
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

addDisabledCondition(mapFilterForm, ['select', 'fieldset']);
addDisabledCondition(adForm, ['fieldset']);

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
    formTitle.setCustomValidity('Название должно состоять минимум из 30 символов');
  } else if (formTitle.validity.tooLong) {
    formTitle.setCustomValidity('Название должно состоять максимум из 100 символов');
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
}
