
'use strict';

define(["js/service/NotesRepository"], function () {

    return ["$scope","$stateParams","$location","NoteRepository", function ($scope, $stateParams, $location, NoteRepository) {
        $scope.note = NoteRepository.get($stateParams.id).then(function (data) {
            $scope.note = data;
        });
        $scope.save = function () {
            $scope.note.put().then(function () {
                $location.path('/dashboard/notes/item/' + $stateParams.id);
            });
        };
    }];
});