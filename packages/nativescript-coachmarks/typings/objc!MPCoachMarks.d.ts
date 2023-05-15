
declare const enum ContinueLocation {

	LOCATION_TOP = 0,

	LOCATION_CENTER = 1,

	LOCATION_BOTTOM = 2
}

declare const enum LabelAligment {

	ABEL_ALIGNMENT_CENTER = 0,

	ABEL_ALIGNMENT_LEFT = 1,

	ABEL_ALIGNMENT_RIGHT = 2
}

declare const enum LabelPosition {

	ABEL_POSITION_BOTTOM = 0,

	ABEL_POSITION_LEFT = 1,

	ABEL_POSITION_TOP = 2,

	ABEL_POSITION_RIGHT = 3,

	ABEL_POSITION_RIGHT_BOTTOM = 4
}

declare class MPCoachMarks extends UIView {

	static alloc(): MPCoachMarks; // inherited from NSObject

	static appearance(): MPCoachMarks; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MPCoachMarks; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MPCoachMarks; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MPCoachMarks; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MPCoachMarks; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MPCoachMarks; // inherited from UIAppearance

	static new(): MPCoachMarks; // inherited from NSObject

	animationDuration: number;

	arrowImage: UIImageView;

	btnSkipCoach: UIButton;

	coachMarks: NSArray<any>;

	continueLabelText: string;

	continueLocation: ContinueLocation;

	cutoutRadius: number;

	delegate: MPCoachMarksViewDelegate;

	enableContinueLabel: boolean;

	enableSkipButton: boolean;

	lblCaption: UILabel;

	lblContinue: UILabel;

	lblSpacing: number;

	maskColor: UIColor;

	maxLblWidth: number;

	skipButtonText: string;

	constructor(o: { frame: CGRect; coachMarks: NSArray<any> | any[]; });

	end(): void;

	initWithFrameCoachMarks(frame: CGRect, marks: NSArray<any> | any[]): this;

	start(): void;
}

declare var MPCoachMarksVersionNumber: number;

declare var MPCoachMarksVersionString: interop.Reference<number>;

interface MPCoachMarksViewDelegate extends NSObjectProtocol {

	coachMarksViewDidCleanup?(coachMarksView: MPCoachMarks): void;

	coachMarksViewDidClickedAtIndex?(coachMarksView: MPCoachMarks, index: number): void;

	coachMarksViewDidNavigateToIndex?(coachMarksView: MPCoachMarks, index: number): void;

	coachMarksViewSkipButtonClicked?(coachMarksView: MPCoachMarks): void;

	coachMarksViewWillCleanup?(coachMarksView: MPCoachMarks): void;

	coachMarksViewWillNavigateToIndex?(coachMarksView: MPCoachMarks, index: number): void;
}
declare var MPCoachMarksViewDelegate: {

	prototype: MPCoachMarksViewDelegate;
};

declare const enum MaskShape {

	DEFAULT = 0,

	SHAPE_CIRCLE = 1,

	SHAPE_SQUARE = 2
}
