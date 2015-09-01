/**
 * Created by lihao on 15-1-4.
 */
//先加载控制器的依赖js,这里包括了数据源服务和一个第三方module
define(["angularAMD", '../service/dataProvider', 'smart-table'], function(angularAMD){
    //加载了第三方module后要通过angularAMD.processQueue()应用新加载的module(这就是angularAMD牛B之处)
    angularAMD.processQueue();
    //angularAMD还能动态添加控制器(其实angularAMD可以动态添加任意东西,包括.provider,.controller,.factory,.service,.constant,.value,.directive,.filter,.animation)
    angularAMD.controller("docCtrl", ['$scope', '$routeParams', 'dataProviderSvc', //这个dataProviderSvc也是angularAMD动态注册的
        function ($scope, $routeParams, dataProviderSvc) {
            var nameList = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'],
                familyName = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];

            function createRandomItem() {
                var
                    firstName = nameList[Math.floor(Math.random() * 4)],
                    lastName = familyName[Math.floor(Math.random() * 4)],
                    age = Math.floor(Math.random() * 100),
                    email = firstName + lastName + '@whatever.com',
                    balance = Math.random() * 3000;

                return{
                    firstName: firstName,
                    lastName: lastName,
                    age: age,
                    email: email,
                    balance: balance
                };
            }

            $scope.itemsByPage=14;

            var rowCollection = [];
            for (var j = 0; j < 200; j++) {
                rowCollection.push(createRandomItem());
            }
            $scope.rowCollection = rowCollection;
        }
    ]);
});

