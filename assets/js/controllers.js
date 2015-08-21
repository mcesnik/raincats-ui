angular.module("raincats")
.controller("SiteController", ["$rootScope", "$scope", "RouteService", function($rootScope, $scope, RouteService) {

	$scope.getRoutes = function() {
		return RouteService.getRoutes();
	};

	$scope.hasRoutes = function() {
		return RouteService.hasRoutes();
	};

	$scope.getLinks = function() {
		return RouteService.getLinks();
	};

	$scope.hasLinks = function() {
		return RouteService.hasLinks();
	};

}])
.controller("HomeController", ["$rootScope", "$scope", "HomeService", function($rootScope, $scope, HomeService) {
	$rootScope.title = "RainCats";
	$rootScope.caption = "<strong>Softball:</strong> No crying allowed";

	$scope.features = [];
	HomeService.getFeatures().then(function(features) {
		$scope.features = features;
	});

	$scope.posts = [];
	HomeService.getPosts().then(function(posts) {
		$scope.posts = posts;
	});

	$scope.spotlight = {};
	HomeService.getSpotlight().then(function(spotlight) {
		$scope.spotlight = spotlight;
	});

}])
.controller("UpcomingController", ["$rootScope", "$scope", function($rootScope, $scope) {
	$rootScope.title = "Upcoming Games";
	$rootScope.caption = null;
}]);
