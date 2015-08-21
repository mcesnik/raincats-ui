skel.breakpoints({
	desktop: "(min-width: 737px)",
	tablet: "(min-width: 737px) and (max-width: 1200px)",
	mobile: "(max-width: 736px)"
	}).viewport({
	breakpoints: {
	  tablet: {
	    width: 1080
	  }
	}
});

// Fix: Placeholder polyfill.
$("form").placeholder();

// Prioritize "important" elements on mobile.
skel.on("+mobile -mobile", function() {
	$.prioritize(
		".important\\28 mobile\\29",
		skel.breakpoint("mobile").active
	);
});

// Mobile Navigation Panel.
$("#navPanel").panel({
	delay: 500,
	hideOnClick: true,
	hideOnSwipe: true,
	resetScroll: true,
	resetForms: true,
	side: "left",
	target: $("body"),
	visibleClass: "navPanel-visible"
});

// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
if (skel.vars.os == 'wp' && skel.vars.osVersion < 10) {
	$('#titleBar, #navPanel, #page-wrapper').css('transition', 'none');
}

// Angular site
angular.module("raincats", ["ui.router", "ngSanitize"])
.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state("Home", {
		url: "/",
		templateUrl: "assets/templates/home.html",
		controller: "HomeController"
	}).state("Main", {
		url: "/{page:.+}",
		templateProvider: function(RouteService, $stateParams, $templateFactory) {
			var route = RouteService.getRoute($stateParams.page);
			if (route) {

				if (route.templateUrl) {
					return $templateFactory.fromUrl(route.templateUrl);
				}
				else if (route.template) {
					return $templateFactory.fromString(route.template);
				}

				return $templateFactory.fromString("<h1>" + route.name + "</h1>");
			}

			return $templateFactory.fromString("<h1>" + $stateParams.page + "</h1>");
		},
		resolve: {
			verify: function(RouteService, $stateParams, $q) {
				if (!RouteService.getRoute($stateParams.page)) {
					return $q.reject();
				}
			}
		}
	});

	$urlRouterProvider.otherwise("/");
});
