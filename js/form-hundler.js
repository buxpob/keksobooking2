/* global _:readonly */

import { getData, sendData } from './api.js';
import { createPopups } from './popup.js';
import { showAlert, showPopup } from './util.js';
import { formReset, changeTypeItemForm } from './form.js';

const adForm = document.querySelector('.ad-form');
const RERENDER_DELAY = 500;

export const getFormSubmit = () => {
  getData((ads) => {
    createPopups(ads);
    changeTypeItemForm(_.debounce(
      () => createPopups(ads),
      RERENDER_DELAY,
    ))
  }, showAlert);
}

export const setUserFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      new FormData(evt.target),
      () => {
        showPopup('success');
        formReset()
      },
      () => {
        showPopup('error', 'error__button')
      },
    );
  })
}
