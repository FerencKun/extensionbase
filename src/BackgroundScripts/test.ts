///<reference path="Browsers/IBrowser.ts"/>

module BackgroundScripts {
    'use strict';

    export class Monitor extends BaseBackgroundScript{

        constructor(private browser: Browsers.IBrowser) {
            super(browser);
        }

        public start(): void {
            this.browser.getAllTabs((tabs: any): void => {
                for (var i = 0; i < tabs.length; i++) {
                    console.log(tabs[i].url);
                }
            });
        }
    }

    export let monitor: Monitor = new Monitor(Browsers.browser);
    monitor.start();
}