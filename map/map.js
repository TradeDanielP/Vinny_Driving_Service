mapboxgl.accessToken = "pk.eyJ1Ijoidmlubnlkcml2aW5nIiwiYSI6ImNsd2d6dGc0ajBhd2wycXNhcHMxOTh1N2gifQ.Qb_eviC3z90exU23QA4OaA";

function initializeMap(center) {
    let map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: center,
        zoom: 15,
        pitch: 45,
        bearing: -17.6,
    });

    let directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        profile: "mapbox/driving-traffic",
        unit: "metric",
        controls: {
            instructions: true,
            profileSwitcher: false,
        },
    });

    map.addControl(directions, 'top-left');
}

// Predetermined location
let defaultLocation = [-86.7816, 36.1627]; // Nashville, TN

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            let userLocation = [position.coords.longitude, position.coords.latitude];
            initializeMap(userLocation);
        },
        (error) => {
            console.error(error);
            initializeMap(defaultLocation);
        }
    );
} else {
    console.error("Geolocalización no disponible");
    initializeMap(defaultLocation);
}
