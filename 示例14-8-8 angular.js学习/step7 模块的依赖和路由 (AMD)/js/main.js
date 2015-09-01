//JS库配置
requirejs.config({
//	baseUrl: "js",
    waitSeconds:20,
    paths: {
        'jquery':'../../lib/jquery-1.11.1',
        'angular':'../../lib/angular-1.2.2/angular',
        'angular-route':'../../lib/angular-1.2.2/angular-route',
        'angularAMD':'../../lib/angularAMD/angularAMD'
    },
    shim: {
        'jquery':{
            exports: 'jquery'
        },
        'angular':{
            exports: 'angular'
        },
        'angularAMD':['angular'],
        'angular-route':['angular']
    },
    deps: ['app']
});