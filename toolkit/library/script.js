(function(){
    'use strict';

    // add your script here
    var map = L.map('map').setView([38.539910, -121.752250], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([38.543430, -121.738540]).addTo(map);
    var marker2 = L.marker([38.543200, -121.741590]).addTo(map);

    var circle = L.circle([38.539910, -121.752250], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 600
    }).addTo(map);

    // var polygon = L.polygon([
    //     // [51.509, -0.08],
    //     // [51.503, -0.06],
    //     // [51.51, -0.047]
    // ]).addTo(map);

    marker.bindPopup("<b>Pachamama Coffee</b><br>I like their blueberry matcha!").openPopup();
    marker2.bindPopup("<b>Philz Coffee</b><br>I like their honey haze!").openPopup();
    circle.bindPopup("UC Davis campus");
    // polygon.bindPopup("I am a polygon.");

    // var popup = L.popup()
    // // .setLatLng([51.513, -0.09])
    // .setContent("I am a standalone popup.")
    // .openOn(map);

    var popup = L.popup();

    function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
    }

    map.on('click', onMapClick);
    
}());