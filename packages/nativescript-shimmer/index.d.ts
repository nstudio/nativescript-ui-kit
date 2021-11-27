import { ShimmerCommon, ShimmerDirection } from './common';
import { View } from '@nativescript/core';
export declare class Shimmer extends ShimmerCommon {
    static start(view: View, speed?: number, direction?: ShimmerDirection, repeat?: number, lightColor?: string, darkColor?: string): void;
    static stop(view: View): void;
}
