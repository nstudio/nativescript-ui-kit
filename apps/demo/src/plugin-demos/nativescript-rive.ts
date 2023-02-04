import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptRive } from '@demo/shared';
import { } from '@nstudio/nativescript-rive';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptRive {
	
}
