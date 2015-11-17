///<reference path="BaseContentScript.ts"/>
///<reference path="../Common/Events.ts"/>

module ContentScripts {
    'use strict';

    export class Test extends BaseContentScript {

        constructor(browser: Browsers.IBrowser) {
            super(browser);

            this.connectToBackgroundScript();
            this.connectToWebsite();
        }

        private connectToBackgroundScript(){

            this.on(
                Common.EventTypes.test,
                (eventParams: any) => {
                    console.log("!!!Event from BackgroundScript received:");
                    console.log(eventParams);
                });

            this.emit(Common.EventTypes.testContent, { message: "Content Script ready!"}, (response: any): void => {
                console.log("!!!Response after getting ContentScript message:");
                console.log(response);
            });
        }

        private connectToWebsite(): void {
            document.body.setAttribute('eb-attr-injected', 'true');

            /*window.addEventListener('message', (event: MessageEvent) => {
                 switch (event.data) {
                     default:
                     break;
                 }
             });

             window.postMessage({type: 'eventFromPage'}, '*');
             */
        }
    }

    export let ready: boolean = false;

    export function init(): void {
        ready = true;
        new Test(ContentScripts.Browsers.browser);
    }
}

// firefox needs it, chrome has manifest settings for it, to wait for document ready
if (document.body) {
    ContentScripts.init();
} else {
    setTimeout(() => {
            if(!ContentScripts.ready){
                ContentScripts.init();
            }
        },
        1000);
}