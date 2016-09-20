
'use strict';

define(["js/service/NotesRepository"], function () {

    return ["$scope","$location","NoteRepository", function ($scope,$location,NoteRepository) {
        $scope.save = function () {
            NoteRepository.create($scope.note).then(function () {
                $location.path('/dashboard/notes');
            });
        };
    }];
});