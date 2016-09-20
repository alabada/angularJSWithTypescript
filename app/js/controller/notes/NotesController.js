
'use strict';

define(["js/service/NotesRepository"], function () {

    return ["$scope","NoteRepository", function ($scope,NoteRepository) {

        $scope.notes = NoteRepository.getList();
        console.log( $scope.notes);
        $scope.delete = function (data) {
            if(window.confirm('Are you sure?')) {
                NoteRepository.remove(data).then(function () {
                    $scope.notes = NoteRepository.getList();
                });
            }
        };
    }];
});