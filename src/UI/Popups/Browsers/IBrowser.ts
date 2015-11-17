module UI.Popups.Browsers {
    export interface IBrowser {
        trigger(event: Common.Event): void;
        eventReceived(callback: (event: Common.Event) => void): void;
    }
}