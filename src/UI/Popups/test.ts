module UI.Popups {
    'use strict';

    class Test extends BaseScript {

        constructor(browser: UI.Popups.Browsers.IBrowser) {
            super(browser);

            this.connectToBackgroundScript();
        }

        private connectToBackgroundScript(){

            this.on(
                Common.EventTypes.test,
                (eventParams: any) => {
                    console.log("!!!Event from BackgroundScript received:");
                    console.log(eventParams);
                });

            this.emit(Common.EventTypes.testUI, { message: "UI ready" }, (response: any): void => {
                console.log("!!!Response after getting UI message:");
                console.log(response);
            });
        }
    }

    let uiTest: Test = new Test(UI.Popups.Browsers.browser)
}