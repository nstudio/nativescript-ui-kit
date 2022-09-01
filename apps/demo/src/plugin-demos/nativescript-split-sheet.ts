import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptSplitSheet } from '@demo/shared';
import { } from '@nstudio/nativescript-split-sheet';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptSplitSheet {
	
}
