(function () {
    'use strict';
    (angular.module('ngDropdown', ['ng'])).directive('ngDropdown', [
        function () {
            return {
                restrict: 'A',
                scope: {
                    ngDropdown: '=ngDropdown',
                    ngTrigger: '=ngTrigger',
                    ngOption: '=ngOption'
                },
                link: function (scope, elem) {
                    $(elem).dropdown();
        
                    elem.on('change', function () {
                        var value = $(elem).find('input').val().split(',');
                        scope.$apply(function () {
                            scope.ngDropdown = value;
                        });
                        if (scope.ngTrigger) {
                            scope.ngTrigger(value);
                        }
                    });
                    
                    scope.$watch('ngDropdown', function (value) {
                        if (value) {
                            setTimeout(function () {
                                value = (value instanceof Array) ? value : [value];
                                $(elem).dropdown('set selected', value);
                            }, 500);
                        } else {
                            $(elem).dropdown('clear');
                        }
                    });
                    
                    scope.$watch('ngOption', function (obj) {
                        if (obj) {
                            $(elem).dropdown(obj);
                        }
                    });
                }
            };
        }]).directive('ngDropdown', [
        function () {
            return {
                restrict: 'E',
                scope: {
                    ngModel: '=ngModel',
                    ngOption: '=ngOption',
                    ngMultiple: '=ngMultiple',
                    ngChange: '=ngChange',
                    ngDisabled: '=ngDisabled',
                    ngAdditions: '=ngAdditions'
                },
                link: function (scope, elem, attrs) {
                    var optionsRender = false;
                    scope.setValue = function (value) {
                        if (optionsRender) {
                            var opts;
                            if (value instanceof Array) {
                                opts = value;
                            } else {
                                opts = value ? value.toString().split(',') : [];
                            }
                            var selected = [].map.call(opts, function (item) {
                                if (item) {
                                    return item.toString().trim();
                                }
                            });
                            $(elem).find('div.dropdown').dropdown('set selected', selected);
                        } else {
                            setTimeout(function () {
                                scope.setValue(value);
                            }, 500);
                        }
                    };
                    scope.$watch('ngOption', function (value) {
                        if (value) {
                            optionsRender = false;
                            var type = scope.ngMultiple ? ' fluid multiple search' : '';
                            var sleep = scope.ngMultiple ? 500 : 100;
                            var html = '';
                            html += '<div class="ui selection search' + type + ' dropdown sem_dropdown">';
                            html += '    <i class="dropdown icon" style="z-index: 0;"></i>';
                            html += '    <div class="default text"></div>';
                            html += '    <div class="menu">';
                            for (var key in value) {
                                html += '<div class="item"  style="font-size:14px ! important;" data-value="' + value[key].id + '">' + ((elem[0].dataset.label ? value[key][elem[0].dataset.label] : false) || value[key].value || value[key].name || '') + ' </div>';
                            }
                            html += '    </div>';
                            html += '</div>';
                            $(elem).html(html);
                            
                            var setChange;
                            var eventSet = function (result) {
                                scope.$apply(function () {
                                    scope.ngModel = result;
                                    /* jshint -W030 */
                                    scope.ngChange ? scope.ngChange(result) : '';
                                });
                            };
                            var valueChange = 0;
                            var additions = scope.ngAdditions ? scope.ngAdditions :false;
                            var apiConf = {
                                allowAdditions: additions,
                                onChange: function (result) {
                                    if (setChange) {
                                        clearTimeout(setChange);
                                    }
                                    setChange = setTimeout(function () {
                                        if(valueChange !== result){
                                            valueChange = result;
                                            eventSet(result);
                                        }
                                    }, sleep);
                                }
                            };
                            if(attrs.url){
                                apiConf['apiSettings'] =  {
                                    url: attrs.url
                                };
                            }
                            $(elem).find('div.dropdown').dropdown(apiConf);
                            
                            scope.setValue(scope.ngModel);
                            optionsRender = true;
                        }
                    });
                    scope.$watch('ngModel', function (value, oldValue) {
                        $(elem).find('div.dropdown').dropdown('clear');
                        if (value && (value !== oldValue)) {
                            scope.setValue(value);
                        }
                    });
                    scope.$watch('ngDisabled', function (value) {
                        if (value){
                            $(elem).find('div.dropdown').addClass('disabled');
                        } else {
                            $(elem).find('div.dropdown').removeClass('disabled');
                        }
                    });
                }
            };
        }]);
})(window, document);
