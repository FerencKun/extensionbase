///<reference path="./IBrowser.ts"/>
var BackgroundScripts;
(function (BackgroundScripts) {
    var Browsers;
    (function (Browsers) {
        var tabs = require("sdk/tabs");
        var timers = require("sdk/timers");
        var Firefox = (function () {
            function Firefox() {
            }
            Firefox.prototype.getAllTabs = function (response) {
                response(tabs);
            };
            Firefox.prototype.setTimeout = function (expression, msec) {
                return timers.setTimeout(expression, msec);
            };
            return Firefox;
        })();
        Browsers.browser = new Firefox();
    })(Browsers = BackgroundScripts.Browsers || (BackgroundScripts.Browsers = {}));
})(BackgroundScripts || (BackgroundScripts = {}));



///<reference path="Browsers/IBrowser.ts"/>
var BackgroundScripts;
(function (BackgroundScripts) {
    'use strict';
    var Monitor = (function () {
        function Monitor(browser) {
            this.browser = browser;
            this.browser = browser;
        }
        Monitor.prototype.start = function () {
            this.browser.getAllTabs(function (tabs) {
                for (var i = 0; i < tabs.length; i++) {
                    window.console.log(tabs[i].url);
                }
            });
        };
        return Monitor;
    })();
    BackgroundScripts.Monitor = Monitor;
    BackgroundScripts.monitor = new Monitor(BackgroundScripts.Browsers.browser);
    BackgroundScripts.Browsers.browser.setTimeout(function () {
        window.console.log("wqeqweqweqweqweqe");
        BackgroundScripts.monitor.start();
    }, 30000);
})(BackgroundScripts || (BackgroundScripts = {}));
