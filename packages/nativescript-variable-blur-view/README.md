# @nstudio/nativescript-variable-blur-view

Variable Blur View for NativeScript. Inspired by [@jtrivedi](https://github.com/jtrivedi), [@aheze](https://github.com/aheze/VariableBlurView), and [https://github.com/candlefinance](https://github.com/candlefinance/blur-view)

**Note**: iOS Only (*at the moment*)

```javascript
npm install @nstudio/nativescript-variable-blur-view
```

## Usage

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
