# @nstudio/nativescript-shimmer

Shimmer for NativeScript

```javascript
npm install @nstudio/nativescript-shimmer
```

## Usage

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

## License

Apache License Version 2.0
