import { View } from '@nativescript/core';
import { SmartlookCommon, SmartlookRenderMode } from './common';
export { SmartlookRenderMode } from './common';

export declare class Smartlook extends SmartlookCommon {
  static start(key: string): void;
  static stop(): void;
  static isRecording(): boolean;
  static sessionUrl(withTimestamp?: boolean): string;
  static setRenderingMode(mode?: SmartlookRenderMode): void;
  static getRenderingMode(): number;
  static setSensitivity(view: View, sensitive: boolean): void;
  static setUser(id: string, name?: string, email?: string, extraData?: any): void;
  static trackEvent(name: string, properties?: any): void;
  static trackNavigationEvent(name: string, properties?: any): void;
}
