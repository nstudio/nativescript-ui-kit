# @nstudio/nativescript-label-marquee

A Label which can scroll with a marquee effect when the text outgrows the available width.

```javascript
ns plugin add @nstudio/nativescript-label-marquee
```

## Usage

### JavaScript/TypeScript

```
<Page xmlns="http://schemas.nativescript.org/tns.xsd"
    xmlns:lm="@nstudio/nativescript-label-marquee">
    <StackLayout>
        <lm:LabelMarquee 
            text="Lorem Ipsum; this is a long string of text that will animate because it's longer than the width of the view."
            fadeLength="150" 
            scrollDuration="20"></lm:LabelMarquee>
    </StackLayout>
</Page>
```

* `labelize: boolean` Turn scrolling off to display as normal `Label`.
* `fadeLength: number` (iOS Only) the width of the faded text on either side while scrolling.
* `scrollDuration: number` (iOS Only) speed of the scrolling text measured by duration in seconds to scroll from start to finish. 

### Angular

```
import { registerElement } from '@nativescript/angular';
import { LabelMarquee } from '@nstudio/nativescript-label-marquee';

registerElement('LabelMarquee', () => LabelMarquee);
```

Usage in components:

```
<LabelMarquee 
    text="Lorem Ipsum; this is a long string of text that will animate because it's longer than the width of the view."
    fadeLength="150" 
    scrollDuration="20">
</LabelMarquee>
```

## License

Apache License Version 2.0
