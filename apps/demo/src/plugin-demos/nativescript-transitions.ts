import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptTransitions } from '@demo/shared';
import { } from '@nstudio/nativescript-transitions';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptTransitions {
	
}
