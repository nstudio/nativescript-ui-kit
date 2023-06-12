import { DemoSharedBase } from '../utils';
import {} from '@nstudio/nativescript-water-ripple';

import { registerSwiftUI, SwiftUI, SwiftUIEventData, UIDataDriver } from '@nativescript/swift-ui';

declare var WaterRippleDemoProvider: any;
registerSwiftUI('waterRipple', (view) => new UIDataDriver(WaterRippleDemoProvider.alloc().init(), view));

export class DemoSharedNativescriptWaterRipple extends DemoSharedBase {
  waterRippleData = {
    scale: 10.0,
    sharpness: 0.8,
    spread: 0.1,
  };
  testIt() {
    console.log('test nativescript-water-ripple!');
  }
}
