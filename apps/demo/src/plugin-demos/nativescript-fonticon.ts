import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptFonticon } from '@demo/shared';
import { } from 'nativescript-fonticon';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptFonticon {
	
}
