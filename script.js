var map;
var randomNumber;
var latPosition;
var longPosition;
var infowindow;
var allPlace = [];
var allPlaceName = [];
var placeGuess = [];
var placeType = [];
var dashes = [];

function initMap(latPosition, longPosition) {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 39.7576958,
            lng: -105.00724629999999
        },
        zoom: 2
    });
}

$(document).ready(function() {
    navigator.geolocation.getCurrentPosition(function(position) {
        latPosition = position.coords.latitude;
        longPosition = position.coords.longitude;
        $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latPosition + ',' + longPosition + '&key=AIzaSyB6mjYhp5ca_RPpOdHu_Ul7E-YY6BYzmms')
            .done(function(data) {
                console.log(data);
                $('#greeting').append(data.results[5].formatted_address);
            })
            .fail(function(error) {
                console.log(error);
            })
        var panPoint = new google.maps.LatLng(latPosition, longPosition);
        map.panTo(panPoint)
        map.setZoom(16);
        initialize();
        console.log(latPosition, longPosition);
    })

    function initialize() {
        var pyrmont = new google.maps.LatLng(latPosition, longPosition);
        map = new google.maps.Map(document.getElementById('map'), {
            center: pyrmont,
            zoom: 16
        });
        var request = {
            location: pyrmont,
            radius: '1000',
            types: ['food']
        };
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
    }

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                allPlace.push(place)
                allPlaceName.push(place.name)
                placeType.push(place.types[0])

                createMarker(results[i]);
            }
        }
        console.log(allPlace);
        console.log(allPlaceName);
        console.log(placeType);
        return guessMe();
    }

    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    }

    function guessMe() {
        randomNumber = Math.floor(Math.random() * allPlaceName.length)
        placeGuess.push(allPlaceName[randomNumber])
        $('#type').append("The place you're looking for is a " + placeType[randomNumber] + ".")
        console.log(allPlaceName.length);
        console.log(placeGuess);
        console.log(randomNumber);
        for (var i = 0; i < placeGuess[0].length; i++) {
            if (placeGuess[0][i] === " ") {
                dashes[i] = "&nbsp;";
            } else if (isLetter(placeGuess[0][i]) === false) {
                dashes.push(placeGuess[0][i])
            } else {
                dashes[i] = " _ ";
            }
        }


        function isLetter(c) {
            return c.toLowerCase() != c.toUpperCase();
        }
        console.log(dashes);
        $('#guessForm').append(dashes)
        directionHint()
    }

    function isLetter(c) {
        return c.toLowerCase() != c.toUpperCase();
    }
    $('#inputBox').keyup(function(a) {
        var keyPress = a.key;
        var submit = $('#inputBox').val();
        if (submit === placeGuess[0]) {
            $('#checkmark').css("display", "block")
        }
        console.log(a.key);
    })



    function directionHint() {
        console.log(allPlace[randomNumber].vicinity);
        $.get('https://galvanize-cors.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=' + latPosition + ',' + longPosition + '&destination=' + allPlace[randomNumber].vicinity + '&key=AIzaSyB6mjYhp5ca_RPpOdHu_Ul7E-YY6BYzmms')
            .done(function(data) {
                console.log(data.routes[0].legs[0].steps[0].distance.value);
            })
    }

});
