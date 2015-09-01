//先加载控制器的依赖js,这里包括了数据源服务和一个第三方module
define(["angularAMD"], function(angularAMD){
    //加载了第三方module后要通过angularAMD.processQueue()应用新加载的module(这就是angularAMD牛B之处)
    //angularAMD.processQueue();

    angularAMD.controller("ctrlDetail", function($scope, $routeParams, svcDataAccess) {
        $scope.message = svcDataAccess.findMessage($routeParams.id);
    });
});
