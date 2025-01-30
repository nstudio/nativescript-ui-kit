import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptSmartlook } from '@demo/shared';
import {} from '@nstudio/nativescript-smartlook';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptSmartlook {}
