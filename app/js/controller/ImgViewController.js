/*
 **createdBy wenhui.gao 2016/8/15
 */
define([
    "js/directive/imgView/qsImgView"
], function() {
    return ['$scope', function($scope) {
        //url类型
        $scope.img = 'http://www.w3school.com.cn/i/eg_tulip.jpg'

        //上传base64
        document.querySelector("#file").onchange = function() {
            var file = this

            if (file.files && file.files[0]) {
                var type = file.files[0].type
                if (type != "image/jpeg" && type != 'image/png' && type != 'image/gif') {
                    alert('请选则正确的文件') //提示打开错误
                    return
                }

                var reader = new FileReader()
                var img = new Image()
                reader.onload = function(e) {
                    img.onload = function() {
                        //执行imgview
                        /****************/
                        $scope.img = this.src
                            /****************/
                    }
                    $scope.$apply(function() {
                        $scope.img = e.target.result //将data移入 img.src
                    })

                }
                reader.readAsDataURL(file.files[0])
            }
        }

    }]
})