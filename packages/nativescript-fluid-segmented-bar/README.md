# @nstudio/nativescript-fluid-segmented-bar

Fluid Segmented Bar to liven up any standard `SegmentedBar` control.

- iOS: Uses [SJFluidSegmentedControl](https://github.com/sasojadrovski/SJFluidSegmentedControl)
- Android: Uses standard SegementedBar - Jetpack Compose will be added in future to replicate

## Usage

```javascript
npm install @nstudio/nativescript-fluid-segmented-bar
```

Use within any view layout:

```xml
<FluidSegmentedBar items="{{items}}" gradientColorSides="{{gradientColorSides}}" selectedIndexChanged="{{selectedIndexChanged}}" didScrollOffset="{{didScrollOffset}}"/>
```

Provide bindings for properties and events:

```ts
const items: Array<FluidSegmentedBarItem> = [
    {
        title: 'Enjoy',
        colors: [new Color('#485ae6'), new Color('#87aeed')],
    },
    {
        title: 'Your',
        colors: [new Color('#87aeed'), new Color('#e53ca9')],
    },
    {
        title: 'Life',
        colors: [new Color('#c2c96a'), new Color('#678d50')],
    },
];
const gradientColorSides: FluidSegmentedBarGradientColorSides = {
    left: [new Color('#87aeed')],
    right: [new Color('#c2c96a')],
};

function selectedIndexChanged(args: FluidSegmentedBarIndexChangedEvent) {
    console.log('selectedIndexChanged:', args.newIndex);
}
function didScrollOffset(args: FluidSegmentedBarDidScrollEvent) {
    console.log('didScrollOffset:', args.offset);
}
```

When using flavors, you can just register the element for usage in your markup:

```ts
import { FluidSegmentedBar } from '@nstudio/nativescript-fluid-segmented-bar'

// Angular
import { registerElement } from '@nativescript/angular'
registerElement('FluidSegmentedBar', () => FluidSegmentedBar)

// Solid
import { registerElement } from 'dominative';
registerElement('fluidSegmentedBar', FluidSegmentedBar);

// Svelte
import { registerNativeViewElement } from 'svelte-native/dom'
registerNativeViewElement('fluidSegmentedBar', () => FluidSegmentedBar);

// React
import { registerElement } from 'react-nativescript';
registerElement('fluidSegmentedBar', () => FluidSegmentedBar);

// Vue
import Vue from 'nativescript-vue'
Vue.registerElement('FluidSegmentedBar', () => FluidSegmentedBar)
```

## API

### Properties

- `items: Array<FluidSegmentedBarItem>`: Collection of bar items with `title` and `colors`.
- `gradientColorSides: FluidSegmentedBarGradientColorSides`: The gradiated side colors.

### Events

- `selectedIndexChanged`: When the selectedIndex changes.
- `didScrollOffset`: Whenever the control animates it's selected position, the `offset` and `maxOffset` will be emitted to provide ability to animate other visuals based on it's movement.

## License

- [Attribution to @sasojadrovski for iOS](https://github.com/sasojadrovski/SJFluidSegmentedControl/blob/master/LICENSE)

Apache License Version 2.0
