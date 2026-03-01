import { Color, ImageSource, Utils, View } from '@nativescript/core';
import { NativescriptToolbarCommon, ToolbarAppearance, ToolbarAppearanceSlot, ToolbarBarStyle, ToolbarBlurEffectStyle, ToolbarButtonAppearance, ToolbarButtonStateAppearance, ToolbarColor, ToolbarContentMode, ToolbarCustomView, ToolbarImageSource, ToolbarItem, ToolbarItemStyle, ToolbarItemTapEventData, ToolbarMetrics, ToolbarOffset, ToolbarPosition, ToolbarSystemItem, barStyleProperty, barTintColorProperty, compactAppearanceProperty, compactScrollEdgeAppearanceProperty, itemChangesAnimatedProperty, itemsProperty, positionProperty, scrollEdgeAppearanceProperty, standardAppearanceProperty, tintColorProperty, translucentProperty } from './common';

export * from './common';

const BAR_STYLE_MAP: Record<string, UIBarStyle> = {
  default: UIBarStyle.Default,
  black: UIBarStyle.Black,
  blackopaque: UIBarStyle.BlackOpaque,
  blacktranslucent: UIBarStyle.BlackTranslucent,
};

const ITEM_STYLE_MAP: Record<string, UIBarButtonItemStyle> = {
  plain: UIBarButtonItemStyle.Plain,
  bordered: UIBarButtonItemStyle.Bordered,
  done: UIBarButtonItemStyle.Done,
  prominent: UIBarButtonItemStyle.Prominent,
};

const POSITION_MAP: Record<string, UIBarPosition> = {
  any: UIBarPosition.Any,
  bottom: UIBarPosition.Bottom,
  top: UIBarPosition.Top,
  topattached: UIBarPosition.TopAttached,
};

const METRICS_MAP: Record<string, UIBarMetrics> = {
  default: UIBarMetrics.Default,
  compact: UIBarMetrics.Compact,
  defaultprompt: UIBarMetrics.DefaultPrompt,
  compactprompt: UIBarMetrics.CompactPrompt,
  landscapephone: UIBarMetrics.LandscapePhone,
  landscapephoneprompt: UIBarMetrics.LandscapePhonePrompt,
};

const CONTENT_MODE_MAP: Record<string, UIViewContentMode> = {
  scaletofill: UIViewContentMode.ScaleToFill,
  scaleaspectfit: UIViewContentMode.ScaleAspectFit,
  scaleaspectfill: UIViewContentMode.ScaleAspectFill,
  redraw: UIViewContentMode.Redraw,
  center: UIViewContentMode.Center,
  top: UIViewContentMode.Top,
  bottom: UIViewContentMode.Bottom,
  left: UIViewContentMode.Left,
  right: UIViewContentMode.Right,
  topleft: UIViewContentMode.TopLeft,
  topright: UIViewContentMode.TopRight,
  bottomleft: UIViewContentMode.BottomLeft,
  bottomright: UIViewContentMode.BottomRight,
};

const BLUR_EFFECT_STYLE_MAP: Record<string, UIBlurEffectStyle> = {
  extralight: UIBlurEffectStyle.ExtraLight,
  light: UIBlurEffectStyle.Light,
  dark: UIBlurEffectStyle.Dark,
  extradark: UIBlurEffectStyle.ExtraDark,
  regular: UIBlurEffectStyle.Regular,
  prominent: UIBlurEffectStyle.Prominent,
  systemultrathinmaterial: UIBlurEffectStyle.SystemUltraThinMaterial,
  systemthinmaterial: UIBlurEffectStyle.SystemThinMaterial,
  systemmaterial: UIBlurEffectStyle.SystemMaterial,
  systemthickmaterial: UIBlurEffectStyle.SystemThickMaterial,
  systemchromematerial: UIBlurEffectStyle.SystemChromeMaterial,
  systemultrathinmateriallight: UIBlurEffectStyle.SystemUltraThinMaterialLight,
  systemthinmateriallight: UIBlurEffectStyle.SystemThinMaterialLight,
  systemmateriallight: UIBlurEffectStyle.SystemMaterialLight,
  systemthickmateriallight: UIBlurEffectStyle.SystemThickMaterialLight,
  systemchromemateriallight: UIBlurEffectStyle.SystemChromeMaterialLight,
  systemultrathinmaterialdark: UIBlurEffectStyle.SystemUltraThinMaterialDark,
  systemthinmaterialdark: UIBlurEffectStyle.SystemThinMaterialDark,
  systemmaterialdark: UIBlurEffectStyle.SystemMaterialDark,
  systemthickmaterialdark: UIBlurEffectStyle.SystemThickMaterialDark,
  systemchromematerialdark: UIBlurEffectStyle.SystemChromeMaterialDark,
};

const SYSTEM_ITEM_MAP: Record<string, UIBarButtonSystemItem> = {
  done: UIBarButtonSystemItem.Done,
  cancel: UIBarButtonSystemItem.Cancel,
  edit: UIBarButtonSystemItem.Edit,
  save: UIBarButtonSystemItem.Save,
  add: UIBarButtonSystemItem.Add,
  flexiblespace: UIBarButtonSystemItem.FlexibleSpace,
  fixedspace: UIBarButtonSystemItem.FixedSpace,
  compose: UIBarButtonSystemItem.Compose,
  reply: UIBarButtonSystemItem.Reply,
  action: UIBarButtonSystemItem.Action,
  organize: UIBarButtonSystemItem.Organize,
  bookmarks: UIBarButtonSystemItem.Bookmarks,
  search: UIBarButtonSystemItem.Search,
  refresh: UIBarButtonSystemItem.Refresh,
  stop: UIBarButtonSystemItem.Stop,
  camera: UIBarButtonSystemItem.Camera,
  trash: UIBarButtonSystemItem.Trash,
  play: UIBarButtonSystemItem.Play,
  pause: UIBarButtonSystemItem.Pause,
  rewind: UIBarButtonSystemItem.Rewind,
  fastforward: UIBarButtonSystemItem.FastForward,
  undo: UIBarButtonSystemItem.Undo,
  redo: UIBarButtonSystemItem.Redo,
  pagecurl: UIBarButtonSystemItem.PageCurl,
  close: UIBarButtonSystemItem.Close,
  writingtools: UIBarButtonSystemItem.WritingTools,
};

const TITLE_ATTRIBUTE_KEY_MAP: Record<string, string> = {
  foregroundcolor: NSForegroundColorAttributeName,
  backgroundcolor: NSBackgroundColorAttributeName,
  strokecolor: NSStrokeColorAttributeName,
  underlinecolor: NSUnderlineColorAttributeName,
  strikethroughcolor: NSStrikethroughColorAttributeName,
  font: NSFontAttributeName,
  kern: NSKernAttributeName,
  shadow: NSShadowAttributeName,
  paragraphstyle: NSParagraphStyleAttributeName,
};

const COLOR_ATTRIBUTE_KEYS = new Set<string>(['foregroundcolor', 'backgroundcolor', 'strokecolor', 'underlinecolor', 'strikethroughcolor']);

function normalizeToken(value: string): string {
  return (value ?? '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

function mapOrDefault<T>(value: string | number, map: Record<string, T>, fallback: T): T {
  if (typeof value === 'number') {
    return value as unknown as T;
  }
  if (value === undefined || value === null) {
    return fallback;
  }
  const normalized = normalizeToken(value);
  return map[normalized] ?? fallback;
}

function resolveBarStyle(value: ToolbarBarStyle): UIBarStyle {
  return mapOrDefault(value as any, BAR_STYLE_MAP, UIBarStyle.Default);
}

function resolveItemStyle(value: ToolbarItemStyle): UIBarButtonItemStyle {
  return mapOrDefault(value as any, ITEM_STYLE_MAP, UIBarButtonItemStyle.Plain);
}

function resolvePosition(value: ToolbarPosition): UIBarPosition {
  return mapOrDefault(value as any, POSITION_MAP, UIBarPosition.Any);
}

function resolveMetrics(value: ToolbarMetrics): UIBarMetrics {
  return mapOrDefault(value as any, METRICS_MAP, UIBarMetrics.Default);
}

function resolveContentMode(value: ToolbarContentMode): UIViewContentMode {
  return mapOrDefault(value as any, CONTENT_MODE_MAP, UIViewContentMode.ScaleToFill);
}

function resolveBlurEffectStyle(value: ToolbarBlurEffectStyle): UIBlurEffectStyle {
  return mapOrDefault(value as any, BLUR_EFFECT_STYLE_MAP, UIBlurEffectStyle.Regular);
}

function resolveSystemItem(value: ToolbarSystemItem): UIBarButtonSystemItem {
  return mapOrDefault(value as any, SYSTEM_ITEM_MAP, UIBarButtonSystemItem.Done);
}

function toUIColor(value: ToolbarColor): UIColor {
  if (value === undefined || value === null) {
    return null;
  }
  if (value instanceof Color) {
    return value.ios;
  }
  if (value instanceof UIColor) {
    return value;
  }
  try {
    return new Color(value as string).ios;
  } catch {
    return null;
  }
}

function toUIImage(value: ToolbarImageSource): UIImage {
  if (value === undefined || value === null) {
    return null;
  }
  if (value instanceof UIImage) {
    return value;
  }
  if (value instanceof ImageSource) {
    return value.ios;
  }
  if (typeof value === 'string') {
    if (value.startsWith('sf://') || value.startsWith('symbol://')) {
      const symbolName = value.substring(value.indexOf('://') + 3);
      return UIImage.systemImageNamed(symbolName);
    }
    try {
      const source = ImageSource.fromFileOrResourceSync(value);
      if (source?.ios) {
        return source.ios;
      }
    } catch {
      // ignore and fall through to UIImage lookup
    }
    return UIImage.imageNamed(value);
  }
  return value as any;
}

function toUIOffset(value: ToolbarOffset): UIOffset {
  if (!value) {
    return UIOffsetZero;
  }
  return {
    horizontal: value.horizontal ?? 0,
    vertical: value.vertical ?? 0,
  };
}

function itemIdKey(id: number | string): string {
  return `${typeof id}:${id}`;
}

function isSpacerSystemItem(systemItem: ToolbarSystemItem): boolean {
  if (typeof systemItem === 'number') {
    return systemItem === UIBarButtonSystemItem.FlexibleSpace || systemItem === UIBarButtonSystemItem.FixedSpace;
  }
  const normalized = normalizeToken(`${systemItem ?? ''}`);
  return normalized === 'flexiblespace' || normalized === 'fixedspace';
}

@NativeClass()
class ToolbarDelegate extends NSObject implements UIToolbarDelegate {
  static ObjCProtocols = [UIToolbarDelegate];

  owner: WeakRef<NativescriptToolbar>;

  static initWithOwner(owner: WeakRef<NativescriptToolbar>): ToolbarDelegate {
    const delegate = ToolbarDelegate.new() as ToolbarDelegate;
    delegate.owner = owner;
    return delegate;
  }

  positionForBar(_bar: UIBarPositioning): UIBarPosition {
    const owner = this.owner?.deref();
    return owner?._resolvedPosition ?? UIBarPosition.Any;
  }
}

@NativeClass()
class ToolbarItemTarget extends NSObject {
  static ObjCExposedMethods = {
    handleTap: {
      returns: interop.types.void,
      params: [UIBarButtonItem],
    },
  };

  owner: WeakRef<NativescriptToolbar>;
  item: ToolbarItem;
  index: number;

  static initWithOwnerItemIndex(owner: WeakRef<NativescriptToolbar>, item: ToolbarItem, index: number): ToolbarItemTarget {
    const target = ToolbarItemTarget.new() as ToolbarItemTarget;
    target.owner = owner;
    target.item = item;
    target.index = index;
    return target;
  }

  handleTap(nativeItem: UIBarButtonItem): void {
    const owner = this.owner?.deref();
    owner?._notifyItemTap(this.item, this.index, nativeItem);
  }
}

export class NativescriptToolbar extends NativescriptToolbarCommon {
  nativeViewProtected: UIToolbar;

  _resolvedPosition = UIBarPosition.Any;
  private _delegate: ToolbarDelegate;
  private _itemTargets: ToolbarItemTarget[] = [];
  private _nativeItems: UIBarButtonItem[] = [];
  private _itemsById = new Map<string, number>();
  private _settingItemsFromMethod = false;
  private _settingAppearanceFromMethod = false;

  createNativeView() {
    return UIToolbar.new();
  }

  initNativeView(): void {
    super.initNativeView();
    this._delegate = ToolbarDelegate.initWithOwner(new WeakRef(this));
    this.nativeViewProtected.delegate = this._delegate;
  }

  disposeNativeView(): void {
    if (this.nativeViewProtected) {
      this.nativeViewProtected.delegate = null;
      this.nativeViewProtected.items = null;
    }
    this._nativeItems = [];
    this._itemsById.clear();
    this._itemTargets = [];
    this._delegate = null;
    super.disposeNativeView();
  }

  setItems(items: ToolbarItem[], animated: boolean = this.itemChangesAnimated): void {
    const normalizedItems = Array.isArray(items) ? items : [];
    this._settingItemsFromMethod = true;
    this.items = normalizedItems;
    this._settingItemsFromMethod = false;
    this._applyItems(normalizedItems, animated);
  }

  getNativeItems(): UIBarButtonItem[] {
    return [...this._nativeItems];
  }

  getNativeItem(indexOrId: number | string): UIBarButtonItem {
    if (typeof indexOrId === 'number') {
      return this._nativeItems[indexOrId] ?? null;
    }
    const index = this._itemsById.get(itemIdKey(indexOrId));
    if (index === undefined) {
      return null;
    }
    return this._nativeItems[index] ?? null;
  }

  setAppearance(slot: ToolbarAppearanceSlot, appearance: ToolbarAppearance): void {
    this._settingAppearanceFromMethod = true;
    switch (slot) {
      case 'standard':
        this.standardAppearance = appearance;
        break;
      case 'compact':
        this.compactAppearance = appearance;
        break;
      case 'scrollEdge':
        this.scrollEdgeAppearance = appearance;
        break;
      case 'compactScrollEdge':
        this.compactScrollEdgeAppearance = appearance;
        break;
    }
    this._settingAppearanceFromMethod = false;
    this._applyAppearance(slot, appearance);
  }

  setBackgroundImage(image: ToolbarImageSource, position: ToolbarPosition = this.position, metrics: ToolbarMetrics = this.defaultMetrics): void {
    if (!this.nativeViewProtected) {
      return;
    }
    const nativeImage = toUIImage(image);
    this.nativeViewProtected.setBackgroundImageForToolbarPositionBarMetrics(nativeImage, resolvePosition(position), resolveMetrics(metrics));
  }

  getBackgroundImage(position: ToolbarPosition = this.position, metrics: ToolbarMetrics = this.defaultMetrics): UIImage {
    if (!this.nativeViewProtected) {
      return null;
    }
    return this.nativeViewProtected.backgroundImageForToolbarPositionBarMetrics(resolvePosition(position), resolveMetrics(metrics));
  }

  setShadowImage(image: ToolbarImageSource, position: ToolbarPosition = this.position): void {
    if (!this.nativeViewProtected) {
      return;
    }
    this.nativeViewProtected.setShadowImageForToolbarPosition(toUIImage(image), resolvePosition(position));
  }

  getShadowImage(position: ToolbarPosition = this.position): UIImage {
    if (!this.nativeViewProtected) {
      return null;
    }
    return this.nativeViewProtected.shadowImageForToolbarPosition(resolvePosition(position));
  }

  private _applyItems(items: ToolbarItem[], animated: boolean): void {
    if (!this.nativeViewProtected) {
      return;
    }

    const normalizedItems = Array.isArray(items) ? items : [];
    const nativeItems: UIBarButtonItem[] = [];

    this._itemTargets = [];
    this._itemsById.clear();

    normalizedItems.forEach((item, index) => {
      const descriptor = item ?? {};
      const nativeItem = this._createNativeItem(descriptor, index);
      nativeItems.push(nativeItem);
      if (descriptor.id !== undefined && descriptor.id !== null) {
        this._itemsById.set(itemIdKey(descriptor.id), index);
      }
    });

    this._nativeItems = nativeItems;
    this.nativeViewProtected.setItemsAnimated(nativeItems, !!animated);
  }

  private _createNativeItem(item: ToolbarItem, index: number): UIBarButtonItem {
    let nativeItem: UIBarButtonItem;

    if (item.nativeItem instanceof UIBarButtonItem) {
      nativeItem = item.nativeItem;
    } else if (item.customView) {
      const customView = this._resolveCustomView(item.customView);
      nativeItem = customView ? UIBarButtonItem.alloc().initWithCustomView(customView) : UIBarButtonItem.alloc().initWithBarButtonSystemItemTargetAction(UIBarButtonSystemItem.FlexibleSpace, null, null);
    } else if (item.systemItem !== undefined && item.systemItem !== null) {
      const systemItem = resolveSystemItem(item.systemItem);
      if (Utils.SDK_VERSION >= 16 && item.primaryAction && item.menu) {
        nativeItem = UIBarButtonItem.alloc().initWithBarButtonSystemItemPrimaryActionMenu(systemItem, item.primaryAction, item.menu);
      } else if (Utils.SDK_VERSION >= 14 && item.primaryAction) {
        nativeItem = UIBarButtonItem.alloc().initWithBarButtonSystemItemPrimaryAction(systemItem, item.primaryAction);
      } else if (Utils.SDK_VERSION >= 14 && item.menu) {
        nativeItem = UIBarButtonItem.alloc().initWithBarButtonSystemItemMenu(systemItem, item.menu);
      } else {
        nativeItem = UIBarButtonItem.alloc().initWithBarButtonSystemItemTargetAction(systemItem, null, null);
      }
    } else {
      const itemStyle = resolveItemStyle(item.style);
      const image = this._resolveItemImage(item);
      if (image) {
        nativeItem = UIBarButtonItem.alloc().initWithImageStyleTargetAction(image, itemStyle, null, null);
      } else {
        nativeItem = UIBarButtonItem.alloc().initWithTitleStyleTargetAction(item.title ?? '', itemStyle, null, null);
      }
    }

    this._applyItemConfiguration(nativeItem, item);

    if (!item.nativeItem && !item.customView && !item.menu && !item.primaryAction && !isSpacerSystemItem(item.systemItem)) {
      const target = ToolbarItemTarget.initWithOwnerItemIndex(new WeakRef(this), item, index);
      this._itemTargets.push(target);
      nativeItem.target = target;
      nativeItem.action = 'handleTap';
    }

    return nativeItem;
  }

  _notifyItemTap(item: ToolbarItem, index: number, nativeItem: UIBarButtonItem): void {
    const eventData: ToolbarItemTapEventData = {
      eventName: NativescriptToolbar.itemTapEvent,
      object: this,
      data: {
        item,
        index,
        nativeItem,
      },
    };

    this.notify(eventData);
    item?.onTap?.(eventData);
  }

  private _applyItemConfiguration(nativeItem: UIBarButtonItem, item: ToolbarItem): void {
    if (item.title !== undefined) {
      nativeItem.title = item.title ?? null;
    }

    const image = this._resolveItemImage(item);
    if (image) {
      nativeItem.image = image;
    }

    if (item.landscapeImagePhone !== undefined) {
      nativeItem.landscapeImagePhone = toUIImage(item.landscapeImagePhone);
    }

    if (item.width !== undefined && item.width !== null) {
      nativeItem.width = item.width;
    }

    if (item.enabled !== undefined) {
      nativeItem.enabled = !!item.enabled;
    }

    if (item.tintColor !== undefined) {
      nativeItem.tintColor = toUIColor(item.tintColor);
    }

    if (item.tag !== undefined && item.tag !== null) {
      nativeItem.tag = item.tag;
    }

    if (item.accessibilityIdentifier !== undefined) {
      nativeItem.accessibilityIdentifier = item.accessibilityIdentifier ?? null;
    }

    if (Utils.SDK_VERSION >= 14 && item.menu !== undefined) {
      nativeItem.menu = item.menu ?? null;
    }

    if (Utils.SDK_VERSION >= 14 && item.primaryAction !== undefined) {
      nativeItem.primaryAction = item.primaryAction ?? null;
    }

    if (Utils.SDK_VERSION >= 15 && item.changesSelectionAsPrimaryAction !== undefined) {
      nativeItem.changesSelectionAsPrimaryAction = !!item.changesSelectionAsPrimaryAction;
    }

    if (Utils.SDK_VERSION >= 15 && item.selected !== undefined) {
      nativeItem.selected = !!item.selected;
    }

    if (Utils.SDK_VERSION >= 16 && item.hidden !== undefined) {
      nativeItem.hidden = !!item.hidden;
    }

    if (item.springLoaded !== undefined) {
      nativeItem.springLoaded = !!item.springLoaded;
    }

    if (Utils.SDK_VERSION >= 17 && item.symbolAnimationEnabled !== undefined) {
      nativeItem.symbolAnimationEnabled = !!item.symbolAnimationEnabled;
    }
  }

  private _resolveCustomView(customView: ToolbarCustomView | (() => ToolbarCustomView)): UIView {
    const resolved = typeof customView === 'function' ? customView() : customView;
    if (!resolved) {
      return null;
    }
    if (resolved instanceof UIView) {
      return resolved;
    }
    if (resolved instanceof View) {
      if (resolved.ios instanceof UIView) {
        return resolved.ios;
      }
      if ((resolved as any).nativeViewProtected instanceof UIView) {
        return (resolved as any).nativeViewProtected;
      }
    }
    return resolved as any;
  }

  private _resolveItemImage(item: ToolbarItem): UIImage {
    if (item.systemImage) {
      return UIImage.systemImageNamed(item.systemImage);
    }
    return toUIImage(item.image);
  }

  private _applyAppearance(slot: ToolbarAppearanceSlot, appearance: ToolbarAppearance): void {
    if (!this.nativeViewProtected || Utils.SDK_VERSION < 13) {
      return;
    }

    const nativeAppearance = appearance ? this._buildAppearance(appearance) : null;
    switch (slot) {
      case 'standard':
        this.nativeViewProtected.standardAppearance = nativeAppearance;
        break;
      case 'compact':
        this.nativeViewProtected.compactAppearance = nativeAppearance;
        break;
      case 'scrollEdge':
        if (Utils.SDK_VERSION >= 15) {
          this.nativeViewProtected.scrollEdgeAppearance = nativeAppearance;
        }
        break;
      case 'compactScrollEdge':
        if (Utils.SDK_VERSION >= 15) {
          this.nativeViewProtected.compactScrollEdgeAppearance = nativeAppearance;
        }
        break;
    }
  }

  private _buildAppearance(appearance: ToolbarAppearance): UIToolbarAppearance {
    const nativeAppearance = UIToolbarAppearance.alloc().init();

    switch (appearance.preset) {
      case 'default':
        nativeAppearance.configureWithDefaultBackground();
        break;
      case 'opaque':
        nativeAppearance.configureWithOpaqueBackground();
        break;
      case 'transparent':
        nativeAppearance.configureWithTransparentBackground();
        break;
    }

    if (appearance.backgroundColor !== undefined) {
      nativeAppearance.backgroundColor = toUIColor(appearance.backgroundColor);
    }

    if (appearance.backgroundEffectStyle !== undefined) {
      nativeAppearance.backgroundEffect = UIBlurEffect.effectWithStyle(resolveBlurEffectStyle(appearance.backgroundEffectStyle));
    }

    if (appearance.backgroundImage !== undefined) {
      nativeAppearance.backgroundImage = toUIImage(appearance.backgroundImage);
    }

    if (appearance.backgroundImageContentMode !== undefined) {
      nativeAppearance.backgroundImageContentMode = resolveContentMode(appearance.backgroundImageContentMode);
    }

    if (appearance.shadowColor !== undefined) {
      nativeAppearance.shadowColor = toUIColor(appearance.shadowColor);
    }

    if (appearance.shadowImage !== undefined) {
      nativeAppearance.shadowImage = toUIImage(appearance.shadowImage);
    }

    if (appearance.buttonAppearance) {
      this._applyButtonAppearance(nativeAppearance.buttonAppearance, appearance.buttonAppearance);
    }

    if (appearance.doneButtonAppearance && nativeAppearance.respondsToSelector('doneButtonAppearance')) {
      this._applyButtonAppearance(nativeAppearance.doneButtonAppearance, appearance.doneButtonAppearance);
    }

    if (appearance.prominentButtonAppearance && nativeAppearance.respondsToSelector('prominentButtonAppearance')) {
      this._applyButtonAppearance((nativeAppearance as any).prominentButtonAppearance, appearance.prominentButtonAppearance);
    }

    return nativeAppearance;
  }

  private _applyButtonAppearance(nativeAppearance: UIBarButtonItemAppearance, appearance: ToolbarButtonAppearance): void {
    if (!nativeAppearance || !appearance) {
      return;
    }

    if (appearance.style !== undefined) {
      nativeAppearance.configureWithDefaultForStyle(resolveItemStyle(appearance.style));
    }

    this._applyButtonStateAppearance(nativeAppearance.normal, appearance.normal);
    this._applyButtonStateAppearance(nativeAppearance.highlighted, appearance.highlighted);
    this._applyButtonStateAppearance(nativeAppearance.disabled, appearance.disabled);
    this._applyButtonStateAppearance(nativeAppearance.focused, appearance.focused);
  }

  private _applyButtonStateAppearance(nativeStateAppearance: UIBarButtonItemStateAppearance, appearance: ToolbarButtonStateAppearance): void {
    if (!nativeStateAppearance || !appearance) {
      return;
    }

    if (appearance.titleTextAttributes !== undefined) {
      nativeStateAppearance.titleTextAttributes = this._toTitleAttributes(appearance.titleTextAttributes);
    }

    if (appearance.titlePositionAdjustment !== undefined) {
      nativeStateAppearance.titlePositionAdjustment = toUIOffset(appearance.titlePositionAdjustment);
    }

    if (appearance.backgroundImage !== undefined) {
      nativeStateAppearance.backgroundImage = toUIImage(appearance.backgroundImage);
    }

    if (appearance.backgroundImagePositionAdjustment !== undefined) {
      nativeStateAppearance.backgroundImagePositionAdjustment = toUIOffset(appearance.backgroundImagePositionAdjustment);
    }
  }

  private _toTitleAttributes(attributes: Record<string, any>): NSDictionary<string, any> {
    if (!attributes) {
      return null;
    }

    if (attributes instanceof NSDictionary) {
      return attributes;
    }

    const dict = NSMutableDictionary.new();
    for (const key of Object.keys(attributes)) {
      const value = attributes[key];
      if (value === undefined || value === null) {
        continue;
      }

      const normalizedKey = normalizeToken(key);
      const mappedKey = TITLE_ATTRIBUTE_KEY_MAP[normalizedKey] ?? key;

      if (COLOR_ATTRIBUTE_KEYS.has(normalizedKey)) {
        const uiColor = toUIColor(value);
        if (uiColor) {
          dict.setObjectForKey(uiColor, mappedKey);
        }
        continue;
      }

      dict.setObjectForKey(value, mappedKey);
    }

    return dict as NSDictionary<string, any>;
  }

  [itemsProperty.setNative](value: ToolbarItem[]) {
    if (this._settingItemsFromMethod) {
      return;
    }
    this._applyItems(value, this.itemChangesAnimated);
  }

  [barStyleProperty.setNative](value: ToolbarBarStyle) {
    if (!this.nativeViewProtected) {
      return;
    }
    this.nativeViewProtected.barStyle = resolveBarStyle(value);
  }

  [translucentProperty.setNative](value: boolean) {
    if (!this.nativeViewProtected) {
      return;
    }
    this.nativeViewProtected.translucent = value;
  }

  [barTintColorProperty.setNative](value: ToolbarColor) {
    if (!this.nativeViewProtected) {
      return;
    }
    this.nativeViewProtected.barTintColor = toUIColor(value);
  }

  [tintColorProperty.setNative](value: ToolbarColor) {
    if (!this.nativeViewProtected) {
      return;
    }
    this.nativeViewProtected.tintColor = toUIColor(value);
  }

  [positionProperty.setNative](value: ToolbarPosition) {
    this._resolvedPosition = resolvePosition(value);
  }

  [itemChangesAnimatedProperty.setNative](_value: boolean) {}

  [standardAppearanceProperty.setNative](value: ToolbarAppearance) {
    if (this._settingAppearanceFromMethod) {
      return;
    }
    this._applyAppearance('standard', value);
  }

  [compactAppearanceProperty.setNative](value: ToolbarAppearance) {
    if (this._settingAppearanceFromMethod) {
      return;
    }
    this._applyAppearance('compact', value);
  }

  [scrollEdgeAppearanceProperty.setNative](value: ToolbarAppearance) {
    if (this._settingAppearanceFromMethod) {
      return;
    }
    this._applyAppearance('scrollEdge', value);
  }

  [compactScrollEdgeAppearanceProperty.setNative](value: ToolbarAppearance) {
    if (this._settingAppearanceFromMethod) {
      return;
    }
    this._applyAppearance('compactScrollEdge', value);
  }
}
