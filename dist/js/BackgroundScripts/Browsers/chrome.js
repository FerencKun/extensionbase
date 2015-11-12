var BackgroundScripts;
(function (BackgroundScripts) {
    var Browsers;
    (function (Browsers) {
        var Chrome = (function () {
            function Chrome() {
            }
            Chrome.prototype.getAllTabs = function (response) {
                var query = { active: false, currentWindow: true };
                chrome.tabs.query(query, response);
            };
            Chrome.prototype.setTimeout = function (expression, msec) {
                return window.setTimeout(expression, msec);
            };
            return Chrome;
        })();
        Browsers.browser = new Chrome();
    })(Browsers = BackgroundScripts.Browsers || (BackgroundScripts.Browsers = {}));
})(BackgroundScripts || (BackgroundScripts = {}));
