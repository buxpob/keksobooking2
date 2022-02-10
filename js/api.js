const ADDRESS = 'https://22.javascript.pages.academy/keksobooking';


export const getData = (onSuccess, onFail) => {
  fetch(`${ADDRESS}/data`)
    .then((response) => response.json())
    .then((ads) => onSuccess(ads))
    .catch(() => {
      onFail('При получении данных с сервера произошла ошибка');
    })
}

export const sendData = (body, onSuccess, onFail) => {
  fetch(`${ADDRESS}`,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
}


