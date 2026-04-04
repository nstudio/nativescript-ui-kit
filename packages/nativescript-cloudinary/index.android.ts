import { Utils } from '@nativescript/core';
import { ImageCloudinaryCommon, ImageCloudinaryOptions, CloudinaryTransformation, optionsProperty, resolveTransformations } from './common';

export { CloudinaryTransformation, ImageCloudinaryOptions, CropMode, Gravity, ImageFormat } from './common';

export function init(cloudName: string, apiKey: string, apiSecret: string, secure = true) {
  const map = new java.util.HashMap<string, string>();
  map.put('cloud_name', cloudName);
  map.put('api_key', apiKey);
  map.put('api_secret', apiSecret);
  map.put('secure', secure ? 'true' : 'false');

  com.cloudinary.android.MediaManager.init(Utils.android.getApplicationContext(), map);
  if (ImageCloudinaryCommon.debug) console.log('Cloudinary initialized');
}

/**
 * Generate a Cloudinary URL programmatically without using the ImageCloudinary component.
 */
export function generateUrl(options: ImageCloudinaryOptions): string | null {
  if (!options?.src) {
    console.error('No source provided for generateUrl');
    return null;
  }
  const transformer = buildTransformer(options);
  const urlBuilder = com.cloudinary.android.MediaManager.get().url().transformation(transformer);
  if (options.resourceType) {
    urlBuilder.resourceType(options.resourceType);
  }
  if (options.type) {
    urlBuilder.type(options.type);
  }
  if (options.version) {
    urlBuilder.version(options.version);
  }
  if (options.extension) {
    urlBuilder.format(options.extension);
  }
  return urlBuilder.generate(options.src);
}

/** Convert a value to a string for safe passage to the Java Cloudinary SDK (which expects Object/String, not raw JS numbers). */
function str(value: any): string {
  return String(value);
}

function applyTransformation(transformer: any, t: CloudinaryTransformation): any {
  if (t.rawTransformation) {
    transformer.rawTransformation(t.rawTransformation);
    return transformer;
  }

  if (t.width != null) transformer.width(str(t.width));
  if (t.height != null) transformer.height(str(t.height));
  if (t.crop) transformer.crop(t.crop);
  if (t.gravity) transformer.gravity(t.gravity);
  if (t.aspectRatio != null) transformer.aspectRatio(str(t.aspectRatio));

  if (t.x != null) transformer.x(str(t.x));
  if (t.y != null) transformer.y(str(t.y));
  if (t.zoom != null) transformer.zoom(str(t.zoom));

  if (t.format) transformer.fetchFormat(t.format);
  if (t.fetchFormat) transformer.fetchFormat(t.fetchFormat);
  if (t.quality != null) transformer.quality(str(t.quality));
  if (t.dpr != null) transformer.dpr(str(t.dpr));

  if (t.effect) transformer.effect(t.effect);

  if (t.radius != null) transformer.radius(str(t.radius));
  if (t.border) transformer.border(t.border);
  if (t.background) transformer.background(t.background);
  if (t.color) transformer.color(t.color);
  if (t.colorSpace) transformer.colorSpace(t.colorSpace);

  if (t.angle != null) transformer.angle([str(t.angle)]);

  if (t.flags) {
    if (Array.isArray(t.flags)) {
      for (const f of t.flags) {
        transformer.flags(f);
      }
    } else {
      transformer.flags(t.flags);
    }
  }

  if (t.overlay) transformer.overlay(t.overlay);
  if (t.underlay) transformer.underlay(t.underlay);

  if (t.opacity != null) transformer.opacity(str(t.opacity));

  if (t.page != null) transformer.page(str(t.page));
  if (t.density != null) transformer.density(str(t.density));

  if (t.defaultImage) transformer.defaultImage(t.defaultImage);
  if (t.named) transformer.named(t.named);

  if (t.variables) {
    for (const [name, value] of Object.entries(t.variables)) {
      transformer.variable(name, str(value));
    }
  }

  return transformer;
}

function buildTransformer(options: ImageCloudinaryOptions): any {
  const transformer = new (com.cloudinary as any).Transformation();
  const { transformations, rawTransformation } = resolveTransformations(options);

  if (rawTransformation) {
    transformer.rawTransformation(rawTransformation);
    return transformer;
  }

  for (let i = 0; i < transformations.length; i++) {
    applyTransformation(transformer, transformations[i]);
    if (i < transformations.length - 1) {
      transformer.chain();
    }
  }

  return transformer;
}

export class ImageCloudinary extends ImageCloudinaryCommon {
  [optionsProperty.setNative](value: ImageCloudinaryOptions) {
    if (!value) {
      if (ImageCloudinaryCommon.debug) console.log('Options not provided');
      return;
    }
    if (!value.src) {
      if (ImageCloudinaryCommon.debug) console.log('No source provided for ImageCloudinary');
      return;
    }

    const transformer = buildTransformer(value);
    const urlBuilder = com.cloudinary.android.MediaManager.get().url().transformation(transformer);
    if (value.resourceType) {
      urlBuilder.resourceType(value.resourceType);
    }
    if (value.type) {
      urlBuilder.type(value.type);
    }
    if (value.version) {
      urlBuilder.version(value.version);
    }
    if (value.extension) {
      urlBuilder.format(value.extension);
    }
    const url = urlBuilder.generate(value.src);
    this.src = url;
  }
}
