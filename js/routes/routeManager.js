
// AngularJs Module and Configurations
var woodcastle = angular.module('woodcastle', ['ngRoute','ngAnimate','localytics.directives','angular-clipboard','base64','rzModule','angularMoment']);
// Routes configurations
woodcastle.config(['$routeProvider','$httpProvider',
    function($routeProvider,$httpProvider) {
        $routeProvider
        .when('/bill', {
            templateUrl: 'templates/bill.html',
            controller: 'billController'
        })
        // Other  Routes
        .when('/menu', {
            templateUrl : 'templates/menu.html',
            controller : 'MainController'
        })
        // Other  Routes
        .when('/createBill', {
            templateUrl : 'templates/createBill.html',
            controller : 'createBillController'
        })
        // Other  Routes
        .when('/editBill', {
            templateUrl : 'templates/editBill',
            controller : 'editBillController'
        })
        // Other  Routes
        .when('/print', {
            templateUrl : 'templates/print.html',
            controller : 'printBillController'
        })
        .otherwise({
            redirectTo: '/menu'
        });
    }])
    