/*global angular,alert,w5cValidator*/
(function () {
    "use strict";
    var app = angular.module("app", ["w5c.validator"]);
    /*
    参数配置如下
    名称 	     默认值 	   作用
    blurTrig 	 false 	   光标移除元素后是否验证并显示错误提示信息
    showError 	 true 	   可以是bool和function，每个元素验证不通过后调用该方法显示错误信息，默认true，显示错误信息在元素的后面。
    removeError  true 	   可以是bool和function，每个元素验证通过后调用该方法移除错误信息，默认true，验证通过后在元素的后面移除错误信息。
    */

    app.config(["w5cValidatorProvider", function (w5cValidatorProvider) {
        // 全局配置
        w5cValidatorProvider.config({
            blurTrig: false,
            showError: true,
            removeError: true
        });

        w5cValidatorProvider.setRules({
            email: {
                required: "输入的邮箱地址不能为空",
                email: "输入邮箱地址格式不正确"
            },
            username: {
                required: "输入的用户名不能为空",
                pattern: "用户名必须输入字母、数字、下划线,以字母开头",
                w5cuniquecheck:"输入用户名已经存在，请重新输入"
            },
            password: {
                required: "密码不能为空",
                minlength: "密码长度不能小于{minlength}",
                maxlength: "密码长度不能大于{maxlength}"
            },
            repeatPassword: {
                required: "重复密码不能为空",
                repeat: "两次密码输入不一致"
            },
            number: {
                required: "数字不能为空"
            }
        });
    }]);
    app.controller("validateCtrl", ["$scope", "$http", function ($scope) {
        $scope.saveEntity = function () {
            //do somethings for bz
            alert("Save Successfully!!!");
        };
        //每个表单的配置，如果不设置，默认和全局配置相同
        $scope.validateOptions = {
            blurTrig: true
        };
    }]);
})();