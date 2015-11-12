///<reference path="../../Common/Browsers/IBrowser.ts"/>

module UI.Panels.Browsers {

    class Chrome implements UI.Browsers.IBrowser {

        private eventListeners: {(event: Common.Event): void}[] = [];

        constructor(){
            // we are registering the events on the current level, not on the top window
            window.addEventListener('message', (event: any) : any => {
                for (let i: number = 0; i < this.eventListeners.length; i++) {
                    this.eventListeners[i](event.data);
                }
            });
        }

        // because Panels are iframe-s in Chrome - window.top gets the iframe parent window
        // sending the message needs to come from the top window
        public trigger(event: Common.Event): void {
            window.top.postMessage(event, '*');
        }

        public eventReceived(callback: (p1: Common.Event) => void): void {
            this.eventListeners.push(callback);
        }
    }

    export let browser: UI.Browsers.IBrowser = new Chrome();
}