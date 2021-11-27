import { View } from '@nativescript/core';
import { darkColorValues, lightColorValues, ShimmerCommon, ShimmerDirection } from './common';

export class Shimmer extends ShimmerCommon {
  static start(view: View, speed = 1.1, direction: ShimmerDirection = ShimmerDirection.leftToRight, repeat = Number.MAX_VALUE, lightColor = lightColorValues[0], darkColor = darkColorValues[0]) {
    if (view?.android) {
    }
  }
  static stop(view: View) {
    if (view?.ios) {
    }
  }
}
