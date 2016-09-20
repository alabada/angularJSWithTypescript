define(["../../../js/service/UserRepository","../../js/directive/MyTab"], function () {
	
	// controller
	return ["$scope", "UserRepository", function ($scope,UserRepository) {
		
		// properties
	    $scope.title = "This is About page";
		$scope.user = UserRepository.getUserByName("Clark");

		$scope.name='lzh';
		$scope.age = 18;
		$scope.show = function(num){
			console.log(num);
		}
	}];	
});