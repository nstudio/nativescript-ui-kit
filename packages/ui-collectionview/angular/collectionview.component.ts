import { AfterContentInit, ChangeDetectionStrategy, Component, ComponentRef, ContentChild, Directive, DoCheck, ElementRef, EmbeddedViewRef, EventEmitter, Host, HostListener, Inject, Input, IterableDiffer, IterableDiffers, NgZone, OnDestroy, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CLog, CLogTypes, CollectionView, CollectionViewItemEventData, ViewTemplateType } from '@nstudio/ui-collectionview';
import { DetachedLoader, NativeScriptRendererFactory, extractSingleViewRecursive, isListLikeIterable, registerElement } from '@nativescript/angular';
import { KeyedTemplate, LayoutBase, ObservableArray, Trace, View } from '@nativescript/core';

registerElement('CollectionView', () => CollectionView);

const NG_VIEW = '_ngViewRef';

export class ItemContext {
  constructor(public $implicit?: any, public item?: any, public index?: number, public even?: boolean, public odd?: boolean) {}
}

export interface SetupItemViewArgs {
  view: EmbeddedViewRef<any>;
  data: any;
  index: number;
  context: ItemContext;
}

@Component({
  selector: 'CollectionView',
  template: `
    <DetachedContainer>
      <Placeholder #loader></Placeholder>
    </DetachedContainer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionViewComponent implements DoCheck, OnDestroy, AfterContentInit {
  public get nativeElement() {
    return this._collectionView;
  }
  public get listView() {
    return this._collectionView;
  }

  @ViewChild('loader', { read: ViewContainerRef, static: true }) public loader: ViewContainerRef;
  @Output() public setupItemView = new EventEmitter<SetupItemViewArgs>();
  @ContentChild(TemplateRef, { read: TemplateRef, static: true }) public itemTemplateQuery: TemplateRef<ItemContext>;

  @Input() autoReuseViews = false;

  detachedLoaderFactory() {
    const ref = this.loader.createComponent(DetachedLoader, {
      index: 0,
    });
    this.loader.detach(0);
    this._loaders.push(ref);
    return ref;
  }

  @Input()
  public get itemTemplate() {
    return this._itemTemplate;
  }
  public set itemTemplate(value: TemplateRef<ItemContext>) {
    this._itemTemplate = value;
    // this._collectionView.refresh();
  }
  @Input()
  public get headerItemTemplate() {
    return this._headerTemplate;
  }
  public set headerItemTemplate(value: TemplateRef<ItemContext>) {
    this._headerTemplate = value;
  }
  @Input()
  public get footerItemTemplate() {
    return this._footerTemplate;
  }
  public set footerItemTemplate(value: TemplateRef<ItemContext>) {
    this._footerTemplate = value;
  }
  @Input()
  public get items() {
    return this._items;
  }
  public set items(value: any) {
    this._items = value;
    let needDiffer = true;
    if (value instanceof ObservableArray) {
      needDiffer = false;
    }
    if (needDiffer && !this._differ && isListLikeIterable(value)) {
      this._differ = this._iterableDiffers.find(this._items).create((_index, item) => item);
    }

    this._collectionView.items = this._items;
  }

  private _collectionView: CollectionView;
  private _items: any;
  private _differ: IterableDiffer<KeyedTemplate>;
  private _itemTemplate: TemplateRef<ItemContext>;
  private _templateMap: Map<string, KeyedTemplate>;
  private _headerTemplate: TemplateRef<ItemContext>;
  private _headerTemplateMap: Map<string, KeyedTemplate>;
  private _footerTemplate: TemplateRef<ItemContext>;
  private _footerTemplateMap: Map<string, KeyedTemplate>;
  private _loaders: ComponentRef<DetachedLoader>[];

  constructor(@Inject(ElementRef) private _elementRef: ElementRef, @Inject(IterableDiffers) private _iterableDiffers: IterableDiffers, @Inject(NativeScriptRendererFactory) private _renderer: NativeScriptRendererFactory, @Inject(NgZone) private _ngZone: NgZone) {
    this._collectionView = _elementRef.nativeElement;

    this._collectionView.on(CollectionView.itemLoadingEvent, this.onItemLoading, this);
    this._collectionView.itemViewLoader = this.itemViewLoader;
    this._loaders = [];
  }

  private itemViewLoader = (viewType) => {
    this._ngZone.run(() => {
      switch (viewType) {
        case ViewTemplateType.Item:
          if (this._itemTemplate) {
            return this.getOrCreate(this._itemTemplate);
          }
          break;
        case ViewTemplateType.Header:
          if (this._headerTemplate) {
            return this.getOrCreate(this._headerTemplate);
          }
          break;
        case ViewTemplateType.Footer:
          if (this._footerTemplate) {
            return this.getOrCreate(this._footerTemplate);
          }
          break;
      }
      return null;
    });
  };

  public ngAfterContentInit() {
    if (Trace.isEnabled()) {
      CLog(CLogTypes.info, 'CollectionView.ngAfterContentInit()');
    }
    this.setItemTemplates();
  }

  public ngOnDestroy() {
    this._collectionView.off(CollectionView.itemLoadingEvent, this.onItemLoading, this);
    this._collectionView = null;
    this._loaders.forEach((l) => l.destroy());
    this._loaders = null;
    this.viewToLoader = null;
    this.viewToTemplate = null;
    this.viewPool = null;

    this._items = null;
    this._differ = null;
    this._itemTemplate = null;
    if (this._templateMap) {
      this._templateMap.clear();
    }
    if (this._headerTemplateMap) {
      this._headerTemplateMap.clear();
    }
    if (this._footerTemplateMap) {
      this._footerTemplateMap.clear();
    }
    this._templateMap = null;
    this._headerTemplateMap = null;
    this._footerTemplateMap = null;
  }

  public ngDoCheck() {
    if (Trace.isEnabled()) {
      CLog(CLogTypes.info, 'ngDoCheck() - execute differ? ' + this._differ);
    }
    if (this._differ) {
      if (Trace.isEnabled()) {
        CLog(CLogTypes.info, 'ngDoCheck() - execute differ');
      }
      const changes = this._differ.diff(this._items);
      if (changes) {
        if (Trace.isEnabled()) {
          CLog(CLogTypes.info, 'ngDoCheck() - refresh');
        }
        this.refresh();
      }
    }
  }

  public registerTemplate(key: string, template: TemplateRef<ItemContext>) {
    if (Trace.isEnabled()) {
      CLog(CLogTypes.info, 'registerTemplate for key: ' + key);
    }
    if (!this._templateMap) {
      this._templateMap = new Map<string, KeyedTemplate>();
    }

    const keyedTemplate = {
      key,
      createView: this.getItemTemplateViewFactory(template),
    };

    this._templateMap.set(key, keyedTemplate);
  }

  public registerTemplateSupplemental(key: string, template: TemplateRef<ItemContext>, type: 'header' | 'footer') {
    if (Trace.isEnabled()) {
      CLog(CLogTypes.info, 'registerTemplate for key: ' + key);
    }

    switch (type) {
      case 'header':
        // if (!this._headerTemplateMap) {
        //   this._headerTemplateMap = new Map<string, KeyedTemplate>();
        // }
        // this._headerTemplateMap.set(key, keyedTemplate);
        this._collectionView.headerKey = key;
        this.headerItemTemplate = template;
        this._collectionView.headerItemTemplate = this.getItemTemplateViewFactory(template);
        break;
      case 'footer':
        // if (!this._footerTemplateMap) {
        //   this._footerTemplateMap = new Map<string, KeyedTemplate>();
        // }

        // this._footerTemplateMap.set(key, keyedTemplate);

        this._collectionView.footerKey = key;
        this.footerItemTemplate = template;
        this._collectionView.footerItemTemplate = this.getItemTemplateViewFactory(template);
        break;
    }
  }

  @HostListener('itemLoading', ['$event'])
  public onItemLoading(args: CollectionViewItemEventData) {
    if (!args.view && !this.itemTemplate) {
      return;
    }
    if (!this.items) return;
    const index = args.index;
    const items = (args.object as any).items;
    const currentItem = typeof items.getItem === 'function' ? items.getItem(index) : items[index];
    let viewRef: EmbeddedViewRef<ItemContext>;

    if (Trace.isEnabled()) {
      CLog(CLogTypes.info, `onItemLoading: ${index} - Reusing existing view`);
    }

    viewRef = this.getNgView(args.view);

    if (!viewRef && Trace.isEnabled()) {
      if (Trace.isEnabled()) {
        CLog(CLogTypes.info, `ViewReference not found for item ${index}. View recycling is not working`);
      }
    }

    if (!viewRef) {
      if (Trace.isEnabled()) {
        CLog(CLogTypes.info, `onItemLoading: ${index} - Creating view from template`);
      }
      viewRef = this.getOrCreate(this.itemTemplate) as any;
    }
    this.setupViewRef(viewRef, currentItem, index);
    this.detectChangesOnChild(viewRef, index);
  }
  @HostListener('itemRecycling', ['$event'])
  public onItemRecyclingInternal(args: any) {
    if (!args.view) {
      return;
    }
    const ngView = this.getNgView(args.view);
    // console.log('recycling', args.view);

    if (ngView) {
      ngView.detach();
    }
  }

  @HostListener('displayItem', ['$event'])
  public onItemDisplayInternal(args: CollectionViewItemEventData) {
    if (!args.view) {
      return;
    }
    const ngView = this.getNgView(args.view);

    if (ngView) {
      ngView.reattach();
    }
  }

  @HostListener('itemDisposing', ['$event'])
  public onItemDisposingInternal(args: any) {
    if (!args.view) {
      return;
    }
    const ngView = this.getNgView(args.view);

    if (ngView) {
      ngView.detach();
      this.storeViewRef(ngView);
    }
  }

  private getNgView(view: View): EmbeddedViewRef<unknown> {
    const ngView = view[NG_VIEW];
    // Getting angular view from original element (in cases when ProxyViewContainer
    // is used NativeScript internally wraps it in a StackLayout)
    if (!ngView && view instanceof LayoutBase && view.getChildrenCount() > 0) {
      return view.getChildAt(0)[NG_VIEW];
    }
    return ngView;
  }

  public setupViewRef(view: EmbeddedViewRef<ItemContext>, data: any, index: number): void {
    const context = view.context;
    context.$implicit = data;
    context.item = data;
    context.index = index;
    context.even = index % 2 === 0;
    context.odd = !context.even;

    this.setupItemView.next({
      context,
      data,
      index,
      view,
    });
  }

  getItemTemplateViewFactory(template: TemplateRef<ItemContext>): () => View {
    return () => {
      return this.getOrCreate(template);
    };
  }
  viewPool = new Map<
    TemplateRef<ItemContext>,
    {
      scrapSize: number;
      scrapHead: Set<EmbeddedViewRef<ItemContext>>;
    }
  >();
  private storeViewRef(viewRef: EmbeddedViewRef<any>) {
    const templateRef = this.viewToTemplate.get(viewRef);
    if (templateRef) {
      const scrap = this.viewPool.get(templateRef);
      if (scrap) {
        if (scrap.scrapHead.size >= scrap.scrapSize) {
          viewRef.destroy();
          this.viewToLoader.get(viewRef)?.destroy();
        } else {
          scrap.scrapHead.add(viewRef);
        }
      }
    }
  }
  viewToTemplate = new WeakMap<EmbeddedViewRef<any>, TemplateRef<any>>();
  viewToLoader = new WeakMap<EmbeddedViewRef<any>, ComponentRef<DetachedLoader>>();

  private getOrCreate(templateRef: TemplateRef<ItemContext>) {
    return this._ngZone.run(() => {
      let viewRef = this.getView(templateRef);
      if (!viewRef) {
        const loader = this.detachedLoaderFactory();
        viewRef = loader.instance.vc.createEmbeddedView(templateRef, new ItemContext(), 0);
        this.viewToLoader.set(viewRef, loader);
        this.viewToTemplate.set(viewRef, templateRef);
      }
      viewRef.detach();
      const resultView = getItemViewRoot(viewRef);
      resultView[NG_VIEW] = viewRef;
      resultView.reusable = this.autoReuseViews;
      return resultView;
    });
  }
  private getView(templateRef: TemplateRef<ItemContext>) {
    const pool = this.getViewPool(templateRef);
    while (pool.scrapHead.size > 0) {
      const viewRef: EmbeddedViewRef<ItemContext> = pool.scrapHead.values().next().value;
      pool.scrapHead.delete(viewRef);
      if (!viewRef.destroyed) {
        return viewRef;
      }
    }
    return null;
  }

  private getViewPool(templateRef: TemplateRef<ItemContext>) {
    if (!this.viewPool.has(templateRef)) {
      this.viewPool.set(templateRef, {
        scrapSize: this.autoReuseViews ? Infinity : 0,
        scrapHead: new Set<EmbeddedViewRef<ItemContext>>(),
      });
    }
    return this.viewPool.get(templateRef);
  }

  private setItemTemplates() {
    // The itemTemplateQuery may be changed after list items are added that contain <template> inside,
    // so cache and use only the original template to avoid errors.
    this.itemTemplate = this.itemTemplateQuery;

    if (this._templateMap) {
      if (Trace.isEnabled()) {
        CLog(CLogTypes.info, 'Setting templates');
      }

      const templates: KeyedTemplate[] = [];
      this._templateMap.forEach((value) => {
        templates.push(value);
      });
      this._collectionView.itemTemplates = templates;
    } else {
      // If the map was not initialized this means that there are no named templates, so we register the default one.
      this._collectionView.itemTemplate = this.getItemTemplateViewFactory(this.itemTemplate);
    }
  }

  private detectChangesOnChild(viewRef: EmbeddedViewRef<ItemContext>, index: number) {
    if (Trace.isEnabled()) {
      CLog(CLogTypes.info, 'Manually detect changes in child: ' + index);
    }
    viewRef.markForCheck();
    viewRef.detectChanges();
  }

  private refresh() {
    if (this._collectionView) {
      this._collectionView.refresh();
    }
  }
}

export interface ComponentView {
  rootNodes: any[];
  destroy(): void;
}

export type RootLocator = (nodes: any[], nestLevel: number) => View;

export function getItemViewRoot(viewRef: ComponentView, rootLocator: RootLocator = extractSingleViewRecursive): View {
  const rootView = rootLocator(viewRef.rootNodes, 0);
  return rootView;
}

@Directive({ selector: '[cvTemplateKey]' })
export class TemplateKeyDirective {
  constructor(private templateRef: TemplateRef<any>, @Host() private collectionView: CollectionViewComponent) {}

  @Input()
  set cvTemplateKey(value: any) {
    if (Trace.isEnabled()) {
      CLog(CLogTypes.info, 'cvTemplateKey: ' + value);
    }
    if (this.collectionView && this.templateRef) {
      this.collectionView.registerTemplate(value.toLowerCase(), this.templateRef);
    }
  }
}

@Directive({
  selector: '[cvTemplateHeader]',
})
export class TemplateHeaderDirective {
  constructor(private templateRef: TemplateRef<any>, @Host() private collectionView: CollectionViewComponent) {}

  @Input()
  set cvTemplateHeader(value: any) {
    if (Trace.isEnabled()) {
      CLog(CLogTypes.info, 'cvTemplateHeader: ' + value);
    }
    if (this.collectionView && this.templateRef) {
      // TODO: allow keying of multiple headers per section
      this.collectionView.registerTemplateSupplemental(value || ViewTemplateType.Header, this.templateRef, 'header');
    }
  }
}

@Directive({
  selector: '[cvTemplateFooter]',
})
export class TemplateFooterDirective {
  constructor(private templateRef: TemplateRef<any>, @Host() private collectionView: CollectionViewComponent) {}

  @Input()
  set cvTemplateFooter(value: any) {
    if (Trace.isEnabled()) {
      CLog(CLogTypes.info, 'cvTemplateFooter: ' + value);
    }
    if (this.collectionView && this.templateRef) {
      // TODO: allow keying of multiple footers per section
      this.collectionView.registerTemplateSupplemental(value || ViewTemplateType.Footer, this.templateRef, 'footer');
    }
  }
}
