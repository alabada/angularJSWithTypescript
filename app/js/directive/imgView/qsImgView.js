/**
 * Created by wenhui.gao on 2016/8/18/018.
 * canvas + css3 的图片查看器
 * 参数
 * src-img : 图像的src
 * repeat : 图像重复次数
 * max: 最大值
 * min: 最小值 (大于0的数)
 */

'use strict';

angular.module('qs.imgView', [])
    .provider('qsImgViewPrvd', [function() {
        this.$get = [function() {
            var mainContainer,
                canvas,
                scaleValueELe,
                context,
                preloader,
                isshow = false,
                sta = {x: "", y: ""}, end = {x: '', y: ''},
                DEFAULT_OPTIONS = {
                    repeat: 1,
                    max: 5,
                    min: 0.1,
                    step: 0.1
                },
                cRect = {
                    x: 0,
                    y: 0,
                    scale: 1
                }
                /*---------------公有方法------------------*/

            //设置transform matrix3d 方法
            function transform(domEle) {
                domEle.style.msTransform = "matrix(" + cRect.scale + ", 0, 0," + cRect.scale + "," + cRect.x + "," + cRect.y + ")";
                domEle.style.msTransform = "matrix3d(" + cRect.scale + ", 0, 0, 0, 0," + cRect.scale + ", 0, 0, 0, 0, 1, 0," + cRect.x + "," + cRect.y + ", 0, 1)"
                domEle.style.webkitTransform = "matrix3d(" + cRect.scale + ", 0, 0, 0, 0," + cRect.scale + ", 0, 0, 0, 0, 1, 0," + cRect.x + "," + cRect.y + ", 0, 1)"
                domEle.style.transform = "matrix3d(" + cRect.scale + ", 0, 0, 0, 0," + cRect.scale + ", 0, 0, 0, 0, 1, 0," + cRect.x + "," + cRect.y + ", 0, 1)"
            }

            //取长宽中更大的那个
            function fclacImgZoomParam(maxWidth, maxHeight, width, height) {
                var param = {
                        top: 0,
                        left: 0,
                        width: width,
                        height: height
                    },
                    rateWidth, rateHeight;

                if (width > maxWidth || height > maxHeight) {
                    rateWidth = width / maxWidth;
                    rateHeight = height / maxHeight;

                    if (rateWidth > rateHeight) {
                        param.width = maxWidth;
                        param.height = Math.round(height / rateWidth);
                    } else {
                        param.width = Math.round(width / rateHeight);
                        param.height = maxHeight;
                    }
                }

                param.left = Math.round((maxWidth - param.width) / 2);
                param.top = Math.round((maxHeight - param.height) / 2);
                return param;
            }

            //调整canvas位置
            function adjustViewSize(repeatNum) {

                var mainRect = mainContainer.getBoundingClientRect(), //为支持响应式 应重新获取大小
                    MAXWIDTH = mainRect.width,
                    MAXHEIGHT = mainRect.height,
                    rel_W, rel_H,
                    rect = fclacImgZoomParam(MAXWIDTH, MAXHEIGHT, canvas.width, canvas.height); //调整canvas的显示大小

                //初始化位置
                canvas.style.left = (MAXWIDTH - repeatNum * rect.width) / 2 + "px";
                canvas.style.top = (MAXHEIGHT - repeatNum * rect.height) / 2 + "px";

                //初始化大小
                canvas.style.width = repeatNum * rect.width + "px";
                canvas.style.height = repeatNum * rect.height + "px";


                //重置位置与缩放
                cRect = {
                    x: 0,
                    y: 0,
                    scale: 1
                }

                //设置缩放大小
                cRect.scale = parseFloat(1 / repeatNum);



                rel_W = repeatNum * rect.width * cRect.scale;
                rel_H = repeatNum * rect.height * cRect.scale;

                //重置大小

                transform(canvas);
            }

            //获取真实canvas坐标
            function getMousePos(canvas, evt) {
                var rect = canvas.getBoundingClientRect();
                if (evt.touches) {
                    return {
                        x: (evt.changedTouches[0].clientX - (rect.left)) * (canvas.width / rect.width),
                        y: (evt.changedTouches[0].clientY - (rect.top)) * (canvas.height / rect.height)
                    }
                }
                return {
                    x: (evt.clientX - (rect.left)) * (canvas.width / rect.width),
                    y: (evt.clientY - (rect.top)) * (canvas.height / rect.height)
                }
            }


            //移动方法
            function changePosMousedown(e) {
                e.preventDefault();
                if (e.touches) {
                    sta.x = e.changedTouches[0].clientX;
                    sta.y = e.changedTouches[0].clientY;
                } else {
                    sta.x = e.clientX;
                    sta.y = e.clientY;
                }
            }

            function changePosMouseup(e) {
                if (e.touches) {
                    end.x = e.changedTouches[0].clientX;
                    end.y = e.changedTouches[0].clientY;
                } else {
                    end.x = e.clientX;
                    end.y = e.clientY;
                }

                var w = end.x - sta.x
                var h = end.y - sta.y
                    //通过改变 pos=absolute 的canvas的left top 实现移动
                cRect.x += w
                cRect.y += h
                transform(canvas)
            }

            //中键放大
            function scrollFunc(e, max, min, step, repeat) {
                var direction = 0;
                var scaleVal;
                e.preventDefault();
                if (e.wheelDelta) {
                    direction = e.wheelDelta > 0 ? "up" : "down";
                } else if (e.detail) {
                    direction = e.detail > 0 ? "down" : "up";
                }

                //计算放大倍数
                scaleVal = (
                    direction === "up" ? parseFloat(cRect.scale + step) :
                    direction === "down" ? parseFloat(cRect.scale - step) : null
                );

                //调速倍数在指定的范围内
                cRect.scale = (
                    scaleVal > max ? max :
                    scaleVal < min ? min :
                    scaleVal
                );
                transform(canvas);
                showScaleVal(repeat, cRect.scale)

            }

            //显示当前大小
            function showScaleVal(repeat, scaleVal) {
                scaleValueELe.innerHTML = "大小: " + Math.round(repeat * scaleVal * 100) + " %"
            }



            /*--------------- end 公有方法------------------*/

            //页面大小变化时调整canvas的位置
            // window.onresize = function() {
            //     if (!!isshow) {
            //         adjustViewSize()
            //     }
            // }


            /*-----------定义构造函数---------------*/
            var ImgView = function(options) {
                if (typeof options === "undefined") {
                    this.options = DEFAULT_OPTIONS;
                } else {
                    this.options = options;
                }
            };

            ImgView.prototype = {
                constructor: ImgView,
                setImg: function(img) {
                    var self = this,
                        options = self.options,
                        repeatNum = self.options.repeat || DEFAULT_OPTIONS.repeat,
                        MAXSIZE = 8000,
                        w = img.width,
                        h = img.height,
                        i, j;
                    //初始化dom元素及全局变量
                    mainContainer = options.cont;
                    canvas = mainContainer.querySelector(".img-view-canvas");
                    context = canvas.getContext('2d');
                    scaleValueELe = mainContainer.querySelector(".scale-value");
                    isshow = true;

                    canvas.width = w * repeatNum;
                    canvas.height = h * repeatNum;

                    for (i = 0; i < repeatNum; i++) {
                        for (j = 0; j < repeatNum; j++) {
                            context.drawImage(img, j * w, i * h, w, h);
                        }
                    }

                    //除去上次的tool的操作坐标
                    sta = {
                        x: "",
                        y: ""
                    }, end = {
                        x: '',
                        y: ''
                    };

                    //显示当前的大小
                    angular.element(scaleValueELe).removeClass('out')
                    angular.element(scaleValueELe).addClass('in')

                    adjustViewSize(repeatNum) //调整显示大小
                    self.bind() // 绑定其它方法
                },
                bind: function() {
                    var self = this,
                        repeatNum = +self.options.repeat || DEFAULT_OPTIONS.repeat,


                        max = (+self.options.max || +DEFAULT_OPTIONS.max) / repeatNum,
                        min = (+self.options.min || +DEFAULT_OPTIONS.min) / repeatNum,
                        step = (+self.options.step || +DEFAULT_OPTIONS.step) / repeatNum;
                    // console.log(self.options , min ,max);


                    /*-----------------  移动图像方法   ---------------------*/
                    mainContainer.addEventListener('mousedown', changePosMousedown)
                    mainContainer.addEventListener('mouseup', changePosMouseup)

                    //移动端
                    // mainContainer.addEventListener('touchstart', changePosMousedown)
                    // mainContainer.addEventListener('touchend', changePosMouseup)
                    //
                    /*-----------------end 移动图像方法---------------------*/



                    /*------------------放大与缩小 ---------------------*/
                    //中键
                    mainContainer.addEventListener('DOMMouseScroll', function(e) {
                        scrollFunc(e, max, min, step, repeatNum)
                    }); //firefox
                    mainContainer.addEventListener('mousewheel', function(e) {
                            scrollFunc(e, max, min, step, repeatNum)
                        }) // 其它
                    showScaleVal(repeatNum, cRect.scale)
                        /*----------------- end 放大缩小 --------------------*/
                }
            };

            return {
                init: function(options) {
                    return new ImgView(options)
                }
            };
            //end $get
        }];
    }])
    .directive('qsImgView', ['qsImgViewPrvd', function(qsImgViewPrvd) {
        return {
            templateUrl: 'js/directive/imgView/imgView.html',
            restrict: 'EA',
            transclude: true,
            replace: true,
            scope: {},
            link: function(scope, element, attrs) {
                var defaultOptions = {
                    repeat: null,
                    max: null,
                    min: null,
                    cont: element[0]
                }
                if (!angular.isUndefined(attrs.max)) {
                    defaultOptions.max = +attrs.max
                }
                if (!angular.isUndefined(attrs.min)) {
                    defaultOptions.min = +attrs.min
                }
                if (!angular.isUndefined(attrs.defalutValue)) {
                    defaultOptions.defalutValue = +attrs.defalutValue
                }

                if (!angular.isUndefined(attrs.repeat)) {
                    defaultOptions.repeat = +attrs.repeat
                }

                var imgview = qsImgViewPrvd.init(defaultOptions)
                scope.$parent.$watch(attrs.srcImg, function(newVal, oldVal) {
                        if (angular.isUndefined(newVal)) {
                            return
                        }
                        var _newImg = new Image();
                        _newImg.src = newVal;
                        // console.time('lu')
                        _newImg.onload = function() {
                            imgview.setImg(_newImg);
                            // console.timeEnd('lu')
                        }

                    })
                    //end link
            }
        }
    }]);