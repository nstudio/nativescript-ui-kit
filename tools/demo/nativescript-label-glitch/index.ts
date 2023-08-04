import { CoreTypes, Label } from '@nativescript/core';
import { DemoSharedBase } from '../utils';
import {} from '@nstudio/nativescript-label-glitch';

export class DemoSharedNativescriptLabelGlitch extends DemoSharedBase {
  allText = ['is this real?', `it can't be...`, `are we dreaming?`, `wait, it must be real`, `yes...it is!`];
  text: string;
  cnt = 0;
  timer;
  label: Label;

  constructor() {
    super();
    this.text = this.allText[this.cnt];
  }

  loadedLabel(args) {
    this.label = args.object;
    // this.label.scaleX = this.label.scaleY = .8;
    // this.timer = setInterval(() => {
    //   this.text = this.allText[this.cnt];
    //   this.notifyPropertyChange('text', this.text);
    //   this.label.opacity = 1;
    //   this.startAnimation();
    //   this.cnt++;
    //   if (this.cnt === this.allText.length) {
    //     clearInterval(this.timer);
    //   }
    // }, 3000);
    // this.startAnimation();
  }

  startAnimation() {
    this.label.animate({
      scale: { x: 1.2, y: 1.2},
      opacity: 0,
      duration: 2900,
      curve: CoreTypes.AnimationCurve.easeInOut
    }).then(() => {
      this.label.scaleX = this.label.scaleY = .8;
    });
  }

  loadedVideo(args) {

  }
  testIt() {
    console.log('test nativescript-label-glitch!');
  }
}
