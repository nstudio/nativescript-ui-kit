import { Color, View } from '@nativescript/core';
import { darkColors, darkColorValues, lightColors, lightColorValues, ShimmerCommon, ShimmerDirection } from './common';

export class Shimmer extends ShimmerCommon {
  static start(view: View, speed = 1.1, direction: ShimmerDirection = ShimmerDirection.leftToRight, repeat = Number.MAX_VALUE, lightColor = lightColorValues[0], darkColor = darkColorValues[0]) {
    if (view?.ios) {
      if (!lightColorValues.includes(lightColor)) {
        lightColorValues.push(lightColor);
        lightColors[lightColor] = new Color(lightColor);
      }
      if (!darkColorValues.includes(darkColor)) {
        darkColorValues.push(darkColor);
        darkColors[darkColor] = new Color(darkColor);
      }
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

// function startShimmering(view: View, speed = 1.4, repeatCount = Number.MAX_VALUE) {
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
//   console.log('view.ios.layer.mask:', view.ios.layer.mask)
// }

// function stopShimmering(view: View) {
//   view.ios.layer.mask = null;
// }
