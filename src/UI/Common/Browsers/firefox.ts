///<reference path="./IBrowser.ts"/>

module UI.Browsers {

    // there is no require here - causing hidden error on runtime - ff fails but no info
    // let self: any = require("sdk/self");

    class Firefox implements IBrowser {

        private eventListeners: {(event: Common.Event): void}[] = [];
        private port: any;

        constructor(){
            this.port = this.getPort();
            this.port.on('message', (event: any) : any => {
                for (let i: number = 0; i < this.eventListeners.length; i++) {
                    this.eventListeners[i](event.data);
                }
            });
        }

        public trigger(event: Common.Event): void {
            this.port.emit('message', event);
        }

        public eventReceived(callback: (p1: Common.Event) => void): void {
            this.eventListeners.push(callback);
        }

        private getPort(): any {
            if (self.port) {
                return self.port;
            } else if (window.addon) {
                return addon.port;
            } else {
                return {
                    on: (type: string, callback: any): void => {
                        window.addEventListener(type, callback, false);
                    },
                    emit: (type: string, payload: any): void => {
                        window.postMessage(payload, '*');
                    }
                };
            }
        }
    }

    export let browser: IBrowser = new Firefox();
}