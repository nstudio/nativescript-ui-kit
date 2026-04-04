import { ImageCloudinaryCommon } from './common';
export { CloudinaryTransformation, ImageCloudinaryOptions, CropMode, Gravity, ImageFormat } from './common';

export function init(cloudName: string, apiKey: string, apiSecret: string, secure?: boolean): void;

export function generateUrl(options: ImageCloudinaryOptions): string | null;

export declare class ImageCloudinary extends ImageCloudinaryCommon {}
