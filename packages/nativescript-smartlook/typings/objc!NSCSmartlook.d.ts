declare class NSCSmartlook extends NSObject {
  static alloc(): NSCSmartlook; // inherited from NSObject

  static getRenderingMode(): number;

  static isRecording(): boolean;

  static new(): NSCSmartlook; // inherited from NSObject

  static sessionUrl(withTimestamp: boolean): string;

  static setRenderingMode(mode: number): void;

  static setSensitivitySensitive(view: UIView, sensitive: boolean): void;

  static setUserWithIdNameEmailExtraData(id: string, name: string, email: string, extraData: NSDictionary<any, any>): void;

  static start(key: string): void;

  static stop(): void;

  static trackEventProperties(name: string, properties: NSDictionary<any, any>): void;

  static trackNavigationEvent(name: string, properties: NSDictionary<any, any>): void;
}
