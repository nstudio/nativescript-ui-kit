import { Color, View } from '@nativescript/core';
import { autoStartProperty, darkColors, darkColorValues, lightColors, lightColorValues, ShimmerCommon, ShimmerDirection } from './common';

export { ShimmerDirection } from './common';

export class Shimmer extends ShimmerCommon {

  start(speed = Shimmer.defaults.speed, direction: ShimmerDirection = Shimmer.defaults.direction, repeat = Shimmer.defaults.repeat, lightColor = Shimmer.defaults.lightColor, darkColor = Shimmer.defaults.darkColor) {
    Shimmer.start(this, speed, direction, repeat, lightColor, darkColor);
  }

  stop() {
    Shimmer.stop(this);
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

  static start(view: View, speed = Shimmer.defaults.speed, direction: ShimmerDirection = Shimmer.defaults.direction, repeat = Shimmer.defaults.repeat, lightColor = Shimmer.defaults.lightColor, darkColor = Shimmer.defaults.darkColor) {
    if (view?.ios) {
      Shimmer.cacheColors(lightColor, darkColor);
      view.ios.startShimmeringWithSpeedDirectionRepeatCountLightColorBlackColor(speed, direction, repeat, lightColors[lightColor].ios.CGColor, darkColors[darkColor].ios.CGColor);
    }
    // startShimmering(view);
  }

  static stop(view: View) {
    if (view?.ios) {
      view.ios.stopShimmering();
    }
    // stopShimmering(view);
  }
}

// function startShimmering(view: View) {
//   // for (const key in view.ios) {
//   //   console.log(key)
//   // }
//   view.ios.startShimmering();
// }

// function stopShimmering(view: View) {
//   view.ios.stopShimmering();
// }

// let shimmerGradientLayer: CAGradientLayer;
// function getGradientLayer(view: View) {
//   if (!shimmerGradientLayer) {
//     // create color
//     const lightColor = UIColor.colorWithDisplayP3RedGreenBlueAlpha(1.0, 1.0, 1.0, 0.1).CGColor;
//     const blackColor = UIColor.blackColor.CGColor;
  
//     // create gradient
//     shimmerGradientLayer = CAGradientLayer.layer();
//     shimmerGradientLayer.colors = NSArray.arrayWithArray([blackColor, lightColor, blackColor]);
//     shimmerGradientLayer.frame = CGRectMake(-view.ios.bounds.size.width, -view.ios.bounds.size.height, 3 * view.ios.bounds.size.width, 3 * view.ios.bounds.size.height);
//     shimmerGradientLayer.startPoint = CGPointMake(0, 0.5);
//     shimmerGradientLayer.endPoint = CGPointMake(1, 0.5);
//     shimmerGradientLayer.locations = NSArray.arrayWithArray([0.35, 0.5, 0.65]);
//   } 
//   return shimmerGradientLayer;
// }

// function startShimmering(view: View, speed = 1.4, repeatCount = Number.MAX_VALUE) {
  
//   // does not work when sharing gradientlayer
//   // const gradientLayer = getGradientLayer(view);
//   // view.ios.layer.mask = gradientLayer;

//   // works when creating new gradientlayer each time
//   // create color
//   const lightColor = UIColor.colorWithDisplayP3RedGreenBlueAlpha(1.0, 1.0, 1.0, 0.1).CGColor;
//   const blackColor = UIColor.blackColor.CGColor;

//   // create gradient
//   const gradientLayer = CAGradientLayer.layer();
//   gradientLayer.colors = NSArray.arrayWithArray([blackColor, lightColor, blackColor]);
//   gradientLayer.frame = CGRectMake(-view.ios.bounds.size.width, -view.ios.bounds.size.height, 3 * view.ios.bounds.size.width, 3 * view.ios.bounds.size.height);
//   gradientLayer.startPoint = CGPointMake(0, 0.5);
//   gradientLayer.endPoint = CGPointMake(1, 0.5);
//   gradientLayer.locations = NSArray.arrayWithArray([0.35, 0.5, 0.65]);
//   view.ios.layer.mask = gradientLayer;

//   // animate over gradient
//   CATransaction.begin();
//   const animation = CABasicAnimation.animationWithKeyPath('locations');
//   animation.fromValue = [0.0, 0.1, 0.2];
//   animation.toValue = [0.8, 0.9, 1.0];
//   animation.duration = speed;
//   animation.repeatCount = repeatCount;
//   CATransaction.setCompletionBlock(() => {
//     view.ios.layer.mask = null;
//   });
//   gradientLayer.addAnimationForKey(animation, 'shimmerAnimation');
//   CATransaction.commit();
//   // console.log('view.ios.layer.mask:', view.ios.layer.mask)
// }

// function stopShimmering(view: View) {
//   view.ios.layer.mask = null;
// }
