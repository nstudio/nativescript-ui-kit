import { EventData, Page, Screen, GestureEventData, View } from '@nativescript/core';
import { DemoSharedNativescriptCloudinary } from '@demo/shared';
import { init } from '@nstudio/nativescript-cloudinary';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
  init(process.env.CLOUDINARY_CLOUD_NAME!, process.env.CLOUDINARY_API_KEY!, process.env.CLOUDINARY_API_SECRET!, true);
}

export function onCategoryTap(args: GestureEventData) {
  const view = <View>args.object;
  const category = view.bindingContext;
  const model = (<Page>view.page).bindingContext as DemoModel;
  const index = model.categories.indexOf(category);
  if (index >= 0) {
    model.selectCategory(index);
  }
}

export function onItemTap(args: GestureEventData) {
  const view = <View>args.object;
  const item = view.bindingContext;
  const model = (<Page>view.page).bindingContext as DemoModel;
  const items = model.currentItems;
  const index = items.indexOf(item);
  if (index >= 0) {
    model.selectItem(index);
  }
}

export class DemoModel extends DemoSharedNativescriptCloudinary {
  imageSize = Math.min(Screen.mainScreen.widthDIPs - 40, 600);
}
