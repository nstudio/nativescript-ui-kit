# @nstudio/nativescript-rive

Rive for NativeScript

```javascript
npm install @nstudio/nativescript-rive
```

## Usage

You can configure both iOS and Android for Rive usage.

### iOS

For iOS, configure your `nativescript.config.ts` to use the Swift Package:

```ts
ios: {
    SPMPackages: [
        {
            name: 'RiveRuntime',
            libs: ['RiveRuntime'],
            repositoryURL: 'https://github.com/rive-app/rive-ios.git',
            version: '5.0.0',
        },
    ],
},
```

#### Swift Package version note

If you encounter a build error related to a specified version as follows:
```bash
xcodebuild: error: Could not resolve package dependencies:
  Dependencies could not be resolved because no versions of 'rive-ios' match the requirement 5.1.12..<6.0.0 and root depends on 'rive-ios' 5.1.12..<6.0.0.
```
You can use the base major version, `5.0.0`, instead of the precise version. It will still resolve the latest in the major version series.

### Android

For Android, add this provider to your `AndroidManifest.xml` inside the `application` tag:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="__PACKAGE__"
    xmlns:tools="http://schemas.android.com/tools"> <!-- You may need to add this xmlns:tools attr/value -->
    ...

    <application
        android:name="com.tns.NativeScriptApplication"
        ...>

        <!-- Add this for Rive -->
        <provider
                android:name="androidx.startup.InitializationProvider"
                android:authorities="${applicationId}.androidx-startup"
                android:exported="false"
                tools:node="merge">
            <meta-data android:name="app.rive.runtime.kotlin.RiveInitializer"
                        android:value="androidx.startup" />
        </provider>
```

Use `RiveView`:

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd"
  xmlns:ui="@nstudio/nativescript-rive">
    <GridLayout>
        <ui:RiveView src="~/assets/rive/icons.riv" width="300" height="300" autoPlay="true"/>
    </GridLayout>
</Page>
```

### Using State Machines

You can specify the artboard, stateMachine, input along with inputValue (`boolean`).

```html
<ui:RiveView src="~/assets/rive/icons.riv" artboard="CHAT" stateMachine="CHAT_Interactivity" input="active" inputValue="{{inputValue}}" width="300" height="300" autoPlay="true"/>
```

## License

Apache License Version 2.0
