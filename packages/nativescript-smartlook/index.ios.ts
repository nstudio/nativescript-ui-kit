import { SmartlookCommon } from './common';

export class Smartlook extends SmartlookCommon {
    static start(key: string) {
        NSCSmartlook.start(key);
    }

    static stop() {
        NSCSmartlook.stop();
    }

    static isRecording() {
        return NSCSmartlook.isRecording();
    }
}
