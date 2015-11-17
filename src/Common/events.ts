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
        public static test: string = 'bw_test_from_bg';
        public static testContent: string = 'bw_test_from_content';
        public static testUI: string = 'bw_test_from_ui';
    }
}
