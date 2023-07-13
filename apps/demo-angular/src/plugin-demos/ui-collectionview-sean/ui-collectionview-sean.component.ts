import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as stringConstants from './item/items.component.strings';
import { ItemService } from './item/item.service';
import { ItemVM } from './item/item';
import { throttle } from '@nativescript/core/utils';
import { isAndroid } from "@nativescript/core/platform";
import { CollectionView } from '@nstudio/ui-collectionview';
import { EventData, ObservableArray, ScrollView } from '@nativescript/core';

@Component({
	selector: 'ui-collectionview-sean',
	templateUrl: 'ui-collectionview-sean.component.html',
  styleUrls: ['./ui-collectionview-sean.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiCollectionviewSeanComponent implements OnInit {

  isAndroid: boolean = false;

  idsCollectionView: CollectionView;
  @ViewChild('ids') set idsColumnsContent( idsColumn: ElementRef) {
    if(idsColumn) {
      this.idsCollectionView = <CollectionView>idsColumn.nativeElement;
    }
  };

  mainCollectionView: CollectionView;
  @ViewChild('main') set mainColumnsContent( mainColumn: ElementRef) {
    if(mainColumn) {
      this.mainCollectionView = <CollectionView>mainColumn.nativeElement;
    }
  };

  constructor(private itemService: ItemService, private changeDetectorRef: ChangeDetectorRef) {
    if(isAndroid) {
      this.isAndroid = true;
    }
  }

  items: ItemVM[] = [];
  itemsOnScreen: ObservableArray<ItemVM> = new ObservableArray();

  rowsDisplayed: number = 20;

  id: string = stringConstants.id;
  name: string = stringConstants.name;
  position: string = stringConstants.position;
  height: string = stringConstants.height;
  nationality: string = stringConstants.nationality;
  appearances: string = stringConstants.appearances;
  goals: string = stringConstants.goals;
  assists: string = stringConstants.assists;


  ngOnInit() {
    this.items = this.itemService.getItems();
    this.itemsOnScreen.splice(0, this.items.length, ...(this.items.slice(0, this.rowsDisplayed)));

    this.changeDetectorRef.detectChanges();
  }

  loadMoreRows() {
    if (this.rowsDisplayed <= this.items.length) {
      this.rowsDisplayed = this.rowsDisplayed + 10;
      this.rowsDisplayed = Math.min(this.rowsDisplayed, this.items.length);
      this.itemsOnScreen.splice(0, this.itemsOnScreen.length, ...this.items.slice(0, this.rowsDisplayed));

    }
    this.changeDetectorRef.detectChanges();
  }

  addPlayers(amount: number) {
    for(let i = 0; i < amount; i++) {
      const newPlayer = this.itemService.generateRandomPlayer();
      this.items.push(newPlayer);
    }
  }

  onScrollVertically(args): void {
    const dyOffset = args.dy;
    const scrollOffsetY = args.scrollOffset;
  
    // The way Android and iOS handle offsetting differs.
    // For that reason, differing values are passed into the function of scrollToOffset
    if (this.isAndroid) {
      this.idsCollectionView.scrollToOffset(dyOffset, false);
      this.mainCollectionView.scrollToOffset(dyOffset, false);
    } else {
      throttle(() => this.idsCollectionView.scrollToOffset(scrollOffsetY, false), 16)();
      throttle(() => this.mainCollectionView.scrollToOffset(scrollOffsetY, false), 16)();
    }
  };

    // Removes elastic bouncing animation when ScrollView reaches the edges of lists
    doLoadedRemoveBandingAnimation(data: EventData): void {
      const scrollView = <ScrollView>data.object;
      if(global.isAndroid) {
        scrollView.android.setOverScrollMode(android.view.View.OVER_SCROLL_NEVER);
        scrollView.android.setVerticalScrollBarEnabled(false);
        scrollView.android.setHorizontalScrollBarEnabled(false);
        scrollView.android.setScrollBarStyle(android.R.style.Widget_ScrollView);
      } else {
        scrollView.ios.bounces = false;
        scrollView.ios.showsVerticalScrollIndicator = false;
        scrollView.ios.showsHorizontalScrollIndicator = false;
      }
    }
}