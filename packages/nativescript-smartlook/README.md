# @nstudio/nativescript-smartlook

[Smartlook](https://www.smartlook.com) SDK for NativeScript.

Comprehensive product analytics & visual user insights.

```bash
npm install @nstudio/nativescript-smartlook
```

## Usage

Initialize the SDK with your api key before the app boots:

```ts
Application.on(Application.launchEvent, () => {
  Smartlook.start('<api-key>');
});

// bootstrap app...
```

### API

- `Smartlook.start(key: string)`: Start the sdk session and recording.
- `Smartlook.stop()`: Stop recording.
- `Smartlook.isRecording(): boolean`: Check status of recording.
- `Smartlook.sessionUrl(withTimestamp?: boolean): string`: Get the current session url.
- `Smartlook.setRenderingMode(mode?: SmartlookRenderMode): void`: Set current rendering mode.
- `Smartlook.getRenderingMode(): number`: Get current rendering mode.
- `Smartlook.setSensitivity(view: View, sensitive: boolean)`: Set sensitivity to specific View.
- `Smartlook.setUser(id: string, name?: string, email?: string, extraData?: any)`: Set user details.
- `Smartlook.trackEvent(name: string, properties?: any): void`: Track event with optional properties.
- `Smartlook.trackNavigationEvent(name: string)`: Track navigation event.

## License

Apache License Version 2.0
