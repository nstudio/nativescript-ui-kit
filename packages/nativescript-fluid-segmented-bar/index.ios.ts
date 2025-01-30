import { CoercibleProperty, Color, Property, Utils, colorProperty } from '@nativescript/core';
import { FluidSegmentedBarCommon, FluidSegmentedBarDidScrollEvent, FluidSegmentedBarGradientColorSides, FluidSegmentedBarIndexChangedEvent, FluidSegmentedBarItem } from './common';

const gradientClear = Utils.ios.collections.jsArrayToNSArray([UIColor.clearColor]);
// Note: can move to ./common once supported on both
const itemsProperty = new Property<FluidSegmentedBar, Array<FluidSegmentedBarItem>>({
  name: 'items',
});
const gradientColorSidesProperty = new Property<FluidSegmentedBar, FluidSegmentedBarGradientColorSides>({
  name: 'gradientColorSides',
});
const selectedIndexProperty = new CoercibleProperty<FluidSegmentedBar, number>({
  name: 'selectedIndex',
  defaultValue: -1,
  valueChanged: (target, oldValue, newValue) => {
    target.notify(<FluidSegmentedBarIndexChangedEvent>{
      eventName: FluidSegmentedBar.selectedIndexChangedEvent,
      object: target,
      oldIndex: oldValue,
      newIndex: newValue,
    });
  },
  coerceValue: (target, value) => {
    const items = target.items;
    if (items) {
      const max = items.length - 1;
      if (value < 0) {
        value = 0;
      }
      if (value > max) {
        value = max;
      }
    } else {
      value = -1;
    }

    return value;
  },
  valueConverter: (v) => parseInt(v),
});

@NativeClass()
class FluidSegmentedBarDataSource extends NSObject implements SJFluidSegmentedControlDataSource {
  private owner: WeakRef<FluidSegmentedBar>;
  static ObjCProtocols = [SJFluidSegmentedControlDataSource];

  static initWithOwner(owner: WeakRef<FluidSegmentedBar>) {
    const dataSource = FluidSegmentedBarDataSource.new() as FluidSegmentedBarDataSource;
    dataSource.owner = owner;
    return dataSource;
  }
  numberOfSegmentsInSegmentedControl(segmentedControl: SJFluidSegmentedControl): number {
    return this.owner?.deref?.().items?.length || 0;
  }

  segmentedControlGradientColorsForBounce?(segmentedControl: SJFluidSegmentedControl, bounce: SJFluidSegmentedControlBounce): NSArray<UIColor> {
    const owner = this.owner?.deref();
    if (owner) {
      switch (bounce) {
        case SJFluidSegmentedControlBounce.Left:
          return Utils.ios.collections.jsArrayToNSArray(owner.gradientColorSides.left.map((c) => c.ios));
        case SJFluidSegmentedControlBounce.Right:
          return Utils.ios.collections.jsArrayToNSArray(owner.gradientColorSides.right.map((c) => c.ios));
      }
    }
    return;
  }

  segmentedControlGradientColorsForSelectedSegmentAtIndex?(segmentedControl: SJFluidSegmentedControl, index: number): NSArray<UIColor> {
    const owner = this.owner?.deref();
    if (owner) {
      const colors = owner.items?.length ? owner.items[index].colors : null;
      return Utils.ios.collections.jsArrayToNSArray(colors.map((c) => c.ios));
    }
    return gradientClear;
  }

  segmentedControlTitleForSegmentAtIndex?(segmentedControl: SJFluidSegmentedControl, index: number): string {
    const owner = this.owner?.deref();
    if (owner) {
      return owner.items?.length ? owner.items[index].title : '';
    }
    return '';
  }
}

@NativeClass()
class FluidSegmentedBarDelegate extends NSObject implements SJFluidSegmentedControlDelegate {
  private owner: WeakRef<FluidSegmentedBar>;
  static ObjCProtocols = [SJFluidSegmentedControlDelegate];

  static initWithOwner(owner: WeakRef<FluidSegmentedBar>) {
    const delegate = FluidSegmentedBarDelegate.new() as FluidSegmentedBarDelegate;
    delegate.owner = owner;
    return delegate;
  }
  segmentedControlDidChangeFromSegmentAtIndexToSegmentAtIndex(segmentedControl: SJFluidSegmentedControl, fromIndex: number, toIndex: number): void {
    const owner = this.owner?.deref();
    if (owner) {
      owner.selectedIndex = toIndex;
    }
  }

  segmentedControlDidScrollWithXOffset(segmentedControl: SJFluidSegmentedControl, offset: number): void {
    const owner = this.owner?.deref();
    if (owner) {
      owner.notify({
        eventName: FluidSegmentedBar.didScrollOffsetEvent,
        object: owner,
        offset,
        maxOffset: segmentedControl.frame.size.width / (owner.items.length * (owner.items.length - 1)),
      } as FluidSegmentedBarDidScrollEvent);
    }
  }
}

export class FluidSegmentedBar extends FluidSegmentedBarCommon {
  nativeViewProtected: SJFluidSegmentedControl;
  dataSource: FluidSegmentedBarDataSource;
  delegate: FluidSegmentedBarDelegate;

  createNativeView() {
    const segment = SJFluidSegmentedControl.new();
    segment.textColor = UIColor.whiteColor;
    return segment;
  }

  initNativeView() {
    this.delegate = FluidSegmentedBarDelegate.initWithOwner(new WeakRef(this));
    this.nativeViewProtected.delegate = this.delegate;
    this.dataSource = FluidSegmentedBarDataSource.initWithOwner(new WeakRef(this));
    this.nativeViewProtected.dataSource = this.dataSource;
    this.nativeViewProtected.reloadData();
  }

  disposeNativeView() {
    if (this.nativeViewProtected) {
      this.nativeViewProtected.delegate = null;
    }
    this.delegate = null;
    this.dataSource = null;
  }

  onLoaded() {
    super.onLoaded();
    setTimeout(() => {
      this.nativeViewProtected.setCurrentSegmentIndexAnimated(0, true);
    });
  }

  [colorProperty.getDefault](): UIColor {
    return this.nativeViewProtected.textColor;
  }
  [colorProperty.setNative](value: Color | UIColor) {
    this.nativeViewProtected.textColor = value instanceof Color ? value.ios : value;
  }

  [itemsProperty.getDefault](): Array<FluidSegmentedBarItem> {
    return null;
  }
  [itemsProperty.setNative](value: Array<FluidSegmentedBarItem>) {
    selectedIndexProperty.coerce(this);
  }
}

selectedIndexProperty.register(FluidSegmentedBar);
itemsProperty.register(FluidSegmentedBar);
gradientColorSidesProperty.register(FluidSegmentedBar);
