import { Button, Color, Image, Property, View } from '@nativescript/core';
import { MenuAction, MenuSelectedEvent, MenuView } from './common';

export * from './common';

const SELECTED_EVENT = 'selected';

declare const org: any;

type MenuControllerState = {
  controller?: any;
  selectionListener?: any;
  clickListener?: android.view.View.OnClickListener;
  longClickListener?: android.view.View.OnLongClickListener;
  options?: Array<MenuAction> | MenuAction;
  backgroundOpacity?: number;
  unloadBound?: boolean;
};

const BUTTON_MENU_SYMBOL = Symbol('buttonMenu');
const CONTEXT_MENU_SYMBOL = Symbol('contextMenu');

function normalizeAndroidBackgroundOpacity(value: unknown): number | undefined {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }

  const parsed = typeof value === 'number' ? value : Number(value);
  if (Number.isNaN(parsed)) {
    return undefined;
  }

  return Math.max(0, Math.min(1, parsed));
}

function makeColor(color: Color | string | undefined, destructive?: boolean): Color {
  if (!color) {
    return destructive ? new Color('#dc2626') : new Color('#0f172a');
  }
  return color instanceof Color ? color : new Color(color);
}

function toColorHex(color: Color | string | undefined, destructive?: boolean): string | null {
  if (!color && !destructive) {
    return null;
  }

  return makeColor(color, destructive).hex;
}

function getIconNameForOption(option: MenuAction): string {
  if (!option.icon) {
    return '';
  }

  const icon = option.icon;

  if (typeof icon === 'string') {
    return icon;
  }

  if ('systemIcon' in icon) {
    return icon.systemIcon;
  }

  if ('src' in icon) {
    const src = icon.src || '';
    if (src.startsWith('res://')) {
      return src.replace('res://', '');
    }
    return src;
  }

  if ('fontFamily' in icon) {
    return unescape(icon.text);
  }

  return '';
}

function serializeOption(option: MenuAction): any {
  const serialized: any = {
    id: option.id ?? null,
    name: option.name ?? '',
    subtitle: option.subtitle ?? '',
    icon: getIconNameForOption(option),
    iconType: 'symbol',
    iconSrc: '',
    iconText: '',
    iconFontFamily: '',
    iconFontWeight: option.icon && typeof option.icon !== 'string' && 'fontFamily' in option.icon ? (option.icon.fontWeight ?? 400) : 400,
    iconColor: toColorHex(option.iconColor, option.destructive),
    destructive: !!option.destructive,
    disabled: !!option.disabled,
    hidden: !!option.hidden,
    keepsMenuOpen: !!option.keepsMenuOpen,
    singleSelection: !!option.singleSelection,
    state: option.state ?? 'off',
    childrenStyle: option.childrenStyle ?? 'dropdown',
    children: option.children?.map(serializeOption) ?? [],
  };

  if (!option.icon) {
    return serialized;
  }

  if (typeof option.icon === 'string') {
    serialized.iconType = 'symbol';
    serialized.icon = option.icon;
    return serialized;
  }

  if ('systemIcon' in option.icon) {
    serialized.iconType = 'symbol';
    serialized.icon = option.icon.systemIcon;
    serialized.iconColor = toColorHex(option.icon.color ?? option.iconColor, option.destructive);
    return serialized;
  }

  if ('src' in option.icon) {
    serialized.iconType = 'src';
    serialized.iconSrc = option.icon.src ?? '';
    serialized.icon = option.icon.src?.startsWith('res://') ? option.icon.src.replace('res://', '') : option.icon.src;
    serialized.iconColor = toColorHex(option.icon.color ?? option.iconColor, option.destructive);
    return serialized;
  }

  if ('fontFamily' in option.icon) {
    serialized.iconType = 'font';
    serialized.iconText = unescape(option.icon.text ?? '');
    serialized.icon = serialized.iconText;
    serialized.iconFontFamily = option.icon.fontFamily ?? '';
    serialized.iconFontWeight = option.icon.fontWeight ?? 400;
    serialized.iconColor = toColorHex(option.icon.color ?? option.iconColor, option.destructive);
  }

  return serialized;
}

function toMenuArray(options: Array<MenuAction> | MenuAction): Array<MenuAction> {
  if (!options) {
    return [];
  }

  if (Array.isArray(options)) {
    return options;
  }

  if (options.children?.length) {
    return options.children;
  }

  return [options];
}

function pathToIndices(path: string): number[] {
  if (!path) {
    return [];
  }

  return path
    .split(',')
    .map((segment) => Number(segment))
    .filter((segment) => !Number.isNaN(segment));
}

function resolveOptionAtPath(options: Array<MenuAction>, path: number[]): MenuAction | null {
  let scope: Array<MenuAction> = options;
  let current: MenuAction = null;

  for (const index of path) {
    current = scope?.[index] ?? null;
    if (!current) {
      return null;
    }
    scope = current.children ?? [];
  }

  return current;
}

function updateSingleSelectionState(options: Array<MenuAction>, path: number[]) {
  if (path.length < 2) {
    return;
  }

  let scope: Array<MenuAction> = options;
  let parent: MenuAction = null;

  for (let depth = 0; depth < path.length - 1; depth++) {
    parent = scope?.[path[depth]];
    if (!parent) {
      return;
    }
    scope = parent.children ?? [];
  }

  if (!parent?.singleSelection || !scope?.length) {
    return;
  }

  const selectedIndex = path[path.length - 1];
  scope.forEach((child, index) => {
    child.state = index === selectedIndex ? 'on' : 'off';
  });
}

function emitMenuSelected(targetView: MenuView, option: MenuAction) {
  targetView.notify({
    eventName: SELECTED_EVENT,
    object: targetView,
    data: { option },
  } as MenuSelectedEvent);

  if (option.action) {
    option.action(option);
  }
}

function getOrCreateController(target: MenuView, symbol: symbol): MenuControllerState {
  target[symbol] ??= {};
  const state: MenuControllerState = target[symbol];

  state.backgroundOpacity = normalizeAndroidBackgroundOpacity(target.get?.('androidBackgroundOpacity'));

  if (!state.controller && target._context) {
    state.controller = new org.nativescript.menu.GlassAnchoredMenuController(target._context);
  }

  if (!state.selectionListener) {
    state.selectionListener = new org.nativescript.menu.GlassAnchoredMenuController.SelectionListener({
      onSelected: (path: string, keepsMenuOpen: boolean) => {
        const menuOptions = toMenuArray(state.options);
        const indices = pathToIndices(path);
        const selected = resolveOptionAtPath(menuOptions, indices);

        if (!selected) {
          return;
        }

        updateSingleSelectionState(menuOptions, indices);
        emitMenuSelected(target, selected);

        if (keepsMenuOpen && state.controller) {
          const serialized = JSON.stringify(menuOptions.map(serializeOption));
          if (typeof state.backgroundOpacity === 'number') {
            state.controller.show(target.android, serialized, state.selectionListener, state.backgroundOpacity);
          } else {
            state.controller.show(target.android, serialized, state.selectionListener);
          }
        }
      },
      onDismiss: () => {},
    });
  }

  return state;
}

function clearMenuState(target: MenuView, symbol: symbol) {
  const state: MenuControllerState = target[symbol];
  if (!state) {
    return;
  }

  if (state.controller) {
    state.controller.dismiss();
  }

  if (symbol === BUTTON_MENU_SYMBOL && state.clickListener && target.android) {
    target.android.setOnClickListener(null);
  }

  if (symbol === CONTEXT_MENU_SYMBOL && state.longClickListener && target.android) {
    target.android.setOnLongClickListener(null);
  }

  delete target[symbol];
}

function showMenu(target: MenuView, symbol: symbol) {
  const state = getOrCreateController(target, symbol);
  const options = toMenuArray(state.options);
  if (!state.controller || !target.android || !options.length) {
    return;
  }

  const serialized = JSON.stringify(options.map(serializeOption));
  if (typeof state.backgroundOpacity === 'number') {
    state.controller.show(target.android, serialized, state.selectionListener, state.backgroundOpacity);
  } else {
    state.controller.show(target.android, serialized, state.selectionListener);
  }
}

function applyButtonMenu(target: MenuView, options: Array<MenuAction> | MenuAction) {
  if (!options) {
    clearMenuState(target, BUTTON_MENU_SYMBOL);
    return;
  }

  const state = getOrCreateController(target, BUTTON_MENU_SYMBOL);
  state.options = options;
  state.backgroundOpacity = normalizeAndroidBackgroundOpacity(target.get?.('androidBackgroundOpacity'));

  if (!target.android) {
    target.once('loaded', () => applyButtonMenu(target, options));
    return;
  }

  if (!state.clickListener) {
    state.clickListener = new android.view.View.OnClickListener({
      onClick: () => showMenu(target, BUTTON_MENU_SYMBOL),
    });
    target.android.setClickable(true);
    target.android.setOnClickListener(state.clickListener);
  }

  if (!state.unloadBound) {
    state.unloadBound = true;
    target.on(View.unloadedEvent, () => {
      const current = target[BUTTON_MENU_SYMBOL] as MenuControllerState;
      current?.controller?.dismiss();
    });
  }
}

function applyContextMenu(target: MenuView, options: Array<MenuAction> | MenuAction) {
  if (!options || (Array.isArray(options) && options.length === 0)) {
    clearMenuState(target, CONTEXT_MENU_SYMBOL);
    return;
  }

  const state = getOrCreateController(target, CONTEXT_MENU_SYMBOL);
  state.options = options;
  state.backgroundOpacity = normalizeAndroidBackgroundOpacity(target.get?.('androidBackgroundOpacity'));

  if (!target.android) {
    target.once('loaded', () => applyContextMenu(target, options));
    return;
  }

  if (!state.longClickListener) {
    state.longClickListener = new android.view.View.OnLongClickListener({
      onLongClick: () => {
        showMenu(target, CONTEXT_MENU_SYMBOL);
        return true;
      },
    });

    target.android.setOnLongClickListener(state.longClickListener);
    target.android.setLongClickable(true);
  }

  if (!state.unloadBound) {
    state.unloadBound = true;
    target.on(View.unloadedEvent, () => {
      const current = target[CONTEXT_MENU_SYMBOL] as MenuControllerState;
      current?.controller?.dismiss();
    });
  }
}

const buttonMenuProperty = new Property<MenuView, Array<MenuAction> | MenuAction>({
  name: 'menu',
  valueChanged(target, _oldValue, newValue) {
    if (!target.android) {
      target.once(View.loadedEvent, () => applyButtonMenu(target, newValue));
      return;
    }
    applyButtonMenu(target, newValue);
  },
});
buttonMenuProperty.register(View);

const contextMenuProperty = new Property<MenuView, Array<MenuAction> | MenuAction>({
  name: 'contextMenu',
  valueChanged(target, _oldValue, newValue) {
    if (!target.android) {
      target.once(View.loadedEvent, () => applyContextMenu(target, newValue));
      return;
    }
    applyContextMenu(target, newValue);
  },
});
contextMenuProperty.register(View);

const androidBackgroundOpacityProperty = new Property<MenuView, number>({
  name: 'androidBackgroundOpacity',
  valueConverter: (value) => normalizeAndroidBackgroundOpacity(value),
  valueChanged(target, _oldValue, newValue) {
    const opacity = normalizeAndroidBackgroundOpacity(newValue);

    const buttonState: MenuControllerState = target[BUTTON_MENU_SYMBOL];
    if (buttonState) {
      buttonState.backgroundOpacity = opacity;
    }

    const contextState: MenuControllerState = target[CONTEXT_MENU_SYMBOL];
    if (contextState) {
      contextState.backgroundOpacity = opacity;
    }
  },
});
androidBackgroundOpacityProperty.register(View);

export class MenuButton extends Button {
  static selectedEvent = SELECTED_EVENT;

  set options(value: Array<MenuAction> | MenuAction) {
    this.set('menu', value);
  }
}

export class MenuImage extends Image {
  static selectedEvent = SELECTED_EVENT;

  set options(value: Array<MenuAction> | MenuAction) {
    this.set('menu', value);
  }
}
