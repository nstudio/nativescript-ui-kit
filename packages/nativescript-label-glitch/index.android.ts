import { Color, GridLayout, Label } from '@nativescript/core';
import { LabelGlitchCommon } from './common';

export class LabelGlitch extends LabelGlitchCommon {
  labels: Array<Label> = [];
  noise = 10;
  speed = 70;
  reverse = false;
  animationSet: android.view.animation.AnimationSet;
  listener: android.view.animation.Animation.AnimationListener;

  initNativeView() {
    this.colors = [new Color('#ff0000'), new Color('#00ff00'), new Color('#0000ff')];
    for (let i = 0; i < this.colors.length; i++) {
      // TextView textView = getTextView(colors.get(i));
      // addView(textView);
      const label = this.getTextView(i);
      this.labels.push(label);
      (this.parent as GridLayout).addChild(label);
    //   this.parent.requestLayout();
      // textViews.add(textView);
      
      // if(i+1!=colors.size()) {
      //     animate(textView, noise + (i/2*2));
      // }
    }
  }

  disposeNativeView(): void {
    if (this.animationSet) {
      this.animationSet.cancel();
      this.animationSet.setAnimationListener(null);
      this.listener = null;
    }
  }

  private getTextView(index: number) {
    const label = new Label();
    label.text = this.text;
    label.style.fontSize = 35;
    label.style.color = this.colors[index];
    label.style.fontFamily = 'Helvetica';
    label.width = { unit: '%', value: 100 };
    label.height = 100;
    label.on('loaded', () => {
        console.log('loaded label!')
        label.parent.requestLayout();
        this.animateLabel(label.android, this.noise + (index / 2) * 2);
    })
    // label.style = this.style;
    return label;
  }

  private animateLabel(textView: android.widget.TextView, noise: number) {
    console.log('animateLabel:', textView, ' noise:', noise)
    this.animationSet = new android.view.animation.AnimationSet(false);
    const TranslateAnimation = android.view.animation.TranslateAnimation;
    const trans = new TranslateAnimation(0, 0, TranslateAnimation.ABSOLUTE, this.reverse ? 1 * noise : -1 * noise, 0, 0, TranslateAnimation.ABSOLUTE, this.reverse ? -1 * noise : noise);
    trans.setDuration(this.speed);

    const trans2 = new TranslateAnimation(0, 0, TranslateAnimation.ABSOLUTE, this.reverse ? -1 * noise : noise, 0, 0, TranslateAnimation.ABSOLUTE, this.reverse ? noise * 2 : -1 * noise * 2);
    trans2.setStartOffset(this.speed);
    trans2.setDuration(this.speed);

    const trans3 = new TranslateAnimation(0, 0, TranslateAnimation.ABSOLUTE, this.reverse ? -1 * noise : noise, 0, 0, TranslateAnimation.ABSOLUTE, this.reverse ? -2 * noise : noise * 2);
    trans3.setStartOffset(2 * this.speed);
    trans3.setDuration(this.speed);

    const trans4 = new TranslateAnimation(0, 0, TranslateAnimation.ABSOLUTE, this.reverse ? noise : -1 * noise, 0, 0, TranslateAnimation.ABSOLUTE, this.reverse ? noise * 1 : -1 * noise * 1);
    trans4.setStartOffset(3 * this.speed);
    trans4.setDuration(this.speed);

    // add new animations to the set
    this.animationSet.addAnimation(trans);
    this.animationSet.addAnimation(trans2);
    this.animationSet.addAnimation(trans3);
    this.animationSet.addAnimation(trans4);

    this.animationSet.setInterpolator(new android.view.animation.AccelerateDecelerateInterpolator());
    this.listener = new android.view.animation.Animation.AnimationListener({
      // @ts-ignore
      owner: new WeakRef(this),
      onAnimationStart() {},
      onAnimationEnd() {
        this.owner?.deref?.().animateLabel(textView, noise);
      },
      onAnimationRepeat(animation: android.view.animation.Animation) {},
    });
    this.animationSet.setAnimationListener(this.listener);

    textView.startAnimation(this.animationSet);
    this.reverse = !this.reverse;
  }
}
