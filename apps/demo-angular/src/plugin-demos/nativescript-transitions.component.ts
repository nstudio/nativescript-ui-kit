import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptTransitions } from '@demo/shared';
import { } from '@nstudio/nativescript-transitions';

@Component({
	selector: 'demo-nativescript-transitions',
	templateUrl: 'nativescript-transitions.component.html',
})
export class NativescriptTransitionsComponent {
  
  demoShared: DemoSharedNativescriptTransitions;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptTransitions();
  }

}