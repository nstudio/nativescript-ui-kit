import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.plugindemo',
  appResourcesPath: '../../tools/assets/App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
  },
  appPath: 'src',
  cli: {
    packageManager: 'npm',
  },
  ios: {
    SPMPackages: [
      {
        name: 'RiveRuntime',
        libs: ['RiveRuntime'],
        repositoryURL: 'https://github.com/rive-app/rive-ios.git',
        version: '5.0.0',
      },
      {
        name: 'SmartlookAnalytics',
        libs: ['SmartlookAnalytics'],
        repositoryURL: 'https://github.com/smartlook/analytics-swift-package.git',
        version: '2.2.4',
      },
    ],
  },
} as NativeScriptConfig;
