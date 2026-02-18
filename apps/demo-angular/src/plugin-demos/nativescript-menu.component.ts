import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptMenu } from '@demo/shared';
import {} from '@nstudio/nativescript-menu';

@Component({
  selector: 'demo-nativescript-menu',
  templateUrl: 'nativescript-menu.component.html',
})
export class NativescriptMenuComponent {
  demoShared: DemoSharedNativescriptMenu;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptMenu();
  }
}
