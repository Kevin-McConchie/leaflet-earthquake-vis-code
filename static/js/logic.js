// API URL for query
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// function to create size of circles from magnitude
function getRadius(magnitude) {
    return magnitude * 40000;
}

// Loop thru the features and create one marker for each place object
function getColor(magnitude) {
    var color = "";
    if (magnitude <= 1) {
        return color = "#83FF00";
    }
    else if (magnitude <= 2) {
        return color = "#FFEC00";
    }
    else if (magnitude <= 3) {
        return color = "#ffbf00";
    }
    else if (magnitude <= 4) {
        return color = "#ff8000";
    }
    else if (magnitude <= 5) {
        return color = "#FF4600";
    }
    else if (magnitude > 5) {
        return color = "#FF0000";
    }
    else {
        return color = "#ff00bf";
    }
}

// Map create map function
function createMap(earthquakes) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "<a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY

    });

    var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "satellite-v9",
        accessToken: API_KEY
      });
    // Create a baseMaps object to hold the map layer
    var baseMaps = {
        "lightmap": lightmap,
        "satellite map": satellite
    };

    var overlayMaps = {
        "earthquakes": earthquakes
    };

    // Create the map object with options
    var map = L.map("map", {
        center: [40.73, -74.0059],
        zoom: 2,
        layers: [lightmap, earthquakes]
    });

    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);


    // Perform an API call to the Earthquake API to get station information. 
    d3.json(url, function (response) {

        console.log(response.features);

        // send response data to object crateMarkers function
        createFeatures(response.features)
    });


    function createFeatures(earthquakeData) {

        // check data
        console.log(earthquakeData[0].geometry.coordinates[1]);
        console.log(earthquakeData[0].geometry.coordinates[0]);
        console.log(earthquakeData[0].properties.mag);


        // define function for each feature in array

        }        function onEachFeature(feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.place +
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
            "<hr> <p> Earthquake Magnitude: " + feature.properties.mag + "</p>")


        var earthquakes = L.geoJSON(earthquakeData, {

            onEachFeature: onEachFeature,

            pointToLayer: function (feature, coordinates) {

                // create cicles sized and coloured based on magnitude
                var feature = {
                    opacity: 1,
                    fillOpacity: 1,
                    fillColor: getColor(feature.properties.mag),
                    radius: getRadius(feature.properties.mag),
                    stroke: true,
                    weight: 0.5
                }
                return L.circle(coordinates, features);
            }
            
        })
        // Sending  earthquakes layer to the createMap function
        createMap(earthquakes);
    }

};
createMap()





