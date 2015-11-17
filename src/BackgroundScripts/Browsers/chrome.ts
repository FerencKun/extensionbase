module BackgroundScripts.Browsers {

    class Chrome implements IBrowser {

        private eventListeners: {(event: Common.Event): void}[] = [];

        constructor(){
            // Attach listeners
            chrome.runtime.onMessage.addListener(
                (request: any, sender: any) => {
                        for(let i: number = 0; i < this.eventListeners.length; i++){
                            this.eventListeners[i](request.payload);
                        }
                });
        }

        public getAllTabs(response: (tabs: any) => void): void {
            let query = { active: false, currentWindow: true };
            chrome.tabs.query(query, response);
        }

        public eventReceived(callback: (event: Common.Event) => void): void {
            this.eventListeners.push(callback);
        }

        public trigger(event: Common.Event): void {
            let packedPayload: any = {type: 'message', payload: event};

            chrome.runtime.sendMessage(packedPayload);

            // Trigger message to content scripts
            chrome.tabs.query({}, (tabs: chrome.tabs.Tab[]): void => {
                for(let i: number = 0; i < tabs.length; i++) {
                    chrome.tabs.sendMessage(tabs[i].id, packedPayload, (): void => {
                    });
                }
            });
        }

        public setTimeout(expression: () => void, msec: number): number {
            return window.setTimeout(
                (): void => {
                    expression();
                },
                msec);
        }

        public clearTimeout(setTimeoutId: number): void {
            window.clearTimeout(setTimeoutId);
        }

        public setInterval(expression: () => void, msec: number): number {
            return window.setInterval(
                (): void => {
                    expression();
                },
                msec);
        }

        public clearInterval(setIntervalId: number): void {
            window.clearInterval(setIntervalId);
        }
    }

    export let browser: IBrowser = new Chrome();
}