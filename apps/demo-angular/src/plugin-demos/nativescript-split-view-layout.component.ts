import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptSplitViewLayout } from '@demo/shared';
import { } from '@nstudio/nativescript-split-view-layout';

@Component({
	selector: 'demo-nativescript-split-view-layout',
	templateUrl: 'nativescript-split-view-layout.component.html',
})
export class NativescriptSplitViewLayoutComponent {
  
  demoShared: DemoSharedNativescriptSplitViewLayout;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptSplitViewLayout();
  }

}