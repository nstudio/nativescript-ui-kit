import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptHero } from '@demo/shared';
import { } from '@nstudio/nativescript-hero';

@Component({
	selector: 'demo-nativescript-hero',
	templateUrl: 'nativescript-hero.component.html',
})
export class NativescriptHeroComponent {
  
  demoShared: DemoSharedNativescriptHero;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptHero();
  }

}