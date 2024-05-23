if (!("geolocation" in navigator)) {
    console.error("Geolocalización no disponible");
} else {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            mapboxgl.accessToken = "pk.eyJ1Ijoidmlubnlkcml2aW5nIiwiYSI6ImNsd2d6dGc0ajBhd2wycXNhcHMxOTh1N2gifQ.Qb_eviC3z90exU23QA4OaA";
            let map = new mapboxgl.Map({
                container: "map",
                style: "mapbox://styles/mapbox/streets-v12",
                center: [position.coords.longitude, position.coords.latitude],
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
        },
        (error) => {
            console.error(error);
        }
    );
}
