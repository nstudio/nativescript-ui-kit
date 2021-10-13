import { labelizeProperty, LabelMarqueeCommon } from './common';

export class LabelMarquee extends LabelMarqueeCommon {

    // @ts-ignore
    get android(): android.widget.TextView {
        return this.nativeView;
    }

    initNativeView() {
        this.android.setSingleLine(true);
		this.android.setEllipsize(android.text.TextUtils.TruncateAt.MARQUEE);
        this.android.setMarqueeRepeatLimit(-1); // -1 is infinite
        this.android.setSelected(true);
    }

    [labelizeProperty.setNative](value: boolean) {
		this.android.setSelected(!value);
        const ellipsis = value ? android.text.TextUtils.TruncateAt.END : android.text.TextUtils.TruncateAt.MARQUEE;
        this.android.setEllipsize(ellipsis);
	}
}