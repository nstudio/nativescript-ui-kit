import { booleanConverter, Color, ContentView, Property } from '@nativescript/core';

export enum ShimmerDirection {
  topToBottom,
  bottomToTop,
  leftToRight,
  rightToLeft,
}

// cache color usages to avoid creating so many Color instances (since shimmer can be used a lot throughout any app)
export let lightColorValues = ['rgba(255,255,255,1)'];
export let darkColorValues = ['rgba(0,0,0,.8)'];

export let lightColors: { [key: string]: Color } = {};
lightColors[lightColorValues[0]] = new Color(lightColorValues[0]);
export let darkColors: { [key: string]: Color } = {};
darkColors[darkColorValues[0]] = new Color(darkColorValues[0]);

export class ShimmerCommon extends ContentView {
  protected _autoStart = true;
  static defaults: {
    speed?: number;
    direction?: ShimmerDirection;
    repeat?: number;
    lightColor?: string;
    darkColor?: string;
  } = {
    speed: 1.1,
    direction: ShimmerDirection.leftToRight, 
    repeat: Number.MAX_VALUE, 
    lightColor: lightColorValues[0],
    darkColor: darkColorValues[0]
  };

  static cacheColors(lightColor: string, darkColor: string) {
    if (!lightColorValues.includes(lightColor)) {
      lightColorValues.push(lightColor);
      lightColors[lightColor] = new Color(lightColor);
    }
    if (!darkColorValues.includes(darkColor)) {
      darkColorValues.push(darkColor);
      darkColors[darkColor] = new Color(darkColor);
    }
  }
}

export const autoStartProperty = new Property<ShimmerCommon, boolean>({
  name: 'autoStart',
  defaultValue: true,
  valueConverter: booleanConverter,
});
autoStartProperty.register(ShimmerCommon);
