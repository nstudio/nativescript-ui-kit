import { DemoSharedBase } from '../utils';
import { ImageCloudinaryOptions } from '@nstudio/nativescript-cloudinary';

interface DemoItem {
  title: string;
  description: string;
  options: ImageCloudinaryOptions;
}

interface DemoCategory {
  name: string;
  items: DemoItem[];
}

export class DemoSharedNativescriptCloudinary extends DemoSharedBase {
  categories: DemoCategory[] = [
    {
      name: 'Resize & Crop',
      items: [
        {
          title: 'Scale',
          description: 'Scale to width, maintain aspect ratio',
          options: { src: 'cld-sample', width: 900, crop: 'scale' },
        },
        {
          title: 'Fill + Face',
          description: 'Fill 300x300 with face detection gravity',
          options: { src: 'cld-sample', width: 900, height: 900, crop: 'fill', gravity: 'face' },
        },
        {
          title: 'Thumb',
          description: 'Smart thumbnail with auto gravity',
          options: { src: 'cld-sample', width: 900, height: 900, crop: 'thumb', gravity: 'auto' },
        },
        {
          title: 'Fit',
          description: 'Fit within 300x200 bounding box',
          options: { src: 'cld-sample', width: 900, height: 200, crop: 'fit' },
        },
        {
          title: 'Pad',
          description: 'Pad to 300x300 with blurred background',
          options: { src: 'cld-sample', width: 900, height: 900, crop: 'pad', background: 'auto:border' },
        },
        {
          title: 'Limit',
          description: 'Limit to max 300px, no upscale',
          options: { src: 'cld-sample', width: 900, crop: 'limit' },
        },
      ],
    },
    {
      name: 'Effects & Filters',
      items: [
        {
          title: 'Sepia',
          description: 'Classic sepia tone',
          options: { src: 'cld-sample', width: 900, crop: 'scale', effect: 'sepia' },
        },
        {
          title: 'Grayscale',
          description: 'Black and white',
          options: { src: 'cld-sample', width: 900, crop: 'scale', effect: 'grayscale' },
        },
        {
          title: 'Blur',
          description: 'Gaussian blur (strength 800)',
          options: { src: 'cld-sample', width: 900, crop: 'scale', effect: 'blur:800' },
        },
        {
          title: 'Cartoonify',
          description: 'Cartoon effect',
          options: { src: 'cld-sample', width: 900, crop: 'scale', effect: 'cartoonify' },
        },
        {
          title: 'Pixelate',
          description: 'Pixelation effect',
          options: { src: 'cld-sample', width: 900, crop: 'scale', effect: 'pixelate:10' },
        },
        {
          title: 'Sharpen',
          description: 'Sharpen the image',
          options: { src: 'cld-sample', width: 900, crop: 'scale', effect: 'sharpen:200' },
        },
        {
          title: 'Oil Paint',
          description: 'Oil painting effect',
          options: { src: 'cld-sample', width: 900, crop: 'scale', effect: 'oil_paint:60' },
        },
        {
          title: 'Vignette',
          description: 'Vignette darkening effect',
          options: { src: 'cld-sample', width: 900, crop: 'scale', effect: 'vignette:80' },
        },
      ],
    },
    {
      name: 'Borders & Rounding',
      items: [
        {
          title: 'Circle',
          description: 'Circle crop with radius max',
          options: { src: 'cld-sample', width: 900, height: 900, crop: 'fill', gravity: 'face', radius: 'max' },
        },
        {
          title: 'Rounded',
          description: 'Rounded corners (30px)',
          options: { src: 'cld-sample', width: 900, height: 900, crop: 'fill', radius: 30 },
        },
        {
          title: 'Border',
          description: '5px solid blue border with rounded corners',
          options: { src: 'cld-sample', width: 900, height: 900, crop: 'fill', border: '5px_solid_rgb:0066ff', radius: 20 },
        },
      ],
    },
    {
      name: 'Rotation & Flips',
      items: [
        {
          title: 'Rotate 45',
          description: 'Rotate 45 degrees',
          options: { src: 'cld-sample', width: 900, crop: 'scale', angle: 45 },
        },
        {
          title: 'Rotate 90',
          description: 'Rotate 90 degrees',
          options: { src: 'cld-sample', width: 900, crop: 'scale', angle: 90 },
        },
        {
          title: 'Flip',
          description: 'Horizontal flip',
          options: { src: 'cld-sample', width: 900, crop: 'scale', angle: 'hflip' },
        },
      ],
    },
    {
      name: 'Overlays',
      items: [
        {
          title: 'Text Overlay',
          description: 'Text overlay via chained transforms',
          options: {
            src: 'cld-sample',
            transformations: [
              { width: 900, height: 900, crop: 'fill', gravity: 'auto' },
              { overlay: 'text:Arial_50_bold:NativeScript', gravity: 'south', y: 20, color: 'white', effect: 'shadow' },
            ],
          },
        },
        {
          title: 'Image Overlay',
          description: 'Cloudinary logo overlay',
          options: {
            src: 'cld-sample',
            transformations: [
              { width: 900, height: 900, crop: 'fill' },
              { overlay: 'cloudinary_icon_white', gravity: 'south_east', width: 100, x: 20, y: 20, opacity: 80, crop: 'scale' },
            ],
          },
        },
      ],
    },
    {
      name: 'Chained Transformations',
      items: [
        {
          title: 'Multi-step',
          description: 'Fill + sepia + round + optimize',
          options: {
            src: 'cld-sample',
            transformations: [{ width: 900, height: 900, crop: 'fill', gravity: 'auto' }, { effect: 'sepia' }, { radius: 'max' }, { format: 'auto' }, { quality: 'auto' }],
          },
        },
        {
          title: 'Artistic',
          description: 'Thumb + vignette + border',
          options: {
            src: 'cld-sample',
            transformations: [{ width: 900, height: 900, crop: 'thumb', gravity: 'face' }, { effect: 'vignette:60' }, { border: '3px_solid_rgb:333333', radius: 10 }, { format: 'auto', quality: 'auto' }],
          },
        },
      ],
    },
    {
      name: 'Raw Transformations',
      items: [
        {
          title: 'Raw URL String',
          description: 'Full control via raw transformation string',
          options: {
            src: 'cld-sample',
            rawTransformation: 'c_thumb,g_face,h_300,w_300/r_max/e_grayscale/f_auto/q_auto',
          },
        },
        {
          title: 'Conditional',
          description: 'Resize based on original width',
          options: {
            src: 'cld-sample',
            rawTransformation: 'if_w_gt_500/c_scale,w_300/if_end/f_auto/q_auto',
          },
        },
      ],
    },
  ];

  selectedCategory = 0;
  selectedItem = 0;

  get currentOptions(): ImageCloudinaryOptions {
    return this.categories[this.selectedCategory]?.items[this.selectedItem]?.options;
  }

  get currentTitle(): string {
    return this.categories[this.selectedCategory]?.items[this.selectedItem]?.title || '';
  }

  get currentDescription(): string {
    return this.categories[this.selectedCategory]?.items[this.selectedItem]?.description || '';
  }

  get currentCategoryName(): string {
    return this.categories[this.selectedCategory]?.name || '';
  }

  selectCategory(index: number) {
    this.selectedCategory = index;
    this.selectedItem = 0;
    this.notifyPropertyChange('selectedCategory', index);
    this.notifyPropertyChange('selectedItem', 0);
    this.notifyPropertyChange('currentOptions', this.currentOptions);
    this.notifyPropertyChange('currentTitle', this.currentTitle);
    this.notifyPropertyChange('currentDescription', this.currentDescription);
    this.notifyPropertyChange('currentCategoryName', this.currentCategoryName);
    this.notifyPropertyChange('currentItems', this.currentItems);
  }

  selectItem(index: number) {
    this.selectedItem = index;
    this.notifyPropertyChange('selectedItem', index);
    this.notifyPropertyChange('currentOptions', this.currentOptions);
    this.notifyPropertyChange('currentTitle', this.currentTitle);
    this.notifyPropertyChange('currentDescription', this.currentDescription);
  }

  get currentItems() {
    return this.categories[this.selectedCategory]?.items || [];
  }
}
