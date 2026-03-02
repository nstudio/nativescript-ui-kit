import { Application, Color, Utils } from '@nativescript/core';
import { DemoSharedBase } from '../utils';
import { NToolbar, ToolbarAppearance, ToolbarItem, ToolbarItemTapEventData } from '@nstudio/nativescript-toolbar';

const ITEM_SET_NAMES = ['Editor', 'Menu', 'Custom Native', 'Playback'];
const APPEARANCE_NAMES = ['Legacy', 'Opaque', 'Glass'];
const MUTATION_NAMES = ['Title', 'Image', 'Style', 'Tint', 'Reset'];

const TINT_THEMES = [
  {
    name: 'Cool',
    lightTint: '#0ea5e9',
    darkTint: '#7dd3fc',
    lightBar: '#e0f2fe',
    darkBar: '#082f49',
  },
  {
    name: 'Indigo',
    lightTint: '#4f46e5',
    darkTint: '#c7d2fe',
    lightBar: '#e0e7ff',
    darkBar: '#1e1b4b',
  },
  {
    name: 'Amber',
    lightTint: '#d97706',
    darkTint: '#fcd34d',
    lightBar: '#fef3c7',
    darkBar: '#78350f',
  },
];

type ToolbarPlacement = 'top' | 'bottom';
type MutationState = {
  titleOn: boolean;
  imageOn: boolean;
  style: 'plain' | 'done' | null;
  tint: 'pink' | 'teal' | null;
};

export class DemoSharedNativescriptToolbar extends DemoSharedBase {
  pageClass = 'page toolbar-demo-page';
  topToolbarVisibility = 'collapsed';
  bottomToolbarVisibility = 'visible';
  placementButtonText = 'Placement: Bottom';
  itemSetButtonText = `Items: ${ITEM_SET_NAMES[0]}`;
  styleButtonText = 'Style: Light';
  translucentButtonText = 'Translucent: Off';
  tintButtonText = `Tint: ${TINT_THEMES[0].name}`;
  appearanceButtonText = `Appearance: ${APPEARANCE_NAMES[0]}`;
  backgroundButtonText = 'Background Image: Off';
  shadowButtonText = 'Shadow Image: Off';
  animationButtonText = 'Animation: On';
  mutationButtonText = `Mutate: ${MUTATION_NAMES[0]}`;
  toggleTargetButtonText = 'Toggle Target Item';
  statusText = __IOS__ ? 'Toolbar ready. Start with Appearance: Legacy to see raw UIToolbar properties.' : 'Toolbar plugin is currently iOS-only.';
  lastTapText = 'Last tap: none';
  eventLog = __IOS__ ? 'Ready.' : 'Android placeholder mode.';

  private _topToolbar: NToolbar;
  private _bottomToolbar: NToolbar;
  private _placement: ToolbarPlacement = 'bottom';
  private _itemSetIndex = 0;
  private _appearanceIndex = 0;
  private _tintIndex = 0;
  private _darkStyle = false;
  private _translucent = false;
  private _backgroundEnabled = false;
  private _shadowEnabled = false;
  private _itemAnimationEnabled = true;
  private _mutationIndex = 0;
  private _trailingItemId: number | string = null;
  private _mutationStateBySet = new Map<string, MutationState>();
  private _logs: string[] = [];
  private _appearanceHandler = (args: any) => this._applyPageTheme(args?.newValue);

  constructor() {
    super();
    this._applyPageTheme(Application.systemAppearance());
    Application.on(Application.systemAppearanceChangedEvent, this._appearanceHandler);
  }

  onTopToolbarLoaded(args: any) {
    this._attachToolbar(args.object as NToolbar, 'top');
  }

  onBottomToolbarLoaded(args: any) {
    this._attachToolbar(args.object as NToolbar, 'bottom');
  }

  onDemoUnloaded() {
    Application.off(Application.systemAppearanceChangedEvent, this._appearanceHandler);
    if (this._topToolbar) {
      this._topToolbar.off(NToolbar.itemTapEvent);
    }
    if (this._bottomToolbar) {
      this._bottomToolbar.off(NToolbar.itemTapEvent);
    }
  }

  togglePlacement() {
    if (!__IOS__) return;
    this._placement = this._placement === 'bottom' ? 'top' : 'bottom';
    const showTop = this._placement === 'top';
    this.set('topToolbarVisibility', showTop ? 'visible' : 'collapsed');
    this.set('bottomToolbarVisibility', showTop ? 'collapsed' : 'visible');
    this.set('placementButtonText', `Placement: ${showTop ? 'Top' : 'Bottom'}`);
    this._writeLog(`placement -> ${this._placement}`);
    this._applyAllToolbars(false, false);
  }

  nextItemSet() {
    if (!__IOS__) return;
    this._itemSetIndex = (this._itemSetIndex + 1) % ITEM_SET_NAMES.length;
    this.set('itemSetButtonText', `Items: ${ITEM_SET_NAMES[this._itemSetIndex]}`);
    this._writeLog(`item set -> ${ITEM_SET_NAMES[this._itemSetIndex]}`);
    this._applyAllToolbars(true, true);
  }

  toggleBarStyle() {
    if (!__IOS__) return;
    this._darkStyle = !this._darkStyle;
    this.set('styleButtonText', `Style: ${this._darkStyle ? 'Dark' : 'Light'}`);
    this._writeLog(`barStyle -> ${this._darkStyle ? 'black' : 'default'}`);
    this._applyAllToolbars(false, false);
  }

  toggleTranslucent() {
    if (!__IOS__) return;
    this._translucent = !this._translucent;
    this.set('translucentButtonText', `Translucent: ${this._translucent ? 'On' : 'Off'}`);
    this._writeLog(`translucent -> ${this._translucent} (${APPEARANCE_NAMES[this._appearanceIndex]})`);
    this._applyAllToolbars(false, false);
  }

  nextTintTheme() {
    if (!__IOS__) return;
    this._tintIndex = (this._tintIndex + 1) % TINT_THEMES.length;
    this.set('tintButtonText', `Tint: ${TINT_THEMES[this._tintIndex].name}`);
    this._writeLog(`tint theme -> ${TINT_THEMES[this._tintIndex].name} (icons + title attributes)`);
    this._applyAllToolbars(false, false);
  }

  nextAppearanceMode() {
    if (!__IOS__) return;
    this._appearanceIndex = (this._appearanceIndex + 1) % APPEARANCE_NAMES.length;
    this.set('appearanceButtonText', `Appearance: ${APPEARANCE_NAMES[this._appearanceIndex]}`);
    this._writeLog(`appearance -> ${APPEARANCE_NAMES[this._appearanceIndex]}`);
    this._applyAllToolbars(false, false);
  }

  toggleBackgroundImage() {
    if (!__IOS__) return;
    this._backgroundEnabled = !this._backgroundEnabled;
    this.set('backgroundButtonText', `Background Image: ${this._backgroundEnabled ? 'On' : 'Off'}`);
    this._writeLog(`background image -> ${this._backgroundEnabled} (${APPEARANCE_NAMES[this._appearanceIndex]})`);
    this._applyAllToolbars(false, false);
  }

  toggleShadowImage() {
    if (!__IOS__) return;
    this._shadowEnabled = !this._shadowEnabled;
    this.set('shadowButtonText', `Shadow Image: ${this._shadowEnabled ? 'On' : 'Off'}`);
    this._writeLog(`shadow image -> ${this._shadowEnabled} (${APPEARANCE_NAMES[this._appearanceIndex]})`);
    this._applyAllToolbars(false, false);
  }

  toggleAnimations() {
    if (!__IOS__) return;
    this._itemAnimationEnabled = !this._itemAnimationEnabled;
    this.set('animationButtonText', `Animation: ${this._itemAnimationEnabled ? 'On' : 'Off'}`);
    this._writeLog(`itemChangesAnimated -> ${this._itemAnimationEnabled}`);
    this._applyAllToolbars(false, false);
  }

  toggleTrailingEnabled() {
    if (!__IOS__) return;
    const toolbar = this._activeToolbar;
    if (!toolbar || this._trailingItemId === null || this._trailingItemId === undefined) {
      this._writeLog('No target item available for this set.');
      return;
    }

    const nativeItem = toolbar.getNativeItem(this._trailingItemId);
    if (!nativeItem) {
      this._writeLog(`getNativeItem(${this._trailingItemId}) -> null`);
      return;
    }

    nativeItem.enabled = !nativeItem.enabled;
    this._writeLog(`target item "${this._trailingItemId}" enabled -> ${nativeItem.enabled}`);
  }

  runItemMutation() {
    if (!__IOS__) return;
    if (this._trailingItemId === null || this._trailingItemId === undefined) {
      this._writeLog('No target item available for mutation.');
      return;
    }

    const state = this._currentMutationState;
    const setName = this._currentItemSetName;
    const mode = MUTATION_NAMES[this._mutationIndex];
    switch (mode) {
      case 'Title':
        state.titleOn = !state.titleOn;
        this._writeLog(`mutation:title [${setName}] -> ${state.titleOn ? 'Approve ✓' : 'base title'}`);
        break;
      case 'Image':
        state.imageOn = !state.imageOn;
        this._writeLog(`mutation:image [${setName}] -> ${state.imageOn ? 'wand.and.stars' : 'base image'}`);
        break;
      case 'Style':
        state.style = this._resolveNextMutatedStyle(state);
        this._writeLog(`mutation:style [${setName}] -> ${state.style}`);
        break;
      case 'Tint':
        state.tint = state.tint === 'pink' ? 'teal' : 'pink';
        this._writeLog(`mutation:tint [${setName}] -> ${state.tint}`);
        break;
      case 'Reset':
        this._resetMutationStateForSet(setName);
        this._writeLog(`mutation:reset [${setName}] -> restored set defaults`);
        break;
    }

    this._applyMutationStateToAllToolbars();

    this._mutationIndex = (this._mutationIndex + 1) % MUTATION_NAMES.length;
    this.set('mutationButtonText', `Mutate: ${MUTATION_NAMES[this._mutationIndex]}`);
  }

  resetOptions() {
    if (!__IOS__) return;
    this._placement = 'bottom';
    this._itemSetIndex = 0;
    this._appearanceIndex = 0;
    this._tintIndex = 0;
    this._darkStyle = false;
    this._translucent = false;
    this._backgroundEnabled = false;
    this._shadowEnabled = false;
    this._itemAnimationEnabled = true;
    this._mutationIndex = 0;
    this._resetAllMutationState();

    this.set('topToolbarVisibility', 'collapsed');
    this.set('bottomToolbarVisibility', 'visible');
    this.set('placementButtonText', 'Placement: Bottom');
    this.set('itemSetButtonText', `Items: ${ITEM_SET_NAMES[0]}`);
    this.set('styleButtonText', 'Style: Light');
    this.set('translucentButtonText', 'Translucent: Off');
    this.set('tintButtonText', `Tint: ${TINT_THEMES[0].name}`);
    this.set('appearanceButtonText', `Appearance: ${APPEARANCE_NAMES[0]}`);
    this.set('backgroundButtonText', 'Background Image: Off');
    this.set('shadowButtonText', 'Shadow Image: Off');
    this.set('animationButtonText', 'Animation: On');
    this.set('mutationButtonText', `Mutate: ${MUTATION_NAMES[0]}`);

    this._writeLog('options reset');
    this._applyAllToolbars(true, true);
  }

  clearLog() {
    this._logs = [];
    this.set('lastTapText', 'Last tap: none');
    this.set('eventLog', 'Log cleared.');
    this.set('statusText', 'Ready.');
  }

  private _attachToolbar(toolbar: NToolbar, placement: ToolbarPlacement) {
    if (!__IOS__) return;

    toolbar.position = placement === 'top' ? 'top' : 'bottom';
    toolbar.defaultMetrics = 'default';
    toolbar.itemChangesAnimated = this._itemAnimationEnabled;

    toolbar.off(NToolbar.itemTapEvent);
    toolbar.on(NToolbar.itemTapEvent, (event: ToolbarItemTapEventData) => {
      const itemId = event.data.item?.id ?? `index ${event.data.index}`;
      this.set('lastTapText', `Last tap: ${itemId}`);
      this._writeLog(`itemTap -> ${itemId}`);
    });

    if (placement === 'top') {
      this._topToolbar = toolbar;
    } else {
      this._bottomToolbar = toolbar;
    }

    this._applyAllToolbars(true, true);
  }

  private _applyAllToolbars(animated: boolean, applyItems: boolean) {
    if (!__IOS__) return;

    if (this._topToolbar) {
      this._applyVisualOptions(this._topToolbar, 'top');
      if (applyItems) {
        this._applyItemSet(this._topToolbar, animated);
      }
    }

    if (this._bottomToolbar) {
      this._applyVisualOptions(this._bottomToolbar, 'bottom');
      if (applyItems) {
        this._applyItemSet(this._bottomToolbar, animated);
      }
    }
  }

  private _applyVisualOptions(toolbar: NToolbar, placement: ToolbarPlacement) {
    const appearanceMode = APPEARANCE_NAMES[this._appearanceIndex];
    const theme = TINT_THEMES[this._tintIndex];
    const tint = this._darkStyle ? theme.darkTint : theme.lightTint;
    const barTint = this._darkStyle ? theme.darkBar : theme.lightBar;
    const legacyBarTint = this._translucent ? this._toAlphaColor(barTint, this._darkStyle ? 0.72 : 0.88) : barTint;

    toolbar.position = placement === 'top' ? 'top' : 'bottom';
    toolbar.itemChangesAnimated = this._itemAnimationEnabled;
    toolbar.barStyle = this._darkStyle ? 'black' : 'default';
    toolbar.translucent = this._translucent;
    toolbar.tintColor = tint;
    toolbar.barTintColor = legacyBarTint;

    if (appearanceMode === 'Legacy') {
      toolbar.setAppearance('standard', null);
      toolbar.setAppearance('compact', null);
      toolbar.setAppearance('scrollEdge', null);
      toolbar.setAppearance('compactScrollEdge', null);
      this._applyBackgroundAndShadow(toolbar, placement, 'legacy');
      return;
    }

    const appearance = this._buildAppearance(appearanceMode, tint, barTint);
    toolbar.setAppearance('standard', appearance.standard);
    toolbar.setAppearance('compact', appearance.compact);
    toolbar.setAppearance('scrollEdge', appearance.scrollEdge);
    toolbar.setAppearance('compactScrollEdge', appearance.compactScrollEdge);
    this._applyBackgroundAndShadow(toolbar, placement, 'appearance');
  }

  private _buildAppearance(
    mode: string,
    tint: string,
    barTint: string,
  ): {
    standard: ToolbarAppearance;
    compact: ToolbarAppearance;
    scrollEdge: ToolbarAppearance;
    compactScrollEdge: ToolbarAppearance;
  } {
    const shadowColor = this._darkStyle ? '#f8fafc55' : '#0f172a45';
    const standardStriped = this._makeStripedImage(this._darkStyle ? '#1f2937' : '#bfdbfe', this._darkStyle ? '#334155' : '#fcd34d', 40, 40);
    const edgeStriped = this._makeStripedImage(this._darkStyle ? '#0f172a' : '#ddd6fe', this._darkStyle ? '#1f2937' : '#bfdbfe', 40, 40);
    const shadowImage = this._makeSolidImage(this._darkStyle ? '#f8fafc' : '#0f172a', 36, 3);

    const standard: ToolbarAppearance =
      mode === 'Glass'
        ? {
            preset: this._translucent ? 'transparent' : 'opaque',
            backgroundColor: this._translucent ? this._toAlphaColor(barTint, this._darkStyle ? 0.58 : 0.64) : barTint,
            backgroundEffectStyle: this._translucent ? (this._darkStyle ? 'systemChromeMaterialDark' : 'systemChromeMaterialLight') : undefined,
            shadowColor,
          }
        : {
            preset: 'opaque',
            backgroundColor: barTint,
            shadowColor,
          };

    const scrollEdge: ToolbarAppearance =
      mode === 'Glass'
        ? {
            ...standard,
            backgroundEffectStyle: this._translucent ? (this._darkStyle ? 'systemUltraThinMaterialDark' : 'systemUltraThinMaterialLight') : undefined,
          }
        : {
            ...standard,
          };

    const buttonAppearance = {
      normal: {
        titleTextAttributes: {
          foregroundColor: tint,
        },
      },
      highlighted: {
        titleTextAttributes: {
          foregroundColor: this._darkStyle ? '#ffffff' : '#111827',
        },
      },
      disabled: {
        titleTextAttributes: {
          foregroundColor: '#94a3b8',
        },
      },
    };

    standard.buttonAppearance = buttonAppearance;
    standard.doneButtonAppearance = buttonAppearance;
    scrollEdge.buttonAppearance = buttonAppearance;
    scrollEdge.doneButtonAppearance = buttonAppearance;

    if (this._backgroundEnabled) {
      standard.backgroundImage = standardStriped;
      scrollEdge.backgroundImage = edgeStriped;
      standard.backgroundImageContentMode = 'scaleToFill';
      scrollEdge.backgroundImageContentMode = 'scaleToFill';
    }

    if (this._shadowEnabled) {
      standard.shadowImage = shadowImage;
      scrollEdge.shadowImage = shadowImage;
      standard.shadowColor = this._darkStyle ? '#f8fafc88' : '#0f172a7a';
      scrollEdge.shadowColor = standard.shadowColor;
    }

    if (mode === 'Opaque') {
      const opaqueBackground = this._translucent ? this._toAlphaColor(barTint, this._darkStyle ? 0.76 : 0.86) : barTint;
      standard.backgroundColor = opaqueBackground;
      scrollEdge.backgroundColor = opaqueBackground;
    }

    return {
      standard,
      compact: {
        ...standard,
      },
      scrollEdge,
      compactScrollEdge: {
        ...scrollEdge,
      },
    };
  }

  private _applyBackgroundAndShadow(toolbar: NToolbar, placement: ToolbarPlacement, mode: 'legacy' | 'appearance') {
    const pos = placement === 'top' ? 'top' : 'bottom';
    if (mode === 'appearance') {
      toolbar.clearBackgroundImage(pos, 'default');
      toolbar.clearShadowImage(pos);
      return;
    }

    if (this._backgroundEnabled) {
      const primary = this._darkStyle ? '#1f2937' : '#bfdbfe';
      const secondary = this._darkStyle ? '#334155' : '#fcd34d';
      toolbar.setBackgroundImage(this._makeStripedImage(primary, secondary, 40, 40), pos, 'default');
    } else {
      toolbar.clearBackgroundImage(pos, 'default');
    }

    if (this._shadowEnabled) {
      const shadow = this._darkStyle ? '#f8fafc99' : '#0f172a85';
      toolbar.setShadowImage(this._makeSolidImage(shadow, 36, 3), pos);
    } else {
      toolbar.clearShadowImage(pos);
    }
  }

  private _applyItemSet(toolbar: NToolbar, animated: boolean) {
    const { items, trailingItemId, description } = this._buildCurrentItems();
    this._trailingItemId = trailingItemId;
    toolbar.setItems(items, animated && this._itemAnimationEnabled);
    this._applyMutationState(toolbar);
    this.set('statusText', description);
  }

  private _buildCurrentItems(): { items: ToolbarItem[]; trailingItemId: number | string; description: string } {
    const setName = ITEM_SET_NAMES[this._itemSetIndex];

    switch (setName) {
      case 'Menu':
        return this._menuItems();
      case 'Custom Native':
        return this._customNativeItems();
      case 'Playback':
        return this._playbackItems();
      case 'Editor':
      default:
        return this._editorItems();
    }
  }

  private _editorItems(): { items: ToolbarItem[]; trailingItemId: number | string; description: string } {
    return {
      description: 'Editor set: mutate/disable target item -> "publish".',
      trailingItemId: 'publish',
      items: [{ id: 'compose', systemItem: 'compose', onTap: () => this._writeLog('onTap -> compose') }, { systemItem: 'flexibleSpace' }, { id: 'filters', systemImage: 'slider.horizontal.3', accessibilityIdentifier: 'filters-button', onTap: () => this._writeLog('onTap -> filters') }, { systemItem: 'fixedSpace', width: 8 }, { id: 'publish', title: 'Publish', style: 'done', onTap: () => this._writeLog('onTap -> publish') }],
    };
  }

  private _menuItems(): { items: ToolbarItem[]; trailingItemId: number | string; description: string } {
    if (Utils.SDK_VERSION < 14) {
      return {
        description: 'Menu fallback: mutate/disable target item -> "search-title".',
        trailingItemId: 'search-title',
        items: [{ id: 'add', systemItem: 'add', onTap: () => this._writeLog('onTap -> add') }, { systemItem: 'flexibleSpace' }, { id: 'search-title', title: 'Search', style: 'plain', onTap: () => this._writeLog('onTap -> search') }],
      };
    }

    const quickAction = UIAction.actionWithTitleImageIdentifierHandler('Quick Post', UIImage.systemImageNamed('paperplane.fill'), 'quick-post', () => this._writeLog('primaryAction -> Quick Post'));
    const composeMenu = UIMenu.menuWithTitleImageIdentifierOptionsChildren('Compose', UIImage.systemImageNamed('text.justify'), 'compose-menu', UIMenuOptions.DisplayInline, [this._menuAction('Post', 'square.and.pencil', 'menu -> Post'), this._menuAction('Story', 'circle.dotted.circle', 'menu -> Story'), this._menuAction('Reel', 'play.rectangle', 'menu -> Reel')]);
    const shareMenu = UIMenu.menuWithTitleImageIdentifierOptionsChildren('Share', UIImage.systemImageNamed('square.and.arrow.up'), 'share-menu', UIMenuOptions.DisplayInline, [this._menuAction('Copy Link', 'link', 'menu -> Copy Link'), this._menuAction('Schedule', 'calendar.badge.plus', 'menu -> Schedule'), this._menuAction('Delete Draft', 'trash', 'menu -> Delete Draft', true)]);

    return {
      description: 'Menu set: mutate/disable target item -> "quick".',
      trailingItemId: 'quick',
      items: [{ id: 'add', systemItem: 'add', onTap: () => this._writeLog('onTap -> add') }, { systemItem: 'flexibleSpace' }, { id: 'share', systemItem: 'action', menu: shareMenu }, { systemItem: 'fixedSpace', width: 8 }, { id: 'quick', title: 'Quick', style: 'done', primaryAction: quickAction, menu: composeMenu }],
    };
  }

  private _customNativeItems(): { items: ToolbarItem[]; trailingItemId: number | string; description: string } {
    const nativeFavorite = UIBarButtonItem.alloc().initWithImageStyleTargetAction(UIImage.systemImageNamed('star.fill'), UIBarButtonItemStyle.Done, null, null);
    nativeFavorite.accessibilityIdentifier = 'native-favorite';

    if (Utils.SDK_VERSION >= 14) {
      nativeFavorite.primaryAction = UIAction.actionWithTitleImageIdentifierHandler('Favorite', UIImage.systemImageNamed('star.fill'), 'favorite', () => this._writeLog('native primaryAction -> Favorite'));
    }

    return {
      description: 'Custom set: customView + nativeItem + mutable title target "boost".',
      trailingItemId: 'boost',
      items: [{ id: 'record', systemImage: 'record.circle', onTap: () => this._writeLog('onTap -> record') }, { systemItem: 'fixedSpace', width: 8 }, { id: 'live-badge', customView: this._makeLiveBadgeView() }, { systemItem: 'flexibleSpace' }, { id: 'native-favorite', nativeItem: nativeFavorite }, { systemItem: 'fixedSpace', width: 8 }, { id: 'boost', title: 'Boost', style: 'done', onTap: () => this._writeLog('onTap -> boost') }],
    };
  }

  private _playbackItems(): { items: ToolbarItem[]; trailingItemId: number | string; description: string } {
    return {
      description: 'Playback set: mutate/disable target item -> "output".',
      trailingItemId: 'output',
      items: [{ id: 'rewind', systemItem: 'rewind', onTap: () => this._writeLog('onTap -> rewind') }, { systemItem: 'fixedSpace', width: 8 }, { id: 'play', systemItem: 'play', onTap: () => this._writeLog('onTap -> play') }, { systemItem: 'fixedSpace', width: 8 }, { id: 'pause', systemItem: 'pause', onTap: () => this._writeLog('onTap -> pause') }, { systemItem: 'flexibleSpace' }, { id: 'output', title: 'Output', style: 'plain', enabled: false, tag: 9001, onTap: () => this._writeLog('onTap -> output') }],
    };
  }

  private _applyMutationStateToAllToolbars() {
    if (this._topToolbar) {
      this._applyMutationState(this._topToolbar);
    }
    if (this._bottomToolbar) {
      this._applyMutationState(this._bottomToolbar);
    }
  }

  private _applyMutationState(toolbar: NToolbar) {
    if (!toolbar || this._trailingItemId === null || this._trailingItemId === undefined) {
      return;
    }
    const nativeItem = toolbar.getNativeItem(this._trailingItemId);
    if (!nativeItem) {
      return;
    }

    const state = this._currentMutationState;
    const defaults = this._targetDefaultsForCurrentSet();
    nativeItem.title = state.titleOn ? 'Approve ✓' : defaults.title;
    nativeItem.image = state.imageOn ? UIImage.systemImageNamed('wand.and.stars') : defaults.image;

    const style = state.style ?? defaults.style;
    nativeItem.style = style === 'done' ? UIBarButtonItemStyle.Done : UIBarButtonItemStyle.Plain;

    if (state.tint === 'pink') {
      nativeItem.tintColor = UIColor.systemPinkColor;
    } else if (state.tint === 'teal') {
      nativeItem.tintColor = UIColor.systemTealColor;
    } else {
      nativeItem.tintColor = null;
    }
  }

  private _resolveNextMutatedStyle(state: MutationState): 'plain' | 'done' {
    const style = state.style ?? this._targetDefaultsForCurrentSet().style;
    return style === 'done' ? 'plain' : 'done';
  }

  private _targetDefaultsForCurrentSet(): { title: string; style: 'plain' | 'done'; image: UIImage | null } {
    const setName = ITEM_SET_NAMES[this._itemSetIndex];
    switch (setName) {
      case 'Playback':
        return { title: 'Output', style: 'plain', image: null };
      case 'Menu':
        if (Utils.SDK_VERSION < 14) {
          return { title: 'Search', style: 'plain', image: null };
        }
        return { title: 'Quick', style: 'done', image: null };
      case 'Custom Native':
        return { title: 'Boost', style: 'done', image: null };
      case 'Editor':
      default:
        return { title: 'Publish', style: 'done', image: null };
    }
  }

  private _resetMutationStateForSet(setName: string) {
    this._mutationStateBySet.set(setName, this._defaultMutationState());
  }

  private _resetAllMutationState() {
    this._mutationStateBySet.clear();
  }

  private _defaultMutationState(): MutationState {
    return {
      titleOn: false,
      imageOn: false,
      style: null,
      tint: null,
    };
  }

  private get _currentMutationState(): MutationState {
    const setName = this._currentItemSetName;
    if (!this._mutationStateBySet.has(setName)) {
      this._mutationStateBySet.set(setName, this._defaultMutationState());
    }
    return this._mutationStateBySet.get(setName);
  }

  private get _currentItemSetName(): string {
    return ITEM_SET_NAMES[this._itemSetIndex] ?? ITEM_SET_NAMES[0];
  }

  private _menuAction(title: string, systemImage: string, log: string, destructive = false): UIAction {
    const action = UIAction.actionWithTitleImageIdentifierHandler(title, UIImage.systemImageNamed(systemImage), null, () => this._writeLog(log));
    if (destructive) {
      action.attributes |= UIMenuElementAttributes.Destructive;
    }
    return action;
  }

  private _makeLiveBadgeView(): UIView {
    const container = UIView.alloc().initWithFrame(CGRectMake(0, 0, 92, 30));
    container.backgroundColor = new Color('#111827').ios;
    container.layer.cornerRadius = 15;

    const dot = UIView.alloc().initWithFrame(CGRectMake(10, 11, 8, 8));
    dot.backgroundColor = new Color('#ef4444').ios;
    dot.layer.cornerRadius = 4;
    container.addSubview(dot);

    const label = UILabel.alloc().initWithFrame(CGRectMake(24, 0, 60, 30));
    label.text = 'LIVE';
    label.textColor = UIColor.whiteColor;
    label.font = UIFont.boldSystemFontOfSize(12);
    label.textAlignment = NSTextAlignment.Left;
    container.addSubview(label);

    return container;
  }

  private _toAlphaColor(hex: string, alpha: number): UIColor {
    const normalized = Math.max(0, Math.min(1, alpha));
    return new Color(hex).ios.colorWithAlphaComponent(normalized);
  }

  private _makeSolidImage(hex: string, width = 6, height = 6): UIImage {
    const color = new Color(hex).ios;
    const rect = CGRectMake(0, 0, width, height);
    UIGraphicsBeginImageContextWithOptions(CGSizeMake(width, height), false, 0);
    color.setFill();
    UIRectFill(rect);
    const image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return image?.resizableImageWithCapInsets(UIEdgeInsetsZero) ?? image;
  }

  private _makeStripedImage(primary: string, secondary: string, width: number, height: number): UIImage {
    const rect = CGRectMake(0, 0, width, height);
    UIGraphicsBeginImageContextWithOptions(CGSizeMake(width, height), false, 0);

    const base = new Color(primary).ios;
    base.setFill();
    UIRectFill(rect);

    const stripe = new Color(secondary).ios;
    stripe.setFill();
    UIRectFill(CGRectMake(0, 0, width, height / 2));

    const image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return image?.resizableImageWithCapInsets(UIEdgeInsetsZero) ?? image;
  }

  private get _activeToolbar(): NToolbar {
    if (this._placement === 'top') {
      return this._topToolbar ?? this._bottomToolbar;
    }
    return this._bottomToolbar ?? this._topToolbar;
  }

  private _writeLog(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this._logs.unshift(`${timestamp}  ${message}`);
    this._logs = this._logs.slice(0, 10);
    this.set('statusText', message);
    this.set('eventLog', this._logs.join('\n'));
  }

  private _applyPageTheme(appearance: 'light' | 'dark' | null) {
    const variant = appearance === 'dark' ? 'ns-dark' : 'ns-light';
    this.set('pageClass', `page toolbar-demo-page ${variant}`);
  }
}
