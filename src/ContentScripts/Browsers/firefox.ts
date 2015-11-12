///<reference path="IBrowser.ts"/>

module ContentScripts.Browsers {

    let self: any = require("sdk/self");

    class Firefox implements IBrowser {

        private eventListeners: {(event: Common.Event): void}[] = [];

        constructor(){
            chrome.runtime.onMessage.addListener(
                (request: any) => {

                    if (request.payload.fromIFrame) {
                        for (let i: number = 0, len: number = window.top.frames.length; i < len; i++) {
                            window.top.frames[i].window.postMessage(request.payload, '*');
                        }
                    } else {
                        this.eventListeners.forEach((listener: (p1: Common.Event) => void) => {
                            listener(request.payload);

                        });
                    }
                });
        }

        public trigger(event: Common.Event): void {
            self.port.on(
                event,
                (response: any): void => {
                    // Handling events different way
                });
        }

        public eventReceived(callback: (p1: Common.Event) => void): void {
            this.eventListeners.push(callback);
        }
    }

    export let browser: IBrowser = new Firefox();
}