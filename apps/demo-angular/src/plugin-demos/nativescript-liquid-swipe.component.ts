import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptLiquidSwipe } from '@demo/shared';
import { } from '@nstudio/nativescript-liquid-swipe';

@Component({
	selector: 'demo-nativescript-liquid-swipe',
	templateUrl: 'nativescript-liquid-swipe.component.html',
})
export class NativescriptLiquidSwipeComponent {
  
  demoShared: DemoSharedNativescriptLiquidSwipe;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptLiquidSwipe();
  }

}