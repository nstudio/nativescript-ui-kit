import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptFluidSegmentedBar } from '@demo/shared';
import { } from '@nstudio/nativescript-fluid-segmented-bar';

@Component({
	selector: 'demo-nativescript-fluid-segmented-bar',
	templateUrl: 'nativescript-fluid-segmented-bar.component.html',
})
export class NativescriptFluidSegmentedBarComponent {
  
  demoShared: DemoSharedNativescriptFluidSegmentedBar;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptFluidSegmentedBar();
  }

}