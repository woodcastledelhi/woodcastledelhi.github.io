/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 29 Oct 2015
 * @version 1.0
 */

// AngularJs directives

woodcastle.directive('activeLink', ['$location', function (location) {

    var mainPath = location.path()
    return {
        restrict: 'AEC',
        link: function (scope, element, attrs, controller) {
            var clazz = attrs.activeLink;
            var path = attrs.href;
            path = path.substring(1); //hack because path does not return including hashbang
            if (mainPath === path.slice(0, -1)) {
                if (mainPath === "/dashboard") {
                    scope.openSubSideBar("dashboardSection")
                } else if (mainPath === "/apis" || mainPath === "/create-API" || mainPath === "/choose-API-type" || mainPath === "/api-settings" || mainPath === "/edit-API") {
                    scope.openSubSideBar("APISection")
                } else if (mainPath === "/iams" || mainPath === "/attach" || mainPath === "/create-IAM") {
                    scope.openSubSideBar("IAMSection")
                } else if (mainPath === "/rules" || mainPath === "/rule-uploadJar" || mainPath === "/rule-attach" || mainPath === "/edit-rule") {
                    scope.openSubSideBar("RuleSection")
                } else if (mainPath === "/generate-code" ) {
                    scope.openSubSideBar("GenerateSection")
                } else if (mainPath === "/test-api-and-view-specs" ) {
                    scope.openSubSideBar("TestAndViewSection")
                } else if (mainPath === "/resource" || mainPath === "/create-resource" || mainPath === "/edit-resource") {
                    scope.openSubSideBar("ResourceSection")
                }else if (mainPath === "/projects" || mainPath === "/create-project" || mainPath === "/edit-project") {
                    scope.openSubSideBar("ProjectSection")
                }
                element.parent('li').parent('ul').parent('li').removeClass(clazz)
                element.parent('li').removeClass(clazz)
                element.parent('li').parent('ul').parent('li').addClass(clazz);
                element.parent('li').addClass(clazz);
            }
            scope.location = location;

            scope.$watch('location.path()', function (newPath) {
                if (path === newPath) {
                    element.parent('li').parent('ul').parent('li').removeClass(clazz)
                    element.parent('li').removeClass(clazz)
                    element.parent('li').parent('ul').parent('li').addClass(clazz);
                    element.parent('li').addClass(clazz);
                }
            });
        }
    };
}]);

woodcastle.directive('onlyDigits', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            function inputValue(val) {
                if (val) {
                    var digits = val.replace(/[^0-9]/g, '');
                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return parseInt(digits,10);
                }
                return undefined;
            }            
            ctrl.$parsers.push(inputValue);
        }
    };
});

woodcastle.directive('onlyDigitsfailure', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            function inputValue(val) {
                if (val) {
                    var digits = val.replace(/[^0-9]/g, '');
                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return parseInt(digits,10);
                }
                return undefined;
            }            
            ctrl.$parsers.push(inputValue);
        }
    };
});

woodcastle.directive('onlyVersion', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            function inputValue(val) {
                if (val) {
                    var digits = val.replace(/[^0-9.]/g, '');
                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return digits;
                }
                return undefined;
            }            
            ctrl.$parsers.push(inputValue);
        }
    };
});

woodcastle.directive('onlyFloats', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            function inputValue(val) {
                if (val) {
                    var digits = val.replace(/[^0-9.]/g, '');
                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return digits;
                }
                return undefined;
            }            
            ctrl.$parsers.push(inputValue);
        }
    };
});

woodcastle.directive('noSpace', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            function inputValue(val) {
                if (val) {
                    var digits = val.split(' ').join('');
                    ctrl.$setViewValue(digits);
                    ctrl.$render();
//                    if (digits !== val) {
//                        ctrl.$setViewValue(digits);
//                        ctrl.$render();
//                    }
                    return digits
                }
                return undefined;
            }            
            ctrl.$parsers.push(inputValue);
        }
    };
});


woodcastle.directive('icheck', ['$timeout', function($timeout){
    return {
        require: 'ngModel',
        link: function($scope, element, $attrs, ngModel) {
            return $timeout(function() {
                var value = $attrs['value'];

                $scope.$watch($attrs['ngModel'], function(newValue){
                    $(element).iCheck('update');
                })

                return $(element).iCheck({
                    checkboxClass: 'icheckbox_flat-blue',
                    radioClass: 'iradio_flat-blue'
                }).on('ifChanged', function(event) {
                    if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                        $scope.$apply(function() {
                            return ngModel.$setViewValue(event.target.checked);
                        });
                    }
                    if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                        return $scope.$apply(function() {
                            return ngModel.$setViewValue(value);
                        });
                    }
                });
            });
        }
    };
}]);