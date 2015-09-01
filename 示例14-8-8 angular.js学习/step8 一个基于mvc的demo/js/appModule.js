/**
 * Created by lihao on 15-1-4.
 */
define(['angular', 'angularAMD', 'angular-route', 'bootstrap'], function(angular, angularAMD){
    var app = angular.module('appModule', ['ngRoute'],
        ['$routeProvider', function($routeProvider) {
            $routeProvider.when('/v_doc/:optType',
                //angularAMD.route返回一个带有resolve的配置对象,表示要先加载controller文件, 返回值类似下面注释的代码
                angularAMD.route({
                    templateUrl: 'view/v_doc.html', //视图文件,里面就是一个dom会贴到ng-view下面
                    controller: 'docCtrl', //这个控制器的代码在'controller/docCtrl'文件里面,是一个动态添加的控制器,使用angularAMD.controller生成
                    controllerUrl: '../controller/docCtrl' //这个是angularAMD.route要用的参数,这个参数最终会传给RequireJs加载
                })
//                {
//                    templateUrl: 'view/doc_panel.html',
//                    controller: 'docCtrl',
//                    resolve: {
//                        delay: function($q){
//                            var delay = $q.defer();
//                            require(['controller/docCtrl'], function(){
//                                delay.resolve();
//                            });
//                            return delay.promise;
//                        }
//                    }
//                }
            ).when('/v_cxtj',
                angularAMD.route({
                    templateUrl: 'view/v_cxtj.html',
                    controller: 'cxtjCtrl',
                    controllerUrl: '../controller/cxtjCtrl'
                })
            ).when('/v_jmtx',
                angularAMD.route({
                    templateUrl: 'view/v_jmtx.html',
                    controller: 'jmtxCtrl',
                    controllerUrl: '../controller/jmtxCtrl'
                })
            ).otherwise({
                redirectTo: '/v_doc/2'
            });
        }]
    );
    //类似angular.bootstrap(document, ['appModule']); 只不过是用angularAMD启动这个module,这样angularAMD就可以处理后续的动态模块依赖了
    angularAMD.bootstrap(app);
});


