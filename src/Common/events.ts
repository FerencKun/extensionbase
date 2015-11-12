module Common {
    'use strict';

    export class Event {
        public id: string;
        public tabId: string;
        public replyTo: string;
        public type: string;
        public params: any;
    }

    export class EventTypes {
        public static test: string = 'bw_test';
    }
}
