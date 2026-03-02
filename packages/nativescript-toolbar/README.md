# @nstudio/nativescript-toolbar

iOS [UIToolbar](https://developer.apple.com/documentation/uikit/uitoolbar) with first-class [UIBarButtonItem](https://developer.apple.com/documentation/uikit/uibarbuttonitem) and [UIToolbarAppearance](https://developer.apple.com/documentation/uikit/uitoolbarappearance) support.

```bash
npm install @nstudio/nativescript-toolbar
```

## Platform Support

- iOS: fully implemented (`UIToolbar`)
- Android: no-op placeholder (toolbar is a native iOS component, but Android users can still install the plugin without errors)

## Usage

### NativeScript Core (programmatic)

```ts
import { Color, EventData, Page } from '@nativescript/core';
import {
  NToolbar,
  ToolbarItemTapEventData,
  ToolbarItem,
} from '@nstudio/nativescript-toolbar';

export function navigatingTo(args: EventData) {
  const page = args.object as Page;

  const toolbar = new NToolbar();
  toolbar.height = 44;
  toolbar.barStyle = 'default';
  toolbar.translucent = true;
  toolbar.tintColor = new Color('#2563eb');

  const items: ToolbarItem[] = [
    { systemItem: 'add', onTap: () => console.log('Add') },
    { systemItem: 'flexibleSpace' },
    { title: 'Edit', style: 'plain', onTap: () => console.log('Edit') },
    { systemItem: 'fixedSpace', width: 8 },
    { systemImage: 'gearshape', onTap: () => console.log('Settings') },
  ];

  toolbar.setItems(items, true);

  toolbar.on(
    NToolbar.itemTapEvent,
    (event: ToolbarItemTapEventData) => {
      console.log('Tapped index:', event.data.index);
      console.log('Tapped descriptor id:', event.data.item.id);
    }
  );

  page.content = toolbar;
}
```

### Angular registration

```ts
import { registerElement } from '@nativescript/angular';
import { NToolbar } from '@nstudio/nativescript-toolbar';

registerElement('NToolbar', () => NToolbar);
```

### Angular usage

```html
<!-- any Angular component template -->
<NToolbar
  #toolbar
  height="44"
  barStyle="default"
  translucent="true"
  tintColor="#2563eb"
  (loaded)="onToolbarLoaded($event)"
  (itemTap)="onToolbarTap($event)">
</NToolbar>
```

```ts
import { Component } from '@angular/core';
import { EventData } from '@nativescript/core';
import { NToolbar, ToolbarItem, ToolbarItemTapEventData } from '@nstudio/nativescript-toolbar';

@Component({
  selector: 'demo-toolbar',
  templateUrl: './demo-toolbar.component.html',
})
export class DemoToolbarComponent {
  onToolbarLoaded(args: EventData) {
    const toolbar = args.object as NToolbar;
    const items: ToolbarItem[] = [
      { id: 'compose', systemItem: 'compose' },
      { systemItem: 'flexibleSpace' },
      { id: 'publish', title: 'Publish', style: 'done' },
      { systemItem: 'fixedSpace', width: 8 },
      { id: 'filters', systemImage: 'slider.horizontal.3' },
    ];
    toolbar.setItems(items, true);
  }

  onToolbarTap(args: ToolbarItemTapEventData) {
    console.log('Tapped:', args.data.item?.id ?? args.data.index);
  }
}
```

### React registration

```ts
import { registerElement } from 'react-nativescript';
import { NToolbar } from '@nstudio/nativescript-toolbar';

registerElement('nToolbar', () => NToolbar);
```

### Solid registration

```ts
import { registerElement } from 'dominative';
import { NToolbar } from '@nstudio/nativescript-toolbar';

registerElement('nToolbar', NToolbar);
```

### Svelte registration

```ts
import { registerNativeViewElement } from '@nativescript-community/svelte-native/dom';
import { NToolbar } from '@nstudio/nativescript-toolbar';

registerNativeViewElement('nToolbar', () => NToolbar);
```

### Vue registration

```ts
import { registerElement } from 'nativescript-vue';
import { NToolbar } from '@nstudio/nativescript-toolbar';

registerElement('NToolbar', () => NToolbar);
```

## API

### Class

`NToolbar` extends `View`.

### Properties

- `items: ToolbarItem[]`
- `barStyle: 'default' | 'black' | 'blackOpaque' | 'blackTranslucent' | number`
- `translucent: boolean`
- `barTintColor: string | Color | UIColor`
- `tintColor: string | Color | UIColor`
- `position: 'any' | 'bottom' | 'top' | 'topAttached' | number`
- `defaultMetrics: 'default' | 'compact' | 'defaultPrompt' | 'compactPrompt' | 'landscapePhone' | 'landscapePhonePrompt' | number`
- `itemChangesAnimated: boolean`
- `standardAppearance: ToolbarAppearance` (iOS 13+)
- `compactAppearance: ToolbarAppearance` (iOS 13+)
- `scrollEdgeAppearance: ToolbarAppearance` (iOS 15+)
- `compactScrollEdgeAppearance: ToolbarAppearance` (iOS 15+)

### Events

- `itemTap`: raised when a descriptor-backed tappable item is pressed (`ToolbarItemTapEventData`)

### Methods

- `setItems(items: ToolbarItem[], animated?: boolean): void`
- `getNativeItems(): UIBarButtonItem[]`
- `getNativeItem(indexOrId: number | string): UIBarButtonItem | null`
- `setAppearance(slot: 'standard' | 'compact' | 'scrollEdge' | 'compactScrollEdge', appearance: ToolbarAppearance): void`
- `setBackgroundImage(image, position?, metrics?): void`
- `getBackgroundImage(position?, metrics?): UIImage | null`
- `clearBackgroundImage(position?, metrics?): void`
- `setShadowImage(image, position?): void`
- `getShadowImage(position?): UIImage | null`
- `clearShadowImage(position?): void`

## ToolbarItem

`ToolbarItem` supports native and high-level item creation:

```ts
type ToolbarItem = {
  id?: number | string;
  nativeItem?: UIBarButtonItem; // escape hatch: pass fully native item

  systemItem?: ToolbarSystemItem; // done, add, flexibleSpace, fixedSpace, etc.
  title?: string;
  style?: 'plain' | 'bordered' | 'done' | 'prominent' | number;
  image?: string | ImageSource | UIImage; // supports sys:// (sf:// and symbol:// aliases also supported)
  systemImage?: string; // SF Symbol name
  landscapeImagePhone?: string | ImageSource | UIImage;
  customView?: View | UIView | (() => View | UIView);

  width?: number;
  enabled?: boolean;
  tintColor?: string | Color | UIColor;
  tag?: number;
  accessibilityIdentifier?: string;

  // iOS 14+ menu/action support
  menu?: UIMenu;
  primaryAction?: UIAction;

  // iOS 15+/16+/17+ optional flags
  changesSelectionAsPrimaryAction?: boolean;
  selected?: boolean;
  hidden?: boolean;
  springLoaded?: boolean;
  symbolAnimationEnabled?: boolean;

  onTap?: (args: ToolbarItemTapEventData) => void;
}
```

`ToolbarSystemItem` supports:

- `done`, `cancel`, `edit`, `save`, `add`
- `flexibleSpace`, `fixedSpace`
- `compose`, `reply`, `action`, `organize`, `bookmarks`
- `search`, `refresh`, `stop`, `camera`, `trash`
- `play`, `pause`, `rewind`, `fastForward`
- `undo`, `redo`, `pageCurl`, `close`, `writingTools`

## Appearance API (`UIToolbarAppearance`, iOS 13+)

```ts
toolbar.standardAppearance = {
  preset: 'opaque',
  backgroundColor: '#ffffff',
  shadowColor: '#e5e7eb',
  buttonAppearance: {
    normal: {
      titleTextAttributes: {
        foregroundColor: '#111827',
      },
    },
    highlighted: {
      titleTextAttributes: {
        foregroundColor: '#2563eb',
      },
    },
  },
};

toolbar.scrollEdgeAppearance = {
  preset: 'transparent',
  backgroundEffectStyle: 'systemThinMaterial',
};
```

`ToolbarAppearance` options:

- `preset: 'default' | 'opaque' | 'transparent'`
- `backgroundColor`
- `backgroundEffectStyle` (`UIBlurEffectStyle` name or numeric value)
- `backgroundImage`
- `backgroundImageContentMode`
- `shadowColor`
- `shadowImage`
- `buttonAppearance`
- `doneButtonAppearance`
- `prominentButtonAppearance` (if available on the OS/runtime)

## Native Escape Hatch

For any unsupported edge case, create `UIBarButtonItem` yourself and pass it via `ToolbarItem.nativeItem`. The plugin will still place it in the toolbar and keep `getNativeItems()`/`getNativeItem()` in sync.

## License

Apache License Version 2.0
