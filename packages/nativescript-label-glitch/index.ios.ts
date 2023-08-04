import { Label } from "@nativescript/core";
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

    // initNativeView() {
    //     this.nativeView.sizeToFit();
    //     this.nativeView.blendMode = CGBlendMode.kCGBlendModeDifference;
    // }

    onLoaded() {
        super.onLoaded();
        setTimeout(() => {
            this.nativeView.start();
        })
    }
}