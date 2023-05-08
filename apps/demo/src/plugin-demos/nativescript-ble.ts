import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptBle } from '@demo/shared';
import { } from '@nstudio/nativescript-ble';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptBle {
	
}
