import { ContentView, ItemEventData, View, profile } from '@nativescript/core';
import { NativeViewElementNode, TemplateElement, ViewNode, createElement, registerElement } from 'svelte-native/dom';
import { flush } from 'svelte/internal';
import { CollectionView } from '..';

const SVELTE_VIEW = '_svelteViewRef';

declare module '@nativescript/core/ui/core/view-base' {
    interface ViewBase {
        __SvelteComponent__?: SvelteComponent;
        __SvelteComponentBuilder__?: any;
        __CollectionViewCurrentIndex__?: number;
    }
}

class SvelteKeyedTemplate {
    _key: string;
    _templateEl: TemplateElement;
    constructor(key: string, templateEl: TemplateElement) {
        this._key = key;
        this._templateEl = templateEl;
    }
    get component() {
        return this._templateEl.component;
    }
    get key() {
        return this._key;
    }
    createView() {
        // create a proxy element to eventually contain our item (once we have one to render)
        // TODO is StackLayout the best choice here?
        // const wrapper = createElement('StackLayout') as NativeViewElementNode<View>;

        const nativeEl = new ContentView();

        // because of the way {N} works we cant use that wrapper as the target for the component
        // it will trigger uncessary {N} component updates because the parent view is already attached

        (nativeEl as any).__SvelteComponentBuilder__ = (parentView, props) => {
            profile('createView.__SvelteComponentBuilder__', () => {
                (nativeEl as any).__SvelteComponent__ = new this.component({
                    target: parentView,
                    props
                });
            })();
        };
        return nativeEl;
    }
}

export default class CollectionViewViewElement extends NativeViewElementNode<CollectionView> {
    constructor() {
        super('collectionview', CollectionView);
        const nativeView = this.nativeView;
        nativeView.itemViewLoader = (viewType: any): View => this.loadView(viewType);
        this.nativeView.on(CollectionView.itemLoadingEvent, this.updateListItem, this);
        this.nativeView.on(CollectionView.itemDisposingEvent, this.disposeListItem, this);
    }

    private loadView(viewType: string): View {
        if (Array.isArray(this.nativeElement.itemTemplates)) {
            const keyedTemplate = this.nativeElement.itemTemplates.find((t) => t.key === 'default');
            if (keyedTemplate) {
                return keyedTemplate.createView();
            }
        }

        const componentClass = this.getComponentForView(viewType);
        if (!componentClass) return null;

        const nativeEl = new ContentView();

        const builder = (parentView, props: any) => {
            (nativeEl as any).__SvelteComponent__ = new componentClass({
                target: parentView,
                props
            });
        };
        // in svelte we want to add the wrapper as a child of the collectionview ourselves
        (nativeEl as any).__SvelteComponentBuilder__ = builder;
        return nativeEl;
    }

    // For some reason itemTemplateSelector isn't defined as a "property" on radListView, so when we set the property, it is lowercase (due to svelte's forced downcasing)
    // we intercept and fix the case here.
    setAttribute(fullkey: string, value: any): void {
        if (fullkey.toLowerCase() === 'itemtemplateselector') {
            fullkey = 'itemTemplateSelector';
        }
        super.setAttribute(fullkey, value);
    }

    private getComponentForView(viewType: string) {
        const normalizedViewType = viewType.toLowerCase();
        const templateEl = this.childNodes.find((n) => n.tagName === 'template' && String(n.getAttribute('type')).toLowerCase() === normalizedViewType) as any;
        if (!templateEl) return null;
        return templateEl.component;
    }

    onInsertedChild(childNode: ViewNode, index: number) {
        super.onInsertedChild(childNode, index);
        if (childNode instanceof TemplateElement) {
            const key = childNode.getAttribute('key') || 'default';
            // const templates = !this.nativeView.itemTemplates || typeof this.nativeView.itemTemplates === 'string' ? [] : (this.nativeView.itemTemplates as any[]);
            // we need to reassign or the update wont be seen
            this.nativeView.addTemplate(key, new SvelteKeyedTemplate(key, childNode));
            // = templates.concat([new SvelteKeyedTemplate(key, childNode)]);
        }
    }

    onRemovedChild(childNode: ViewNode) {
        super.onRemovedChild(childNode);
        if (childNode instanceof TemplateElement) {
            const key = childNode.getAttribute('key') || 'default';
            this.nativeView.removeTemplate(key);
        }
    }

    @profile
    private disposeListItem(args: ItemEventData) {
        const _view = args.view;
        if (_view.__SvelteComponent__) {
            _view.__SvelteComponent__.$destroy();
            _view.__SvelteComponent__ = null;
        }
    }
    @profile
    private updateListItem(args: ItemEventData & { bindingContext }) {
        const _view = args.view;
        const props = { item: args.bindingContext, index: args.index };
        const componentInstance = _view.__SvelteComponent__;
        if (!componentInstance) {
            if (_view.__SvelteComponentBuilder__) {
                const dummy = createElement('fragment');
                _view.__SvelteComponentBuilder__(dummy, props);
                _view.__SvelteComponentBuilder__ = null;
                _view.__CollectionViewCurrentIndex__ = args.index;
                const nativeEl = (dummy.firstElement() as NativeViewElementNode<View>).nativeView;
                (_view as ContentView).content = nativeEl;
            }
        } else {
            // ensure we dont do unnecessary tasks if index did not change
            // console.log('updateListItem', args.index,  _view.__CollectionViewCurrentIndex__);
            _view.__CollectionViewCurrentIndex__ = args.index;
            _view._batchUpdate(() => {
                componentInstance.$set(props);
                flush(); // we need to flush to make sure update is applied right away
            });
        }
    }

    static register() {
        registerElement('collectionview', () => new CollectionViewViewElement());
    }
}
