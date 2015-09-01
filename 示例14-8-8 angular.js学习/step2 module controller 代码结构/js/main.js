var app = angular.module('app1', [], function(){
    console.log('here');
});

app.controller('BoxCtrl',
    //这个匿名方法的参数实际上是一些内置的模块对象,因此形参名不能随便更改,实现这个的方法应该是对匿名方法调用toString方法获取形参的字符串,然后初始化对应模块
    function($scope,$element,$filter){
        debugger;
        var e = $element.children().eq(0);
        //这里的width,height方法依赖了jquery.js,如果不引用jquery.js,那么只能用jqlit提供的几个基础方法
        $scope.w = e.width();
        $scope.h = e.height();

        $scope.click = function(){
            $scope.w = parseInt($scope.w) + 10;
            $scope.h = parseInt($scope.h) + 10;
        };

        $scope.$watch('w',
            function(to, from){
                e.width(to);
            }
        );

        $scope.$watch('h',
            function(to, from){
                e.height(to);
            }
        );
        console.log('ok');
    }
);


