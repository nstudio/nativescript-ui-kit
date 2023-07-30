declare class SJFluidSegmentedControl extends UIView implements UIGestureRecognizerDelegate, UIScrollViewDelegate {
  static alloc(): SJFluidSegmentedControl; // inherited from NSObject

  static appearance(): SJFluidSegmentedControl; // inherited from UIAppearance

  static appearanceForTraitCollection(trait: UITraitCollection): SJFluidSegmentedControl; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedIn(
    trait: UITraitCollection,
    ContainerClass: typeof NSObject
  ): SJFluidSegmentedControl; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(
    trait: UITraitCollection,
    containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]
  ): SJFluidSegmentedControl; // inherited from UIAppearance

  static appearanceWhenContainedIn(ContainerClass: typeof NSObject): SJFluidSegmentedControl; // inherited from UIAppearance

  static appearanceWhenContainedInInstancesOfClasses(
    containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]
  ): SJFluidSegmentedControl; // inherited from UIAppearance

  static new(): SJFluidSegmentedControl; // inherited from NSObject

  applyCornerRadiusToSelectorView: boolean;

  cornerRadius: number;

  currentSegment: number;

  dataSource: SJFluidSegmentedControlDataSource;

  delegate: SJFluidSegmentedControlDelegate;

  gradientBounceColor: UIColor;

  selectedSegmentTextColor: UIColor;

  selectorViewColor: UIColor;

  shadowHideDuration: number;

  shadowShowDuration: number;

  shadowsEnabled: boolean;

  shapeStyle: SJFluidSegmentedControlShapeStyle;

  textColor: UIColor;

  readonly debugDescription: string; // inherited from NSObjectProtocol

  readonly description: string; // inherited from NSObjectProtocol

  readonly hash: number; // inherited from NSObjectProtocol

  readonly isProxy: boolean; // inherited from NSObjectProtocol

  readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

  readonly; // inherited from NSObjectProtocol

  changeSegmentToSegmentAtIndex(index: number): void;

  class(): typeof NSObject;

  conformsToProtocol(aProtocol: any /* Protocol */): boolean;

  gestureRecognizerShouldBeRequiredToFailByGestureRecognizer(
    gestureRecognizer: UIGestureRecognizer,
    otherGestureRecognizer: UIGestureRecognizer
  ): boolean;

  gestureRecognizerShouldBegin(gestureRecognizer: UIGestureRecognizer): boolean;

  gestureRecognizerShouldReceiveEvent(gestureRecognizer: UIGestureRecognizer, event: _UIEvent): boolean;

  gestureRecognizerShouldReceivePress(gestureRecognizer: UIGestureRecognizer, press: UIPress): boolean;

  gestureRecognizerShouldReceiveTouch(gestureRecognizer: UIGestureRecognizer, touch: UITouch): boolean;

  gestureRecognizerShouldRecognizeSimultaneouslyWithGestureRecognizer(
    gestureRecognizer: UIGestureRecognizer,
    otherGestureRecognizer: UIGestureRecognizer
  ): boolean;

  gestureRecognizerShouldRequireFailureOfGestureRecognizer(
    gestureRecognizer: UIGestureRecognizer,
    otherGestureRecognizer: UIGestureRecognizer
  ): boolean;

  isEqual(object: any): boolean;

  isKindOfClass(aClass: typeof NSObject): boolean;

  isMemberOfClass(aClass: typeof NSObject): boolean;

  performSelector(aSelector: string): any;

  performSelectorWithObject(aSelector: string, object: any): any;

  performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

  reloadData(): void;

  respondsToSelector(aSelector: string): boolean;

  retainCount(): number;

  scrollViewDidChangeAdjustedContentInset(scrollView: UIScrollView): void;

  scrollViewDidEndDecelerating(scrollView: UIScrollView): void;

  scrollViewDidEndDraggingWillDecelerate(scrollView: UIScrollView, decelerate: boolean): void;

  scrollViewDidEndScrollingAnimation(scrollView: UIScrollView): void;

  scrollViewDidEndZoomingWithViewAtScale(scrollView: UIScrollView, view: UIView, scale: number): void;

  scrollViewDidScroll(scrollView: UIScrollView): void;

  scrollViewDidScrollToTop(scrollView: UIScrollView): void;

  scrollViewDidZoom(scrollView: UIScrollView): void;

  scrollViewShouldScrollToTop(scrollView: UIScrollView): boolean;

  scrollViewWillBeginDecelerating(scrollView: UIScrollView): void;

  scrollViewWillBeginDragging(scrollView: UIScrollView): void;

  scrollViewWillBeginZoomingWithView(scrollView: UIScrollView, view: UIView): void;

  scrollViewWillEndDraggingWithVelocityTargetContentOffset(
    scrollView: UIScrollView,
    velocity: CGPoint,
    targetContentOffset: interop.Pointer | interop.Reference<CGPoint>
  ): void;

  self(): this;

  setCurrentSegmentIndexAnimated(index: number, shouldAnimate: boolean): void;

  setupShadowForSegmentAtIndexVisibleAnimated(index: number, isVisible: boolean, shouldAnimate: boolean): void;

  shadowColorForSegmentAtIndex(index: number): UIColor;

  viewForZoomingInScrollView(scrollView: UIScrollView): UIView;
}

declare const enum SJFluidSegmentedControlBounce {
  Left = 0,

  Right = 1,
}

interface SJFluidSegmentedControlDataSource {
  numberOfSegmentsInSegmentedControl(segmentedControl: SJFluidSegmentedControl): number;

  segmentedControlAttributedTitleForSegmentAtIndex?(
    segmentedControl: SJFluidSegmentedControl,
    index: number
  ): NSAttributedString;

  segmentedControlAttributedTitleForSelectedSegmentAtIndex?(
    segmentedControl: SJFluidSegmentedControl,
    index: number
  ): NSAttributedString;

  segmentedControlGradientColorsForBounce?(
    segmentedControl: SJFluidSegmentedControl,
    bounce: SJFluidSegmentedControlBounce
  ): NSArray<UIColor>;

  segmentedControlGradientColorsForSelectedSegmentAtIndex?(
    segmentedControl: SJFluidSegmentedControl,
    index: number
  ): NSArray<UIColor>;

  segmentedControlTitleColorForSelectedSegmentAtIndex?(
    segmentedControl: SJFluidSegmentedControl,
    index: number
  ): UIColor;

  segmentedControlTitleForSegmentAtIndex?(segmentedControl: SJFluidSegmentedControl, index: number): string;

  segmentedControlTitleForSelectedSegmentAtIndex?(segmentedControl: SJFluidSegmentedControl, index: number): string;

  segmentedControlViewForSegmentAtIndex?(segmentedControl: SJFluidSegmentedControl, index: number): UIView;

  segmentedControlViewForSelectedSegmentAtIndex?(segmentedControl: SJFluidSegmentedControl, index: number): UIView;
}
declare var SJFluidSegmentedControlDataSource: {
  prototype: SJFluidSegmentedControlDataSource;
};

interface SJFluidSegmentedControlDelegate {
  segmentedControlDidChangeFromSegmentAtIndexToSegmentAtIndex?(
    segmentedControl: SJFluidSegmentedControl,
    fromIndex: number,
    toIndex: number
  ): void;

  segmentedControlDidScrollWithXOffset?(segmentedControl: SJFluidSegmentedControl, offset: number): void;

  segmentedControlResetSegmentAtIndexUnselectedViewSelectedView?(
    segmentedControl: SJFluidSegmentedControl,
    segmentIndex: number,
    unselectedSegmentView: UIView,
    selectedSegmentView: UIView
  ): void;

  segmentedControlSetupSegmentAtIndexUnselectedViewSelectedViewWithSelectionPercent?(
    segmentedControl: SJFluidSegmentedControl,
    segmentIndex: number,
    unselectedSegmentView: UIView,
    selectedSegmentView: UIView,
    percent: number
  ): void;

  segmentedControlWillChangeFromSegment?(segmentedControl: SJFluidSegmentedControl, fromSegment: number): void;
}
declare var SJFluidSegmentedControlDelegate: {
  prototype: SJFluidSegmentedControlDelegate;
};

declare const enum SJFluidSegmentedControlShapeStyle {
  RoundedRect = 0,

  Liquid = 1,
}

declare const enum SJFluidSegmentedControlTransitionStyle {
  None = 0,

  Slide = 1,

  Fade = 2,
}

declare class SJFluidViewController extends UIViewController {
  static alloc(): SJFluidViewController; // inherited from NSObject

  static new(): SJFluidViewController; // inherited from NSObject
}

declare class SJGradientView extends UIView {
  static alloc(): SJGradientView; // inherited from NSObject

  static appearance(): SJGradientView; // inherited from UIAppearance

  static appearanceForTraitCollection(trait: UITraitCollection): SJGradientView; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedIn(
    trait: UITraitCollection,
    ContainerClass: typeof NSObject
  ): SJGradientView; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(
    trait: UITraitCollection,
    containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]
  ): SJGradientView; // inherited from UIAppearance

  static appearanceWhenContainedIn(ContainerClass: typeof NSObject): SJGradientView; // inherited from UIAppearance

  static appearanceWhenContainedInInstancesOfClasses(
    containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]
  ): SJGradientView; // inherited from UIAppearance

  static layerClass(): typeof NSObject;

  static new(): SJGradientView; // inherited from NSObject
}
