///<reference path="./Browsers/IBrowser.ts"/>
/// <reference path="../../Common/events.ts"/>

module UI.Popups {
    'use strict';

    class EventListener {
        public eventType: string;
        public listener: (eventParams: any, response: (response: any) => void) => void;

        constructor(eventType: string, listener: (eventParams: any, response: (response: any) => void) => void) {
            this.eventType = eventType;
            this.listener = listener;
        }
    }

    interface IResponse {
        (params: Object): void;
    }

    export class BaseScript {

        private listeners: EventListener[] = [];
        private pendingResponses: { [key: string]: (params: any) => void } = {};

        constructor(public browser: Browsers.IBrowser) {
            this.browser.eventReceived(this.handleEvent);
        }

        private handleEvent: (event: Common.Event) => void = (event: Common.Event): void => {
            if (this.pendingResponses[event.replyTo]) {
                this.pendingResponses[event.replyTo](event.params);
                delete this.pendingResponses[event.replyTo];
            } else {

                for (let i: number = 0; i < this.listeners.length; i++) {
                    let eventListener: EventListener = this.listeners[i];
                    if (eventListener.eventType === event.type && !event.replyTo) {
                        let response: IResponse = (params: Object): void => {
                            let responseEvent: Common.Event = new Common.Event();
                            responseEvent.id = this.createGuid();
                            responseEvent.replyTo = event.id;
                            responseEvent.type = event.type;
                            responseEvent.params = params;
                            this.browser.trigger(responseEvent);
                        };
                        eventListener.listener(event.params, response);
                    }
                }
            }
        };

        public on(eventType: string, callback: any): void {
            this.listeners.push(new EventListener(eventType, callback));
        }

        public emit(eventType: string, eventParams: any, response: any): void {
            let event: Common.Event = new Common.Event();
            event.id = this.createGuid();
            event.params = eventParams;
            event.type = eventType;

            this.pendingResponses[event.id] = response;

            this.browser.trigger(event);
        }

        private createGuid(): string {
            return Math.floor(Math.random() * 100000000).toString();
        }
    }
}
