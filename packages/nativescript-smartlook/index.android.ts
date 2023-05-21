import { Utils, View } from '@nativescript/core';
import { SmartlookCommon, SmartlookRenderMode } from './common';

declare const com;

export class Smartlook extends SmartlookCommon {
  static start(key: string) {
    io.nstudio.plugins.smartlook.NSCSmartlook.start(key);
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
    const RenderingMode = com.smartlook.android.core.video.annotation.RenderingMode;

    //return io.nstudio.plugins.smartlook.NSCSmartlook.getRenderingMode();

    const mode = com.smartlook.android.core.api.Smartlook.getInstance().getState().getRenderingMode();

    switch (mode) {
      case RenderingMode.NATIVE:
        return 0;
      case RenderingMode.WIREFRAME:
        return 1;
      case RenderingMode.NO_RENDERING:
        return 2;
    }
  }
  static setSensitivity(view: View, sensitive: boolean): void {
    if (view?.android) {
      io.nstudio.plugins.smartlook.NSCSmartlook.setSensitivity(view.android, sensitive);
    }
  }
  static setUser(id: string, name?: string, email?: string, extraData?: any): void {
    io.nstudio.plugins.smartlook.NSCSmartlook.setUser(id, name, email, Utils.dataSerialize(extraData));
  }

  static trackEvent(name: string, properties?: any): void {
    console.log('to do');
  }
  static trackNavigationEvent(name: string): void {
    console.log('to do');
  }
}
