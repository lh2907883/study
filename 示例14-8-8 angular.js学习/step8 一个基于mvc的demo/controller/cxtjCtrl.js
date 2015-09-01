/**
 * Created by lihao on 15-1-4.
 */
define(["angularAMD", 'angular-ui-grid'], function(angularAMD){
    angularAMD.processQueue();
    angularAMD.controller("cxtjCtrl", ['$scope', '$http',
        function ($scope, $http) {
            var nameList = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'],
                familyName = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];
            function createRandomItem() {
                var
                    firstName = nameList[Math.floor(Math.random() * 4)],
                    lastName = familyName[Math.floor(Math.random() * 4)],
                    age = Math.floor(Math.random() * 100) + 1,
                    email = firstName + lastName + '@whatever.com',
                    balance = Math.random() * 3000;

                return {
                    firstName: firstName,
                    lastName: lastName,
                    age: age,
                    email: email,
                    balance: balance
                };
            }
            var rowCollection = [];
            for (var j = 0; j < 200; j++) {
                rowCollection.push(createRandomItem());
            }
            $scope.myData = rowCollection;
            $scope.gridOptions = {
                data: 'myData'
            };
//            $scope.gridOptions = {
//                data: 'myData',
//                columnDefs : [
//                    { field:'id', width:50 },
//                    { field:'name', width:100, pinnedLeft:true },
//                    { field:'age', width:100, pinnedRight:true  },
//                    { field:'address.street', width:150  },
//                    { field:'address.city', width:150 },
//                    { field:'address.state', width:50 },
//                    { field:'address.zip', width:50 },
//                    { field:'company', width:100 },
//                    { field:'email', width:100 },
//                    { field:'phone', width:200 },
//                    { field:'about', width:300 },
//                    { field:'friends[0].name', displayName:'1st friend', width:150 },
//                    { field:'friends[1].name', displayName:'2nd friend', width:150 },
//                    { field:'friends[2].name', displayName:'3rd friend', width:150 }
//                ]
//            };
//
//            $http.get('https://rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
//                .success(function(data) {
//                    $scope.myData = data;
//                });
        }
    ]);
});
