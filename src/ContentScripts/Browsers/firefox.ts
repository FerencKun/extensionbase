///<reference path="IBrowser.ts"/>

module ContentScripts.Browsers {

    class Firefox implements IBrowser {

        private eventListeners: {(event: Common.Event): void}[] = [];
        private port: any;

        constructor(){
            this.port = this.getPort();
            this.port.on('message', (event: any) : any => {
                for (let i: number = 0; i < this.eventListeners.length; i++) {
                    this.eventListeners[i](event.payload);
                }
            });
        }

        public trigger(event: Common.Event): void {
            let packedPayload: any = {type: 'message', payload: event};
            this.port.emit(packedPayload);
        }

        public eventReceived(callback: (p1: Common.Event) => void): void {
            this.eventListeners.push(callback);
        }

        private getPort(): any {
            if (self.port) {
                console.log("self.port is available");
                return self.port;
            } else if (window.addon) {
                console.log("self.port is available");
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