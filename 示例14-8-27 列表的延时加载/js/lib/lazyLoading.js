/**
 * Created by lihao on 14-8-29.
 */
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery'
        ], factory);
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
})(function($){
    window.scrollLazyLoading = function(option){
        var option = $.extend({
            //必填:一个jq对象,也是垂直滚动条的直接容器,比如$('<div style="overflow:auto;"></div>')
            target: null,
            //选填:表示滚动条在离底端watch px的距离时触发延时加载(默认0px)
            watch: 0,
            //选填:当达到触发延时加载的条件时(也就是说滚动条滚动到了合适的位置,通常是最底部),停顿一段时间,给用户一个反应时间(默认300毫秒)
            deferLoadingMs: 300,
            /*必填:类型function(e){},触发延迟加载时调用,
             e:{
             //通知lazyLoading继续监视是否触发延时加载,continueWatch是bool类型,表示是否继续监视(比如已经加载了所有数据就不用继续监视了),itemCount表示这一次加载了多少数据
             notify:function(continueWatch, itemCount){}
             }
            */
            loadCallback: null
        }, option);
        var lastPosition = 0;
        var checkScroll = function(autoFlag){
            //由代码自动调用而非滚动条触发的情况下
            if(autoFlag === true){
                //如果滚动条出现了,并且位置处在末尾(能够再次触发延时加载),那么设置滚动条的位置,就让他在上次的位置
                option.target.scrollTop(lastPosition);
            }
            else{
                var scrollTop = option.target.scrollTop();
                var innerHeight = option.target.innerHeight();
                var scrollHeight = option.target.get(0).scrollHeight;
                if(scrollTop >= scrollHeight - innerHeight - option.watch){
                    lastPosition = scrollTop;
                    checkLoading();
                }
            }
        };
        var readyWatch = true;
        var checkLoading = function(){
            //正在loading的时候不应该再次触发loading
            if(readyWatch) {
                readyWatch = false;
                //给用户一点反应的时间
                window.setTimeout(function(){
                    loading({
                        notify: function(continueWatch){
                            readyWatch = continueWatch;
                        }
                    });
                }, option.deferLoadingMs);
            }
        };
        var loading = function(e){
            option.loadCallback({
                notify: function(continueWatch){
                    e.notify(continueWatch);
                    if(!continueWatch){
                        option.target.unbind("scroll");
                    }
                    checkScroll(true);
                }
            });
        };
        this.dispose = function(){
            option.target.unbind("scroll");
        };
        option.target.unbind("scroll").scroll(checkScroll);
        checkScroll(true);
    };
});
