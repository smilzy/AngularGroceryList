var app = angular.module("groceryListApp", ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider
	.when("/",{
		templateUrl: "views/groceryList.html",
		controller: "GroceryListItemsController"
	})
	.when("/addItem",{
		templateUrl: "views/addItem.html",
		controller: "GroceryListItemsController"
	})
	.when("/addItem/:id/:cat",{
		templateUrl: "views/addItem.html",
		controller: "GroceryListItemsController"
	})
	.otherwise({
		redirectTo: "/"
	})
})

app.service("GroceryService", function() {

	var groceryService = {};

	groceryService.groceryItems = [
		{completed: true, itemName: 'milk', date: '01-06-2017'},
		{completed: true, itemName: 'bread', date: '01-06-2017'},
		{completed: true, itemName: 'meat', date: '02-06-2017'},
		{completed: true, itemName: 'ice cream', date: '03-06-2017'},
		{completed: true, itemName: 'tomatoes', date: '04-06-2017'},
		{completed: true, itemName: 'black zero', date: '05-06-2017'},
		{completed: true, itemName: 'OCB', date: '06-06-2017'},
		{completed: true, itemName: 'KitKat', date: '06-06-2017'}
	]

	return groceryService;
})

app.controller("HomeController", ["$scope", function($scope) {
	$scope.appTitle = "Grocery List";
}]);

app.controller("GroceryListItemsController", ["$scope", "$routeParams", "GroceryService", function($scope, $routeParams, GroceryService) {
	$scope.groceryItems = GroceryService.groceryItems;

	$scope.rp = "Route Parameter Value: " + $routeParams.id + " " + $routeParams.cat; 
}]);