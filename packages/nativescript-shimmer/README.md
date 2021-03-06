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

- `autoStart: boolean`: Default to `true`. `<Shimmer autoStart="false">` to disable starting automatically

**iOS Only**:

You can start shimmer on any view statically:

```ts
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

- `Shimmer.defaults`: you can adjust any of the default effect settings in your app (often in `app.ts` or `main.ts` before bootstrap depending on your flavor) to avoid passing in the same settings each time the effect is configured:

```ts
Shimmer.defaults = {
    speed: 0.9,
    direction: ShimmerDirection.topToBottom,
    repeat: 4,
    lightColor: 'rgba(255,255,255,.8)',
    darkColor: 'rgba(0,0,0,.7)',
};

// bootstrap app...
```

## License

Apache License Version 2.0
