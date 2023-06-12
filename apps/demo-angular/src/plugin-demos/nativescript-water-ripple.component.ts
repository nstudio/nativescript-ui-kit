import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptWaterRipple } from '@demo/shared';
import { } from '@nstudio/nativescript-water-ripple';

@Component({
	selector: 'demo-nativescript-water-ripple',
	templateUrl: 'nativescript-water-ripple.component.html',
})
export class NativescriptWaterRippleComponent {
  
  demoShared: DemoSharedNativescriptWaterRipple;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptWaterRipple();
  }

}