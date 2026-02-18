# @nstudio/nativescript-menu

Native anchored menus for NativeScript.

## Installation

```bash
npm install @nstudio/nativescript-menu
```

## Usage

### NativeScript Core

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd"
	xmlns:nm="@nstudio/nativescript-menu"
	navigatingTo="navigatingTo">
	<GridLayout>
		<nm:MenuImage
			src="{{imageIcon}}"
			options="{{addOptions}}"
			selected="{{selectOption}}"
		/>
	</GridLayout>
</Page>
```

```ts
import { EventData, Page } from '@nativescript/core';
import { MenuSelectedEvent } from '@nstudio/nativescript-menu';

export function navigatingTo(args: EventData) {
	const page = args.object as Page;
	page.bindingContext = {
		imageIcon: 'res://ic_add',
		addOptions: [
			{ id: 1, name: 'New Chat', icon: 'square.and.pencil' },
			{ id: 2, name: 'Import from Drive', subtitle: 'Login Required', icon: 'cloud' },
			{
				id: 3,
				name: 'Tiers',
				icon: 'circle.dotted',
				singleSelection: true,
				children: [
					{ id: 31, name: 'Starter' },
					{ id: 32, name: 'Pro' },
					{ id: 33, name: 'Enterprise', state: 'on' as const },
				],
			},
			{
				id: 4,
				name: '',
				childrenStyle: 'palette' as const,
				children: [
					{ id: 41, name: 'Camera', icon: 'camera' },
					{ id: 42, name: 'Photos', icon: 'photo' },
					{ id: 43, name: 'Files', icon: 'folder' },
				],
			},
		],
		selectOption(args: MenuSelectedEvent) {
			console.log('Selected option:', args.data.option);
		},
	};
}
```

### Angular

```ts
import { registerElement } from '@nativescript/angular';
import { MenuButton, MenuImage } from '@nstudio/nativescript-menu';

registerElement('MenuButton', () => MenuButton);
registerElement('MenuImage', () => MenuImage);
```

```html
<MenuImage [src]="imageIcon" [options]="addOptions" (selected)="selectOption($event)"></MenuImage>
```

## API Basics

- `menu`: tap-to-open menu configuration on any `View`
- `contextMenu`: long-press menu configuration on any `View`
- `options`: convenience setter exposed by `MenuButton`/`MenuImage`
- `selected`: emitted when a menu item is chosen

Core menu item shape:

```ts
type MenuAction = {
	id?: number;
	name?: string;
	icon?: string | { systemIcon: string } | { src: string } | { fontFamily: string; text: string; fontWeight?: number };
	subtitle?: string;
	destructive?: boolean;
	disabled?: boolean;
	hidden?: boolean;
	keepsMenuOpen?: boolean;
	children?: MenuAction[];
	childrenStyle?: 'inline' | 'dropdown' | 'palette';
	singleSelection?: boolean;
	state?: 'on' | 'off' | 'mixed';
};
```

## Notes

- iOS uses native [UIMenu](https://developer.apple.com/documentation/uikit/uimenu)/[UIAction](https://developer.apple.com/documentation/uikit/uiaction).
- Android uses a native anchored glass menu controller with nested submenu support.
- The `selected` event payload is available at `args.data.option`.

## License

Apache License Version 2.0
