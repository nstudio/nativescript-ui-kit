import { Application, IOSHelper, LayoutBase, Utils, View, ViewBase } from '@nativescript/core';
import { SplitSheetCommon } from './common';

export class SplitSheet extends SplitSheetCommon {
  private ctrl: SplitSheetController;
  private notificationName = 'SplitSheetShowing';
  private initCtrl = false;
  private ctrls: {
    top?: UIViewController;
    bottom?: UIViewController;
  };
  private observer;

  createNativeView() {
    this.ctrl = SplitSheetController.alloc().init();
    this.ctrl.displaceContent = true;
    this.ctrl.showHandle = true;
    this.ctrl.minimumSheetHeight = 600;
    this.ctrl.snappingDistance = 150;
    this.ctrl.animationDuration = 0.6;
    this.ctrl.swipeUpToShowAllowed = true;
    this.ctrl.statusBarStyle = UIStatusBarStyle.Default;
    return this.ctrl.view;
  }

  initNativeView() {
    this.observer = Application.ios.addNotificationObserver(this.notificationName, (notification: NSNotification) => {
      console.log('SplitSheetShowing:', notification.object);
    });
  }

  disposeNativeView() {
    if (this.observer) {
      Application.ios.removeNotificationObserver(this.observer, this.notificationName);
    }
  }

  openSheet() {
    this.ctrl.show(true);
  }

  closeSheet() {
    this.ctrl.show(false);
  }

  layoutNativeView(): void {
    // noop
  }

  eachLayoutChild(callback: (child: View, isLast: boolean) => void): void {}

  _addViewToNativeVisualTree(view: ViewBase, atIndex?: number): boolean {
    super._addViewToNativeVisualTree(view, atIndex);
    // console.log('(view as any).position:', (view as any).position);
    if (!this.ctrls) {
      this.ctrls = {};
    }
    if (!this.ctrls.top || !this.ctrls.bottom) {
      if ((view as any).position === 'top') {
        // this.splitViewController.setViewControllerForColumn(SidebarViewController.alloc().init(), UISplitViewControllerColumn.Primary);
        //   this.splitViewController.setViewControllerForColumn(view.viewController, UISplitViewControllerColumn.Primary);
        this.ctrls.top = view.viewController;
      } else if ((view as any).position === 'bottom') {
        // this.splitViewController.setViewControllerForColumn(TabBarController.alloc().init(), UISplitViewControllerColumn.Compact);
        //   this.splitViewController.setViewControllerForColumn(view.viewController, UISplitViewControllerColumn.Compact);
        //   this.splitViewController.setViewControllerForColumn(view.viewController, UISplitViewControllerColumn.Secondary)
        this.ctrls.bottom = view.viewController;
      }
    }
    if (!this.initCtrl && this.ctrls.top && this.ctrls.bottom) {
      this.initCtrl = true;
      this.ctrl.setupWithMainViewControllerSheetViewController(this.ctrls.top, this.ctrls.bottom);
    }

    return true;
  }
}

export class AutoLayout extends LayoutBase {
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
    this.viewController = IOSHelper.UILayoutViewController.initWithOwner(new WeakRef(this)) as UIViewController;
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
      const result = View.measureChild(this, child, widthMeasureSpec, heightMeasureSpec);

      measureWidth = Math.max(result.measuredWidth, measureWidth);
      measureHeight = Math.max(result.measuredHeight, measureHeight);

      return true;
    });

    const widthAndState = View.resolveSizeAndState(measureWidth, width, widthMode, 0);
    const heightAndState = View.resolveSizeAndState(measureHeight, height, heightMode, 0);

    this.setMeasuredDimension(widthAndState, heightAndState);
  }

  // This method won't be called in Android because we use the native android layout.
  public onLayout(left: number, top: number, right: number, bottom: number): void {
    this.eachLayoutChild((child) => {
      View.layoutChild(this, child, 0, 0, right - left, bottom - top);
      return true;
    });
  }
}
