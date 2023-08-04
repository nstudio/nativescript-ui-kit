import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptLabelGlitch } from '@demo/shared';
import { } from '@nstudio/nativescript-label-glitch';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.actionBarHidden = true;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptLabelGlitch {
	
}
