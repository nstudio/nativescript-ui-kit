import {
    Builder,
    CSSType,
    ChangedData,
    ContentView,
    CoreTypes,
    EventData,
    KeyedTemplate,
    Label,
    Observable,
    ObservableArray,
    PercentLength,
    Property,
    ProxyViewContainer,
    Template,
    Trace,
    Utils,
    View,
    addWeakEventListener,
    booleanConverter,
    heightProperty,
    makeParser,
    makeValidator,
    profile,
    removeWeakEventListener,
    widthProperty
} from '@nativescript/core';
import { CollectionView as CollectionViewDefinition } from '.';

export const CollectionViewTraceCategory = 'NativescriptCollectionView';

export interface CollectionViewItemEventData extends EventData {
    eventName: string;
    object: CollectionViewBase;
    index: number;
    view: View;
    item: any;
    bindingContext?: any;
}

export interface CollectionViewItemDisplayEventData extends EventData {
    eventName: string;
    object: CollectionViewBase;
    index: number;
}

// iOS only
export enum ContentInsetAdjustmentBehavior {
    Always,
    Automatic,
    Never,
    ScrollableAxes
}

export enum CLogTypes {
    log = Trace.messageType.log,
    info = Trace.messageType.info,
    warning = Trace.messageType.warn,
    error = Trace.messageType.error
}

export const CLog = (type: CLogTypes, ...args) => {
    Trace.write(args.map((a) => (a && typeof a === 'object' ? a.toString() : a)).join(' '), CollectionViewTraceCategory, type);
};

const autoEffectiveRowHeight = 0;
const autoEffectiveColWidth = 0;

/**
 * Defines the different view types that {@link RadListView} can display in various scenarios.
 */
export enum ViewTemplateType {
    /**
     * Identifies a view created using the {@link headerItemTemplate} value.
     */
    Header = 'ns_default_header',
    /**
     * Identifies a view created using the {@link footerItemTemplate} value.
     */
	Footer = 'ns_default_footer',
    /**
     * Identifies a view created using the {@link itemTemplate} value.
     */
	Item = 'ns_default_item',
}

export namespace knownTemplates {
    export const itemTemplate = 'itemTemplate';
}

export namespace knownMultiTemplates {
    export const itemTemplates = 'itemTemplates';
}

Builder.knownTemplates.add('itemTemplate').add('headerItemTemplate').add('footerItemTemplate');
Builder.knownMultiTemplates.add('itemTemplates');

export interface Plugin {
    onLayout?: Function;
}

export function getUUID() {
    if ((<any>global).crypto === undefined) {
        (<any>global).crypto ??= {};
        (<any>global).crypto.randomUUID ??= function generateUUID(){
            if(global.isAndroid){
                return java.util.UUID.randomUUID().toString()
            }
        
            if(global.isIOS){
                return NSUUID.UUID().UUIDString;
            }
        }
    }
    return (<any>global).crypto.randomUUID();
}

function toDevicePixels(length: CoreTypes.PercentLengthType, auto: number = Number.NaN, parentAvailableWidth: number = Number.NaN): number {
    if (length === 'auto') {
        // tslint:disable-line
        return auto;
    }
    if (typeof length === 'number') {
        return Math.floor(Utils.layout.toDevicePixels(length));
    }
    if (!length) {
        return auto;
    }
    switch (length.unit) {
        case 'px':
            return Math.floor(length.value);
        case '%':
            return Math.floor(parentAvailableWidth * length.value);
        case 'dip':
        default:
            return Math.floor(Utils.layout.toDevicePixels(length.value));
    }
}

@CSSType('CollectionView')
export abstract class CollectionViewBase extends View implements CollectionViewDefinition {
    public static itemLoadingEvent = 'itemLoading';
    public static itemRecyclingEvent = 'itemRecycling';
    public static itemDisposingEvent = 'itemDisposing';
    public static bindedEvent = 'binded';
    public static scrollEvent = 'scroll';
    public static scrollStartEvent = 'scrollStart';
    public static scrollEndEvent = 'scrollEnd';
    public static itemTapEvent = 'itemTap';
    public static itemHighlightEvent = 'itemHighlight';
    public static itemHighlightEndEvent = 'itemHighlightEnd';
    public static displayItemEvent = 'displayItem';
    public static itemReorderedEvent = 'itemReordered';
    public static itemReorderStartingEvent = 'itemReorderStarting';
    public static itemReorderStartedEvent = 'itemReorderStarted';
    public static loadMoreItemsEvent = 'loadMoreItems';
    public static dataPopulatedEvent = 'dataPopulated';
    public static knownFunctions = ['itemTemplateSelector', 'itemIdGenerator', 'spanSize']; // See component-builder.ts isKnownFunction

    public isBounceEnabled: boolean;
    public isScrollEnabled: boolean;
    public isAnimationEnabled: boolean;
    public reverseLayout: boolean;
    public loadingMore: boolean;
    public orientation: CoreTypes.OrientationType;
    public itemTemplate: string | Template;
    public itemTemplates: string | KeyedTemplate[];
    public headerKey: string;
    public headerItemTemplate: string | Template;
    public headerPinned: boolean;
    public footerKey: string;
	public footerItemTemplate: string | Template;
    public sectionTemplate: string;
    public isItemsSourceIn: boolean;
    public rowHeight: CoreTypes.PercentLengthType;
    public colWidth: CoreTypes.PercentLengthType;
    public verticalSpacing: CoreTypes.LengthType;
    public horizontalSpacing: CoreTypes.LengthType;
    public _innerWidth: number = 0;
    public _innerHeight: number = 0;
    public _effectiveRowHeight: number;
    public _effectiveColWidth: number;

    public loadMoreThreshold: number;
    public scrollOffset: number;

    public reorderEnabled: boolean;

    /** Used on iOS to auto update cells size if the cell request a layout change (like image itemLoading).
     * Experimental and true by default
     */
    public autoReloadItemOnLayout: boolean;
    public reorderLongPressEnabled: boolean;
    protected _dataUpdatesSuspended = false;
    public scrollBarIndicatorVisible: boolean;

    sections: Array<{ identifier: string; key: string }>;

    public layoutStyle: string = 'grid';
    public plugins: string[] = [];
    public static plugins: { [k: string]: Plugin } = {};
    public static registerPlugin(key: string, plugin: Plugin) {
        this.plugins[key] = plugin;
    }
    public static layoutStyles: { [k: string]: { createLayout: (view: CollectionViewBase) => any; createDelegate?: (view: CollectionViewBase) => any } } = {};
    public static registerLayoutStyle(style: string, generator: { 
        createLayout: (view: CollectionViewBase) => any /* ios: UICollectionViewLayout family, android: RecyclerView.LayoutManager family */; 
        createDelegate?: (view: CollectionViewBase) => any /* (ios only) UICollectionViewDelegate */;
    }) {
        this.layoutStyles[style] = generator;
    }

    protected _itemTemplatesInternal: Map<string, KeyedTemplate>;
    protected _defaultTemplate: KeyedTemplate;

    constructor() {
        super();
        this._defaultTemplate = {
            key: 'default',
            createView: () => {
                if (this.itemTemplate) {
                    return Builder.parse(this.itemTemplate, this);
                }
                return undefined;
            }
        };
        this._itemTemplatesInternal = new Map();
        this._itemTemplatesInternal.set(this._defaultTemplate.key, this._defaultTemplate);
        
    }
    notifyForItemAtIndex(eventName: string, view: View, index: number, bindingContext?: any, native?: any) {
        throw new Error('Method not implemented.');
    }

    public abstract refresh();
    public abstract refreshVisibleItems();
    public abstract isItemAtIndexVisible(index: number);
    public abstract scrollToIndex(index: number, animated: boolean);
    public abstract scrollToOffset(value: number, animated?: boolean);

    protected updateInnerSize() {
        const width = this.getMeasuredWidth();
        const height = this.getMeasuredHeight();
        this._innerWidth = width - this.effectivePaddingLeft - this.effectivePaddingRight;
        if (this.colWidth) {
            let newValue = toDevicePixels(this.colWidth, autoEffectiveColWidth, this._innerWidth); // We cannot use 0 for auto as it throws for android.
            if (global.isAndroid) {
                newValue = Math.floor(newValue);
            }
            if (newValue !== this._effectiveColWidth) {
                this._effectiveColWidth = newValue;
            }
        }

        this._innerHeight = height - this.effectivePaddingTop - this.effectivePaddingBottom;
        if (this.rowHeight) {
            let newValue = toDevicePixels(this.rowHeight, autoEffectiveRowHeight, this._innerHeight);
            if (global.isAndroid) {
                newValue = Math.floor(newValue);
            }
            if (newValue !== this._effectiveRowHeight) {
                this._effectiveRowHeight = newValue;
            }
        }
    }
    // public onLayout(left: number, top: number, right: number, bottom: number) {
    //     super.onLayout(left, top, right, bottom);
    //     // on ios and during device rotation the getMeasuredWidth and getMeasuredHeight are wrong
    //     // so we use left, top , right, bottom
    //     this.updateInnerSize();
    // }
    public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        // on ios and during device rotation the getMeasuredWidth and getMeasuredHeight are wrong
        // so we use left, top , right, bottom
        this.updateInnerSize();
    }
    // _onSizeChanged() {
    //     super._onSizeChanged();
    //     this.onSizeChanged(this.getMeasuredWidth(), this.getMeasuredHeight());
    // }
    // @profile
    // public onSizeChanged(measuredWidth: number, measuredHeight: number) {
    //     let changed = false;
    //     this._innerWidth = measuredWidth - this.effectivePaddingLeft - this.effectivePaddingRight;
    //     if (this.colWidth) {
    //         const newValue = PercentLength.toDevicePixels(this.colWidth, autoEffectiveColWidth, this._innerWidth); // We cannot use 0 for auto as it throws for android.
    //         if (newValue !== this._effectiveColWidth) {
    //             this._effectiveColWidth = newValue;
    //             changed = true;
    //         }
    //     }

    //     this._innerHeight = measuredHeight - this.effectivePaddingTop - this.effectivePaddingBottom;
    //     if (this.rowHeight) {
    //         const newValue = PercentLength.toDevicePixels(this.rowHeight, autoEffectiveRowHeight, this._innerHeight);
    //         if (newValue !== this._effectiveRowHeight) {
    //             this._effectiveRowHeight = newValue;
    //             changed = true;
    //         }
    //     }
    //     if (changed) {
    //         this.refresh();
    //     }
    // }
    // public onLayout(left: number, top: number, right: number, bottom: number) {
    //   super.onLayout(left, top, right, bottom);
    // }
    items: any[] | ObservableArray<any>;

    @profile
    public _prepareItem(view: View, index: number) {
        const context = this.getItemAtIndex(index);
        if (view) {
            // we check old bindingContext to see if properties disappeared.
            // if so we set them to null for the View to update
            if (view.bindingContext && view.bindingContext !== context && typeof context === 'object') {
                Object.keys(view.bindingContext).forEach((k) => {
                    if (!context.hasOwnProperty(k)) {
                        context[k] = null;
                    }
                });
                view.bindingContext = context;
            }
        }
        return context;
    }

    @profile
    public notifyLoading(args) {
        this.notify(args);
    }

    public getItemAtIndex(index: number): any {
        // will be overriden in onItemsChangedInternal
        const thisItems = this.items as ObservableArray<any>;
        return thisItems.getItem ? thisItems.getItem(index) : thisItems[index];
    }
    public isHorizontal() {
        return this.orientation === 'horizontal';
    }
    computeSpanCount() {
        let spanCount = 1;
        if (this.isHorizontal()) {
            if (this._effectiveRowHeight) {
                spanCount = Math.max(Math.floor(this._innerHeight / this._effectiveRowHeight), 1) || 1;
            }
        } else {
            if (this._effectiveColWidth) {
                spanCount = Math.max(Math.floor(this._innerWidth / this._effectiveColWidth), 1) || 1;
            }
        }
        return spanCount;
    }
    public _onRowHeightPropertyChanged(oldValue: CoreTypes.PercentLengthType, newValue: CoreTypes.PercentLengthType) {
        this.refreshVisibleItems()
    }
    public _onColWidthPropertyChanged(oldValue: CoreTypes.PercentLengthType, newValue: CoreTypes.PercentLengthType) {
        this.refreshVisibleItems();
    }
    onItemViewLoaderChanged() {}
    _itemViewLoader;

    get itemViewLoader() {
        return this._itemViewLoader;
    }
    set itemViewLoader(value) {
        if (this._itemViewLoader !== value) {
            this._itemViewLoader = value;
            this.onItemViewLoaderChanged();
        }
    }
    get padding(): string | CoreTypes.LengthType {
        return this.style.padding;
    }
    set padding(value: string | CoreTypes.LengthType) {
        this.style.padding = value;
    }

    get paddingTop(): CoreTypes.LengthType {
        return this.style.paddingTop;
    }
    set paddingTop(value: CoreTypes.LengthType) {
        this.style.paddingTop = value;
    }

    get paddingRight(): CoreTypes.LengthType {
        return this.style.paddingRight;
    }
    set paddingRight(value: CoreTypes.LengthType) {
        this.style.paddingRight = value;
    }

    get paddingBottom(): CoreTypes.LengthType {
        return this.style.paddingBottom;
    }
    set paddingBottom(value: CoreTypes.LengthType) {
        this.style.paddingBottom = value;
    }

    get paddingLeft(): CoreTypes.LengthType {
        return this.style.paddingLeft;
    }
    set paddingLeft(value: CoreTypes.LengthType) {
        this.style.paddingLeft = value;
    }
    resolveTemplateView(template) {
        return Builder.parse(template, this);
    }
    _getDefaultItemContent() {
        const lbl = new Label();
        lbl['defaultItemView'] = true;
        lbl.bind({
            targetProperty: 'text',
            sourceProperty: '$value'
        });
        return lbl;
    }
    getTemplateFromSelector(templateKey) {
        const key = templateKey.toLowerCase();
        if (this._itemTemplatesInternal.has(key)) {
            return this._itemTemplatesInternal.get(key);
        }
        return null;
    }

    getViewForTemplateType(templateKey: string, templateType: ViewTemplateType = ViewTemplateType.Item) {
        let newView;

        if (templateType) {
            const template = this.getTemplateFromSelector(templateKey);

            if (template && template.createView) {
                newView = template.createView();
            }
        }

        if (!newView && this._itemViewLoader !== undefined) {
            newView = this._itemViewLoader(templateType);
        }

        if (newView) {
            return newView;
        }

        let templateString;

        switch (templateType) {
            case ViewTemplateType.Item:
                templateString = this.itemTemplate;
                break;
            case ViewTemplateType.Header: 
                templateString = this.headerItemTemplate;
                break;
            case ViewTemplateType.Footer: 
                templateString = this.footerItemTemplate;
                break;
        }
        return templateString === undefined ? undefined : this.resolveTemplateView(templateString);
    }

    private _itemTemplateSelectorBindable;
    _itemTemplateSelector: Function;
    onItemTemplateSelectorChanged(oldValue, newValue) {
        if (typeof newValue === 'string') {
            if (!this._itemTemplateSelectorBindable) {
                this._itemTemplateSelectorBindable = new ProxyViewContainer();
            }
            this._itemTemplateSelectorBindable.bind({
                sourceProperty: null,
                targetProperty: 'templateKey',
                expression: newValue
            });
            this._itemTemplateSelector = function (item, index, items) {
                item['$index'] = index;
                this._itemTemplateSelectorBindable.bindingContext = item;
                return this._itemTemplateSelectorBindable.get('templateKey');
            };
        } else if (typeof newValue === 'function') {
            this._itemTemplateSelector = newValue;
        }
    }
    private _itemIdGeneratorBindable;
    // public _itemIdGenerator: (item: any, index: number, items: any) => number = (_item: any, index: number) => index;
    public _itemIdGenerator: (item: any, index: number, items: any) => number = null;
    onItemIdGeneratorChanged(oldValue, newValue) {
        if (typeof newValue === 'string') {
            if (!this._itemIdGeneratorBindable) {
                this._itemIdGeneratorBindable = new ProxyViewContainer();
            }
            this._itemIdGeneratorBindable.bind({
                sourceProperty: null,
                targetProperty: 'itemId',
                expression: newValue
            });
            this._itemIdGenerator = function (item, index, items) {
                item['$index'] = index;
                this._itemIdGeneratorBindable.bindingContext = item;
                return this._itemIdGeneratorBindable.get('itemId');
            };
        } else if (typeof newValue === 'function') {
            this._itemIdGenerator = newValue;
        }
    }
    onTemplateAdded(t) {}
    onTemplateRemoved(key) {}
    addTemplate(key, t) {
        if (!t.key) {
            t.key = t._key;
            delete t._key;
        }
        this._itemTemplatesInternal.set(t.key.toLowerCase(), t);
        this.onTemplateAdded(t);
    }
    removeTemplate(key) {
        const didDelete = this._itemTemplatesInternal.delete(key.toLowerCase());
        if (didDelete) {
            this.onTemplateRemoved(key);
        }
    }
    onItemTemplatesChanged(oldValue, newValue) {
        console.log('onItemTemplatesChanged:', newValue)
        if (!this._itemTemplatesInternal) {
            this._itemTemplatesInternal = new Map();
        }
        if (newValue) {
            newValue.forEach((t) => {
                if (!t.key) {
                    t.key = t._key;
                    delete t._key;
                }
                console.log('t.key:', t.key)
                this._itemTemplatesInternal.set(t.key, t);
            });
        }
        if (!this._itemTemplatesInternal.has(this._defaultTemplate.key)) {
            this._itemTemplatesInternal.set(this._defaultTemplate.key, this._defaultTemplate);
        }
    }
    onItemTemplateChanged(oldValue, newValue) {
        // console.log('onItemTemplateChanged:', newValue)
    }
    // onItemTemplateSelectorPropertyChanged(oldValue, newValue) {
    //     this.onItemTemplateSelectorChanged(oldValue, newValue);
    // }

    onHeaderItemTemplateChanged(oldValue: string | Template, newValue: string | Template): void {
        this.onSupplementaryTemplateChanged(<Template>newValue);
        // if (this.headerKey) {
        //     console.log('onHeaderItemTemplateChanged this.headerKey:', this.headerKey)
        //     if (!this._itemTemplatesInternal.has(this.headerKey)) {
        //         this._itemTemplatesInternal.set(this.headerKey, {
        //             key: this.headerKey,
        //             createView: () => {
        //                 if (this.headerItemTemplate) {
        //                     return Builder.parse(this.headerItemTemplate, this);
        //                 }
        //                 return undefined;
        //             }
        //         });
        //     }
        // }
    }

    onFooterItemTemplateChanged(oldValue: string | Template, newValue: string | Template): void {
        this.onSupplementaryTemplateChanged(<Template>newValue);
    }

    onSupplementaryTemplateChanged(template: Template) {
        // if (typeof template !== 'string') {
        //     const key = template.key.toLowerCase();
        //     if (!this._itemTemplatesInternal.has(key)) {
        //         this._itemTemplatesInternal.set(key, template);
        //     }
        // }
    }

    getItemSourceAtIndex(index: number) {
        return (this.items as ObservableArray<any>).getItem(index);
    }
    getItemArrayAtIndex(index: number) {
        return this.items[index];
    }
    onItemsChanged(oldValue, newValue) {
        const getItem = newValue && (newValue as ObservableArray<any>).getItem;
        this.isItemsSourceIn = typeof getItem === 'function';
        // we override the method to prevent the test on every getItem
        this.getItemAtIndex = this.isItemsSourceIn ? this.getItemSourceAtIndex.bind(this) : this.getItemArrayAtIndex.bind(this);
        if (oldValue instanceof Observable) {
            removeWeakEventListener(oldValue, ObservableArray.changeEvent, this.onSourceCollectionChangedInternal, this);
        }

        if (newValue instanceof Observable) {
            addWeakEventListener(newValue, ObservableArray.changeEvent, this.onSourceCollectionChangedInternal, this);
        }
        this.refreshVisibleItems();
    }

    
    spanSize: (item, index: number) => number;
    
    onSpanSizeChangedInternal = (oldValue, newValue) => {
        this.spanSize = newValue;
        this.refreshVisibleItems();
    };
    _isDataDirty = false;
    onLoaded() {
        super.onLoaded();
        if (this._isDataDirty && this._effectiveColWidth !== undefined && this._effectiveRowHeight !== undefined) {
            this.refreshVisibleItems();
        }
    }
    onSourceCollectionChanged(event: ChangedData<any>) {
        this.refreshVisibleItems();
    }
    onSourceCollectionChangedInternal(event: ChangedData<any>) {
        if (this._dataUpdatesSuspended === false) {
            this.onSourceCollectionChanged(event);
        }
    }
    // onItemsChanged(oldValue, newValue) {
    //     this.onItemsChangedInternal(oldValue, newValue);
    // }

    [widthProperty.getDefault]() {
        return '100%';
    }
    [heightProperty.getDefault]() {
        return '100%';
    }
    public suspendUpdates() {
        this._dataUpdatesSuspended = true;
    }
    public updatesSuspended(): boolean {
        return this._dataUpdatesSuspended;
    }
    public resumeUpdates(refresh: boolean) {
        this._dataUpdatesSuspended = false;
        if (refresh === true) {
            this.refreshVisibleItems();
        }
    }
    abstract getViewForItemAtIndex(index: number): View;
    abstract startDragging(index: number);
    draggingView: View;
    _callItemReorderedEvent(oldPosition, newPosition, item) {
        const args = {
            eventName: CollectionViewBase.itemReorderedEvent,
            object: this,
            index: oldPosition,
            item,
            data: { targetIndex: newPosition },
            view: this.draggingView
        } as CollectionViewItemEventData;
        this.notify(args);
        this.draggingView = null;
    }
    _reorderItemInSource(oldPosition: number, newPosition: number, callEvents = true) {
        this.suspendUpdates();
        const ownerSource = this.items as any;
        const item = this.getItemAtIndex(oldPosition);
        ownerSource.splice(oldPosition, 1);
        ownerSource.splice(newPosition, 0, item);

        this.resumeUpdates(false);
        if (callEvents) {
            this._callItemReorderedEvent(oldPosition, newPosition, item);
        }
    }

    shouldMoveItemAtIndex(index: number) {
        if (!this.reorderEnabled) {
            return false;
        }
        const item = this.getItemAtIndex(index);
        const view = (this.draggingView = this.getViewForItemAtIndex(index));
        let args = {
            returnValue: true,
            eventName: CollectionViewBase.itemReorderStartingEvent,
            object: this,
            index,
            item,
            view
        };
        this.notify(args);
        if (!args.returnValue) {
            return false;
        }
        args = {
            eventName: CollectionViewBase.itemReorderStartedEvent,
            object: this,
            index,
            item,
            view
        } as any;
        this.notify(args);
        return true;
    }
}

const defaultRowHeight: CoreTypes.LengthType = 'auto';
export const rowHeightProperty = new Property<CollectionViewBase, CoreTypes.PercentLengthType>({
    name: 'rowHeight',
    defaultValue: defaultRowHeight,
    equalityComparer: PercentLength.equals,
    valueConverter: PercentLength.parse,
    valueChanged: (target, oldValue, newValue) => {
        target._effectiveRowHeight = PercentLength.toDevicePixels(newValue, autoEffectiveRowHeight, target._innerHeight);
        target._onRowHeightPropertyChanged(oldValue, newValue);
    }
});
rowHeightProperty.register(CollectionViewBase);

const defaultColWidth: CoreTypes.PercentLengthType = { unit: '%', value: 1 };
export const colWidthProperty = new Property<CollectionViewBase, CoreTypes.PercentLengthType>({
    name: 'colWidth',
    defaultValue: defaultColWidth,
    equalityComparer: PercentLength.equals,
    valueConverter: PercentLength.parse,
    valueChanged: (target, oldValue, newValue) => {
        if (target._innerWidth !== 0) {
            target._effectiveColWidth = PercentLength.toDevicePixels(newValue, autoEffectiveColWidth, target._innerWidth);
        }
        target._onColWidthPropertyChanged(oldValue, newValue);
    }
});
colWidthProperty.register(CollectionViewBase);

const converter = makeParser<CoreTypes.OrientationType>(makeValidator('horizontal', 'vertical'));
export const orientationProperty = new Property<CollectionViewBase, CoreTypes.OrientationType>({
    name: 'orientation',
    defaultValue: 'vertical',
    affectsLayout: true,
    valueChanged: (target: CollectionViewBase, oldValue: CoreTypes.OrientationType, newValue: CoreTypes.OrientationType) => {
        target.refreshVisibleItems();
    },
    valueConverter: converter
});
orientationProperty.register(CollectionViewBase);

export const itemTemplateProperty = new Property<CollectionViewBase, string | Template>({
    name: 'itemTemplate',
    valueChanged(target, oldValue, newValue) {
        target.onItemTemplateChanged(oldValue, newValue);
    }
});
itemTemplateProperty.register(CollectionViewBase);

export const itemTemplatesProperty = new Property<CollectionViewBase, KeyedTemplate[]>({
    name: 'itemTemplates',
    valueConverter: (value) => {
        if (typeof value === 'string') {
            return Builder.parseMultipleTemplates(value);
        }

        return value;
    },
    valueChanged(target, oldValue, newValue) {
        target.onItemTemplatesChanged(oldValue, newValue);
    }
});
itemTemplatesProperty.register(CollectionViewBase);

export const headerItemTemplateProperty = new Property<CollectionViewBase, string | Template>({
    name: "headerItemTemplate",
    defaultValue: undefined,
    valueChanged(target, oldValue, newValue) {
        target.onHeaderItemTemplateChanged(oldValue, newValue);
    }
});
headerItemTemplateProperty.register(CollectionViewBase);

export const footerItemTemplateProperty = new Property<CollectionViewBase, string | Template>({
    name: "footerItemTemplate",
    defaultValue: undefined,
    valueChanged(target, oldValue, newValue) {
        target.onFooterItemTemplateChanged(oldValue, newValue);
    }
});
footerItemTemplateProperty.register(CollectionViewBase);

export const sectionTemplateProperty = new Property<CollectionViewBase, string | Template>({
    name: "sectionTemplate",
    defaultValue: undefined,
});
sectionTemplateProperty.register(CollectionViewBase);

export const itemTemplateSelectorProperty = new Property<CollectionViewBase, Function>({
    name: 'itemTemplateSelector',
    defaultValue: undefined,
    valueChanged(target, oldValue, newValue) {
        target.onItemTemplateSelectorChanged(oldValue, newValue);
    }
});
itemTemplateSelectorProperty.register(CollectionViewBase);
export const itemIdGeneratorProperty = new Property<CollectionViewBase, Function>({
    name: 'itemIdGenerator',
    defaultValue: undefined,
    valueChanged(target, oldValue, newValue) {
        target.onItemIdGeneratorChanged(oldValue, newValue);
    }
});
itemIdGeneratorProperty.register(CollectionViewBase);

export const itemsProperty = new Property<CollectionViewBase, Function>({
    name: 'items',
    defaultValue: undefined,
    valueChanged(target, oldValue, newValue) {
        target.onItemsChanged(oldValue, newValue);
    }
});
itemsProperty.register(CollectionViewBase);

export const spanSizeProperty = new Property<CollectionViewBase, Function>({
    name: 'spanSize',
    defaultValue: undefined,
    valueChanged(target, oldValue, newValue) {
        target.onSpanSizeChangedInternal(oldValue, newValue);
    }
});
spanSizeProperty.register(CollectionViewBase);

export const isScrollEnabledProperty = new Property<CollectionViewBase, boolean>({
    name: 'isScrollEnabled',
    defaultValue: true,
    valueConverter: booleanConverter
});
isScrollEnabledProperty.register(CollectionViewBase);
export const isBounceEnabledProperty = new Property<CollectionViewBase, boolean>({
    name: 'isBounceEnabled',
    defaultValue: true,
    valueConverter: booleanConverter
});
isBounceEnabledProperty.register(CollectionViewBase);
export const isAnimationEnabledProperty = new Property<CollectionViewBase, boolean>({
    name: 'isAnimationEnabled',
    defaultValue: false,
    valueConverter: booleanConverter
});
isAnimationEnabledProperty.register(CollectionViewBase);
export const reverseLayoutProperty = new Property<CollectionViewBase, boolean>({
    name: 'reverseLayout',
    defaultValue: false,
    valueConverter: booleanConverter
});
reverseLayoutProperty.register(CollectionViewBase);

export const loadMoreThresholdProperty = new Property<CollectionViewBase, number>({
    name: 'loadMoreThreshold',
    defaultValue: 1,
    valueConverter: (v) => parseInt(v, 10)
});
loadMoreThresholdProperty.register(CollectionViewBase);
export const reorderingEnabledProperty = new Property<CollectionViewBase, boolean>({
    name: 'reorderEnabled',
    defaultValue: false,
    valueConverter: booleanConverter
});
reorderingEnabledProperty.register(CollectionViewBase);
export const reorderLongPressEnabledProperty = new Property<CollectionViewBase, boolean>({
    name: 'reorderLongPressEnabled',
    defaultValue: false,
    valueConverter: booleanConverter
});
reorderLongPressEnabledProperty.register(CollectionViewBase);

export const scrollBarIndicatorVisibleProperty = new Property<CollectionViewBase, boolean>({
    name: 'scrollBarIndicatorVisible',
    defaultValue: true,
    valueConverter: booleanConverter
});
scrollBarIndicatorVisibleProperty.register(CollectionViewBase);

export const autoReloadItemOnLayoutProperty = new Property<CollectionViewBase, boolean>({
    name: 'autoReloadItemOnLayout',
    defaultValue: false,
    valueConverter: booleanConverter
});
autoReloadItemOnLayoutProperty.register(CollectionViewBase);

