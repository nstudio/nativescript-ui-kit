import { Observable, EventData, Page, ScrollEventData } from '@nativescript/core';
import { DemoSharedNativescriptParallax } from '@demo/shared';
import {} from '@nstudio/nativescript-parallax';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.actionBarHidden = true;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptParallax {
  onScroll(args: any) {
    var data = args.data as ScrollEventData;
    console.log('Scrolling: ' + args.direction + ' ' + data.scrollY);
  }

  onAnchored(args: any) {
    console.log('Anchored');
  }

  onUnAnchored(args: any) {
    console.log('UnAnchored');
  }
}
