
interface SLBridgeInterface extends NSObjectProtocol {

	frameworkInfo: SLFrameworkInfo;

	obtainFrameworkInfoWithCompletion(completion: (p1: SLFrameworkInfo) => void): void;

	obtainWireframeDataWithIdentifierCompletion(identifier: any, completion: (p1: SLBridgeWireframe) => void): void;

	obtainWireframeRootClassesWithCompletion(completion: (p1: NSArray<string>) => void): void;
}
declare var SLBridgeInterface: {

	prototype: SLBridgeInterface;
};

declare class SLBridgeWireframe extends NSObject {

	static alloc(): SLBridgeWireframe; // inherited from NSObject

	static new(): SLBridgeWireframe; // inherited from NSObject

	height: number;

	root: SLBridgeWireframeView;

	width: number;
}

declare class SLBridgeWireframeSkeleton extends NSObject {

	static alloc(): SLBridgeWireframeSkeleton; // inherited from NSObject

	static new(): SLBridgeWireframeSkeleton; // inherited from NSObject

	alpha: number;

	color: string;

	flags: SLBridgeWireframeSkeletonFlags;

	radius: number;

	rect: CGRect;

	type: SLSkeletonType;

	constructor(o: { rect: CGRect; color: string; });

	initWithRectColor(rect: CGRect, color: string): this;
}

declare class SLBridgeWireframeSkeletonFlags extends NSObject {

	static alloc(): SLBridgeWireframeSkeletonFlags; // inherited from NSObject

	static new(): SLBridgeWireframeSkeletonFlags; // inherited from NSObject

	shadow: SLSkeletonFlagShadow;
}

declare class SLBridgeWireframeView extends NSObject {

	static alloc(): SLBridgeWireframeView; // inherited from NSObject

	static new(): SLBridgeWireframeView; // inherited from NSObject

	alpha: number;

	foregroundSkeletons: NSArray<SLBridgeWireframeSkeleton>;

	identifier: string;

	isFocused: boolean;

	isSensitive: boolean;

	name: string;

	offset: CGPoint;

	rect: CGRect;

	skeletons: NSArray<SLBridgeWireframeSkeleton>;

	subviews: NSArray<SLBridgeWireframeView>;

	type: SLSubviewType;

	typeName: string;

	constructor(o: { id: string; typeName: string; rect: CGRect; });

	initWithIdTypeNameRect(id: string, typeName: string, rect: CGRect): this;
}

declare class SLFrameworkInfo extends NSObject {

	static alloc(): SLFrameworkInfo; // inherited from NSObject

	static new(): SLFrameworkInfo; // inherited from NSObject

	framework: string;

	frameworkPluginVersion: string;

	frameworkVersion: string;
}

declare const enum SLSkeletonFlagShadow {

	None = 0,

	Light = 1,

	Dark = 2
}

declare const enum SLSkeletonType {

	Undefined = 0,

	Text = 1
}

declare const enum SLSubviewType {

	Undefined = 0,

	Text = 1,

	Image = 2,

	Area = 3,

	Dimming = 4,

	VisualEffect = 5,

	WebView = 6,

	Map = 7,

	TabBar = 8,

	Popover = 9,

	DatePicker = 10,

	TimePicker = 11,

	Progress = 12,

	SpinningWheel = 13,

	Video = 14,

	Surface = 15,

	Button = 16,

	Spinner = 17,

	Ad = 18,

	Chip = 19
}
