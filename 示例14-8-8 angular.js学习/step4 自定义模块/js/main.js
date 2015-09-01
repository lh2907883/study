angular.module('app1', [])
    //自定义time模块,依赖于$timeout
    .factory('time', function($timeout){
        var timePromise;
        var tick = function(){
            time.now = new Date().toString();
            //$timeout是定时器模块,类似window.setTimeout,第三个参数表示是否使用$apply来更新数据绑定,默认true
            //想要取消定时器可以使用$timeout.cancel(returnedPromise) 这个returnedPromise是$timeout方法的返回值,是一个promise对象
            timePromise = $timeout(tick, 1000, true);
            timePromise.then(
                function() {
                    console.log( "Timer resolved!", Date.now() );
                },
                function() {
                    console.log( "Timer rejected!", Date.now() );
                });
        };
        var time = {
            stop: function(){
                if(timePromise){
                    $timeout.cancel(timePromise);
                    timePromise = undefined;
                }
            },
            start: function(){
                if(!timePromise){
                    tick();
                }
            }
        };
        time.start();
        return time;
    })
    //注册控制器,依赖$scope和time模块
    .controller("BoxCtrl", function($scope, time) {
        $scope.time = time;
        $scope.stop = function(){
            time.stop();
        };
        $scope.start = function(){
            time.start();
        };
        $scope.$on(
            "$destroy",
            function( event ) {
                time.stop();
            }
        );
    });


