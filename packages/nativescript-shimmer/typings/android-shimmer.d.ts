declare module io {
	export module nstudio {
		export module ui {
			export class Shimmer {
				public static class: java.lang.Class<io.nstudio.ui.Shimmer>;
				public isShimmerStarted(): boolean;
				public onVisibilityChanged(param0: globalAndroid.view.View, param1: number): void;
				public stopShimmer(): void;
				public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
				public showShimmer(param0: boolean): void;
				public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number);
				public verifyDrawable(param0: globalAndroid.graphics.drawable.Drawable): boolean;
				public isShimmerVisible(): boolean;
				public startShimmer(): void;
				public setShimmer(param0: io.nstudio.ui.ShimmerBuilder): io.nstudio.ui.Shimmer;
				public setLightColor(param0: number): void;
				public dispatchDraw(param0: globalAndroid.graphics.Canvas): void;
				public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number, param3: number);
				public getShimmer(): io.nstudio.ui.ShimmerBuilder;
				public start(param0: number, param1: number, param2: number, param3: number, param4: number): void;
				public setDarkColor(param0: number): void;
				public constructor(param0: globalAndroid.content.Context);
				public onDetachedFromWindow(): void;
				public setSpeed(param0: number): void;
				public hideShimmer(): void;
				public onAttachedToWindow(): void;
				public onLayout(param0: boolean, param1: number, param2: number, param3: number, param4: number): void;
			}
		}
	}
}

declare module io {
	export module nstudio {
		export module ui {
			export class ShimmerBuilder {
				public static class: java.lang.Class<io.nstudio.ui.ShimmerBuilder>;
			}
			export module ShimmerBuilder {
				export class AlphaHighlightBuilder extends io.nstudio.ui.ShimmerBuilder.Builder<io.nstudio.ui.ShimmerBuilder.AlphaHighlightBuilder> {
					public static class: java.lang.Class<io.nstudio.ui.ShimmerBuilder.AlphaHighlightBuilder>;
					public getThis(): any;
					public constructor();
					public getThis(): io.nstudio.ui.ShimmerBuilder.AlphaHighlightBuilder;
				}
				export abstract class Builder<T>  extends java.lang.Object {
					public static class: java.lang.Class<io.nstudio.ui.ShimmerBuilder.Builder<any>>;
					public build(): io.nstudio.ui.ShimmerBuilder;
					public setBaseColor(param0: number): T;
					public setWidthRatio(param0: number): T;
					public setRepeatDelay(param0: number): T;
					public setFixedWidth(param0: number): T;
					public setAutoStart(param0: boolean): T;
					public setDuration(param0: number): T;
					public setTilt(param0: number): T;
					public setFixedHeight(param0: number): T;
					public setHeightRatio(param0: number): T;
					public setIntensity(param0: number): T;
					public setDropoff(param0: number): T;
					public getThis(): T;
					public setDirection(param0: io.nstudio.ui.ShimmerBuilder.Direction): T;
					public setHighlightAlpha(param0: number): T;
					public constructor();
					public copyFrom(param0: io.nstudio.ui.ShimmerBuilder): T;
					public setClipToChildren(param0: boolean): T;
					public setBaseAlpha(param0: number): T;
					public setRepeatCount(param0: number): T;
					public setHighLightColor(param0: number): T;
					public setShape(param0: io.nstudio.ui.ShimmerBuilder.Shape): T;
					public setRepeatMode(param0: number): T;
					public setStartDelay(param0: number): T;
				}
				export class ColorHighlightBuilder extends io.nstudio.ui.ShimmerBuilder.Builder<io.nstudio.ui.ShimmerBuilder.ColorHighlightBuilder> {
					public static class: java.lang.Class<io.nstudio.ui.ShimmerBuilder.ColorHighlightBuilder>;
					public setBaseColor(param0: number): any;
					public getThis(): any;
					public constructor();
					public setHighlightColor(param0: number): io.nstudio.ui.ShimmerBuilder.ColorHighlightBuilder;
					public getThis(): io.nstudio.ui.ShimmerBuilder.ColorHighlightBuilder;
					public setBaseColor(param0: number): io.nstudio.ui.ShimmerBuilder.ColorHighlightBuilder;
				}
				export class Direction {
					public static class: java.lang.Class<io.nstudio.ui.ShimmerBuilder.Direction>;
					public static LEFT_TO_RIGHT: io.nstudio.ui.ShimmerBuilder.Direction;
					public static TOP_TO_BOTTOM: io.nstudio.ui.ShimmerBuilder.Direction;
					public static RIGHT_TO_LEFT: io.nstudio.ui.ShimmerBuilder.Direction;
					public static BOTTOM_TO_TOP: io.nstudio.ui.ShimmerBuilder.Direction;
					public static valueOf(param0: string): io.nstudio.ui.ShimmerBuilder.Direction;
					public static values(): native.Array<io.nstudio.ui.ShimmerBuilder.Direction>;
				}
				export class Shape {
					public static class: java.lang.Class<io.nstudio.ui.ShimmerBuilder.Shape>;
					public static LINEAR: io.nstudio.ui.ShimmerBuilder.Shape;
					public static RADIAL: io.nstudio.ui.ShimmerBuilder.Shape;
					public static values(): native.Array<io.nstudio.ui.ShimmerBuilder.Shape>;
					public static valueOf(param0: string): io.nstudio.ui.ShimmerBuilder.Shape;
				}
			}
		}
	}
}

declare module io {
	export module nstudio {
		export module ui {
			export class ShimmerDrawable {
				public static class: java.lang.Class<io.nstudio.ui.ShimmerDrawable>;
				public getShimmer(): io.nstudio.ui.ShimmerBuilder;
				public isShimmerStarted(): boolean;
				public setColorFilter(param0: globalAndroid.graphics.ColorFilter): void;
				public stopShimmer(): void;
				public setShimmer(param0: io.nstudio.ui.ShimmerBuilder): void;
				public startShimmer(): void;
				public draw(param0: globalAndroid.graphics.Canvas): void;
				public setAlpha(param0: number): void;
				public getOpacity(): number;
				public constructor();
				public onBoundsChange(param0: globalAndroid.graphics.Rect): void;
			}
		}
	}
}

declare module org {
	export module nativescript {
		export module nativescript_shimmer {
			export class BuildConfig {
				public static class: java.lang.Class<org.nativescript.nativescript_shimmer.BuildConfig>;
				public static DEBUG: boolean;
				public static LIBRARY_PACKAGE_NAME: string;
				public static APPLICATION_ID: string;
				public static BUILD_TYPE: string;
				public static FLAVOR: string;
				public static VERSION_CODE: number;
				public static VERSION_NAME: string;
				public constructor();
			}
		}
	}
}

//Generics information:
//io.nstudio.ui.ShimmerBuilder.Builder:1

