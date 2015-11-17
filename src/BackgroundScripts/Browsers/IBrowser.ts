module BackgroundScripts.Browsers {

    export interface IBrowser {
        getAllTabs(response: (tabs: any) => void): void;
        trigger(event: Common.Event): void;
        eventReceived(callback: (event: Common.Event) => void): void;
        // extension contexts handle otherwise in ff (no window object with settimeout) and chrome
        setTimeout(expression: () => void, msec: number): number;
        clearTimeout(setTimeoutId: number): void;
        // extension contexts handle otherwise in ff (no window object with settimeout) and chrome
        setInterval(expression: () => void, msec: number): number;
        clearInterval(setIntervalId: number): void;
    }
}