import { Observable, EventData, Page, getViewById } from '@nativescript/core';
import { DemoSharedNativescriptCoachmarks } from '@demo/shared';
import {} from '@nstudio/nativescript-coachmarks';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel(getViewById(page, 'first'), getViewById(page, 'second'), getViewById(page, 'third'));
}

export class DemoModel extends DemoSharedNativescriptCoachmarks {}
