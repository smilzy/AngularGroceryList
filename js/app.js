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
		{id:1, completed: true, itemName: 'milk', date: '01-06-2017'},
		{id:2, completed: true, itemName: 'bread', date: '01-06-2017'},
		{id:3, completed: true, itemName: 'meat', date: '02-06-2017'},
		{id:4, completed: true, itemName: 'ice cream', date: '03-06-2017'},
		{id:5, completed: true, itemName: 'tomatoes', date: '04-06-2017'},
		{id:6, completed: true, itemName: 'black zero', date: '05-06-2017'},
		{id:7, completed: true, itemName: 'OCB', date: '06-06-2017'},
		{id:8, completed: true, itemName: 'KitKat', date: '06-06-2017'}
	];

	groceryService.getNewId = function() {
		if(groceryService.newId){
			groceryService.newId++;
			return groceryService.newId;
		} else {
			var maxId = _.max(groceryService.groceryItems, function(entry) { return entry.id; })
			groceryService.newId = maxId.id + 1;
			return groceryService.newId;
		}
	};

	groceryService.save = function(entry) {
		entry.id = groceryService.getNewId();
		groceryService.groceryItems.push(entry);
	};

	return groceryService;
})

app.controller("HomeController", ["$scope", function($scope) {
	$scope.appTitle = "Grocery List";
}]);

app.controller("GroceryListItemsController", ["$scope", "$routeParams", "$location", "GroceryService", function($scope, $routeParams, $location, GroceryService) {
	
	$scope.groceryItems = GroceryService.groceryItems;

	$scope.groceryItem = { id:7, completed:true, itemName: "cheese", date: new Date() }

	$scope.save = function() {
		GroceryService.save( $scope.groceryItem );
		$location.path("/");
	}

}]);