import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptBle } from '@demo/shared';
import { } from '@nstudio/nativescript-ble';

@Component({
	selector: 'demo-nativescript-ble',
	templateUrl: 'nativescript-ble.component.html',
})
export class NativescriptBleComponent {
  
  demoShared: DemoSharedNativescriptBle;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptBle();
  }

}