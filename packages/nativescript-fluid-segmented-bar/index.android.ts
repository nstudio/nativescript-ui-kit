import { Property, SegmentedBar, SegmentedBarItem } from '@nativescript/core';
import { selectedIndexProperty } from '@nativescript/core/ui/segmented-bar';
import { FluidSegmentedBarItem } from './common';

// Note: can remove once android fluid is supported fully
const itemsProperty = new Property<FluidSegmentedBar, Array<FluidSegmentedBarItem>>({
  name: 'items',
  valueChanged: (target, oldItems, newItems) => {
    console.log('here!');
    if (oldItems) {
      for (const item of oldItems) {
        console.log('oldItems item:', item);
        if (item instanceof SegmentedBarItem) {
          target._removeView(item);
        }
      }
    }

    if (newItems) {
      for (const item of newItems) {
        console.log('newItem item:', item);
        if (item instanceof SegmentedBarItem) {
          console.log('here!');
          target._addView(item);
        }
      }
    }
  },
});

class FluidSegmentedBarItemCustom extends SegmentedBarItem {
  setupNativeView(tabIndex) {
    // TabHost.TabSpec.setIndicator DOES NOT WORK once the title has been set.
    // http://stackoverflow.com/questions/2935781/modify-tab-indicator-dynamically-in-android
    if (this.parent) {
      const titleTextView = this.parent.nativeViewProtected.getTabWidget().getChildAt(tabIndex).findViewById(16908310);
      this.setNativeView(titleTextView);
      if (titleTextView) {
        if (this['titleDirty']) {
          this['_update']();
        }
      }
    }
  }
}

export class FluidSegmentedBar extends SegmentedBar {
  eachChild(callback) {
    const items = this.items;
    if (items) {
      items.forEach((item, i) => {
        if (item instanceof FluidSegmentedBarItemCustom) {
          callback(item);
        }
      });
    }
  }

  [itemsProperty.setNative](value: Array<FluidSegmentedBarItem>) {
    console.log('itemsProperty:', value);
    this.nativeViewProtected.clearAllTabs();

    value.forEach((item, i, arr) => {
      const segmentedItem = new FluidSegmentedBarItemCustom();
      segmentedItem.title = item.title;
      this['insertTab'](segmentedItem, i);
    });

    selectedIndexProperty.coerce(this);
  }
}

itemsProperty.register(FluidSegmentedBar);
