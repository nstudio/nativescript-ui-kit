import { DemoSharedBase } from '../utils';
import { Shimmer } from '@nstudio/nativescript-shimmer';
import { View } from '@nativescript/core';

export class DemoSharedNativescriptShimmer extends DemoSharedBase {
  shimmer = false;
  view: View;
  view2: View;
  view3: View;

  loadedView(args) {
    this.view = args.object;
  }

  loadedView2(args) {
    this.view2 = args.object;
  }

  loadedView3(args) {
    this.view3 = args.object;
  }

  toggleShimmer() {
    this.shimmer = !this.shimmer;
    if (this.shimmer) {
      Shimmer.start(this.view);
      Shimmer.start(this.view2);
      Shimmer.start(this.view3);
      // this.label.ios.startShimmering();
    } else {
      Shimmer.stop(this.view);
      Shimmer.stop(this.view2);
      Shimmer.stop(this.view3);
      // this.label.ios.stopShimmering();
    }
    // console.log('this.label.ios:', this.label.ios);
    // console.log('this.label.ios.startShimmeringAnimation:', this.label.ios.startShimmeringAnimation);
    // console.log('this.label.ios.startShimmering:', this.label.ios.startShimmering);
    // for (const key in this.label.ios) {
    //   console.log(key);
    // }
    
  }
}