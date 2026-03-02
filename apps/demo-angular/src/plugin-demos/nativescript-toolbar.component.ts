import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptToolbar } from '@demo/shared';
import {} from '@nstudio/nativescript-toolbar';

@Component({
  selector: 'demo-nativescript-toolbar',
  templateUrl: 'nativescript-toolbar.component.html',
})
export class NativescriptToolbarComponent {
  demoShared: DemoSharedNativescriptToolbar;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptToolbar();
  }
}
