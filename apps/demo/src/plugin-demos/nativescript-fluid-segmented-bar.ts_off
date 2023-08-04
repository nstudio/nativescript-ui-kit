import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptFluidSegmentedBar } from '@demo/shared';
import { } from '@nstudio/nativescript-fluid-segmented-bar';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.actionBarHidden = true;
	page.bindingContext = new DemoModel();
	page.bindingContext.page = page;
}

export class DemoModel extends DemoSharedNativescriptFluidSegmentedBar {
	
}
