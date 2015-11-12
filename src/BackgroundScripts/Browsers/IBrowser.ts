module BackgroundScripts.Browsers {

    export interface IBrowser {
        getAllTabs(response: (tabs: any) => void): void;
        setTimeout(expression: () => void, msec: number): number;
        trigger(event: Common.Event): void;
        eventReceived(callback: (event: Common.Event) => void): void;
    }
}