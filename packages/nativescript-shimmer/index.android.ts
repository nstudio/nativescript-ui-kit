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

  start(speed = Shimmer.defaults.speed, direction: ShimmerDirection = Shimmer.defaults.direction, repeat = Shimmer.defaults.repeat, lightColor = Shimmer.defaults.lightColor, darkColor = Shimmer.defaults.darkColor) {
    if (this.android) {
      Shimmer.cacheColors(lightColor, darkColor);
      this.android.start(speed * 1000, direction, repeat === Number.MAX_VALUE ? -1 : repeat, lightColors[lightColor].android, darkColors[darkColor].android);
    }
  }

  stop() {
    if (this.android) {
      this.android.hideShimmer();
    }
  }

  [autoStartProperty.setNative](value: boolean) {
    this._autoStart = value;
  }

  onLoaded() {
    super.onLoaded();
    if (this._autoStart) {
      this.start();
    } else {
      this.stop();
    }
  }

  static start(view: View, speed = Shimmer.defaults.speed, direction: ShimmerDirection = Shimmer.defaults.direction, repeat = Shimmer.defaults.repeat, lightColor = Shimmer.defaults.lightColor, darkColor = Shimmer.defaults.darkColor): void {
    if (view && view instanceof Shimmer) {
      view.start(speed, direction, repeat, lightColor, darkColor);
    } else if (Shimmer.debug) {
      console.log(viewNote);
    }
  }

  static stop(view: View): void {
    if (view?.android?.hideShimmer) {
      view.android.hideShimmer();
    } else if (Shimmer.debug) {
      console.log(viewNote);
    }
  }
}
