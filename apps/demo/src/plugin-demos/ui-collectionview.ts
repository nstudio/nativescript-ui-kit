import { Observable, EventData, Page, Utils } from '@nativescript/core';
import { DemoSharedUiCollectionview } from '@demo/shared';
import { CollectionView } from '@nstudio/ui-collectionview';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedUiCollectionview {
}
