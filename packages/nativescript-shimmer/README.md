# @nstudio/nativescript-shimmer

Shimmer for NativeScript

```javascript
npm install @nstudio/nativescript-shimmer
```

## Usage

```
<Page xmlns="http://schemas.nativescript.org/tns.xsd"
  xmlns:ui="@nstudio/nativescript-shimmer">
  ...
    <ui:Shimmer>
        <GridLayout>
            <ContentView height="20" width="65%" backgroundColor="#333"/>
        </GridLayout>
    </ui:Shimmer>

```

It can also be registered with various flavors, for example with Angular:

```
import { registerElement } from '@nativescript/angular';
import { Shimmer } from '@nstudio/nativescript-shimmer';

registerElement('Shimmer', () => Shimmer);

// can now be used in components:
<Shimmer>
    <GridLayout>
        <ContentView height="20" width="65%" backgroundColor="#333"/>
    </GridLayout>
</Shimmer>
```

### Properties

* `autoStart: boolean`: Default to `true`. `<Shimmer autoStart="false">` to disable starting automatically

**iOS Only**:

You can start shimmer on any view statically:

```
import { Shimmer } from '@nstudio/nativescript-shimmer';

loadedView(args) {
    view = args.object;
    // start shimmer
    Shimmer.start(view);
    // stop shimmer
    Shimmer.stop(view);
}
```

Android will always need a Shimmer instance to start the effect however you can statically stop the shimmer effect if that instance is passed into `Shimmer.stop(view /* shimmer instance */)`.

## License

Apache License Version 2.0
