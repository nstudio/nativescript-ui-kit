import { booleanConverter, Color, EventData, ImageSource, Property, View } from '@nativescript/core';

export type ToolbarImageSource = string | ImageSource | any;
export type ToolbarColor = string | Color | any;
export type ToolbarItemReference = number | string;

export type ToolbarBarStyle = 'default' | 'black' | 'blackOpaque' | 'blackTranslucent' | number;
export type ToolbarItemStyle = 'plain' | 'bordered' | 'done' | 'prominent' | number;
export type ToolbarPosition = 'any' | 'bottom' | 'top' | 'topAttached' | number;
export type ToolbarMetrics = 'default' | 'compact' | 'defaultPrompt' | 'compactPrompt' | 'landscapePhone' | 'landscapePhonePrompt' | number;
export type ToolbarAppearanceSlot = 'standard' | 'compact' | 'scrollEdge' | 'compactScrollEdge';
export type ToolbarAppearancePreset = 'default' | 'opaque' | 'transparent';
export type ToolbarContentMode = 'scaleToFill' | 'scaleAspectFit' | 'scaleAspectFill' | 'redraw' | 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | number;
export type ToolbarBlurEffectStyle = 'extraLight' | 'light' | 'dark' | 'extraDark' | 'regular' | 'prominent' | 'systemUltraThinMaterial' | 'systemThinMaterial' | 'systemMaterial' | 'systemThickMaterial' | 'systemChromeMaterial' | 'systemUltraThinMaterialLight' | 'systemThinMaterialLight' | 'systemMaterialLight' | 'systemThickMaterialLight' | 'systemChromeMaterialLight' | 'systemUltraThinMaterialDark' | 'systemThinMaterialDark' | 'systemMaterialDark' | 'systemThickMaterialDark' | 'systemChromeMaterialDark' | number;

export type ToolbarSystemItem = 'done' | 'cancel' | 'edit' | 'save' | 'add' | 'flexibleSpace' | 'fixedSpace' | 'compose' | 'reply' | 'action' | 'organize' | 'bookmarks' | 'search' | 'refresh' | 'stop' | 'camera' | 'trash' | 'play' | 'pause' | 'rewind' | 'fastForward' | 'undo' | 'redo' | 'pageCurl' | 'close' | 'writingTools' | number;

export interface ToolbarOffset {
  horizontal: number;
  vertical: number;
}

export interface ToolbarButtonStateAppearance {
  titleTextAttributes?: Record<string, any>;
  titlePositionAdjustment?: ToolbarOffset;
  backgroundImage?: ToolbarImageSource;
  backgroundImagePositionAdjustment?: ToolbarOffset;
}

export interface ToolbarButtonAppearance {
  style?: ToolbarItemStyle;
  normal?: ToolbarButtonStateAppearance;
  highlighted?: ToolbarButtonStateAppearance;
  disabled?: ToolbarButtonStateAppearance;
  focused?: ToolbarButtonStateAppearance;
}

export interface ToolbarAppearance {
  preset?: ToolbarAppearancePreset;
  backgroundColor?: ToolbarColor;
  backgroundEffectStyle?: ToolbarBlurEffectStyle;
  backgroundImage?: ToolbarImageSource;
  backgroundImageContentMode?: ToolbarContentMode;
  shadowColor?: ToolbarColor;
  shadowImage?: ToolbarImageSource;
  buttonAppearance?: ToolbarButtonAppearance;
  doneButtonAppearance?: ToolbarButtonAppearance;
  prominentButtonAppearance?: ToolbarButtonAppearance;
}

export interface ToolbarItemTapEventData extends EventData {
  data: {
    item: ToolbarItem;
    index: number;
    nativeItem: any;
  };
}

export type ToolbarCustomView = View | any;

export interface ToolbarItem {
  id?: ToolbarItemReference;
  nativeItem?: any;
  systemItem?: ToolbarSystemItem;
  title?: string;
  style?: ToolbarItemStyle;
  image?: ToolbarImageSource;
  systemImage?: string;
  landscapeImagePhone?: ToolbarImageSource;
  customView?: ToolbarCustomView | (() => ToolbarCustomView);
  width?: number;
  enabled?: boolean;
  tintColor?: ToolbarColor;
  tag?: number;
  accessibilityIdentifier?: string;
  menu?: any;
  primaryAction?: any;
  changesSelectionAsPrimaryAction?: boolean;
  selected?: boolean;
  hidden?: boolean;
  springLoaded?: boolean;
  symbolAnimationEnabled?: boolean;
  onTap?: (args: ToolbarItemTapEventData) => void;
}

export class NativescriptToolbarCommon extends View {
  static itemTapEvent = 'itemTap';

  items: ToolbarItem[];
  barStyle: ToolbarBarStyle;
  translucent: boolean;
  barTintColor: ToolbarColor;
  tintColor: ToolbarColor;
  position: ToolbarPosition;
  defaultMetrics: ToolbarMetrics;
  itemChangesAnimated: boolean;
  standardAppearance: ToolbarAppearance;
  compactAppearance: ToolbarAppearance;
  scrollEdgeAppearance: ToolbarAppearance;
  compactScrollEdgeAppearance: ToolbarAppearance;

  setItems(items: ToolbarItem[], _animated: boolean = this.itemChangesAnimated): void {
    this.items = items;
  }

  getNativeItems(): any[] {
    return [];
  }

  getNativeItem(_indexOrId: ToolbarItemReference): any {
    return null;
  }

  setAppearance(slot: ToolbarAppearanceSlot, appearance: ToolbarAppearance): void {
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
  }

  setBackgroundImage(_image: ToolbarImageSource, _position: ToolbarPosition = this.position, _metrics: ToolbarMetrics = this.defaultMetrics): void {}

  getBackgroundImage(_position: ToolbarPosition = this.position, _metrics: ToolbarMetrics = this.defaultMetrics): any {
    return null;
  }

  clearBackgroundImage(position: ToolbarPosition = this.position, metrics: ToolbarMetrics = this.defaultMetrics): void {
    this.setBackgroundImage(null, position, metrics);
  }

  setShadowImage(_image: ToolbarImageSource, _position: ToolbarPosition = this.position): void {}

  getShadowImage(_position: ToolbarPosition = this.position): any {
    return null;
  }

  clearShadowImage(position: ToolbarPosition = this.position): void {
    this.setShadowImage(null, position);
  }
}

export const itemsProperty = new Property<NativescriptToolbarCommon, ToolbarItem[]>({
  name: 'items',
  defaultValue: null,
});

export const barStyleProperty = new Property<NativescriptToolbarCommon, ToolbarBarStyle>({
  name: 'barStyle',
  defaultValue: 'default',
});

export const translucentProperty = new Property<NativescriptToolbarCommon, boolean>({
  name: 'translucent',
  defaultValue: true,
  valueConverter: booleanConverter,
});

export const barTintColorProperty = new Property<NativescriptToolbarCommon, ToolbarColor>({
  name: 'barTintColor',
  defaultValue: null,
});

export const tintColorProperty = new Property<NativescriptToolbarCommon, ToolbarColor>({
  name: 'tintColor',
  defaultValue: null,
});

export const positionProperty = new Property<NativescriptToolbarCommon, ToolbarPosition>({
  name: 'position',
  defaultValue: 'any',
});

export const defaultMetricsProperty = new Property<NativescriptToolbarCommon, ToolbarMetrics>({
  name: 'defaultMetrics',
  defaultValue: 'default',
});

export const itemChangesAnimatedProperty = new Property<NativescriptToolbarCommon, boolean>({
  name: 'itemChangesAnimated',
  defaultValue: true,
  valueConverter: booleanConverter,
});

export const standardAppearanceProperty = new Property<NativescriptToolbarCommon, ToolbarAppearance>({
  name: 'standardAppearance',
  defaultValue: null,
});

export const compactAppearanceProperty = new Property<NativescriptToolbarCommon, ToolbarAppearance>({
  name: 'compactAppearance',
  defaultValue: null,
});

export const scrollEdgeAppearanceProperty = new Property<NativescriptToolbarCommon, ToolbarAppearance>({
  name: 'scrollEdgeAppearance',
  defaultValue: null,
});

export const compactScrollEdgeAppearanceProperty = new Property<NativescriptToolbarCommon, ToolbarAppearance>({
  name: 'compactScrollEdgeAppearance',
  defaultValue: null,
});

itemsProperty.register(NativescriptToolbarCommon);
barStyleProperty.register(NativescriptToolbarCommon);
translucentProperty.register(NativescriptToolbarCommon);
barTintColorProperty.register(NativescriptToolbarCommon);
tintColorProperty.register(NativescriptToolbarCommon);
positionProperty.register(NativescriptToolbarCommon);
defaultMetricsProperty.register(NativescriptToolbarCommon);
itemChangesAnimatedProperty.register(NativescriptToolbarCommon);
standardAppearanceProperty.register(NativescriptToolbarCommon);
compactAppearanceProperty.register(NativescriptToolbarCommon);
scrollEdgeAppearanceProperty.register(NativescriptToolbarCommon);
compactScrollEdgeAppearanceProperty.register(NativescriptToolbarCommon);
