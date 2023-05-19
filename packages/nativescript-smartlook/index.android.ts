import { SmartlookCommon, SmartlookRenderMode } from './common';

export class Smartlook extends SmartlookCommon {
    static start(key: string) {
        io.nstudio.plugins.smartlook.NSCSmartlook.start(key)
    }

    static stop() {
        io.nstudio.plugins.smartlook.NSCSmartlook.stop();
    }

    static isRecording() {
        return io.nstudio.plugins.smartlook.NSCSmartlook.isRecording();
    }

    static sessionUrl(withTimestamp?: boolean): string {
        return io.nstudio.plugins.smartlook.NSCSmartlook.sessionUrl(withTimestamp === true);
    }
    static setRenderingMode(mode?: SmartlookRenderMode): void {
        io.nstudio.plugins.smartlook.NSCSmartlook.setRenderingMode(mode);
    }
    static getRenderingMode(): number {
        return io.nstudio.plugins.smartlook.NSCSmartlook.getRenderingMode();
    }
    static setSensitivity(view: android.view.View, sensitive: boolean): void {
        io.nstudio.plugins.smartlook.NSCSmartlook.setSensitivity(view, sensitive);
    }
    static setUser(id: string, name?: string, email?: string, extraData?: any): void {
        io.nstudio.plugins.smartlook.NSCSmartlook.setUser(id, name, email, extraData);
    }


}
