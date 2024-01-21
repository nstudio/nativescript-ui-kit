import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptLiquidSwipe } from '@demo/shared';
import { } from '@nstudio/nativescript-liquid-swipe';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptLiquidSwipe {
	
}
