import { ContentView, CoreTypes, Label, isAndroid } from '@nativescript/core';
import { DemoSharedBase } from '../utils';
import {} from '@nstudio/nativescript-label-glitch';

export class DemoSharedNativescriptLabelGlitch extends DemoSharedBase {
  elementName = `<LabelGlitch />`;
  allText = ['is this real?', `it can't be...`, `are we dreaming?`, `wait...`, `IT IS REAL!`];
  text: string;
  cnt = 0;
  timer;
  label: Label;
  shadow: ContentView;
  video: any;

  constructor() {
    super();
    this.text = this.allText[this.cnt];
  }

  loadedLabel(args) {
    this.label = args.object;
    this.label.scaleX = this.label.scaleY = 0.8;
    this.label.opacity = 0;
    this.timer = setInterval(() => {
      this.cnt++;

      if (this.cnt === this.allText.length) {
        clearInterval(this.timer);

        clearInterval(this.timer);
        this.video.play();
        this.video.animate({
          opacity: 1,
          duration: 300,
        });
      } else {
        this.text = this.allText[this.cnt];
        this.notifyPropertyChange('text', this.text);
        this.label.scaleX = this.label.scaleY = 0.8;
        this.label.opacity = 0;
        this.startAnimation();
      }
    }, 3000);
    this.startAnimation();
  }

  startAnimation() {
    this.label
      .animate({
        scale: { x: 1, y: 1 },
        opacity: 1,
        duration: 1800,
        curve: CoreTypes.AnimationCurve.easeInOut,
      })
      .then(() => {
        this.label
          .animate({
            scale: { x: 1.3, y: 1.3 },
            opacity: 0,
            duration: 1800,
            curve: CoreTypes.AnimationCurve.easeInOut,
          })
          .then(() => {
            this.label.scaleX = this.label.scaleY = 0.8;
          });
      });
  }

  loadedVideo(args) {
    this.video = args.object;
    this.video.opacity = 0;
  }

  loadedShadow(args) {
    androidToggleClipping(args, false);
  }
}

function androidToggleClipping(args, enable = true) {
  if (isAndroid && args && args.object && args.object.nativeView) {
    const nativeView = args.object.nativeView;
    if (nativeView.setClipChildren) {
      nativeView.setClipChildren(enable);
    }
    if (nativeView.setClipToPadding) {
      nativeView.setClipToPadding(enable);
    }

    const parent = nativeView.getParent();
    if (parent) {
      if (parent.setClipChildren) {
        parent.setClipChildren(enable);
      }
      if (parent.setClipToPadding) {
        parent.setClipToPadding(enable);
      }
    }

    const grand = parent ? parent.getParent() : null;
    if (grand) {
      if (grand.setClipChildren) {
        grand.setClipChildren(enable);
      }
      if (grand.setClipToPadding) {
        grand.setClipToPadding(enable);
      }
    }
  }
}
