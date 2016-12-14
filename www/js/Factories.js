app.factory('Weather', function($http, $window) {
    let API_key = "7e327ac0450943ac",
        openAPI = 'd285e8e51b44d4734984b6ab9e4e94cb'

    let getWeather = function(zip) {
        let weather = [];
        let newWeather = [];
        let weatherDetail = [];
        $http.get(`http://api.wunderground.com/api/${API_key}/geolookup/q/${zip}.json
        `)
            .success((weatherObject) => {
                let weatherCollection = weatherObject;
                weather.push(weatherCollection);
                console.log("weather", weather[0]);
                $http.get(`http://api.wunderground.com/api/${API_key}/conditions/q/${weather[0].location.state}/${weather[0].location.city}.json`)
                    .success((newWeatherObj) => {
                        let newCollection = newWeatherObj;
                        newWeather.push(newCollection);
                        $http.get(`https://api.darksky.net/forecast/3bcc733553a43c5d324d11d6a83e58c2/${weather[0].location.lat},${weather[0].location.lon}`)
                            .success((openObj) => {
                                let openCollection = openObj;
                                weatherDetail.push(openCollection);
                                console.log("Drew2", weatherDetail);
                            })
                        console.log("Services 23", newWeather);
                    })
            });
        return {newWeather, weatherDetail}

    };
    return {
        API_key,
        openAPI,
        getWeather
    };
})