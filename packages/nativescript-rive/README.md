# @nstudio/nativescript-rive

Rive for NativeScript

```javascript
npm install @nstudio/nativescript-rive
```

## Usage

For iOS, configure your `nativescript.config.ts` to use the Swift Package:

```ts
ios: {
    SPMPackages: [
        {
            name: 'RiveRuntime',
            libs: ['RiveRuntime'],
            repositoryURL: 'https://github.com/rive-app/rive-ios.git',
            version: '3.1.8',
        },
    ],
},
```

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
