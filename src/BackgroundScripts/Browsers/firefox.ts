///<reference path="./IBrowser.ts"/>

module BackgroundScripts.Browsers {

    let tabs: any = require("sdk/tabs");
    let timers: any = require("sdk/timers");
    let panels: any = require("sdk/panel");
    let pageMod: any = require('sdk/page-mod');
    let buttons: any = require('sdk/ui/button/action');

    class Firefox implements IBrowser {

        private panel: any;
        private button: any;
        private eventListeners: {(event: Common.Event): void}[] = [];

        constructor(){
            this.panel = panels.Panel({
                width: 300,
                height: 455,
                contentURL: './UI/Popups/index.html',
                onHide: (): void => {
                    // this.panel.port.emit('hide');
                },
                onShow: (): void => {
                    // this.panel.port.emit('show', tabs.activeTab.url);
                }
            });

            this.button = buttons.ActionButton({
                id: 'extensionbase-2',
                label: 'ExtensionBase',
                icon: {
                    '16': './Assets/Icons/icon.png',
                    '32': './Assets/Icons/icon.png',
                    '64': './Assets/Icons/icon.png'
                },
                onClick: this.handleClick
            });

            this.panel.port.on('message', (event: any): void => {
                for (let i: number = 0; i < this.eventListeners.length; i++) {
                    this.eventListeners[i](event.payload);
                }
            });

            pageMod.PageMod({
                include: '*',
                contentScriptFile: './ContentScripts/contentScript.js',
                contentScriptWhen: 'ready'
            });
        }

        private handleClick: () => void =
            (): void => {

                if (this.panel.isShowing) {
                    this.panel.hide();
                } else {
                    this.panel.hide();
                    this.panel.show({
                        position: this.button
                    });
                }
            };

        public getAllTabs(response: (tabs: any) => void): void {
            response(tabs);
        }

        public eventReceived: (callback: (event: Common.Event) => void) => void =
            (callback: (event: Common.Event) => void): void => {
                this.eventListeners.push(callback);
            };

        public trigger: (event: Common.Event) => void =
            (event: Common.Event): void => {
                let packedPayload: any = {type: 'message', payload: event};
                this.panel.port.emit(packedPayload);
            };

        public setTimeout(expression: () => void, msec: number): number {
            return timers.setTimeout(expression, msec);
        }

        public clearTimeout(setTimeoutId: number): void {
            timers.clearTimeout(setTimeoutId);
        }

        public setInterval(expression: () => void, msec: number): number {
            return timers.setInterval(expression, msec);
        }

        public clearInterval(setIntervalId: number): void {
            timers.clearInterval(setIntervalId);
        }
    }

    export let browser: IBrowser = new Firefox();
}