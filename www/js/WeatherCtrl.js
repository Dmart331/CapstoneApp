app.controller('WeatherCtrl', function($scope, $http, Weather) {
    $scope.weather = [];
    $scope.weatherDetail = [];
    $scope.zipObj = {
        zip: ''
    };
    $scope.funky = function(data) {
        $scope.weather.push(Weather.getWeather(data).newWeather);
        $scope.weatherDetail.push(Weather.getWeather(data).weatherDetail);

        console.log("Weather 71", $scope.weather)
        console.log("Weather 72", $scope.weatherDetail[0])
    }

})