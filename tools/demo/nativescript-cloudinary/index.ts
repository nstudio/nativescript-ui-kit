import { DemoSharedBase } from '../utils';
import { ImageCloudinaryOptions } from '@nstudio/nativescript-cloudinary';

export class DemoSharedNativescriptCloudinary extends DemoSharedBase {
  options: ImageCloudinaryOptions = {
    src: 'sample',
    width: 300,
    height: 300,
    effect: 'sepia',
    radius: 20,
    //crop: 'fill',
    //gravity: 'auto',
  };
}
