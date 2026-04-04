import { Image, Property } from '@nativescript/core';

// Crop Modes
export type CropMode = 'fill' | 'fit' | 'scale' | 'thumb' | 'limit' | 'pad' | 'crop' | 'lfill' | 'fill_pad' | 'mfit' | 'mpad' | 'lpad' | 'auto' | 'auto_pad' | 'imagga_crop';

// Gravity
export type Gravity = 'auto' | 'face' | 'faces' | 'center' | 'north' | 'south' | 'east' | 'west' | 'north_east' | 'north_west' | 'south_east' | 'south_west' | 'xy_center' | 'adv_eyes' | (string & {});

// Image Format
export type ImageFormat = 'auto' | 'jpg' | 'png' | 'webp' | 'avif' | 'gif' | 'heic' | 'svg' | 'bmp' | 'tiff' | (string & {});

/**
 * A single transformation component.
 * Multiple components can be chained via the `transformations` array in ImageCloudinaryOptions.
 * Each component maps to one URL segment separated by `/`.
 */
export interface CloudinaryTransformation {
  // Resize & Crop
  width?: number | string;
  height?: number | string;
  crop?: CropMode;
  aspectRatio?: string | number;

  // Positioning & Gravity
  gravity?: Gravity;
  x?: number | string;
  y?: number | string;
  zoom?: number | string;

  // Format & Quality
  format?: ImageFormat;
  quality?: string | number;
  dpr?: string | number;
  fetchFormat?: string;

  // Effects
  effect?: string;

  // Borders, Rounding, Background
  radius?: number | string;
  border?: string;
  background?: string;
  color?: string;
  colorSpace?: string;

  // Rotation
  angle?: number | string;

  // Flags
  flags?: string | string[];

  // Overlays & Underlays
  overlay?: string;
  underlay?: string;

  // Opacity
  opacity?: number | string;

  // Page / Density
  page?: number | string;
  density?: number | string;

  // Default Image
  defaultImage?: string;

  // Named Transformation
  named?: string;

  // Variables
  variables?: Record<string, string | number>;

  // Raw transformation string (appended as-is)
  rawTransformation?: string;
}

/**
 * Options for the ImageCloudinary component.
 *
 * Three usage modes (in order of priority):
 * 1. `rawTransformation` – full URL transformation string, passed directly to the SDK
 * 2. `transformations` – array of CloudinaryTransformation objects (chained components)
 * 3. Top-level shorthand properties (width, height, crop, etc.) – single transformation
 */
export interface ImageCloudinaryOptions {
  /** Cloudinary public ID of the asset */
  src: string;

  /** Resource type (default: 'image') */
  resourceType?: 'image' | 'video' | 'raw' | 'auto';

  /** Delivery type (default: 'upload') */
  type?: 'upload' | 'fetch' | 'private' | 'authenticated';

  /** Version string (e.g. 'v1685472103') */
  version?: string;

  /** File extension override */
  extension?: string;

  // Chained transformations
  transformations?: CloudinaryTransformation[];

  // Raw URL transformation string
  rawTransformation?: string;

  // Top-level shorthand (single transformation)
  width?: number | string;
  height?: number | string;
  crop?: CropMode;
  gravity?: Gravity;
  effect?: string;
  radius?: number | string;
  format?: ImageFormat;
  quality?: string | number;
  dpr?: string | number;
  background?: string;
  border?: string;
  color?: string;
  angle?: number | string;
  opacity?: number | string;
  overlay?: string;
  underlay?: string;
  flags?: string | string[];
  aspectRatio?: string | number;
  defaultImage?: string;
  fetchFormat?: string;
  zoom?: number | string;
  x?: number | string;
  y?: number | string;
  page?: number | string;
  density?: number | string;
  named?: string;
}

export const optionsProperty = new Property<ImageCloudinaryCommon, ImageCloudinaryOptions>({
  name: 'options',
});

export class ImageCloudinaryCommon extends Image {
  static debug = false;
}

optionsProperty.register(ImageCloudinaryCommon);

// Helpers

/** Keys that are part of ImageCloudinaryOptions metadata, not transformation params */
const META_KEYS = new Set(['src', 'resourceType', 'type', 'version', 'extension', 'transformations', 'rawTransformation']);

/**
 * Extract a single CloudinaryTransformation from the top-level shorthand properties.
 */
export function extractTopLevelTransformation(options: ImageCloudinaryOptions): CloudinaryTransformation {
  const t: CloudinaryTransformation = {};
  for (const key of Object.keys(options)) {
    if (!META_KEYS.has(key)) {
      (t as any)[key] = (options as any)[key];
    }
  }
  return t;
}

/**
 * Resolve the ordered list of transformations from options.
 * Priority: rawTransformation > transformations array > top-level shorthand
 */
export function resolveTransformations(options: ImageCloudinaryOptions): { transformations: CloudinaryTransformation[]; rawTransformation?: string } {
  if (options.rawTransformation) {
    return { transformations: [], rawTransformation: options.rawTransformation };
  }
  if (options.transformations?.length) {
    return { transformations: options.transformations };
  }
  const single = extractTopLevelTransformation(options);
  if (Object.keys(single).length > 0) {
    return { transformations: [single] };
  }
  return { transformations: [] };
}
