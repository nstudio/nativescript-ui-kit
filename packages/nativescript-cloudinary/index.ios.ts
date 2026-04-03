import { ImageCloudinaryCommon, ImageCloudinaryOptions, optionsProperty } from './common';

let config: CLDConfiguration;
let cloudinary: CLDCloudinary;

export function init(cloudName: string, apiKey: string, apiSecret: string, secure = true) {
  // @ts-expect-error
  config = CLDConfiguration.alloc().initWithCloudNameApiKeyApiSecretPrivateCdnSecureCdnSubdomainSecureCdnSubdomainLongUrlSignatureSignatureAlgorithmSignatureVersionSecureDistributionCnameUploadPrefixTimeoutAnalytics(cloudName, apiKey, apiSecret, false, secure, false, false, false, SignatureAlgorithm.Sha256, 1, null, null, null, 60, true);

  // @ts-expect-error
  cloudinary = CLDCloudinary.alloc().initWithConfigurationNetworkAdapterSessionConfiguration(config, null, NSURLSessionConfiguration.defaultSessionConfiguration);
  console.log('Cloudinary initialized', cloudinary);
}

export class ImageCloudinary extends ImageCloudinaryCommon {
  transformer: CLDTransformation | null = null;

  [optionsProperty.setNative](value: ImageCloudinaryOptions) {
    if (!this.transformer) {
      this.transformer = CLDTransformation.alloc().init();
    }
    if (cloudinary && value) {
      for (const key in value) {
        switch (key) {
          case 'width':
            this.transformer.setWidth(`${value.width}`);
            break;
          case 'height':
            this.transformer.setHeight(`${value.height}`);
            break;
          case 'crop':
            this.transformer.setCrop(value.crop!);
            break;
          case 'gravity':
            this.transformer.setGravity(value.gravity!);
            break;
          case 'effect':
            this.transformer.setEffect(value.effect);
            break;
          case 'radius':
            this.transformer.setRadius(`${value.radius}`);
            break;
        }
      }
      if (!value.src) {
        console.log('No source provided for ImageCloudinary');
        return;
      }
      const url = cloudinary.createUrl().setTransformation(this.transformer).generateSignUrl(value.src, false);
      this.src = url;
      console.log('Generated URL:', url);
    } else {
      console.log('Cloudinary not initialized or options not provided');
    }
  }
}
