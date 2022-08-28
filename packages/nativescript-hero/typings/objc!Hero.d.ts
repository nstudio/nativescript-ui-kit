
declare class Hero extends NSObject {

	static alloc(): Hero; // inherited from NSObject

	static new(): Hero; // inherited from NSObject
}

declare class HeroDebugPlugin extends HeroPlugin {

	static alloc(): HeroDebugPlugin; // inherited from NSObject

	static new(): HeroDebugPlugin; // inherited from NSObject
}

declare class HeroPlugin extends NSObject {

	static alloc(): HeroPlugin; // inherited from NSObject

	static new(): HeroPlugin; // inherited from NSObject
}

declare class HeroTransition extends NSObject implements UINavigationControllerDelegate, UITabBarControllerDelegate, UIViewControllerAnimatedTransitioning, UIViewControllerInteractiveTransitioning, UIViewControllerTransitioningDelegate {

	static alloc(): HeroTransition; // inherited from NSObject

	static new(): HeroTransition; // inherited from NSObject

	readonly completionCurve: UIViewAnimationCurve; // inherited from UIViewControllerInteractiveTransitioning

	readonly completionSpeed: number; // inherited from UIViewControllerInteractiveTransitioning

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly wantsInteractiveStart: boolean; // inherited from UIViewControllerInteractiveTransitioning

	readonly  // inherited from NSObjectProtocol

	animateTransition(transitionContext: UIViewControllerContextTransitioning): void;

	animationControllerForDismissedController(dismissed: UIViewController): UIViewControllerAnimatedTransitioning;

	animationControllerForPresentedControllerPresentingControllerSourceController(presented: UIViewController, presenting: UIViewController, source: UIViewController): UIViewControllerAnimatedTransitioning;

	animationEnded(transitionCompleted: boolean): void;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	interactionControllerForDismissal(animator: UIViewControllerAnimatedTransitioning): UIViewControllerInteractiveTransitioning;

	interactionControllerForPresentation(animator: UIViewControllerAnimatedTransitioning): UIViewControllerInteractiveTransitioning;

	interruptibleAnimatorForTransition(transitionContext: UIViewControllerContextTransitioning): UIViewImplicitlyAnimating;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	navigationControllerAnimationControllerForOperationFromViewControllerToViewController(navigationController: UINavigationController, operation: UINavigationControllerOperation, fromVC: UIViewController, toVC: UIViewController): UIViewControllerAnimatedTransitioning;

	navigationControllerDidShowViewControllerAnimated(navigationController: UINavigationController, viewController: UIViewController, animated: boolean): void;

	navigationControllerInteractionControllerForAnimationController(navigationController: UINavigationController, animationController: UIViewControllerAnimatedTransitioning): UIViewControllerInteractiveTransitioning;

	navigationControllerPreferredInterfaceOrientationForPresentation(navigationController: UINavigationController): UIInterfaceOrientation;

	navigationControllerSupportedInterfaceOrientations(navigationController: UINavigationController): UIInterfaceOrientationMask;

	navigationControllerWillShowViewControllerAnimated(navigationController: UINavigationController, viewController: UIViewController, animated: boolean): void;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	presentationControllerForPresentedViewControllerPresentingViewControllerSourceViewController(presented: UIViewController, presenting: UIViewController, source: UIViewController): UIPresentationController;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	startInteractiveTransition(transitionContext: UIViewControllerContextTransitioning): void;

	tabBarControllerAnimationControllerForTransitionFromViewControllerToViewController(tabBarController: UITabBarController, fromVC: UIViewController, toVC: UIViewController): UIViewControllerAnimatedTransitioning;

	tabBarControllerDidEndCustomizingViewControllersChanged(tabBarController: UITabBarController, viewControllers: NSArray<UIViewController> | UIViewController[], changed: boolean): void;

	tabBarControllerDidSelectViewController(tabBarController: UITabBarController, viewController: UIViewController): void;

	tabBarControllerInteractionControllerForAnimationController(tabBarController: UITabBarController, animationController: UIViewControllerAnimatedTransitioning): UIViewControllerInteractiveTransitioning;

	tabBarControllerPreferredInterfaceOrientationForPresentation(tabBarController: UITabBarController): UIInterfaceOrientation;

	tabBarControllerShouldSelectViewController(tabBarController: UITabBarController, viewController: UIViewController): boolean;

	tabBarControllerSupportedInterfaceOrientations(tabBarController: UITabBarController): UIInterfaceOrientationMask;

	tabBarControllerWillBeginCustomizingViewControllers(tabBarController: UITabBarController, viewControllers: NSArray<UIViewController> | UIViewController[]): void;

	tabBarControllerWillEndCustomizingViewControllersChanged(tabBarController: UITabBarController, viewControllers: NSArray<UIViewController> | UIViewController[], changed: boolean): void;

	transitionDuration(transitionContext: UIViewControllerContextTransitioning): number;
}

declare var HeroVersionNumber: number;

declare var HeroVersionString: interop.Reference<number>;

interface HeroViewControllerDelegate {

	heroDidCancelAnimatingFromViewController?(viewController: UIViewController): void;

	heroDidCancelAnimatingToViewController?(viewController: UIViewController): void;

	heroDidCancelTransition?(): void;

	heroDidEndAnimatingFromViewController?(viewController: UIViewController): void;

	heroDidEndAnimatingToViewController?(viewController: UIViewController): void;

	heroDidEndTransition?(): void;

	heroWillStartAnimatingFromViewController?(viewController: UIViewController): void;

	heroWillStartAnimatingToViewController?(viewController: UIViewController): void;

	heroWillStartTransition?(): void;
}
declare var HeroViewControllerDelegate: {

	prototype: HeroViewControllerDelegate;
};
