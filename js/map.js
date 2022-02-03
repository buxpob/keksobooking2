import { removeDisabledCondition } from './util.js';
import { arrayAds, createCard } from './card.js';

const mapCanvas = document.querySelector('#map-canvas');
const mapFilterForm = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
const address = adForm.querySelector('#address');

const Coordinates = {
  lat: 35.68950,
  lng: 139.69171,
};

const mapConnect = function () {
  const map = L.map(mapCanvas)
    .on('load', () => {
      removeDisabledCondition(mapFilterForm, ['select', 'fieldset']);
      removeDisabledCondition(adForm, ['fieldset']);
    })
    .setView({
      lat: Coordinates.lat,
      lng: Coordinates.lng,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  arrayAds.forEach((item) => {
    const pinIcon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat: item.location.x,
        lng: item.location.y,
      },
      {
        icon: pinIcon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(createCard(item));
  });

  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainMarker = L.marker(
    {
      lat: Coordinates.lat,
      lng: Coordinates.lng,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainMarker.addTo(map);

  address.value = `${Coordinates.lat}, ${Coordinates.lng}`
  mainMarker.on('moveend', (evt) => {
    const currentAddress = evt.target.getLatLng();
    address.value = `${currentAddress.lat}, ${currentAddress.lng}`;
  });
};

mapConnect();
