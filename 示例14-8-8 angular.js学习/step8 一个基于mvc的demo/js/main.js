//JS库配置
requirejs.config({
//	baseUrl: "js",
	waitSeconds:20,
	paths: {
		'jquery':'../plugin/jQuery/jquery-1.11.1',
        'bootstrap':'../plugin/bootstrap/js/bootstrap.min',
        'angular':'../plugin/angular/angular',
        'angular-route':'../plugin/angular/angular-route',
        'angularAMD':'../plugin/angularAMD/angularAMD',
        'smart-table':'../plugin/smart-table/smart-table.debug',
        'angular-ui-grid':'../plugin/angular-ui/js/ng-grid.debug'
	},
    shim: {
        'jquery':{
            exports: 'jquery'
        },
        'angular':{
            exports: 'angular'
        },
        'bootstrap':['jquery'],
        'angularAMD':['angular'],
        'angular-route':['angular'],
        'smart-table':['angular'],
        'angular-ui-grid':['jquery','angular']
    },
    deps: ['appModule']
});




