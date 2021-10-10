
declare class MarqueeLabel extends UILabel implements CAAnimationDelegate {

	static alloc(): MarqueeLabel; // inherited from NSObject

	static appearance(): MarqueeLabel; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MarqueeLabel; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MarqueeLabel; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MarqueeLabel; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MarqueeLabel; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MarqueeLabel; // inherited from UIAppearance

	static layerClass(): typeof NSObject;

	static new(): MarqueeLabel; // inherited from NSObject

	animationDelay: number;

	fadeLength: number;

	forceScrolling: boolean;

	holdScrolling: boolean;

	labelize: boolean;

	leadingBuffer: number;

	scrollDuration: number;

	scrollRate: number;

	tapToScroll: boolean;

	trailingBuffer: number;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	animateForController(notification: NSNotification): void;

	animationDidStart(anim: CAAnimation): void;

	animationDidStopFinished(anim: CAAnimation, flag: boolean): void;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	labelWasTapped(recognizer: UIGestureRecognizer): void;

	labelizeForController(notification: NSNotification): void;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	restartForViewController(notification: NSNotification): void;

	restartLabel(): void;

	retainCount(): number;

	self(): this;

	shutdownLabel(): void;
}

declare var MarqueeLabelVersionNumber: number;

declare var MarqueeLabelVersionString: interop.Reference<number>;
