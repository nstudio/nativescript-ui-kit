/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as stringConstants from './item/items.component.strings';
import { ItemService } from './item/item.service';
import { Item } from './item/item';
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

  constructor(private itemService: ItemService) {
    if(isAndroid) {
      this.isAndroid = true;
    }
  }

  items: ObservableArray<Item> = new ObservableArray();

  id: string = stringConstants.id;
  name: string = stringConstants.name;
  position: string = stringConstants.position;
  height: string = stringConstants.height;
  nationality: string = stringConstants.nationality;
  appearances: string = stringConstants.appearances;
  goals: string = stringConstants.goals;
  assists: string = stringConstants.assists;


  ngOnInit() {
    this.items = new ObservableArray(this.itemService.getItems());
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