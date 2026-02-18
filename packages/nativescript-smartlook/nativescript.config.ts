import { NativeScriptConfig } from '@nativescript/core';

export default {
  ios: {
    SPMPackages: [
      {
        name: 'SmartlookAnalytics',
        libs: ['SmartlookAnalytics'],
        repositoryURL: 'https://github.com/smartlook/analytics-swift-package.git',
        version: '2.2.15',
      },
    ],
  },
} as NativeScriptConfig;
