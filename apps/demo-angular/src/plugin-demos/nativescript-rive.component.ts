import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptRive } from '@demo/shared';
import { } from '@nstudio/nativescript-rive';

@Component({
	selector: 'demo-nativescript-rive',
	templateUrl: 'nativescript-rive.component.html',
})
export class NativescriptRiveComponent {
  
  demoShared: DemoSharedNativescriptRive;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptRive();
  }

}