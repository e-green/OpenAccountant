"use strict";
angular.module("ui.bootstrap", ["ui.bootstrap.tpls", "ui.bootstrap.transition", "ui.bootstrap.collapse", "ui.bootstrap.accordion", "ui.bootstrap.alert", "ui.bootstrap.bindHtml", "ui.bootstrap.buttons", "ui.bootstrap.carousel", "ui.bootstrap.position", "ui.bootstrap.datepicker", "ui.bootstrap.dropdownToggle", "ui.bootstrap.modal", "ui.bootstrap.pagination", "ui.bootstrap.tooltip", "ui.bootstrap.popover", "ui.bootstrap.progressbar", "ui.bootstrap.rating", "ui.bootstrap.tabs", "ui.bootstrap.timepicker", "ui.bootstrap.typeahead"]), angular.module("ui.bootstrap.tpls", ["template/accordion/accordion-group.html", "template/accordion/accordion.html", "template/alert/alert.html", "template/carousel/carousel.html", "template/carousel/slide.html", "template/datepicker/datepicker.html", "template/datepicker/popup.html", "template/modal/backdrop.html", "template/modal/window.html", "template/pagination/pager.html", "template/pagination/pagination.html", "template/tooltip/tooltip-html-unsafe-popup.html", "template/tooltip/tooltip-popup.html", "template/popover/popover.html", "template/progressbar/bar.html", "template/progressbar/progress.html", "template/progressbar/progressbar.html", "template/rating/rating.html", "template/tabs/tab.html", "template/tabs/tabset.html", "template/timepicker/timepicker.html", "template/typeahead/typeahead-match.html", "template/typeahead/typeahead-popup.html"]), angular.module("ui.bootstrap.transition", []).factory("$transition", ["$q", "$timeout", "$rootScope", function ($q, $timeout, $rootScope) {
    function findEndEventName(endEventNames) {
        for (var name in endEventNames)if (void 0 !== transElement.style[name])return endEventNames[name]
    }

    var $transition = function (element, trigger, options) {
        options = options || {};
        var deferred = $q.defer(), endEventName = $transition[options.animation ? "animationEndEventName" : "transitionEndEventName"], transitionEndHandler = function () {
            $rootScope.$apply(function () {
                element.unbind(endEventName, transitionEndHandler), deferred.resolve(element)
            })
        };
        return endEventName && element.bind(endEventName, transitionEndHandler), $timeout(function () {
            angular.isString(trigger) ? element.addClass(trigger) : angular.isFunction(trigger) ? trigger(element) : angular.isObject(trigger) && element.css(trigger), endEventName || deferred.resolve(element)
        }), deferred.promise.cancel = function () {
            endEventName && element.unbind(endEventName, transitionEndHandler), deferred.reject("Transition cancelled")
        }, deferred.promise
    }, transElement = document.createElement("trans"), transitionEndEventNames = {WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd", transition: "transitionend"}, animationEndEventNames = {WebkitTransition: "webkitAnimationEnd", MozTransition: "animationend", OTransition: "oAnimationEnd", transition: "animationend"};
    return $transition.transitionEndEventName = findEndEventName(transitionEndEventNames), $transition.animationEndEventName = findEndEventName(animationEndEventNames), $transition
}]), angular.module("ui.bootstrap.collapse", ["ui.bootstrap.transition"]).directive("collapse", ["$transition", function ($transition) {
    return{link: function (scope, element, attrs) {
        function doTransition(change) {
            function newTransitionDone() {
                currentTransition === newTransition && (currentTransition = void 0)
            }

            var newTransition = $transition(element, change);
            return currentTransition && currentTransition.cancel(), currentTransition = newTransition, newTransition.then(newTransitionDone, newTransitionDone), newTransition
        }

        function expand() {
            initialAnimSkip ? (initialAnimSkip = !1, expandDone()) : (element.removeClass("collapse").addClass("collapsing"), doTransition({height: element[0].scrollHeight + "px"}).then(expandDone))
        }

        function expandDone() {
            element.removeClass("collapsing"), element.addClass("collapse in"), element.css({height: "auto"})
        }

        function collapse() {
            if (initialAnimSkip)initialAnimSkip = !1, collapseDone(), element.css({height: 0}); else {
                element.css({height: element[0].scrollHeight + "px"});
                {
                    element[0].offsetWidth
                }
                element.removeClass("collapse in").addClass("collapsing"), doTransition({height: 0}).then(collapseDone)
            }
        }

        function collapseDone() {
            element.removeClass("collapsing"), element.addClass("collapse")
        }

        var currentTransition, initialAnimSkip = !0;
        scope.$watch(attrs.collapse, function (shouldCollapse) {
            shouldCollapse ? collapse() : expand()
        })
    }}
}]), angular.module("ui.bootstrap.accordion", ["ui.bootstrap.collapse"]).constant("accordionConfig", {closeOthers: !0}).controller("AccordionController", ["$scope", "$attrs", "accordionConfig", function ($scope, $attrs, accordionConfig) {
    this.groups = [], this.closeOthers = function (openGroup) {
        var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
        closeOthers && angular.forEach(this.groups, function (group) {
            group !== openGroup && (group.isOpen = !1)
        })
    }, this.addGroup = function (groupScope) {
        var that = this;
        this.groups.push(groupScope), groupScope.$on("$destroy", function () {
            that.removeGroup(groupScope)
        })
    }, this.removeGroup = function (group) {
        var index = this.groups.indexOf(group);
        -1 !== index && this.groups.splice(this.groups.indexOf(group), 1)
    }
}]).directive("accordion", function () {
    return{restrict: "EA", controller: "AccordionController", transclude: !0, replace: !1, templateUrl: "template/accordion/accordion.html"}
}).directive("accordionGroup", ["$parse", function ($parse) {
    return{require: "^accordion", restrict: "EA", transclude: !0, replace: !0, templateUrl: "template/accordion/accordion-group.html", scope: {heading: "@"}, controller: function () {
        this.setHeading = function (element) {
            this.heading = element
        }
    }, link: function (scope, element, attrs, accordionCtrl) {
        var getIsOpen, setIsOpen;
        accordionCtrl.addGroup(scope), scope.isOpen = !1, attrs.isOpen && (getIsOpen = $parse(attrs.isOpen), setIsOpen = getIsOpen.assign, scope.$parent.$watch(getIsOpen, function (value) {
            scope.isOpen = !!value
        })), scope.$watch("isOpen", function (value) {
            value && accordionCtrl.closeOthers(scope), setIsOpen && setIsOpen(scope.$parent, value)
        })
    }}
}]).directive("accordionHeading", function () {
    return{restrict: "EA", transclude: !0, template: "", replace: !0, require: "^accordionGroup", compile: function (element, attr, transclude) {
        return function (scope, element, attr, accordionGroupCtrl) {
            accordionGroupCtrl.setHeading(transclude(scope, function () {
            }))
        }
    }}
}).directive("accordionTransclude", function () {
    return{require: "^accordionGroup", link: function (scope, element, attr, controller) {
        scope.$watch(function () {
            return controller[attr.accordionTransclude]
        }, function (heading) {
            heading && (element.html(""), element.append(heading))
        })
    }}
}), angular.module("ui.bootstrap.alert", []).controller("AlertController", ["$scope", "$attrs", function ($scope, $attrs) {
    $scope.closeable = "close"in $attrs
}]).directive("alert", function () {
    return{restrict: "EA", controller: "AlertController", templateUrl: "template/alert/alert.html", transclude: !0, replace: !0, scope: {type: "=", close: "&"}}
}), angular.module("ui.bootstrap.bindHtml", []).directive("bindHtmlUnsafe", function () {
    return function (scope, element, attr) {
        element.addClass("ng-binding").data("$binding", attr.bindHtmlUnsafe), scope.$watch(attr.bindHtmlUnsafe, function (value) {
            element.html(value || "")
        })
    }
}), angular.module("ui.bootstrap.buttons", []).constant("buttonConfig", {activeClass: "active", toggleEvent: "click"}).controller("ButtonsController", ["buttonConfig", function (buttonConfig) {
    this.activeClass = buttonConfig.activeClass || "active", this.toggleEvent = buttonConfig.toggleEvent || "click"
}]).directive("btnRadio", function () {
    return{require: ["btnRadio", "ngModel"], controller: "ButtonsController", link: function (scope, element, attrs, ctrls) {
        var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];
        ngModelCtrl.$render = function () {
            element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.btnRadio)))
        }, element.bind(buttonsCtrl.toggleEvent, function () {
            element.hasClass(buttonsCtrl.activeClass) || scope.$apply(function () {
                ngModelCtrl.$setViewValue(scope.$eval(attrs.btnRadio)), ngModelCtrl.$render()
            })
        })
    }}
}).directive("btnCheckbox", function () {
    return{require: ["btnCheckbox", "ngModel"], controller: "ButtonsController", link: function (scope, element, attrs, ctrls) {
        function getTrueValue() {
            return getCheckboxValue(attrs.btnCheckboxTrue, !0)
        }

        function getFalseValue() {
            return getCheckboxValue(attrs.btnCheckboxFalse, !1)
        }

        function getCheckboxValue(attributeValue, defaultValue) {
            var val = scope.$eval(attributeValue);
            return angular.isDefined(val) ? val : defaultValue
        }

        var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];
        ngModelCtrl.$render = function () {
            element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, getTrueValue()))
        }, element.bind(buttonsCtrl.toggleEvent, function () {
            scope.$apply(function () {
                ngModelCtrl.$setViewValue(element.hasClass(buttonsCtrl.activeClass) ? getFalseValue() : getTrueValue()), ngModelCtrl.$render()
            })
        })
    }}
}), angular.module("ui.bootstrap.carousel", ["ui.bootstrap.transition"]).controller("CarouselController", ["$scope", "$timeout", "$transition", "$q", function ($scope, $timeout, $transition) {
    function restartTimer() {
        resetTimer();
        var interval = +$scope.interval;
        !isNaN(interval) && interval >= 0 && (currentTimeout = $timeout(timerFn, interval))
    }

    function resetTimer() {
        currentTimeout && ($timeout.cancel(currentTimeout), currentTimeout = null)
    }

    function timerFn() {
        isPlaying ? ($scope.next(), restartTimer()) : $scope.pause()
    }

    var currentTimeout, isPlaying, self = this, slides = self.slides = [], currentIndex = -1;
    self.currentSlide = null;
    var destroyed = !1;
    self.select = function (nextSlide, direction) {
        function goNext() {
            if (!destroyed) {
                if (self.currentSlide && angular.isString(direction) && !$scope.noTransition && nextSlide.$element) {
                    nextSlide.$element.addClass(direction);
                    {
                        nextSlide.$element[0].offsetWidth
                    }
                    angular.forEach(slides, function (slide) {
                        angular.extend(slide, {direction: "", entering: !1, leaving: !1, active: !1})
                    }), angular.extend(nextSlide, {direction: direction, active: !0, entering: !0}), angular.extend(self.currentSlide || {}, {direction: direction, leaving: !0}), $scope.$currentTransition = $transition(nextSlide.$element, {}), function (next, current) {
                        $scope.$currentTransition.then(function () {
                            transitionDone(next, current)
                        }, function () {
                            transitionDone(next, current)
                        })
                    }(nextSlide, self.currentSlide)
                } else transitionDone(nextSlide, self.currentSlide);
                self.currentSlide = nextSlide, currentIndex = nextIndex, restartTimer()
            }
        }

        function transitionDone(next, current) {
            angular.extend(next, {direction: "", active: !0, leaving: !1, entering: !1}), angular.extend(current || {}, {direction: "", active: !1, leaving: !1, entering: !1}), $scope.$currentTransition = null
        }

        var nextIndex = slides.indexOf(nextSlide);
        void 0 === direction && (direction = nextIndex > currentIndex ? "next" : "prev"), nextSlide && nextSlide !== self.currentSlide && ($scope.$currentTransition ? ($scope.$currentTransition.cancel(), $timeout(goNext)) : goNext())
    }, $scope.$on("$destroy", function () {
        destroyed = !0
    }), self.indexOfSlide = function (slide) {
        return slides.indexOf(slide)
    }, $scope.next = function () {
        var newIndex = (currentIndex + 1) % slides.length;
        return $scope.$currentTransition ? void 0 : self.select(slides[newIndex], "next")
    }, $scope.prev = function () {
        var newIndex = 0 > currentIndex - 1 ? slides.length - 1 : currentIndex - 1;
        return $scope.$currentTransition ? void 0 : self.select(slides[newIndex], "prev")
    }, $scope.select = function (slide) {
        self.select(slide)
    }, $scope.isActive = function (slide) {
        return self.currentSlide === slide
    }, $scope.slides = function () {
        return slides
    }, $scope.$watch("interval", restartTimer), $scope.$on("$destroy", resetTimer), $scope.play = function () {
        isPlaying || (isPlaying = !0, restartTimer())
    }, $scope.pause = function () {
        $scope.noPause || (isPlaying = !1, resetTimer())
    }, self.addSlide = function (slide, element) {
        slide.$element = element, slides.push(slide), 1 === slides.length || slide.active ? (self.select(slides[slides.length - 1]), 1 == slides.length && $scope.play()) : slide.active = !1
    }, self.removeSlide = function (slide) {
        var index = slides.indexOf(slide);
        slides.splice(index, 1), slides.length > 0 && slide.active ? self.select(index >= slides.length ? slides[index - 1] : slides[index]) : currentIndex > index && currentIndex--
    }
}]).directive("carousel", [function () {
    return{restrict: "EA", transclude: !0, replace: !0, controller: "CarouselController", require: "carousel", templateUrl: "template/carousel/carousel.html", scope: {interval: "=", noTransition: "=", noPause: "="}}
}]).directive("slide", ["$parse", function ($parse) {
    return{require: "^carousel", restrict: "EA", transclude: !0, replace: !0, templateUrl: "template/carousel/slide.html", scope: {}, link: function (scope, element, attrs, carouselCtrl) {
        if (attrs.active) {
            var getActive = $parse(attrs.active), setActive = getActive.assign, lastValue = scope.active = getActive(scope.$parent);
            scope.$watch(function () {
                var parentActive = getActive(scope.$parent);
                return parentActive !== scope.active && (parentActive !== lastValue ? lastValue = scope.active = parentActive : setActive(scope.$parent, parentActive = lastValue = scope.active)), parentActive
            })
        }
        carouselCtrl.addSlide(scope, element), scope.$on("$destroy", function () {
            carouselCtrl.removeSlide(scope)
        }), scope.$watch("active", function (active) {
            active && carouselCtrl.select(scope)
        })
    }}
}]), angular.module("ui.bootstrap.position", []).factory("$position", ["$document", "$window", function ($document, $window) {
    function getStyle(el, cssprop) {
        return el.currentStyle ? el.currentStyle[cssprop] : $window.getComputedStyle ? $window.getComputedStyle(el)[cssprop] : el.style[cssprop]
    }

    function isStaticPositioned(element) {
        return"static" === (getStyle(element, "position") || "static")
    }

    var parentOffsetEl = function (element) {
        for (var docDomEl = $document[0], offsetParent = element.offsetParent || docDomEl; offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent);)offsetParent = offsetParent.offsetParent;
        return offsetParent || docDomEl
    };
    return{position: function (element) {
        var elBCR = this.offset(element), offsetParentBCR = {top: 0, left: 0}, offsetParentEl = parentOffsetEl(element[0]);
        offsetParentEl != $document[0] && (offsetParentBCR = this.offset(angular.element(offsetParentEl)), offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop, offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft);
        var boundingClientRect = element[0].getBoundingClientRect();
        return{width: boundingClientRect.width || element.prop("offsetWidth"), height: boundingClientRect.height || element.prop("offsetHeight"), top: elBCR.top - offsetParentBCR.top, left: elBCR.left - offsetParentBCR.left}
    }, offset: function (element) {
        var boundingClientRect = element[0].getBoundingClientRect();
        return{width: boundingClientRect.width || element.prop("offsetWidth"), height: boundingClientRect.height || element.prop("offsetHeight"), top: boundingClientRect.top + ($window.pageYOffset || $document[0].body.scrollTop || $document[0].documentElement.scrollTop), left: boundingClientRect.left + ($window.pageXOffset || $document[0].body.scrollLeft || $document[0].documentElement.scrollLeft)}
    }}
}]), angular.module("ui.bootstrap.datepicker", ["ui.bootstrap.position"]).constant("datepickerConfig", {dayFormat: "dd", monthFormat: "MMMM", yearFormat: "yyyy", dayHeaderFormat: "EEE", dayTitleFormat: "MMMM yyyy", monthTitleFormat: "yyyy", showWeeks: !0, startingDay: 0, yearRange: 20, minDate: null, maxDate: null}).controller("DatepickerController", ["$scope", "$attrs", "dateFilter", "datepickerConfig", function ($scope, $attrs, dateFilter, dtConfig) {
    function getValue(value, defaultValue) {
        return angular.isDefined(value) ? $scope.$parent.$eval(value) : defaultValue
    }

    function getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate()
    }

    function getDates(startDate, n) {
        for (var dates = new Array(n), current = startDate, i = 0; n > i;)dates[i++] = new Date(current), current.setDate(current.getDate() + 1);
        return dates
    }

    function makeDate(date, format, isSelected, isSecondary) {
        return{date: date, label: dateFilter(date, format), selected: !!isSelected, secondary: !!isSecondary}
    }

    var format = {day: getValue($attrs.dayFormat, dtConfig.dayFormat), month: getValue($attrs.monthFormat, dtConfig.monthFormat), year: getValue($attrs.yearFormat, dtConfig.yearFormat), dayHeader: getValue($attrs.dayHeaderFormat, dtConfig.dayHeaderFormat), dayTitle: getValue($attrs.dayTitleFormat, dtConfig.dayTitleFormat), monthTitle: getValue($attrs.monthTitleFormat, dtConfig.monthTitleFormat)}, startingDay = getValue($attrs.startingDay, dtConfig.startingDay), yearRange = getValue($attrs.yearRange, dtConfig.yearRange);
    this.minDate = dtConfig.minDate ? new Date(dtConfig.minDate) : null, this.maxDate = dtConfig.maxDate ? new Date(dtConfig.maxDate) : null, this.modes = [
        {name: "day", getVisibleDates: function (date, selected) {
            var year = date.getFullYear(), month = date.getMonth(), firstDayOfMonth = new Date(year, month, 1), difference = startingDay - firstDayOfMonth.getDay(), numDisplayedFromPreviousMonth = difference > 0 ? 7 - difference : -difference, firstDate = new Date(firstDayOfMonth), numDates = 0;
            numDisplayedFromPreviousMonth > 0 && (firstDate.setDate(-numDisplayedFromPreviousMonth + 1), numDates += numDisplayedFromPreviousMonth), numDates += getDaysInMonth(year, month + 1), numDates += (7 - numDates % 7) % 7;
            for (var days = getDates(firstDate, numDates), labels = new Array(7), i = 0; numDates > i; i++) {
                var dt = new Date(days[i]);
                days[i] = makeDate(dt, format.day, selected && selected.getDate() === dt.getDate() && selected.getMonth() === dt.getMonth() && selected.getFullYear() === dt.getFullYear(), dt.getMonth() !== month)
            }
            for (var j = 0; 7 > j; j++)labels[j] = dateFilter(days[j].date, format.dayHeader);
            return{objects: days, title: dateFilter(date, format.dayTitle), labels: labels}
        }, compare: function (date1, date2) {
            return new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) - new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())
        }, split: 7, step: {months: 1}},
        {name: "month", getVisibleDates: function (date, selected) {
            for (var months = new Array(12), year = date.getFullYear(), i = 0; 12 > i; i++) {
                var dt = new Date(year, i, 1);
                months[i] = makeDate(dt, format.month, selected && selected.getMonth() === i && selected.getFullYear() === year)
            }
            return{objects: months, title: dateFilter(date, format.monthTitle)}
        }, compare: function (date1, date2) {
            return new Date(date1.getFullYear(), date1.getMonth()) - new Date(date2.getFullYear(), date2.getMonth())
        }, split: 3, step: {years: 1}},
        {name: "year", getVisibleDates: function (date, selected) {
            for (var years = new Array(yearRange), year = date.getFullYear(), startYear = parseInt((year - 1) / yearRange, 10) * yearRange + 1, i = 0; yearRange > i; i++) {
                var dt = new Date(startYear + i, 0, 1);
                years[i] = makeDate(dt, format.year, selected && selected.getFullYear() === dt.getFullYear())
            }
            return{objects: years, title: [years[0].label, years[yearRange - 1].label].join(" - ")}
        }, compare: function (date1, date2) {
            return date1.getFullYear() - date2.getFullYear()
        }, split: 5, step: {years: yearRange}}
    ], this.isDisabled = function (date, mode) {
        var currentMode = this.modes[mode || 0];
        return this.minDate && currentMode.compare(date, this.minDate) < 0 || this.maxDate && currentMode.compare(date, this.maxDate) > 0 || $scope.dateDisabled && $scope.dateDisabled({date: date, mode: currentMode.name})
    }
}]).directive("datepicker", ["dateFilter", "$parse", "datepickerConfig", "$log", function (dateFilter, $parse, datepickerConfig, $log) {
    return{restrict: "EA", replace: !0, templateUrl: "template/datepicker/datepicker.html", scope: {dateDisabled: "&"}, require: ["datepicker", "?^ngModel"], controller: "DatepickerController", link: function (scope, element, attrs, ctrls) {
        function updateShowWeekNumbers() {
            scope.showWeekNumbers = 0 === mode && showWeeks
        }

        function split(arr, size) {
            for (var arrays = []; arr.length > 0;)arrays.push(arr.splice(0, size));
            return arrays
        }

        function refill(updateSelected) {
            var date = null, valid = !0;
            ngModel.$modelValue && (date = new Date(ngModel.$modelValue), isNaN(date) ? (valid = !1, $log.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')) : updateSelected && (selected = date)), ngModel.$setValidity("date", valid);
            var currentMode = datepickerCtrl.modes[mode], data = currentMode.getVisibleDates(selected, date);
            angular.forEach(data.objects, function (obj) {
                obj.disabled = datepickerCtrl.isDisabled(obj.date, mode)
            }), ngModel.$setValidity("date-disabled", !date || !datepickerCtrl.isDisabled(date)), scope.rows = split(data.objects, currentMode.split), scope.labels = data.labels || [], scope.title = data.title
        }

        function setMode(value) {
            mode = value, updateShowWeekNumbers(), refill()
        }

        function getISO8601WeekNumber(date) {
            var checkDate = new Date(date);
            checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
            var time = checkDate.getTime();
            return checkDate.setMonth(0), checkDate.setDate(1), Math.floor(Math.round((time - checkDate) / 864e5) / 7) + 1
        }

        var datepickerCtrl = ctrls[0], ngModel = ctrls[1];
        if (ngModel) {
            var mode = 0, selected = new Date, showWeeks = datepickerConfig.showWeeks;
            attrs.showWeeks ? scope.$parent.$watch($parse(attrs.showWeeks), function (value) {
                showWeeks = !!value, updateShowWeekNumbers()
            }) : updateShowWeekNumbers(), attrs.min && scope.$parent.$watch($parse(attrs.min), function (value) {
                datepickerCtrl.minDate = value ? new Date(value) : null, refill()
            }), attrs.max && scope.$parent.$watch($parse(attrs.max), function (value) {
                datepickerCtrl.maxDate = value ? new Date(value) : null, refill()
            }), ngModel.$render = function () {
                refill(!0)
            }, scope.select = function (date) {
                if (0 === mode) {
                    var dt = ngModel.$modelValue ? new Date(ngModel.$modelValue) : new Date(0, 0, 0, 0, 0, 0, 0);
                    dt.setFullYear(date.getFullYear(), date.getMonth(), date.getDate()), ngModel.$setViewValue(dt), refill(!0)
                } else selected = date, setMode(mode - 1)
            }, scope.move = function (direction) {
                var step = datepickerCtrl.modes[mode].step;
                selected.setMonth(selected.getMonth() + direction * (step.months || 0)), selected.setFullYear(selected.getFullYear() + direction * (step.years || 0)), refill()
            }, scope.toggleMode = function () {
                setMode((mode + 1) % datepickerCtrl.modes.length)
            }, scope.getWeekNumber = function (row) {
                return 0 === mode && scope.showWeekNumbers && 7 === row.length ? getISO8601WeekNumber(row[0].date) : null
            }
        }
    }}
}]).constant("datepickerPopupConfig", {dateFormat: "yyyy-MM-dd", currentText: "Today", toggleWeeksText: "Weeks", clearText: "Clear", closeText: "Done", closeOnDateSelection: !0, appendToBody: !1, showButtonBar: !0}).directive("datepickerPopup", ["$compile", "$parse", "$document", "$position", "dateFilter", "datepickerPopupConfig", "datepickerConfig", function ($compile, $parse, $document, $position, dateFilter, datepickerPopupConfig, datepickerConfig) {
    return{restrict: "EA", require: "ngModel", link: function (originalScope, element, attrs, ngModel) {
        function setOpen(value) {
            setIsOpen ? setIsOpen(originalScope, !!value) : scope.isOpen = !!value
        }

        function parseDate(viewValue) {
            if (viewValue) {
                if (angular.isDate(viewValue))return ngModel.$setValidity("date", !0), viewValue;
                if (angular.isString(viewValue)) {
                    var date = new Date(viewValue);
                    return isNaN(date) ? void ngModel.$setValidity("date", !1) : (ngModel.$setValidity("date", !0), date)
                }
                return void ngModel.$setValidity("date", !1)
            }
            return ngModel.$setValidity("date", !0), null
        }

        function addWatchableAttribute(attribute, scopeProperty, datepickerAttribute) {
            attribute && (originalScope.$watch($parse(attribute), function (value) {
                scope[scopeProperty] = value
            }), datepickerEl.attr(datepickerAttribute || scopeProperty, scopeProperty))
        }

        function updatePosition() {
            scope.position = appendToBody ? $position.offset(element) : $position.position(element), scope.position.top = scope.position.top + element.prop("offsetHeight")
        }

        var dateFormat, scope = originalScope.$new(), closeOnDateSelection = angular.isDefined(attrs.closeOnDateSelection) ? originalScope.$eval(attrs.closeOnDateSelection) : datepickerPopupConfig.closeOnDateSelection, appendToBody = angular.isDefined(attrs.datepickerAppendToBody) ? originalScope.$eval(attrs.datepickerAppendToBody) : datepickerPopupConfig.appendToBody;
        attrs.$observe("datepickerPopup", function (value) {
            dateFormat = value || datepickerPopupConfig.dateFormat, ngModel.$render()
        }), scope.showButtonBar = angular.isDefined(attrs.showButtonBar) ? originalScope.$eval(attrs.showButtonBar) : datepickerPopupConfig.showButtonBar, originalScope.$on("$destroy", function () {
            $popup.remove(), scope.$destroy()
        }), attrs.$observe("currentText", function (text) {
            scope.currentText = angular.isDefined(text) ? text : datepickerPopupConfig.currentText
        }), attrs.$observe("toggleWeeksText", function (text) {
            scope.toggleWeeksText = angular.isDefined(text) ? text : datepickerPopupConfig.toggleWeeksText
        }), attrs.$observe("clearText", function (text) {
            scope.clearText = angular.isDefined(text) ? text : datepickerPopupConfig.clearText
        }), attrs.$observe("closeText", function (text) {
            scope.closeText = angular.isDefined(text) ? text : datepickerPopupConfig.closeText
        });
        var getIsOpen, setIsOpen;
        attrs.isOpen && (getIsOpen = $parse(attrs.isOpen), setIsOpen = getIsOpen.assign, originalScope.$watch(getIsOpen, function (value) {
            scope.isOpen = !!value
        })), scope.isOpen = getIsOpen ? getIsOpen(originalScope) : !1;
        var documentClickBind = function (event) {
            scope.isOpen && event.target !== element[0] && scope.$apply(function () {
                setOpen(!1)
            })
        }, elementFocusBind = function () {
            scope.$apply(function () {
                setOpen(!0)
            })
        }, popupEl = angular.element("<div datepicker-popup-wrap><div datepicker></div></div>");
        popupEl.attr({"ng-model": "date", "ng-change": "dateSelection()"});
        var datepickerEl = angular.element(popupEl.children()[0]), datepickerOptions = {};
        attrs.datepickerOptions && (datepickerOptions = originalScope.$eval(attrs.datepickerOptions), datepickerEl.attr(angular.extend({}, datepickerOptions))), ngModel.$parsers.unshift(parseDate), scope.dateSelection = function (dt) {
            angular.isDefined(dt) && (scope.date = dt), ngModel.$setViewValue(scope.date), ngModel.$render(), closeOnDateSelection && setOpen(!1)
        }, element.bind("input change keyup", function () {
            scope.$apply(function () {
                scope.date = ngModel.$modelValue
            })
        }), ngModel.$render = function () {
            var date = ngModel.$viewValue ? dateFilter(ngModel.$viewValue, dateFormat) : "";
            element.val(date), scope.date = ngModel.$modelValue
        }, addWatchableAttribute(attrs.min, "min"), addWatchableAttribute(attrs.max, "max"), attrs.showWeeks ? addWatchableAttribute(attrs.showWeeks, "showWeeks", "show-weeks") : (scope.showWeeks = "show-weeks"in datepickerOptions ? datepickerOptions["show-weeks"] : datepickerConfig.showWeeks, datepickerEl.attr("show-weeks", "showWeeks")), attrs.dateDisabled && datepickerEl.attr("date-disabled", attrs.dateDisabled);
        var documentBindingInitialized = !1, elementFocusInitialized = !1;
        scope.$watch("isOpen", function (value) {
            value ? (updatePosition(), $document.bind("click", documentClickBind), elementFocusInitialized && element.unbind("focus", elementFocusBind), element[0].focus(), documentBindingInitialized = !0) : (documentBindingInitialized && $document.unbind("click", documentClickBind), element.bind("focus", elementFocusBind), elementFocusInitialized = !0), setIsOpen && setIsOpen(originalScope, value)
        }), scope.today = function () {
            scope.dateSelection(new Date)
        }, scope.clear = function () {
            scope.dateSelection(null)
        };
        var $popup = $compile(popupEl)(scope);
        appendToBody ? $document.find("body").append($popup) : element.after($popup)
    }}
}]).directive("datepickerPopupWrap", function () {
    return{restrict: "EA", replace: !0, transclude: !0, templateUrl: "template/datepicker/popup.html", link: function (scope, element) {
        element.bind("click", function (event) {
            event.preventDefault(), event.stopPropagation()
        })
    }}
}), angular.module("ui.bootstrap.dropdownToggle", []).directive("dropdownToggle", ["$document", "$location", function ($document) {
    var openElement = null, closeMenu = angular.noop;
    return{restrict: "CA", link: function (scope, element) {
        scope.$watch("$location.path", function () {
            closeMenu()
        }), element.parent().bind("click", function () {
            closeMenu()
        }), element.bind("click", function (event) {
            var elementWasOpen = element === openElement;
            event.preventDefault(), event.stopPropagation(), openElement && closeMenu(), elementWasOpen || element.hasClass("disabled") || element.prop("disabled") || (element.parent().addClass("open"), openElement = element, closeMenu = function (event) {
                event && (event.preventDefault(), event.stopPropagation()), $document.unbind("click", closeMenu), element.parent().removeClass("open"), closeMenu = angular.noop, openElement = null
            }, $document.bind("click", closeMenu))
        })
    }}
}]), angular.module("ui.bootstrap.modal", ["ui.bootstrap.transition"]).factory("$$stackedMap", function () {
    return{createNew: function () {
        var stack = [];
        return{add: function (key, value) {
            stack.push({key: key, value: value})
        }, get: function (key) {
            for (var i = 0; i < stack.length; i++)if (key == stack[i].key)return stack[i]
        }, keys: function () {
            for (var keys = [], i = 0; i < stack.length; i++)keys.push(stack[i].key);
            return keys
        }, top: function () {
            return stack[stack.length - 1]
        }, remove: function (key) {
            for (var idx = -1, i = 0; i < stack.length; i++)if (key == stack[i].key) {
                idx = i;
                break
            }
            return stack.splice(idx, 1)[0]
        }, removeTop: function () {
            return stack.splice(stack.length - 1, 1)[0]
        }, length: function () {
            return stack.length
        }}
    }}
}).directive("modalBackdrop", ["$timeout", function ($timeout) {
    return{restrict: "EA", replace: !0, templateUrl: "template/modal/backdrop.html", link: function (scope) {
        scope.animate = !1, $timeout(function () {
            scope.animate = !0
        })
    }}
}]).directive("modalWindow", ["$modalStack", "$timeout", function ($modalStack, $timeout) {
    return{restrict: "EA", scope: {index: "@", animate: "="}, replace: !0, transclude: !0, templateUrl: "template/modal/window.html", link: function (scope, element, attrs) {
        scope.windowClass = attrs.windowClass || "", $timeout(function () {
            scope.animate = !0, element[0].focus()
        }), scope.close = function (evt) {
            var modal = $modalStack.getTop();
            modal && modal.value.backdrop && "static" != modal.value.backdrop && evt.target === evt.currentTarget && (evt.preventDefault(), evt.stopPropagation(), $modalStack.dismiss(modal.key, "backdrop click"))
        }
    }}
}]).factory("$modalStack", ["$transition", "$timeout", "$document", "$compile", "$rootScope", "$$stackedMap", function ($transition, $timeout, $document, $compile, $rootScope, $$stackedMap) {
    function backdropIndex() {
        for (var topBackdropIndex = -1, opened = openedWindows.keys(), i = 0; i < opened.length; i++)openedWindows.get(opened[i]).value.backdrop && (topBackdropIndex = i);
        return topBackdropIndex
    }

    function removeModalWindow(modalInstance) {
        var body = $document.find("body").eq(0), modalWindow = openedWindows.get(modalInstance).value;
        openedWindows.remove(modalInstance), removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, 300, checkRemoveBackdrop), body.toggleClass(OPENED_MODAL_CLASS, openedWindows.length() > 0)
    }

    function checkRemoveBackdrop() {
        if (backdropDomEl && -1 == backdropIndex()) {
            var backdropScopeRef = backdropScope;
            removeAfterAnimate(backdropDomEl, backdropScope, 150, function () {
                backdropScopeRef.$destroy(), backdropScopeRef = null
            }), backdropDomEl = void 0, backdropScope = void 0
        }
    }

    function removeAfterAnimate(domEl, scope, emulateTime, done) {
        function afterAnimating() {
            afterAnimating.done || (afterAnimating.done = !0, domEl.remove(), done && done())
        }

        scope.animate = !1;
        var transitionEndEventName = $transition.transitionEndEventName;
        if (transitionEndEventName) {
            var timeout = $timeout(afterAnimating, emulateTime);
            domEl.bind(transitionEndEventName, function () {
                $timeout.cancel(timeout), afterAnimating(), scope.$apply()
            })
        } else $timeout(afterAnimating, 0)
    }

    var backdropDomEl, backdropScope, OPENED_MODAL_CLASS = "modal-open", openedWindows = $$stackedMap.createNew(), $modalStack = {};
    return $rootScope.$watch(backdropIndex, function (newBackdropIndex) {
        backdropScope && (backdropScope.index = newBackdropIndex)
    }), $document.bind("keydown", function (evt) {
        var modal;
        27 === evt.which && (modal = openedWindows.top(), modal && modal.value.keyboard && $rootScope.$apply(function () {
            $modalStack.dismiss(modal.key)
        }))
    }), $modalStack.open = function (modalInstance, modal) {
        openedWindows.add(modalInstance, {deferred: modal.deferred, modalScope: modal.scope, backdrop: modal.backdrop, keyboard: modal.keyboard});
        var body = $document.find("body").eq(0), currBackdropIndex = backdropIndex();
        currBackdropIndex >= 0 && !backdropDomEl && (backdropScope = $rootScope.$new(!0), backdropScope.index = currBackdropIndex, backdropDomEl = $compile("<div modal-backdrop></div>")(backdropScope), body.append(backdropDomEl));
        var angularDomEl = angular.element("<div modal-window></div>");
        angularDomEl.attr("window-class", modal.windowClass), angularDomEl.attr("index", openedWindows.length() - 1), angularDomEl.attr("animate", "animate"), angularDomEl.html(modal.content);
        var modalDomEl = $compile(angularDomEl)(modal.scope);
        openedWindows.top().value.modalDomEl = modalDomEl, body.append(modalDomEl), body.addClass(OPENED_MODAL_CLASS)
    }, $modalStack.close = function (modalInstance, result) {
        var modalWindow = openedWindows.get(modalInstance).value;
        modalWindow && (modalWindow.deferred.resolve(result), removeModalWindow(modalInstance))
    }, $modalStack.dismiss = function (modalInstance, reason) {
        var modalWindow = openedWindows.get(modalInstance).value;
        modalWindow && (modalWindow.deferred.reject(reason), removeModalWindow(modalInstance))
    }, $modalStack.dismissAll = function (reason) {
        for (var topModal = this.getTop(); topModal;)this.dismiss(topModal.key, reason), topModal = this.getTop()
    }, $modalStack.getTop = function () {
        return openedWindows.top()
    }, $modalStack
}]).provider("$modal", function () {
    var $modalProvider = {options: {backdrop: !0, keyboard: !0}, $get: ["$injector", "$rootScope", "$q", "$http", "$templateCache", "$controller", "$modalStack", function ($injector, $rootScope, $q, $http, $templateCache, $controller, $modalStack) {
        function getTemplatePromise(options) {
            return options.template ? $q.when(options.template) : $http.get(options.templateUrl, {cache: $templateCache}).then(function (result) {
                return result.data
            })
        }

        function getResolvePromises(resolves) {
            var promisesArr = [];
            return angular.forEach(resolves, function (value) {
                (angular.isFunction(value) || angular.isArray(value)) && promisesArr.push($q.when($injector.invoke(value)))
            }), promisesArr
        }

        var $modal = {};
        return $modal.open = function (modalOptions) {
            var modalResultDeferred = $q.defer(), modalOpenedDeferred = $q.defer(), modalInstance = {result: modalResultDeferred.promise, opened: modalOpenedDeferred.promise, close: function (result) {
                $modalStack.close(modalInstance, result)
            }, dismiss: function (reason) {
                $modalStack.dismiss(modalInstance, reason)
            }};
            if (modalOptions = angular.extend({}, $modalProvider.options, modalOptions), modalOptions.resolve = modalOptions.resolve || {}, !modalOptions.template && !modalOptions.templateUrl)throw new Error("One of template or templateUrl options is required.");
            var templateAndResolvePromise = $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions.resolve)));
            return templateAndResolvePromise.then(function (tplAndVars) {
                var modalScope = (modalOptions.scope || $rootScope).$new();
                modalScope.$close = modalInstance.close, modalScope.$dismiss = modalInstance.dismiss;
                var ctrlInstance, ctrlLocals = {}, resolveIter = 1;
                modalOptions.controller && (ctrlLocals.$scope = modalScope, ctrlLocals.$modalInstance = modalInstance, angular.forEach(modalOptions.resolve, function (value, key) {
                    ctrlLocals[key] = tplAndVars[resolveIter++]
                }), ctrlInstance = $controller(modalOptions.controller, ctrlLocals)), $modalStack.open(modalInstance, {scope: modalScope, deferred: modalResultDeferred, content: tplAndVars[0], backdrop: modalOptions.backdrop, keyboard: modalOptions.keyboard, windowClass: modalOptions.windowClass})
            }, function (reason) {
                modalResultDeferred.reject(reason)
            }), templateAndResolvePromise.then(function () {
                modalOpenedDeferred.resolve(!0)
            }, function () {
                modalOpenedDeferred.reject(!1)
            }), modalInstance
        }, $modal
    }]};
    return $modalProvider
}), angular.module("ui.bootstrap.pagination", []).controller("PaginationController", ["$scope", "$attrs", "$parse", "$interpolate", function ($scope, $attrs, $parse, $interpolate) {
    var self = this, setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign : angular.noop;
    this.init = function (defaultItemsPerPage) {
        $attrs.itemsPerPage ? $scope.$parent.$watch($parse($attrs.itemsPerPage), function (value) {
            self.itemsPerPage = parseInt(value, 10), $scope.totalPages = self.calculateTotalPages()
        }) : this.itemsPerPage = defaultItemsPerPage
    }, this.noPrevious = function () {
        return 1 === this.page
    }, this.noNext = function () {
        return this.page === $scope.totalPages
    }, this.isActive = function (page) {
        return this.page === page
    }, this.calculateTotalPages = function () {
        var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1)
    }, this.getAttributeValue = function (attribute, defaultValue, interpolate) {
        return angular.isDefined(attribute) ? interpolate ? $interpolate(attribute)($scope.$parent) : $scope.$parent.$eval(attribute) : defaultValue
    }, this.render = function () {
        this.page = parseInt($scope.page, 10) || 1, this.page > 0 && this.page <= $scope.totalPages && ($scope.pages = this.getPages(this.page, $scope.totalPages))
    }, $scope.selectPage = function (page) {
        !self.isActive(page) && page > 0 && page <= $scope.totalPages && ($scope.page = page, $scope.onSelectPage({page: page}))
    }, $scope.$watch("page", function () {
        self.render()
    }), $scope.$watch("totalItems", function () {
        $scope.totalPages = self.calculateTotalPages()
    }), $scope.$watch("totalPages", function (value) {
        setNumPages($scope.$parent, value), self.page > value ? $scope.selectPage(value) : self.render()
    })
}]).constant("paginationConfig", {itemsPerPage: 10, boundaryLinks: !1, directionLinks: !0, firstText: "First", previousText: "Previous", nextText: "Next", lastText: "Last", rotate: !0}).directive("pagination", ["$parse", "paginationConfig", function ($parse, config) {
    return{restrict: "EA", scope: {page: "=", totalItems: "=", onSelectPage: " &"}, controller: "PaginationController", templateUrl: "template/pagination/pagination.html", replace: !0, link: function (scope, element, attrs, paginationCtrl) {
        function makePage(number, text, isActive, isDisabled) {
            return{number: number, text: text, active: isActive, disabled: isDisabled}
        }

        var maxSize, boundaryLinks = paginationCtrl.getAttributeValue(attrs.boundaryLinks, config.boundaryLinks), directionLinks = paginationCtrl.getAttributeValue(attrs.directionLinks, config.directionLinks), firstText = paginationCtrl.getAttributeValue(attrs.firstText, config.firstText, !0), previousText = paginationCtrl.getAttributeValue(attrs.previousText, config.previousText, !0), nextText = paginationCtrl.getAttributeValue(attrs.nextText, config.nextText, !0), lastText = paginationCtrl.getAttributeValue(attrs.lastText, config.lastText, !0), rotate = paginationCtrl.getAttributeValue(attrs.rotate, config.rotate);
        paginationCtrl.init(config.itemsPerPage), attrs.maxSize && scope.$parent.$watch($parse(attrs.maxSize), function (value) {
            maxSize = parseInt(value, 10), paginationCtrl.render()
        }), paginationCtrl.getPages = function (currentPage, totalPages) {
            var pages = [], startPage = 1, endPage = totalPages, isMaxSized = angular.isDefined(maxSize) && totalPages > maxSize;
            isMaxSized && (rotate ? (startPage = Math.max(currentPage - Math.floor(maxSize / 2), 1), endPage = startPage + maxSize - 1, endPage > totalPages && (endPage = totalPages, startPage = endPage - maxSize + 1)) : (startPage = (Math.ceil(currentPage / maxSize) - 1) * maxSize + 1, endPage = Math.min(startPage + maxSize - 1, totalPages)));
            for (var number = startPage; endPage >= number; number++) {
                var page = makePage(number, number, paginationCtrl.isActive(number), !1);
                pages.push(page)
            }
            if (isMaxSized && !rotate) {
                if (startPage > 1) {
                    var previousPageSet = makePage(startPage - 1, "...", !1, !1);
                    pages.unshift(previousPageSet)
                }
                if (totalPages > endPage) {
                    var nextPageSet = makePage(endPage + 1, "...", !1, !1);
                    pages.push(nextPageSet)
                }
            }
            if (directionLinks) {
                var previousPage = makePage(currentPage - 1, previousText, !1, paginationCtrl.noPrevious());
                pages.unshift(previousPage);
                var nextPage = makePage(currentPage + 1, nextText, !1, paginationCtrl.noNext());
                pages.push(nextPage)
            }
            if (boundaryLinks) {
                var firstPage = makePage(1, firstText, !1, paginationCtrl.noPrevious());
                pages.unshift(firstPage);
                var lastPage = makePage(totalPages, lastText, !1, paginationCtrl.noNext());
                pages.push(lastPage)
            }
            return pages
        }
    }}
}]).constant("pagerConfig", {itemsPerPage: 10, previousText: "Â« Previous", nextText: "Next Â»", align: !0}).directive("pager", ["pagerConfig", function (config) {
    return{restrict: "EA", scope: {page: "=", totalItems: "=", onSelectPage: " &"}, controller: "PaginationController", templateUrl: "template/pagination/pager.html", replace: !0, link: function (scope, element, attrs, paginationCtrl) {
        function makePage(number, text, isDisabled, isPrevious, isNext) {
            return{number: number, text: text, disabled: isDisabled, previous: align && isPrevious, next: align && isNext}
        }

        var previousText = paginationCtrl.getAttributeValue(attrs.previousText, config.previousText, !0), nextText = paginationCtrl.getAttributeValue(attrs.nextText, config.nextText, !0), align = paginationCtrl.getAttributeValue(attrs.align, config.align);
        paginationCtrl.init(config.itemsPerPage), paginationCtrl.getPages = function (currentPage) {
            return[makePage(currentPage - 1, previousText, paginationCtrl.noPrevious(), !0, !1), makePage(currentPage + 1, nextText, paginationCtrl.noNext(), !1, !0)]
        }
    }}
}]), angular.module("ui.bootstrap.tooltip", ["ui.bootstrap.position", "ui.bootstrap.bindHtml"]).provider("$tooltip", function () {
    function snake_case(name) {
        var regexp = /[A-Z]/g, separator = "-";
        return name.replace(regexp, function (letter, pos) {
            return(pos ? separator : "") + letter.toLowerCase()
        })
    }

    var defaultOptions = {placement: "top", animation: !0, popupDelay: 0}, triggerMap = {mouseenter: "mouseleave", click: "click", focus: "blur"}, globalOptions = {};
    this.options = function (value) {
        angular.extend(globalOptions, value)
    }, this.setTriggers = function (triggers) {
        angular.extend(triggerMap, triggers)
    }, this.$get = ["$window", "$compile", "$timeout", "$parse", "$document", "$position", "$interpolate", function ($window, $compile, $timeout, $parse, $document, $position, $interpolate) {
        return function (type, prefix, defaultTriggerShow) {
            function getTriggers(trigger) {
                var show = trigger || options.trigger || defaultTriggerShow, hide = triggerMap[show] || show;
                return{show: show, hide: hide}
            }

            var options = angular.extend({}, defaultOptions, globalOptions), directiveName = snake_case(type), startSym = $interpolate.startSymbol(), endSym = $interpolate.endSymbol(), template = "<div " + directiveName + '-popup title="' + startSym + "tt_title" + endSym + '" content="' + startSym + "tt_content" + endSym + '" placement="' + startSym + "tt_placement" + endSym + '" animation="tt_animation" is-open="tt_isOpen"></div>';
            return{restrict: "EA", scope: !0, compile: function () {
                var tooltipLinker = $compile(template);
                return function (scope, element, attrs) {
                    function toggleTooltipBind() {
                        scope.tt_isOpen ? hideTooltipBind() : showTooltipBind()
                    }

                    function showTooltipBind() {
                        (!hasEnableExp || scope.$eval(attrs[prefix + "Enable"])) && (scope.tt_popupDelay ? (popupTimeout = $timeout(show, scope.tt_popupDelay, !1), popupTimeout.then(function (reposition) {
                            reposition()
                        })) : show()())
                    }

                    function hideTooltipBind() {
                        scope.$apply(function () {
                            hide()
                        })
                    }

                    function show() {
                        return scope.tt_content ? (createTooltip(), transitionTimeout && $timeout.cancel(transitionTimeout), tooltip.css({top: 0, left: 0, display: "block"}), appendToBody ? $document.find("body").append(tooltip) : element.after(tooltip), positionTooltip(), scope.tt_isOpen = !0, scope.$digest(), positionTooltip) : angular.noop
                    }

                    function hide() {
                        scope.tt_isOpen = !1, $timeout.cancel(popupTimeout), scope.tt_animation ? transitionTimeout = $timeout(removeTooltip, 500) : removeTooltip()
                    }

                    function createTooltip() {
                        tooltip && removeTooltip(), tooltip = tooltipLinker(scope, function () {
                        }), scope.$digest()
                    }

                    function removeTooltip() {
                        tooltip && (tooltip.remove(), tooltip = null)
                    }

                    var tooltip, transitionTimeout, popupTimeout, appendToBody = angular.isDefined(options.appendToBody) ? options.appendToBody : !1, triggers = getTriggers(void 0), hasRegisteredTriggers = !1, hasEnableExp = angular.isDefined(attrs[prefix + "Enable"]), positionTooltip = function () {
                        var position, ttWidth, ttHeight, ttPosition;
                        switch (position = appendToBody ? $position.offset(element) : $position.position(element), ttWidth = tooltip.prop("offsetWidth"), ttHeight = tooltip.prop("offsetHeight"), scope.tt_placement) {
                            case"right":
                                ttPosition = {top: position.top + position.height / 2 - ttHeight / 2, left: position.left + position.width};
                                break;
                            case"bottom":
                                ttPosition = {top: position.top + position.height, left: position.left + position.width / 2 - ttWidth / 2};
                                break;
                            case"left":
                                ttPosition = {top: position.top + position.height / 2 - ttHeight / 2, left: position.left - ttWidth};
                                break;
                            default:
                                ttPosition = {top: position.top - ttHeight, left: position.left + position.width / 2 - ttWidth / 2}
                        }
                        ttPosition.top += "px", ttPosition.left += "px", tooltip.css(ttPosition)
                    };
                    scope.tt_isOpen = !1, attrs.$observe(type, function (val) {
                        scope.tt_content = val, !val && scope.tt_isOpen && hide()
                    }), attrs.$observe(prefix + "Title", function (val) {
                        scope.tt_title = val
                    }), attrs.$observe(prefix + "Placement", function (val) {
                        scope.tt_placement = angular.isDefined(val) ? val : options.placement
                    }), attrs.$observe(prefix + "PopupDelay", function (val) {
                        var delay = parseInt(val, 10);
                        scope.tt_popupDelay = isNaN(delay) ? options.popupDelay : delay
                    });
                    var unregisterTriggers = function () {
                        hasRegisteredTriggers && (element.unbind(triggers.show, showTooltipBind), element.unbind(triggers.hide, hideTooltipBind))
                    };
                    attrs.$observe(prefix + "Trigger", function (val) {
                        unregisterTriggers(), triggers = getTriggers(val), triggers.show === triggers.hide ? element.bind(triggers.show, toggleTooltipBind) : (element.bind(triggers.show, showTooltipBind), element.bind(triggers.hide, hideTooltipBind)), hasRegisteredTriggers = !0
                    });
                    var animation = scope.$eval(attrs[prefix + "Animation"]);
                    scope.tt_animation = angular.isDefined(animation) ? !!animation : options.animation, attrs.$observe(prefix + "AppendToBody", function (val) {
                        appendToBody = angular.isDefined(val) ? $parse(val)(scope) : appendToBody
                    }), appendToBody && scope.$on("$locationChangeSuccess", function () {
                        scope.tt_isOpen && hide()
                    }), scope.$on("$destroy", function () {
                        $timeout.cancel(transitionTimeout), $timeout.cancel(popupTimeout), unregisterTriggers(), removeTooltip()
                    })
                }
            }}
        }
    }]
}).directive("tooltipPopup", function () {
    return{restrict: "EA", replace: !0, scope: {content: "@", placement: "@", animation: "&", isOpen: "&"}, templateUrl: "template/tooltip/tooltip-popup.html"}
}).directive("tooltip", ["$tooltip", function ($tooltip) {
    return $tooltip("tooltip", "tooltip", "mouseenter")
}]).directive("tooltipHtmlUnsafePopup", function () {
    return{restrict: "EA", replace: !0, scope: {content: "@", placement: "@", animation: "&", isOpen: "&"}, templateUrl: "template/tooltip/tooltip-html-unsafe-popup.html"}
}).directive("tooltipHtmlUnsafe", ["$tooltip", function ($tooltip) {
    return $tooltip("tooltipHtmlUnsafe", "tooltip", "mouseenter")
}]), angular.module("ui.bootstrap.popover", ["ui.bootstrap.tooltip"]).directive("popoverPopup", function () {
    return{restrict: "EA", replace: !0, scope: {title: "@", content: "@", placement: "@", animation: "&", isOpen: "&"}, templateUrl: "template/popover/popover.html"}
}).directive("popover", ["$tooltip", function ($tooltip) {
    return $tooltip("popover", "popover", "click")
}]), angular.module("ui.bootstrap.progressbar", ["ui.bootstrap.transition"]).constant("progressConfig", {animate: !0, max: 100}).controller("ProgressController", ["$scope", "$attrs", "progressConfig", "$transition", function ($scope, $attrs, progressConfig, $transition) {
    var self = this, bars = [], max = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : progressConfig.max, animate = angular.isDefined($attrs.animate) ? $scope.$parent.$eval($attrs.animate) : progressConfig.animate;
    this.addBar = function (bar, element) {
        var oldValue = 0, index = bar.$parent.$index;
        angular.isDefined(index) && bars[index] && (oldValue = bars[index].value), bars.push(bar), this.update(element, bar.value, oldValue), bar.$watch("value", function (value, oldValue) {
            value !== oldValue && self.update(element, value, oldValue)
        }), bar.$on("$destroy", function () {
            self.removeBar(bar)
        })
    }, this.update = function (element, newValue, oldValue) {
        var percent = this.getPercentage(newValue);
        animate ? (element.css("width", this.getPercentage(oldValue) + "%"), $transition(element, {width: percent + "%"})) : element.css({transition: "none", width: percent + "%"})
    }, this.removeBar = function (bar) {
        bars.splice(bars.indexOf(bar), 1)
    }, this.getPercentage = function (value) {
        return Math.round(100 * value / max)
    }
}]).directive("progress", function () {
    return{restrict: "EA", replace: !0, transclude: !0, controller: "ProgressController", require: "progress", scope: {}, template: '<div class="progress" ng-transclude></div>'}
}).directive("bar", function () {
    return{restrict: "EA", replace: !0, transclude: !0, require: "^progress", scope: {value: "=", type: "@"}, templateUrl: "template/progressbar/bar.html", link: function (scope, element, attrs, progressCtrl) {
        progressCtrl.addBar(scope, element)
    }}
}).directive("progressbar", function () {
    return{restrict: "EA", replace: !0, transclude: !0, controller: "ProgressController", scope: {value: "=", type: "@"}, templateUrl: "template/progressbar/progressbar.html", link: function (scope, element, attrs, progressCtrl) {
        progressCtrl.addBar(scope, angular.element(element.children()[0]))
    }}
}), angular.module("ui.bootstrap.rating", []).constant("ratingConfig", {max: 5, stateOn: null, stateOff: null}).controller("RatingController", ["$scope", "$attrs", "$parse", "ratingConfig", function ($scope, $attrs, $parse, ratingConfig) {
    this.maxRange = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : ratingConfig.max, this.stateOn = angular.isDefined($attrs.stateOn) ? $scope.$parent.$eval($attrs.stateOn) : ratingConfig.stateOn, this.stateOff = angular.isDefined($attrs.stateOff) ? $scope.$parent.$eval($attrs.stateOff) : ratingConfig.stateOff, this.createRateObjects = function (states) {
        for (var defaultOptions = {stateOn: this.stateOn, stateOff: this.stateOff}, i = 0, n = states.length; n > i; i++)states[i] = angular.extend({index: i}, defaultOptions, states[i]);
        return states
    }, $scope.range = this.createRateObjects(angular.isDefined($attrs.ratingStates) ? angular.copy($scope.$parent.$eval($attrs.ratingStates)) : new Array(this.maxRange)), $scope.rate = function (value) {
        $scope.value === value || $scope.readonly || ($scope.value = value)
    }, $scope.enter = function (value) {
        $scope.readonly || ($scope.val = value), $scope.onHover({value: value})
    }, $scope.reset = function () {
        $scope.val = angular.copy($scope.value), $scope.onLeave()
    }, $scope.$watch("value", function (value) {
        $scope.val = value
    }), $scope.readonly = !1, $attrs.readonly && $scope.$parent.$watch($parse($attrs.readonly), function (value) {
        $scope.readonly = !!value
    })
}]).directive("rating", function () {
    return{restrict: "EA", scope: {value: "=", onHover: "&", onLeave: "&"}, controller: "RatingController", templateUrl: "template/rating/rating.html", replace: !0}
}), angular.module("ui.bootstrap.tabs", []).controller("TabsetController", ["$scope", function ($scope) {
    var ctrl = this, tabs = ctrl.tabs = $scope.tabs = [];
    ctrl.select = function (tab) {
        angular.forEach(tabs, function (tab) {
            tab.active = !1
        }), tab.active = !0
    }, ctrl.addTab = function (tab) {
        tabs.push(tab), (1 === tabs.length || tab.active) && ctrl.select(tab)
    }, ctrl.removeTab = function (tab) {
        var index = tabs.indexOf(tab);
        if (tab.active && tabs.length > 1) {
            var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;
            ctrl.select(tabs[newActiveIndex])
        }
        tabs.splice(index, 1)
    }
}]).directive("tabset", function () {
    return{restrict: "EA", transclude: !0, replace: !0, scope: {}, controller: "TabsetController", templateUrl: "template/tabs/tabset.html", link: function (scope, element, attrs) {
        scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : !1, scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : !1, scope.type = angular.isDefined(attrs.type) ? scope.$parent.$eval(attrs.type) : "tabs"
    }}
}).directive("tab", ["$parse", function ($parse) {
    return{require: "^tabset", restrict: "EA", replace: !0, templateUrl: "template/tabs/tab.html", transclude: !0, scope: {heading: "@", onSelect: "&select", onDeselect: "&deselect"}, controller: function () {
    }, compile: function (elm, attrs, transclude) {
        return function (scope, elm, attrs, tabsetCtrl) {
            var getActive, setActive;
            attrs.active ? (getActive = $parse(attrs.active), setActive = getActive.assign, scope.$parent.$watch(getActive, function (value, oldVal) {
                value !== oldVal && (scope.active = !!value)
            }), scope.active = getActive(scope.$parent)) : setActive = getActive = angular.noop, scope.$watch("active", function (active) {
                setActive(scope.$parent, active), active ? (tabsetCtrl.select(scope), scope.onSelect()) : scope.onDeselect()
            }), scope.disabled = !1, attrs.disabled && scope.$parent.$watch($parse(attrs.disabled), function (value) {
                scope.disabled = !!value
            }), scope.select = function () {
                scope.disabled || (scope.active = !0)
            }, tabsetCtrl.addTab(scope), scope.$on("$destroy", function () {
                tabsetCtrl.removeTab(scope)
            }), scope.$transcludeFn = transclude
        }
    }}
}]).directive("tabHeadingTransclude", [function () {
    return{restrict: "A", require: "^tab", link: function (scope, elm) {
        scope.$watch("headingElement", function (heading) {
            heading && (elm.html(""), elm.append(heading))
        })
    }}
}]).directive("tabContentTransclude", function () {
    function isTabHeading(node) {
        return node.tagName && (node.hasAttribute("tab-heading") || node.hasAttribute("data-tab-heading") || "tab-heading" === node.tagName.toLowerCase() || "data-tab-heading" === node.tagName.toLowerCase())
    }

    return{restrict: "A", require: "^tabset", link: function (scope, elm, attrs) {
        var tab = scope.$eval(attrs.tabContentTransclude);
        tab.$transcludeFn(tab.$parent, function (contents) {
            angular.forEach(contents, function (node) {
                isTabHeading(node) ? tab.headingElement = node : elm.append(node)
            })
        })
    }}
}), angular.module("ui.bootstrap.timepicker", []).constant("timepickerConfig", {hourStep: 1, minuteStep: 1, showMeridian: !0, meridians: null, readonlyInput: !1, mousewheel: !0}).directive("timepicker", ["$parse", "$log", "timepickerConfig", "$locale", function ($parse, $log, timepickerConfig, $locale) {
    return{restrict: "EA", require: "?^ngModel", replace: !0, scope: {}, templateUrl: "template/timepicker/timepicker.html", link: function (scope, element, attrs, ngModel) {
        function getHoursFromTemplate() {
            var hours = parseInt(scope.hours, 10), valid = scope.showMeridian ? hours > 0 && 13 > hours : hours >= 0 && 24 > hours;
            return valid ? (scope.showMeridian && (12 === hours && (hours = 0), scope.meridian === meridians[1] && (hours += 12)), hours) : void 0
        }

        function getMinutesFromTemplate() {
            var minutes = parseInt(scope.minutes, 10);
            return minutes >= 0 && 60 > minutes ? minutes : void 0
        }

        function pad(value) {
            return angular.isDefined(value) && value.toString().length < 2 ? "0" + value : value
        }

        function refresh(keyboardChange) {
            makeValid(), ngModel.$setViewValue(new Date(selected)), updateTemplate(keyboardChange)
        }

        function makeValid() {
            ngModel.$setValidity("time", !0), scope.invalidHours = !1, scope.invalidMinutes = !1
        }

        function updateTemplate(keyboardChange) {
            var hours = selected.getHours(), minutes = selected.getMinutes();
            scope.showMeridian && (hours = 0 === hours || 12 === hours ? 12 : hours % 12), scope.hours = "h" === keyboardChange ? hours : pad(hours), scope.minutes = "m" === keyboardChange ? minutes : pad(minutes), scope.meridian = selected.getHours() < 12 ? meridians[0] : meridians[1]
        }

        function addMinutes(minutes) {
            var dt = new Date(selected.getTime() + 6e4 * minutes);
            selected.setHours(dt.getHours(), dt.getMinutes()), refresh()
        }

        if (ngModel) {
            var selected = new Date, meridians = angular.isDefined(attrs.meridians) ? scope.$parent.$eval(attrs.meridians) : timepickerConfig.meridians || $locale.DATETIME_FORMATS.AMPMS, hourStep = timepickerConfig.hourStep;
            attrs.hourStep && scope.$parent.$watch($parse(attrs.hourStep), function (value) {
                hourStep = parseInt(value, 10)
            });
            var minuteStep = timepickerConfig.minuteStep;
            attrs.minuteStep && scope.$parent.$watch($parse(attrs.minuteStep), function (value) {
                minuteStep = parseInt(value, 10)
            }), scope.showMeridian = timepickerConfig.showMeridian, attrs.showMeridian && scope.$parent.$watch($parse(attrs.showMeridian), function (value) {
                if (scope.showMeridian = !!value, ngModel.$error.time) {
                    var hours = getHoursFromTemplate(), minutes = getMinutesFromTemplate();
                    angular.isDefined(hours) && angular.isDefined(minutes) && (selected.setHours(hours), refresh())
                } else updateTemplate()
            });
            var inputs = element.find("input"), hoursInputEl = inputs.eq(0), minutesInputEl = inputs.eq(1), mousewheel = angular.isDefined(attrs.mousewheel) ? scope.$eval(attrs.mousewheel) : timepickerConfig.mousewheel;
            if (mousewheel) {
                var isScrollingUp = function (e) {
                    e.originalEvent && (e = e.originalEvent);
                    var delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
                    return e.detail || delta > 0
                };
                hoursInputEl.bind("mousewheel wheel", function (e) {
                    scope.$apply(isScrollingUp(e) ? scope.incrementHours() : scope.decrementHours()), e.preventDefault()
                }), minutesInputEl.bind("mousewheel wheel", function (e) {
                    scope.$apply(isScrollingUp(e) ? scope.incrementMinutes() : scope.decrementMinutes()), e.preventDefault()
                })
            }
            if (scope.readonlyInput = angular.isDefined(attrs.readonlyInput) ? scope.$eval(attrs.readonlyInput) : timepickerConfig.readonlyInput, scope.readonlyInput)scope.updateHours = angular.noop, scope.updateMinutes = angular.noop; else {
                var invalidate = function (invalidHours, invalidMinutes) {
                    ngModel.$setViewValue(null), ngModel.$setValidity("time", !1), angular.isDefined(invalidHours) && (scope.invalidHours = invalidHours), angular.isDefined(invalidMinutes) && (scope.invalidMinutes = invalidMinutes)
                };
                scope.updateHours = function () {
                    var hours = getHoursFromTemplate();
                    angular.isDefined(hours) ? (selected.setHours(hours), refresh("h")) : invalidate(!0)
                }, hoursInputEl.bind("blur", function () {
                    !scope.validHours && scope.hours < 10 && scope.$apply(function () {
                        scope.hours = pad(scope.hours)
                    })
                }), scope.updateMinutes = function () {
                    var minutes = getMinutesFromTemplate();
                    angular.isDefined(minutes) ? (selected.setMinutes(minutes), refresh("m")) : invalidate(void 0, !0)
                }, minutesInputEl.bind("blur", function () {
                    !scope.invalidMinutes && scope.minutes < 10 && scope.$apply(function () {
                        scope.minutes = pad(scope.minutes)
                    })
                })
            }
            ngModel.$render = function () {
                var date = ngModel.$modelValue ? new Date(ngModel.$modelValue) : null;
                isNaN(date) ? (ngModel.$setValidity("time", !1), $log.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')) : (date && (selected = date), makeValid(), updateTemplate())
            }, scope.incrementHours = function () {
                addMinutes(60 * hourStep)
            }, scope.decrementHours = function () {
                addMinutes(60 * -hourStep)
            }, scope.incrementMinutes = function () {
                addMinutes(minuteStep)
            }, scope.decrementMinutes = function () {
                addMinutes(-minuteStep)
            }, scope.toggleMeridian = function () {
                addMinutes(720 * (selected.getHours() < 12 ? 1 : -1))
            }
        }
    }}
}]), angular.module("ui.bootstrap.typeahead", ["ui.bootstrap.position", "ui.bootstrap.bindHtml"]).factory("typeaheadParser", ["$parse", function ($parse) {
    var TYPEAHEAD_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;
    return{parse: function (input) {
        var match = input.match(TYPEAHEAD_REGEXP);
        if (!match)throw new Error("Expected typeahead specification in form of '_modelValue_ (as _label_)? for _item_ in _collection_' but got '" + input + "'.");
        return{itemName: match[3], source: $parse(match[4]), viewMapper: $parse(match[2] || match[1]), modelMapper: $parse(match[1])}
    }}
}]).directive("typeahead", ["$compile", "$parse", "$q", "$timeout", "$document", "$position", "typeaheadParser", function ($compile, $parse, $q, $timeout, $document, $position, typeaheadParser) {
    var HOT_KEYS = [9, 13, 27, 38, 40];
    return{require: "ngModel", link: function (originalScope, element, attrs, modelCtrl) {
        var hasFocus, minSearch = originalScope.$eval(attrs.typeaheadMinLength) || 1, waitTime = originalScope.$eval(attrs.typeaheadWaitMs) || 0, isEditable = originalScope.$eval(attrs.typeaheadEditable) !== !1, isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop, onSelectCallback = $parse(attrs.typeaheadOnSelect), inputFormatter = attrs.typeaheadInputFormatter ? $parse(attrs.typeaheadInputFormatter) : void 0, appendToBody = attrs.typeaheadAppendToBody ? $parse(attrs.typeaheadAppendToBody) : !1, $setModelValue = $parse(attrs.ngModel).assign, parserResult = typeaheadParser.parse(attrs.typeahead), popUpEl = angular.element("<div typeahead-popup></div>");
        popUpEl.attr({matches: "matches", active: "activeIdx", select: "select(activeIdx)", query: "query", position: "position"}), angular.isDefined(attrs.typeaheadTemplateUrl) && popUpEl.attr("template-url", attrs.typeaheadTemplateUrl);
        var scope = originalScope.$new();
        originalScope.$on("$destroy", function () {
            scope.$destroy()
        });
        var resetMatches = function () {
            scope.matches = [], scope.activeIdx = -1
        }, getMatchesAsync = function (inputValue) {
            var locals = {$viewValue: inputValue};
            isLoadingSetter(originalScope, !0), $q.when(parserResult.source(originalScope, locals)).then(function (matches) {
                if (inputValue === modelCtrl.$viewValue && hasFocus) {
                    if (matches.length > 0) {
                        scope.activeIdx = 0, scope.matches.length = 0;
                        for (var i = 0; i < matches.length; i++)locals[parserResult.itemName] = matches[i], scope.matches.push({label: parserResult.viewMapper(scope, locals), model: matches[i]});
                        scope.query = inputValue, scope.position = appendToBody ? $position.offset(element) : $position.position(element), scope.position.top = scope.position.top + element.prop("offsetHeight")
                    } else resetMatches();
                    isLoadingSetter(originalScope, !1)
                }
            }, function () {
                resetMatches(), isLoadingSetter(originalScope, !1)
            })
        };
        resetMatches(), scope.query = void 0;
        var timeoutPromise;
        modelCtrl.$parsers.unshift(function (inputValue) {
            return hasFocus = !0, inputValue && inputValue.length >= minSearch ? waitTime > 0 ? (timeoutPromise && $timeout.cancel(timeoutPromise), timeoutPromise = $timeout(function () {
                getMatchesAsync(inputValue)
            }, waitTime)) : getMatchesAsync(inputValue) : (isLoadingSetter(originalScope, !1), resetMatches()), isEditable ? inputValue : inputValue ? void modelCtrl.$setValidity("editable", !1) : (modelCtrl.$setValidity("editable", !0), inputValue)
        }), modelCtrl.$formatters.push(function (modelValue) {
            var candidateViewValue, emptyViewValue, locals = {};
            return inputFormatter ? (locals.$model = modelValue, inputFormatter(originalScope, locals)) : (locals[parserResult.itemName] = modelValue, candidateViewValue = parserResult.viewMapper(originalScope, locals), locals[parserResult.itemName] = void 0, emptyViewValue = parserResult.viewMapper(originalScope, locals), candidateViewValue !== emptyViewValue ? candidateViewValue : modelValue)
        }), scope.select = function (activeIdx) {
            var model, item, locals = {};
            locals[parserResult.itemName] = item = scope.matches[activeIdx].model, model = parserResult.modelMapper(originalScope, locals), $setModelValue(originalScope, model), modelCtrl.$setValidity("editable", !0), onSelectCallback(originalScope, {$item: item, $model: model, $label: parserResult.viewMapper(originalScope, locals)}), resetMatches(), element[0].focus()
        }, element.bind("keydown", function (evt) {
            0 !== scope.matches.length && -1 !== HOT_KEYS.indexOf(evt.which) && (evt.preventDefault(), 40 === evt.which ? (scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length, scope.$digest()) : 38 === evt.which ? (scope.activeIdx = (scope.activeIdx ? scope.activeIdx : scope.matches.length) - 1, scope.$digest()) : 13 === evt.which || 9 === evt.which ? scope.$apply(function () {
                scope.select(scope.activeIdx)
            }) : 27 === evt.which && (evt.stopPropagation(), resetMatches(), scope.$digest()))
        }), element.bind("blur", function () {
            hasFocus = !1
        });
        var dismissClickHandler = function (evt) {
            element[0] !== evt.target && (resetMatches(), scope.$digest())
        };
        $document.bind("click", dismissClickHandler), originalScope.$on("$destroy", function () {
            $document.unbind("click", dismissClickHandler)
        });
        var $popup = $compile(popUpEl)(scope);
        appendToBody ? $document.find("body").append($popup) : element.after($popup)
    }}
}]).directive("typeaheadPopup", function () {
    return{restrict: "EA", scope: {matches: "=", query: "=", active: "=", position: "=", select: "&"}, replace: !0, templateUrl: "template/typeahead/typeahead-popup.html", link: function (scope, element, attrs) {
        scope.templateUrl = attrs.templateUrl, scope.isOpen = function () {
            return scope.matches.length > 0
        }, scope.isActive = function (matchIdx) {
            return scope.active == matchIdx
        }, scope.selectActive = function (matchIdx) {
            scope.active = matchIdx
        }, scope.selectMatch = function (activeIdx) {
            scope.select({activeIdx: activeIdx})
        }
    }}
}).directive("typeaheadMatch", ["$http", "$templateCache", "$compile", "$parse", function ($http, $templateCache, $compile, $parse) {
    return{restrict: "EA", scope: {index: "=", match: "=", query: "="}, link: function (scope, element, attrs) {
        var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || "template/typeahead/typeahead-match.html";
        $http.get(tplUrl, {cache: $templateCache}).success(function (tplContent) {
            element.replaceWith($compile(tplContent.trim())(scope))
        })
    }}
}]).filter("typeaheadHighlight", function () {
    function escapeRegexp(queryToEscape) {
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
    }

    return function (matchItem, query) {
        return query ? matchItem.replace(new RegExp(escapeRegexp(query), "gi"), "<strong>$&</strong>") : matchItem
    }
}), angular.module("template/accordion/accordion-group.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/accordion/accordion-group.html", '<div class="panel panel-default">\n  <div class="panel-heading">\n    <h4 class="panel-title">\n      <a class="accordion-toggle" ng-click="isOpen = !isOpen" accordion-transclude="heading">{{heading}}</a>\n    </h4>\n  </div>\n  <div class="panel-collapse" collapse="!isOpen">\n	  <div class="panel-body" ng-transclude></div>\n  </div>\n</div>')
}]), angular.module("template/accordion/accordion.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/accordion/accordion.html", '<div class="panel-group" ng-transclude></div>')
}]), angular.module("template/alert/alert.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/alert/alert.html", "<div class='alert' ng-class='\"alert-\" + (type || \"warning\")'>\n    <button ng-show='closeable' type='button' class='close' ng-click='close()'>&times;</button>\n    <div ng-transclude></div>\n</div>\n")
}]), angular.module("template/carousel/carousel.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/carousel/carousel.html", '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel">\n    <ol class="carousel-indicators" ng-show="slides().length > 1">\n        <li ng-repeat="slide in slides()" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>\n    </ol>\n    <div class="carousel-inner" ng-transclude></div>\n    <a class="left carousel-control" ng-click="prev()" ng-show="slides().length > 1"><span class="icon-prev"></span></a>\n    <a class="right carousel-control" ng-click="next()" ng-show="slides().length > 1"><span class="icon-next"></span></a>\n</div>\n')
}]), angular.module("template/carousel/slide.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/carousel/slide.html", "<div ng-class=\"{\n    'active': leaving || (active && !entering),\n    'prev': (next || active) && direction=='prev',\n    'next': (next || active) && direction=='next',\n    'right': direction=='prev',\n    'left': direction=='next'\n  }\" class=\"item text-center\" ng-transclude></div>\n")
}]), angular.module("template/datepicker/datepicker.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/datepicker/datepicker.html", '<table>\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="{{rows[0].length - 2 + showWeekNumbers}}"><button type="button" class="btn btn-default btn-sm btn-block" ng-click="toggleMode()"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n    <tr ng-show="labels.length > 0" class="h6">\n      <th ng-show="showWeekNumbers" class="text-center">#</th>\n      <th ng-repeat="label in labels" class="text-center">{{label}}</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows">\n      <td ng-show="showWeekNumbers" class="text-center"><em>{{ getWeekNumber(row) }}</em></td>\n      <td ng-repeat="dt in row" class="text-center">\n        <button type="button" style="width:100%;" class="btn btn-default btn-sm" ng-class="{\'btn-info\': dt.selected}" ng-click="select(dt.date)" ng-disabled="dt.disabled"><span ng-class="{\'text-muted\': dt.secondary}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
}]), angular.module("template/datepicker/popup.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/datepicker/popup.html", "<ul class=\"dropdown-menu\" ng-style=\"{display: (isOpen && 'block') || 'none', top: position.top+'px', left: position.left+'px'}\">\n	<li ng-transclude></li>\n" + '	<li ng-show="showButtonBar" style="padding:10px 9px 2px">\n		<span class="btn-group">\n			<button type="button" class="btn btn-sm btn-info" ng-click="today()">{{currentText}}</button>\n			<button type="button" class="btn btn-sm btn-default" ng-click="showWeeks = ! showWeeks" ng-class="{active: showWeeks}">{{toggleWeeksText}}</button>\n			<button type="button" class="btn btn-sm btn-danger" ng-click="clear()">{{clearText}}</button>\n		</span>\n		<button type="button" class="btn btn-sm btn-success pull-right" ng-click="isOpen = false">{{closeText}}</button>\n	</li>\n</ul>\n')
}]), angular.module("template/modal/backdrop.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/modal/backdrop.html", '<div class="modal-backdrop fade" ng-class="{in: animate}" ng-style="{\'z-index\': 1040 + index*10}"></div>')
}]), angular.module("template/modal/window.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/modal/window.html", '<div tabindex="-1" class="modal fade {{ windowClass }}" ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click="close($event)">\n    <div class="modal-dialog"><div class="modal-content" ng-transclude></div></div>\n</div>')
}]), angular.module("template/pagination/pager.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/pagination/pager.html", '<ul class="pager">\n  <li ng-repeat="page in pages" ng-class="{disabled: page.disabled, previous: page.previous, next: page.next}"><a ng-click="selectPage(page.number)">{{page.text}}</a></li>\n</ul>')
}]), angular.module("template/pagination/pagination.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/pagination/pagination.html", '<ul class="pagination">\n  <li ng-repeat="page in pages" ng-class="{active: page.active, disabled: page.disabled}"><a ng-click="selectPage(page.number)">{{page.text}}</a></li>\n</ul>')
}]), angular.module("template/tooltip/tooltip-html-unsafe-popup.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/tooltip/tooltip-html-unsafe-popup.html", '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" bind-html-unsafe="content"></div>\n</div>\n')
}]), angular.module("template/tooltip/tooltip-popup.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/tooltip/tooltip-popup.html", '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind="content"></div>\n</div>\n')
}]), angular.module("template/popover/popover.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/popover/popover.html", '<div class="popover {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-show="title"></h3>\n      <div class="popover-content" ng-bind="content"></div>\n  </div>\n</div>\n')
}]), angular.module("template/progressbar/bar.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/progressbar/bar.html", '<div class="progress-bar" ng-class="type && \'progress-bar-\' + type" ng-transclude></div>')
}]), angular.module("template/progressbar/progress.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/progressbar/progress.html", '<div class="progress" ng-transclude></div>')
}]), angular.module("template/progressbar/progressbar.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/progressbar/progressbar.html", '<div class="progress"><div class="progress-bar" ng-class="type && \'progress-bar-\' + type" ng-transclude></div></div>')
}]), angular.module("template/rating/rating.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/rating/rating.html", '<span ng-mouseleave="reset()">\n    <i ng-repeat="r in range" ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="glyphicon" ng-class="$index < val && (r.stateOn || \'glyphicon-star\') || (r.stateOff || \'glyphicon-star-empty\')"></i>\n</span>')
}]), angular.module("template/tabs/tab.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/tabs/tab.html", '<li ng-class="{active: active, disabled: disabled}">\n  <a ng-click="select()" tab-heading-transclude>{{heading}}</a>\n</li>\n')
}]), angular.module("template/tabs/tabset-titles.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/tabs/tabset-titles.html", "<ul class=\"nav {{type && 'nav-' + type}}\" ng-class=\"{'nav-stacked': vertical}\">\n</ul>\n")
}]), angular.module("template/tabs/tabset.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/tabs/tabset.html", '\n<div class="tabbable">\n  <ul class="nav {{type && \'nav-\' + type}}" ng-class="{\'nav-stacked\': vertical, \'nav-justified\': justified}" ng-transclude></ul>\n  <div class="tab-content">\n    <div class="tab-pane" \n         ng-repeat="tab in tabs" \n         ng-class="{active: tab.active}"\n         tab-content-transclude="tab">\n    </div>\n  </div>\n</div>\n')
}]), angular.module("template/timepicker/timepicker.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/timepicker/timepicker.html", '<table>\n	<tbody>\n		<tr class="text-center">\n			<td><a ng-click="incrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n			<td>&nbsp;</td>\n			<td><a ng-click="incrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n			<td ng-show="showMeridian"></td>\n		</tr>\n		<tr>\n			<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidHours}">\n				<input type="text" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-mousewheel="incrementHours()" ng-readonly="readonlyInput" maxlength="2">\n			</td>\n			<td>:</td>\n			<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidMinutes}">\n				<input type="text" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-readonly="readonlyInput" maxlength="2">\n			</td>\n			<td ng-show="showMeridian"><button type="button" class="btn btn-default text-center" ng-click="toggleMeridian()">{{meridian}}</button></td>\n		</tr>\n		<tr class="text-center">\n			<td><a ng-click="decrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n			<td>&nbsp;</td>\n			<td><a ng-click="decrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n			<td ng-show="showMeridian"></td>\n		</tr>\n	</tbody>\n</table>\n')
}]), angular.module("template/typeahead/typeahead-match.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/typeahead/typeahead-match.html", '<a tabindex="-1" bind-html-unsafe="match.label | typeaheadHighlight:query"></a>')
}]), angular.module("template/typeahead/typeahead-popup.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/typeahead/typeahead-popup.html", "<ul class=\"dropdown-menu\" ng-style=\"{display: isOpen()&&'block' || 'none', top: position.top+'px', left: position.left+'px'}\">\n" + '    <li ng-repeat="match in matches" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)">\n        <div typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>')
}]), angular.module("ui.slider", []).value("uiSliderConfig", {}).directive("uiSlider", ["uiSliderConfig", "$timeout", function (uiSliderConfig, $timeout) {
    return uiSliderConfig = uiSliderConfig || {}, {require: "ngModel", compile: function () {
        return function ($scope, elm, $attrs, ngModel) {
            function parseNumber(n, decimals) {
                return decimals ? parseFloat(n) : parseInt(n)
            }

            function destroy() {
                elm.slider("destroy")
            }

            var options = angular.extend($scope.$eval($attrs.uiSlider) || {}, uiSliderConfig), prevRangeValues = {min: null, max: null}, init = function () {
                angular.isArray(ngModel.$viewValue) && options.range !== !0 && (console.warn("Change your range option of ui-slider. When assigning ngModel an array of values then the range option should be set to true."), options.range = !0), elm.slider(options), init = angular.noop
            }, properties = ["min", "max", "step"], useDecimals = angular.isUndefined($attrs.useDecimals) ? !1 : !0;
            $.each(properties, function (i, property) {
                $attrs.$observe(property, function (newVal) {
                    newVal && (init(), elm.slider("option", property, parseNumber(newVal, useDecimals)))
                })
            }), $attrs.$observe("disabled", function (newVal) {
                init(), elm.slider("option", "disabled", !!newVal)
            }), $scope.$watch($attrs.uiSlider, function (newVal) {
                init(), elm.slider("option", newVal)
            }, !0), $timeout(init, 0, !0), elm.bind("slide", function (event, ui) {
                ngModel.$setViewValue(ui.values || ui.value), $scope.$apply()
            }), ngModel.$render = function () {
                init();
                var method = options.range === !0 ? "values" : "value";
                ngModel.$viewValue || (ngModel.$viewValue = 0), options.range === !0 && (angular.isDefined(options.min) && options.min > ngModel.$viewValue[0] && (ngModel.$viewValue[0] = options.min), angular.isDefined(options.max) && options.max < ngModel.$viewValue[1] && (ngModel.$viewValue[1] = options.max), ngModel.$viewValue[0] >= ngModel.$viewValue[1] && (prevRangeValues.min >= ngModel.$viewValue[1] && (ngModel.$viewValue[0] = prevRangeValues.min), prevRangeValues.max <= ngModel.$viewValue[0] && (ngModel.$viewValue[1] = prevRangeValues.max)), prevRangeValues.min = ngModel.$viewValue[0], prevRangeValues.max = ngModel.$viewValue[1]), elm.slider(method, ngModel.$viewValue)
            }, $scope.$watch($attrs.ngModel, function () {
                options.range === !0 && ngModel.$render()
            }, !0), elm.bind("$destroy", destroy)
        }
    }}
}]), "undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "ui.router"), function (a, b, c) {
    function d(a, b) {
        return H(new (H(function () {
        }, {prototype: a})), b)
    }

    function e(a) {
        return G(arguments, function (b) {
            b !== a && G(b, function (b, c) {
                a.hasOwnProperty(c) || (a[c] = b)
            })
        }), a
    }

    function f(a, b) {
        var c = [];
        for (var d in a.path) {
            if (a.path[d] !== b.path[d])break;
            c.push(a.path[d])
        }
        return c
    }

    function g(a, b) {
        if (Array.prototype.indexOf)return a.indexOf(b, Number(arguments[2]) || 0);
        var c = a.length >>> 0, d = Number(arguments[2]) || 0;
        for (d = 0 > d ? Math.ceil(d) : Math.floor(d), 0 > d && (d += c); c > d; d++)if (d in a && a[d] === b)return d;
        return-1
    }

    function h(a, b, c, d) {
        var e, h = f(c, d), i = {}, j = [];
        for (var k in h)if (h[k].params && h[k].params.length) {
            e = h[k].params;
            for (var l in e)g(j, e[l]) >= 0 || (j.push(e[l]), i[e[l]] = a[e[l]])
        }
        return H({}, i, b)
    }

    function i(a, b) {
        var c = {};
        return G(a, function (a) {
            var d = b[a];
            c[a] = null != d ? String(d) : null
        }), c
    }

    function j(a, b, c) {
        if (!c) {
            c = [];
            for (var d in a)c.push(d)
        }
        for (var e = 0; e < c.length; e++) {
            var f = c[e];
            if (a[f] != b[f])return!1
        }
        return!0
    }

    function k(a, b) {
        var c = {};
        return G(a, function (a) {
            c[a] = b[a]
        }), c
    }

    function l(a, b) {
        var d = 1, f = 2, g = {}, h = [], i = g, j = H(a.when(g), {$$promises: g, $$values: g});
        this.study = function (g) {
            function k(a, c) {
                if (o[c] !== f) {
                    if (n.push(c), o[c] === d)throw n.splice(0, n.indexOf(c)), new Error("Cyclic dependency: " + n.join(" -> "));
                    if (o[c] = d, D(a))m.push(c, [function () {
                        return b.get(a)
                    }], h); else {
                        var e = b.annotate(a);
                        G(e, function (a) {
                            a !== c && g.hasOwnProperty(a) && k(g[a], a)
                        }), m.push(c, a, e)
                    }
                    n.pop(), o[c] = f
                }
            }

            function l(a) {
                return E(a) && a.then && a.$$promises
            }

            if (!E(g))throw new Error("'invocables' must be an object");
            var m = [], n = [], o = {};
            return G(g, k), g = n = o = null, function (d, f, g) {
                function h() {
                    --s || (t || e(r, f.$$values), p.$$values = r, p.$$promises = !0, o.resolve(r))
                }

                function k(a) {
                    p.$$failure = a, o.reject(a)
                }

                function n(c, e, f) {
                    function i(a) {
                        l.reject(a), k(a)
                    }

                    function j() {
                        if (!B(p.$$failure))try {
                            l.resolve(b.invoke(e, g, r)), l.promise.then(function (a) {
                                r[c] = a, h()
                            }, i)
                        } catch (a) {
                            i(a)
                        }
                    }

                    var l = a.defer(), m = 0;
                    G(f, function (a) {
                        q.hasOwnProperty(a) && !d.hasOwnProperty(a) && (m++, q[a].then(function (b) {
                            r[a] = b, --m || j()
                        }, i))
                    }), m || j(), q[c] = l.promise
                }

                if (l(d) && g === c && (g = f, f = d, d = null), d) {
                    if (!E(d))throw new Error("'locals' must be an object")
                } else d = i;
                if (f) {
                    if (!l(f))throw new Error("'parent' must be a promise returned by $resolve.resolve()")
                } else f = j;
                var o = a.defer(), p = o.promise, q = p.$$promises = {}, r = H({}, d), s = 1 + m.length / 3, t = !1;
                if (B(f.$$failure))return k(f.$$failure), p;
                f.$$values ? (t = e(r, f.$$values), h()) : (H(q, f.$$promises), f.then(h, k));
                for (var u = 0, v = m.length; v > u; u += 3)d.hasOwnProperty(m[u]) ? h() : n(m[u], m[u + 1], m[u + 2]);
                return p
            }
        }, this.resolve = function (a, b, c, d) {
            return this.study(a)(b, c, d)
        }
    }

    function m(a, b, c) {
        this.fromConfig = function (a, b, c) {
            return B(a.template) ? this.fromString(a.template, b) : B(a.templateUrl) ? this.fromUrl(a.templateUrl, b) : B(a.templateProvider) ? this.fromProvider(a.templateProvider, b, c) : null
        }, this.fromString = function (a, b) {
            return C(a) ? a(b) : a
        }, this.fromUrl = function (c, d) {
            return C(c) && (c = c(d)), null == c ? null : a.get(c, {cache: b}).then(function (a) {
                return a.data
            })
        }, this.fromProvider = function (a, b, d) {
            return c.invoke(a, null, d || {params: b})
        }
    }

    function n(a) {
        function b(b) {
            if (!/^\w+(-+\w+)*$/.test(b))throw new Error("Invalid parameter name '" + b + "' in pattern '" + a + "'");
            if (f[b])throw new Error("Duplicate parameter name '" + b + "' in pattern '" + a + "'");
            f[b] = !0, j.push(b)
        }

        function c(a) {
            return a.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&")
        }

        var d, e = /([:*])(\w+)|\{(\w+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, f = {}, g = "^", h = 0, i = this.segments = [], j = this.params = [];
        this.source = a;
        for (var k, l, m; (d = e.exec(a)) && (k = d[2] || d[3], l = d[4] || ("*" == d[1] ? ".*" : "[^/]*"), m = a.substring(h, d.index), !(m.indexOf("?") >= 0));)g += c(m) + "(" + l + ")", b(k), i.push(m), h = e.lastIndex;
        m = a.substring(h);
        var n = m.indexOf("?");
        if (n >= 0) {
            var o = this.sourceSearch = m.substring(n);
            m = m.substring(0, n), this.sourcePath = a.substring(0, h + n), G(o.substring(1).split(/[&?]/), b)
        } else this.sourcePath = a, this.sourceSearch = "";
        g += c(m) + "$", i.push(m), this.regexp = new RegExp(g), this.prefix = i[0]
    }

    function o() {
        this.compile = function (a) {
            return new n(a)
        }, this.isMatcher = function (a) {
            return E(a) && C(a.exec) && C(a.format) && C(a.concat)
        }, this.$get = function () {
            return this
        }
    }

    function p(a) {
        function b(a) {
            var b = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);
            return null != b ? b[1].replace(/\\(.)/g, "$1") : ""
        }

        function c(a, b) {
            return a.replace(/\$(\$|\d{1,2})/, function (a, c) {
                return b["$" === c ? 0 : Number(c)]
            })
        }

        function d(a, b, c) {
            if (!c)return!1;
            var d = a.invoke(b, b, {$match: c});
            return B(d) ? d : !0
        }

        var e = [], f = null;
        this.rule = function (a) {
            if (!C(a))throw new Error("'rule' must be a function");
            return e.push(a), this
        }, this.otherwise = function (a) {
            if (D(a)) {
                var b = a;
                a = function () {
                    return b
                }
            } else if (!C(a))throw new Error("'rule' must be a function");
            return f = a, this
        }, this.when = function (e, f) {
            var g, h = D(f);
            if (D(e) && (e = a.compile(e)), !h && !C(f) && !F(f))throw new Error("invalid 'handler' in when()");
            var i = {matcher: function (b, c) {
                return h && (g = a.compile(c), c = ["$match", function (a) {
                    return g.format(a)
                }]), H(function (a, e) {
                    return d(a, c, b.exec(e.path(), e.search()))
                }, {prefix: D(b.prefix) ? b.prefix : ""})
            }, regex: function (a, e) {
                if (a.global || a.sticky)throw new Error("when() RegExp must not be global or sticky");
                return h && (g = e, e = ["$match", function (a) {
                    return c(g, a)
                }]), H(function (b, c) {
                    return d(b, e, a.exec(c.path()))
                }, {prefix: b(a)})
            }}, j = {matcher: a.isMatcher(e), regex: e instanceof RegExp};
            for (var k in j)if (j[k])return this.rule(i[k](e, f));
            throw new Error("invalid 'what' in when()")
        }, this.$get = ["$location", "$rootScope", "$injector", function (a, b, c) {
            function d(b) {
                function d(b) {
                    var d = b(c, a);
                    return d ? (D(d) && a.replace().url(d), !0) : !1
                }

                if (!b || !b.defaultPrevented) {
                    var g, h = e.length;
                    for (g = 0; h > g; g++)if (d(e[g]))return;
                    f && d(f)
                }
            }

            return b.$on("$locationChangeSuccess", d), {sync: function () {
                d()
            }}
        }]
    }

    function q(a, e, f) {
        function g(a) {
            return 0 === a.indexOf(".") || 0 === a.indexOf("^")
        }

        function l(a, b) {
            var d = D(a), e = d ? a : a.name, f = g(e);
            if (f) {
                if (!b)throw new Error("No reference point given for path '" + e + "'");
                for (var h = e.split("."), i = 0, j = h.length, k = b; j > i; i++)if ("" !== h[i] || 0 !== i) {
                    if ("^" !== h[i])break;
                    if (!k.parent)throw new Error("Path '" + e + "' not valid for state '" + b.name + "'");
                    k = k.parent
                } else k = b;
                h = h.slice(i).join("."), e = k.name + (k.name && h ? "." : "") + h
            }
            var l = u[e];
            return!l || !d && (d || l !== a && l.self !== a) ? c : l
        }

        function m(a, b) {
            v[a] || (v[a] = []), v[a].push(b)
        }

        function n(b) {
            b = d(b, {self: b, resolve: b.resolve || {}, toString: function () {
                return this.name
            }});
            var c = b.name;
            if (!D(c) || c.indexOf("@") >= 0)throw new Error("State must have a valid name");
            if (u.hasOwnProperty(c))throw new Error("State '" + c + "'' is already defined");
            var e = -1 !== c.indexOf(".") ? c.substring(0, c.lastIndexOf(".")) : D(b.parent) ? b.parent : "";
            if (e && !u[e])return m(e, b.self);
            for (var f in x)C(x[f]) && (b[f] = x[f](b, x.$delegates[f]));
            if (u[c] = b, !b[w] && b.url && a.when(b.url, ["$match", "$stateParams", function (a, c) {
                t.$current.navigable == b && j(a, c) || t.transitionTo(b, a, {location: !1})
            }]), v[c])for (var g = 0; g < v[c].length; g++)n(v[c][g]);
            return b
        }

        function o(a, b) {
            return D(a) && !B(b) ? x[a] : C(b) && D(a) ? (x[a] && !x.$delegates[a] && (x.$delegates[a] = x[a]), x[a] = b, this) : this
        }

        function p(a, b) {
            return E(a) ? b = a : b.name = a, n(b), this
        }

        function q(a, e, g, m, n, o, p) {
            function q() {
                p.url() !== D && (p.url(D), p.replace())
            }

            function v(a, c, d, f, h) {
                var i = d ? c : k(a.params, c), j = {$stateParams: i};
                h.resolve = n.resolve(a.resolve, j, h.resolve, a);
                var l = [h.resolve.then(function (a) {
                    h.globals = a
                })];
                return f && l.push(f), G(a.views, function (c, d) {
                    var e = c.resolve && c.resolve !== a.resolve ? c.resolve : {};
                    e.$template = [function () {
                        return g.load(d, {view: c, locals: j, params: i, notify: !1}) || ""
                    }], l.push(n.resolve(e, j, h.resolve, a).then(function (f) {
                        if (C(c.controllerProvider) || F(c.controllerProvider)) {
                            var g = b.extend({}, e, j);
                            f.$$controller = m.invoke(c.controllerProvider, null, g)
                        } else f.$$controller = c.controller;
                        f.$$state = a, h[d] = f
                    }))
                }), e.all(l).then(function () {
                    return h
                })
            }

            var x = e.reject(new Error("transition superseded")), y = e.reject(new Error("transition prevented")), z = e.reject(new Error("transition aborted")), A = e.reject(new Error("transition failed")), D = p.url();
            return s.locals = {resolve: null, globals: {$stateParams: {}}}, t = {params: {}, current: s.self, $current: s, transition: null}, t.reload = function () {
                t.transitionTo(t.current, o, {reload: !0, inherit: !1, notify: !1})
            }, t.go = function (a, b, c) {
                return this.transitionTo(a, b, H({inherit: !0, relative: t.$current}, c))
            }, t.transitionTo = function (b, c, f) {
                c = c || {}, f = H({location: !0, inherit: !1, relative: null, notify: !0, reload: !1, $retry: !1}, f || {});
                var g, k = t.$current, n = t.params, u = k.path, C = l(b, f.relative);
                if (!B(C)) {
                    var E = {to: b, toParams: c, options: f};
                    if (g = a.$broadcast("$stateNotFound", E, k.self, n), g.defaultPrevented)return q(), z;
                    if (g.retry) {
                        if (f.$retry)return q(), A;
                        var F = t.transition = e.when(g.retry);
                        return F.then(function () {
                            return F !== t.transition ? x : (E.options.$retry = !0, t.transitionTo(E.to, E.toParams, E.options))
                        }, function () {
                            return z
                        }), q(), F
                    }
                    if (b = E.to, c = E.toParams, f = E.options, C = l(b, f.relative), !B(C)) {
                        if (f.relative)throw new Error("Could not resolve '" + b + "' from state '" + f.relative + "'");
                        throw new Error("No such state '" + b + "'")
                    }
                }
                if (C[w])throw new Error("Cannot transition to abstract state '" + b + "'");
                f.inherit && (c = h(o, c || {}, t.$current, C)), b = C;
                var G, J, K = b.path, L = s.locals, M = [];
                for (G = 0, J = K[G]; J && J === u[G] && j(c, n, J.ownParams) && !f.reload; G++, J = K[G])L = M[G] = J.locals;
                if (r(b, k, L, f))return b.self.reloadOnSearch !== !1 && q(), t.transition = null, e.when(t.current);
                if (c = i(b.params, c || {}), f.notify && (g = a.$broadcast("$stateChangeStart", b.self, c, k.self, n), g.defaultPrevented))return q(), y;
                for (var N = e.when(L), O = G; O < K.length; O++, J = K[O])L = M[O] = d(L), N = v(J, c, J === b, N, L);
                var P = t.transition = N.then(function () {
                    var d, e, g;
                    if (t.transition !== P)return x;
                    for (d = u.length - 1; d >= G; d--)g = u[d], g.self.onExit && m.invoke(g.self.onExit, g.self, g.locals.globals), g.locals = null;
                    for (d = G; d < K.length; d++)e = K[d], e.locals = M[d], e.self.onEnter && m.invoke(e.self.onEnter, e.self, e.locals.globals);
                    if (t.transition !== P)return x;
                    t.$current = b, t.current = b.self, t.params = c, I(t.params, o), t.transition = null;
                    var h = b.navigable;
                    return f.location && h && (p.url(h.url.format(h.locals.globals.$stateParams)), "replace" === f.location && p.replace()), f.notify && a.$broadcast("$stateChangeSuccess", b.self, c, k.self, n), D = p.url(), t.current
                }, function (d) {
                    return t.transition !== P ? x : (t.transition = null, a.$broadcast("$stateChangeError", b.self, c, k.self, n, d), q(), e.reject(d))
                });
                return P
            }, t.is = function (a, d) {
                var e = l(a);
                return B(e) ? t.$current !== e ? !1 : B(d) && null !== d ? b.equals(o, d) : !0 : c
            }, t.includes = function (a, d) {
                var e = l(a);
                if (!B(e))return c;
                if (!B(t.$current.includes[e.name]))return!1;
                var f = !0;
                return b.forEach(d, function (a, b) {
                    B(o[b]) && o[b] === a || (f = !1)
                }), f
            }, t.href = function (a, b, c) {
                c = H({lossy: !0, inherit: !1, absolute: !1, relative: t.$current}, c || {});
                var d = l(a, c.relative);
                if (!B(d))return null;
                b = h(o, b || {}, t.$current, d);
                var e = d && c.lossy ? d.navigable : d, g = e && e.url ? e.url.format(i(d.params, b || {})) : null;
                return!f.html5Mode() && g && (g = "#" + f.hashPrefix() + g), c.absolute && g && (g = p.protocol() + "://" + p.host() + (80 == p.port() || 443 == p.port() ? "" : ":" + p.port()) + (!f.html5Mode() && g ? "/" : "") + g), g
            }, t.get = function (a, b) {
                if (!B(a)) {
                    var c = [];
                    return G(u, function (a) {
                        c.push(a.self)
                    }), c
                }
                var d = l(a, b);
                return d && d.self ? d.self : null
            }, t
        }

        function r(a, b, c, d) {
            return a !== b || (c !== b.locals || d.reload) && a.self.reloadOnSearch !== !1 ? void 0 : !0
        }

        var s, t, u = {}, v = {}, w = "abstract", x = {parent: function (a) {
            if (B(a.parent) && a.parent)return l(a.parent);
            var b = /^(.+)\.[^.]+$/.exec(a.name);
            return b ? l(b[1]) : s
        }, data: function (a) {
            return a.parent && a.parent.data && (a.data = a.self.data = H({}, a.parent.data, a.data)), a.data
        }, url: function (a) {
            var b = a.url;
            if (D(b))return"^" == b.charAt(0) ? e.compile(b.substring(1)) : (a.parent.navigable || s).url.concat(b);
            if (e.isMatcher(b) || null == b)return b;
            throw new Error("Invalid url '" + b + "' in state '" + a + "'")
        }, navigable: function (a) {
            return a.url ? a : a.parent ? a.parent.navigable : null
        }, params: function (a) {
            if (!a.params)return a.url ? a.url.parameters() : a.parent.params;
            if (!F(a.params))throw new Error("Invalid params in state '" + a + "'");
            if (a.url)throw new Error("Both params and url specicified in state '" + a + "'");
            return a.params
        }, views: function (a) {
            var b = {};
            return G(B(a.views) ? a.views : {"": a}, function (c, d) {
                d.indexOf("@") < 0 && (d += "@" + a.parent.name), b[d] = c
            }), b
        }, ownParams: function (a) {
            if (!a.parent)return a.params;
            var b = {};
            G(a.params, function (a) {
                b[a] = !0
            }), G(a.parent.params, function (c) {
                if (!b[c])throw new Error("Missing required parameter '" + c + "' in state '" + a.name + "'");
                b[c] = !1
            });
            var c = [];
            return G(b, function (a, b) {
                a && c.push(b)
            }), c
        }, path: function (a) {
            return a.parent ? a.parent.path.concat(a) : []
        }, includes: function (a) {
            var b = a.parent ? H({}, a.parent.includes) : {};
            return b[a.name] = !0, b
        }, $delegates: {}};
        s = n({name: "", url: "^", views: null, "abstract": !0}), s.navigable = null, this.decorator = o, this.state = p, this.$get = q, q.$inject = ["$rootScope", "$q", "$view", "$injector", "$resolve", "$stateParams", "$location", "$urlRouter"]
    }

    function r() {
        function a(a, b) {
            return{load: function (c, d) {
                var e, f = {template: null, controller: null, view: null, locals: null, notify: !0, async: !0, params: {}};
                return d = H(f, d), d.view && (e = b.fromConfig(d.view, d.params, d.locals)), e && d.notify && a.$broadcast("$viewContentLoading", d), e
            }}
        }

        this.$get = a, a.$inject = ["$rootScope", "$templateFactory"]
    }

    function s() {
        var a = !1;
        this.useAnchorScroll = function () {
            a = !0
        }, this.$get = ["$anchorScroll", "$timeout", function (b, c) {
            return a ? b : function (a) {
                c(function () {
                    a[0].scrollIntoView()
                }, 0, !1)
            }
        }]
    }

    function t(a, c, d, e, f, g) {
        function h() {
            return e.has ? function (a) {
                return e.has(a) ? e.get(a) : null
            } : function (a) {
                try {
                    return e.get(a)
                } catch (b) {
                    return null
                }
            }
        }

        function i(a, b, c) {
            var d = function () {
                return{leave: function (a) {
                    a.remove()
                }, enter: function (a, b, c) {
                    c.after(a)
                }}
            };
            if (m)return function (a) {
                return a ? {enter: function (a, b, c) {
                    m.enter(a, null, c)
                }, leave: function (a) {
                    m.leave(a, function () {
                        a.remove()
                    })
                }} : d()
            };
            if (l) {
                var e = l && l(c, b);
                return function (a) {
                    return a ? {enter: function (a, b) {
                        e.enter(a, b)
                    }, leave: function (a) {
                        e.leave(a.contents(), a)
                    }} : d()
                }
            }
            return d
        }

        var j = !1, k = h(), l = k("$animator"), m = k("$animate"), n = {restrict: "ECA", compile: function (e, h) {
            var k = e.html(), l = !0, m = b.element(g[0].createComment(" ui-view-anchor ")), o = e.parent();
            return e.prepend(m), function (g) {
                function p() {
                    s && (y(!0).leave(s), s = null), r && (r.$destroy(), r = null)
                }

                function q(h) {
                    var i = a.$current && a.$current.locals[v];
                    if (l && (l = !1, e.replaceWith(m)), !i)return p(), s = e.clone(), s.html(k), y(h).enter(s, o, m), r = g.$new(), void c(s.contents())(r);
                    if (i !== t) {
                        p(), s = e.clone(), s.html(i.$template ? i.$template : k), y(!0).enter(s, o, m), s.data("$uiView", z), t = i, z.state = i.$$state;
                        var j = c(s.contents());
                        if (r = g.$new(), i.$$controller) {
                            i.$scope = r;
                            var n = d(i.$$controller, i);
                            s.children().data("$ngControllerController", n)
                        }
                        j(r), r.$emit("$viewContentLoaded"), w && r.$eval(w), b.isDefined(x) && x && !g.$eval(x) || f(s)
                    }
                }

                var r, s, t, u = o.inheritedData("$uiView"), v = h[n.name] || h.name || "", w = h.onload || "", x = h.autoscroll, y = i(e, h, g);
                v.indexOf("@") < 0 && (v = v + "@" + (u ? u.state.name : ""));
                var z = {name: v, state: null}, A = function () {
                    if (!j) {
                        j = !0;
                        try {
                            q(!0)
                        } catch (a) {
                            throw j = !1, a
                        }
                        j = !1
                    }
                };
                g.$on("$stateChangeSuccess", A), g.$on("$viewContentLoading", A), q(!1)
            }
        }};
        return n
    }

    function u(a) {
        var b = a.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);
        if (!b || 4 !== b.length)throw new Error("Invalid state ref '" + a + "'");
        return{state: b[1], paramExpr: b[3] || null}
    }

    function v(a) {
        var b = a.parent().inheritedData("$uiView");
        return b && b.state && b.state.name ? b.state : void 0
    }

    function w(a, b) {
        return{restrict: "A", require: "?^uiSrefActive", link: function (c, d, e, f) {
            var g = u(e.uiSref), h = null, i = v(d) || a.$current, j = "FORM" === d[0].nodeName, k = j ? "action" : "href", l = !0, m = function (b) {
                if (b && (h = b), l) {
                    var c = a.href(g.state, h, {relative: i});
                    return f && f.$$setStateInfo(g.state, h), c ? void(d[0][k] = c) : (l = !1, !1)
                }
            };
            g.paramExpr && (c.$watch(g.paramExpr, function (a) {
                a !== h && m(a)
            }, !0), h = c.$eval(g.paramExpr)), m(), j || d.bind("click", function (c) {
                var e = c.which || c.button;
                0 !== e && 1 != e || c.ctrlKey || c.metaKey || c.shiftKey || d.attr("target") || (b(function () {
                    a.go(g.state, h, {relative: i})
                }), c.preventDefault())
            })
        }}
    }

    function x(a, b, c) {
        return{restrict: "A", controller: ["$scope", "$element", "$attrs", function (d, e, f) {
            function g() {
                a.$current.self === i && h() ? e.addClass(l) : e.removeClass(l)
            }

            function h() {
                return!k || j(k, b)
            }

            var i, k, l;
            l = c(f.uiSrefActive || "", !1)(d), this.$$setStateInfo = function (b, c) {
                i = a.get(b, v(e)), k = c, g()
            }, d.$on("$stateChangeSuccess", g)
        }]}
    }

    function y(a) {
        return function (b) {
            return a.is(b)
        }
    }

    function z(a) {
        return function (b) {
            return a.includes(b)
        }
    }

    function A(a, b) {
        function e(a) {
            this.locals = a.locals.globals, this.params = this.locals.$stateParams
        }

        function f() {
            this.locals = null, this.params = null
        }

        function g(c, g) {
            if (null != g.redirectTo) {
                var h, j = g.redirectTo;
                if (D(j))h = j; else {
                    if (!C(j))throw new Error("Invalid 'redirectTo' in when()");
                    h = function (a, b) {
                        return j(a, b.path(), b.search())
                    }
                }
                b.when(c, h)
            } else a.state(d(g, {parent: null, name: "route:" + encodeURIComponent(c), url: c, onEnter: e, onExit: f}));
            return i.push(g), this
        }

        function h(a, b, d) {
            function e(a) {
                return"" !== a.name ? a : c
            }

            var f = {routes: i, params: d, current: c};
            return b.$on("$stateChangeStart", function (a, c, d, f) {
                b.$broadcast("$routeChangeStart", e(c), e(f))
            }), b.$on("$stateChangeSuccess", function (a, c, d, g) {
                f.current = e(c), b.$broadcast("$routeChangeSuccess", e(c), e(g)), I(d, f.params)
            }), b.$on("$stateChangeError", function (a, c, d, f, g, h) {
                b.$broadcast("$routeChangeError", e(c), e(f), h)
            }), f
        }

        var i = [];
        e.$inject = ["$$state"], this.when = g, this.$get = h, h.$inject = ["$state", "$rootScope", "$routeParams"]
    }

    var B = b.isDefined, C = b.isFunction, D = b.isString, E = b.isObject, F = b.isArray, G = b.forEach, H = b.extend, I = b.copy;
    b.module("ui.router.util", ["ng"]), b.module("ui.router.router", ["ui.router.util"]), b.module("ui.router.state", ["ui.router.router", "ui.router.util"]), b.module("ui.router", ["ui.router.state"]), b.module("ui.router.compat", ["ui.router"]), l.$inject = ["$q", "$injector"], b.module("ui.router.util").service("$resolve", l), m.$inject = ["$http", "$templateCache", "$injector"], b.module("ui.router.util").service("$templateFactory", m), n.prototype.concat = function (a) {
        return new n(this.sourcePath + a + this.sourceSearch)
    }, n.prototype.toString = function () {
        return this.source
    }, n.prototype.exec = function (a, b) {
        var c = this.regexp.exec(a);
        if (!c)return null;
        var d, e = this.params, f = e.length, g = this.segments.length - 1, h = {};
        if (g !== c.length - 1)throw new Error("Unbalanced capture group in route '" + this.source + "'");
        for (d = 0; g > d; d++)h[e[d]] = c[d + 1];
        for (; f > d; d++)h[e[d]] = b[e[d]];
        return h
    }, n.prototype.parameters = function () {
        return this.params
    }, n.prototype.format = function (a) {
        var b = this.segments, c = this.params;
        if (!a)return b.join("");
        var d, e, f, g = b.length - 1, h = c.length, i = b[0];
        for (d = 0; g > d; d++)f = a[c[d]], null != f && (i += encodeURIComponent(f)), i += b[d + 1];
        for (; h > d; d++)f = a[c[d]], null != f && (i += (e ? "&" : "?") + c[d] + "=" + encodeURIComponent(f), e = !0);
        return i
    }, b.module("ui.router.util").provider("$urlMatcherFactory", o), p.$inject = ["$urlMatcherFactoryProvider"], b.module("ui.router.router").provider("$urlRouter", p), q.$inject = ["$urlRouterProvider", "$urlMatcherFactoryProvider", "$locationProvider"], b.module("ui.router.state").value("$stateParams", {}).provider("$state", q), r.$inject = [], b.module("ui.router.state").provider("$view", r), b.module("ui.router.state").provider("$uiViewScroll", s), t.$inject = ["$state", "$compile", "$controller", "$injector", "$uiViewScroll", "$document"], b.module("ui.router.state").directive("uiView", t), w.$inject = ["$state", "$timeout"], x.$inject = ["$state", "$stateParams", "$interpolate"], b.module("ui.router.state").directive("uiSref", w).directive("uiSrefActive", x), y.$inject = ["$state"], z.$inject = ["$state"], b.module("ui.router.state").filter("isState", y).filter("includedByState", z), A.$inject = ["$stateProvider", "$urlRouterProvider"], b.module("ui.router.compat").provider("$route", A).directive("ngView", t)
}(window, window.angular), function ($) {
    var history_handle_top, timer, body, jwindow = $(window), styling = {jqueryui: {container: "ui-widget ui-widget-content ui-corner-all", notice: "ui-state-highlight", notice_icon: "ui-icon ui-icon-info", info: "", info_icon: "ui-icon ui-icon-info", success: "ui-state-default", success_icon: "ui-icon ui-icon-circle-check", error: "ui-state-error", error_icon: "ui-icon ui-icon-alert", closer: "ui-icon ui-icon-close", pin_up: "ui-icon ui-icon-pin-w", pin_down: "ui-icon ui-icon-pin-s", hi_menu: "ui-state-default ui-corner-bottom", hi_btn: "ui-state-default ui-corner-all", hi_btnhov: "ui-state-hover", hi_hnd: "ui-icon ui-icon-grip-dotted-horizontal"}, bootstrap: {container: "alert", notice: "", notice_icon: "icon-exclamation-sign", info: "alert-info", info_icon: "icon-info-sign", success: "alert-success", success_icon: "icon-ok-sign", error: "alert-danger", error_icon: "icon-warning-sign", closer: "glyphicon glyphicon-remove", pin_up: "icon-pause", pin_down: "icon-play", hi_menu: "well", hi_btn: "btn", hi_btnhov: "", hi_hnd: "icon-chevron-down"}}, do_when_ready = function () {
        body = $("body"), jwindow = $(window), jwindow.bind("resize", function () {
            timer && clearTimeout(timer), timer = setTimeout($.pnotify_position_all, 10)
        })
    };
    document.body ? do_when_ready() : $(do_when_ready), $.extend({pnotify_remove_all: function () {
        var notices_data = jwindow.data("pnotify");
        notices_data && notices_data.length && $.each(notices_data, function () {
            this.pnotify_remove && this.pnotify_remove()
        })
    }, pnotify_position_all: function () {
        timer && clearTimeout(timer), timer = null;
        var notices_data = jwindow.data("pnotify");
        notices_data && notices_data.length && ($.each(notices_data, function () {
            var s = this.opts.stack;
            s && (s.nextpos1 = s.firstpos1, s.nextpos2 = s.firstpos2, s.addpos2 = 0, s.animation = !0)
        }), $.each(notices_data, function () {
            this.pnotify_position()
        }))
    }, pnotify: function (options) {
        var animating, opts;
        "object" != typeof options ? (opts = $.extend({}, $.pnotify.defaults), opts.text = options) : opts = $.extend({}, $.pnotify.defaults, options);
        for (var i in opts)"string" == typeof i && i.match(/^pnotify_/) && (opts[i.replace(/^pnotify_/, "")] = opts[i]);
        if (opts.before_init && opts.before_init(opts) === !1)return null;
        var nonblock_last_elem, nonblock_pass = function (e, e_name) {
            pnotify.css("display", "none");
            var element_below = document.elementFromPoint(e.clientX, e.clientY);
            pnotify.css("display", "block");
            var jelement_below = $(element_below), cursor_style = jelement_below.css("cursor");
            pnotify.css("cursor", "auto" != cursor_style ? cursor_style : "default"), nonblock_last_elem && nonblock_last_elem.get(0) == element_below || (nonblock_last_elem && (dom_event.call(nonblock_last_elem.get(0), "mouseleave", e.originalEvent), dom_event.call(nonblock_last_elem.get(0), "mouseout", e.originalEvent)), dom_event.call(element_below, "mouseenter", e.originalEvent), dom_event.call(element_below, "mouseover", e.originalEvent)), dom_event.call(element_below, e_name, e.originalEvent), nonblock_last_elem = jelement_below
        }, styles = styling[opts.styling], pnotify = $("<div />", {"class": "ui-pnotify " + opts.addclass, css: {display: "none"}, mouseenter: function (e) {
            opts.nonblock && e.stopPropagation(), opts.mouse_reset && "out" == animating && (pnotify.stop(!0), animating = "in", pnotify.css("height", "auto").animate({width: opts.width, opacity: opts.nonblock ? opts.nonblock_opacity : opts.opacity}, "fast")), opts.nonblock && pnotify.animate({opacity: opts.nonblock_opacity}, "fast"), opts.hide && opts.mouse_reset && pnotify.pnotify_cancel_remove(), opts.sticker && !opts.nonblock && pnotify.sticker.trigger("pnotify_icon").css("visibility", "visible"), opts.closer && !opts.nonblock && pnotify.closer.css("visibility", "visible")
        }, mouseleave: function (e) {
            opts.nonblock && e.stopPropagation(), nonblock_last_elem = null, pnotify.css("cursor", "auto"), opts.nonblock && "out" != animating && pnotify.animate({opacity: opts.opacity}, "fast"), opts.hide && opts.mouse_reset && pnotify.pnotify_queue_remove(), opts.sticker_hover && pnotify.sticker.css("visibility", "hidden"), opts.closer_hover && pnotify.closer.css("visibility", "hidden"), $.pnotify_position_all()
        }, mouseover: function (e) {
            opts.nonblock && e.stopPropagation()
        }, mouseout: function (e) {
            opts.nonblock && e.stopPropagation()
        }, mousemove: function (e) {
            opts.nonblock && (e.stopPropagation(), nonblock_pass(e, "onmousemove"))
        }, mousedown: function (e) {
            opts.nonblock && (e.stopPropagation(), e.preventDefault(), nonblock_pass(e, "onmousedown"))
        }, mouseup: function (e) {
            opts.nonblock && (e.stopPropagation(), e.preventDefault(), nonblock_pass(e, "onmouseup"))
        }, click: function (e) {
            opts.nonblock && (e.stopPropagation(), nonblock_pass(e, "onclick"))
        }, dblclick: function (e) {
            opts.nonblock && (e.stopPropagation(), nonblock_pass(e, "ondblclick"))
        }});
        pnotify.opts = opts, pnotify.container = $("<div />", {"class": styles.container + " ui-pnotify-container " + ("error" == opts.type ? styles.error : "info" == opts.type ? styles.info : "success" == opts.type ? styles.success : styles.notice)}).appendTo(pnotify), "" != opts.cornerclass && pnotify.container.removeClass("ui-corner-all").addClass(opts.cornerclass), opts.shadow && pnotify.container.addClass("ui-pnotify-shadow"), pnotify.pnotify_version = "1.2.0", pnotify.pnotify = function (options) {
            var old_opts = opts;
            "string" == typeof options ? opts.text = options : opts = $.extend({}, opts, options);
            for (var i in opts)"string" == typeof i && i.match(/^pnotify_/) && (opts[i.replace(/^pnotify_/, "")] = opts[i]);
            return pnotify.opts = opts, opts.cornerclass != old_opts.cornerclass && pnotify.container.removeClass("ui-corner-all").addClass(opts.cornerclass), opts.shadow != old_opts.shadow && (opts.shadow ? pnotify.container.addClass("ui-pnotify-shadow") : pnotify.container.removeClass("ui-pnotify-shadow")), opts.addclass === !1 ? pnotify.removeClass(old_opts.addclass) : opts.addclass !== old_opts.addclass && pnotify.removeClass(old_opts.addclass).addClass(opts.addclass), opts.title === !1 ? pnotify.title_container.slideUp("fast") : opts.title !== old_opts.title && (opts.title_escape ? pnotify.title_container.text(opts.title).slideDown(200) : pnotify.title_container.html(opts.title).slideDown(200)), opts.text === !1 ? pnotify.text_container.slideUp("fast") : opts.text !== old_opts.text && (opts.text_escape ? pnotify.text_container.text(opts.text).slideDown(200) : pnotify.text_container.html(opts.insert_brs ? String(opts.text).replace(/\n/g, "<br />") : opts.text).slideDown(200)), pnotify.pnotify_history = opts.history, pnotify.pnotify_hide = opts.hide, opts.type != old_opts.type && pnotify.container.removeClass(styles.error + " " + styles.notice + " " + styles.success + " " + styles.info).addClass("error" == opts.type ? styles.error : "info" == opts.type ? styles.info : "success" == opts.type ? styles.success : styles.notice), (opts.icon !== old_opts.icon || opts.icon === !0 && opts.type != old_opts.type) && (pnotify.container.find("div.ui-pnotify-icon").remove(), opts.icon !== !1 && $("<div />", {"class": "ui-pnotify-icon"}).append($("<span />", {"class": opts.icon === !0 ? "error" == opts.type ? styles.error_icon : "info" == opts.type ? styles.info_icon : "success" == opts.type ? styles.success_icon : styles.notice_icon : opts.icon})).prependTo(pnotify.container)), opts.width !== old_opts.width && pnotify.animate({width: opts.width}), opts.min_height !== old_opts.min_height && pnotify.container.animate({minHeight: opts.min_height}), opts.opacity !== old_opts.opacity && pnotify.fadeTo(opts.animate_speed, opts.opacity), !opts.closer || opts.nonblock ? pnotify.closer.css("display", "none") : pnotify.closer.css("display", "block"), !opts.sticker || opts.nonblock ? pnotify.sticker.css("display", "none") : pnotify.sticker.css("display", "block"), pnotify.sticker.trigger("pnotify_icon"), opts.sticker_hover ? pnotify.sticker.css("visibility", "hidden") : opts.nonblock || pnotify.sticker.css("visibility", "visible"), opts.closer_hover ? pnotify.closer.css("visibility", "hidden") : opts.nonblock || pnotify.closer.css("visibility", "visible"), opts.hide ? old_opts.hide || pnotify.pnotify_queue_remove() : pnotify.pnotify_cancel_remove(), pnotify.pnotify_queue_position(), pnotify
        }, pnotify.pnotify_position = function (dont_skip_hidden) {
            var s = pnotify.opts.stack;
            if (s) {
                s.nextpos1 || (s.nextpos1 = s.firstpos1), s.nextpos2 || (s.nextpos2 = s.firstpos2), s.addpos2 || (s.addpos2 = 0);
                var hidden = "none" == pnotify.css("display");
                if (!hidden || dont_skip_hidden) {
                    var curpos1, curpos2, csspos1, animate = {};
                    switch (s.dir1) {
                        case"down":
                            csspos1 = "top";
                            break;
                        case"up":
                            csspos1 = "bottom";
                            break;
                        case"left":
                            csspos1 = "right";
                            break;
                        case"right":
                            csspos1 = "left"
                    }
                    curpos1 = parseInt(pnotify.css(csspos1)), isNaN(curpos1) && (curpos1 = 0), "undefined" != typeof s.firstpos1 || hidden || (s.firstpos1 = curpos1, s.nextpos1 = s.firstpos1);
                    var csspos2;
                    switch (s.dir2) {
                        case"down":
                            csspos2 = "top";
                            break;
                        case"up":
                            csspos2 = "bottom";
                            break;
                        case"left":
                            csspos2 = "right";
                            break;
                        case"right":
                            csspos2 = "left"
                    }
                    if (curpos2 = parseInt(pnotify.css(csspos2)), isNaN(curpos2) && (curpos2 = 0), "undefined" != typeof s.firstpos2 || hidden || (s.firstpos2 = curpos2, s.nextpos2 = s.firstpos2), ("down" == s.dir1 && s.nextpos1 + pnotify.height() > jwindow.height() || "up" == s.dir1 && s.nextpos1 + pnotify.height() > jwindow.height() || "left" == s.dir1 && s.nextpos1 + pnotify.width() > jwindow.width() || "right" == s.dir1 && s.nextpos1 + pnotify.width() > jwindow.width()) && (s.nextpos1 = s.firstpos1, s.nextpos2 += s.addpos2 + ("undefined" == typeof s.spacing2 ? 25 : s.spacing2), s.addpos2 = 0), s.animation && s.nextpos2 < curpos2)switch (s.dir2) {
                        case"down":
                            animate.top = s.nextpos2 + "px";
                            break;
                        case"up":
                            animate.bottom = s.nextpos2 + "px";
                            break;
                        case"left":
                            animate.right = s.nextpos2 + "px";
                            break;
                        case"right":
                            animate.left = s.nextpos2 + "px"
                    } else pnotify.css(csspos2, s.nextpos2 + "px");
                    switch (s.dir2) {
                        case"down":
                        case"up":
                            pnotify.outerHeight(!0) > s.addpos2 && (s.addpos2 = pnotify.height());
                            break;
                        case"left":
                        case"right":
                            pnotify.outerWidth(!0) > s.addpos2 && (s.addpos2 = pnotify.width())
                    }
                    if (s.nextpos1)if (s.animation && (curpos1 > s.nextpos1 || animate.top || animate.bottom || animate.right || animate.left))switch (s.dir1) {
                        case"down":
                            animate.top = s.nextpos1 + "px";
                            break;
                        case"up":
                            animate.bottom = s.nextpos1 + "px";
                            break;
                        case"left":
                            animate.right = s.nextpos1 + "px";
                            break;
                        case"right":
                            animate.left = s.nextpos1 + "px"
                    } else pnotify.css(csspos1, s.nextpos1 + "px");
                    switch ((animate.top || animate.bottom || animate.right || animate.left) && pnotify.animate(animate, {duration: 500, queue: !1}), s.dir1) {
                        case"down":
                        case"up":
                            s.nextpos1 += pnotify.height() + ("undefined" == typeof s.spacing1 ? 25 : s.spacing1);
                            break;
                        case"left":
                        case"right":
                            s.nextpos1 += pnotify.width() + ("undefined" == typeof s.spacing1 ? 25 : s.spacing1)
                    }
                }
            }
        }, pnotify.pnotify_queue_position = function (milliseconds) {
            timer && clearTimeout(timer), milliseconds || (milliseconds = 10), timer = setTimeout($.pnotify_position_all, milliseconds)
        }, pnotify.pnotify_display = function () {
            pnotify.parent().length || pnotify.appendTo(body), opts.before_open && opts.before_open(pnotify) === !1 || ("top" != opts.stack.push && pnotify.pnotify_position(!0), "fade" == opts.animation || "fade" == opts.animation.effect_in ? pnotify.show().fadeTo(0, 0).hide() : 1 != opts.opacity && pnotify.show().fadeTo(0, opts.opacity).hide(), pnotify.animate_in(function () {
                opts.after_open && opts.after_open(pnotify), pnotify.pnotify_queue_position(), opts.hide && pnotify.pnotify_queue_remove()
            }))
        }, pnotify.pnotify_remove = function () {
            pnotify.timer && (window.clearTimeout(pnotify.timer), pnotify.timer = null), opts.before_close && opts.before_close(pnotify) === !1 || pnotify.animate_out(function () {
                opts.after_close && opts.after_close(pnotify) === !1 || (pnotify.pnotify_queue_position(), opts.remove && pnotify.detach())
            })
        }, pnotify.animate_in = function (callback) {
            animating = "in";
            var animation;
            animation = "undefined" != typeof opts.animation.effect_in ? opts.animation.effect_in : opts.animation, "none" == animation ? (pnotify.show(), callback()) : "show" == animation ? pnotify.show(opts.animate_speed, callback) : "fade" == animation ? pnotify.show().fadeTo(opts.animate_speed, opts.opacity, callback) : "slide" == animation ? pnotify.slideDown(opts.animate_speed, callback) : "function" == typeof animation ? animation("in", callback, pnotify) : pnotify.show(animation, "object" == typeof opts.animation.options_in ? opts.animation.options_in : {}, opts.animate_speed, callback)
        }, pnotify.animate_out = function (callback) {
            animating = "out";
            var animation;
            animation = "undefined" != typeof opts.animation.effect_out ? opts.animation.effect_out : opts.animation, "none" == animation ? (pnotify.hide(), callback()) : "show" == animation ? pnotify.hide(opts.animate_speed, callback) : "fade" == animation ? pnotify.fadeOut(opts.animate_speed, callback) : "slide" == animation ? pnotify.slideUp(opts.animate_speed, callback) : "function" == typeof animation ? animation("out", callback, pnotify) : pnotify.hide(animation, "object" == typeof opts.animation.options_out ? opts.animation.options_out : {}, opts.animate_speed, callback)
        }, pnotify.pnotify_cancel_remove = function () {
            pnotify.timer && window.clearTimeout(pnotify.timer)
        }, pnotify.pnotify_queue_remove = function () {
            pnotify.pnotify_cancel_remove(), pnotify.timer = window.setTimeout(function () {
                pnotify.pnotify_remove()
            }, isNaN(opts.delay) ? 0 : opts.delay)
        }, pnotify.closer = $("<div />", {"class": "ui-pnotify-closer", css: {cursor: "pointer", visibility: opts.closer_hover ? "hidden" : "visible"}, click: function () {
            pnotify.pnotify_remove(), pnotify.sticker.css("visibility", "hidden"), pnotify.closer.css("visibility", "hidden")
        }}).append($("<span />", {"class": styles.closer})).appendTo(pnotify.container), (!opts.closer || opts.nonblock) && pnotify.closer.css("display", "none"), pnotify.sticker = $("<div />", {"class": "ui-pnotify-sticker", css: {cursor: "pointer", visibility: opts.sticker_hover ? "hidden" : "visible"}, click: function () {
            opts.hide = !opts.hide, opts.hide ? pnotify.pnotify_queue_remove() : pnotify.pnotify_cancel_remove(), $(this).trigger("pnotify_icon")
        }}).bind("pnotify_icon", function () {
            $(this).children().removeClass(styles.pin_up + " " + styles.pin_down).addClass(opts.hide ? styles.pin_up : styles.pin_down)
        }).append($("<span />", {"class": styles.pin_up})).appendTo(pnotify.container), (!opts.sticker || opts.nonblock) && pnotify.sticker.css("display", "none"), opts.icon !== !1 && $("<div />", {"class": "ui-pnotify-icon"}).append($("<span />", {"class": opts.icon === !0 ? "error" == opts.type ? styles.error_icon : "info" == opts.type ? styles.info_icon : "success" == opts.type ? styles.success_icon : styles.notice_icon : opts.icon})).prependTo(pnotify.container), pnotify.title_container = $("<h4 />", {"class": "ui-pnotify-title"}).appendTo(pnotify.container), opts.title === !1 ? pnotify.title_container.hide() : opts.title_escape ? pnotify.title_container.text(opts.title) : pnotify.title_container.html(opts.title), pnotify.text_container = $("<div />", {"class": "ui-pnotify-text"}).appendTo(pnotify.container), opts.text === !1 ? pnotify.text_container.hide() : opts.text_escape ? pnotify.text_container.text(opts.text) : pnotify.text_container.html(opts.insert_brs ? String(opts.text).replace(/\n/g, "<br />") : opts.text), "string" == typeof opts.width && pnotify.css("width", opts.width), "string" == typeof opts.min_height && pnotify.container.css("min-height", opts.min_height), pnotify.pnotify_history = opts.history, pnotify.pnotify_hide = opts.hide;
        var notices_data = jwindow.data("pnotify");
        if ((null == notices_data || "object" != typeof notices_data) && (notices_data = []), notices_data = "top" == opts.stack.push ? $.merge([pnotify], notices_data) : $.merge(notices_data, [pnotify]), jwindow.data("pnotify", notices_data), "top" == opts.stack.push && pnotify.pnotify_queue_position(1), opts.after_init && opts.after_init(pnotify), opts.history) {
            var history_menu = jwindow.data("pnotify_history");
            if ("undefined" == typeof history_menu) {
                history_menu = $("<div />", {"class": "ui-pnotify-history-container " + styles.hi_menu, mouseleave: function () {
                    history_menu.animate({top: "-" + history_handle_top + "px"}, {duration: 100, queue: !1})
                }}).append($("<div />", {"class": "ui-pnotify-history-header", text: "Redisplay"})).append($("<button />", {"class": "ui-pnotify-history-all " + styles.hi_btn, text: "All", mouseenter: function () {
                    $(this).addClass(styles.hi_btnhov)
                }, mouseleave: function () {
                    $(this).removeClass(styles.hi_btnhov)
                }, click: function () {
                    return $.each(notices_data, function () {
                        this.pnotify_history && (this.is(":visible") ? this.pnotify_hide && this.pnotify_queue_remove() : this.pnotify_display && this.pnotify_display())
                    }), !1
                }})).append($("<button />", {"class": "ui-pnotify-history-last " + styles.hi_btn, text: "Last", mouseenter: function () {
                    $(this).addClass(styles.hi_btnhov)
                }, mouseleave: function () {
                    $(this).removeClass(styles.hi_btnhov)
                }, click: function () {
                    var notice, i = -1;
                    do {
                        if (notice = -1 == i ? notices_data.slice(i) : notices_data.slice(i, i + 1), !notice[0])break;
                        i--
                    } while (!notice[0].pnotify_history || notice[0].is(":visible"));
                    return notice[0] ? (notice[0].pnotify_display && notice[0].pnotify_display(), !1) : !1
                }})).appendTo(body);
                var handle = $("<span />", {"class": "ui-pnotify-history-pulldown " + styles.hi_hnd, mouseenter: function () {
                    history_menu.animate({top: "0"}, {duration: 100, queue: !1})
                }}).appendTo(history_menu);
                history_handle_top = handle.offset().top + 2, history_menu.css({top: "-" + history_handle_top + "px"}), jwindow.data("pnotify_history", history_menu)
            }
        }
        return opts.stack.animation = !1, pnotify.pnotify_display(), pnotify
    }});
    var re_on = /^on/, re_mouse_events = /^(dbl)?click$|^mouse(move|down|up|over|out|enter|leave)$|^contextmenu$/, re_ui_events = /^(focus|blur|select|change|reset)$|^key(press|down|up)$/, re_html_events = /^(scroll|resize|(un)?load|abort|error)$/, dom_event = function (e, orig_e) {
        var event_object;
        if (e = e.toLowerCase(), document.createEvent && this.dispatchEvent) {
            if (e = e.replace(re_on, ""), e.match(re_mouse_events) ? ($(this).offset(), event_object = document.createEvent("MouseEvents"), event_object.initMouseEvent(e, orig_e.bubbles, orig_e.cancelable, orig_e.view, orig_e.detail, orig_e.screenX, orig_e.screenY, orig_e.clientX, orig_e.clientY, orig_e.ctrlKey, orig_e.altKey, orig_e.shiftKey, orig_e.metaKey, orig_e.button, orig_e.relatedTarget)) : e.match(re_ui_events) ? (event_object = document.createEvent("UIEvents"), event_object.initUIEvent(e, orig_e.bubbles, orig_e.cancelable, orig_e.view, orig_e.detail)) : e.match(re_html_events) && (event_object = document.createEvent("HTMLEvents"), event_object.initEvent(e, orig_e.bubbles, orig_e.cancelable)), !event_object)return;
            this.dispatchEvent(event_object)
        } else e.match(re_on) || (e = "on" + e), event_object = document.createEventObject(orig_e), this.fireEvent(e, event_object)
    };
    $.pnotify.defaults = {title: !1, title_escape: !1, text: !1, text_escape: !1, styling: "bootstrap", addclass: "", cornerclass: "", nonblock: !1, nonblock_opacity: .2, history: !0, width: "300px", min_height: "16px", type: "notice", icon: !0, animation: "fade", animate_speed: "slow", opacity: 1, shadow: !0, closer: !0, closer_hover: !0, sticker: !0, sticker_hover: !0, hide: !0, delay: 8e3, mouse_reset: !0, remove: !0, insert_brs: !0, stack: {dir1: "down", dir2: "left", push: "bottom", spacing1: 25, spacing2: 25}}
}(jQuery);
var app = angular.module("autocomplete", []);
app.directive("autocomplete", function () {
    var index = -1;
    return{restrict: "E", scope: {searchParam: "=ngModel", suggestions: "=data", onType: "=onType"}, controller: function ($scope) {
        $scope.searchParam, $scope.searchFilter, $scope.selectedIndex = -1, $scope.setIndex = function (i) {
            $scope.selectedIndex = parseInt(i)
        }, this.setIndex = function (i) {
            $scope.setIndex(i), $scope.$apply()
        }, $scope.getIndex = function () {
            return $scope.selectedIndex
        };
        var watching = !0;
        $scope.completing = !1, $scope.$watch("searchParam", function (newValue, oldValue) {
            oldValue !== newValue && (watching && $scope.searchParam && ($scope.completing = !0, $scope.searchFilter = $scope.searchParam, $scope.selectedIndex = -1), $scope.onType && $scope.onType($scope.searchParam))
        }), this.preSelect = function () {
            watching = !1, $scope.$apply(), watching = !0
        }, $scope.preSelect = this.preSelect, this.preSelectOff = function () {
            watching = !0
        }, $scope.preSelectOff = this.preSelectOff, $scope.select = function (suggestion) {
            suggestion && ($scope.searchParam = suggestion, $scope.searchFilter = suggestion), watching = !1, $scope.completing = !1, setTimeout(function () {
                watching = !0
            }, 1e3), $scope.setIndex(-1)
        }
    }, link: function (scope, element, attrs) {
        var attr = "";
        scope.attrs = {placeholder: "start typing...", "class": "", id: "", inputclass: "", inputid: ""};
        for (var a in attrs)attr = a.replace("attr", "").toLowerCase(), 0 === a.indexOf("attr") && (scope.attrs[attr] = attrs[a]);
        "true" == attrs.clickActivation && (element[0].onclick = function () {
            scope.searchParam || (scope.completing = !0, scope.$apply())
        });
        var key = {left: 37, up: 38, right: 39, down: 40, enter: 13, esc: 27};
        document.addEventListener("keydown", function (e) {
            var keycode = e.keyCode || e.which;
            switch (keycode) {
                case key.esc:
                    scope.select(), scope.setIndex(-1), scope.$apply(), e.preventDefault()
            }
        }, !0), document.addEventListener("blur", function () {
            setTimeout(function () {
                scope.select(), scope.setIndex(-1), scope.$apply()
            }, 200)
        }, !0), element[0].addEventListener("keydown", function (e) {
            var keycode = e.keyCode || e.which, l = angular.element(this).find("li").length;
            switch (keycode) {
                case key.up:
                    if (index = scope.getIndex() - 1, -1 > index)index = l - 1; else if (index >= l) {
                        index = -1, scope.setIndex(index), scope.preSelectOff();
                        break
                    }
                    scope.setIndex(index), -1 !== index && scope.preSelect(angular.element(angular.element(this).find("li")[index]).text()), scope.$apply();
                    break;
                case key.down:
                    if (index = scope.getIndex() + 1, -1 > index)index = l - 1; else if (index >= l) {
                        index = -1, scope.setIndex(index), scope.preSelectOff(), scope.$apply();
                        break
                    }
                    scope.setIndex(index), -1 !== index && scope.preSelect(angular.element(angular.element(this).find("li")[index]).text());
                    break;
                case key.left:
                    break;
                case key.right:
                case key.enter:
                    index = scope.getIndex(), -1 !== index && scope.select(angular.element(angular.element(this).find("li")[index]).text()), scope.setIndex(-1), scope.$apply();
                    break;
                case key.esc:
                    scope.select(), scope.setIndex(-1), scope.$apply(), e.preventDefault();
                    break;
                default:
                    return
            }
            (-1 !== scope.getIndex() || keycode == key.enter) && e.preventDefault()
        })
    }, template: '<div class="autocomplete {{attrs.class}}" id="{{attrs.id}}"><input type="text" ng-model="searchParam" placeholder="{{attrs.placeholder}}" class="{{attrs.inputclass}}" id="{{attrs.inputid}}"/><ul ng-show="completing"><li suggestion ng-repeat="suggestion in suggestions | filter:searchFilter | orderBy:\'toString()\' track by $index"index="{{$index}}" val="{{suggestion}}" ng-class="{active: ($index == selectedIndex)}" ng-click="select(suggestion)" ng-bind-html="suggestion | highlight:searchParam">{{suggestion}}</li></ul></div>'}
}), app.filter("highlight", function ($sce) {
    return function (input, searchParam) {
        if (searchParam) {
            var words = searchParam.split(/\ /).join("|"), exp = new RegExp("(" + words + ")", "gi");
            words.length && (input = $sce.trustAsHtml(input.replace(exp, '<span class="highlight">$1</span>')))
        }
        return input
    }
}), app.directive("suggestion", function () {
    return{restrict: "A", require: "^autocomplete", link: function (scope, element, attrs, autoCtrl) {
        element.bind("mouseenter", function () {
            autoCtrl.preSelect(attrs.val), autoCtrl.setIndex(attrs.index)
        }), element.bind("mouseleave", function () {
            autoCtrl.preSelectOff()
        })
    }}
}), function () {
    function _storageFactory(storageType) {
        return["$rootScope", "$browser", "$window", function ($rootScope, $browser, $window) {
            for (var _last$storage, k, webStorage = $window[storageType], $storage = {$default: function (items) {
                for (var k in items)angular.isDefined($storage[k]) || ($storage[k] = items[k]);
                return $storage
            }, $reset: function (items) {
                for (var k in $storage)"$" === k[0] || delete $storage[k];
                return $storage.$default(items)
            }}, i = 0; i < webStorage.length && (k = webStorage.key(i)); i++)"ngStorage-" === k.slice(0, 10) && ($storage[k.slice(10)] = angular.fromJson(webStorage.getItem(k)));
            return _last$storage = angular.copy($storage), $browser.addPollFn(function () {
                if (!angular.equals($storage, _last$storage)) {
                    angular.forEach($storage, function (v, k) {
                        angular.isDefined(v) && "$" !== k[0] && ($storage[k] = angular.fromJson(angular.toJson(v)), webStorage.setItem("ngStorage-" + k, angular.toJson(v))), delete _last$storage[k]
                    });
                    for (var k in _last$storage)webStorage.removeItem("ngStorage-" + k);
                    _last$storage = angular.copy($storage), $rootScope.$apply()
                }
            }), "localStorage" === storageType && $window.addEventListener("storage", function (event) {
                "ngStorage-" === event.key.slice(0, 10) && (event.newValue ? $storage[event.key.slice(10)] = angular.fromJson(event.newValue) : delete $storage[event.key.slice(10)], _last$storage = angular.copy($storage), $rootScope.$apply())
            }), $storage
        }]
    }

    angular.module("ngStorage", []).factory("$localStorage", _storageFactory("localStorage")).factory("$sessionStorage", _storageFactory("sessionStorage"))
}();
var app = angular.module("kodiak", ["kodiak.filters", "kodiak.services", "kodiak.directives", "kodiak.controllers", "ui.router", "ui.bootstrap", "ngStorage", "ui.slider", "textAngular", "ngSanitize", "chieffancypants.loadingBar", "ngGrid", "autocomplete", "pasvaz.bindonce", "angulartics", "angulartics.google.analytics"]);
app.config(function ($httpProvider, $provide) {
    $httpProvider.defaults.useXDomain = !0, $provide.factory("errorHandler", function ($q, $location, notificationService, $rootScope) {
        return{responseError: function (rejection) {
            return 401 === rejection.status && "/login" !== $location.$$path ? ($location.url("/login?to=" + encodeURIComponent($location.$$url)), rejection.data = {message: "You need to log in first"}) : rejection.data.message && notificationService.handleError(rejection.data.message), $q.reject(rejection)
        }, request: function (config) {
            return $rootScope.u ? (config.headers.Authorization = "Bearer " + $rootScope.u.access_token, config) : void 0
        }}
    }), $httpProvider.interceptors.push("errorHandler")
}), app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = !0, $urlRouterProvider.otherwise("/"), $stateProvider.state("home", {url: "/", templateUrl: "partials/landing.html", controller: "LandingCtrl", data: {"public": !0}}), $stateProvider.state("signup", {url: "/signup?token", templateUrl: "partials/signup.html", controller: "SignupCtrl", data: {"public": !0}}), $stateProvider.state("login", {url: "/login?to", templateUrl: "partials/login.html", controller: "LoginCtrl", data: {"public": !0}}), $stateProvider.state("activate", {url: "/activate?email&token&resetrequired", templateUrl: "partials/activate.html", controller: "ActivateCtrl", data: {"public": !0}}), $stateProvider.state("myApplications", {url: "/me/applications", templateUrl: "partials/dashboard_me.html", controller: "MeDashboardCtrl", data: {"public": !1}}), $stateProvider.state("jobBoard", {url: "/ads", templateUrl: "partials/ads_public.html", controller: "JobBoardCtrl", data: {"public": !1}}), $stateProvider.state("editProfile", {url: "/me/edit", templateUrl: "partials/me.html", controller: "MeCtrl", data: {"public": !1}}), $stateProvider.state("viewProfile", {url: "/me", templateUrl: "partials/me.html", controller: "MeCtrl", data: {"public": !1}}), $stateProvider.state("orgLanding", {url: "/organization/recruiters", templateUrl: "/partials/org_landing.html", controller: "OrgLandingCtrl", data: {"public": !0}}), $stateProvider.state("viewProfileForOrg", {url: "/user/:name/:userId", templateUrl: "partials/me.html", controller: "OrgMeCtrl", data: {"public": !1}}), $stateProvider.state("viewProfilePrivate", {url: "/me/private", templateUrl: "partials/private_me.html", controller: "PrivateMeCtrl", data: {"public": !1}}), $stateProvider.state("createOrganization", {url: "/organization/create", templateUrl: "partials/organization_create.html", controller: "CreateOrgCtrl", data: {"public": !1}}), $stateProvider.state("organizationDashboard", {url: "/organization/dashboard", templateUrl: "partials/dashboard_org.html", controller: "ViewOrgCtrl", data: {"public": !1}}), $stateProvider.state("campaignHome", {url: "/organization/campaign/:adId", templateUrl: "partials/campaign_home.html", controller: "ViewCampaignCtrl", data: {"public": !1}}), $stateProvider.state("createAdvertisement", {url: "/organization/ad/create", templateUrl: "partials/ad_create.html", controller: "AdCtrl", data: {"public": !1}}), $stateProvider.state("viewAdvertisement", {url: "/organization/ad/{adId}/view", templateUrl: "partials/ad_view.html", controller: "ViewAdCtrl", data: {"public": !1}}), $stateProvider.state("viewAdvertisementPublic", {url: "/organization/{orgId}/post/{adId}/public?from&ref", templateUrl: "partials/post_view_public.html", controller: "ViewPublicAdCtrl", data: {"public": !0}}), $stateProvider.state("editAdvertisement", {url: "/organization/ad/{adId}/edit", templateUrl: "partials/ad_create.html", controller: "AdCtrl", data: {"public": !1}}), $stateProvider.state("search", {url: "/organization/ad/{adId}/search", templateUrl: "partials/search.html", controller: "SearchCtrl", data: {"public": !1}}), $stateProvider.state("results", {url: "/organization/ad/{adId}/search/{searchId}/results", templateUrl: "partials/results.html", controller: "SearchResultsCtrl", data: {"public": !1}}), $stateProvider.state("logout", {url: "/logout", templateUrl: "partials/logout.html", controller: "LogoutCtrl", data: {"public": !0}}), $stateProvider.state("changePassword", {url: "/me/changepassword?token", templateUrl: "partials/change_password.html", controller: "ChangePasswordCtrl", data: {"public": !0}}), $stateProvider.state("resetPassword", {url: "/resetpassword", templateUrl: "partials/reset_password.html", controller: "ResetPasswordCtrl", data: {"public": !0}}), $stateProvider.state("editOrganization", {url: "/organization/edit", templateUrl: "partials/organization_create.html", controller: "EditOrgCtrl", data: {"public": !1}}), $stateProvider.state("viewOrganization", {url: "/organization/:orgId/view", templateUrl: "partials/organization_view.html", controller: "ViewOrgProfileCtrl", data: {"public": !0}}), $stateProvider.state("termsOfService", {url: "/tos", templateUrl: "partials/tos.html", data: {"public": !0}}), $stateProvider.state("privacyPolicy", {url: "/pp", templateUrl: "partials/pp.html", data: {"public": !0}}), $stateProvider.state("contact", {url: "/contact", templateUrl: "partials/contact.html", data: {"public": !0}}), $stateProvider.state("admin", {url: "/admin", templateUrl: "partials/admin.html", controller: "AdminCtrl", data: {"public": !1}}), $stateProvider.state("adminUsers", {url: "/admin/users", templateUrl: "partials/admin_users.html", controller: "AdminUsersCtrl", data: {"public": !1}}), $stateProvider.state("adminOrgRequests", {url: "/admin/orgrequests", templateUrl: "partials/admin_org_requests.html", controller: "AdminOrgRequestCtrl", data: {"public": !1}}), $stateProvider.state("adminInvites", {url: "/admin/invites", templateUrl: "partials/admin_invites.html", controller: "AdminInvitesCtrl", data: {"public": !1}}), $stateProvider.state("profileBuilder", {url: "/me/builder", templateUrl: "partials/builder.html", controller: "ProfileBuilderCtrl", data: {"public": !1}}), $stateProvider.state("inviteRequested", {url: "/inviteRequested/:referrer", templateUrl: "partials/invite_requested.html", controller: "FriendShareCtrl", data: {"public": !0}}), $stateProvider.state("signupCompleted", {url: "/signup/completed", templateUrl: "partials/signup_completed.html", data: {"public": !0}})
}), app.run(function ($rootScope, userService, subwayService, notificationService, $state) {
    window.trackJs && window.trackJs.configure({trackAjaxFail: !1}), $rootScope.$on("refreshNotifications", function () {
        userService.isLoggedIn() && subwayService.getAllNotifications().success(function (data) {
            $rootScope.notifications = data.notifications
        }).error(function (err) {
            notificationService.handleError(err.message)
        })
    }), $rootScope.$on("$stateChangeStart", function (ev, toState) {
        toState.data && (!toState.data || toState.data.public !== !1) || userService.isLoggedIn() || (ev.preventDefault(), $state.transitionTo("login", {to: encodeURIComponent(toState.url)}))
    }), $rootScope.$broadcast("refreshNotifications")
});
var services = angular.module("kodiak.services", []);
angular.module("kodiak").service("userService", ["$rootScope", "$localStorage", "$http", "GRIZZLY_URL", function ($rootScope, $localStorage, $http, GRIZZLY_URL) {
    var setUserType = function () {
        var isOrgUser = !!$rootScope.u.affiliation, tokenExpiration = $rootScope.u.sessionExpiredAt, stateRestored = $rootScope.u.restored;
        $rootScope.u.type = stateRestored && isOrgUser ? "ORG" : stateRestored && !isOrgUser && tokenExpiration ? "PERSONAL" : "NEW", window.trackJs && window.trackJs.configure({userId: $rootScope.u.email, trackAjaxFail: !1})
    }, saveState = function () {
        $localStorage.user = angular.toJson($rootScope.u)
    }, restoreState = function () {
        $rootScope.u || ($rootScope.u = {}), !$rootScope.u.restored && $localStorage.user && ($rootScope.u = angular.fromJson($localStorage.user), $rootScope.u.restored = !0), setUserType()
    };
    this.create = function (user) {
        return $http.put(GRIZZLY_URL + "/user", angular.toJson(user))
    }, this.createOrgUser = function (user) {
        return $http.put(GRIZZLY_URL + "/organization/user", angular.toJson(user))
    }, this.login = function (user, callback) {
        $http.put(GRIZZLY_URL + "/user/token", angular.toJson(user)).success(function (data) {
            $rootScope.u = {_id: data._id, firstName: data.firstName, lastName: data.lastName, email: user.email, access_token: data.access_token, affiliation: data.affiliation, sessionExpiredAt: Date.now() + 1e3 * data.secondsRemaining, restored: !0, type: null}, saveState(), setUserType(), $rootScope.$broadcast("loggedIn", !!data.affiliation), callback(null, data)
        }).error(function (data, status) {
            callback(status, data)
        })
    }, this.isLoggedIn = function () {
        return $rootScope.u.access_token && Date.now() < $rootScope.u.sessionExpiredAt ? !0 : !1
    }, this.activate = function (user) {
        return $http.post(GRIZZLY_URL + "/user/activate", angular.toJson(user))
    }, this.getProfile = function (id) {
        return id || (id = "me"), $http.get(GRIZZLY_URL + "/user/" + id + "/profile")
    }, this.getLimitedProfile = function () {
        return $http.get(GRIZZLY_URL + "/user/me/profile?limited=true")
    }, this.getProfileStats = function () {
        return $http.get(GRIZZLY_URL + "/user/me/profile/stats")
    }, this.saveProfile = function (profile) {
        var user = {profile: profile};
        return $http.post(GRIZZLY_URL + "/user/me/profile", angular.toJson(user))
    }, this.getResponses = function () {
        return $http.get(GRIZZLY_URL + "/user/me/applications")
    }, this.logout = function () {
        $rootScope.u = {type: "NEW"}, $rootScope.$broadcast("loggedOut"), saveState()
    }, this.requestPasswordReset = function (email) {
        return $http.put(GRIZZLY_URL + "/user/account/password/token", angular.toJson({email: email}))
    }, this.changePassword = function (password, resetcode) {
        return this.isLoggedIn() ? $http.post(GRIZZLY_URL + "/user/" + $rootScope.u._id + "/account/password", angular.toJson({password: password})) : $http.post(GRIZZLY_URL + "/user/account/password", angular.toJson({token: resetcode, password: password}))
    }, this.getQualifications = function (query) {
        return $http.get(GRIZZLY_URL + "/user/meta/qualifications/" + query)
    }, this.getQualificationFields = function (query) {
        return $http.get(GRIZZLY_URL + "/user/meta/fields/" + query)
    }, restoreState()
}]), services.factory("orgService", ["$http", "GRIZZLY_URL", "userService", "$rootScope", function ($http, GRIZZLY_URL) {
    var service = {makeRequest: function (request) {
        return $http.post(GRIZZLY_URL + "/organization/requests", angular.toJson(request))
    }, getRequests: function () {
        return $http.get(GRIZZLY_URL + "/organization/requests")
    }, createOrg: function (org) {
        return $http.put(GRIZZLY_URL + "/organization", angular.toJson(org))
    }, editOrg: function (id, org) {
        return $http.post(GRIZZLY_URL + "/organization/" + id, angular.toJson(org))
    }, getOrg: function (id) {
        return $http.get(GRIZZLY_URL + "/organization/" + id + "/public")
    }, getAds: function (id) {
        return $http.get(GRIZZLY_URL + "/organization/" + id + "/posts")
    }, getPublicAds: function (id) {
        return $http.get(GRIZZLY_URL + "/organization/" + id + "/public/posts")
    }, uploadLogo: function (id, files) {
        var formData = new FormData;
        for (var i in files)files.hasOwnProperty(i) && formData.append("file_" + i, files[i]);
        return $http({method: "PUT", url: GRIZZLY_URL + "/organization/" + id + "/logo", data: formData, headers: {"Content-Type": void 0}, transformRequest: angular.identity})
    }, getUsers: function (id) {
        return $http.get(GRIZZLY_URL + "/organization/" + id + "/users")
    }, deactivateUser: function (orgId, userId) {
        return $http.delete(GRIZZLY_URL + "/organization/" + orgId + "/user/" + userId)
    }, getAllOrgs: function () {
        return $http.get(GRIZZLY_URL + "/organizations")
    }};
    return service
}]), services.factory("adService", ["$http", "GRIZZLY_URL", "userService", function ($http, GRIZZLY_URL) {
    var service = {createAd: function (orgId, ad) {
        return $http.put(GRIZZLY_URL + "/organization/" + orgId + "/post/", angular.toJson(ad))
    }, editAd: function (orgId, id, ad) {
        return $http.post(GRIZZLY_URL + "/organization/" + orgId + "/post/" + id, angular.toJson(ad))
    }, getAd: function (orgId, id) {
        return $http.get(GRIZZLY_URL + "/organization/" + orgId + "/post/" + id)
    }, getAdPublic: function (orgId, id) {
        return $http.get(GRIZZLY_URL + "/organization/" + orgId + "/public/post/" + id)
    }, getAdsPublic: function () {
        return $http.get(GRIZZLY_URL + "/ads/public")
    }, deleteAd: function (orgId, id) {
        return $http.delete(GRIZZLY_URL + "/organization/" + orgId + "/post/" + id)
    }};
    return service
}]), services.factory("searchService", ["$http", "GRIZZLY_URL", "userService", function ($http, GRIZZLY_URL) {
    var service = {createSearch: function (orgId, search) {
        return $http.put(GRIZZLY_URL + "/organization/" + orgId + "/search/", angular.toJson(search))
    }, editSearch: function (orgId, id, search) {
        return $http.post(GRIZZLY_URL + "/organization/" + orgId + "/search/" + id, angular.toJson(search))
    }, getSearch: function (orgId, id) {
        return $http.get(GRIZZLY_URL + "/organization/" + orgId + "/search/" + id)
    }, getSearchForAd: function (orgId, adId) {
        return $http.get(GRIZZLY_URL + "/organization/" + orgId + "/post/" + adId + "/search")
    }, getSearchResults: function (orgId, id) {
        return $http.get(GRIZZLY_URL + "/organization/" + orgId + "/search/" + id + "/results")
    }, hitUser: function (orgId, searchId, user) {
        return $http.post(GRIZZLY_URL + "/organization/" + orgId + "/search/" + searchId + "/hit", angular.toJson(user))
    }};
    return service
}]), services.factory("adResponseService", ["$http", "GRIZZLY_URL", "userService", function ($http, GRIZZLY_URL) {
    var service = {createResponse: function (userId, orgId, adId, tags, referredBy) {
        return $http.put(GRIZZLY_URL + "/organization/" + orgId + "/post/" + adId + "/response", angular.toJson({user: userId, tags: tags, referredBy: referredBy === userId ? null : referredBy}))
    }, editResponse: function (orgId, adId, responseId, status, tags) {
        var o = {status: status, tags: tags};
        return $http.post(GRIZZLY_URL + "/organization/" + orgId + "/post/" + adId + "/response/" + responseId, angular.toJson(o))
    }, getResponse: function (orgId, adId, responseId) {
        return $http.get(GRIZZLY_URL + "/organization/" + orgId + "/post/" + adId + "/response/" + responseId)
    }, getAllResponses: function (orgId, adId) {
        return $http.get(GRIZZLY_URL + "/organization/" + orgId + "/post/" + adId + "/responses")
    }};
    return service
}]), services.factory("subwayService", ["$http", "GRIZZLY_URL", "userService", function ($http, GRIZZLY_URL) {
    var service = {getAllNotifications: function () {
        return $http.get(GRIZZLY_URL + "/user/notifications")
    }, markAsRead: function (id) {
        var o = {isRead: !0};
        return $http.post(GRIZZLY_URL + "/user/notifications/" + id, angular.toJson(o))
    }, markAsUnread: function (id) {
        var o = {isRead: !1};
        return $http.post(GRIZZLY_URL + "/user/notifications/" + id, angular.toJson(o))
    }};
    return service
}]), services.factory("notificationService", [function () {
    return{notify: function (hash) {
        $.pnotify(hash)
    }, handleError: function (msg, title) {
        this.notify({title: title || "Something went wrong!", text: msg || "Unknown Error", type: "error", hide: !0})
    }, handleSuccess: function (msg, title) {
        this.notify({title: title || "Success!", text: msg || "Everything went ok.", type: "success", hide: !0})
    }, handleInfo: function (msg, title) {
        this.notify({title: title || "Oh!", text: msg || "That's a no no, my friend!", type: "info", hide: !0})
    }, handleWarning: function (msg, title) {
        this.notify({title: title || "Warning!", text: msg || "That might cause problems, my friend!", type: "warning", hide: !0})
    }}
}]), services.factory("validationService", ["notificationService", function (notificationService) {
    return{mustBeTrue: function (expression, msg) {
        if (!expression)throw notificationService.notify({title: "Ooops!", text: msg, type: "info", hide: !0}), msg
    }}
}]), services.factory("adminService", function ($http, GRIZZLY_URL) {
    return{getAllUsers: function () {
        return $http.get(GRIZZLY_URL + "/admin/users")
    }, updateUsers: function () {
        return $http.put(GRIZZLY_URL + "/admin/updateusers")
    }, indexUsers: function () {
        return $http.put(GRIZZLY_URL + "/admin/indexusers")
    }}
}), services.factory("utilService", function (GRIZZLY_URL, $http) {
    return{getTimes: function (n) {
        if (!n)return[];
        var times;
        return times = Math.floor(Number(n)), isNaN(times) ? [] : new Array(times)
    }, shortenUrl: function (url) {
        return $http.put(GRIZZLY_URL + "/common/shortenurl", angular.toJson({url: url}))
    }}
});
var controllers = angular.module("kodiak.controllers", ["kodiak.configs"]);
controllers.controller("SignupCtrl", function ($scope, $http, $location, userService, validationService, notificationService, $state, $stateParams) {
    $scope.user = {}, $scope.user.token = $stateParams.token, $scope.create = function (user) {
        try {
            validationService.mustBeTrue($scope.user.firstName && $scope.user.lastName, "First and last names are required"), validationService.mustBeTrue($scope.user.email, "Your e-mail address is required"), validationService.mustBeTrue($scope.user.password && $scope.user.password.length >= 8, "Your password must be at least 8 characters"), validationService.mustBeTrue($scope.user.password === $scope.user.passwordConfirmation, "Your password and password confirmation do not match")
        } catch (e) {
            return
        }
        userService.create(user).success(function () {
            notificationService.handleSuccess("Account created. But you will have to login to your email and click the activation link first.");
            var fb_param = {};
            fb_param.pixel_id = "6012934240312", fb_param.value = "0.01", fb_param.currency = "USD", function () {
                var fpw = document.createElement("script");
                fpw.async = !0, fpw.src = "//connect.facebook.net/en_US/fp.js";
                var ref = document.getElementsByTagName("script")[0];
                ref.parentNode.insertBefore(fpw, ref)
            }(), $state.go("signupCompleted")
        })
    }
}), controllers.controller("LoginCtrl", function ($scope, $http, $location, userService, notificationService, $rootScope, $state, $stateParams, validationService) {
    $scope.user = {}, $stateParams.to && notificationService.handleInfo("You need to login first."), $scope.$watch("user.rememberMe", function (remembered) {
        remembered && notificationService.handleInfo("Please do not select this option if other people use this device.", "Warning!")
    }), $scope.login = function (credentials) {
        credentials && credentials.email && credentials.password || (credentials.email = $("#login-email").val(), credentials.password = $("#login-password").val());
        try {
            validationService.mustBeTrue(credentials.email, "E-mail should be a valid e-mail address"), validationService.mustBeTrue(credentials.password, "Password is required")
        } catch (e) {
            return
        }
        userService.login(credentials, function (err, data) {
            err ? 401 === err ? notificationService.notify({title: "Invalid e-mail address/password!", text: "Please try again", type: "error", hide: !0}) : 403 === err && notificationService.notify({title: "Account is inactive!", text: "This account is currently inactive. If you just signed up, please click the activation link we sent to your email.", type: "error", hide: !0}) : ($rootScope.$broadcast("refreshNotifications"), $stateParams.to ? $location.url(decodeURIComponent($stateParams.to)) : $state.go(data.affiliation ? "organizationDashboard" : "viewProfile"))
        })
    }
}), controllers.controller("ActivateCtrl", function ($scope, $http, $stateParams, userService, notificationService) {
    $scope.user = {token: $stateParams.token}, $scope.submit = function () {
        if ("true" === $stateParams.resetRequired) {
            if ($scope.pass1.length < 8)return void notificationService.handleError("Your new password must contain at least 8 characters");
            if ($scope.pass1 !== $scope.pass2)return void notificationService.handleError("Password and password confirmation must match")
        }
        $scope.user.password = $scope.pass1, userService.activate($scope.user).success(function () {
            notificationService.handleSuccess("Your account had been activated successfully. Please log in"), $scope.success = !0
        })
    }, "true" === $stateParams.resetrequired ? $scope.showPasswordReset = !0 : $scope.submit()
}), controllers.controller("PersonalModalInstanceCtrl", function ($scope, data, validationService, MONTHS) {
    $scope.data = angular.copy(data, $scope.data), $scope.dateOfBirth = {}, $scope.months = MONTHS, $scope.years = [];
    for (var now = moment().year(), i = now - 15; i >= now - 70; i--)$scope.years.push(i.toString());
    if ($scope.data.dateOfBirth) {
        var dob = $scope.data.dateOfBirth = moment(new Date($scope.data.dateOfBirth));
        $scope.dateOfBirth = {}, $scope.dateOfBirth.year = dob.format("YYYY"), $scope.dateOfBirth.month = dob.format("MMMM"), $scope.dateOfBirth.date = dob.format("DD")
    }
    $scope.submit = function () {
        try {
            if ($scope.dateOfBirth.year || $scope.dateOfBirth.month || $scope.dateOfBirth.date) {
                var dob = moment($scope.dateOfBirth.date + "-" + $scope.dateOfBirth.month + "-" + $scope.dateOfBirth.year, "DD-MMMM-YYYY");
                validationService.mustBeTrue(dob.isValid(), "Date of birth is invalid"), $scope.data.dateOfBirth = new Date(dob.format())
            }
            $scope.data.contactNumber && validationService.mustBeTrue($scope.data.contactNumber.length >= 10, "Contact Number should have 10 digits at least")
        } catch (e) {
            return
        }
        $scope.$close($scope.data)
    }
}), controllers.controller("QualificationTenureModalInstanceCtrl", function ($scope, data, MONTHS, validationService, userService) {
    $scope.data = angular.copy(data, $scope.data), $scope.meta = data.meta, $scope.startedOn = {}, $scope.endedOn = {}, $scope.months = MONTHS, $scope.years = [], $scope.queried = {qualifications: [], qualificationFields: []}, $scope.updateQualificationsQuery = function (query) {
        query.length < 2 || userService.getQualifications(query).success(function (data) {
            $scope.queried.qualifications = data.results
        })
    }, $scope.updateQualificationFieldsQuery = function (query) {
        query.length < 2 || userService.getQualificationFields(query).success(function (data) {
            $scope.queried.qualificationFields = data.results
        })
    }, $scope.changeEndDate = function () {
        $scope.data.current ? ($scope.endedOn = null, $scope.data.endedOn = null) : $scope.data.endedOn = $scope.endedOn
    };
    for (var now = moment().year(), i = now; i >= now - 40; i--)$scope.years.push(i.toString());
    var setMonthAndDate = function (source, target) {
        target.month = moment(source).format("MMMM"), target.year = moment(source).format("YYYY")
    };
    $scope.data.startedOn && setMonthAndDate($scope.data.startedOn, $scope.startedOn), $scope.data.endedOn ? (setMonthAndDate($scope.data.endedOn, $scope.endedOn), $scope.data.current = !1) : $scope.data.current = !0;
    var convertToDate = function (year, month) {
        return year && month ? moment(month + " 1 " + year).format() : void 0
    };
    $scope.submit = function (t) {
        $scope.data.startedOn = convertToDate($scope.startedOn.year, $scope.startedOn.month), (!$scope.data.current || $scope.data.complete) && ($scope.data.endedOn = convertToDate($scope.endedOn.year, $scope.endedOn.month));
        try {
            "q" === t ? (validationService.mustBeTrue($scope.data.name, "Qualification name should be defined"), validationService.mustBeTrue($scope.data.issuedBy, "Issued School/University/Institute should be defined"), $scope.data.complete && validationService.mustBeTrue($scope.data.startedOn <= $scope.data.endedOn, "Start date should be before the end date")) : (validationService.mustBeTrue($scope.data.position, "Your position must be defined"), validationService.mustBeTrue($scope.data.organization, "The organization you worked at must be defined"), $scope.data.current || validationService.mustBeTrue($scope.data.startedOn <= $scope.data.endedOn, "Start date should be before the end date")), validationService.mustBeTrue($scope.data.startedOn, "Started month should be defined")
        } catch (e) {
            return
        }
        $scope.$close($scope.data)
    }
}), controllers.controller("SkillModalInstanceCtrl", ["$scope", "data", function ($scope, data) {
    $scope.data = angular.copy(data, $scope.data), $scope.examples = ["Fixed Asset Accounting", "Nuclear Physics", "Recruitment and Selection", "Javascript", "Negative Asset Management"]
}]), controllers.controller("CVUploadCtrl", function ($scope, userService, notificationService) {
    $scope.uploadFile = function (files) {
        userService.uploadCv(files).success(function (data) {
            notificationService.handleSuccess("CV Uploaded and analyzed successfully."), $scope.$close(data.profile)
        }).error(function () {
            $scope.$dismiss()
        })
    }
}), controllers.controller("PrivateMeCtrl", function ($scope, userService) {
    userService.getLimitedProfile().success(function (data) {
        $scope.user = data, $scope.forEmployer = !0
    })
}), controllers.controller("MeCtrl", function ($scope, $http, $location, $modal, userService, notificationService, utilService, $state, $localStorage, $window) {
    $scope.edit = $state.is("editProfile") ? !0 : !1, $scope.enableEdit = function () {
        $scope.edit = !0
    }, $scope.disableEdit = function () {
        $scope.edit = !1
    }, $scope.getTimes = utilService.getTimes;
    var loadProfileStats = function () {
        userService.getProfileStats().success(function (data) {
            $scope.stats = data
        })
    };
    userService.getProfile().success(function (data) {
        if ($scope.user = data, $localStorage.tempProfile) {
            var profile = angular.fromJson($localStorage.tempProfile);
            $scope.user.tenures = profile.tenures, $scope.user.skills = profile.skills, $scope.user.qualifications = profile.qualifications, $scope.user.dateOfBirth = profile.dateOfBirth, $scope.saveProfile(), $scope.edit = !0
        }
        if (0 === data.tenures.length && 0 === data.qualifications.length && 0 === data.skills.length && $scope.edit === !1)$state.go("profileBuilder"); else if ($localStorage.adViewed) {
            var adViewed = angular.fromJson($localStorage.adViewed);
            $modal.open({templateUrl: "partials/modal_yes_no.html", resolve: {data: function () {
                return adViewed
            }}, controller: function ($scope, data) {
                $scope.question = "It seems that you were applying to an ad for " + data.name + ". Do you want to go to that ad and complete your application?", $scope.yesOption = "Yes, let me apply", $scope.noOption = "No"
            }}).result.then(function (result) {
                "yes" === result && ($window.location.href = adViewed.url), delete $localStorage.adViewed
            })
        }
    }), loadProfileStats();
    var bindAddEditModal = function (itemToEdit, templateUrl, instanceController, collection) {
        var objToManipulate = itemToEdit || {}, modal = $modal.open({templateUrl: templateUrl, controller: instanceController, resolve: {data: function () {
            return objToManipulate
        }}});
        modal.result.then(function (manipulated) {
            manipulated._dirty = !0, itemToEdit ? collection[collection.indexOf(itemToEdit)] = manipulated : collection.push(manipulated), $scope.saveProfile()
        })
    };
    $scope.convertGender = function (gender) {
        return gender ? "Male" : gender === !1 ? "Female" : void 0
    }, $scope.saveProfile = function () {
        userService.saveProfile($scope.user).success(function (data) {
            loadProfileStats(), notificationService.notify({title: "Change(s) saved!", text: "Successfully saved change(s) made to your profile.", type: "success", hide: !0}), $scope.user = data.profile, $localStorage.tempProfile && delete $localStorage.tempProfile
        }).error(function (data) {
            data.profile && ($scope.user = data.profile), $localStorage.tempProfile = angular.toJson(data.profile)
        })
    }, $scope.openPersonalModal = function (profile) {
        var personalModal = $modal.open({templateUrl: "partials/modal_me_personal.html", controller: "PersonalModalInstanceCtrl", resolve: {data: function () {
            return{location: profile.location, contactNumber: profile.contactNumber, languages: profile.languages, nationalIdentifier: profile.nationalIdentifier, dateOfBirth: profile.dateOfBirth, gender: profile.gender}
        }}});
        personalModal.result.then(function (personalData) {
            profile.location = personalData.location, profile.contactNumber = personalData.contactNumber, profile.languages = personalData.languages, profile.nationalIdentifier = personalData.nationalIdentifier, personalData.dateOfBirth && (profile.dateOfBirth = new Date(personalData.dateOfBirth)), profile.gender = personalData.gender, $scope.saveProfile()
        })
    }, $scope.openQualificationModal = function (qualification) {
        bindAddEditModal(qualification, "partials/modal_me_qualification.html", "QualificationTenureModalInstanceCtrl", $scope.user.qualifications)
    }, $scope.openTenureModal = function (tenure) {
        bindAddEditModal(tenure, "partials/modal_me_tenure.html", "QualificationTenureModalInstanceCtrl", $scope.user.tenures)
    }, $scope.openSkillModal = function () {
        var skillModal = $modal.open({templateUrl: "partials/modal_me_skill.html", controller: "SkillModalInstanceCtrl", resolve: {data: function () {
            return{skills: $scope.user.skills}
        }}});
        skillModal.result.then(function (manipulated) {
            manipulated._dirty = !0, $scope.user.skills = manipulated, $scope.saveProfile()
        })
    }, $scope.openDeleteModal = function (item, collection) {
        var modal = $modal.open({templateUrl: "partials/modal_me_confirmation.html"});
        modal.result.then(function () {
            collection.splice(collection.indexOf(item), 1), $scope.saveProfile()
        })
    }
}), controllers.controller("CreateOrgCtrl", ["$scope", "$http", "orgService", "$location", "userService", "notificationService", function ($scope, $http, orgService, $location, userService, notificationService) {
    $scope.submit = function (org, admin) {
        orgService.createOrg(org).success(function (data) {
            notificationService.notify({title: "Success!", text: "Organization Created", type: "success", hide: !0});
            var user = {firstName: admin.name, email: admin.email, affiliation: data.organization._id};
            userService.createOrgUser(user).success(function () {
                notificationService.handleSuccess("Please check your e-mail inbox and click the confirmation link, please", "Admin account created!")
            })
        })
    }
}]), controllers.controller("EditOrgCtrl", ["$scope", "orgService", "$rootScope", "notificationService", "GRIZZLY_URL", "userService", "$state", function ($scope, orgService, $rootScope, notificationService, $state) {
    $scope.editMode = !0, orgService.getOrg($rootScope.u.affiliation).success(function (data) {
        $scope.org = data.organization
    }), $scope.notReady = !0, $scope.uploadFile = function (files) {
        var img = new Image;
        img.src = window.URL.createObjectURL(files[0]), img.onload = function () {
            orgService.uploadLogo($rootScope.u.affiliation, files).success(function () {
                notificationService.handleSuccess("Logo uploaded successfully")
            }), window.URL.revokeObjectURL(img.src)
        }
    }, $scope.submit = function (org) {
        orgService.editOrg($rootScope.u.affiliation, org).success(function () {
            notificationService.handleSuccess("Organization details updated"), $state.go("organizationDashboard")
        })
    }
}]), controllers.controller("ViewOrgCtrl", ["$scope", "userService", "orgService", "$rootScope", "notificationService", "$modal", function ($scope, userService, orgService, $rootScope, notificationService, $modal) {
    $scope.currentUserId = $rootScope.u._id;
    var getUsers = function () {
        orgService.getUsers($rootScope.u.affiliation).success(function (data) {
            $scope.users = data.users
        })
    };
    orgService.getAds($rootScope.u.affiliation).success(function (data) {
        $scope.org = {_id: $rootScope.u.affiliation}, _.each(data.advertisements, function (ad) {
            moment(ad.expiredOn).isBefore(Date.now()) && (ad.expired = !0), ad.expiry = moment(ad.expiredOn).fromNow()
        }), $scope.campaigns = data.advertisements
    }), getUsers(), $scope.openUserDeleteModal = function (id) {
        var modal = $modal.open({templateUrl: "partials/modal_org_user_delete_confirmation.html"});
        modal.result.then(function () {
            orgService.deactivateUser($scope.org._id, id).success(function () {
                notificationService.handleSuccess("User was deactivated"), getUsers()
            })
        })
    }, $scope.openCreateUserModal = function () {
        var modal = $modal.open({templateUrl: "partials/modal_org_user_create.html"});
        modal.result.then(function (data) {
            var user = {firstName: data.name, email: data.email, affiliation: $rootScope.u.affiliation};
            userService.createOrgUser(user).success(function () {
                notificationService.handleSuccess("User account created. We have sent an email notifying the new user")
            })
        })
    }
}]), controllers.controller("ViewCampaignCtrl", ["$scope", "userService", "orgService", "$rootScope", "notificationService", "adService", "$stateParams", "searchService", "adResponseService", function ($scope, userService, orgService, $rootScope, notificationService, adService, $stateParams, searchService, adResponseService) {
    $scope.selectedCandidate = [], $scope.forEmployer = !0, $scope.gridOptions = {data: "responses", showGroupPanel: !0, selectedItems: $scope.selectedCandidate, multiSelect: !1, showFilter: !0, showColumnMenu: !0, columnDefs: [
        {field: "name", displayName: "Name", width: "*"},
        {field: "status", displayName: "Status", width: "*"},
        {field: "updated", displayName: "Last Updated", width: "*"},
        {field: "id", displayName: "ID", visible: !1, width: "*"},
        {field: "referredBy", displayName: "Referred By", visible: !1, width: "*"}
    ]}, $scope.$watch("selectedCandidate[0]", function () {
        0 !== $scope.selectedCandidate.length && ($scope.data = {}, userService.getProfile($scope.selectedCandidate[0].user).success(function (data) {
            $scope.user = data
        }))
    }), adService.getAd($rootScope.u.affiliation, $stateParams.adId).success(function (data) {
        $scope.ad = data.advertisement, $scope.ad.createdOnText = moment($scope.ad.createdOn).format("MMMM DD"), $scope.ad.expired = moment(data.advertisement.expiredOn).isBefore(Date.now())
    });
    var loadResponses = function () {
        adResponseService.getAllResponses($rootScope.u.affiliation, $stateParams.adId).success(function (data) {
            $scope.responses = _.map(data.responses, function (r) {
                return{id: r._id, user: r.user._id ? r.user._id : r.user, name: r.user.firstName + " " + r.user.lastName, status: r.status, updated: moment(r.lastUpdatedOn).fromNow(), tags: r.tags && r.tags.join(", "), referredBy: r.referredBy ? r.referredBy.email : !1}
            })
        })
    };
    loadResponses(), $scope.save = function (response, status, tags) {
        adResponseService.editResponse($rootScope.u.affiliation, $stateParams.adId, response.id, status, tags).success(function () {
            notificationService.handleSuccess("Successfully updated the candidate"), loadResponses()
        })
    }
}]), controllers.controller("AdCtrl", ["$scope", "orgService", "userService", "adService", "notificationService", "$location", "$stateParams", "$state", "$rootScope", function ($scope, orgService, userService, adService, notificationService, $location, $stateParams, $state, $rootScope) {
    orgService.getOrg($rootScope.u.affiliation).success(function (data) {
        $scope.org = data.organization
    }), $scope.ad = {}, $scope.ad.questions = [], $scope.today = moment().format("YYYY-MM-DD"), $scope.maxDate = moment().add("weeks", 4).format("YYYY-MM-DD"), $state.is("editAdvertisement") ? ($scope.heading = "Edit Advertisement", adService.getAd($rootScope.u.affiliation, $stateParams.adId).success(function (data) {
        $scope.ad = data.advertisement;
        var q = $scope.ad.questions;
        $scope.ad.questions = [], _.each(q, function (v) {
            $scope.ad.questions.push({value: v})
        }), $scope.ad.expiredOn = new Date($scope.ad.expiredOn), $scope.postedOn = moment().calendar(), $scope.expiresOn = function () {
            return moment($scope.ad.expiredOn).calendar()
        }
    })) : ($scope.heading = "Create Advertisement", $scope.postedOn = moment().calendar(), $scope.expiresOn = function () {
        return moment($scope.ad.expiredOn).calendar()
    }), $scope.addElement = function (arr) {
        arr.push({})
    }, $scope.removeElement = function (arr, i) {
        arr.splice(i, 1)
    }, $scope.submit = function (ad) {
        ad.questions = _.pluck($scope.ad.questions, "value"), $state.is("createAdvertisement") ? adService.createAd($rootScope.u.affiliation, ad).success(function (data) {
            $state.go("campaignHome", {adId: data.id})
        }) : adService.editAd($rootScope.u.affiliation, $scope.ad.id, ad).success(function () {
            $state.go("organizationDashboard")
        })
    }
}]), controllers.controller("ViewAdCtrl", ["$scope", "orgService", "adService", "$stateParams", "userService", "notificationService", "$rootScope", function ($scope, orgService, adService, $stateParams, userService, notificationService, $rootScope) {
    $scope.org = {}, $scope.ad = {}, adService.getAd($rootScope.u.affiliation, $stateParams.adId).success(function (data) {
        $scope.ad = data.advertisement
    }), orgService.getOrg($rootScope.u.affiliation).success(function (data) {
        $scope.org = data.organization
    })
}]), controllers.controller("ViewPublicAdCtrl", function ($scope, orgService, adService, $stateParams, userService, notificationService, adResponseService, $rootScope, $window, $modal, $state, $localStorage) {
    $scope.org = {}, $scope.ad = {}, $scope.apply = function () {
        userService.isLoggedIn() || ($localStorage.adViewed = angular.toJson({url: $window.location.href, name: $scope.ad.jobRole})), adResponseService.createResponse($rootScope.u._id, $scope.org._id, $scope.ad._id, null, $state.params.ref).success(function () {
            notificationService.handleSuccess("Saved your application successfully"), $scope.status = "applied"
        })
    }, $scope.getShortenedUrl = function () {
        $scope.refurl = $window.location.href + "?ref=" + $rootScope.u._id, $modal.open({templateUrl: "partials/modal_referral_url.html", resolve: {refurl: function () {
            return $scope.refurl
        }, bounty: function () {
            return $scope.ad.bounty
        }}, controller: function ($scope, refurl, bounty, $http, utilService) {
            $scope.refurl = "Shortening link...", $scope.bounty = bounty, utilService.shortenUrl(refurl).success(function (data) {
                $scope.refurl = data.shortened
            }).error(function () {
                $scope.refurl = refurl
            })
        }})
    };
    var getAdvertisement = function (method) {
        method($stateParams.orgId, $stateParams.adId).success(function (data) {
            $scope.ad = data.advertisement
        })
    };
    "email" === $stateParams.from ? ($scope.status = "invited", getAdvertisement(adService.getAd)) : userService.isLoggedIn() ? userService.getResponses().success(function (data) {
        if (data.responses.length > 0) {
            var relevantResponse = _.find(data.responses, function (r) {
                return r.advertisement._id === $stateParams.adId
            });
            relevantResponse ? ($scope.status = relevantResponse.status, getAdvertisement(adService.getAd)) : getAdvertisement(adService.getAdPublic)
        } else getAdvertisement(adService.getAdPublic)
    }) : getAdvertisement(adService.getAdPublic), orgService.getOrg($stateParams.orgId).success(function (data) {
        $scope.org = data.organization
    })
}), controllers.controller("SearchCtrl", function ($scope, $rootScope, $stateParams, userService, adService, searchService, notificationService, validationService, $modal, $location, adResponseService, $state) {
    $scope.displayNameCollection = {AGE_BETWEEN: {name: "Age between", isRange: !0, type: "number", placeholder: ["from", "to"]}, TOTAL_EXPERIENCE_BETWEEN: {name: "Total experience between", isRange: !0, type: "number", placeholder: ["from", "to"]}, CURRENT_POSITION_LIKE: {name: "Current position like", isRange: !1, type: "string", placeholder: []}, EXPERIENCE_LIKE: {name: "Experienced in", isRange: !1, type: "string", placeholder: []}, QUALIFICATIONS_LIKE: {name: "Qualifications include", isRange: !1, type: "string", placeholder: []}, QUALIFICATIONS_FIELD_LIKE: {name: "Qualified in", isRange: !1, type: "string", placeholder: []}, SKILLS_LIKE: {name: "Skills include", isRange: !1, type: "string", placeholder: []}}, $scope.ad = null, $scope.searchId = $stateParams.searchId, $scope.searchCreated = !1, searchService.getSearchForAd($rootScope.u.affiliation, $stateParams.adId).success(function (data) {
        $scope.search = data.search, initiate()
    }).error(function () {
        adService.getAd($rootScope.u.affiliation, $stateParams.adId).success(function (data) {
            if (!$scope.searchCreated) {
                $scope.searchCreated = !0, $scope.ad = data.advertisement;
                var search = {advertisement: $scope.ad.id, name: $scope.ad.jobRole};
                searchService.createSearch($rootScope.u.affiliation, search).success(function (data) {
                    searchService.getSearch($rootScope.u.affiliation, data.id).success(function (data) {
                        $scope.search = data.search, initiate()
                    })
                })
            }
        })
    });
    var initiate = function () {
        $scope.search.criteria || ($scope.search.criteria = []);
        for (var i = 0; i < $scope.search.criteria.length; i++)$scope.search.criteria[i].displayName = $scope.displayNameCollection[$scope.search.criteria[i].name].name
    }, resetCriterion = function () {
        $scope.criterion = {values: [], weight: 1}
    };
    resetCriterion();
    var saveSearch = function () {
        var search = {name: $scope.search.name, criteria: $scope.search.criteria};
        searchService.editSearch($rootScope.u.affiliation, $scope.search.id, search).success(function () {
            notificationService.handleSuccess("Search updated successfully.")
        })
    };
    $scope.add = function (criterion) {
        try {
            validationService.mustBeTrue(criterion.name, "Search criterion type is required"), validationService.mustBeTrue(criterion.values[0], "Search values should be defined"), $scope.displayNameCollection[criterion.name].isRange && (validationService.mustBeTrue(criterion.values[1], "Search value range should be defined"), validationService.mustBeTrue(!_.find($scope.search.criteria, function (c) {
                return c.name === $scope.criterion.name
            }), "You can not specify multiple search criteria of this kind"))
        } catch (e) {
            return
        }
        $scope.search.criteria.push({name: criterion.name, values: _.clone(criterion.values), displayName: $scope.displayNameCollection[criterion.name].name, weight: criterion.weight}), saveSearch(), resetCriterion()
    }, $scope.removeElement = function (arr, i) {
        arr.splice(i, 1), saveSearch()
    }, $scope.doSearch = function () {
        $state.go("results", {adId: $stateParams.adId, searchId: $scope.search.id})
    }
}), controllers.controller("SearchResultsCtrl", function ($scope, searchService, $rootScope, adResponseService, $stateParams, $state, userService, notificationService) {
    function markInvitedCandidates(results) {
        adResponseService.getAllResponses($rootScope.u.affiliation, $scope.search.advertisement).success(function (data) {
            for (var invitedList = _.pluck(_.pluck(data.responses, "user"), "_id"), fullList = _.pluck(results, "_id"), resultsToBeMarked = _.intersection(invitedList, fullList), i = 0; i < resultsToBeMarked.length; i++)for (var j = 0; j < results.length; j++)resultsToBeMarked[i] !== results[j]._id || (results[j].invited = !0)
        })
    }

    $scope.forEmployer = !0, searchService.getSearchResults($rootScope.u.affiliation, $stateParams.searchId).success(function (data) {
        0 !== data.scores.hits.hits.length ? (searchService.getSearch($rootScope.u.affiliation, $stateParams.searchId).success(function (searchData) {
            $scope.search = searchData.search, markInvitedCandidates(data.scores.hits.hits)
        }), $scope.allResults = data.scores.hits.hits, $scope.showTop(10)) : ($scope.allResults = [], notificationService.handleInfo("No candidates found matching that criteria", "Nothing to show!"))
    }), $scope.invite = function (id, tags) {
        adResponseService.createResponse(id, this.$parent.u.affiliation, $stateParams.adId, tags).success(function () {
            $scope.user.invited = !0, notificationService.handleSuccess("Candidate was invited successfully"), markInvitedCandidates($scope.allResults)
        })
    }, $scope.loadProfile = function (id, invited) {
        userService.getProfile(id).success(function (data) {
            return $scope.user = data, $scope.user.id = id, $scope.user.invited = invited, searchService.hitUser($rootScope.u.affiliation, $stateParams.searchId, {user: {_id: $scope.user.id}})
        })
    }, $scope.showTop = function (count) {
        $scope.limitResultsTo = count
    }
}), controllers.controller("LogoutCtrl", ["$scope", "userService", function ($scope, userService) {
    userService.logout()
}]), controllers.controller("MeDashboardCtrl", ["$scope", "userService", "$rootScope", "notificationService", "$modal", "adResponseService", function ($scope, userService, $rootScope, notificationService, $modal, adResponseService) {
    $scope.responses = [], $scope.hasActive = !1, $scope.hasInactive = !1, $scope.hasPending = !1;
    var changeStatus = function (status, response, successMsg) {
        adResponseService.editResponse(response.advertisement.organization._id, response.advertisement._id, response._id, status, null).success(function () {
            notificationService.handleSuccess(successMsg), loadResponses()
        })
    };
    $scope.accept = function (response) {
        var modal = $modal.open({templateUrl: "partials/modal_response_accept.html"});
        modal.result.then(function () {
            changeStatus("accepted", response, "You have successfully accepted the invitation from" + response.advertisement.organization.name)
        })
    }, $scope.reject = function (response) {
        var modal = $modal.open({templateUrl: "partials/modal_response_reject.html"});
        modal.result.then(function () {
            changeStatus("withdrawn", response, "You have rejected the invitation from " + response.advertisement.organization.name)
        })
    }, $scope.withdraw = function (response) {
        var modal = $modal.open({templateUrl: "partials/modal_response_withdraw.html"});
        modal.result.then(function () {
            changeStatus("withdrawn", response, "You have withdrawn your application to " + response.advertisement.organization.name)
        })
    };
    var loadResponses = function () {
        $scope.responses = {invited: [], active: [], inactive: []}, userService.getResponses().success(function (data) {
            0 === data.responses.length ? notificationService.handleInfo("You do not have any active applications", "No applications") : _.each(data.responses, function (response) {
                moment(response.advertisement.expiredOn).isBefore(Date.now()) ? $scope.responses.inactive.push(response) : "invited" === response.status ? $scope.responses.invited.push(response) : "accepted" === response.status || "applied" === response.status ? $scope.responses.active.push(response) : ("withdrawn" === response.status || "rejected" === response.status) && $scope.responses.inactive.push(response)
            })
        })
    };
    loadResponses()
}]), controllers.controller("JobBoardCtrl", ["$scope", "adService", "userService", function ($scope, adService, userService) {
    $scope.ads = [], adService.getAdsPublic().success(function (data) {
        $scope.ads = data.ads
    }), userService.getProfile().success(function (data) {
        $scope.emptyProfile = 0 === data.tenures.length && 0 === data.qualifications.length ? !0 : !1
    })
}]), controllers.controller("NotificationsNavCtrl", ["$scope", "$rootScope", "subwayService", "notificationService", "$location", function ($scope, $rootScope, subwayService, notificationService, $location) {
    $scope.markAsRead = function (notification) {
        subwayService.markAsRead(notification._id).success(function (data) {
            $rootScope.$broadcast("refreshNotifications"), $rootScope.notifications = data
        })
    }, $rootScope.$watch("notifications", function () {
        $scope.notifications = $rootScope.notifications
    }), $scope.goto = function (notification) {
        subwayService.markAsRead(notification._id).success(function () {
            $rootScope.$broadcast("refreshNotifications");
            var fullUrl = notification.link, path = fullUrl.substring(fullUrl.indexOf("#") + 1);
            $location.url(path), $scope.$dismiss()
        })
    }, $scope.notifications = $rootScope.notifications
}]), controllers.controller("ResetPasswordCtrl", ["$scope", "userService", "notificationService", "validationService", function ($scope, userService, notificationService, validationService) {
    $scope.submit = function (email) {
        try {
            validationService.mustBeTrue(!!email, "Email cannot be empty")
        } catch (e) {
            return
        }
        userService.requestPasswordReset(email).success(function () {
            notificationService.handleSuccess("A password reset link was sent to your email address")
        })
    }
}]), controllers.controller("ChangePasswordCtrl", ["$scope", "userService", "notificationService", "validationService", "$stateParams", "$state", function ($scope, userService, notificationService, validationService, $stateParams, $state) {
    $stateParams.token && ($scope.token = $stateParams.token), $scope.submit = function (password) {
        try {
            validationService.mustBeTrue(!!password, "Password can not be empty"), validationService.mustBeTrue($scope.password === $scope.passwordConfirmation, "Password confirmation was different that the password")
        } catch (e) {
            return
        }
        userService.changePassword(password, $scope.token).success(function () {
            notificationService.handleSuccess(userService.isLoggedIn() ? "Your password had been changed successfully." : "Your password was changed. Please log in with the new password.")
        }), $state.go("login")
    }
}]), controllers.controller("ViewOrgProfileCtrl", function ($scope, $stateParams, $rootScope, orgService) {
    "current" === $stateParams.orgId && ($stateParams.orgId = $rootScope.u.affiliation), $scope.org = {_id: $stateParams.orgId}, orgService.getOrg($stateParams.orgId).success(function (data) {
        $scope.org = data.organization
    }), orgService.getPublicAds($stateParams.orgId).success(function (data) {
        $scope.ads = data.advertisements
    })
}), controllers.controller("LandingCtrl", function ($scope, $timeout, userService, $rootScope) {
    var index = 0, incrementIndex = function () {
        index === taunts.length - 1 ? index = 0 : index++
    }, fadeOut = function (callback) {
        $scope.animateCss = "animated fadeOutDown", $timeout(callback, 500)
    }, fadeIn = function () {
        $scope.animateCss = "animated fadeInUp"
    }, taunts = [
        {what: "faster"},
        {what: "easier"},
        {what: "by better companies"},
        {what: "without a CV"},
        {what: "for a better job"}
    ];
    $scope.loggedIn = userService.isLoggedIn(), $scope.isOrgUser = !!$rootScope.u.affiliation;
    var changeTaunt = function () {
        fadeOut(function () {
            $scope.what = taunts[index].what, fadeIn(), incrementIndex(), $timeout(changeTaunt, 5e3)
        })
    };
    $timeout(changeTaunt, 3e3)
}), controllers.controller("AdminCtrl", function (adminService, $scope, notificationService, orgService, $rootScope) {
    $scope.refreshUsers = function () {
        adminService.updateUsers().success(function () {
            notificationService.handleSuccess("Users are being updated. Check the logs.")
        })
    }, $scope.indexUsers = function () {
        adminService.indexUsers().success(function () {
            notificationService.handleSuccess("Check logs")
        })
    }, orgService.getAllOrgs().success(function (response) {
        $scope.orgs = response.organizations
    }), $scope.switch = function (_id) {
        $rootScope.u.affiliation = _id, $rootScope.u.type = "ORG"
    }
}), controllers.controller("AdminUsersCtrl", function ($scope, adminService, $localStorage) {
    $scope.lastUpdatedOn = angular.fromJson($localStorage.adminUpdatedOn), adminService.getAllUsers().success(function (data) {
        $scope.data = data, $scope.goodUsers = _.filter(data, function (user) {
            return user.tenures.length + user.qualifications.length + user.skills.length > 0
        })
    })
}), controllers.controller("AdminInvitesCtrl", function ($scope, adminService, notificationService) {
    $scope.getUninvited = function () {
        adminService.getUninvited().success(function (data) {
            $scope.data = data
        })
    }, $scope.getUninvited(), $scope.inviteUser = function (id) {
        adminService.sendInvitation(id).success(function () {
            notificationService.handleSuccess("Invitation sent successfully."), $scope.getUninvited()
        })
    }, $scope.declineUser = function (id) {
        adminService.declineInvitation(id).success(function () {
            notificationService.handleSuccess("Invitation declined."), $scope.getUninvited()
        })
    }
}), controllers.controller("ProfileBuilderCtrl", function ($scope, $modal, userService, notificationService, $state, cfpLoadingBar, $localStorage, $timeout) {
    $scope.linkedInLoaded = !1, $scope.endLoadingLinkedIn = function () {
        $scope.linkedInLoaded = !0
    }, $timeout(function () {
        $scope.linkedInLoaded || location.reload()
    }, 8e3);
    var employed = null;
    $scope.start = function () {
        $modal.open({templateUrl: "partials/modal_yes_no.html", controller: function ($scope) {
            $scope.question = "Are you employed somewhere, or have been emplyed before?", $scope.yesOption = "Yes, I have/had a job", $scope.noOption = "No, I have never had a job before"
        }}).result.then(function (result) {
            "yes" === result ? ($scope.steps[0].fn = $scope.openTenureModal, employed = !0) : ($scope.steps[0].fn = $scope.openQualificationModal, employed = !1), $scope.next()
        })
    }, $scope.openTenureModal = function () {
        var modal = $modal.open({templateUrl: "partials/modal_me_tenure.html", controller: "QualificationTenureModalInstanceCtrl", resolve: {data: function () {
            var data = $scope.steps[0].data;
            return data.meta = {heading: "Tell us about your current job"}, data
        }}});
        modal.result.then(function (tenure) {
            $scope.step.data = tenure, $scope.next()
        })
    }, $scope.openQualificationModal = function () {
        var modal = $modal.open({templateUrl: "partials/modal_me_qualification.html", controller: "QualificationTenureModalInstanceCtrl", resolve: {data: function () {
            var data = $scope.steps[0].data;
            return data.meta = {heading: "Tell us about the qualification you are following"}, data
        }}});
        modal.result.then(function (qualification) {
            $scope.step.data = qualification, $scope.next()
        })
    }, $scope.openSkillModal = function () {
        var skillModal = $modal.open({templateUrl: "partials/modal_me_skill.html", controller: "SkillModalInstanceCtrl", resolve: {data: function () {
            return{skills: $scope.steps[1].data.skills ? $scope.steps[1].data.skills : [
                {name: null, experience: null}
            ], meta: {heading: "What would you say your top 5 skills are?"}}
        }}});
        skillModal.result.then(function (skills) {
            $scope.step.data = skills, $scope.next()
        })
    }, $scope.openDateOfBirthModal = function () {
        var personalModal = $modal.open({templateUrl: "partials/modal_me_dateofbirth.html", controller: "PersonalModalInstanceCtrl", resolve: {data: function () {
            return $scope.steps[2].data
        }}});
        personalModal.result.then(function (personalData) {
            $scope.step.data = new Date(personalData.dateOfBirth), $scope.next()
        })
    }, $scope.makeProfileFromSteps = function () {
        var profile = {tenures: employed === !0 ? [$scope.steps[0].data] : [], qualifications: employed === !1 ? [$scope.steps[0].data] : [], skills: $scope.steps[1].data, dateOfBirth: $scope.steps[2].data};
        $scope.save(profile)
    }, $scope.save = function (profile) {
        userService.saveProfile(profile).success(function () {
            notificationService.handleSuccess("Profile Saved Successfully"), $state.go("editProfile")
        })
    }, $scope.skip = function () {
        $state.go("editProfile")
    }, $scope.steps = [
        {order: 1, fn: $scope.openTenureModal, status: "init", data: {}},
        {order: 2, fn: $scope.openSkillModal, status: "init", data: {}},
        {order: 3, fn: $scope.openDateOfBirthModal, status: "init", data: {}},
        {order: 4, fn: $scope.makeProfileFromSteps}
    ], $scope.next = function () {
        $scope.step && ($scope.step.status = "done");
        var next = $scope.step ? $scope.step.order + 1 : 1;
        $scope.open(next)
    }, $scope.open = function (step) {
        $scope.step = $scope.steps[step - 1], $scope.step.fn()
    }, $scope.linkedIn = function () {
        function convertDate(obj) {
            return obj && obj.year ? moment({years: obj.year, months: obj.month - 1 || 0, days: obj.day || 1}) : null
        }

        IN.API.Profile("me").fields(["educations", "certifications", "positions", "date-of-birth", "phone-numbers", "skills"]).result(function (result) {
            $scope.$apply(function () {
                if (0 === result._total)return void notificationService.handleError("Error retireving profile");
                var inProfile = result.values[0], userProfile = {};
                userProfile.dateOfBirth = convertDate(inProfile.dateOfBirth);
                var qualifications = [];
                if (inProfile.educations && inProfile.educations._total > 0 && inProfile.educations.values.forEach(function (edu) {
                    var qualification = {};
                    qualification.name = edu.degree, qualification.field = edu.fieldOfStudy, qualification.issuedBy = edu.schoolName, qualification.startedOn = convertDate(edu.startDate), qualification.endedOn = convertDate(edu.endDate), qualification.complete = null !== qualification.endedOn, qualifications.push(qualification)
                }), inProfile.certifications && inProfile.certifications._total > 0 && inProfile.certifications.values.forEach(function (cert) {
                    var certification = {};
                    certification.name = cert.name, certification.field = null, certification.issuedBy = cert.authority, certification.startedOn = convertDate(cert.startDate), certification.endedOn = convertDate(cert.endDate), qualifications.push(certification)
                }), userProfile.qualifications = qualifications, inProfile.phoneNumbers && inProfile.phoneNumbers._total > 0) {
                    var contactNumber = _.find(inProfile.phoneNumbers.values, function (pnumber) {
                        return"mobile" === pnumber.phoneType
                    }).phoneNumber;
                    contactNumber || (contactNumber = inProfile.phoneNumbers.values[0].phoneNumber), userProfile.contactNumber = contactNumber
                }
                var tenures = [];
                inProfile.positions && inProfile.positions._total && inProfile.positions.values.forEach(function (position) {
                    var tenure = {};
                    tenure.organization = position.company.name, tenure.position = position.title, tenure.startedOn = convertDate(position.startDate), tenure.endedOn = position.isCurrent ? null : convertDate(position.endDate), tenure.responsibilities = position.summary, tenures.push(tenure)
                }), userProfile.tenures = tenures;
                var skills = [];
                inProfile.skills && inProfile.skills._total > 0 && inProfile.skills.values.forEach(function (skillObj) {
                    skills.push({name: skillObj.skill.name, experience: 1})
                }), userProfile.skills = skills, $localStorage.tempProfile = angular.toJson(userProfile), $state.go("editProfile")
            })
        })
    }
}), controllers.controller("OrgMeCtrl", function ($scope, userService, $stateParams) {
    $scope.viewedByOrg = !0, userService.getProfile($stateParams.userId).success(function (data) {
        $scope.user = data
    })
}), controllers.controller("FriendShareCtrl", function ($scope, $stateParams, inviteService, notificationService) {
    $scope.storeInvite = function () {
        $scope.invitations = !1;
        var emails = [$scope.email1, $scope.email2], referrer = decodeURIComponent($stateParams.referrer);
        inviteService.sendInvitationReferrer(emails, referrer).success(function () {
            $scope.invitations = !0, notificationService.handleSuccess("Invitations will be sent soon to your friends.")
        })
    }
}), controllers.controller("OrgLandingCtrl", function () {
}), controllers.controller("AdminOrgRequestCtrl", function ($scope, orgService) {
    $scope.view = {}, orgService.getRequests().success(function (response) {
        $scope.requests = response.requests
    })
}), angular.module("kodiak.filters", []).filter("interpolate", ["version", function (version) {
    return function (text) {
        return String(text).replace(/\%VERSION\%/gm, version)
    }
}]);
var directives = angular.module("kodiak.directives", []);
directives.directive("grAd", [function () {
    return{scope: !0, controller: function ($scope, $sce) {
        $scope.postedOn = $scope.ad.postedOn, $scope.ad.description = $sce.trustAsHtml($scope.ad.description), $scope.expiresOn = function () {
            return moment($scope.ad.expiredOn).calendar()
        }
    }, restrict: "A", templateUrl: "partials/template_ad.html"}
}]), directives.directive("grVisualizedProfile", [function () {
    return{scope: !0, controller: function ($scope, $element, $attrs, utilService) {
        $scope.view = {getDuration: function (startedOn, endedOn) {
            return startedOn ? (endedOn || (endedOn = Date.now()), {years: moment(endedOn).diff(startedOn, "years"), months: moment(endedOn).diff(startedOn, "months") % 12}) : void 0
        }, currentYear: function () {
            return moment().year()
        }, getTimesForDate: function (startedOn, endedOn) {
            if (!startedOn)return new Array(1);
            endedOn || (endedOn = Date.now());
            var years = Math.floor(2 * moment(endedOn).diff(moment(startedOn), "years"));
            return(0 === years || isNaN(years)) && (years = 1), new Array(years)
        }, getTimes: utilService.getTimes, getTotalExperience: function () {
            if (!$scope.user || !$scope.user.tenures)return 0;
            var earliest = _.min($scope.user.tenures, function (t) {
                return new Date(t.startedOn).getTime()
            });
            return moment().year() - moment(earliest.startedOn).year()
        }}
    }, restrict: "A", templateUrl: "partials/template_visualized_profile.html"}
}]), directives.directive("grAvatar", [function () {
    return{scope: {email: "@", size: "@"}, link: function (scope, element, attrs) {
        scope.$watch(attrs, function () {
            attrs.email && (element.context.src = "http://www.gravatar.com/avatar/.jpg?s=" + attrs.size)
        })
    }, restrict: "A"}
}]), directives.directive("grSubway", [function () {
    return{restrict: "A", controller: function ($scope, $rootScope, subwayService, notificationService, $modal) {
        $scope.showNotifications = function () {
            $modal.open({templateUrl: "partials/modal_notifications.html", controller: "NotificationsNavCtrl"})
        }
    }, templateUrl: "partials/template_subway_nav.html"}
}]), directives.directive("amTimeAgo", ["$window", function ($window) {
    return function (scope, element, attr) {
        function cancelTimer() {
            activeTimeout && ($window.clearTimeout(activeTimeout), activeTimeout = null)
        }

        function updateTime(momentInstance) {
            element.text(momentInstance.fromNow(withoutSuffix));
            var howOld = $window.moment().diff(momentInstance, "minute"), secondsUntilUpdate = 3600;
            1 > howOld ? secondsUntilUpdate = 1 : 60 > howOld ? secondsUntilUpdate = 30 : 180 > howOld && (secondsUntilUpdate = 300), activeTimeout = $window.setTimeout(function () {
                updateTime(momentInstance)
            }, 1e3 * secondsUntilUpdate)
        }

        function updateMoment() {
            cancelTimer(), updateTime($window.moment(currentValue, currentFormat))
        }

        var currentValue, currentFormat, activeTimeout = null, withoutSuffix = !1;
        scope.$watch(attr.amTimeAgo, function (value) {
            return"undefined" == typeof value || null === value || "" === value ? (cancelTimer(), void(currentValue && (element.text(""), currentValue = null))) : (angular.isNumber(value) && (value = new Date(value)), currentValue = value, void updateMoment())
        }), attr.$observe("amFormat", function (format) {
            currentFormat = format, currentValue && updateMoment()
        }), scope.$on("$destroy", function () {
            cancelTimer()
        })
    }
}]), directives.directive("fileUploader", function () {
    return{restrict: "E", transclude: !0, template: '<input type="file" name="file" onchange="angular.element(this).scope().uploadFile(this.files)" enctype="multipart/form-data" accept={{acceptedtypes}} />', scope: "=", link: function ($scope, $element, $attrs) {
        $scope.acceptedtypes = $attrs.acceptedtypes;
        var fileInput = $element.find('input[type="file"]');
        fileInput.bind("change", function (e) {
            $scope.notReady = 0 === e.target.files.length, $scope.files = [];
            for (var i in e.target.files)"object" == typeof e.target.files[i] && $scope.files.push(e.target.files[i])
        })
    }}
}), directives.directive("grAdPreview", function () {
    return{restrict: "A", templateUrl: "partials/template_ad_preview.html", scope: {ads: "=ads", searchText: "=searchText", org: "=org"}, controller: function ($scope, $state) {
        $scope.go = function (ad) {
            var orgId = "object" == typeof ad.organization ? ad.organization._id : ad.organization;
            $state.go("viewAdvertisementPublic", {orgId: orgId, adId: ad._id})
        }
    }}
}), directives.directive("grProfileError", function () {
    return{restrict: "A", template: 'Please edit and correct these errors (or delete this section): <ul><li ng-repeat="error in errors">{{error}}</li></ul>', scope: {errors: "=errors"}, controller: function ($scope, $element) {
        $scope.errors && $scope.errors.length > 0 && angular.element($element).parent().css("background-color", "#f0b9b6")
    }}
});
var UserVoice = window.UserVoice || [];
!function () {
    var uv = document.createElement("script");
    uv.type = "text/javascript", uv.async = !0, uv.src = "//widget.uservoice.com/2amM07LfE8e0RMlehyAftw.js";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(uv, s)
}(), UserVoice.push(["set", {accent_color: "#6aba2e", trigger_color: "white", trigger_background_color: "#e23a39"}]), UserVoice.push(["identify", {}]), UserVoice.push(["addTrigger", {mode: "contact", trigger_position: "bottom-right"}]), UserVoice.push(["autoprompt", {}]);
var configs = angular.module("kodiak.configs", []);
configs.constant("GRIZZLY_URL", "https://lentil-grizzly.herokuapp.com"), configs.constant("MONTHS", ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]), function (i, s, o, g, r, a, m) {
    i.GoogleAnalyticsObject = r, i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date, a = s.createElement(o), m = s.getElementsByTagName(o)[0], a.async = 1, a.src = g, m.parentNode.insertBefore(a, m)
}(window, document, "script", "//www.google-analytics.com/analytics.js", "ga"), ga("create", "UA-35105714-2", "hirewire.lk"), ga("send", "pageview");