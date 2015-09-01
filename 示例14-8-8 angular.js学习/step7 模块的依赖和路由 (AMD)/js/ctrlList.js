//先加载控制器的依赖js
define(["angularAMD"], function(angularAMD){
    //angularAMD.processQueue();
    //angularAMD还能动态添加控制器(其实angularAMD可以动态添加任意东西,包括.provider,.controller,.factory,.service,.constant,.value,.directive,.filter,.animation)
    angularAMD.service("svcDataAccess", function(){
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

    angularAMD.controller("ctrlList", function($scope, svcDataAccess) {
        $scope.messages = svcDataAccess.getMessages();
    });
});
