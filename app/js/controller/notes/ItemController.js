
'use strict';

define(["js/service/NotesRepository","../../service/base/AbstractRepository"], function () {

    return ["$scope","NoteRepository","$stateParams", function ($scope,NoteRepository,$stateParams) {
        $scope.note = NoteRepository.get($stateParams.id).then(function (data) {
            $scope.note = data;
        });
    }];
});