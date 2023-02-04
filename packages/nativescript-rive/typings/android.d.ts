declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export class BuildConfig {
					public static class: java.lang.Class<app.rive.runtime.kotlin>;
					public static DEBUG: boolean;
					public static LIBRARY_PACKAGE_NAME: string;
					public static BUILD_TYPE: string;
					public constructor();
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export class DetachedRiveState {
					public static class: java.lang.Class<app.rive.runtime.kotlin>;
					public constructor(param0: java.util.List<string>, param1: java.util.List<string>);
					public getPlayingAnimationsNames(): java.util.List<string>;
					public getPlayingStateMachineNames(): java.util.List<string>;
					public equals(param0: any): boolean;
					public toString(): string;
					public component1(): java.util.List<string>;
					public component2(): java.util.List<string>;
					public hashCode(): number;
					public copy(param0: java.util.List<string>, param1: java.util.List<string>): app.rive.runtime.kotlin;
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export class Observable<ListenerType>  extends java.lang.Object {
					public static class: java.lang.Class<app.rive.runtime.kotlin>;
					/**
					 * Constructs a new instance of the app.rive.runtime.kotlin interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						registerListener(param0: ListenerType): void;
						unregisterListener(param0: ListenerType): void;
					});
					public constructor();
					public registerListener(param0: ListenerType): void;
					public unregisterListener(param0: ListenerType): void;
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export class PointerEvents {
					public static class: java.lang.Class<app.rive.runtime.kotlin>;
					public static POINTER_DOWN: app.rive.runtime.kotlin;
					public static POINTER_UP: app.rive.runtime.kotlin;
					public static POINTER_MOVE: app.rive.runtime.kotlin;
					public static valueOf(param0: string): app.rive.runtime.kotlin;
					public static values(): androidNative.Array<app.rive.runtime.kotlin>;
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export class RiveAnimationView extends app.rive.runtime.kotlin implements app.rive.runtime.kotlin  {
					public static class: java.lang.Class<app.rive.runtime.kotlin>;
					public static TAG: string;
					public setFit(param0: app.rive.runtime.kotlin): void;
					public setBooleanState(param0: string, param1: string, param2: boolean): void;
					public getStateMachines(): java.util.List<app.rive.runtime.kotlin>;
					public setRiveBytes(bytes: java.lang.Byte, artboardName: string, animationName: string, stateMachineName: string, autoplay: boolean, fit: app.rive.runtime.kotlin.core.Fit, alignment: app.rive.runtime.kotlin.core.Alignment, loop: app.rive.runtime.kotlin.core.Loop): void;
					public getFit(): app.rive.runtime.kotlin;
					public setRiveResource(resId: number, artboardName: string, animationName: string, stateMachineName: string, autoplay: boolean, fit: app.rive.runtime.kotlin.core.Fit, alignment: app.rive.runtime.kotlin.core.Alignment, loop: app.rive.runtime.kotlin.core.Loop): void;
					public unregisterListener(param0: any): void;
					public setArtboardName(param0: string): void;
					public getPlayingAnimations(): java.util.HashSet<app.rive.runtime.kotlin>;
					public stop(param0: string, param1: boolean): void;
					public play(loop: app.rive.runtime.kotlin.core.Loop, direction: app.rive.runtime.kotlin.core.Direction, settleInitialState: boolean): void;
					public setNumberState(param0: string, param1: string, param2: number): void;
					public play(animationName: string, loop: app.rive.runtime.kotlin.core.Loop, direction: app.rive.runtime.kotlin.core.Direction, isStateMachine: boolean, settleInitialState: boolean): void;
					public onAttachedToWindow(): void;
					public constructor(param0: globalAndroid.content.Context, param1?: globalAndroid.util.AttributeSet);
					public onSurfaceTextureAvailable(param0: globalAndroid.graphics.SurfaceTexture, param1: number, param2: number): void;
					public unregisterListener(param0: app.rive.runtime.kotlin): void;
					public pause(): void;
					public isPlaying(): boolean;
					public play(animationNames: java.util.List<string>, loop: app.rive.runtime.kotlin.core.Loop, direction: app.rive.runtime.kotlin.core.Direction, areStateMachines: boolean, settleInitialState: boolean): void;
					public pause(param0: string, param1: boolean): void;
					public getAutoplay(): boolean;
					public onDetachedFromWindow(): void;
					public onMeasure(param0: number, param1: number): void;
					public registerListener(param0: app.rive.runtime.kotlin): void;
					public reset(): void;
					public getPlayingStateMachines(): java.util.HashSet<app.rive.runtime.kotlin>;
					public getRenderer(): app.rive.runtime.kotlin;
					public stop(param0: java.util.List<string>, param1: boolean): void;
					public setAlignment(param0: app.rive.runtime.kotlin): void;
					public getArtboardName(): string;
					public fireState(param0: string, param1: string): void;
					public makeRenderer(): app.rive.runtime.kotlin;
					public getRenderer(): app.rive.runtime.kotlin;
					public stop(): void;
					public setAutoplay(param0: boolean): void;
					public onTouchEvent(param0: globalAndroid.view.MotionEvent): boolean;
					public getAlignment(): app.rive.runtime.kotlin;
					public pause(animationNames: java.util.List<string>, areStateMachines: boolean): void;
					public getDefaultAutoplay(): boolean;
					public registerListener(param0: any): void;
					public getAnimations(): java.util.List<app.rive.runtime.kotlin>;
					public onSurfaceTextureSizeChanged(param0: globalAndroid.graphics.SurfaceTexture, param1: number, param2: number): void;
					public getFile(): app.rive.runtime.kotlin;
				}
				export module RiveAnimationView {
					export class Companion {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
					}
					export class RendererAttrs {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public getLoopIndex(): number;
						public hashCode(): number;
						public equals(param0: any): boolean;
						public constructor(param0: number, param1: number, param2: number, param3: boolean, param4: boolean, param5: string, param6: string, param7: string, param8: number, param9: string);
						public getAnimationName(): string;
						public getAutoplay(): boolean;
						public component2(): number;
						public component9(): number;
						public getStateMachineName(): string;
						public copy(param0: number, param1: number, param2: number, param3: boolean, param4: boolean, param5: string, param6: string, param7: string, param8: number, param9: string): app.rive.runtime.kotlin;
						public getFit(): app.rive.runtime.kotlin;
						public component10(): string;
						public getRiveTraceAnimations(): boolean;
						public component1(): number;
						public component8(): string;
						public component4(): boolean;
						public component5(): boolean;
						public getArtboardName(): string;
						public component7(): string;
						public getUrl(): string;
						public getResourceId(): number;
						public toString(): string;
						public getAlignment(): app.rive.runtime.kotlin;
						public getFitIndex(): number;
						public getLoop(): app.rive.runtime.kotlin;
						public getAlignmentIndex(): number;
						public component6(): string;
						public component3(): number;
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export class RiveArtboardRenderer extends app.rive.runtime.kotlin implements app.rive.runtime.kotlin  {
					public static class: java.lang.Class<app.rive.runtime.kotlin>;
					public setFit(param0: app.rive.runtime.kotlin): void;
					public getStateMachines(): java.util.List<app.rive.runtime.kotlin>;
					public setLoop(param0: app.rive.runtime.kotlin): void;
					public getFit(): app.rive.runtime.kotlin;
					public setArtboardName(param0: string): void;
					public play(param0: app.rive.runtime.kotlin, param1: app.rive.runtime.kotlin, param2: boolean): void;
					public setNumberState(param0: string, param1: string, param2: number): void;
					public getLoop(): app.rive.runtime.kotlin;
					public constructor();
					public pause(): void;
					public stopAnimations(): void;
					public getAutoplay(): boolean;
					public registerListener(param0: app.rive.runtime.kotlin): void;
					public setAlignment(param0: app.rive.runtime.kotlin): void;
					public stopAnimations(param0: java.util.List<string>, param1: boolean): void;
					public getAnimationName(): string;
					public artboardBounds(): globalAndroid.graphics.RectF;
					public setAnimationName(param0: string): void;
					public setAutoplay(param0: boolean): void;
					public setRiveFile(param0: app.rive.runtime.kotlin): void;
					public pause(param0: java.util.List<string>, param1: boolean): void;
					public stopAnimations(param0: string, param1: boolean): void;
					public getStateMachineName(): string;
					public getAnimations(): java.util.List<app.rive.runtime.kotlin>;
					public getFile(): app.rive.runtime.kotlin;
					public setBooleanState(param0: string, param1: string, param2: boolean): void;
					public setTargetBounds(param0: globalAndroid.graphics.RectF): void;
					public unregisterListener(param0: any): void;
					public getPlayingAnimations(): java.util.HashSet<app.rive.runtime.kotlin>;
					public play(param0: string, param1: app.rive.runtime.kotlin, param2: app.rive.runtime.kotlin, param3: boolean, param4: boolean): void;
					public constructor(param0: app.rive.runtime.kotlin, param1: app.rive.runtime.kotlin, param2: app.rive.runtime.kotlin, param3: string, param4: string, param5: string, param6: boolean, param7: boolean);
					public unregisterListener(param0: app.rive.runtime.kotlin): void;
					public play(param0: java.util.List<string>, param1: app.rive.runtime.kotlin, param2: app.rive.runtime.kotlin, param3: boolean, param4: boolean): void;
					public clear(): void;
					public pause(param0: string, param1: boolean): void;
					public draw(): void;
					public getTargetBounds(): globalAndroid.graphics.RectF;
					public constructor(param0: number);
					public reset(): void;
					public advance(param0: number): void;
					public getPlayingStateMachines(): java.util.HashSet<app.rive.runtime.kotlin>;
					public getArtboardName(): string;
					public fireState(param0: string, param1: string): void;
					public setArtboardByName(param0: string): void;
					public constructor(param0: boolean);
					public setStateMachineName(param0: string): void;
					public pointerEvent(param0: app.rive.runtime.kotlin, param1: number, param2: number): void;
					public getAlignment(): app.rive.runtime.kotlin;
					public getActiveArtboard(): app.rive.runtime.kotlin;
					public registerListener(param0: any): void;
				}
				export module RiveArtboardRenderer {
					export class Listener {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						/**
						 * Constructs a new instance of the app.rive.runtime.kotlin$Listener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							notifyPlay(param0: app.rive.runtime.kotlin): void;
							notifyPause(param0: app.rive.runtime.kotlin): void;
							notifyStop(param0: app.rive.runtime.kotlin): void;
							notifyLoop(param0: app.rive.runtime.kotlin): void;
							notifyStateChanged(param0: string, param1: string): void;
						});
						public constructor();
						public notifyLoop(param0: app.rive.runtime.kotlin): void;
						public notifyStop(param0: app.rive.runtime.kotlin): void;
						public notifyPause(param0: app.rive.runtime.kotlin): void;
						public notifyPlay(param0: app.rive.runtime.kotlin): void;
						public notifyStateChanged(param0: string, param1: string): void;
					}
					export class WhenMappings {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export class RiveFileRequest extends com.android.volley.Request<app.rive.runtime.kotlin> {
					public static class: java.lang.Class<app.rive.runtime.kotlin>;
					public constructor(param0: string, param1: com.android.volley.Response.Listener<app.rive.runtime.kotlin>, param2: com.android.volley.Response.ErrorListener);
					public parseNetworkResponse(param0: com.android.volley.NetworkResponse): com.android.volley.Response<app.rive.runtime.kotlin>;
					public deliverResponse(param0: app.rive.runtime.kotlin): void;
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export class RiveInitializer extends androidx.startup.Initializer<any> {
					public static class: java.lang.Class<app.rive.runtime.kotlin>;
					public create(param0: globalAndroid.content.Context): void;
					public constructor();
					public dependencies(): java.util.List<java.lang.Class<any>>;
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export abstract class RiveTextureView {
					public static class: java.lang.Class<app.rive.runtime.kotlin>;
					public static TAG: string;
					public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
					public onSurfaceTextureAvailable(param0: globalAndroid.graphics.SurfaceTexture, param1: number, param2: number): void;
					public onDetachedFromWindow(): void;
					public getRenderer(): app.rive.runtime.kotlin;
					public onSurfaceTextureUpdated(param0: globalAndroid.graphics.SurfaceTexture): void;
					public onSurfaceTextureDestroyed(param0: globalAndroid.graphics.SurfaceTexture): boolean;
					public onAttachedToWindow(): void;
					public onVisibilityChanged(param0: globalAndroid.view.View, param1: number): void;
					public getActivity(): globalAndroid.app.Activity;
					public onSurfaceTextureSizeChanged(param0: globalAndroid.graphics.SurfaceTexture, param1: number, param2: number): void;
				}
				export module RiveTextureView {
					export class Companion {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module controllers {
					export class LinearAnimationController extends app.rive.runtime.kotlin {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public initialize(param0: any): boolean;
						public constructor();
						public initialize(param0: app.rive.runtime.kotlin): boolean;
						public constructor(param0: string, param1: boolean, param2: number);
						public setAnimationInstance(param0: app.rive.runtime.kotlin): void;
						public apply(param0: number): void;
						public getAnimationInstance(): app.rive.runtime.kotlin;
						public getMix(): number;
						public setMix(param0: number): void;
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module controllers {
					export abstract class RiveController<T>  extends java.lang.Object {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public constructor();
						public initialize(param0: T): boolean;
						public onActivate(): void;
						public setActive(param0: boolean): void;
						public apply(param0: number): void;
						public onDeactivate(): void;
						public isActive(): boolean;
						public dispose(): void;
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export class Alignment {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public static TOP_LEFT: app.rive.runtime.kotlin;
						public static TOP_CENTER: app.rive.runtime.kotlin;
						public static TOP_RIGHT: app.rive.runtime.kotlin;
						public static CENTER_LEFT: app.rive.runtime.kotlin;
						public static CENTER: app.rive.runtime.kotlin;
						public static CENTER_RIGHT: app.rive.runtime.kotlin;
						public static BOTTOM_LEFT: app.rive.runtime.kotlin;
						public static BOTTOM_CENTER: app.rive.runtime.kotlin;
						public static BOTTOM_RIGHT: app.rive.runtime.kotlin;
						public static values(): androidNative.Array<app.rive.runtime.kotlin>;
						public static valueOf(param0: string): app.rive.runtime.kotlin;
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export class AnimationState extends app.rive.runtime.kotlin {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public constructor(param0: number);
						public getName(): string;
						public toString(): string;
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export class AnyState extends app.rive.runtime.kotlin {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public constructor(param0: number);
						public toString(): string;
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export class Artboard extends app.rive.runtime.kotlin {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public animation(param0: number): app.rive.runtime.kotlin;
						public animation(param0: string): app.rive.runtime.kotlin;
						public drawSkia(param0: number): void;
						public getAnimationNames(): java.util.List<string>;
						public getStateMachineNames(): java.util.List<string>;
						public stateMachine(param0: string): app.rive.runtime.kotlin;
						public advance(param0: number): boolean;
						public stateMachine(param0: number): app.rive.runtime.kotlin;
						public getName(): string;
						public getFirstStateMachine(): app.rive.runtime.kotlin;
						public cppDelete(param0: number): void;
						public getFirstAnimation(): app.rive.runtime.kotlin;
						public constructor(param0: number);
						public getAnimationCount(): number;
						public getStateMachineCount(): number;
						public drawSkia(param0: number, param1: app.rive.runtime.kotlin, param2: app.rive.runtime.kotlin): void;
						public getBounds(): globalAndroid.graphics.RectF;
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export class BlendState extends app.rive.runtime.kotlin {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public constructor(param0: number);
						public toString(): string;
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export class Decoder {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public constructor();
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export class Direction {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public static BACKWARDS: app.rive.runtime.kotlin;
						public static FORWARDS: app.rive.runtime.kotlin;
						public static AUTO: app.rive.runtime.kotlin;
						public static valueOf(param0: string): app.rive.runtime.kotlin;
						public static values(): androidNative.Array<app.rive.runtime.kotlin>;
						public getValue(): number;
					}
					export module Direction {
						export class Companion {
							public static class: java.lang.Class<app.rive.runtime.kotlin>;
							public fromInt(param0: number): app.rive.runtime.kotlin;
						}
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export class EntryState extends app.rive.runtime.kotlin {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public constructor(param0: number);
						public toString(): string;
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export class ExitState extends app.rive.runtime.kotlin {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public constructor(param0: number);
						public toString(): string;
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export class File extends app.rive.runtime.kotlin {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public getArtboardCount(): number;
						public constructor(param0: androidNative.Array<number>);
						public getArtboardNames(): java.util.List<string>;
						public artboard(param0: number): app.rive.runtime.kotlin;
						public cppDelete(param0: number): void;
						public constructor(param0: number);
						public getFirstArtboard(): app.rive.runtime.kotlin;
						public artboard(param0: string): app.rive.runtime.kotlin;
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export class Fit {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public static FILL: app.rive.runtime.kotlin;
						public static CONTAIN: app.rive.runtime.kotlin;
						public static COVER: app.rive.runtime.kotlin;
						public static FIT_WIDTH: app.rive.runtime.kotlin;
						public static FIT_HEIGHT: app.rive.runtime.kotlin;
						public static NONE: app.rive.runtime.kotlin;
						public static SCALE_DOWN: app.rive.runtime.kotlin;
						public static valueOf(param0: string): app.rive.runtime.kotlin;
						public static values(): androidNative.Array<app.rive.runtime.kotlin>;
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export class Helpers {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public static INSTANCE: app.rive.runtime.kotlin;
						public convertToArtboardSpace(param0: globalAndroid.graphics.RectF, param1: globalAndroid.graphics.PointF, param2: app.rive.runtime.kotlin, param3: app.rive.runtime.kotlin, param4: globalAndroid.graphics.RectF): globalAndroid.graphics.PointF;
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export class LayerState extends app.rive.runtime.kotlin {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public isExitState(): boolean;
						public isAnimationState(): boolean;
						public constructor(param0: number);
						public isBlendState(): boolean;
						public isEntryState(): boolean;
						public isBlendStateDirect(): boolean;
						public isAnyState(): boolean;
						public isBlendState1D(): boolean;
						public toString(): string;
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export class LinearAnimationInstance extends app.rive.runtime.kotlin implements app.rive.runtime.kotlin {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public time(param0: number): void;
						public getDuration(): number;
						public apply(param0: number): boolean;
						public getDirection(): app.rive.runtime.kotlin;
						public getWorkStart(): number;
						public getTime(): number;
						public getName(): string;
						public getWorkEnd(): number;
						public getStartTime(): number;
						public getEndTime(): number;
						public apply(): void;
						public getLoop(): app.rive.runtime.kotlin;
						public cppDelete(param0: number): void;
						public constructor(param0: number);
						public getEffectiveDurationInSeconds(): number;
						public advance(param0: number): app.rive.runtime.kotlin;
						public setLoop(param0: app.rive.runtime.kotlin): void;
						public setDirection(param0: app.rive.runtime.kotlin): void;
						public getEffectiveDuration(): number;
						public constructor(param0: number, param1: number);
						public getFps(): number;
						public getMix(): number;
						public setMix(param0: number): void;
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export class Loop {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public static ONESHOT: app.rive.runtime.kotlin;
						public static LOOP: app.rive.runtime.kotlin;
						public static PINGPONG: app.rive.runtime.kotlin;
						public static AUTO: app.rive.runtime.kotlin;
						public static valueOf(param0: string): app.rive.runtime.kotlin;
						public getValue(): number;
						public static values(): androidNative.Array<app.rive.runtime.kotlin>;
					}
					export module Loop {
						export class Companion {
							public static class: java.lang.Class<app.rive.runtime.kotlin>;
							public fromInt(param0: number): app.rive.runtime.kotlin;
						}
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export abstract class NativeObject {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public static NULL_POINTER: number;
						public cppDelete(param0: number): void;
						public constructor(param0: number);
						public getHasCppObject(): boolean;
						public getCppPointer(): number;
						public getDependencies(): java.util.List<app.rive.runtime.kotlin>;
						public setCppPointer(param0: number): void;
						public dispose(): void;
					}
					export module NativeObject {
						export class Companion {
							public static class: java.lang.Class<app.rive.runtime.kotlin>;
						}
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export class PlayableInstance {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						/**
						 * Constructs a new instance of the app.rive.runtime.kotlin interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							getName(): string;
						});
						public constructor();
						public getName(): string;
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export class Rive {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public static INSTANCE: app.rive.runtime.kotlin;
						public initializeCppEnvironment(): void;
						public init(param0: globalAndroid.content.Context): void;
						public calculateRequiredBounds(param0: app.rive.runtime.kotlin, param1: app.rive.runtime.kotlin, param2: globalAndroid.graphics.RectF, param3: globalAndroid.graphics.RectF): globalAndroid.graphics.RectF;
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export class SMIBoolean extends app.rive.runtime.kotlin {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public setValue(param0: boolean): void;
						public constructor(param0: number);
						public getValue(): boolean;
						public toString(): string;
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export class SMIInput extends app.rive.runtime.kotlin {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public isTrigger(): boolean;
						public constructor(param0: number);
						public isBoolean(): boolean;
						public isNumber(): boolean;
						public getName(): string;
						public toString(): string;
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export class SMINumber extends app.rive.runtime.kotlin {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public constructor(param0: number);
						public setValue(param0: number): void;
						public toString(): string;
						public getValue(): number;
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export class SMITrigger extends app.rive.runtime.kotlin {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public constructor(param0: number);
						public fire(): void;
						public toString(): string;
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export class StateMachineInstance extends app.rive.runtime.kotlin implements app.rive.runtime.kotlin {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public pointerUp(param0: number, param1: number): void;
						public getInputCount(): number;
						public input(param0: string): app.rive.runtime.kotlin;
						public pointerMove(param0: number, param1: number): void;
						public getInputNames(): java.util.List<string>;
						public advance(param0: number): boolean;
						public getName(): string;
						public getLayerCount(): number;
						public getStatesChanged(): java.util.List<app.rive.runtime.kotlin>;
						public stateChanged(param0: number): app.rive.runtime.kotlin;
						public cppDelete(param0: number): void;
						public constructor(param0: number);
						public getInputs(): java.util.List<app.rive.runtime.kotlin>;
						public pointerDown(param0: number, param1: number): void;
						public input(param0: number): app.rive.runtime.kotlin;
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export module errors {
						export class AnimationException extends app.rive.runtime.kotlin {
							public static class: java.lang.Class<app.rive.runtime.kotlin>;
							public constructor(param0: string);
						}
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export module errors {
						export class ArtboardException extends app.rive.runtime.kotlin {
							public static class: java.lang.Class<app.rive.runtime.kotlin>;
							public constructor(param0: string);
						}
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export module errors {
						export class MalformedFileException extends app.rive.runtime.kotlin {
							public static class: java.lang.Class<app.rive.runtime.kotlin>;
							public constructor(param0: string);
						}
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export module errors {
						export class RiveException {
							public static class: java.lang.Class<app.rive.runtime.kotlin>;
							public constructor(param0: string);
						}
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export module errors {
						export class StateMachineException extends app.rive.runtime.kotlin {
							public static class: java.lang.Class<app.rive.runtime.kotlin>;
							public constructor(param0: string);
						}
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export module errors {
						export class StateMachineInputException extends app.rive.runtime.kotlin {
							public static class: java.lang.Class<app.rive.runtime.kotlin>;
							public constructor(param0: string);
						}
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module core {
					export module errors {
						export class UnsupportedRuntimeVersionException extends app.rive.runtime.kotlin {
							public static class: java.lang.Class<app.rive.runtime.kotlin>;
							public constructor(param0: string);
						}
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module renderers {
					export class RendererMetrics {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public static SAMPLES: number;
						public constructor(param0: globalAndroid.app.Activity);
						public onFrameMetricsAvailable(param0: globalAndroid.view.Window, param1: globalAndroid.view.FrameMetrics, param2: number): void;
					}
					export module RendererMetrics {
						export class Companion {
							public static class: java.lang.Class<app.rive.runtime.kotlin>;
						}
					}
				}
			}
		}
	}
}

declare module app {
	export module rive {
		export module runtime {
			export module kotlin {
				export module renderers {
					export abstract class RendererSkia extends app.rive.runtime.kotlin {
						public static class: java.lang.Class<app.rive.runtime.kotlin>;
						public scheduleFrame(): void;
						public restore(): void;
						public constructor();
						public delete(): void;
						public isPlaying(): boolean;
						public disposeDependencies(): void;
						public getHeight(): number;
						public setSurface(param0: globalAndroid.view.Surface): void;
						public stop(): void;
						public advance(param0: number): void;
						public doFrame(param0: number): void;
						public getWidth(): number;
						public make(): void;
						public start(): void;
						public getAverageFps(): number;
						public cppDelete(param0: number): void;
						public constructor(param0: number);
						public stopThread$any_release(): void;
						public constructor(param0: boolean);
						public save(): void;
						public draw(): void;
						public align(param0: app.rive.runtime.kotlin, param1: app.rive.runtime.kotlin, param2: globalAndroid.graphics.RectF, param3: globalAndroid.graphics.RectF): void;
					}
				}
			}
		}
	}
}

//Generics information:
//app.rive.runtime.kotlin.Observable:1
//app.rive.runtime.kotlin.controllers.RiveController:1

