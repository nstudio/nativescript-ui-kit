import { ChangeType, ChangedData, ContentView, CoreTypes, KeyedTemplate, Observable, Property, ProxyViewContainer, TouchGestureEventData, Trace, Utils, View, ViewBase, paddingBottomProperty, paddingLeftProperty, paddingRightProperty, paddingTopProperty, profile } from '@nativescript/core';
import { Pointer } from '@nativescript/core/ui/gestures';
import { CLog, CLogTypes, CollectionViewBase, CollectionViewItemEventData, ViewTemplateType, isBounceEnabledProperty, isScrollEnabledProperty, itemTemplatesProperty, orientationProperty, reorderLongPressEnabledProperty, reorderingEnabledProperty, reverseLayoutProperty, scrollBarIndicatorVisibleProperty, getUUID } from './common';
export * from './common';

export enum ContentInsetAdjustmentBehavior {
    Always = UIScrollViewContentInsetAdjustmentBehavior.Always,
    Automatic = UIScrollViewContentInsetAdjustmentBehavior.Automatic,
    Never = UIScrollViewContentInsetAdjustmentBehavior.Never,
    ScrollableAxes = UIScrollViewContentInsetAdjustmentBehavior.ScrollableAxes
}

function parseContentInsetAdjustmentBehavior(value: string | number) {
    if (typeof value === 'string') {
        switch (value) {
            case 'always':
                return ContentInsetAdjustmentBehavior.Always;
            case 'never':
                return ContentInsetAdjustmentBehavior.Never;
            case 'scrollableAxes':
                return ContentInsetAdjustmentBehavior.ScrollableAxes;
            default:
            case 'automatic':
                return ContentInsetAdjustmentBehavior.Automatic;
        }
    } else {
        return value;
    }
}

export const contentInsetAdjustmentBehaviorProperty = new Property<CollectionView, ContentInsetAdjustmentBehavior>({
    name: 'contentInsetAdjustmentBehavior',
    valueConverter: parseContentInsetAdjustmentBehavior,
    defaultValue: ContentInsetAdjustmentBehavior.Automatic
});

export class CollectionView extends CollectionViewBase {
    private _layout: UICollectionViewLayout;
    private _dataSource: UICollectionViewDiffableDataSource<any, any>;
    private _dataSourceSnapshot: NSDiffableDataSourceSnapshot<string, string>;
    private _delegate: UICollectionViewDelegateImpl | UICollectionViewDelegateFixedSizeImpl;
    private _preparingCell: boolean = false;
    private _map: Map<CollectionViewCell, ItemView>;
    _measureCellMap: Map<string, { cell: CollectionViewCell; view: View }>;
    _lastLayoutKey: string;

    reorderLongPressGesture: UILongPressGestureRecognizer;
    reorderLongPressHandler: ReorderLongPressImpl;
    reorderStartingRow = -1;
    reorderEndingRow = -1;

    manualDragging = false;
    scrollEnabledBeforeDragging = true;
    draggingStartDelta: [number, number];

    nativeViewProtected: UICollectionView;
    cellRegistrations: Record<string,UICollectionViewCellRegistration> = {};
    headerRegistration: UICollectionViewSupplementaryRegistration;
    footerRegistration: UICollectionViewSupplementaryRegistration;

    constructor() {
        super();
        this._map = new Map<CollectionViewCell, View>();
    }

    public createNativeView() {
        const layoutStyle = CollectionViewBase.layoutStyles[this.layoutStyle];
        this._layout = layoutStyle ? layoutStyle.createLayout(this) : UICollectionViewFlowLayout.alloc().init();

        if (this._layout instanceof UICollectionViewFlowLayout) {
            this._layout.minimumLineSpacing = 0;
            this._layout.minimumInteritemSpacing = 0;
        }

        const view = UICollectionView.alloc().initWithFrameCollectionViewLayout(CGRectZero, this._layout);
        view.backgroundColor = UIColor.clearColor;
        view.autoresizesSubviews = false;
        view.autoresizingMask = UIViewAutoresizing.None;
        this.lastContentOffset = view.contentOffset;

        this._itemTemplatesInternal.forEach((t) => {
            view.registerClassForCellWithReuseIdentifier(CollectionViewCell.class(), t.key.toLowerCase());
        });

        return view;
    }
    
    public initNativeView() {
        super.initNativeView();
        this.setupDataSource();
        
        // delegate will be set in first onLayout because we need computed _effectiveColWidth and _effectiveRowHeight

        this._measureCellMap = new Map<string, { cell: CollectionViewCell; view: View }>();

        // waterfall requires the delegate to be set as soon as possible
        // but default delegates need _effectiveRowHeight and _effectiveColWidth
        // so we need to wait
        const layoutStyle = CollectionViewBase.layoutStyles[this.layoutStyle];
        if (layoutStyle && layoutStyle.createDelegate) {
            this._delegate = layoutStyle.createDelegate(this);
            this.nativeViewProtected.delegate = this._delegate;
        }

        this._setNativeClipToBounds();
    }

    setupDataSource() {
        // Register the cell class and configure the cell provider
        const cellRegistration = UICollectionViewCellRegistration.registrationWithCellClassConfigurationHandler(
          CollectionViewCell.class(),
          (view, indexPath, identifier) => {
            const templateType = this._getItemTemplateType(indexPath);
            const cell = <CollectionViewCell>view;
            const firstRender = !cell.view;
      
            if (Trace.isEnabled()) {
              CLog(CLogTypes.log, 'cellProvider for row:', indexPath.row, ' templateType:', templateType);
            }
      
            this._prepareCell(cell, indexPath, templateType);
      
            // Perform layout only if necessary
            const cellView: View = cell.view;
            if (!firstRender && cellView.isLayoutRequired) {
              this.layoutCell(indexPath.row, cell, cellView);
            }
      
            return cell;
          }
        );
      
        // Create the data source with the configured cell provider
        this._dataSource = UICollectionViewDiffableDataSource.alloc().initWithCollectionViewCellProvider(
          this.nativeView,
          (view, indexPath, identifier) =>
            this.nativeViewProtected.dequeueConfiguredReusableCellWithRegistrationForIndexPathItem(
              cellRegistration,
              indexPath,
              identifier
            )
        );
      
        this.setupHeaderFooter();
      
        if (!this.sections) {
          // Every collection view must have at least one section
          this.sections = [
            {
              identifier: getUUID(),
              key: 'default'
            }
          ];
        }
      
        if (this.items?.length) {
          this.refreshDataSourceSnapshot(this.getDefaultSectionIdentifier());
        }
      
        this.nativeView.dataSource = this._dataSource;
      }
      
    refreshDataSourceSnapshot(sectionIdentifier: string) {
        if (this.items) {
            this.modifyDataSourceSnapshot(ChangeType.Add, [], sectionIdentifier, false, true);
        }
    }

    modifyDataSourceSnapshot(type: ChangeType, identifiers: Array<string>, sectionIdentifier: string, animate = true, reload = false) {
        if (this.items) {
            if (!this._dataSourceSnapshot || reload) {
                this._dataSourceSnapshot = NSDiffableDataSourceSnapshot.alloc<string, string>().init();
                this._dataSourceSnapshot.appendSectionsWithIdentifiers(this.sections.map(s => s.identifier));
            } else {
                this._dataSourceSnapshot = this._dataSource.snapshot();
            }
     
            if (Trace.isEnabled()) {
                CLog(CLogTypes.info, 'modifyDataSourceSnapshot identifiers: ', type, identifiers);
            }
            // console.log('modifyDataSourceSnapshot identifiers: ', type, identifiers);
            switch(type) {
                case ChangeType.Add:
                    const itemIdentifiers = [];
                    if (reload) {
                        this.items.forEach(() => {
                            // forEach works well with ObservableArray and Array
                            itemIdentifiers.push(getUUID());
                        });
                    }
                    if (identifiers.length) {
                        itemIdentifiers.push(...identifiers);
                    }
                    if (sectionIdentifier) {
                        this._dataSourceSnapshot.appendItemsWithIdentifiersIntoSectionWithIdentifier(itemIdentifiers, sectionIdentifier);
                    } else {
                        this._dataSourceSnapshot.appendItemsWithIdentifiers(itemIdentifiers);
                    }
                    break;
                case ChangeType.Update:
                    this._dataSourceSnapshot.reloadItemsWithIdentifiers(identifiers);
                    break;
                case ChangeType.Delete:
                    this._dataSourceSnapshot.deleteItemsWithIdentifiers(identifiers);
                    break;
            }
            this._dataSource.applySnapshotAnimatingDifferences(this._dataSourceSnapshot, animate);
        }
    }

    getDefaultSectionIdentifier() {
        // each collectionview must have at least 1 section
        return this.sections[0].identifier;
    }

    setupHeaderFooter() {
        if (!this.headerKey) {
            // TODO: work on keyed header for multiple sections
            this.headerKey = ViewTemplateType.Header;
        }
        if (this.headerItemTemplate) {
            this.headerRegistration = UICollectionViewSupplementaryRegistration.registrationWithSupplementaryClassElementKindConfigurationHandler(CollectionViewCell.class(), this.headerKey, (cell: CollectionViewCell, elementKind, indexPath) => {
                this._prepareHeaderFooter(cell, indexPath, this.headerKey, ViewTemplateType.Header);
            });
        }

        if (!this.footerKey) {
            // TODO: work on keyed footer for multiple sections
            this.footerKey = ViewTemplateType.Footer;
        }
        if (this.footerItemTemplate) {
            this.footerRegistration = UICollectionViewSupplementaryRegistration.registrationWithSupplementaryClassElementKindConfigurationHandler(CollectionViewCell.class(), this.footerKey, (cell: CollectionViewCell, elementKind, indexPath) => {
                this._prepareHeaderFooter(cell, indexPath, this.footerKey, ViewTemplateType.Footer);
            });
        }

        if (this.headerItemTemplate || this.footerItemTemplate) {
            this._dataSource.supplementaryViewProvider = (view: UICollectionView, elementKind: string, indexPath: NSIndexPath): UICollectionReusableView => {
                if (this.headerRegistration && elementKind == this.headerKey) {
                    return this.nativeViewProtected.dequeueConfiguredReusableSupplementaryViewWithRegistrationForIndexPath(this.headerRegistration, indexPath);
                } else if (this.footerRegistration) {
                    return this.nativeViewProtected.dequeueConfiguredReusableSupplementaryViewWithRegistrationForIndexPath(this.footerRegistration, indexPath);
                }
            }
        }
    }

    public disposeNativeView() {
        if (Trace.isEnabled()) {
            CLog(CLogTypes.log, 'disposeNativeView');
        }
        const nativeView = this.nativeView;
        nativeView.delegate = null;
        nativeView.dataSource = null;
        this.reorderLongPressHandler = null;
        this.reorderLongPressGesture = null;
        this.clearRealizedCells();

        super.disposeNativeView();
    }

    get _childrenCount(): number {
        return this._map.size;
    }

    eachChild(callback) {
        for (const view of this._map.values()) {
            if (view.parent instanceof CollectionView) {
                callback(view);
            } else if (view.parent) {
                callback(view.parent);
            }
        }
    }

    public getViewForItemAtIndex(index: number): View {
        const nativeView = this.nativeViewProtected;
        if (nativeView) {
            const cell = nativeView.cellForItemAtIndexPath(NSIndexPath.indexPathForRowInSection(index, 0)) as CollectionViewCell;
            return cell?.view;
        }
        return null;
    }

    public startDragging(index: number, pointer?: Pointer) {
        if (this.reorderEnabled && this.nativeViewProtected) {
            this.manualDragging = true;
            this.draggingStartDelta = null;
            if (pointer) {
                const view = this.getViewForItemAtIndex(index);
                if (view) {
                    const size = view.nativeViewProtected.bounds.size;
                    const point = (pointer.ios as UITouch).locationInView(view.nativeViewProtected);
                    this.draggingStartDelta = [point.x - size.width / 2, point.y - size.height / 2];
                }
            }
            this.nativeViewProtected.beginInteractiveMovementForItemAtIndexPath(NSIndexPath.indexPathForRowInSection(index, 0));
            this.scrollEnabledBeforeDragging = this.isScrollEnabled;
            this.nativeViewProtected.scrollEnabled = false;
        }
    }

    onReorderingTouch(event: TouchGestureEventData) {
        if (!this.manualDragging) {
            return;
        }
        const collectionView = this.nativeViewProtected;
        const pointer = event.getActivePointers()[0];
        switch (event.action) {
            case 'move':
                let x = pointer.getX();
                let y = pointer.getY();
                if (this.draggingStartDelta) {
                    x -= this.draggingStartDelta[0];
                    y -= this.draggingStartDelta[1];
                }
                collectionView.updateInteractiveMovementTargetPosition(CGPointMake(x, y));
                break;
            case 'up':
                this.manualDragging = false;
                collectionView && collectionView.endInteractiveMovement();
                this.nativeViewProtected.scrollEnabled = this.scrollEnabledBeforeDragging;
                this.handleReorderEnd();
                break;
            case 'cancel':
                this.manualDragging = false;
                collectionView && collectionView.cancelInteractiveMovement();
                this.nativeViewProtected.scrollEnabled = this.scrollEnabledBeforeDragging;
                this.handleReorderEnd();
                break;
        }
    }

    handleReorderEnd() {
        // we call all events from here because the delegate
        // does not handle the case start dragging => cancel or
        // start dragging => end over the same item
        if (!this.reorderEndingRow) {
            this.reorderEndingRow = this.reorderStartingRow;
        }
        const item = this.getItemAtIndex(this.reorderStartingRow);
        this._callItemReorderedEvent(this.reorderStartingRow, this.reorderEndingRow, item);
        this.reorderEndingRow = -1;
        this.reorderEndingRow = -1;
    }

    onReorderLongPress(gesture: UILongPressGestureRecognizer) {
        const collectionView = this.nativeViewProtected;
        if (!collectionView) {
            return;
        }
        switch (gesture.state) {
            case UIGestureRecognizerState.Began:
                const selectedIndexPath = collectionView.indexPathForItemAtPoint(gesture.locationInView(collectionView));
                collectionView.beginInteractiveMovementForItemAtIndexPath(selectedIndexPath);
                break;
            case UIGestureRecognizerState.Changed:
                collectionView.updateInteractiveMovementTargetPosition(gesture.locationInView(collectionView));
                break;
            case UIGestureRecognizerState.Ended:
                collectionView.endInteractiveMovement();
                this.handleReorderEnd();
                break;
            default:
                collectionView.cancelInteractiveMovement();
                this.handleReorderEnd();
                break;
        }
    }

    [contentInsetAdjustmentBehaviorProperty.setNative](value: ContentInsetAdjustmentBehavior) {
        this.nativeViewProtected.contentInsetAdjustmentBehavior = value as any;
    }

    [paddingTopProperty.setNative](value: CoreTypes.LengthType) {
        this._setPadding({ top: Utils.layout.toDeviceIndependentPixels(this.effectivePaddingTop) });
    }

    [paddingRightProperty.setNative](value: CoreTypes.LengthType) {
        this._setPadding({ right: Utils.layout.toDeviceIndependentPixels(this.effectivePaddingRight) });
    }

    [paddingBottomProperty.setNative](value: CoreTypes.LengthType) {
        this._setPadding({ bottom: Utils.layout.toDeviceIndependentPixels(this.effectivePaddingBottom) });
    }

    [paddingLeftProperty.setNative](value: CoreTypes.LengthType) {
        this._setPadding({ left: Utils.layout.toDeviceIndependentPixels(this.effectivePaddingLeft) });
    }

    [orientationProperty.setNative](value: CoreTypes.OrientationType) {
        const layout = this._layout;
        if (layout instanceof UICollectionViewFlowLayout) {
            if (value === 'horizontal') {
                layout.scrollDirection = UICollectionViewScrollDirection.Horizontal;
            } else {
                layout.scrollDirection = UICollectionViewScrollDirection.Vertical;
            }
        }
        this.updateScrollBarVisibility(this.scrollBarIndicatorVisible);
    }
    [isScrollEnabledProperty.setNative](value: boolean) {
        this.nativeViewProtected.scrollEnabled = value;
        this.scrollEnabledBeforeDragging = value;
    }
    [isBounceEnabledProperty.setNative](value: boolean) {
        this.nativeViewProtected.bounces = value;
    }

    [itemTemplatesProperty.getDefault](): KeyedTemplate[] {
        return null;
    }
    [reverseLayoutProperty.setNative](value: boolean) {
        this.nativeViewProtected.transform = value ? CGAffineTransformMakeRotation(-Math.PI) : null;
    }
    [reorderLongPressEnabledProperty.setNative](value: boolean) {
        if (value) {
            if (!this.reorderLongPressGesture) {
                this.reorderLongPressHandler = ReorderLongPressImpl.initWithOwner(new WeakRef(this));
                this.reorderLongPressGesture = UILongPressGestureRecognizer.alloc().initWithTargetAction(this.reorderLongPressHandler, 'longPress');
                this.nativeViewProtected.addGestureRecognizer(this.reorderLongPressGesture);
            } else {
                this.reorderLongPressGesture.enabled = true;
            }
        } else {
            if (this.reorderLongPressGesture) {
                this.reorderLongPressGesture.enabled = false;
            }
        }
    }
    [reorderingEnabledProperty.setNative](value: boolean) {
        if (value) {
            this.on('touch', this.onReorderingTouch, this);
        } else {
            this.off('touch', this.onReorderingTouch, this);
        }
    }
    [scrollBarIndicatorVisibleProperty.getDefault](): boolean {
        return true;
    }
    [scrollBarIndicatorVisibleProperty.setNative](value: boolean) {
        this.updateScrollBarVisibility(value);
    }
    protected updateScrollBarVisibility(value) {
        if (!this.nativeViewProtected) {
            return;
        }
        if (this.orientation === 'horizontal') {
            this.nativeViewProtected.showsHorizontalScrollIndicator = value;
        } else {
            this.nativeViewProtected.showsVerticalScrollIndicator = value;
        }
    }
    public eachChildView(callback: (child: View) => boolean): void {
        this._map.forEach((view, key) => {
            callback(view);
        });
    }

    public onLayout(left: number, top: number, right: number, bottom: number) {
        super.onLayout(left, top, right, bottom);

        const p = CollectionViewBase.plugins[this.layoutStyle];
        if (p && p.onLayout) {
            p.onLayout(this, left, top, right, bottom);
        }

        for (const k of this.plugins) {
            const p = CollectionViewBase.plugins[k];
            if (p.onLayout) {
                p.onLayout(this, left, top, right, bottom);
            }
        }

        const layoutView = this.nativeViewProtected.collectionViewLayout;
        if (!layoutView) {
            return;
        }

        if (!this._delegate) {
            const layoutStyle = CollectionViewBase.layoutStyles[this.layoutStyle];
            if (layoutStyle && layoutStyle.createDelegate) {
                this._delegate = layoutStyle.createDelegate(this);

            // if we use fixed col and row size we want a delegate
            // without collectionViewLayoutSizeForItemAtIndexPath
            // because it is not needed and faster
            } else if (this._effectiveColWidth && this._effectiveRowHeight) {
                this._delegate = UICollectionViewDelegateFixedSizeImpl.initWithOwner(this);
            } else {
                this._delegate = UICollectionViewDelegateImpl.initWithOwner(this);
            }
            this.nativeViewProtected.delegate = this._delegate;
        }

        if (layoutView instanceof UICollectionViewFlowLayout) {
            const itemSize = CGSizeMake(
                Utils.layout.toDeviceIndependentPixels(this._effectiveColWidth),
                Utils.layout.toDeviceIndependentPixels(this._effectiveRowHeight)
            );
            if (this._effectiveRowHeight && this._effectiveColWidth) {
                layoutView.itemSize = itemSize;
            } else {
                layoutView.estimatedItemSize = itemSize;
            }
        }

        layoutView.invalidateLayout();

        // Only refresh if the layout size has changed
        const layoutKey = `${this._innerWidth}_${this._innerHeight}`;
        if (this._lastLayoutKey !== layoutKey) {
            this.refresh();
        }
    }

    public isHorizontal() {
        return this.orientation === 'horizontal';
    }

    public onSourceCollectionChanged(event: ChangedData<any>) {
        const view = this.nativeViewProtected;
        if (!view || this._dataUpdatesSuspended || !this._lastLayoutKey) {
          return;
        }
      
        if (Trace.isEnabled()) {
          CLog(CLogTypes.log, 'onItemsChanged', ChangeType.Update, event.action, event.index, event.addedCount, event.removed && event.removed.length);
        }
        const sectionIdentifier = this._dataSource.sectionIdentifierForIndex(0);

        switch (event.action) {
            case ChangeType.Delete: {
                const identifiers = [];
                for (let index = 0; index < event.addedCount; index++) {
                    const indexPath = NSIndexPath.indexPathForRowInSection(event.index + index, sectionIdentifier);
                    const identifier = this._dataSource.itemIdentifierForIndexPath(indexPath);
                    identifiers.push(identifier);
                    // console.log(' delete identifier:', identifier)
                }
                this.unbindUnusedCells(event.removed);
        
                this.modifyDataSourceSnapshot(ChangeType.Delete, identifiers, sectionIdentifier);
                return;
            }
            case ChangeType.Update: {
                const indexPath = NSIndexPath.indexPathForRowInSection(event.index, sectionIdentifier);
                const identifier = this._dataSource.itemIdentifierForIndexPath(indexPath);
                const identifiers = [identifier];

                this.modifyDataSourceSnapshot(ChangeType.Update, identifiers, sectionIdentifier);
                return;
            }
            case ChangeType.Add: {
                const identifiers = [];
                for (let index = 0; index < event.addedCount; index++) {
                    const indexPath = NSIndexPath.indexPathForRowInSection(event.index + index, sectionIdentifier);
                    const identifier = this._dataSource.itemIdentifierForIndexPath(indexPath) || getUUID();
                    identifiers.push(identifier);
                }
                this.modifyDataSourceSnapshot(ChangeType.Add, identifiers, sectionIdentifier);
                return;
            }
            case ChangeType.Splice: {
                const added = event.addedCount;
                const removed = (event.removed && event.removed.length) || 0;
        
                if (added === removed) {
                    const identifiers = [];
                    for (let index = 0; index < added; index++) {
                        const indexPath = NSIndexPath.indexPathForRowInSection(event.index + index, sectionIdentifier);
                        const identifier = this._dataSource.itemIdentifierForIndexPath(indexPath) || getUUID();
                        identifiers.push(identifier);
                    }
                    this.modifyDataSourceSnapshot(ChangeType.Update, identifiers, sectionIdentifier);
                } else {
                if (event.removed && event.removed.length > 0) {
                    const deleteIdentifiers = [];
                    for (let index = 0; index < event.removed.length; index++) {
                    const indexPath = NSIndexPath.indexPathForItemInSection(event.index + index, sectionIdentifier);
                    const identifier = this._dataSource.itemIdentifierForIndexPath(indexPath);
                    deleteIdentifiers.push(identifier);
                    }
                    this.unbindUnusedCells(event.removed);
        
                    this.modifyDataSourceSnapshot(ChangeType.Delete, deleteIdentifiers, sectionIdentifier);
                }
                if (event.addedCount > 0) {
                    const addIdentifiers = [];
                    for (let index = 0; index < event.addedCount; index++) {
                        const indexPath = NSIndexPath.indexPathForItemInSection(event.index + index, sectionIdentifier);
                        const identifier = this._dataSource.itemIdentifierForIndexPath(indexPath) || getUUID();
                        addIdentifiers.push(identifier);
                    }
                    this.modifyDataSourceSnapshot(ChangeType.Add, addIdentifiers, sectionIdentifier);
                }
                }
                return;
            }
            }
      
        this.refreshVisibleItems();
      }
      

    protected clearEmbeddedViews() {
        this.clearRealizedCells();
    }

    private bindingContextMap: Map<CollectionViewCell, any> = new Map();

    private unbindUnusedCells(removedDataItems) {
      for (const [view, bindingContext] of this.bindingContextMap) {
        if (!view) {
          continue;
        }
        if (removedDataItems.includes(bindingContext)) {
          this.bindingContextMap.delete(view);
        }
      }
    }

    refreshVisibleItems() {
        const view = this.nativeViewProtected;
        if (!view) {
            return;
        }
        const sizes = this._delegate instanceof UICollectionViewDelegateImpl ? this._delegate.cachedSizes : null;
        const visibleIndexPaths = NSMutableSet.setWithArray(view.indexPathsForVisibleItems);

        if (sizes) {
            for (const indexPath of visibleIndexPaths) {
                sizes.replaceObjectAtIndexWithObject(indexPath.row, NSValue.valueWithCGSize(CGSizeZero));
            }
        }
        const indexPathsArray = [];
        visibleIndexPaths.enumerateObjectsUsingBlock((indexPath) => {
            indexPathsArray.push(indexPath);
        });

        UIView.performWithoutAnimation(() => {
            view.performBatchUpdatesCompletion(() => {
                view.reloadItemsAtIndexPaths(indexPathsArray);
            }, null);
        });
    }

    public isItemAtIndexVisible(itemIndex: number): boolean {
        const view = this.nativeViewProtected;
        if (!view) {
            return false;
        }
        const indexes: NSIndexPath[] = Array.from(view.indexPathsForVisibleItems);

        return indexes.some((visIndex) => visIndex.row === itemIndex);
    }

    @profile
    public refresh() {
        if (!this.isLoaded || !this.nativeView) {
            this._isDataDirty = true;
            return;
        }
        this._isDataDirty = false;
        this._lastLayoutKey = this._innerWidth + '_' + this._innerHeight;
        if (Trace.isEnabled()) {
            CLog(CLogTypes.info, 'refresh');
        }

        // clear bindingContext when it is not observable because otherwise bindings to items won't reevaluate
        this._map.forEach((view, nativeView, map) => {
            if (!(view.bindingContext instanceof Observable)) {
                view.bindingContext = null;
            }
        });

        this.refreshDataSourceSnapshot(this.getDefaultSectionIdentifier());
        // TODO: this is ugly look here: https://github.com/nativescript-vue/nativescript-vue/issues/525
        this.nativeViewProtected.reloadData();
            
        this.notify({ eventName: CollectionViewBase.dataPopulatedEvent });
    }

    //@ts-ignore
    get scrollOffset() {
        const view = this.nativeViewProtected;
        return (this.isHorizontal() ? view?.contentOffset.x : view?.contentOffset.y) || 0;
    }

    get verticalOffsetX() {
        return this.nativeViewProtected?.contentOffset.x || 0;
    }

    get verticalOffsetY() {
        return this.nativeViewProtected?.contentOffset.y || 0;
    }

    public scrollToIndex(index: number, animated: boolean = true) {
        this.nativeViewProtected.scrollToItemAtIndexPathAtScrollPositionAnimated(
            NSIndexPath.indexPathForItemInSection(index, 0),
            this.orientation === 'vertical' ? UICollectionViewScrollPosition.Top : UICollectionViewScrollPosition.Left,
            animated
        );
    }

    public requestLayout(): void {
        // When preparing cell don't call super - no need to invalidate our measure when cell desiredSize is changed.
        if (!this._preparingCell) {
            super.requestLayout();
        }
    }

    public _setNativeClipToBounds() {
        this.nativeView.clipsToBounds = true;
    }
    notifyForItemAtIndex(eventName: string, view: View, index: number, bindingContext?, native?: any) {
        const args = { eventName, object: this, index, view, ios: native, bindingContext };
        this.notify(args);
        return args as any;
    }
    _getItemTemplateType(indexPath) {
        return (this._itemTemplateSelector ? this._itemTemplateSelector.call(this, this.getItemAtIndex(indexPath.row), indexPath.row, this.items) : this._defaultTemplate.key).toLowerCase();
    }
    public disableIosOverflowSafeArea(parentView: View) {
		if (parentView) {
			parentView.iosOverflowSafeAreaEnabled = false;
		}
	}
    public _prepareHeaderFooter(cell: CollectionViewCell, indexPath: NSIndexPath, templateKey: string, templateType: ViewTemplateType, notForCellSizeComp = true) {
        let cellSize: [number, number];
        try {
            this._preparingCell = true;
            const firstRender = !cell.view;
            let view = cell.view;
            const index = indexPath.row;
            if (!view) {
                view = this.getViewForTemplateType(templateKey, templateType);
            }
            if (Trace.isEnabled()) {
                CLog(CLogTypes.log, '_prepareHeaderFooter', index, templateType, !!cell.view, !!view, cell.view !== view, notForCellSizeComp);
            }
            
            if (view) {
                if (firstRender) {
                    view['iosIgnoreSafeArea'] = true;
                }
                view.bindingContext = this.bindingContext;
    
                if (view instanceof ProxyViewContainer) {
                    const sp = new ContentView();
                    sp.content = view;
                    view = sp;
                }
    
                if (!cell.view) {
                    cell.owner = new WeakRef(view);
                } else if (cell.view !== view) {
                    this._removeContainer(cell);
                    if (cell.view?.nativeViewProtected) {
                        cell.view.nativeViewProtected.removeFromSuperview();
                    }
                    cell.owner = new WeakRef(view);
                }
                cell.currentIndex = indexPath.row;
    
                if (view && !view.parent) {
                    this._addView(view);
                    const innerView = NSCellView.new() as NSCellView;
                    innerView.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
                    innerView.view = new WeakRef(view);
                    innerView.addSubview(view.nativeViewProtected);
                    cell.addSubview(innerView);
                }
                cellSize = this.measureCell(cell, view, indexPath.row);
            }
        } finally {
            this._preparingCell = false;
        }
        return cellSize;
    }
    public _prepareCell(cell: CollectionViewCell, indexPath: NSIndexPath, templateKey: string, notForCellSizeComp = true) {
        let cellSize: [number, number];
        try {
            this._preparingCell = true;
            const firstRender = !cell.view;
            let view = cell.view;
            const index = indexPath.row;
            if (!view) {
                view = this.getViewForTemplateType(templateKey);
            }
            const bindingContext = this._prepareItem(view, index);

            if (Trace.isEnabled()) {
                CLog(CLogTypes.log, '_prepareCell', index, templateKey, !!cell.view, !!view, cell.view !== view, notForCellSizeComp);
            }
            const args = this.notifyForItemAtIndex(CollectionViewBase.itemLoadingEvent, view, indexPath.row, bindingContext, cell);
            view = args.view;
            if (firstRender) {
                view['iosIgnoreSafeArea'] = true;
            }
            view.bindingContext = bindingContext;

            if (view instanceof ProxyViewContainer) {
                const sp = new ContentView();
                sp.content = view;
                view = sp;
            }

            if (!cell.view) {
                cell.owner = new WeakRef(view);
            } else if (cell.view !== view) {
                this._removeContainer(cell);
                if (cell.view?.nativeViewProtected) {
                    cell.view.nativeViewProtected.removeFromSuperview();
                }
                cell.owner = new WeakRef(view);
            }
            cell.currentIndex = indexPath.row;

            if (notForCellSizeComp) {
                this._map.set(cell, view);
            }

            if (view && !view.parent) {
                this._addView(view);
                const innerView = NSCellView.new() as NSCellView;
                innerView.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
                innerView.view = new WeakRef(view);
                innerView.addSubview(view.nativeViewProtected);
                cell.contentView.addSubview(innerView);
            }
            cellSize = this.measureCell(cell, view, indexPath.row);
            if (notForCellSizeComp) {
                view.notify({ eventName: CollectionViewBase.bindedEvent });
            }

            if (Trace.isEnabled()) {
                CLog(CLogTypes.log, '_prepareCell done', index, cellSize);
            }
        } finally {
            this._preparingCell = false;
        }
        return cellSize;
    }

    public getCellSize(index: number) {
        let result;
      
        if (!result) {
            let width = this._effectiveColWidth;
            let height = this._effectiveRowHeight;
      
            if (this.spanSize) {
                const dataItem = this.getItemAtIndex(index);
                const spanSize = this.spanSize(dataItem, index);
                const horizontal = this.isHorizontal(); 
                if (horizontal) {
                height *= spanSize;
                } else {
                width *= spanSize;
                }
            }
      
            if (width && height) {
                result = [width, height];
            } else if (height && this.orientation === 'vertical') {
                result = [this.getMeasuredWidth(), height];
            } else if (width && this.orientation === 'horizontal') {
                result = [width, this.getMeasuredHeight()];
            }
        }   
        return result;
    }

    private measureCell(cell: CollectionViewCell | CollectionViewReusableView, cellView: View, position: number): [number, number] | undefined {
        if (cellView) {
            let width = this._effectiveColWidth;
            let height = this._effectiveRowHeight;
            const horizontal = this.isHorizontal();
      
            if (this.spanSize) {
                const dataItem = this.getItemAtIndex(position);
                const spanSize = this.spanSize(dataItem, position);
        
                if (horizontal) {
                    height *= spanSize;
                } else {
                    width *= spanSize;
                }
            }
            const widthMeasureSpec = width
                ? Utils.layout.makeMeasureSpec(width, Utils.layout.EXACTLY)
                : horizontal
                ? Utils.layout.UNSPECIFIED
                : Utils.layout.makeMeasureSpec(this._innerWidth, Utils.layout.UNSPECIFIED);
            const heightMeasureSpec = height
                ? Utils.layout.makeMeasureSpec(height, Utils.layout.EXACTLY)
                : horizontal
                ? Utils.layout.makeMeasureSpec(this._innerHeight, Utils.layout.UNSPECIFIED)
                : Utils.layout.UNSPECIFIED;
          if (Trace.isEnabled()) {
            CLog(CLogTypes.log, 'measureCell', position, width, height, widthMeasureSpec, heightMeasureSpec);
          }
      
          const measuredSize = View.measureChild(this, cellView, widthMeasureSpec, heightMeasureSpec);
          return [measuredSize.measuredWidth, measuredSize.measuredHeight];
        }
      
        return undefined;
    }      

    layoutCell(index: number, cell: CollectionViewCell | CollectionViewReusableView, cellView: View): any {
        const size = cell.bounds.size;
        View.layoutChild(this, cellView, 0, 0, Utils.layout.toDevicePixels(size.width), Utils.layout.toDevicePixels(size.height));
        if (Trace.isEnabled()) {
            CLog(CLogTypes.log, 'layoutCell', index, cellView.getMeasuredWidth(), cellView.getMeasuredHeight());
        }
    }

    private clearRealizedCells() {
        this._map.forEach((value, key: CollectionViewCell) => {
            this._removeContainer(key);
            this._clearCellViews(key);
        });
        this._map.clear();
    }

    private _clearCellViews(cell: CollectionViewCell) {
        if (cell && cell.view) {
            if (cell.view.nativeViewProtected) {
                cell.view.nativeViewProtected.removeFromSuperview();
            }

            cell.owner = undefined;
        }
    }

    private _removeContainer(cell: CollectionViewCell | CollectionViewReusableView): void {
        const view = cell.view;
        // This is to clear the StackLayout that is used to wrap ProxyViewContainer instances.
        if (!(view.parent instanceof CollectionView)) {
            this._removeView(view.parent);
        }
        // No need to request layout when we are removing cells.
        const preparing = this._preparingCell;
        this._preparingCell = true;
        view.parent._removeView(view);
        this._preparingCell = preparing;
        this._map.delete(<CollectionViewCell>cell);
    }

    private _setPadding(newPadding: { top?: number; right?: number; bottom?: number; left?: number }) {
        const layout = this._layout;
        const padding = {
            top: layout['sectionInset'].top,
            right: layout['sectionInset'].right,
            bottom: layout['sectionInset'].bottom,
            left: layout['sectionInset'].left
        };
        // tslint:disable-next-line:prefer-object-spread
        const newValue = Object.assign(padding, newPadding);
        layout['sectionInset'] = newValue;
    }

    numberOfSectionsInCollectionView(collectionView: UICollectionView) {
        if (!this._lastLayoutKey) {
            return 0;
        }
        return 1;
    }

    collectionViewNumberOfItemsInSection(collectionView: UICollectionView, section: number) {
        return this.items?.length || 0;
    }

    collectionViewCellForItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): UICollectionViewCell {
        const templateType = this._getItemTemplateType(indexPath);
        let cell = collectionView.dequeueReusableCellWithReuseIdentifierForIndexPath(templateType, indexPath) as CollectionViewCell;

        if (!cell) {
            cell = CollectionViewCell.new() as CollectionViewCell;
        }
        const firstRender = !cell.view;
        if (Trace.isEnabled()) {
            CLog(CLogTypes.log, 'collectionViewCellForItemAtIndexPath', indexPath.row, templateType, !!cell.view, cell);
        }
        this._prepareCell(cell, indexPath, templateType);

        // the cell layout will be called from NSCellView layoutSubviews
        const cellView: View = cell.view;
        if (!firstRender && cellView['isLayoutRequired']) {
            this.layoutCell(indexPath.row, cell, cellView);
        }
        return cell;
    }

    collectionViewWillDisplayCellForItemAtIndexPath(collectionView: UICollectionView, cell: UICollectionViewCell, indexPath: NSIndexPath) {
        if (this.reverseLayout) {
            cell.transform = CGAffineTransformMakeRotation(-Math.PI);
        }

        const items = this.items;
        const loadMoreThreshold = this.loadMoreThreshold;
        const lastIndex = items.length - 1;

        if (items && indexPath.row === lastIndex - loadMoreThreshold && items.length && this.hasListeners(CollectionViewBase.loadMoreItemsEvent)) {
            this.notify({
                eventName: CollectionViewBase.loadMoreItemsEvent,
                object: this
            });
        }

        // Configure cell margins and other appearance properties
        this.configureCellAppearance(cell);
    }

    configureCellAppearance(cell: UICollectionViewCell) {
        // Optimize the configuration of cell appearance here
        cell.preservesSuperviewLayoutMargins = false;
        cell.layoutMargins = UIEdgeInsetsZero;
    }

    collectionViewDidSelectItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath) {
        const cell = collectionView.cellForItemAtIndexPath(indexPath) as CollectionViewCell;
        const position = indexPath.row;
        this.notify({
            eventName: CollectionViewBase.itemTapEvent,
            object: this,
            item: this.getItemAtIndex(position),
            index: position,
            view: cell.view
        });
        cell.highlighted = false;
        return indexPath;
    }

    collectionViewDidHighlightItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): void {
        const cell = collectionView.cellForItemAtIndexPath(indexPath) as CollectionViewCell;
        const position = indexPath?.row;
        this.notify<CollectionViewItemEventData>({
            eventName: CollectionViewBase.itemHighlightEvent,
            object: this,
            item: this.getItemAtIndex(position),
            index: position,
            view: cell?.view
        });
    }
    collectionViewDidUnhighlightItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): void {
        const cell = collectionView.cellForItemAtIndexPath(indexPath) as CollectionViewCell;
        const position = indexPath?.row;
        this.notify<CollectionViewItemEventData>({
            eventName: CollectionViewBase.itemHighlightEndEvent,
            object: this,
            item: this.getItemAtIndex(position),
            index: position,
            view: cell?.view
        });
    }

    collectionViewLayoutSizeForItemAtIndexPath(collectionView: UICollectionView, collectionViewLayout: UICollectionViewLayout, indexPath: NSIndexPath) {
        const row = indexPath.row;
        let measuredSize = this.getCellSize(row);

        if (!measuredSize) {
            if (Trace.isEnabled()) {
                CLog(CLogTypes.log, 'collectionViewLayoutSizeForItemAtIndexPath', row);
            }

            const templateType = this._getItemTemplateType(indexPath);
            if (!templateType) {
                return CGSizeZero;
            }

            const measureData = this._measureCellMap.get(templateType);
            let cell: any = measureData && measureData.cell;
            let needsSet = false;

            if (!cell) {
                cell = CollectionViewCell.new();
                needsSet = true;
            } else if (!cell.view) {
                cell.owner = new WeakRef(measureData.view);
                needsSet = true;
            }

            measuredSize = this._prepareCell(cell, indexPath, templateType, false);

            if (needsSet) {
                this._measureCellMap.set(templateType, { cell, view: cell.view });
            }

            if (Trace.isEnabled()) {
                CLog(CLogTypes.log, 'collectionViewLayoutSizeForItemAtIndexPath', row, measuredSize);
            }
        }

        if (measuredSize) {
            return CGSizeMake(
                Utils.layout.toDeviceIndependentPixels(measuredSize[0]),
                Utils.layout.toDeviceIndependentPixels(measuredSize[1])
            );
        }
        return CGSizeZero;
    }

    scrollToOffset(value: number, animated: boolean) {
        if (this.nativeViewProtected && this.isScrollEnabled) {
            const { width, height } = this.nativeViewProtected.bounds.size;
            let rect;

            if (this.orientation === 'vertical') {
                rect = CGRectMake(0, value, width, height);
            } else if (this.orientation === 'horizontal') {
                rect = CGRectMake(value, 0, width, height);
            }

            if (rect) {
                this.nativeViewProtected.scrollRectToVisibleAnimated(rect, animated);
            }
        }
    }

    private computeScrollEventData(scrollView: UIScrollView, eventName: string, dx?: number, dy?: number) {
        const horizontal = this.isHorizontal();
        const { contentOffset, contentSize, bounds, safeAreaInsets } = scrollView;
        const safeAreaInsetsTop = this.iosIgnoreSafeArea ? 0 : (safeAreaInsets && safeAreaInsets.top) || 0;

        if (!contentOffset || !contentSize || !bounds) {
            return null; // or return a default or error value
        }

        const offset = horizontal ? contentOffset.x : contentOffset.y + safeAreaInsetsTop;
        const size = horizontal ? contentSize.width - bounds.size.width : contentSize.height - bounds.size.height + safeAreaInsetsTop;

        return {
            object: this,
            eventName,
            scrollOffset: offset,
            scrollOffsetPercentage: size !== 0 ? offset / size : 0,
            dx,
            dy: dy + safeAreaInsetsTop,
        };
    }

    lastContentOffset: CGPoint;
    needsScrollStartEvent = false;
    isScrolling = false;

    scrollViewWillBeginDragging(scrollView: UIScrollView): void {
        this.lastContentOffset = scrollView.contentOffset;
        this.needsScrollStartEvent = true;
        this.isScrolling = true;
    }

    scrollViewDidScroll(scrollView: UIScrollView): void {
        const { contentOffset } = scrollView;
        const { x: lastX, y: lastY } = this.lastContentOffset || {};
        const dx = contentOffset?.x - lastX || 0;
        const dy = contentOffset?.y - lastY || 0;

        if (!contentOffset) return;

        this.lastContentOffset = { ...contentOffset };

        if (this.needsScrollStartEvent) {
            this.needsScrollStartEvent = false;
            if (this.hasListeners(CollectionViewBase.scrollStartEvent)) {
                const eventData = this.computeScrollEventData(scrollView, CollectionViewBase.scrollStartEvent, dx, dy);
                this.notify(eventData);
            }
        }
        const eventData = this.computeScrollEventData(scrollView, CollectionViewBase.scrollEvent, dx, dy);
        this.notify(eventData);
    }

    stopScrolling(scrollView: UIScrollView) {
        if (this.isScrolling) {
            this.isScrolling = false;
            this.notify(this.computeScrollEventData(scrollView, CollectionViewBase.scrollEndEvent));
        }
    }
    scrollViewDidEndDecelerating(scrollView: UIScrollView) {
        this.stopScrolling(scrollView);
    }
    scrollViewWillEndDraggingWithVelocityTargetContentOffset?(scrollView: UIScrollView, velocity: CGPoint, targetContentOffset: interop.Pointer | interop.Reference<CGPoint>): void {
        this.stopScrolling(scrollView);
    }
    scrollViewDidEndDraggingWillDecelerate(scrollView: UIScrollView, decelerate: boolean): void {
        this.stopScrolling(scrollView);
    }

    scrollViewDidEndScrollingAnimation(scrollView: UIScrollView): void {
        this.stopScrolling(scrollView);
    }
}
contentInsetAdjustmentBehaviorProperty.register(CollectionView);

interface ViewItemIndex {}

type ItemView = View & ViewItemIndex;

@NativeClass
class NSCellView extends UIView {
    view: WeakRef<View>;
    layoutSubviews() {
        super.layoutSubviews();
        const view = this.view && this.view.deref();
        if (!view) {
            return;
        }
        this.frame = this.superview.bounds;
        const size = this.bounds.size;
        View.layoutChild(null, view, 0, 0, Utils.layout.toDevicePixels(size.width), Utils.layout.toDevicePixels(size.height));
    }
}

@NativeClass
class CollectionViewCell extends UICollectionViewCell {
    owner: WeakRef<ItemView>;
    currentIndex: number;

    get view(): ItemView {
        return this.owner ? this.owner.deref() : null;
    }

    systemLayoutSizeFittingSizeWithHorizontalFittingPriorityVerticalFittingPriority(targetSize: CGSize, horizontalFittingPriority: number, verticalFittingPriority: number): CGSize {
        const owner = this.owner?.deref();
        if (owner) {
            const dimensions = { measuredWidth: owner.getMeasuredWidth(), measuredHeight: owner.getMeasuredHeight() };
            return CGSizeMake(Utils.layout.toDeviceIndependentPixels(dimensions.measuredWidth), Utils.layout.toDeviceIndependentPixels(dimensions.measuredHeight));
        }
        return targetSize;
    }

    // TODO: investigate cases where this might help layouts
    // preferredLayoutAttributesFittingAttributes(layoutAttributes: UICollectionViewLayoutAttributes): UICollectionViewLayoutAttributes {
    //     let targetSize = CGSizeMake(layoutAttributes.frame.size.width, 0)
    //     layoutAttributes.frame.size = this.contentView.systemLayoutSizeFittingSizeWithHorizontalFittingPriorityVerticalFittingPriority(targetSize, UILayoutPriorityRequired, UILayoutPriorityFittingSizeLevel)
    //     return layoutAttributes;
    // }
}

@NativeClass
class CollectionViewReusableView extends UICollectionReusableView {
    owner: WeakRef<ItemView>;
    currentIndex: number;

    get view(): ItemView {
        return this.owner ? this.owner.deref() : null;
    }
}

// @NativeClass
// class CollectionViewDataSource extends UICollectionViewDiffableDataSource<any,any>  {
// // class CollectionViewDataSource extends NSObject implements UICollectionViewDataSource {
//     _owner: WeakRef<CollectionView>;
//     public static ObjCProtocols = [UICollectionViewDataSource];

//     static initWithOwner(owner: CollectionView) {
//         const delegate = CollectionViewDataSource.new() as CollectionViewDataSource;
//         delegate._owner = new WeakRef(owner);
//         return delegate;
//     }
//     numberOfSectionsInCollectionView(collectionView: UICollectionView) {
//         const owner = this._owner.deref();
//         if (owner) {
//             return owner.numberOfSectionsInCollectionView(collectionView);
//         }
//         return 0;
//     }

//     collectionViewNumberOfItemsInSection(collectionView: UICollectionView, section: number) {
//         const owner = this._owner.deref();
//         if (owner) {
//             return owner.collectionViewNumberOfItemsInSection(collectionView, section);
//         }
//         return 0;
//     }

//     collectionViewCellForItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): UICollectionViewCell {
//         const owner = this._owner.deref();
//         if (owner) {
//             return owner.collectionViewCellForItemAtIndexPath(collectionView, indexPath);
//         }
//         return null;
//     }
//     collectionViewMoveItemAtIndexPathToIndexPath(collectionView: UICollectionView, sourceIndexPath: NSIndexPath, destinationIndexPath: NSIndexPath) {
//         const owner = this._owner.deref();
//         if (owner) {
//             owner.reorderStartingRow = sourceIndexPath.row;
//             owner.reorderEndingRow = destinationIndexPath.row;
//             owner._reorderItemInSource(sourceIndexPath.row, destinationIndexPath.row, false);
//         }
//     }
//     collectionViewTargetIndexPathForMoveFromItemAtIndexPathToProposedIndexPath?(collectionView: UICollectionView, originalIndexPath: NSIndexPath, proposedIndexPath: NSIndexPath): NSIndexPath {
//         const owner = this._owner.deref();
//         if (owner) {
//             owner.reorderEndingRow = proposedIndexPath.row;
//         }
//         return proposedIndexPath;
//     }
//     collectionViewCanMoveItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath) {
//         const owner = this._owner.deref();
//         if (owner) {
//             const result = owner.shouldMoveItemAtIndex(indexPath.row);
//             if (result) {
//                 owner.reorderStartingRow = indexPath.row;
//             }
//             return result;
//         }
//         return false;
//     }
//     // collectionViewViewForSupplementaryElementOfKindAtIndexPath(collectionView: UICollectionView, kind: string, indexPath: NSIndexPath): UICollectionReusableView {
//     //     console.log('collectionViewViewForSupplementaryElementOfKindAtIndexPath')
//     //     const owner = this._owner.deref();
//     //     if (owner) {
//     //         return owner.collectionViewViewForSupplementaryElementOfKindAtIndexPath(collectionView, kind, indexPath);
//     //     }
//     //     return null;
//     // }
// }
@NativeClass
class UICollectionViewDelegateImpl extends UICollectionViewCacheDelegateFlowLayout implements UICollectionViewDelegate {
    _owner: WeakRef<CollectionView>;
    public static ObjCProtocols = [UICollectionViewDelegate, UICollectionViewDelegateFlowLayout];

    static initWithOwner(owner: CollectionView) {
        const delegate = UICollectionViewDelegateImpl.new() as UICollectionViewDelegateImpl;
        delegate._owner = new WeakRef(owner);
        return delegate;
    }
    collectionViewWillDisplayCellForItemAtIndexPath(collectionView: UICollectionView, cell: UICollectionViewCell, indexPath: NSIndexPath) {
        const owner = this._owner.deref();
        if (owner) {
            owner.collectionViewWillDisplayCellForItemAtIndexPath(collectionView, cell, indexPath);
        }
    }
    collectionViewDidSelectItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath) {
        const owner = this._owner.deref();
        if (owner) {
            return owner.collectionViewDidSelectItemAtIndexPath(collectionView, indexPath);
        }
        return indexPath;
    }
    collectionViewLayoutComputedSizeForItemAtIndexPath(collectionView: UICollectionView, collectionViewLayout: UICollectionViewLayout, indexPath: NSIndexPath) {
        const owner = this._owner.deref();
        if (owner) {
            return owner.collectionViewLayoutSizeForItemAtIndexPath(collectionView, collectionViewLayout, indexPath);
        }
        return CGSizeZero;
    }
    scrollViewDidScroll(scrollView: UIScrollView): void {
        const owner = this._owner.deref();
        if (owner) {
            owner.scrollViewDidScroll(scrollView);
        }
    }
    scrollViewWillBeginDragging(scrollView: UIScrollView): void {
        const owner = this._owner.deref();
        if (owner) {
            owner.scrollViewWillBeginDragging(scrollView);
        }
    }
    scrollViewDidEndDecelerating(scrollView: UIScrollView) {
        const owner = this._owner.deref();
        if (owner) {
            owner.scrollViewDidEndDecelerating(scrollView);
        }
    }
    scrollViewWillEndDraggingWithVelocityTargetContentOffset?(scrollView: UIScrollView, velocity: CGPoint, targetContentOffset: interop.Pointer | interop.Reference<CGPoint>): void {
        const owner = this._owner.deref();
        if (owner) {
            owner.scrollViewWillEndDraggingWithVelocityTargetContentOffset(scrollView, velocity, targetContentOffset);
        }
    }
    scrollViewDidEndDraggingWillDecelerate(scrollView: UIScrollView, decelerate: boolean): void {
        const owner = this._owner.deref();
        if (owner) {
            owner.scrollViewDidEndDraggingWillDecelerate(scrollView, decelerate);
        }
    }

    scrollViewDidEndScrollingAnimation(scrollView: UIScrollView): void {
        const owner = this._owner.deref();
        if (owner) {
            owner.scrollViewDidEndScrollingAnimation(scrollView);
        }
    }
}

@NativeClass
class UICollectionViewDelegateFixedSizeImpl extends NSObject implements UICollectionViewDelegate, UICollectionViewDelegateFlowLayout {
    _owner: WeakRef<CollectionView>;
    public static ObjCProtocols = [UICollectionViewDelegate, UICollectionViewDelegateFlowLayout];

    static initWithOwner(owner: CollectionView) {
        const delegate = UICollectionViewDelegateFixedSizeImpl.new() as UICollectionViewDelegateFixedSizeImpl;
        delegate._owner = new WeakRef(owner);
        return delegate;
    }
    collectionViewWillDisplayCellForItemAtIndexPath(collectionView: UICollectionView, cell: UICollectionViewCell, indexPath: NSIndexPath) {
        const owner = this._owner.deref();
        if (owner) {
            owner.collectionViewWillDisplayCellForItemAtIndexPath(collectionView, cell, indexPath);
        }
    }
    collectionViewDidSelectItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath) {
        const owner = this._owner.deref();
        if (owner) {
            return owner.collectionViewDidSelectItemAtIndexPath(collectionView, indexPath);
        }
        return indexPath;
    }
    scrollViewDidScroll(scrollView: UIScrollView): void {
        const owner = this._owner.deref();
        if (owner) {
            owner.scrollViewDidScroll(scrollView);
        }
    }
    scrollViewWillBeginDragging(scrollView: UIScrollView): void {
        const owner = this._owner.deref();
        if (owner) {
            owner.scrollViewWillBeginDragging(scrollView);
        }
    }
    scrollViewDidEndDecelerating(scrollView: UIScrollView) {
        const owner = this._owner.deref();
        if (owner) {
            owner.scrollViewDidEndDecelerating(scrollView);
        }
    }
    scrollViewWillEndDraggingWithVelocityTargetContentOffset?(scrollView: UIScrollView, velocity: CGPoint, targetContentOffset: interop.Pointer | interop.Reference<CGPoint>): void {
        const owner = this._owner.deref();
        if (owner) {
            owner.scrollViewWillEndDraggingWithVelocityTargetContentOffset(scrollView, velocity, targetContentOffset);
        }
    }
    scrollViewDidEndDraggingWillDecelerate(scrollView: UIScrollView, decelerate: boolean): void {
        const owner = this._owner.deref();
        if (owner) {
            owner.scrollViewDidEndDraggingWillDecelerate(scrollView, decelerate);
        }
    }

    scrollViewDidEndScrollingAnimation(scrollView: UIScrollView): void {
        const owner = this._owner.deref();
        if (owner) {
            owner.scrollViewDidEndScrollingAnimation(scrollView);
        }
    }
}

@NativeClass
class ReorderLongPressImpl extends NSObject {
    private _owner: WeakRef<CollectionView>;

    public static initWithOwner(owner: WeakRef<CollectionView>): ReorderLongPressImpl {
        const handler = ReorderLongPressImpl.new() as ReorderLongPressImpl;
        handler._owner = owner;
        return handler;
    }

    public longPress(recognizer: UILongPressGestureRecognizer): void {
        const owner = this._owner && this._owner.deref();
        if (owner) {
            owner.onReorderLongPress(recognizer);
        }
    }

    public static ObjCExposedMethods = {
        longPress: { returns: interop.types.void, params: [interop.types.id] }
    };
}
