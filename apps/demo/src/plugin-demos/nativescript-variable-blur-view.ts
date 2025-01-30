import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptVariableBlurView } from '@demo/shared';
import {} from '@nstudio/nativescript-variable-blur-view';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  // page.actionBarHidden = true;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptVariableBlurView {}
