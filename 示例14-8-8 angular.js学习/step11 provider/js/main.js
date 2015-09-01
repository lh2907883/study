angular.module("global", [])
    //provider就是一个可以配置的service,在模块加载后可以通过模块的config方法配置(在config里面注入provider的时候,name必须加"Provider")
    .provider('wx', [function(){
        var weixin = function(){
            this.weixinid = "11111";
            this.getDate = function(){
                return new Date();
            }
            this.getConfig = function(){
                return config;
            }
        };
        var config;
        this.config = function(cfg){
            config = cfg;
        }
        /**
         * 在provider的定义里面,这个$get方法必须要有,它的返回是作为service注入时要用到的
         */
        this.$get = function() {
          return new weixin();
        }
    }])

angular.module('app1', ['global'])    
    .config(["wxProvider", function (wxProvider) {
        wxProvider.config({
            name: "lihao",
            ip: "192.168.1.75"
        });
    }])
    //注册控制器,这里的wx是上面this.$get返回的对象
    .controller("BoxCtrl", ["$scope", "wx", function($scope, wx) {
        $scope.wx = wx.getConfig();
    }]);


