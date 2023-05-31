# @nstudio/nativescript-variable-blur-view

Variable Blur View for NativeScript. Inspired by [@jtrivedi](https://github.com/jtrivedi), [@aheze](https://github.com/aheze/VariableBlurView), and [@candlefinance](https://github.com/candlefinance/blur-view)

## Preview
https://github.com/nstudio/nativescript-ui-kit/assets/457187/8d82d1b4-1dfc-421f-89b1-697c3c433b26

```javascript
npm install @nstudio/nativescript-variable-blur-view
```

## Usage

**Note**: iOS Only (*at the moment*)

Register the element for usage in your markup:

```ts
import { VariableBlurView } from '@nstudio/nativescript-variable-blur-view'

// Angular
import { registerElement } from '@nativescript/angular'
registerElement('VariableBlurView', () => VariableBlurView)

// Solid
import { registerElement } from 'dominative';
registerElement('variableBlurView', VariableBlurView);

// Svelte
import { registerNativeViewElement } from 'svelte-native/dom'
registerNativeViewElement('variableBlurView', () => VariableBlurView);

// React
import { registerElement } from 'react-nativescript';
registerElement('variableBlurView', () => VariableBlurView);

// Vue
import Vue from 'nativescript-vue'
Vue.registerElement('VariableBlurView', () => VariableBlurView)
```

Place on top of any UI in your layouts you want blurred:

```xml
<VariableBlurView width="100%" height="200"/>
```

*Tip*: You can flip the blur view vertically by doing this:

```xml
<VariableBlurView width="100%" height="200" scaleY="-1"/>
```

## License

Apache License Version 2.0
