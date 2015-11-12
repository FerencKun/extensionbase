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
                    console.log(tabs[i].url);
                }
            });
        };
        return Monitor;
    })();
    BackgroundScripts.Monitor = Monitor;
    BackgroundScripts.monitor = new Monitor(BackgroundScripts.Browsers.browser);
    BackgroundScripts.monitor.start();
})(BackgroundScripts || (BackgroundScripts = {}));
