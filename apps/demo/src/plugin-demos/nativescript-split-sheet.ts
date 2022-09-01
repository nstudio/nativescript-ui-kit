import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptSplitSheet } from '@demo/shared';
import { SplitSheet } from '@nstudio/nativescript-split-sheet';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptSplitSheet {
  sheetOpen = false;
  private splitSheet: SplitSheet;
  loadedSplitSheet(args) {
    this.splitSheet = args.object;
  }
  loadedImage(args) {
    // console.log('loaded image:', args.object.ios);
    const imageView = <UIImageView>args.object.ios;
    imageView.contentMode = UIViewContentMode.ScaleAspectFill;
    imageView.clipsToBounds = true;
    (<any>imageView).pinEdgesToSuperview();
  }

  openSheet() {
    this.sheetOpen = !this.sheetOpen;
    this.notifyPropertyChange('sheetOpen', this.sheetOpen);
    if (this.sheetOpen) {
      this.splitSheet.openSheet();
    } else {
      this.splitSheet.closeSheet();
    }
  }
}
