// import { SplitViewLayoutCommon } from './common';
import {
  ActionBar,
  IOSHelper,
  LayoutBase,
  ProxyViewContainer,
  ScrollView,
  Utils,
  View,
  ViewBase,
} from "@nativescript/core";
declare var TabBarController;

// export class SplitViewLayout extends SplitViewLayoutCommon {
//   private splitViewController: UISplitViewController;

//   createNativeView() {
//     this.splitViewController = UISplitViewController.alloc().initWithStyle(UISplitViewControllerStyle.DoubleColumn);
//     this.splitViewController.preferredDisplayMode = UISplitViewControllerDisplayMode.OneBesideSecondary;
//     this.splitViewController.presentsWithGesture = false;
//     this.splitViewController.preferredSplitBehavior = UISplitViewControllerSplitBehavior.Tile;
//     return this.splitViewController.view;
//   }

//   onLoaded(): void {
//     this.splitViewController.setViewControllerForColumn(SidebarViewController.alloc().init(), UISplitViewControllerColumn.Primary);
//     this.splitViewController.setViewControllerForColumn(TabBarController.alloc().init(), UISplitViewControllerColumn.Compact);
//     super.onLoaded();
//   }
// }

export class SplitViewLayout extends LayoutBase {
  private splitViewController: UISplitViewController;

  createNativeView() {
    this.splitViewController = UISplitViewController.alloc().initWithStyle(UISplitViewControllerStyle.DoubleColumn);
    this.splitViewController.preferredDisplayMode = UISplitViewControllerDisplayMode.OneBesideSecondary;
    this.splitViewController.presentsWithGesture = true;
    this.splitViewController.preferredSplitBehavior = UISplitViewControllerSplitBehavior.Tile;
    this.viewController = this.splitViewController;
    return this.splitViewController.view;
  }

  public layoutNativeView(): void {
    // noop
  }

  eachLayoutChild(callback: (child: View, isLast: boolean) => void): void {}

  _addViewToNativeVisualTree(view: ViewBase, atIndex?: number): boolean {
    super._addViewToNativeVisualTree(view, atIndex);
    console.log('(view as any).splitview:', (view as any).splitview);
    if ((view as any).splitview === 'primary') {
      // this.splitViewController.setViewControllerForColumn(SidebarViewController.alloc().init(), UISplitViewControllerColumn.Primary);
      this.splitViewController.setViewControllerForColumn(view.viewController, UISplitViewControllerColumn.Primary);
    } else if ((view as any).splitview === 'detail') {
      // this.splitViewController.setViewControllerForColumn(TabBarController.alloc().init(), UISplitViewControllerColumn.Compact);
      this.splitViewController.setViewControllerForColumn(view.viewController, UISplitViewControllerColumn.Compact);
      this.splitViewController.setViewControllerForColumn(view.viewController, UISplitViewControllerColumn.Secondary)
    }

    return true;
  }
}

export class AutoLayoutView extends LayoutBase {
  public viewController: UIViewController;
  public _addViewToNativeVisualTree(view: ViewBase, atIndex?: number): boolean {
    const nativeView = this.viewController.view;
    super._addViewToNativeVisualTree(view, atIndex);
    const index = atIndex ?? Infinity;
    if (nativeView && view.nativeViewProtected) {
      if (index >= nativeView.subviews.count) {
        nativeView.addSubview(view.nativeViewProtected);
      } else {
        nativeView.insertSubviewAtIndex(view.nativeViewProtected, index);
      }
    }
    return true;
  }

  public _removeViewFromNativeVisualTree(view: ViewBase): void {
    const nativeView = this.viewController.view;
    super._removeViewFromNativeVisualTree(view);
    if (view.nativeViewProtected) {
      if ((view.nativeViewProtected as UIView).superview === nativeView) {
        (view.nativeViewProtected as UIView).removeFromSuperview();
      }
    }
  }
  createNativeView() {
    this.viewController = IOSHelper.UILayoutViewController.initWithOwner(
      new WeakRef(this)
    ) as UIViewController;
    this.viewController.view.translatesAutoresizingMaskIntoConstraints = true;
    return this.viewController.view;
  }

  public layoutNativeView(): void {
    // noop
  }

  public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {
    const width = Utils.layout.getMeasureSpecSize(widthMeasureSpec);
    const widthMode = Utils.layout.getMeasureSpecMode(widthMeasureSpec);

    const height = Utils.layout.getMeasureSpecSize(heightMeasureSpec);
    const heightMode = Utils.layout.getMeasureSpecMode(heightMeasureSpec);
    let measureWidth = this.effectiveMinWidth;
    let measureHeight = this.effectiveMinHeight;
    this.eachLayoutChild((child) => {
      const result = View.measureChild(
        this,
        child,
        widthMeasureSpec,
        heightMeasureSpec
      );

      measureWidth = Math.max(result.measuredWidth, measureWidth);
      measureHeight = Math.max(result.measuredHeight, measureHeight);

      return true;
    });

    const widthAndState = View.resolveSizeAndState(
      measureWidth,
      width,
      widthMode,
      0
    );
    const heightAndState = View.resolveSizeAndState(
      measureHeight,
      height,
      heightMode,
      0
    );

    this.setMeasuredDimension(widthAndState, heightAndState);
  }

  // This method won't be called in Android because we use the native android layout.
  public onLayout(
    left: number,
    top: number,
    right: number,
    bottom: number
  ): void {
    this.eachLayoutChild((child) => {
      View.layoutChild(this, child, 0, 0, right - left, bottom - top);
      return true;
    });
  }
}

