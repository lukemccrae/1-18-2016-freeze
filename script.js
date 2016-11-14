var map;
var latPosition;
var longPosition;
var infowindow;
var allPlaceName = [];
var placeGuess = [];
var placeType = [];
var dashes = [];

function initMap(latPosition, longPosition) {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 00,
            lng: 00
        },
        zoom: 1
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
    })

    function initialize() {
        var pyrmont = new google.maps.LatLng(latPosition, longPosition);
        map = new google.maps.Map(document.getElementById('map'), {
            center: pyrmont,
            zoom: 15
        });
        var request = {
            location: pyrmont,
            radius: '200',
            types: ['food']
        };
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
    }

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                allPlaceName.push(place.name)
                placeType.push(place.types[0])
                console.log(place);
                createMarker(results[i]);
            }
        }
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
        var randomNumber = Math.floor(Math.random() * allPlaceName.length);
        placeGuess.push(allPlaceName[randomNumber])
        $('#greeting').append("The place you're looking for is a " + placeType[randomNumber] + ".")
        console.log(allPlaceName.length);
        console.log(randomNumber);
        console.log(placeGuess);
        return makeDashes(placeGuess)
    }

    function makeDashes(placeGuess) {
        for (var i = 0; i < placeGuess.length; i++) {
            dashes.push(" _ ");
        }
        console.log(dashes);
        console.log(placeGuess.length)
    }
});



// this didnt work.
// var request = {
//     location: panPoint,
//     radius: 500
// }
//
// function callback(results, status) {
//     if (status == google.maps.places.PlacesServiceStatus.OK) {
//
//     }
// }
//
// service = new google.maps.places.PlacesService(map);
// service.nearbySearch(request, callback);
// console.log(place);






// 39.7640021,-105.1352965

//https://maps.googleapis.com/maps/api/geocode/json?latlng=39.7640021,-105.1352965&key=AIzaSyB6mjYhp5ca_RPpOdHu_Ul7E-YY6BYzmms


// $(document).ready(function() {
//   $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=39.757726399999996,-105.0072618&key=AIzaSyB6mjYhp5ca_RPpOdHu_Ul7E-YY6BYzmms')
//   .done( function (data) {
//   console.log(data);
//   })
//   .fail(function (error){
//     console.log(error);
//   })
// })


// https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places


//https://maps.googleapis.com/maps/api/place/nearbysearch/output?parameters



// YELP API information
//Consumer Key	xH8sgYlA_Vxb6sb6cZnZzA
// Consumer Secret	ryxLd8J4YXN1GGBdr_HnY4T-4aw
// Token	hmL6a2vYFMdjrpm7iLXeAd7gFvY0KuyS
// Token Secret

// $(document).ready(function() {
//   $.get('https://api.yelp.com/v2/search/?term=food&location=denver,co')
//   .done( function (data) {
//   console.log(data);
//   })
//   .fail(function (error){
//     console.log(error);
//   })
// })


// function RandomWord() {
//     var requestStr = "https://api.yelp.com/v2/search/?term=restaurant&location=denver,co&sort=1&radius_filter=500";
//
//     $.ajax({
//         type: "GET",
//         url: requestStr,
//         dataType: "jsonp",
//         success: function(data){
//           console.log(data);
//           fail: (function (error){
//               console.log(error);
//             })
//         }
//     });
// }
//
//
//         }
//     });
// }
//
//
//         }
//     });
// }
//
//
//         }
//     });
// }
//
//
