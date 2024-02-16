declare module io {
  export module nstudio {
    export module plugins {
      export module smartlook {
        export class NSCSmartlook {
          public static class: java.lang.Class<io.nstudio.plugins.smartlook.NSCSmartlook>;
          public static sessionUrl(param0: boolean): string;
          public static getRenderingMode(): number;
          public static start(param0: string): void;
          public constructor();
          public static setSensitivity(param0: globalAndroid.view.View, param1: boolean): void;
          public static setRenderingMode(param0: number): void;
          public static isRecording(): boolean;
          public static stop(): void;
          public static setUser(param0: string, param1: string, param2: string, param3: java.util.HashMap<string, string>): void;
          public static trackEvent(param0: string, param1: java.util.HashMap<string, string>): void;
          public static trackNavigationEvent(param0: string, param1: java.util.HashMap<string, string>): void;
        }
        export module NSCSmartlook {
          export class Companion {
            public static class: java.lang.Class<io.nstudio.plugins.smartlook.NSCSmartlook.Companion>;
            public getRenderingMode(): number;
            public setRenderingMode(param0: number): void;
            public sessionUrl(param0: boolean): string;
            public start(param0: string): void;
            public setUser(param0: string, param1: string, param2: string, param3: java.util.HashMap<string, string>): void;
            public stop(): void;
            public setSensitivity(param0: globalAndroid.view.View, param1: boolean): void;
            public isRecording(): boolean;
          }
          export module Companion {
            export class WhenMappings {
              public static class: java.lang.Class<io.nstudio.plugins.smartlook.NSCSmartlook.Companion.WhenMappings>;
            }
          }
        }
      }
    }
  }
}
