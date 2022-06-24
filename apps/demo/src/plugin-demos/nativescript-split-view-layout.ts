import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedSplitViewLayout } from '@demo/shared';
import { } from '@nstudio/nativescript-split-view-layout';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedSplitViewLayout {
	
}
