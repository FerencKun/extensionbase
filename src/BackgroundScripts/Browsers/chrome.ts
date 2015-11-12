module BackgroundScripts.Browsers {

    class Chrome implements IBrowser {

        private eventListeners: {(event: Common.Event): void}[] = [];

        constructor(){
        }

        public getAllTabs(response: (tabs: any) => void): void {
            let query = { active: false, currentWindow: true };
            chrome.tabs.query(query, response);
        }

        public setTimeout(expression: () => void, msec: number): number {
            return window.setTimeout(expression, msec);
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
                    chrome.tabs.sendMessage(tabs[i].id, packedPayload, function (): void {
                    });
                }
            });
        }
    }

    export let browser: IBrowser = new Chrome();
}