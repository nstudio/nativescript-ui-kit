import { View } from '@nativescript/core';
import { Pointer } from '@nativescript/core/ui/gestures';
import { CollectionViewBase } from './common';
export * from './common';

export class CollectionView extends CollectionViewBase {
    public scrollOffset: number;
    public refresh();
    public refreshVisibleItems();
    public isItemAtIndexVisible(index: number): boolean;
    public scrollToIndex(index: number, animated: boolean);
    public getViewForItemAtIndex(index: number): View;
    // on iOS a view is dragged from its center by default
    // if you use a drag "handle" just pass the touch event main pointer
    // to delta the dragging to be good
    startDragging(index: number, pointer?: Pointer);
}

