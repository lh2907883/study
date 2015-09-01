//app1模块依赖了ngRoute模块,这个模块定义在angular-route.js + 25
var app1 = angular.module('app1', ['ngRoute'], function($routeProvider) {
    //when的第一个参数是对url中#后面的字符的一个匹配,例如'/view/:id'满足匹配的url可能是http://.../index.html#/view/2
    $routeProvider. when('/', {
        controller: "ctrlList",
        templateUrl: 'list.html'
    }).
    when('/view/:id', {
        controller: "ctrlDetail",
        templateUrl:'detail.html' //这个子模板只有触发跳转了才加载
    })
    //如果上面所有匹配都不满足就跳转到http://.../index.html#/,所以就是进入了list.html
    .otherwise({
        redirectTo: '/'
    });
}).controller("ctrlList", function($scope, svcDataAccess) {
    $scope.messages = svcDataAccess.getMessages();
}).controller("ctrlDetail", function($scope, $routeParams, svcDataAccess) {
    $scope.message = svcDataAccess.findMessage($routeParams.id);
});

//service在多处使用只会实例化一个对象
//todo:app1.service和app1.factory有何区别?
app1.service("svcDataAccess", function(){
    var DataAccess = function(){
        var isInit = false;
        var messages = [];
        this.getMessages = function(){
            if(!isInit){
                messages = [{
                    id: 0,
                    sender: 'jean@somecompany.com',
                    subject: 'Hi there, old friend',
                    date: 'Dec 7, 2013 12:32:00',
                    recipients: ['greg@somecompany.com'],
                    message: 'Hey, we should get together for lunch sometime and catch up. There are many things, we should collaborate on this year.'
                }, {
                    id: 1,
                    sender: 'maria@somecompany.com',
                    subject:'Where did you leave my laptop?',
                    date: 'Dec 7, 2013 8:15:12',
                    recipients: ['greg@somecompany.com'],
                    message: 'What are you fucking doing here'
                }, {
                    id: 2,
                    sender: 'bill@somecompany.com',
                    subject: 'Lost python',
                    date: 'Dec 6, 2013 20:35:02',
                    recipients: ['greg@somecompany.com'],
                    message: 'so just call me if you see her.'
                }];
                isInit = true;
            }
            return messages;
        }
        this.findMessage = function(id){
            return isInit ? messages[id] : undefined;
        }
    };
    return new DataAccess();
});

