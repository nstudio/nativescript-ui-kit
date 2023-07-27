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
  public scrollToOffset(value: number, animation?: boolean);
  public getViewForItemAtIndex(index: number): View;
  // on iOS a view is dragged from its center by default
  // if you use a drag "handle" just pass the touch event main pointer
  // to delta the dragging to be good
  startDragging(index: number, pointer?: Pointer);
  /**
   * (iOS Only) Ability to apply effects to how cells display
   */
  collectionViewWillDisplayCellForItemAtIndexPath?(collectionView: any /* UICollectionView */, cell: any /* UICollectionViewCell */, indexPath: any /* NSIndexPath */): void;
}
