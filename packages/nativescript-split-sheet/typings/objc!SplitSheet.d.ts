
declare class SplitSheetController extends UIViewController implements UIScrollViewDelegate {

	static alloc(): SplitSheetController; // inherited from NSObject

	static new(): SplitSheetController; // inherited from NSObject

	animationDuration: number;

	displaceContent: boolean;

	handleView: UIView;

	mainInnerBottomConstraint: NSLayoutConstraint;

	mainInnerContainerView: UIView;

	mainOuterContainerView: UIView;

	mainOuterTopConstraint: NSLayoutConstraint;

	mainPlaceholderContainerView: UIView;

	readonly mainViewController: UIViewController;

	minimumSheetHeight: number;

	scrollView: UIScrollView;

	sheetContainerView: UIView;

	sheetHeightConstraint: NSLayoutConstraint;

	readonly sheetViewController: UIViewController;

	showHandle: boolean;

	readonly showing: boolean;

	snappingDistance: number;

	statusBarStyle: UIStatusBarStyle;

	swipeUpToShowAllowed: boolean;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { mainViewController: UIViewController; sheetViewController: UIViewController; });

	addHandle(): void;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	initWithMainViewControllerSheetViewController(mainViewController: UIViewController, sheetViewController: UIViewController): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

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

	scrollViewWillEndDraggingWithVelocityTargetContentOffset(scrollView: UIScrollView, velocity: CGPoint, targetContentOffset: interop.Pointer | interop.Reference<CGPoint>): void;

	self(): this;

	setup(): void;

	show(shouldShow: boolean): void;

	viewForZoomingInScrollView(scrollView: UIScrollView): UIView;
}
