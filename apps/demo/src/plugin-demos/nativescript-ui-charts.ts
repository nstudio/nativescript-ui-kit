import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptUiCharts } from '@demo/shared';
import { } from '@nstudio/nativescript-ui-charts';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptUiCharts {
	
}
