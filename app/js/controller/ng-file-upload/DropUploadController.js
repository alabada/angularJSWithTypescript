/**
 * Created by luozhanghua on 2016/6/27.
 * templateUrl:"views/"+theme+"/ng-file-upload/multipleUpload.html",
 * css:"js/controller/ng-file-upload/common.css"
 * describe：拖拽上传文件控制器
 */

'use strict';

define([
    "../../../asset/libs/ng-file-upload/ng-file-upload-shim",
    "../../../asset/libs/ng-file-upload/ng-file-upload"
], function () {
    return ['$scope', '$http', '$timeout', '$compile', 'Upload',
        function ($scope, $http, $timeout, $compile, Upload) {
            $scope.addFiles = function (files, errFiles) {
                $scope.files = files;
                $scope.errFiles = errFiles;
            };
            $scope.upload = function (file) {
                Upload.upload({
                    url: 'http://localhost:8080/upload/fileupload.do',
                    data: {file: file,"fileSource":"fileSource", "saveDirectory":"saveDirectory"},
                    method:'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(function (response) {
                    $timeout(function () {
                        if (response.data.code == 200) {
                            file.isSuccess = function () {
                                return true;
                            }
                        }
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            };

            $scope.$watch('files', function () {
                angular.forEach($scope.files,function (file, index) {
                    file.upload = function () {
                        $scope.upload(file);
                    }
                    file.progress = 0;
                    file.remove = function (key) {
                        $scope.files.splice(key, 1);
                    }
                });
            });

            $scope.uploadAll = function () {
                angular.forEach($scope.files, function(file) {
                    $scope.upload(file);
                });
            };

            $scope.clearQueue = function () {
                $scope.files = "";
            }
        }];
});