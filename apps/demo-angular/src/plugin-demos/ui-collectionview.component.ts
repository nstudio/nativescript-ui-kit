import { Component, NgZone } from '@angular/core';
import { DemoSharedUiCollectionview } from '@demo/shared';
import { Dialogs } from '@nativescript/core';
import { CollectionView } from '@nstudio/ui-collectionview';

interface Item {
  id: number
  name: string
  role: string
  subject?: string;
  body?: string;
  date?: Date;
}

@Component({
	selector: 'demo-ui-collectionview',
	templateUrl: 'ui-collectionview.component.html',
})
export class UiCollectionviewComponent {
  demoShared: DemoSharedUiCollectionview;

  ngOnInit() {
    this.demoShared = new DemoSharedUiCollectionview();
    console.log('demoShared', this.demoShared);
  }
}