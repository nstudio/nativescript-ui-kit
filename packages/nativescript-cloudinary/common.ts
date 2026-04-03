import { Image, Property } from '@nativescript/core';
// import type { CloudinaryImage } from '@cloudinary/url-gen';
//import { SDKAnalyticsConstants } from './internal/SDKAnalyticsConstants';

export type ImageCloudinaryOptions = {
  src?: string;
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'scale' | 'thumb' | 'limit' | 'pad' | 'crop' | 'thumb';
  gravity?: 'face' | 'faces' | 'auto' | 'north_east' | 'north_west' | 'south_east' | 'south_west' | 'center';
  [key: string]: any; // for additional props
};
export const optionsProperty = new Property<ImageCloudinaryCommon, ImageCloudinaryOptions>({
  name: 'options',
});

export class ImageCloudinaryCommon extends Image {}

optionsProperty.register(ImageCloudinaryCommon);
