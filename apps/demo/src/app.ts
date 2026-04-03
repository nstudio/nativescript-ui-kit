import { Application } from '@nativescript/core';
import { install } from '@nativescript-community/ui-material-bottomsheet';
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

// configure the Cloudinary object here, through the plugin, and make it global
// import { init } from '@nstudio/nativescript-cloudinary';

// init(process.env.CLOUDINARY_CLOUD_NAME!, process.env.CLOUDINARY_API_KEY!, process.env.CLOUDINARY_API_SECRET!, true);

install();

Application.run({ moduleName: 'app-root' });
