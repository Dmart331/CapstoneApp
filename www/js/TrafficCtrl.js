app.controller('TrafficCtrl', ['$scope', function($scope, $ionicLoading, $compile) {
    $scope.disableTap = function() {
        var container = document.getElementsByClassName('pac-container');
        angular.element(container).attr('data-tap-disabled', 'true');
        var backdrop = document.getElementsByClassName('backdrop');
        angular.element(backdrop).attr('data-tap-disabled', 'true');
        angular.element(container).on("click", function() {
            document.getElementById('pac-input').blur();
        });
    };




    var myLatLng;

     var initialize = function() {
        navigator.geolocation.getCurrentPosition(function(position) {
            myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)

            var mapOptions = {
                center: myLatLng,
                zoom: 13,
                disableDefaultUI: true, // DISABLE MAP TYPE
                scrollwheel: true
            };
            var map = new google.maps.Map(document.getElementById('map'),
                mapOptions);
            var input = /** @type {HTMLInputElement} */ (
                document.getElementById('pac-input'));
            var doThis = function(val) {
                input.value = val + " ";
            }

            var commands = {
                'rise find *val': function(val) {
                    doThis(val);
                }
            }

            annyang.addCommands(commands);
            annyang.debug();
            // Create the autocomplete helper, and associate it with
            // an HTML text input box.

            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo('bounds', map);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            var infowindow = new google.maps.InfoWindow();
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map

            });

            var trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(map);
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });
            // Get the full place details when the user selects a place from the
            // list of suggestions.
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                infowindow.close();
                var place = autocomplete.getPlace();
                console.log(place);
                if (!place.geometry) {
                    return;
                }
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }
                // Set the position of the marker using the place ID and location.
                marker.setPlace( /** @type {!google.maps.Place} */ ({
                    placeId: place.name,
                    location: place.geometry.location
                }));
                marker.setVisible(true);
                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + '<br>' +
                    place.formatted_address + '</div>');
                infowindow.open(map, marker);
            });
        })
    }
    // Run the initialize function when the window has finished loading.
    ionic.Platform.ready(initialize);
    
}])