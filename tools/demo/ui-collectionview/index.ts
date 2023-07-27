import { ObservableArray, Utils } from '@nativescript/core';
import { DemoSharedBase } from '../utils';
import { CollectionView, ViewTemplateType } from '@nstudio/ui-collectionview';

export interface Item {
  id: number;
  name: string;
  role: string;
  subject?: string;
  body?: string;
  date?: Date;
}

type LayoutListConfig = { header?: boolean; footer?: boolean };
type SupplementalOptions = { header?: NSCollectionLayoutBoundarySupplementaryItem; footer?: NSCollectionLayoutBoundarySupplementaryItem };

export class DemoSharedUiCollectionview extends DemoSharedBase {
  collectionView: CollectionView;
  // isAnimationEnabled = false;
  scrollBarIndicatorVisible = false;
  headerText = 'HEADER';
  bodyCnt = 0;
  // items = [
  //   { index: 0, name: 'TURQUOISE', color: '#1abc9c' },
  //   { index: 1, name: 'EMERALD', color: '#2ecc71' },
  //   { index: 2, name: 'PETER RIVER', color: '#3498db' },
  //   { index: 3, name: 'AMETHYST', color: '#9b59b6' },
  //   { index: 4, name: 'WET ASPHALT', color: '#34495e' },
  //   { index: 5, name: 'GREEN SEA', color: '#16a085' },
  //   { index: 6, name: 'NEPHRITIS', color: '#27ae60' },
  //   { index: 7, name: 'BELIZE HOLE', color: '#2980b9' },
  //   { index: 8, name: 'WISTERIA', color: '#8e44ad' },
  //   { index: 9, name: 'MIDNIGHT BLUE', color: '#2c3e50' },

  //   { index: 10, name: 'TURQUOISE', color: '#1abc9c' },
  //   { index: 11, name: 'EMERALD', color: '#2ecc71' },
  //   { index: 12, name: 'PETER RIVER', color: '#3498db' },
  //   { index: 13, name: 'AMETHYST', color: '#9b59b6' },
  //   { index: 14, name: 'WET ASPHALT', color: '#34495e' },
  //   { index: 15, name: 'GREEN SEA', color: '#16a085' },
  //   { index: 16, name: 'NEPHRITIS', color: '#27ae60' },
  //   { index: 17, name: 'BELIZE HOLE', color: '#2980b9' },
  //   { index: 18, name: 'WISTERIA', color: '#8e44ad' },
  //   { index: 19, name: 'MIDNIGHT BLUE', color: '#2c3e50' },
  // ];

  defaultItems: Array<Item> = [
    { id: 1, name: 'Jack Black', subject: `Yes`, role: 'Goalkeeper', body: this.randomBody(), date: this.randomDate(new Date(2012, 0, 1), new Date()) },
    { id: 2, name: 'Charlie Brown', subject: `NativeScript is amazing`, role: 'Goalkeeper', body: this.randomBody(), date: this.randomDate(new Date(2012, 0, 1), new Date()) },
    { id: 3, name: 'Dr. Seuss', subject: `Natural platform`, role: 'Defender', body: this.randomBody(), date: this.randomDate(new Date(2012, 0, 1), new Date()) },
    { id: 4, name: 'Mickey Mouse', subject: `Platform celebration`, role: 'Midfielder', body: this.randomBody(), date: this.randomDate(new Date(2012, 0, 1), new Date()) },
    { id: 5, name: 'Buzz Lightyear', subject: `Come together`, role: 'Midfielder', body: this.randomBody(), date: this.randomDate(new Date(2012, 0, 1), new Date()) },
    { id: 6, name: 'Snoopy', subject: `Angular, Ionic, Qwik, React, Solid, Svelte, Vue`, role: 'Midfielder', body: this.randomBody(), date: this.randomDate(new Date(2012, 0, 1), new Date()) },
    { id: 7, name: 'Donald Duck', subject: `Liberating solutions`, role: 'Midfielder', body: this.randomBody(), date: this.randomDate(new Date(2012, 0, 1), new Date()) },
    { id: 8, name: 'Bugs Bunny', subject: `Natural platform`, role: 'Midfielder', body: this.randomBody(), date: this.randomDate(new Date(2012, 0, 1), new Date()) },
    { id: 9, name: 'Scooby Doo', subject: `Platform celebration`, role: 'Forward', body: this.randomBody(), date: this.randomDate(new Date(2012, 0, 1), new Date()) },
    { id: 10, name: 'Peter Pan', subject: `NativeScript is amazing`, role: 'Forward', body: this.randomBody(), date: this.randomDate(new Date(2012, 0, 1), new Date()) },
    { id: 11, name: 'Pluto', subject: `Come together`, role: 'Forward', body: this.randomBody(), date: this.randomDate(new Date(2012, 0, 1), new Date()) },
    { id: 12, name: 'Pluto1', subject: `Come together`, role: 'Forward', body: this.randomBody(), date: this.randomDate(new Date(2012, 0, 1), new Date()) },
    { id: 13, name: 'Pluto2', subject: `Come together`, role: 'Forward', body: this.randomBody(), date: this.randomDate(new Date(2012, 0, 1), new Date()) },
    { id: 14, name: 'Pluto3', subject: `Come together`, role: 'Forward', body: this.randomBody(), date: this.randomDate(new Date(2012, 0, 1), new Date()) },
    { id: 15, name: 'Pluto4', subject: `Come together`, role: 'Forward', body: this.randomBody(), date: this.randomDate(new Date(2012, 0, 1), new Date()) },
    { id: 16, name: 'Pluto5', subject: `Come together`, role: 'Forward', body: this.randomBody(), date: this.randomDate(new Date(2012, 0, 1), new Date()) },
    { id: 17, name: 'Pluto6', subject: `Come together`, role: 'Forward', body: this.randomBody(), date: this.randomDate(new Date(2012, 0, 1), new Date()) },
    { id: 18, name: 'Pluto7', subject: `Come together`, role: 'Forward', body: this.randomBody(), date: this.randomDate(new Date(2012, 0, 1), new Date()) },
    { id: 19, name: 'Pluto8', subject: `Come together`, role: 'Forward', body: this.randomBody(), date: this.randomDate(new Date(2012, 0, 1), new Date()) },
    { id: 20, name: 'Pluto9', subject: `Come together`, role: 'Forward', body: this.randomBody(), date: this.randomDate(new Date(2012, 0, 1), new Date()) },
    { id: 21, name: 'Pluto10', subject: `Come together`, role: 'Forward', body: this.randomBody(), date: this.randomDate(new Date(2012, 0, 1), new Date()) },
    { id: 22, name: 'Pluto11', subject: `Come together`, role: 'Forward', body: this.randomBody(), date: this.randomDate(new Date(2012, 0, 1), new Date()) },
    { id: 23, name: 'Pluto12', subject: `Come together`, role: 'Forward', body: this.randomBody(), date: this.randomDate(new Date(2012, 0, 1), new Date()) },
  ];
  items: ObservableArray<Item> = new ObservableArray([]);

  cnt = 0;
  constructor() {
    super();
    this.registerLayouts();
    this.loadItems();

    // Stress testing (requires isAnimationEnabled=false above to perform properly)
    // setInterval(() => {
    //   const changedItems = [];
    //   this.items.forEach((item, index) => {
    //     this.cnt++;
    //     changedItems.push({
    //       ...item,
    //       name: this.defaultItems[Math.floor(Math.random() * (22 - 1 + 1) + 1)].name
    //     });

    //   })
    //   this.items.splice(0, this.items.length, ...changedItems)
    // }, 100);

    // Sequenced change testing
    // setTimeout(() => {
    //   // test delayed hydration
    //   this.loadItems();

    //   // TODO: test this
    //   this.notifyPropertyChange('headerText', 'HEADER CHANGED!')

    //   setTimeout(() => {
    //     // test item updates
    //     this.updateItem();

    //     setTimeout(() => {
    //       this.removeItem();

    //       setTimeout(() => {
    //         this.removeItemAndReplace();
    //         setTimeout(() => {
    //           this.addItem();
    //         }, 1200);
    //       }, 1200);
    //     }, 1200);
    //   }, 1200);
    // }, 400);
  }

  loadItems() {
    this.items.push(...this.defaultItems);
  }

  updateItem() {
    this.items.setItem(3, { id: 8, name: 'Bugs Bunny', subject: `Natural platform`, role: 'Midfielder', body: this.randomBody(), date: this.randomDate(new Date(2012, 0, 1), new Date()) });
  }

  removeItem() {
    this.items.splice(3, 1);
  }

  removeItemAndReplace() {
    this.items.splice(3, 1, {
      id: this.items.length + 1,
      name: 'New at same time as delete',
      subject: 'Hello',
      body: 'test delete/add',
      date: new Date(),
      role: 'Testing',
    });
  }

  reload() {
    this.collectionView.refresh();
  }

  loadedCollectionView(args) {
    this.collectionView = args.object;
    console.log('this.collectionView.isAnimationEnabled:', this.collectionView.isAnimationEnabled)
  }

  addItem() {
    this.items.push({
      id: this.items.length + 1,
      name: 'Brand New',
      subject: 'Hello',
      body: 'This is body',
      date: new Date(),
      role: 'Testing',
    });
  }

  itemTap(args) {
    console.log('itemTap');
  }

  private _getAllItems() {
    let cnt = 0;
    return this.defaultItems
      .concat(this.defaultItems)
      .concat(this.defaultItems)
      .map((i) => {
        cnt++;
        return {
          ...i,
          id: cnt,
          // subject: this.randomTitles(),
          body: this.randomBody(),
          date: this.randomDate(new Date(2012, 0, 1), new Date()),
        };
      })
      .sort((a, b) => {
        // @ts-ignore
        return b.date - a.date;
      });
  }

  randomTitles() {
    const titles = [`NativeScript is amazing`, `Creative developer bliss`, `Liberating solutions`, `Natural platform`, `Platform celebration`, `Come together`, `Angular, Ionic, Qwik, React, Solid, Svelte, Vue`];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  randomBody() {
    this.bodyCnt++;
    return `${this.bodyCnt}`;
    const body = [
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
      `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`,
      `It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    ];
    return body[Math.floor(Math.random() * body.length)];
  }

  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  registerLayouts() {
    CollectionView.registerLayoutStyle('header-and-footer', {
      createLayout: (collectionView: CollectionView) => {
        const itemSize = NSCollectionLayoutSize.sizeWithWidthDimensionHeightDimension(NSCollectionLayoutDimension.fractionalWidthDimension(1.0), NSCollectionLayoutDimension.estimatedDimension(100));
        const item = NSCollectionLayoutItem.itemWithLayoutSize(itemSize);

        const groupSize = NSCollectionLayoutSize.sizeWithWidthDimensionHeightDimension(NSCollectionLayoutDimension.fractionalWidthDimension(1.0), NSCollectionLayoutDimension.estimatedDimension(100));
        const group = NSCollectionLayoutGroup.horizontalGroupWithLayoutSizeSubitems(groupSize, [item]);

        const section = NSCollectionLayoutSection.sectionWithGroup(group);
        // section.interGroupSpacing = 5
        // section.contentInsets = NSDirectionalEdgeInsetsFromString('{0,10,0,10}')

        const { header, footer } = this._getHeaderFooter({
          headerPinned: false,
          headerId: collectionView.headerKey,
          footerId: collectionView.footerKey,
        });
        const supplementaryItems = [];
        if (collectionView.headerItemTemplate) {
          supplementaryItems.push(header);
        }
        if (collectionView.footerItemTemplate) {
          supplementaryItems.push(footer);
        }
        section.boundarySupplementaryItems = Utils.ios.collections.jsArrayToNSArray(supplementaryItems);

        const layout = UICollectionViewCompositionalLayout.alloc().initWithSectionProvider((sectionIndex, layoutEnvironment) => {
          return section;
        });
        return layout;
      },
    });

    CollectionView.registerLayoutStyle('swipe', {
      createLayout: (collectionView: CollectionView) => {
        const layout = UICollectionViewCompositionalLayout.alloc().initWithSectionProvider((sectionIndex, layoutEnvironment) => {
          const { header, footer } = this._getHeaderFooter({ headerId: collectionView.headerKey, headerHeight: 40, headerPinned: true, headerOffset: { x: 0, y: 0 }, footerId: collectionView.footerKey });

          const supplementaryItems = [];
          const options: LayoutListConfig = {};
          if (collectionView.headerItemTemplate) {
            supplementaryItems.push(header);
            options.header = true;
          }
          if (collectionView.footerItemTemplate) {
            supplementaryItems.push(footer);
            options.footer = true;
          }

          const config = this._getLayoutListConfig(options);

          const section = NSCollectionLayoutSection.sectionWithListConfigurationLayoutEnvironment(config, layoutEnvironment);

          section.boundarySupplementaryItems = Utils.ios.collections.jsArrayToNSArray(supplementaryItems);
          return section;
        });
        return layout;
      },
    });
  }

  private _getHeaderFooter(options?: { headerHeight?: number; headerId?: string; headerOffset?: { x: number; y: number }; headerPinned?: boolean; footerHeight?: number; footerId?: string }): SupplementalOptions {
    options = {
      headerHeight: 100,
      headerId: ViewTemplateType.Header,
      headerOffset: { x: 0, y: 0 },
      headerPinned: false,
      footerHeight: 40,
      footerId: ViewTemplateType.Footer,
      ...(options || {}),
    };
    // console.log('options.headerId:', options.headerId);
    // console.log('options.footerId:', options.footerId);
    // first define header/footer size
    // estimated height will size to fit its contents
    const headerSize = NSCollectionLayoutSize.sizeWithWidthDimensionHeightDimension(NSCollectionLayoutDimension.fractionalWidthDimension(1.0), NSCollectionLayoutDimension.estimatedDimension(options.headerHeight));

    // create header/footer item with the defined size
    // absoluteOffset: gives you an opportunity to offset your header/footer, usually you only want to offset them on y axis if you are building a vertical collection view. Use a positive y value to move down, negative y to move up.
    const supplementals: SupplementalOptions = {};
    if (options.headerId) {
      const header = NSCollectionLayoutBoundarySupplementaryItem.boundarySupplementaryItemWithLayoutSizeElementKindAlignmentAbsoluteOffset(headerSize, options.headerId, NSRectAlignment.Top, CGPointMake(options.headerOffset.x, options.headerOffset.y));
      header.pinToVisibleBounds = options.headerPinned;
      // header.zIndex = 2
      supplementals.header = header;
    }

    if (options.footerId) {
      const footerSize = NSCollectionLayoutSize.sizeWithWidthDimensionHeightDimension(NSCollectionLayoutDimension.fractionalWidthDimension(1.0), NSCollectionLayoutDimension.estimatedDimension(options.footerHeight));
      const footer = NSCollectionLayoutBoundarySupplementaryItem.boundarySupplementaryItemWithLayoutSizeElementKindAlignment(footerSize, options.footerId, NSRectAlignment.Bottom);
      supplementals.footer = footer;
    }

    return supplementals;
  }

  private _getLayoutListConfig(options?: LayoutListConfig) {
    const config = UICollectionLayoutListConfiguration.alloc().initWithAppearance(UICollectionLayoutListAppearance.Plain);
    config.showsSeparators = true;
    if (options?.header) {
      config.headerMode = UICollectionLayoutListHeaderMode.Supplementary;
    }
    if (options?.footer) {
      config.footerMode = UICollectionLayoutListFooterMode.Supplementary;
    }

    config.trailingSwipeActionsConfigurationProvider = (p1: NSIndexPath) => {
      const moreAction = UIContextualAction.contextualActionWithStyleTitleHandler(UIContextualActionStyle.Normal, 'More', (action: UIContextualAction, sourceView: UIView, actionPerformed: (p1: boolean) => void) => {
        console.log('more actionPerformed!');
        actionPerformed(true);
      });
      moreAction.backgroundColor = UIColor.systemGray4Color;
      moreAction.image = UIImage.systemImageNamed('ellipsis.circle.fill');
      const flagAction = UIContextualAction.contextualActionWithStyleTitleHandler(UIContextualActionStyle.Normal, 'Flag', (action: UIContextualAction, sourceView: UIView, actionPerformed: (p1: boolean) => void) => {
        console.log('flag actionPerformed!');
        actionPerformed(true);
      });
      flagAction.backgroundColor = UIColor.systemOrangeColor;
      flagAction.image = UIImage.systemImageNamed('flag.fill');
      const archiveAction = UIContextualAction.contextualActionWithStyleTitleHandler(UIContextualActionStyle.Normal, 'Archive', (action: UIContextualAction, sourceView: UIView, actionPerformed: (p1: boolean) => void) => {
        console.log('archive actionPerformed!');
        actionPerformed(true);
      });
      archiveAction.backgroundColor = UIColor.systemPurpleColor;
      archiveAction.image = UIImage.systemImageNamed('archivebox.fill');

      return UISwipeActionsConfiguration.configurationWithActions([archiveAction, flagAction, moreAction]);
    };

    config.leadingSwipeActionsConfigurationProvider = (p1: NSIndexPath) => {
      const readAction = UIContextualAction.contextualActionWithStyleTitleHandler(UIContextualActionStyle.Normal, 'Read', (action: UIContextualAction, sourceView: UIView, actionPerformed: (p1: boolean) => void) => {
        console.log('read actionPerformed!');
        actionPerformed(true);
      });
      readAction.backgroundColor = UIColor.systemBlueColor;
      readAction.image = UIImage.systemImageNamed('envelope.badge.fill');

      const remindMeAction = UIContextualAction.contextualActionWithStyleTitleHandler(UIContextualActionStyle.Normal, 'Remind Me', (action: UIContextualAction, sourceView: UIView, actionPerformed: (p1: boolean) => void) => {
        console.log('remind me actionPerformed!');
        actionPerformed(true);
      });
      remindMeAction.backgroundColor = UIColor.systemPurpleColor;
      remindMeAction.image = UIImage.systemImageNamed('clock.fill');
      return UISwipeActionsConfiguration.configurationWithActions([readAction, remindMeAction]);
    };
    return config;
  }

  itemTemplateSelector = (item: any, index: number, items: any) => {
    if (item.name === 'Snoopy') {
      return 'custom';
    } else {
      return 'default';
    }
  };
}
