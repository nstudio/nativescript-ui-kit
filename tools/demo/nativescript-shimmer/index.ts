import { DemoSharedBase } from '../utils';
import { Shimmer } from '@nstudio/nativescript-shimmer';
import { View } from '@nativescript/core';
import * as FPSMeter from '@nativescript/core/fps-meter';

export class DemoSharedNativescriptShimmer extends DemoSharedBase {
  // perf monitoring with fps-meter
  status = false;
  callbackId;

  shimmer = true;
  loadedViews: Array<View> = [];

  loadedView(args) {
    this.loadedViews.push(args.object);
  }

  toggleShimmer() {
    this.shimmer = !this.shimmer;
    if (this.shimmer) {
      // this.startFPSMeter();
      // console.time('Starting Shimmer effect')
      for (const view of this.loadedViews) {
        Shimmer.start(view);
      }
      // console.timeEnd('Starting Shimmer effect')
    } else {
      // this.stopFPSMeter();
      // console.time('Stopping Shimmer effect')
      for (const view of this.loadedViews) {
        Shimmer.stop(view);
      }
      // console.timeEnd('Stopping Shimmer effect')
    }
    // console.log('this.view.ios:');
    // for (const key in this.view.ios) {
    //   console.log(key);
    // }
    // console.log('this.label.ios.startShimmeringAnimation:', this.label.ios.startShimmeringAnimation);
    // console.log('this.label.ios.startShimmering:', this.label.ios.startShimmering);
    // for (const key in this.label.ios) {
    //   console.log(key);
    // }
  }

  startFPSMeter() {
    this.callbackId = FPSMeter.addCallback((fps: number, minFps: number) => {
      // console.log(fps)
      console.log(`Frames per second: ${fps.toFixed(2)}`);
      // console.log(minFps);
      // console.log(`Minimum frames per second: ${minFps.toFixed(2)}`);
    });
    FPSMeter.start();
  }

  stopFPSMeter() {
    FPSMeter.removeCallback(this.callbackId);
    FPSMeter.stop();
  }
}
