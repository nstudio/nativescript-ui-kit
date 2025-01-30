import { Utils, View } from '@nativescript/core';
import { SmartlookCommon, SmartlookRenderMode } from './common';

export class Smartlook extends SmartlookCommon {
  static start(key: string) {
    Utils.executeOnUIThread(() => {
      NSCSmartlook.start(key);
    });
  }

  static stop() {
    NSCSmartlook.stop();
  }

  static isRecording() {
    return NSCSmartlook.isRecording();
  }

  static sessionUrl(withTimestamp?: boolean): string {
    return NSCSmartlook.sessionUrl(withTimestamp === true);
  }

  static setRenderMode(mode: SmartlookRenderMode) {
    NSCSmartlook.setRenderingMode(mode);
  }

  static getRenderingMode() {
    return NSCSmartlook.getRenderingMode();
  }

  static setSensitivity(view: View, sensitive: boolean) {
    if (view?.ios) {
      NSCSmartlook.setSensitivitySensitive(view.ios, sensitive);
    }
  }

  static setUser(id: string, name: string, email: string, extraData?: any) {
    NSCSmartlook.setUserWithIdNameEmailExtraData(id, name, email, extraData);
  }

  static trackEvent(name: string, properties?: any) {
    NSCSmartlook.trackEventProperties(name, properties);
  }

  static trackNavigationEvent(name: string, properties?: any) {
    NSCSmartlook.trackNavigationEventProperties(name, properties);
  }
}
