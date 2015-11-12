///<reference path="./IBrowser.ts"/>

module BackgroundScripts.Browsers {

    let tabs: any = require("sdk/tabs");
    let timers: any = require("sdk/timers");
    let panels: any = require("sdk/panels");

    class Firefox implements IBrowser {

        private panel: any;

        constructor(){
            this.panel = panels.Panel({
                width: 300,
                height: 455,
                contentURL: './UI/index.html',
                onHide: (): void => {
                    // this.panel.port.emit('hide');
                },
                onShow: (): void => {
                    // this.panel.port.emit('show', tabs.activeTab.url);
                }
            });
        }

        public getAllTabs(response: (tabs: any) => void): void {
            response(tabs);
        }

        public setTimeout(expression: () => void, msec: number): number {
            return timers.setTimeout(expression, msec);
        }

        public eventReceived: (callback: (event: Common.Event) => void) => void =
            (callback: (event: Common.Event) => void): void => {
                this.panel.port.on('message', (event: any): void => {
                    callback(event);
                });
            };

        public trigger: (event: Common.Event) => void =
            (event: Common.Event): void => {
                this.panel.port.emit('message', event);
            };


    }

    export let browser: IBrowser = new Firefox();
}