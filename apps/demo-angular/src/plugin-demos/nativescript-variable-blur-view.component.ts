import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptVariableBlurView } from '@demo/shared';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { } from '@nstudio/nativescript-variable-blur-view';

@Component({
	selector: 'demo-nativescript-variable-blur-view',
	templateUrl: 'nativescript-variable-blur-view.component.html',
})
export class NativescriptVariableBlurViewComponent {
  
  demoShared: DemoSharedNativescriptVariableBlurView;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptVariableBlurView();
  }

}