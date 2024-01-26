# @nstudio/nativescript-markdown-view

A NativeScript view for displaying natively rendered Markdown.

Uses [Markwon](https://github.com/noties/Markwon) on Android and [TSMarkdownParser](https://github.com/laptobbe/TSMarkdownParser) on iOS.

```javascript
npm install @nstudio/nativescript-markdown-view
```

If using vanilla core:

```xml
<!-- test-page.xml -->
<Page xmlns="http://schemas.nativescript.org/tns.xsd" loaded="pageLoaded" xmlns:mv="@nstudio/nativescript-markdown-view">
    <StackLayout class="p-20">
        <mv:MarkdownView markdown="_This_ should be **bold**!" />
    </StackLayout>
</Page>
```

When using flavors, you can register the element for usage in your markup:

```ts
import { MarkdownView } from '@nstudio/nativescript-markdown-view'

// Angular
import { registerElement } from '@nativescript/angular'
registerElement('MarkdownView', () => MarkdownView)

// Solid
import { registerElement } from 'dominative';
registerElement('markdownview', MarkdownView);

// Svelte
import { registerNativeViewElement } from 'svelte-native/dom'
registerNativeViewElement('markdownview', () => MarkdownView);

// React
import { registerElement } from 'react-nativescript';
registerElement('markdownview', () => MarkdownView);

// Vue
import Vue from 'nativescript-vue'
Vue.registerElement('MarkdownView', () => MarkdownView)
```

Use `MarkdownView` anywhere.

```xml
<MarkdownView markdown="_This_ should be **bold**!" />
```

## API
    
| Property | Default | Description |
| --- | --- | --- |
| markdown | "" | The markdown to be rendered on screen |

## Credits

- Thank you to original author, [Florian Reifschneider](https://github.com/flore2003/nativescript-markdown-view)!
  
## License

Apache License Version 2.0
