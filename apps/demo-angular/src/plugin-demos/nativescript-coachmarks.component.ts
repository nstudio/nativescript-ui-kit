import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptCoachmarks } from '@demo/shared';
import { } from '@nstudio/nativescript-coachmarks';

@Component({
	selector: 'demo-nativescript-coachmarks',
	templateUrl: 'nativescript-coachmarks.component.html',
})
export class NativescriptCoachmarksComponent {
  
  demoShared: DemoSharedNativescriptCoachmarks;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptCoachmarks();
  }

}