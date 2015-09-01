/**
 * Created by lihao on 15-1-4.
 */
define(['angular', 'angularAMD', 'angular-route'], function(angular, angularAMD){
    var app = angular.module('appModule', ['ngRoute'],
        ['$routeProvider', function($routeProvider) {
            $routeProvider.when('/',
                angularAMD.route({
                    controller: "ctrlList",
                    templateUrl: 'list.html',
                    controllerUrl: 'ctrlList'
                })
            ).when('/view/:id',
                angularAMD.route({
                    controller: "ctrlDetail",
                    templateUrl:'detail.html',
                    controllerUrl: 'ctrlDetail'
                })
            ).otherwise({
                    redirectTo: '/'
            });
        }]
    );
    angularAMD.bootstrap(app);
});


