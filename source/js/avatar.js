const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatar = document.querySelector('#avatar');
const preview = document.querySelector('.setup-user-pic');

avatar.addEventListener('change', () => {
  const file = avatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    })

    reader.readAsDataURL(file);
  }
});

const chooserPhotoHouse = document.querySelector('#images');
const previewPhotoHouse = document.querySelector('.ad-form__photo');

chooserPhotoHouse.addEventListener('change', () => {
  const imgHouse = document.createElement('img');
  previewPhotoHouse.appendChild(imgHouse);

  const file = chooserPhotoHouse.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((item) => {
    return fileName.endsWith(item);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imgHouse.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});
