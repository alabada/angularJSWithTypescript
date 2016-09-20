/**
 * Created by zhida.wen on 2016/6/1.
 */

define(["app"], function (app) {
    app.service('Randoms', function() {

        this.scalingFactor = function() {
            return Math.round(Math.random() * 100);
        };

        this.colorFactor = function() {
            return Math.round(Math.random() * 255);
        };

        this.randomColor = function(opacity) {
            return 'rgba(' + this.colorFactor() + ',' + this.colorFactor() + ',' + this.colorFactor() + ',' + (opacity || '.3') + ')';
        };
    });
});