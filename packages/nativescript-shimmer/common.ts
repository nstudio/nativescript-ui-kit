import { Color, Observable } from '@nativescript/core';

export enum ShimmerDirection {
    topToBottom,
    bottomToTop,
    leftToRight,
    rightToLeft
}

// cache color usages to avoid creating so many Color instances (since shimmer can be used a lot throughout any app)
export let lightColorValues = ['rgba(255,255,255,1)'];
export let darkColorValues = ['rgba(0,0,0,.8)'];

export let lightColors: { [key: string]: Color } = {};
lightColors[lightColorValues[0]] = new Color(lightColorValues[0]);
export let darkColors: { [key: string]: Color } = {};
darkColors[darkColorValues[0]] = new Color(darkColorValues[0]);

export class ShimmerCommon extends Observable {
}
