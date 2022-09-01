function createMap(earthQuakes) {

    // Create the tile layer that will be the background of our map
    var satmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "<a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
        
    });
    // Create a baseMaps object to hold the satellite map layer
    var baseMap = {
        "Satellite Map": satmap
    };

    var overlayMaps = {
        "Earthquakes": earthQuakes
    };

    // Create the map object with options
    var map = L.map("map", {
        center: [40.73, -74.0059],
        zoom: 2,
        layers: [satmap, earthQuakes]
    });

    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMap, overlayMaps, {
        collapsed: false
    }).addTo(map);
    
};

function createMarkers(response) {

    // Pull the "stations" property off of response.data
    var coordinates = response.geometry.coordinates;

    // Initialize an array to hold bike markers
    var epicenters = [];

    // Loop through the stations array
    for (var index = 0; index < coordinates.length; index++) {
        var epicenter = epicenters[index];

        // For each station, create a marker and bind a popup with the station's name
        var epiCenters = L.marker([epicenter.latitude, epicenter.longitude])
            .bindPopup("<h3> Latitude :" + epicenter.latitude + "<h3><h3>Longitude: " + epicenter.longitude + "<h3><h3>Depth: " + epicenter.depth + "</h3>");

        // Add the marker to the bikeMarkers array
        epiCenters.push(epicenter);
    }

    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(epiCenters));
};

// Perform an API call to the Earthquake API to get station information. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson");

// // Loop thru the features and create one marker for each place object
// function colors(magnitude) {
//     var color = "";
//     if (magnitude <= 1) {
//         return color = "#83FF00";
//     }
//     else if (magnitude <= 2) {
//         return color = "#FFEC00";
//     }
//     else if (magnitude <= 3) {
//         return color = "#ffbf00";
//     }
//     else if (magnitude <= 4) {
//         return color = "#ff8000";
//     }
//     else if (magnitude <= 5) {
//         return color = "#FF4600";
//     }
//     else if (magnitude > 5) {
//         return color = "#FF0000";
//     }
//     else {
//         return color = "#ff00bf";
//     }
// }