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
// import { Smartlook } from '@nstudio/nativescript-smartlook';
// Application.on(Application.launchEvent, () => {
//   Smartlook.start('<api-key>');
// });

Application.run({ moduleName: 'app-root' });
