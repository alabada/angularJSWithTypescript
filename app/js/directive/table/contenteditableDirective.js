'use strict';

define(["app"], function (app) {

    app.directive('contenteditable', function () {
        return {
            restrict: 'A',
            require: ['ngModel', '^qsTable'],
            link: function (scope, element, attrs, ctrls) {
                var ngModel = ctrls[0], qsTableCtrl = ctrls[1];
                ngModel.$render = function () {
                    element.html(ngModel.$viewValue || '');
                };

                element.bind('change blur', function () {
                    var oldValue = ngModel.$viewValue.toString();
                    var newValue = element.text();
                    if (oldValue !== newValue) {
                        scope.$apply(function () {
                            ngModel.$setViewValue(newValue);
                        });
                        if (!!qsTableCtrl.onEdit && typeof qsTableCtrl.onEdit === 'function')
                            qsTableCtrl.onEdit({$oldValue: oldValue, $newValue: newValue});
                    }
                })
            }
        }
    });
});