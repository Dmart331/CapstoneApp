app.controller('TrafficCtrl', function($scope, $ionicLoading, $compile) {
        

        var myLatLng;
        function initialize(){
        	navigator.geolocation.getCurrentPosition(function(position){
        		myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        		var mapOptions = {
        			center: myLatLng,
        			zoom: 16,
        			mapTypeId: google.maps.MapTypeId.ROADMAP
        		};
        		var map = new google.maps.Map(document.getElementById('map'),
        			mapOptions);

        		var marker = new google.maps.Marker({
        			position: myLatLng,
        			map: map,
        			title: 'Your Pos'
        		});

        		var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
        		$scope.map = map;
        	});
        }
        ionic.Platform.ready(initialize)
    });