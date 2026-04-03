import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptCloudinary } from '@demo/shared';
import {} from '@nstudio/nativescript-cloudinary';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptCloudinary {}
