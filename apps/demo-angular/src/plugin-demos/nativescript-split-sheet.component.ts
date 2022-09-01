import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptSplitSheet } from '@demo/shared';
import { } from '@nstudio/nativescript-split-sheet';

@Component({
	selector: 'demo-nativescript-split-sheet',
	templateUrl: 'nativescript-split-sheet.component.html',
})
export class NativescriptSplitSheetComponent {
  
  demoShared: DemoSharedNativescriptSplitSheet;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptSplitSheet();
  }

}