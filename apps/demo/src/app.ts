import { Application } from '@nativescript/core';

// uncommennt to test fonticon:
// import { fontAwesome } from './fontawesome';
// import { ionIcons } from './ionicons';
// import { FontIconFactory, fonticon } from 'nativescript-fonticon';

// FontIconFactory.debug = true;
// FontIconFactory.paths = {
//     fa: fontAwesome,
//     ion: ionIcons,
// };
// FontIconFactory.loadCss();
// Application.setResources({ fonticon });

Application.run({ moduleName: 'app-root' });
