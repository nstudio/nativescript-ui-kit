import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptShimmer } from '@demo/shared';
import { } from '@nstudio/nativescript-shimmer';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptShimmer {
	
}
