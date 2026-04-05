import { EventData, Page, Screen, GestureEventData, View, ObservableArray } from '@nativescript/core';
import { DemoSharedNativescriptCloudinary } from '@demo/shared';
import { ImageCloudinaryOptions, init } from '@nstudio/nativescript-cloudinary';

const gallerySources = ['coffee', 'balloons', 'shoe', 'beach-boat', 'bicycle', 'three-dogs', 'bike', 'shoes', 'sheep'];

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
  init(process.env.CLOUDINARY_CLOUD_NAME!, process.env.CLOUDINARY_API_KEY!, process.env.CLOUDINARY_API_SECRET!, true);
}

export function loadUnoptimized(args: GestureEventData) {
  const model = (<Page>(<View>args.object).page).bindingContext as DemoModel;
  model.setGalleryOptimized(false);
}

export function loadOptimized(args: GestureEventData) {
  const model = (<Page>(<View>args.object).page).bindingContext as DemoModel;
  model.setGalleryOptimized(true);
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

  // Gallery: 6 columns on iPad, calculate item size with margins
  galleryItemSize = Math.floor((Screen.mainScreen.widthDIPs - 16 - 8 * 6) / 6);

  galleryImages = new ObservableArray<{ options: ImageCloudinaryOptions; size: number }>(
    gallerySources.map((src) => ({
      options: { src, width: 4000, height: 4000, crop: 'fill' } as ImageCloudinaryOptions,
      size: this.galleryItemSize,
    })),
  );

  setGalleryOptimized(optimized: boolean) {
    const displaySize = this.galleryItemSize * 2; // 2x for retina
    for (let i = 0; i < gallerySources.length; i++) {
      const options: ImageCloudinaryOptions = optimized ? { src: gallerySources[i], width: displaySize, height: displaySize, crop: 'fill', gravity: 'auto', quality: 'auto', format: 'auto' } : { src: gallerySources[i], width: 4000, height: 4000 };
      this.galleryImages.setItem(i, { options, size: this.galleryItemSize });
    }
  }
}
