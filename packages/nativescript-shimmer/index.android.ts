import { View, Color } from '@nativescript/core';
import { darkColorValues, lightColorValues, ShimmerCommon, ShimmerDirection } from './common';
export { ShimmerDirection } from './common';
declare const io;

export class Shimmer extends ShimmerCommon {

  createNativeView() {
    return new io.github.nstudio.ui.ShimmerView(this._context);
  }

  static start(view: View, speed = 1.1, direction: ShimmerDirection = ShimmerDirection.leftToRight, repeat = Number.MAX_VALUE, lightColor = lightColorValues[0], darkColor = darkColorValues[0]) {
    if (view?.android) {
      let nativeDirection = 0;
      switch (direction) {
        case ShimmerDirection.leftToRight:
          nativeDirection = 0;
          break;
        case ShimmerDirection.bottomToTop:
          nativeDirection = 3;
          break;
        case ShimmerDirection.rightToLeft:
          nativeDirection = 2;
          break;
        case ShimmerDirection.topToBottom:
          nativeDirection = 1;
          break;
      }

      // looking better ?
      view?.nativeView?.start(speed * 1000, nativeDirection, repeat === Number.MAX_VALUE ? - 1 : repeat, new Color(lightColor === lightColorValues[0] ? 'white' : lightColor).android, new Color(darkColor === darkColorValues[0] ? 0x4cffffff : darkColor as any).android)
    }
  }
  static stop(view: View) {
    if (view?.android) {
      view?.nativeView?.showShimmer?.(false);
    }
  }
}
