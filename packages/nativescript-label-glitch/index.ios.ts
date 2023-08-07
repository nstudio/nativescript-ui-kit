import { LabelGlitchCommon } from "./common";

export class LabelGlitch extends LabelGlitchCommon {
    // @ts-ignore
    nativeView: GlitchLabel;

    createNativeView() {
        const glitchLabel =  GlitchLabel.new();
        glitchLabel.sizeToFit();
        glitchLabel.blendMode = CGBlendMode.kCGBlendModeDifference;
        return glitchLabel;
    }

    onLoaded() {
        super.onLoaded();
        setTimeout(() => {
            this.nativeView.start();
        })
    }
}