## A simpler way to use font icons with NativeScript

## Usage

```bash
npm install nativescript-fonticon --save
```

**NOTE:** 
- v8+ now combines `nativescript-fonticon` and `nativescript-ngx-fonticon` to be usable with simpler consistent packaging: For example, if using Angular, can import from `nativescript-fonticon/angular` - See usage examples below.
- If you were using v7 or lower, you were using `TNS` prefix naming which is no longer used.

### The Problem

You can use icon fonts with NativeScript by combining a class with a unicode reference in the view:

- css

```css
.fa {
  font-family: FontAwesome;
}
```

- view

```xml
<Label class="fa" text="\uf293"></Label>
```

This works but keeping up with unicodes is not fun.

### The Solution

With this plugin, you can instead reference the `fonticon` by the specific classname.

### Including font icons in your app

[FontAwesome](https://fortawesome.github.io/Font-Awesome/) will be used in the following examples but you can use any custom font icon collection.

- Place font icon `.ttf` file in `app/fonts`, for example:

```
app/fonts/fontawesome-webfont.ttf
```

- Create base class in `app.css` global file, for example:

```css
.fa {
  font-family: FontAwesome, fontawesome-webfont;
}
```

**NOTE**: Android uses the name of the file for the font-family (In this case, `fontawesome-webfont`.ttf. iOS uses the actual name of the font; for example, as found [here](https://github.com/FortAwesome/Font-Awesome/blob/master/css/font-awesome.css#L8). You could rename the font filename to `FontAwesome.ttf` to use just: `font-family: FontAwesome`. You can [learn more here](http://fluentreports.com/blog/?p=176).

- Copy css to `app` somewhere, for example:

```
app/assets/font-awesome.css
```

Then modify the css file to isolate just the icon fonts needed. [Watch this video to better understand](https://www.youtube.com/watch?v=qb2sk0XXQDw).

- Import the `FontIconModule` passing a configuration with the location to the `.css` file to `forRoot`:

Use the classname prefix as the `key` and the css filename as the value relative to directory where your `app.module.ts` is, then `require` the css file.

### Vanilla

Configure your fonts and setup the converter if using vanilla NativeScript:

```ts
import { Application } from 'application';
import { FontIconFactory, fonticon } from 'nativescript-fonticon';

// Optional. Will output the css mapping to console.
FontIconFactory.debug = true;

// Configure paths to font icon css
FontIconFactory.paths = {
  'fa': 'font-awesome.css',
  'ion': 'ionicons.css'
};

// Load the css
FontIconFactory.loadCss();

Application.setResources( { fonticon } );
Application.run({ moduleName: 'main-page' });
```

Use the `fonticon` pipe in your markup.

```xml
<Label class="fa" text="{{'fa-bluetooth' | fonticon}}"></Label> 
```

### Angular

Setup your module:

```ts
import { FontIconModule } from 'nativescript-fonticon/angular';

@NgModule({
	declarations: [
		DemoComponent,
	],
	bootstrap: [
		DemoComponent,
	],
	imports: [
		NativeScriptModule,
		FontIconModule.forRoot({
			'fa': require('~/app/assets/css/fa-5.css'),
			'ion': require('~/app/assets/css/ionicons.css')
		})
	]
})
```

Use the `fonticon` pipe in your markup.

```xml
<Label class="fa" [text]="'fa-bluetooth' | fonticon"></Label>
```

- _Optional_ Configure the service with DEBUGGING on

When working with a new font collection, you may need to see the mapping the service provides. Passing `true` as seen below will cause the mapping to be output in the console to determine if your font collection is being setup correctly.

```typescript
import { FontIconModule, FontIconService } from 'nativescript-fonticon/angular';
// turn debug on
FontIconService.debug = true;

@NgModule({
	declarations: [
		DemoComponent,
	],
	bootstrap: [
		DemoComponent,
	],
	imports: [
		NativeScriptModule,
		FontIconModule.forRoot({
			'fa': require('~/app/assets/css/fa-5.css')
		})
	]
})
```

## Credits

Idea came from [Bradley Gore](https://github.com/bradleygore)'s [post here](http://www.blog.bradleygore.com/2016/03/28/font-icons-in-nativescript/).

# License

[MIT](/LICENSE)
