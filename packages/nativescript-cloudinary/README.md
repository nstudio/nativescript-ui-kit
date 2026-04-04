# @nstudio/nativescript-cloudinary

NativeScript plugin for displaying Cloudinary-hosted images with native SDK-powered URL generation on both iOS and Android.

```bash
npm install @nstudio/nativescript-cloudinary
```

Compatible with Angular, React, Solid, Svelte, and Vue.

## Setup

Initialize Cloudinary before using any components or APIs (e.g., in your app's entry point):

```ts
import { init } from '@nstudio/nativescript-cloudinary';

init('your_cloud_name', 'your_api_key', 'your_api_secret');
```

## ImageCloudinary Component

A drop-in `Image` subclass that generates and loads Cloudinary URLs via the `options` property.

### XML

```xml
<Page xmlns:cl="@nstudio/nativescript-cloudinary">
  <cl:ImageCloudinary options="{{ imageOptions }}" stretch="aspectFit" />
</Page>
```

### Options

Bind an `ImageCloudinaryOptions` object:

```ts
// Simple (top-level shorthand)
const options: ImageCloudinaryOptions = {
  src: 'cld-sample',
  width: 900,
  height: 900,
  crop: 'fill',
  gravity: 'face',
};

// Chained transformations
const options: ImageCloudinaryOptions = {
  src: 'cld-sample',
  transformations: [
    { width: 900, height: 900, crop: 'fill', gravity: 'auto' },
    { effect: 'sepia' },
    { radius: 'max' },
    { format: 'auto', quality: 'auto' },
  ],
};

// Raw transformation string
const options: ImageCloudinaryOptions = {
  src: 'cld-sample',
  rawTransformation: 'c_thumb,g_face,h_300,w_300/r_max/f_auto/q_auto',
};
```

## Other Flavors

### Angular

```typescript
import { registerElement } from '@nativescript/angular';
import { ImageCloudinary } from '@nstudio/nativescript-cloudinary';

registerElement('ImageCloudinary', () => ImageCloudinary);
```

### React

```typescript
import { registerElement } from 'react-nativescript';
import { ImageCloudinary } from '@nstudio/nativescript-cloudinary';

registerElement('imageCloudinary', () => ImageCloudinary);
```

### Solid

```typescript
import { registerElement } from 'dominative';
import { ImageCloudinary } from '@nstudio/nativescript-cloudinary';

registerElement('imageCloudinary', ImageCloudinary);
```

### Svelte

```typescript
import { registerNativeViewElement } from '@nativescript-community/svelte-native/dom';
import { ImageCloudinary } from '@nstudio/nativescript-cloudinary';

registerNativeViewElement('imageCloudinary', () => ImageCloudinary);
```

### Vue

```typescript
import { registerElement } from 'nativescript-vue';
import { ImageCloudinary } from '@nstudio/nativescript-cloudinary';

registerElement('ImageCloudinary', () => ImageCloudinary);
```

## generateUrl

Generate a Cloudinary URL programmatically without the component:

```ts
import { generateUrl } from '@nstudio/nativescript-cloudinary';

const url = generateUrl({
  src: 'cld-sample',
  width: 600,
  crop: 'scale',
  format: 'auto',
  quality: 'auto',
});
```

## Transformation Properties

Each `CloudinaryTransformation` supports:

| Property | Type | Description |
|---|---|---|
| `width` | `number \| string` | Width |
| `height` | `number \| string` | Height |
| `crop` | `CropMode` | Crop mode (`fill`, `fit`, `scale`, `thumb`, `pad`, etc.) |
| `gravity` | `Gravity` | Gravity (`auto`, `face`, `faces`, `center`, etc.) |
| `aspectRatio` | `string \| number` | Aspect ratio |
| `x`, `y` | `number \| string` | Position offset |
| `zoom` | `number \| string` | Zoom level |
| `format` | `ImageFormat` | Delivery format (`auto`, `webp`, `avif`, etc.) |
| `fetchFormat` | `string` | Fetch format |
| `quality` | `string \| number` | Quality (`auto`, `80`, etc.) |
| `dpr` | `string \| number` | Device pixel ratio |
| `effect` | `string` | Effect (`sepia`, `grayscale`, `blur:800`, etc.) |
| `radius` | `number \| string` | Corner radius (`max` for circle) |
| `border` | `string` | Border (e.g., `5px_solid_rgb:0066ff`) |
| `background` | `string` | Background color or `auto:border` |
| `color` | `string` | Color |
| `colorSpace` | `string` | Color space |
| `angle` | `number \| string` | Rotation angle or `hflip`/`vflip` |
| `flags` | `string \| string[]` | Transformation flags |
| `overlay` | `string` | Overlay public ID or text spec |
| `underlay` | `string` | Underlay public ID |
| `opacity` | `number \| string` | Opacity (0-100) |
| `page` | `number \| string` | Page/frame number |
| `density` | `number \| string` | DPI density |
| `defaultImage` | `string` | Fallback image public ID |
| `named` | `string` | Named transformation |
| `variables` | `Record<string, string \| number>` | User-defined variables |
| `rawTransformation` | `string` | Raw transformation string (appended as-is) |

## ImageCloudinaryOptions

Extends the transformation properties above with:

| Property | Type | Description |
|---|---|---|
| `src` | `string` | **Required.** Cloudinary public ID |
| `resourceType` | `string` | `image`, `video`, `raw`, or `auto` |
| `type` | `string` | `upload`, `fetch`, `private`, or `authenticated` |
| `version` | `string` | Version string (e.g., `v1685472103`) |
| `extension` | `string` | File extension override |
| `transformations` | `CloudinaryTransformation[]` | Chained transformation array |
| `rawTransformation` | `string` | Full raw URL transformation string |

**Priority:** `rawTransformation` > `transformations` array > top-level shorthand properties.

## Debugging

Enable debug logging:

```ts
import { ImageCloudinary } from '@nstudio/nativescript-cloudinary';

ImageCloudinary.debug = true;
```

## License

Apache License Version 2.0
