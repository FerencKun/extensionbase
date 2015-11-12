///<reference path="../../Common/Browsers/IBrowser.ts"/>

module UI.Panels.Browsers {

    class Chrome implements UI.Browsers.IBrowser {

        private eventListeners: {(event: Common.Event): void}[] = [];

        constructor(){
            chrome.runtime.onMessage.addListener(
                (request: any) => {
                    for (let i: number = 0; i < this.eventListeners.length; i++) {
                        this.eventListeners[i](request.payload);
                    }
                });
        }

        public trigger(event: Common.Event): void {
            let packedPayload: any =
            { type: 'message', payload: event };
            chrome.runtime.sendMessage(packedPayload);
        }

        public eventReceived(callback: (p1: Common.Event) => void): void {
            this.eventListeners.push(callback);
        }
    }

    export let browser: UI.Browsers.IBrowser = new Chrome();
}