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
        const nativeView = <MarqueeLabel>this.nativeView;
        nativeView.fadeLength = 10;
        nativeView.scrollDuration = 8;
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
