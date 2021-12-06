import { ShimmerCommon, ShimmerDirection } from './common';
import { View } from '@nativescript/core';
export { ShimmerDirection } from './common';
export declare class Shimmer extends ShimmerCommon {
    /**
     * start shimmer on instance
     * @param speed shimmer speed (in seconds)
     * @param direction shimmer direction
     * @param repeat shimmer repeat count - Defaults to Number.MAX_VALUE for infinite
     * @param lightColor the light color tint
     * @param darkColor the dark color tint 
     */
    start(speed?: number, direction?: ShimmerDirection, repeat?: number, lightColor?: string, darkColor?: string): void;
    /**
     * stop shimmer on instance
     */
    stop(): void;
    /**
     * start shimmer
     * iOS can use any {N} view however Android must be a Shimmer instance
     * @param view {N} View
     * @param speed shimmer speed (in seconds)
     * @param direction shimmer direction
     * @param repeat shimmer repeat count - Defaults to Number.MAX_VALUE for infinite
     * @param lightColor the light color tint
     * @param darkColor the dark color tint
     */
    static start(view: View, speed?: number /* seconds */, direction?: ShimmerDirection, repeat?: number, lightColor?: string, darkColor?: string): void;
    /**
     * stop shimmer
     * iOS can use any {N} view however Android must be a Shimmer instance
     * @param view {N} View
     */
    static stop(view: View): void;
}
