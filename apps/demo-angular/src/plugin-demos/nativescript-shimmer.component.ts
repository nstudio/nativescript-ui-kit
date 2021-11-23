import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptShimmer } from '@demo/shared';
import { } from '@nstudio/nativescript-shimmer';

@Component({
	selector: 'demo-nativescript-shimmer',
	templateUrl: 'nativescript-shimmer.component.html',
})
export class NativescriptShimmerComponent {
  
  demoShared: DemoSharedNativescriptShimmer;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptShimmer();
  }

}