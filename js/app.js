var app = angular.module("groceryListApp", ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider
	.when("/",{
		templateUrl: "views/groceryList.html",
		controller: "HomeController"
	})
	.when("/addItem",{
		templateUrl: "views/addItem.html",
		controller: "GroceryListItemController"
	})
	.when("/addItem/edit/:id/",{
		templateUrl: "views/addItem.html",
		controller: "GroceryListItemController"
	})
	.otherwise({
		redirectTo: "/"
	})
})
app.service("GroceryService", function() {

	var groceryService = {};

	groceryService.groceryItems = [
		{id:1, completed: true, itemName: 'milk', date: new Date('June 1, 2017 16:20:00')},
		{id:2, completed: true, itemName: 'bread', date: new Date('June 2, 2017 13:29:00')},
		{id:3, completed: true, itemName: 'meat', date: new Date('June 2, 2017 14:55:00')},
		{id:4, completed: true, itemName: 'ice cream', date: new Date('June 3, 2017 08:00:00')},
		{id:5, completed: true, itemName: 'tomatoes', date: new Date('June 3, 2017 09:20:00')},
		{id:6, completed: true, itemName: 'black zero', date: new Date('June 4, 2017 23:55:00')},
		{id:7, completed: true, itemName: 'OCB', date: new Date('June 5, 2017 00:20:00')},
		{id:8, completed: true, itemName: 'KitKat', date: new Date('June 5, 2017 19:30:00')}
	];

	groceryService.findById = function(id) {
		for(var item in groceryService.groceryItems) {
			if(groceryService.groceryItems[item].id === id)
				return groceryService.groceryItems[item];
		}
	};

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

	groceryService.removeItem = function(entry){
		var index = groceryService.groceryItems.indexOf(entry);

		groceryService.groceryItems.splice(index, 1); // start at INDEX and delete 1
	};

	groceryService.save = function(entry) {

		var updateItem = groceryService.findById(entry.id);

		if(updateItem) {
			updateItem.completed = entry.completed;
			updateItem.itemName = entry.itemName;
			updateItem.date = entry.date;
		}
		else{
			entry.id = groceryService.getNewId();
			groceryService.groceryItems.push(entry);
		}
	};

	return groceryService;
})

app.controller("HomeController", ["$scope", "GroceryService", function($scope, GroceryService) {
	$scope.appTitle = "Grocery List";
	$scope.groceryItems = GroceryService.groceryItems;
	$scope.removeItem = function(entry) {
		GroceryService.removeItem(entry);
	}
}]);

app.controller("GroceryListItemController", ["$scope", "$routeParams", "$location", "GroceryService", function($scope, $routeParams, $location, GroceryService) {	

	if(!$routeParams.id) {
		$scope.groceryItem = { id: 0, completed: false, itemName: "", date: new Date() }
	} else {
		$scope.groceryItem = _.clone(GroceryService.findById(parseInt($routeParams.id)));
	}


	$scope.save = function() {
		GroceryService.save( $scope.groceryItem );
		$location.path("/");
	}

}]);

app.directive("awGroceryItem", function(){
	return{
		restrict: "E",
		templateUrl: "views/groceryItem.html"
	}
});