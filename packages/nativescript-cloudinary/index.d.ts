import { ImageCloudinaryCommon } from './common';
export { ImageCloudinaryOptions } from './common';
export function init(cloudName: string, apiKey: string, apiSecret: string, secure = true): void;

export declare class ImageCloudinary extends ImageCloudinaryCommon {}
