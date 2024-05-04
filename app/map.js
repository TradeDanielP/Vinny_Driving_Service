"use strict";

const CONFIGURATION = {
  "ctaTitle": "Confirmar",
  "mapOptions": { "center": { "lat": 37.4221, "lng": -122.0841 }, "fullscreenControl": true, "mapTypeControl": false, "streetViewControl": true, "zoom": 17, "zoomControl": true, "maxZoom": 22, "mapId": "" },
  "mapsApiKey": "AIzaSyAOKj95rXV_Y2rogJcHRCRc9H8QWN1Zxlw",
  "capabilities": { "addressAutocompleteControl": true, "mapDisplayControl": true, "ctaControl": true }
};

const SHORT_NAME_ADDRESS_COMPONENT_TYPES =
  new Set(['street_number', 'administrative_area_level_1', 'postal_code']);

const ADDRESS_COMPONENT_TYPES_IN_FORM = [
  'location',
  'locality',
  'administrative_area_level_1',
  'postal_code',
  'country',
];

function getFormInputElement(componentType) {
  return document.getElementById(`${componentType}-input`);
}

function fillInAddress(place) {
  function getComponentName(componentType) {
    for (const component of place.address_components || []) {
      if (component.types[0] === componentType) {
        return SHORT_NAME_ADDRESS_COMPONENT_TYPES.has(componentType) ?
          component.short_name :
          component.long_name;
      }
    }
    return '';
  }

  function getComponentText(componentType) {
    return (componentType === 'location') ?
      `${getComponentName('street_number')} ${getComponentName('route')}` :
      getComponentName(componentType);
  }

  for (const componentType of ADDRESS_COMPONENT_TYPES_IN_FORM) {
    getFormInputElement(componentType).value = getComponentText(componentType);
  }
}

function renderAddress(place, map, marker) {
  if (place.geometry && place.geometry.location) {
    map.setCenter(place.geometry.location);
    marker.position = place.geometry.location;
  } else {
    marker.position = null;
  }
}

async function initMap() {
  const { Map } = google.maps;
  const { AdvancedMarkerElement } = google.maps.marker;
  const { Autocomplete } = google.maps.places;

  const mapOptions = CONFIGURATION.mapOptions;
  mapOptions.mapId = mapOptions.mapId || 'DEMO_MAP_ID';
  mapOptions.center = mapOptions.center || { lat: 37.4221, lng: -122.0841 };

  // Inicializar el primer mapa
  const map1 = new Map(document.getElementById('gmp-map1'), mapOptions);
  const marker1 = new AdvancedMarkerElement({ map: map1 });
  const autocomplete1 = new Autocomplete(getFormInputElement('pickup-location'), {
    fields: ['address_components', 'geometry', 'name'],
    types: ['address'],
  });

  // Obtener la ubicación del usuario para el primer mapa
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map1.setCenter(userLocation);
      marker1.position = userLocation;
    });
  }

  autocomplete1.addListener('place_changed', () => {
    const place = autocomplete1.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert(`No details available for input: '${place.name}'`);
      return;
    }
    renderAddress(place, map1, marker1);
    fillInAddress(place);
  });




  // Inicializar el segundo mapa
  const map2 = new Map(document.getElementById('gmp-map2'), mapOptions);
  const marker2 = new AdvancedMarkerElement({ map: map2 });
  const autocomplete2 = new Autocomplete(getFormInputElement('dropoff-location'), {
    fields: ['address_components', 'geometry', 'name'],
    types: ['address'],
  });

  // Obtener la ubicación del usuario para el segundo mapa
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map2.setCenter(userLocation);
      marker2.position = userLocation;
    });
  }

  autocomplete2.addListener('place_changed', () => {
    const place = autocomplete2.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert(`No details available for input: '${place.name}'`);
      return;
    }
    renderAddress(place, map2, marker2);
    fillInAddress(place);
  });
}





