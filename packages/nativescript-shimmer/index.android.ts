import { View, Color } from '@nativescript/core';
import { autoStartProperty, darkColors, darkColorValues, lightColors, lightColorValues, ShimmerCommon, ShimmerDirection } from './common';
const viewNote = 'view is not a Shimmer instance.';

export { ShimmerDirection } from './common';

export class Shimmer extends ShimmerCommon {
  // @ts-ignore
  get android(): io.nstudio.ui.Shimmer {
    return this.nativeView;
  }

  createNativeView() {
    return new io.nstudio.ui.Shimmer(this._context);
  }

  start(speed = 1.1, direction: ShimmerDirection = ShimmerDirection.leftToRight, repeat = Number.MAX_VALUE, lightColor = lightColorValues[0], darkColor = darkColorValues[0]) {
    Shimmer.cacheColors(lightColor, darkColor);
    this.android.start(speed * 1000, direction, repeat === Number.MAX_VALUE ? -1 : repeat, lightColors[lightColor].android, darkColors[darkColor].android);
  }

  stop() {
    this.android.stopShimmer();
  }

  [autoStartProperty.setNative](value: boolean) {
    this._autoStart = value;
  }

  onLoaded() {
    super.onLoaded();
    if (this._autoStart) {
      this.start();
    }
  }

  static start(view: View, speed = 1.1, direction: ShimmerDirection = ShimmerDirection.leftToRight, repeat = Number.MAX_VALUE, lightColor = lightColorValues[0], darkColor = darkColorValues[0]): void {
    if (view && view instanceof Shimmer) {
      view.start(speed, direction, repeat, lightColor, darkColor);
    } else {
      console.log(viewNote);
    }
  }

  static stop(view: View): void {
    if (view?.android?.stopShimmer) {
      view.android.stopShimmer();
    } else {
      console.log(viewNote);
    }
  }
}
