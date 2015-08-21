angular.module("raincats")
.factory("RouteService", [function() {

	var routes = [
		{ name: "Home", path: "", parent: null, template: "" },
		{ name: "Team", path: "Team", parent: null, },
		{ name: "Upcoming Games", path: "Upcoming", template: "<div ng-controller='UpcomingController'><h1>Upcoming Games</h1><p>This is content</p></div>" },
		{ name: "Scores", path: "Scores" },
		{ name: "Profile", path: "Profile" },
	];

	var links = [
		{ name: "Recreational Slo-Pitch Association", src: "http://www.slopitch1.com/rspa/" },
		{ name: "Google", src: "http://www.google.ca" }
	];

	return {

		getRoutes: function() {
			return routes;
		},

		hasRoutes: function() {
			return routes.length > 0;
		},

		getRoute: function(id) {
			var route = null
			angular.forEach(routes, function(aRoute) {

				if (aRoute.path == id) {
					route = aRoute;
					return;
				}
			});

			return route;
		},

		getLinks: function() {
			return links;
		},

		hasLinks: function() {
			return links.length > 0;
		}

	};

}])
.factory("HomeService", ["$q", "$http", function($q, $http) {

	var features = [{
			link: "#/Team",
			image: {
				src: "images/team.jpg",
				alt: "",
			},
			icon: "fa-users",
			title: "Team",
			body: "<p>Some information on our team</p>"
		}, {
			link: "#/Upcoming",
			image: {
				src: "images/schedule.jpg",
				alt: "",
			},
			icon: "fa-clock-o",
			title: "Upcoming Games",
			body: "<p>See what games are on the horizon</p>"
		}, {
			link: "#/Scores",
			image: {
				src: "images/scores.jpg",
				alt: "",
			},
			icon: "fa-ticket",
			title: "Scores",
			body: "<p>See what we've been up to</p>"
		}];

	var posts = [{
			link: "#/Team",
			image: {
				src: "images/cat.jpg",
				alt: "",
			},
			spotlight: false,
			date: "July 28",
			title: "Horray for tigers",
			body: "<p>They are big and orange and mean as shit.</p>\
						 <br />\
						 <p>The RainCats are brothers with tigers and if you piss us off we'll have them eat your balls.</p>"
		}];

	return {
		getFeatures: function() {
			var deferred = $q.defer();
			deferred.resolve(features);

			return deferred.promise;
		},

		hasFeatures: function() {
			return features.length > 0;
		},

		getPosts: function() {
			var deferred = $q.defer();
			deferred.resolve(posts.filter(function(post) { return !post.spotlight; }));

			return deferred.promise;
		},

		hasPosts: function() {
			return posts.filter(function(post) { return !post.spotlight; }).length > 0;
		},

		getSpotlight: function() {
			var deferred = $q.defer();
			deferred.resolve(posts.filter(function(post) { return post.spotlight; })[0]);

			return deferred.promise;
		},

	};
}])
