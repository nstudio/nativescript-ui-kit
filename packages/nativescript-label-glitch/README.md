# @nstudio/nativescript-label-glitch

Label with a Glitch!

```javascript
npm install @nstudio/nativescript-label-glitch
```

## Usage

Use within any view layout:

```xml
<LabelGlitch text="Hello" />
```

When using flavors, you can register the element for usage in your markup:

```ts
import { LabelGlitch } from '@nstudio/nativescript-label-glitch'

// Angular
import { registerElement } from '@nativescript/angular'
registerElement('LabelGlitch', () => LabelGlitch)

// Solid
import { registerElement } from 'dominative';
registerElement('LabelGlitch', LabelGlitch);

// Svelte
import { registerNativeViewElement } from 'svelte-native/dom'
registerNativeViewElement('LabelGlitch', () => LabelGlitch);

// React
import { registerElement } from 'react-nativescript';
registerElement('LabelGlitch', () => LabelGlitch);

// Vue
import Vue from 'nativescript-vue'
Vue.registerElement('LabelGlitch', () => LabelGlitch)
```

## License

- [Attribution to @kciter for iOS](https://github.com/kciter/GlitchLabel/blob/master/LICENSE)
- [Attribution to @irshu355 for Android](https://github.com/irshu355/Android-Glitch-Text-Effect/blob/master/LICENSE)

Apache License Version 2.0
