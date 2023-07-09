import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptSmartlook } from '@demo/shared';
// import { } from '@nstudio/nativescript-smartlook';

@Component({
	selector: 'demo-nativescript-smartlook',
	templateUrl: 'nativescript-smartlook.component.html',
})
export class NativescriptSmartlookComponent {
  
  demoShared: DemoSharedNativescriptSmartlook;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptSmartlook();
  }

}