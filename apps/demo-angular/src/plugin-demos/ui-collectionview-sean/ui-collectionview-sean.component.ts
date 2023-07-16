import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as stringConstants from './item/items.component.strings';
import { ItemService } from './item/item.service';
import { ItemVM } from './item/item';
import { throttle } from '@nativescript/core/utils';
import { isAndroid } from "@nativescript/core/platform";
import { CollectionView } from '@nstudio/ui-collectionview';
import { TableSortType } from './enums/table-sort-type';
import { EventData, ObservableArray, ScrollEventData, ScrollView } from '@nativescript/core';

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

  tableMainBodyScrollView: ScrollView;
  @ViewChild('tableMainBody') set tableMainBodyContent( tableMainBody: ElementRef) {
    if(tableMainBody) {
      this.tableMainBodyScrollView = <ScrollView>tableMainBody.nativeElement;
    }
  };
  tableMainHeadingsScrollView: ScrollView;
  @ViewChild('tableMainHeadings') set mainHeadingsContent( tableMainHeadings: ElementRef) {
    if(tableMainHeadings) {
      this.tableMainHeadingsScrollView = <ScrollView>tableMainHeadings.nativeElement;
    }
  };


  constructor(private itemService: ItemService) {
    if(isAndroid) {
      this.isAndroid = true;
    }
  }

  itemsOnScreen: ObservableArray<ItemVM> = new ObservableArray();
  rowsDisplayed: number = 20;
  scrollOffsetX: number = 0;

  readonly id: string = stringConstants.id;
  readonly name: string = stringConstants.name;
  readonly position: string = stringConstants.position;
  readonly height: string = stringConstants.height;
  readonly nationality: string = stringConstants.nationality;
  readonly appearances: string = stringConstants.appearances;
  readonly goals: string = stringConstants.goals;
  readonly assists: string = stringConstants.assists;
  readonly generatePlayers: string = stringConstants.generatePlayers;

  columnSorting: Map<string, number> = new Map<string, number>([
    ['ID', TableSortType.Ascending],
    ['Name', TableSortType.Default],
    ['Position', TableSortType.Default],
    ['Height', TableSortType.Default],
    ['Nationality', TableSortType.Default],
    ['Date of Birth', TableSortType.Default],
    ['Goals', TableSortType.Default],
    ['Assists', TableSortType.Default]
  ]);

  ngOnInit() {
    this.itemsOnScreen.splice(0, this.itemService.items.length, ...(this.itemService.items.slice(0, this.rowsDisplayed)));
  }

  setVerticalOffsetsToZero(): void {
    this.idsCollectionView.scrollToOffset(0, false);
    this.mainCollectionView.scrollToOffset(0, false);
    this.rowsDisplayed = 20;
  }

  sortTableById(): void {

    switch (this.columnSorting.get('ID')) {
      case TableSortType.Default:
      case TableSortType.Descending:
        this.columnSorting.set('ID', TableSortType.Ascending);
        this.itemService.items.sort((a, b) => a.id - b.id);
        break;
      case TableSortType.Ascending:
        this.columnSorting.set('ID', TableSortType.Descending);
        this.itemService.items.sort((a, b) => b.id - a.id);
        break;
    }

    this.columnSorting.set('Name', TableSortType.Default);
    this.columnSorting.set('Position', TableSortType.Default);
    this.columnSorting.set('Nationality', TableSortType.Default);
    this.columnSorting.set('Height', TableSortType.Default);
    this.columnSorting.set('Date of Birth', TableSortType.Default);
    this.columnSorting.set('Goals', TableSortType.Default);
    this.columnSorting.set('Assists', TableSortType.Default);

    this.setVerticalOffsetsToZero();
    this.itemsOnScreen.splice(0, this.itemService.items.length, ...(this.itemService.items.slice(0, this.rowsDisplayed)
        .map(animal => (animal && animal.id !== undefined ? animal : { ...animal, SelectionType: undefined }))));
  }

  loadMoreRows() {
    if (this.rowsDisplayed <= this.itemService.items.length) {
      this.rowsDisplayed = this.rowsDisplayed + 30;
      this.rowsDisplayed = Math.min(this.rowsDisplayed, this.itemService.items.length);
      this.itemsOnScreen.splice(0, this.itemsOnScreen.length, ...this.itemService.items.slice(0, this.rowsDisplayed));
    }
  }

  addPlayers(amount: number = 10) {
    for(let i = 0; i < amount; i++) {
      const newPlayer = this.itemService.generateRandomPlayer();
      this.itemService.items.push(newPlayer);
    }
    this.itemsOnScreen = new ObservableArray(this.itemService.items);
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

  onScrollHorizontallyHeadings(args: ScrollEventData): void {
    this.scrollOffsetX = args.scrollX;
    this.tableMainBodyScrollView.scrollToHorizontalOffset(this.scrollOffsetX, false);
  }

  onScrollHorizontallyMain(args: ScrollEventData): void {
    this.scrollOffsetX = args.scrollX;
    this.tableMainHeadingsScrollView.scrollToHorizontalOffset(this.scrollOffsetX, false);
  }
}