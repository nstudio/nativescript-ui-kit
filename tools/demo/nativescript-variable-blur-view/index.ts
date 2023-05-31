import { DemoSharedBase } from '../utils';
import {  } from '@nstudio/nativescript-variable-blur-view';

export class DemoSharedNativescriptVariableBlurView extends DemoSharedBase {
  url = `https://e1.pxfuel.com/desktop-wallpaper/722/955/desktop-wallpaper-nature-landscape-water-clouds-trees-beach-sunset-portrait-portrait.jpg`;
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