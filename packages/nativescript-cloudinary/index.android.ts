import { Utils } from '@nativescript/core';
import { ImageCloudinaryCommon, ImageCloudinaryOptions, optionsProperty } from './common';

export function init(cloudName: string, apiKey: string, apiSecret: string, secure = true) {
  const map = new java.util.HashMap<string, string>();
  map.put('cloud_name', cloudName);
  map.put('api_key', apiKey);
  map.put('api_secret', apiSecret);
  map.put('secure', secure ? 'true' : 'false');

  com.cloudinary.android.MediaManager.init(Utils.android.getApplicationContext(), map);
  console.log('Cloudinary initialized');
}

export class ImageCloudinary extends ImageCloudinaryCommon {
  transformer: ReturnType<typeof com.cloudinary.android.CloudinaryRequest.prototype.getTransformation>;

  [optionsProperty.setNative](value: ImageCloudinaryOptions) {
    this.transformer = new (com.cloudinary as any).Transformation();
    if (this.transformer && value) {
      for (const key in value) {
        switch (key) {
          case 'width':
            this.transformer.width(new java.lang.Integer(`${value.width}`));
            break;
          case 'height':
            this.transformer.height(new java.lang.Integer(`${value.height}`));
            break;
          case 'crop':
            this.transformer.crop(value.crop);
            break;
          case 'gravity':
            this.transformer.gravity(value.gravity);
            break;
          case 'effect':
            this.transformer.effect(value.effect);
            break;
          case 'radius':
            this.transformer.radius(new java.lang.Integer(`${value.radius}`));
            break;
        }
      }
      if (!value.src) {
        console.log('No source provided for ImageCloudinary');
        return;
      }
      const url = com.cloudinary.android.MediaManager.get().url().transformation(this.transformer).generate(value.src);
      this.src = url;
      console.log('Generated URL:', url);
    } else {
      console.log('Cloudinary not initialized or options not provided');
    }
  }
}
