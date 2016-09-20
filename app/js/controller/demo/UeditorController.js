/**
 * Created by zhiheng.li on 2016/5/16.
 */
define(['ueditor-all','ueditor-config'], function () {

    // controller
    return ["$scope", function ($scope) {

        $scope._simpleConfig = {
            //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
            toolbars:[['FullScreen', 'Source', 'Undo', 'Redo','Bold','test']],
            //focus时自动清空初始化时的内容
            autoClearinitialContent:true,
            //关闭字数统计
            wordCount:false,
            //关闭elementPath
            elementPathEnabled:false
        }
        $scope.content1 = 'Hello Ueditor';
    }];
});