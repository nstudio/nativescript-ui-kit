import { EventData, View } from '@nativescript/core';
import { Pointer } from '@nativescript/core/ui/gestures';
import { CollectionViewBase } from './common';
export * from './common';

export type Orientation = 'horizontal' | 'vertical';
export enum SnapPosition {
  START = 0,
  END = 1,
}

export class CollectionView extends CollectionViewBase {
  public scrollOffset: number;
  public refresh();
  public refreshVisibleItems();
  public isItemAtIndexVisible(index: number): boolean;
  public findFirstVisibleItemIndex(): number;
  public findLastVisibleItemIndex(): number;
  public scrollToIndex(index: number, animated?: boolean, snap?: SnapPosition = SnapPosition.START);
  public scrollToOffset(value: number, animation?: boolean);
  public getViewForItemAtIndex(index: number): View;
  // on iOS a view is dragged from its center by default
  // if you use a drag "handle" just pass the touch event main pointer
  // to delta the dragging to be good
  startDragging(index: number, pointer?: Pointer);
  async eachChildAsync(callback);

  on(event: CollectionViewBase.itemLoadingEvent, callback: (args: CollectionViewItemEventData) => void, thisArg?: any);
  on(event: CollectionViewBase.displayItemEvent, callback: (args: CollectionViewItemDisplayEventData) => void, thisArg?: any);
}

export interface CollectionViewItemEventData extends EventData {
  eventName: string;
  object: any;
  index?: number;
  view?: View;
  item?: any;
  bindingContext?: any;
}

export interface CollectionViewItemDisplayEventData extends EventData {
  eventName: string;
  object: any;
  index?: number;
}

/**
 * Defines the different view types that {@link RadListView} can display in various scenarios.
 */
export enum ListViewViewTypes {
  /**
   * Identifies a view created using the {@link itemTemplate} value.
   */
  ItemView,
}
