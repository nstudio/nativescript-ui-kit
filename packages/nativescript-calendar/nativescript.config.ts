import { NativeScriptConfig } from '@nativescript/core';

export default {
  ios: {
    SPMPackages: [
      {
        name: 'HorizonCalendar',
        libs: ['HorizonCalendar'],
        repositoryURL: 'https://github.com/airbnb/HorizonCalendar.git',
        version: '2.0.0',
      },
    ],
  },
} as NativeScriptConfig;
