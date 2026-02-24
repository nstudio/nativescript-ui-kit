import { Observable, EventData, Page, View, ScrollView, GridLayout } from '@nativescript/core';
import { DemoSharedNativescriptRichPaste } from '@demo/shared';
import {} from '@nstudio/nativescript-rich-paste';

let model: DemoModel;

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  model = new DemoModel();
  page.bindingContext = model;
}

export function onRemoveImage(args: EventData) {
  const item = (args.object as View).bindingContext;
  const idx = model.pastedImages.indexOf(item);
  if (idx >= 0) {
    model.pastedImages.splice(idx, 1);
    if (model.pastedImages.length === 0) {
      model.set('showImages', false);
    }
  }
}

export class DemoModel extends DemoSharedNativescriptRichPaste {
  inputClasses = `rounded-full py-4 pl-6 text-2xl ${__ANDROID__ ? 'bg-white/10' : ''}`;
  loadedImageScroller(args) {
    const scroller = args.object as ScrollView;
  }
}

export function loadedRemoveButton(args: EventData) {
  androidToggleClipping(args, false);
}

function androidToggleClipping(event: EventData, enable = true) {
  if (__ANDROID__ && event?.object) {
    const nativeView = (event.object as View).nativeView;
    if (!nativeView) {
      return;
    }
    nativeView.setClipChildren?.(enable);
    nativeView.setClipToPadding?.(enable);

    const parent = nativeView.getParent();
    if (!parent) {
      return;
    }
    parent.setClipChildren?.(enable);
    parent.setClipToPadding?.(enable);

    const grand = parent.getParent();
    if (!grand) {
      return;
    }
    grand.setClipChildren?.(enable);
    grand.setClipToPadding?.(enable);
  }
}
