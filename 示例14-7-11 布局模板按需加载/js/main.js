/**
 * Created by lihao on 14-7-10.
 */
//JS库配置
requirejs.config({
    baseUrl: "js",
    waitSeconds:20,
    paths: {
        'jquery':'./lib/jquery',
        'jquery-json':'./lib/json',
        'jquery-ui':'./lib/jquery-ui',
        'jquery.layout':'./lib/jquery.layout-latest',
        'jquery.tmpl':'./lib/jquery.tmpl'
    },
    shim: {
        'jquery-json': {
            deps: ['jquery'],
            exports: 'jQuery-json'
        },
        'jquery-ui': {
            deps: ['jquery'],
            exports: 'jQuery-ui'
        },
        'jquery.layout': {
            deps: ['jquery','jquery-ui'],
            exports: 'jQuery.layout'
        },
        'jquery.tmpl': {
            deps: ['jquery'],
            exports: 'jQuery.tmpl'
        }
    }
});

require(["system", "jquery.layout"], function() {

    var pageLayoutSettings = {
        name:						"HomepageLayout"
        ,	north__paneSelector:		".north_panel"
        ,	west__paneSelector:		    ".west_panel"
        ,	center__paneSelector:		".center_panel"
        //,	north_spacing_open:			0
        ,	spacing_open:			    0
        //,	center__onresize:			$.layout.callbacks.resizeTabLayout
        ,	togglerLength_open:			0
        ,	togglerLength_close:		0
        ,	north__size:				63	//55
        ,	west__size:				    211
    };

    $('.bodywrap').layout(pageLayoutSettings);
    system.notify("loading","加载完成!");
    $("body").append(system.tmpl("test_tmpl")({html:'this is a test'}));
});


