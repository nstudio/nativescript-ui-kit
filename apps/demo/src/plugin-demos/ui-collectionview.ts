import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedUiCollectionview } from '@demo/shared';
import { } from '@nstudio/ui-collectionview';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedUiCollectionview {
	
}
