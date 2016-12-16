app.controller('RedditCtrl', function($scope, $location, $http) {
    
    $scope.changeView = function(view) {
        $location.path(view);
    }
    $scope.stories = []

    function loadStories(params, callback) {
        var stories = [];
        $http.get('https://www.reddit.com/r/earthporn.json', {
                params: params
            })
            .success(function(response) {
                angular.forEach(response.data.children, function(child) {
                    stories.push(child.data);
                });
                callback(stories)
                if (stories.thumbnail === "self") {
                    stories.thumbnail = "../images/ionic.png"
                }
                console.log($scope.stories)
            });
    }
    $scope.loadOlderStories = function() {
        var params = {};
        if ($scope.stories.length > 0) {
            params['after'] = $scope.stories[$scope.stories.length - 1].name;
        }
        loadStories(params, function(olderStories) {
            $scope.stories = $scope.stories.concat(olderStories);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }
    $scope.loadNewStories = function() {
        var params = {
            'before': $scope.stories[0].name
        };
        loadStories(params, function(newStories) {
            $scope.stories = newStories.concat($scope.stories);
            $scope.$broadcast('scorll.refreshComplete');
            $scope.$apply();
        })
    }
})