import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptCalendar } from '@demo/shared';
import { registerElement } from '@nativescript/angular';
import { NCalendar } from '@nstudio/nativescript-calendar';

registerElement('NCalendar', () => NCalendar);

@Component({
  selector: 'demo-nativescript-calendar',
  templateUrl: 'nativescript-calendar.component.html',
})
export class NativescriptCalendarComponent {
  demoShared: DemoSharedNativescriptCalendar;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptCalendar();
  }
}
