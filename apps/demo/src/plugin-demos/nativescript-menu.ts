import { EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptMenu } from '@demo/shared';
import {} from '@nstudio/nativescript-menu';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.actionBarHidden = true;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptMenu {}
