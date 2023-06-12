import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptWaterRipple } from '@demo/shared';
import {} from '@nstudio/nativescript-water-ripple';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.actionBarHidden = true;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptWaterRipple {
  
}
