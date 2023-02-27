import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptUiCharts } from '@demo/shared';
import { } from '@nstudio/nativescript-ui-charts';

@Component({
	selector: 'demo-nativescript-ui-charts',
	templateUrl: 'nativescript-ui-charts.component.html',
})
export class NativescriptUiChartsComponent {
  
  demoShared: DemoSharedNativescriptUiCharts;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptUiCharts();
  }

}