import { Button, Color, Font, Image, ImageSource, Property, Utils, View } from '@nativescript/core';
import { MenuAction, MenuSelectedEvent } from './common';

export * from './common';

// icon helpers

function getColorFromUIColor(uiColor: UIColor): Color {
  const redRef = new interop.Reference<number>();
  const greenRef = new interop.Reference<number>();
  const blueRef = new interop.Reference<number>();
  const alphaRef = new interop.Reference<number>();

  uiColor.getRedGreenBlueAlpha(redRef, greenRef, blueRef, alphaRef);

  return new Color(alphaRef.value * 255, redRef.value * 255, greenRef.value * 255, blueRef.value * 255);
}

function makeColor(color: Color | string, destructive?: boolean): Color {
  if (!color) {
    return getColorFromUIColor(destructive ? UIColor.systemRedColor : UIColor.labelColor);
  }
  return color instanceof Color ? color.ios : new Color(color ?? 'black');
}

function getIconForOption(option: MenuAction): UIImage | null {
  if (!option.icon) {
    return null;
  }

  const icon = option.icon;
  let image: UIImage;

  if (typeof icon === 'string') {
    return UIImage.systemImageNamed(icon);
  }

  if ('systemIcon' in icon) {
    image = UIImage.systemImageNamed(icon.systemIcon);
  }

  if ('src' in icon) {
    image = icon.src.startsWith('~') ? ImageSource.fromFileSync(icon.src).ios : UIImage.imageNamed(icon.src);
  }

  if ('fontFamily' in icon) {
    image = ImageSource.fromFontIconCodeSync(unescape(icon.text), new Font(icon.fontFamily, 24, null, icon.fontWeight ?? 400), makeColor(icon.color, option.destructive)).ios;
  }

  if ('color' in icon && !('fontFamily' in icon)) {
    image = image?.imageWithTintColorRenderingMode(makeColor(icon.color).ios, UIImageRenderingMode.AlwaysOriginal);
  }

  return image;
}

// -- Menu options helpers --

function getDisplayStyle(option: MenuAction): UIMenuOptions | null {
  switch (option.childrenStyle) {
    case 'palette':
      return UIMenuOptions.DisplayAsPalette | UIMenuOptions.DisplayInline;
    case 'inline':
      return UIMenuOptions.DisplayInline;
    default:
      return null;
  }
}

function getPreferredSize(option: MenuAction): UIMenuElementSize {
  switch (option.preferredSize) {
    case 'small':
      return UIMenuElementSize.Small;
    case 'medium':
      return UIMenuElementSize.Medium;
    case 'large':
      return UIMenuElementSize.Large;
    default:
      return UIMenuElementSize.Automatic;
  }
}

// -- Core menu builder --

function buildAction(option: MenuAction, onSelect: (option: MenuAction) => void): UIMenuElement {
  if (option.children) {
    const actions = option.children.map((child) => buildAction(child, onSelect));

    let options = getDisplayStyle(option);
    if (option.destructive) {
      options |= UIMenuOptions.Destructive;
    }
    if (option.singleSelection) {
      options |= UIMenuOptions.SingleSelection;
    }

    const menu = UIMenu.menuWithTitleImageIdentifierOptionsChildren(option.name, getIconForOption(option), option.id?.toString() ?? null, options, actions);

    if (Utils.SDK_VERSION >= 17.4) {
      menu.displayPreferences = UIMenuDisplayPreferences.alloc().init();
    }
    if (option.subtitle && Utils.SDK_VERSION >= 15) {
      (menu as any).subtitle = option.subtitle;
    }
    if (option.preferredSize) {
      menu.preferredElementSize = getPreferredSize(option);
    }

    return menu;
  }

  const action = UIAction.actionWithTitleImageIdentifierHandler(option.name ?? null, getIconForOption(option), option.id?.toString() ?? null, () => onSelect(option));

  if (option.subtitle && Utils.SDK_VERSION >= 15) {
    (action as any).subtitle = option.subtitle;
  }

  switch (option.state) {
    case 'on':
      action.state = UIMenuElementState.On;
      break;
    case 'off':
      action.state = UIMenuElementState.Off;
      break;
    case 'mixed':
      action.state = UIMenuElementState.Mixed;
      break;
  }

  if (option.destructive) {
    action.attributes |= UIMenuElementAttributes.Destructive;
  }
  if (option.disabled) {
    action.attributes |= UIMenuElementAttributes.Disabled;
  }
  if (option.hidden) {
    action.attributes |= UIMenuElementAttributes.Hidden;
  }
  if (option.keepsMenuOpen) {
    action.attributes |= UIMenuElementAttributes.KeepsMenuPresented;
  }

  return action;
}

function buildMenu(options: Array<MenuAction> | MenuAction, onSelect: (option: MenuAction) => void): UIMenu {
  const rootMenu: MenuAction = Array.isArray(options) ? { name: '', icon: 'ellipsis', children: options, childrenStyle: 'inline' } : options;

  return buildAction(rootMenu, onSelect) as UIMenu;
}

function emitMenuSelected(targetView: View, option: MenuAction) {
  targetView.notify({
    eventName: 'menuSelected',
    object: targetView,
    data: { option },
  } as MenuSelectedEvent);

  if (option.action) {
    option.action(option);
  }
}

// ButtonMenu: attaches UIMenu as primary action on any view

const BUTTON_MENU_SYMBOL = Symbol('buttonMenu');

function applyButtonMenu(target: View, options: Array<MenuAction> | MenuAction) {
  target[BUTTON_MENU_SYMBOL] ??= { fakeButton: undefined };
  const state = target[BUTTON_MENU_SYMBOL];

  if (!options) {
    const nativeView: UIView | UIButton = target.ios;
    if (nativeView instanceof UIButton) {
      nativeView.menu = null;
      nativeView.showsMenuAsPrimaryAction = false;
    }
    state.fakeButton?.removeFromSuperview();
    state.fakeButton = undefined;
    return;
  }

  const nativeView: UIView | UIButton = target.ios;
  let targetButton: UIButton;

  if (nativeView instanceof UIButton) {
    targetButton = nativeView;
  } else {
    if (!state.fakeButton) {
      state.fakeButton = UIButton.new();
      state.fakeButton.backgroundColor = UIColor.clearColor;
      state.fakeButton.frame = nativeView.bounds;
      state.fakeButton.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
      nativeView.addSubview(state.fakeButton);
    }
    nativeView.bringSubviewToFront(state.fakeButton);
    targetButton = state.fakeButton;
  }

  const menu = buildMenu(options, (option) => emitMenuSelected(target, option));
  targetButton.menu = menu;
  targetButton.showsMenuAsPrimaryAction = true;
}

const buttonMenuProperty = new Property<View, Array<MenuAction> | MenuAction>({
  name: 'menu',
  valueChanged(target, _oldValue, newValue) {
    if (!target.ios) {
      target.once('loaded', () => applyButtonMenu(target, newValue));
      return;
    }
    applyButtonMenu(target, newValue);
  },
});
buttonMenuProperty.register(View);

// ContextMenu: attaches UIContextMenuInteraction for long-press

const CONTEXT_MENU_SYMBOL = Symbol('contextMenu');

@NativeClass()
class ContextMenuDelegate extends NSObject implements UIContextMenuInteractionDelegate {
  static ObjCProtocols = [UIContextMenuInteractionDelegate];
  targetView: UIView;
  menu: UIMenu;

  static initWith(targetView: UIView, menu: UIMenu): ContextMenuDelegate {
    const delegate = new ContextMenuDelegate();
    delegate.targetView = targetView;
    delegate.menu = menu;
    return delegate;
  }

  contextMenuInteractionConfigurationHighlightPreviewForItemWithIdentifier(_interaction: UIContextMenuInteraction, _configuration: UIContextMenuConfiguration, _identifier: any): UITargetedPreview {
    const params = UIPreviewParameters.alloc().init();
    params.backgroundColor = UIColor.clearColor;

    if (this.targetView?.layer?.mask) {
      const path = UIBezierPath.bezierPathWithCGPath((this.targetView.layer.mask as CAShapeLayer).path);
      params.visiblePath = path;
      params.shadowPath = path;
    }

    return UITargetedPreview.alloc().initWithViewParameters(this.targetView, params);
  }

  contextMenuInteractionConfigurationForMenuAtLocation(_interaction: UIContextMenuInteraction, _location: CGPoint): UIContextMenuConfiguration {
    return UIContextMenuConfiguration.configurationWithIdentifierPreviewProviderActionProvider(null, null, () => this.menu);
  }
}

function applyContextMenu(target: View, options: Array<MenuAction> | MenuAction) {
  target[CONTEXT_MENU_SYMBOL] ??= { delegate: undefined, interaction: undefined };
  const state = target[CONTEXT_MENU_SYMBOL];

  if (!options || (Array.isArray(options) && options.length === 0)) {
    if (state.interaction && target.ios) {
      (target.ios as UIView).removeInteraction(state.interaction);
      state.interaction = undefined;
    }
    return;
  }

  const nativeView = target.ios as UIView;

  if (state.interaction) {
    nativeView.removeInteraction(state.interaction);
  }

  const menu = buildMenu(options, (option) => emitMenuSelected(target, option));
  state.delegate = ContextMenuDelegate.initWith(nativeView, menu);
  state.interaction = UIContextMenuInteraction.alloc().initWithDelegate(state.delegate);
  nativeView.addInteraction(state.interaction);
}

const contextMenuProperty = new Property<View, Array<MenuAction> | MenuAction>({
  name: 'contextMenu',
  valueChanged(target, _oldValue, newValue) {
    if (!target.ios) {
      target.once('loaded', () => applyContextMenu(target, newValue));
      return;
    }
    applyContextMenu(target, newValue);
  },
});
contextMenuProperty.register(View);

export class MenuButton extends Button {
  set options(value: Array<MenuAction> | MenuAction) {
    this.set('menu', value);

    if (!this.hasListeners('menuSelected')) {
      this.on('menuSelected', (args) => {
        this.notify({ ...args, eventName: 'selected' });
      });
    }
  }
}

export class MenuImage extends Image {
  set options(value: Array<MenuAction> | MenuAction) {
    this.set('menu', value);

    if (!this.hasListeners('menuSelected')) {
      this.on('menuSelected', (args) => {
        this.notify({ ...args, eventName: 'selected' });
      });
    }
  }
}
