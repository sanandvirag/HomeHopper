mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', 
    center: coordinates, 
    zoom: 10
});


const marker1 = new mapboxgl.Marker({color:'rgb(255, 56, 92)'})
.setLngLat(coordinates)
.setPopup(new mapboxgl.Popup({offset: 20})
.setHTML("<p>Exact location provided after booking</p>"))
.addTo(map);


