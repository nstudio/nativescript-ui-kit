import { Component, NgZone } from '@angular/core';
import { DemoSharedUiCollectionview } from '@demo/shared';
import { } from '@nstudio/ui-collectionview';

@Component({
	selector: 'demo-ui-collectionview',
	templateUrl: 'ui-collectionview.component.html',
})
export class UiCollectionviewComponent {
  
  demoShared: DemoSharedUiCollectionview;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedUiCollectionview();
  }

}