import { removeDisabledCondition, addDisabledCondition } from './util.js';

const mapCanvas = document.querySelector('#map-canvas');
const mapFilterForm = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');

addDisabledCondition(mapFilterForm, ['select', 'fieldset']);
addDisabledCondition(adForm, ['fieldset']);

const Coordinates = {
  lat: 35.67500,
  lng: 139.75000,
};

const map = L.map(mapCanvas)

export const mapConnect = function () {
  map.on('load', () => {
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
}

const mainPinMarkerLayer = L.layerGroup();
export const addMainPinMarker = function () {

  mainPinMarkerLayer.clearLayers();

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

  let address = document.querySelector('#address');
  const mapCoordinatesStart = `${mainMarker._latlng.lat}, ${mainMarker._latlng.lng}`;
  address.value = mapCoordinatesStart;

  mainPinMarkerLayer.addLayer(mainMarker);
  mainPinMarkerLayer.addTo(map);

  mainMarker.on('moveend', (evt) => {
    const lat = evt.target.getLatLng().lat.toFixed(5);
    const lng = evt.target.getLatLng().lng.toFixed(5);
    address.value = `${lat}, ${lng}`;
  });


};


const listMarkers = L.layerGroup();
export const addAdsPinMarker = function (arr, listPopups) {

  listMarkers.clearLayers();

  arr.forEach((item, index) => {
    const popup = listPopups[index];
    const pinIcon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const adPinMarker = L.marker(
      {
        lat: item.location.lat,
        lng: item.location.lng,
      },
      {
        icon: pinIcon,
      },
    );

    adPinMarker.bindPopup(popup)
    listMarkers.addLayer(adPinMarker);
  });

  listMarkers.addTo(map);
}

export const addMap = () => {
  mapConnect();
  addMainPinMarker();
}

