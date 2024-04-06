import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptParallax } from '@demo/shared';
import {} from '@nstudio/nativescript-parallax';

@Component({
  selector: 'demo-nativescript-parallax',
  templateUrl: 'nativescript-parallax.component.html',
})
export class NativescriptParallaxComponent {
  demoShared: DemoSharedNativescriptParallax;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptParallax();
  }
}
