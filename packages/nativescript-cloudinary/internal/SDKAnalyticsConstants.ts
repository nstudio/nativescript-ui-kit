import { Device, Utils } from '@nativescript/core';

const getNativeScriptVersion = () => {
  try {
    const version = Device.os;
    return version.toString();
  } catch {
    return '0.0.0';
  }
};

const getSDKVersion = () => {
  try {
    const SDKVersionPackageJson = require('../../package.json');
    if (SDKVersionPackageJson && SDKVersionPackageJson.version) {
      return SDKVersionPackageJson.version;
    }
  } catch {
    return '0.0.0';
  }
  return '0.0.0';
};

const getOSType = () => {
  switch (Device.os.toLowerCase()) {
    case 'android':
      return 'A';
    case 'ios':
      return 'B';
    default:
      return 'Z';
  }
};

const getOSVersion = () => {
  switch (Device.os.toLowerCase()) {
    case 'android':
      return Device.osVersion ? Device.osVersion : 'AA';
    case 'ios':
      return Device.osVersion ? Device.osVersion : 'AA';
    default:
      return 'AA';
  }
};

export const SDKAnalyticsConstants = {
  sdkSemver: getSDKVersion(),
  techVersion: getNativeScriptVersion(),
  sdkCode: 'P',
  osType: getOSType(),
  osVersion: getOSVersion(),
};
