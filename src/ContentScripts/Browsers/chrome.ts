///<reference path="IBrowser.ts"/>

module ContentScripts.Browsers {

    class Chrome implements IBrowser {

        private eventListeners: {(event: Common.Event): void}[] = [];

        constructor(){
            chrome.runtime.onMessage.addListener(
                (request: any) => {
                    this.eventListeners.forEach((listener: (p1: Common.Event) => void) => {
                        listener(request.payload);
                    });
                });
        }

        public trigger(event: Common.Event): void {
            chrome.runtime.sendMessage(
                event,
                (response: chrome.runtime.ExtensionMessageEvent): void => {
                });
        }

        public eventReceived(callback: (p1: Common.Event) => void): void {
            this.eventListeners.push(callback);
        }
    }

    export let browser: IBrowser = new Chrome();
}