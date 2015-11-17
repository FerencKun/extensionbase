///<reference path="./IBrowser.ts"/>

module UI.Popups.Browsers {

    class Chrome implements IBrowser {

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
            chrome.runtime.sendMessage({ type: "message", payload: event });
        }

        public eventReceived(callback: (p1: Common.Event) => void): void {
            this.eventListeners.push(callback);
        }
    }

    export let browser: IBrowser = new Chrome();
}