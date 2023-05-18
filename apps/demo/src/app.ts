import { Application } from '@nativescript/core';
// Uncomment to test fonticon:
// import { FontIconFactory, fonticon } from 'nativescript-fonticon';
// import { fontAwesome } from './fontawesome';
// import { ionIcons } from './ionicons';

// FontIconFactory.debug = true;
// FontIconFactory.paths = {
//     fa: fontAwesome,
//     ion: ionIcons,
// };
// FontIconFactory.loadCss();

// Application.setResources({ fonticon });

// Uncomment to test Smartlook
import { Smartlook } from '@nstudio/nativescript-smartlook';
if (global.isIOS) {
  @NativeClass()
  class AppDelegateImpl extends UIResponder implements UIApplicationDelegate {
    static ObjCProtocols = [UIApplicationDelegate];

    applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: NSDictionary<string, any>): boolean {
      Smartlook.start('<api-key>');
      return true;
    }
  }

  Application.ios.delegate = AppDelegateImpl;
}

Application.run({ moduleName: 'app-root' });
