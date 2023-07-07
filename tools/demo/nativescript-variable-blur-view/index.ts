import { DemoSharedBase } from '../utils';
import {  } from '@nstudio/nativescript-variable-blur-view';

export class DemoSharedNativescriptVariableBlurView extends DemoSharedBase {
  url = `~/images/sample-image.jpg`;
  maxBlurRadius = 20;

  constructor() {
    super();
    // Note: uncomment to test prop changes:
    // setTimeout(()=> {
    //   this.notifyPropertyChange('maxBlurRadius', 50);
    //   setTimeout(()=> {
    //     this.notifyPropertyChange('maxBlurRadius', 8);
    //   }, 1200);
    // }, 1200);
  }
}