/**
 * Created by jinhe.chen on 2016/6/6.
 */
define([], function () {

    // controller
    return ["$scope", function ($scope) {
        $scope.content = 'Hello textAngular!';

            $scope.orightml = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li>Super Easy <b>Theming</b> Options</li><li style="color: green;">Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li class="text-danger">Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p><h4>Supports non-latin Characters</h4><p>测试文本</p>';
            $scope.htmlcontent = $scope.orightml;
            $scope.disabled = false;
    }];
});