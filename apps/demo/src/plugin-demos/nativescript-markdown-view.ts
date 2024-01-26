import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptMarkdownView } from '@demo/shared';
import { } from '@nstudio/nativescript-markdown-view';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptMarkdownView {
	
}
