import { NativeScriptConfig } from '@nativescript/core';

export default {
  ios: {
    SPMPackages: [
      {
        name: 'Cloudinary',
        libs: ['Cloudinary'],
        repositoryURL: 'https://github.com/cloudinary/cloudinary_ios.git',
        version: '5.2.3',
      },
    ],
  },
} as NativeScriptConfig;
