import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptLabelMarquee } from '@demo/shared';
import { } from '@nstudio/nativescript-label-marquee';

@Component({
	selector: 'demo-nativescript-label-marquee',
	templateUrl: 'nativescript-label-marquee.component.html',
})
export class NativescriptLabelMarqueeComponent {
  
  demoShared: DemoSharedNativescriptLabelMarquee;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptLabelMarquee();
  }

}