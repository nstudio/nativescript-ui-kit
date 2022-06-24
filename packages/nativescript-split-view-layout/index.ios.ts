import { SplitViewLayoutCommon } from './common';
declare var TabBarController;

export class SplitViewLayout extends SplitViewLayoutCommon {
  private splitViewController: UISplitViewController;

  createNativeView() {
    this.splitViewController = UISplitViewController.alloc().initWithStyle(UISplitViewControllerStyle.DoubleColumn);
    this.splitViewController.preferredDisplayMode = UISplitViewControllerDisplayMode.OneBesideSecondary;
    this.splitViewController.presentsWithGesture = false;
    this.splitViewController.preferredSplitBehavior = UISplitViewControllerSplitBehavior.Tile;
    return this.splitViewController.view;
  }

  onLoaded(): void {
    this.splitViewController.setViewControllerForColumn(SidebarViewController.alloc().init(), UISplitViewControllerColumn.Primary);
    this.splitViewController.setViewControllerForColumn(TabBarController.alloc().init(), UISplitViewControllerColumn.Compact);
    super.onLoaded();
  }
}
