///<reference path="Browsers/IBrowser.ts"/>

module BackgroundScripts {
    'use strict';

    export class Monitor extends BaseBackgroundScript{

        constructor(browser: Browsers.IBrowser) {
            super(browser);
        }

        public start(): void {
            this.browser.getAllTabs((tabs: any): void => {
                for (var i = 0; i < tabs.length; i++) {
                    console.log(tabs[i].url);
                }
            });

            this.browser.setTimeout(() => {
                this.emit(Common.EventTypes.test, { message: "Message from BackgroundScript"},
                    (response: string): void => {
                        console.log("!!!Response after getting BG message:");
                        console.log(response);
                    });
            }, 6000);

            this.on(Common.EventTypes.testContent, (response: any) => {
                console.log("!!!Event from ContentScript received:");
                console.log(response);
            });

            this.on(Common.EventTypes.testUI, (response: any) => {
                console.log("!!!Event from UI received:");
                console.log(response);
            });
        }
    }

    export let monitor: Monitor = new Monitor(Browsers.browser);
    monitor.start();
}