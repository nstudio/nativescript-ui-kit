import { Observable, EventData, Page, getViewById } from '@nativescript/core';
import { DemoSharedNativescriptCoachmarks } from '@demo/shared';
import {} from '@nstudio/nativescript-coachmarks';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  const demo = new DemoModel(getViewById(page, 'first'), getViewById(page, 'second'), getViewById(page, 'third'));
  demo.page = page;
  page.bindingContext = demo;
}

export class DemoModel extends DemoSharedNativescriptCoachmarks {}
