# @nstudio/nativescript-rich-paste

Rich paste and drag-and-drop support for NativeScript text inputs. Handles images, GIFs, files, and text from the clipboard. 

```
npm install @nstudio/nativescript-rich-paste
```

Compatible with Angular, React, Solid, Svelte and Vue.

Drop-in replacements for [TextField](https://docs.nativescript.org/ui/text-field) and [TextView](https://docs.nativescript.org/ui/text-view) which work identical but with enhanced rich paste features. Just append `RichPaste` to the end of the element name and register it in your framework of choice.

## Usage

```xml
<Page xmlns:pi="@nstudio/nativescript-rich-paste">
  <pi:TextFieldRichPaste accept="all" hint="Paste rich data..." paste="{{ onPaste }}" />
</Page>
```

```typescript
import { PasteEventData } from '@nstudio/nativescript-rich-paste';

onPaste(args: PasteEventData) {
  const payload = args.data;
  switch (payload.type) {
    case 'text':
      console.log('Text:', payload.value);
      break;
    case 'images':
      payload.items.forEach((img) => {
        console.log(img.uri, img.mimeType, img.animated);
      });
      break;
    case 'files':
      payload.items.forEach((file) => {
        console.log(file.name, file.mimeType, file.size);
      });
      break;
  }
}
```

## Other Flavors

### Angular

```typescript
import { registerElement } from '@nativescript/angular';
import { TextFieldRichPaste, TextViewRichPaste } from '@nstudio/nativescript-rich-paste';

registerElement('TextFieldRichPaste', () => TextFieldRichPaste);
registerElement('TextViewRichPaste', () => TextViewRichPaste);
```

### React

```typescript
import { registerElement } from 'react-nativescript';
import { TextFieldRichPaste, TextViewRichPaste } from '@nstudio/nativescript-rich-paste';

registerElement('textFieldRichPaste', () => TextFieldRichPaste);
registerElement('textViewRichPaste', () => TextViewRichPaste);
```

### Solid

```typescript
import { registerElement } from 'dominative';
import { TextFieldRichPaste, TextViewRichPaste } from '@nstudio/nativescript-rich-paste';

registerElement('textFieldRichPaste', TextFieldRichPaste);
registerElement('textViewRichPaste', TextViewRichPaste);
```

### Svelte

```typescript
import { registerNativeViewElement } from '@nativescript-community/svelte-native/dom';
import { TextFieldRichPaste, TextViewRichPaste } from '@nstudio/nativescript-rich-paste';

registerNativeViewElement('textFieldRichPaste', () => TextFieldRichPaste);
registerNativeViewElement('textViewRichPaste', () => TextViewRichPaste);
```

### Vue

```typescript
import { registerElement } from 'nativescript-vue';
import { TextFieldRichPaste, TextViewRichPaste } from '@nstudio/nativescript-rich-paste';

registerElement('TextFieldRichPaste', () => TextFieldRichPaste);
registerElement('TextViewRichPaste', () => TextViewRichPaste);
```

## Docs

[https://plugins.nstudio.io/plugins/rich-paste](https://plugins.nstudio.io/plugins/rich-paste)

## License

Apache License Version 2.0
