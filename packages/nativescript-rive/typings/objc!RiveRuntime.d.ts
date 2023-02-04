
declare const enum Alignment {

	alignmentTopLeft = 0,

	alignmentTopCenter = 1,

	alignmentTopRight = 2,

	alignmentCenterLeft = 3,

	alignmentCenter = 4,

	alignmentCenterRight = 5,

	alignmentBottomLeft = 6,

	alignmentBottomCenter = 7,

	alignmentBottomRight = 8
}

declare const enum Direction {

	directionBackwards = 0,

	directionForwards = 1,

	directionAuto = 2
}

declare const enum Fit {

	fitFill = 0,

	fitContain = 1,

	fitCover = 2,

	fitFitHeight = 3,

	fitFitWidth = 4,

	fitScaleDown = 5,

	fitNone = 6
}

declare const enum Loop {

	loopOneShot = 0,

	loopLoop = 1,

	loopPingPong = 2,

	loopAuto = 3
}

interface RArtboardDelegate {

	artboardDidTriggerEvent(artboard: RiveArtboard, event: string): void;
}
declare var RArtboardDelegate: {

	prototype: RArtboardDelegate;
};

declare class RiveAnimationState extends RiveLayerState {

	static alloc(): RiveAnimationState; // inherited from NSObject

	static new(): RiveAnimationState; // inherited from NSObject
}

declare class RiveAnyState extends RiveLayerState {

	static alloc(): RiveAnyState; // inherited from NSObject

	static new(): RiveAnyState; // inherited from NSObject
}

declare class RiveArtboard extends NSObject {

	static alloc(): RiveArtboard; // inherited from NSObject

	static new(): RiveArtboard; // inherited from NSObject

	advanceBy(elapsedSeconds: number): void;

	animationCount(): number;

	animationFromIndexError(index: number): RiveLinearAnimation;

	animationFromNameError(name: string): RiveLinearAnimation;

	animationNames(): NSArray<string>;

	bounds(): CGRect;

	draw(renderer: RiveRenderer): void;

	firstAnimation(): RiveLinearAnimation;

	firstStateMachine(): RiveStateMachine;

	name(): string;

	stateMachineCount(): number;

	stateMachineFromIndexError(index: number): RiveStateMachine;

	stateMachineFromNameError(name: string): RiveStateMachine;

	stateMachineNames(): NSArray<string>;

	touchedAtInfo(location: CGPoint, hitInfo: number): void;
}

declare class RiveEntryState extends RiveLayerState {

	static alloc(): RiveEntryState; // inherited from NSObject

	static new(): RiveEntryState; // inherited from NSObject
}

declare const enum RiveErrorCode {

	NoArtboardsFound = 100,

	NoArtboardFound = 101,

	NoAnimations = 200,

	NoAnimationFound = 201,

	NoStateMachines = 300,

	NoStateMachineFound = 301,

	NoStateMachineInputFound = 400,

	UnknownStateMachineInput = 401,

	NoStateChangeFound = 402,

	UnsupportedVersion = 500,

	MalformedFile = 600,

	UnknownError = 700
}

declare var RiveErrorDomain: string;

declare class RiveExitState extends RiveLayerState {

	static alloc(): RiveExitState; // inherited from NSObject

	static new(): RiveExitState; // inherited from NSObject
}

declare class RiveFile extends NSObject {

	static alloc(): RiveFile; // inherited from NSObject

	static new(): RiveFile; // inherited from NSObject

	delegate: any;

	isLoaded: boolean;

	static readonly majorVersion: number;

	static readonly minorVersion: number;

	constructor(o: { byteArray: NSArray<any> | any[]; });

	constructor(o: { bytes: string | interop.Pointer | interop.Reference<any>; byteLength: number; });

	constructor(o: { httpUrl: string; withDelegate: RiveFileDelegate; });

	constructor(o: { resource: string; });

	constructor(o: { resource: string; withExtension: string; });

	artboard(): RiveArtboard;

	artboardCount(): number;

	artboardFromIndexError(index: number): RiveArtboard;

	artboardFromNameError(name: string): RiveArtboard;

	artboardNames(): NSArray<string>;

	initWithByteArrayError(bytes: NSArray<any> | any[]): this;

	initWithBytesByteLengthError(bytes: string | interop.Pointer | interop.Reference<any>, length: number): this;

	initWithHttpUrlWithDelegate(url: string, delegate: RiveFileDelegate): this;

	initWithResourceError(resourceName: string): this;

	initWithResourceWithExtensionError(resourceName: string, extension: string): this;
}

interface RiveFileDelegate extends NSObjectProtocol {

	riveFileDidLoadError(riveFile: RiveFile): boolean;
}
declare var RiveFileDelegate: {

	prototype: RiveFileDelegate;
};

declare class RiveLayerState extends NSObject {

	static alloc(): RiveLayerState; // inherited from NSObject

	static new(): RiveLayerState; // inherited from NSObject

	animation(): RiveLinearAnimation;

	isAnimationState(): boolean;

	isAnyState(): boolean;

	isEntryState(): boolean;

	isExitState(): boolean;

	name(): string;
}

declare class RiveLinearAnimation extends NSObject {

	static alloc(): RiveLinearAnimation; // inherited from NSObject

	static new(): RiveLinearAnimation; // inherited from NSObject

	applyTo(time: number, artboard: RiveArtboard): void;

	duration(): number;

	effectiveDuration(): number;

	effectiveDurationInSeconds(): number;

	endTime(): number;

	fps(): number;

	instanceWithArtboard(artboard: RiveArtboard): RiveLinearAnimationInstance;

	loop(): number;

	name(): string;

	workEnd(): number;

	workStart(): number;
}

declare class RiveLinearAnimationInstance extends NSObject {

	static alloc(): RiveLinearAnimationInstance; // inherited from NSObject

	static new(): RiveLinearAnimationInstance; // inherited from NSObject

	advanceBy(elapsedSeconds: number): boolean;

	animation(): RiveLinearAnimation;

	apply(): void;

	didLoop(): boolean;

	direction(): number;

	loop(): number;

	name(): string;

	setTime(time: number): void;

	time(): number;
}

declare class RiveRenderer extends NSObject {

	static alloc(): RiveRenderer; // inherited from NSObject

	static new(): RiveRenderer; // inherited from NSObject

	constructor(o: { context: any; });

	alignWithRectWithContentRectWithAlignmentWithFit(rect: CGRect, contentRect: CGRect, alignment: Alignment, fit: Fit): void;

	initWithContext(context: any): this;
}

declare class RiveRendererView extends MTKView {

	static alloc(): RiveRendererView; // inherited from NSObject

	static appearance(): RiveRendererView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): RiveRendererView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): RiveRendererView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): RiveRendererView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): RiveRendererView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): RiveRendererView; // inherited from UIAppearance

	static new(): RiveRendererView; // inherited from NSObject

	metalDevice: MTLDevice;

	metalQueue: MTLCommandQueue;

	alignWithRectContentRectAlignmentFit(rect: CGRect, contentRect: CGRect, alignment: Alignment, fit: Fit): void;

	drawRiveSize(rect: CGRect, size: CGSize): void;

	drawWithArtboard(artboard: RiveArtboard): void;

	isPaused(): boolean;
}

declare var RiveRuntimeVersionNumber: number;

declare var RiveRuntimeVersionString: interop.Reference<number>;

declare class RiveSMIBool extends RiveSMIInput {

	static alloc(): RiveSMIBool; // inherited from NSObject

	static new(): RiveSMIBool; // inherited from NSObject

	setValue(newValue: boolean): void;

	value(): boolean;
}

declare class RiveSMIInput extends NSObject {

	static alloc(): RiveSMIInput; // inherited from NSObject

	static new(): RiveSMIInput; // inherited from NSObject

	isBoolean(): boolean;

	isNumber(): boolean;

	isTrigger(): boolean;

	name(): string;
}

declare class RiveSMINumber extends RiveSMIInput {

	static alloc(): RiveSMINumber; // inherited from NSObject

	static new(): RiveSMINumber; // inherited from NSObject

	setValue(newValue: number): void;

	value(): number;
}

declare class RiveSMITrigger extends RiveSMIInput {

	static alloc(): RiveSMITrigger; // inherited from NSObject

	static new(): RiveSMITrigger; // inherited from NSObject

	fire(): void;
}

declare class RiveStateMachine extends NSObject {

	static alloc(): RiveStateMachine; // inherited from NSObject

	static new(): RiveStateMachine; // inherited from NSObject

	inputCount(): number;

	inputFromIndexError(index: number): RiveStateMachineInput;

	inputFromNameError(name: string): RiveStateMachineInput;

	inputNames(): NSArray<string>;

	instanceWithArtboard(artboard: RiveArtboard): RiveStateMachineInstance;

	layerCount(): number;

	name(): string;
}

declare class RiveStateMachineBoolInput extends RiveStateMachineInput {

	static alloc(): RiveStateMachineBoolInput; // inherited from NSObject

	static new(): RiveStateMachineBoolInput; // inherited from NSObject

	value(): boolean;
}

declare class RiveStateMachineInput extends NSObject {

	static alloc(): RiveStateMachineInput; // inherited from NSObject

	static new(): RiveStateMachineInput; // inherited from NSObject

	isBoolean(): boolean;

	isNumber(): boolean;

	isTrigger(): boolean;

	name(): string;
}

declare class RiveStateMachineInstance extends NSObject {

	static alloc(): RiveStateMachineInstance; // inherited from NSObject

	static new(): RiveStateMachineInstance; // inherited from NSObject

	advanceBy(elapsedSeconds: number): boolean;

	getBool(name: string): RiveSMIBool;

	getNumber(name: string): RiveSMINumber;

	getTrigger(name: string): RiveSMITrigger;

	inputCount(): number;

	inputFromIndexError(index: number): RiveSMIInput;

	inputFromNameError(name: string): RiveSMIInput;

	inputNames(): NSArray<string>;

	name(): string;

	stateChangedCount(): number;

	stateChangedFromIndexError(index: number): RiveLayerState;

	stateChanges(): NSArray<string>;

	stateMachine(): RiveStateMachine;
}

declare class RiveStateMachineNumberInput extends RiveStateMachineInput {

	static alloc(): RiveStateMachineNumberInput; // inherited from NSObject

	static new(): RiveStateMachineNumberInput; // inherited from NSObject

	value(): number;
}

declare class RiveStateMachineTriggerInput extends RiveStateMachineInput {

	static alloc(): RiveStateMachineTriggerInput; // inherited from NSObject

	static new(): RiveStateMachineTriggerInput; // inherited from NSObject
}

interface RiveTouchDelegate {

	touchBeganOnArtboardAtLocation?(artboard: RiveArtboard, location: CGPoint): void;

	touchCancelledOnArtboardAtLocation?(artboard: RiveArtboard, location: CGPoint): void;

	touchEndedOnArtboardAtLocation?(artboard: RiveArtboard, location: CGPoint): void;

	touchMovedOnArtboardAtLocation?(artboard: RiveArtboard, location: CGPoint): void;
}
declare var RiveTouchDelegate: {

	prototype: RiveTouchDelegate;
};

declare class RiveUnknownState extends RiveLayerState {

	static alloc(): RiveUnknownState; // inherited from NSObject

	static new(): RiveUnknownState; // inherited from NSObject
}

declare class RiveView extends RiveRendererView implements RArtboardDelegate, RiveFileDelegate {

	static alloc(): RiveView; // inherited from NSObject

	static appearance(): RiveView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): RiveView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): RiveView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): RiveView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): RiveView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): RiveView; // inherited from UIAppearance

	static new(): RiveView; // inherited from NSObject

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	artboardDidTriggerEvent(artboard: RiveArtboard, event: string): void;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	riveFileDidLoadError(riveFile: RiveFile): boolean;

	self(): this;
}
