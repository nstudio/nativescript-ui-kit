import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptLabelGlitch } from '@demo/shared';
import { } from '@nstudio/nativescript-label-glitch';

@Component({
	selector: 'demo-nativescript-label-glitch',
	templateUrl: 'nativescript-label-glitch.component.html',
})
export class NativescriptLabelGlitchComponent {
  
  demoShared: DemoSharedNativescriptLabelGlitch;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptLabelGlitch();
  }

}