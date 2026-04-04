import { ImageCloudinaryCommon, ImageCloudinaryOptions, CloudinaryTransformation, optionsProperty, resolveTransformations } from './common';

export { CloudinaryTransformation, ImageCloudinaryOptions, CropMode, Gravity, ImageFormat } from './common';

let config: CLDConfiguration;
let cloudinary: CLDCloudinary;

export function init(cloudName: string, apiKey: string, apiSecret: string, secure = true) {
  config = CLDConfiguration.alloc().initWithCloudNameApiKeyApiSecretPrivateCdnSecureCdnSubdomainSecureCdnSubdomainLongUrlSignatureSignatureAlgorithmSignatureVersionSecureDistributionCnameUploadPrefixTimeoutAnalytics(cloudName, apiKey, apiSecret, false, secure, false, false, false, SignatureAlgorithm.Sha256, 1, null as any, null as any, null as any, 60, true);

  cloudinary = CLDCloudinary.alloc().initWithConfigurationNetworkAdapterSessionConfiguration(config, null as any, NSURLSessionConfiguration.defaultSessionConfiguration);
  if (ImageCloudinaryCommon.debug) console.log('Cloudinary initialized');
}

/**
 * Generate a Cloudinary URL programmatically without using the ImageCloudinary component.
 */
export function generateUrl(options: ImageCloudinaryOptions): string | null {
  if (!cloudinary) {
    console.error('Cloudinary not initialized. Call init() first.');
    return null;
  }
  if (!options?.src) {
    console.error('No source provided for generateUrl');
    return null;
  }
  const transformer = buildTransformer(options);
  const urlBuilder = cloudinary.createUrl().setTransformation(transformer);
  if (options.resourceType) {
    urlBuilder.setResourceType(options.resourceType);
  }
  if (options.type) {
    urlBuilder.setType(options.type);
  }
  if (options.version) {
    urlBuilder.setVersion(options.version);
  }
  if (options.extension) {
    urlBuilder.setFormat(options.extension);
  }
  return urlBuilder.generateSignUrl(options.src, false);
}

function applyTransformation(transformer: CLDTransformation, t: CloudinaryTransformation): CLDTransformation {
  if (t.rawTransformation) {
    transformer.setRawTransformation(t.rawTransformation);
    return transformer;
  }

  if (t.width != null) transformer.setWidth(`${t.width}`);
  if (t.height != null) transformer.setHeight(`${t.height}`);
  if (t.crop) transformer.setCrop(t.crop);
  if (t.gravity) transformer.setGravity(t.gravity);
  if (t.aspectRatio != null) transformer.setAspectRatio(`${t.aspectRatio}`);

  if (t.x != null) transformer.setX(`${t.x}`);
  if (t.y != null) transformer.setY(`${t.y}`);
  if (t.zoom != null) transformer.setZoom(`${t.zoom}`);

  if (t.format) transformer.setFetchFormat(t.format);
  if (t.fetchFormat) transformer.setFetchFormat(t.fetchFormat);
  if (t.quality != null) transformer.setQuality(`${t.quality}`);
  if (t.dpr != null) transformer.setDpr(`${t.dpr}`);

  if (t.effect) transformer.setEffect(t.effect);

  if (t.radius != null) transformer.setRadius(`${t.radius}`);
  if (t.border) transformer.setBorder(t.border);
  if (t.background) transformer.setBackground(t.background);
  if (t.color) transformer.setColor(t.color);
  if (t.colorSpace) transformer.setColorSpace(t.colorSpace);

  if (t.angle != null) transformer.setAngle(`${t.angle}`);

  if (t.flags) {
    if (Array.isArray(t.flags)) {
      transformer.setFlagsWithArray(t.flags);
    } else {
      transformer.setFlags(t.flags);
    }
  }

  if (t.overlay) transformer.setOverlay(t.overlay);
  if (t.underlay) transformer.setUnderlay(t.underlay);

  if (t.opacity != null) transformer.setOpacity(`${t.opacity}`);

  if (t.page != null) transformer.setPage(`${t.page}`);
  if (t.density != null) transformer.setDensity(`${t.density}`);

  if (t.defaultImage) transformer.setDefaultImage(t.defaultImage);
  if (t.named) transformer.setNamed(t.named);

  if (t.variables) {
    for (const [name, value] of Object.entries(t.variables)) {
      transformer.setVariableString(name, `${value}`);
    }
  }

  return transformer;
}

function buildTransformer(options: ImageCloudinaryOptions): CLDTransformation {
  const transformer = CLDTransformation.alloc().init();
  const { transformations, rawTransformation } = resolveTransformations(options);

  if (rawTransformation) {
    transformer.setRawTransformation(rawTransformation);
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
    if (!cloudinary || !value) {
      if (ImageCloudinaryCommon.debug) console.log('Cloudinary not initialized or options not provided');
      return;
    }
    if (!value.src) {
      if (ImageCloudinaryCommon.debug) console.log('No source provided for ImageCloudinary');
      return;
    }

    const transformer = buildTransformer(value);
    const urlBuilder = cloudinary.createUrl().setTransformation(transformer);
    if (value.resourceType) {
      urlBuilder.setResourceType(value.resourceType);
    }
    if (value.type) {
      urlBuilder.setType(value.type);
    }
    if (value.version) {
      urlBuilder.setVersion(value.version);
    }
    if (value.extension) {
      urlBuilder.setFormat(value.extension);
    }
    const url = urlBuilder.generateSignUrl(value.src, false);
    this.src = url;
  }
}
