import { fadeLengthProperty, labelizeProperty, LabelMarqueeCommon, scrollDurationProperty } from './common';

export class LabelMarquee extends LabelMarqueeCommon {
  // @ts-ignore
  get ios(): MarqueeLabel {
    return this.nativeView;
  }

  createNativeView() {
    return MarqueeLabel.alloc().init();
  }

  initNativeView() {
    this.ios.fadeLength = 10;
    this.ios.scrollDuration = 8;
    // fix edge case - will be properly fixed in @nativescript/core 8.2
    this.nativeView.padding = { top: 0, right: 0, bottom: 0, left: 0 };
  }

  [fadeLengthProperty.setNative](value: number) {
    this.ios.fadeLength = value;
  }

  [scrollDurationProperty.setNative](value: number) {
    this.ios.scrollDuration = value;
  }

  [labelizeProperty.setNative](value: boolean) {
    this.ios.labelize = value;
  }
}
