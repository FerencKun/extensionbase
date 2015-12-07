///<reference path="IBrowser.ts"/>

module ContentScripts.Browsers {

    class Chrome implements IBrowser {

        private eventListeners: {(event: Common.Event): void}[] = [];

        constructor(){
            chrome.runtime.onMessage.addListener(
                (request: any, sender: any, sendResponse: any) => {
                    this.eventListeners.forEach((listener: (p1: Common.Event) => void) => {
                        listener(request.payload);
                    });
                });

            // propagates events from Panel to all other component
            window.addEventListener(
                'message',
                (event: any): any => {
                    event.data.fromIFrame = true;
                    this.trigger(event.data);
                },
                false);
        }

        public trigger(event: Common.Event): void {
            chrome.runtime.sendMessage(
                    { type: "message", payload: event },
                    (response: chrome.runtime.ExtensionMessageEvent): void => {
                });
        }

        public eventReceived(callback: (p1: Common.Event) => void): void {
            this.eventListeners.push(callback);
        }
    }

    export let browser: IBrowser = new Chrome();
}