import { LabelMarqueeCommon } from './common';

// @NativeClass()
// class MarqueeLabel extends android.widget.TextView {
//     constructor(context: android.content.Context) {
//         super(context);

//         return global.__native(this);
//     }

//     // override: marquee only animates when focused
//     // isFocused() {
//     //     return true;
//     // }
// }

export class LabelMarquee extends LabelMarqueeCommon {

    // @ts-ignore
    // get android(): MarqueeLabel {
    //     return this.nativeView;
    // }

    // createNativeView() {
    //     return new MarqueeLabel(this._context);
    // }

    initNativeView() {
        this.android.setSingleLine(true);
		this.android.setEllipsize(android.text.TextUtils.TruncateAt.MARQUEE);
        // -1 is infinite
        this.android.setMarqueeRepeatLimit(-1);
        // this.android.setHorizontallyScrolling(true);
        
    }

    onLoaded() {
        super.onLoaded();
        // marquee doesn't start until selected
        this.android.setSelected(true);
        // this.android.setFocusableInTouchMode(true);
        // this.android.requestFocus();
    }
}