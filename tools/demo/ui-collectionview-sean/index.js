import { Utils } from '@nativescript/core';
import { DemoSharedBase } from '../utils';
import { CollectionView, ViewTemplateType } from '@nstudio/ui-collectionview';
import { ObservableArray } from '@nativescript/core';

export interface ItemSean {
  id: number;
  name: string;
  role: string;
  subject?: string;
  body?: string;
  date?: Date;
}

type LayoutListConfig = { header?: boolean; footer?: boolean };
type SupplementalOptions = { header?: NSCollectionLayoutBoundarySupplementaryItem; footer?: NSCollectionLayoutBoundarySupplementaryItem };

export class DemoSharedUiCollectionviewSean extends DemoSharedBase {
  collectionView: CollectionView;
  headerText = 'HEADER';
  bodyCnt = 0;

  defaultItems: Array<ItemSean> = [
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
  items: ObservableArray<ItemSean> = new ObservableArray([]);

  constructor() {
    super();
    this.registerLayouts();

  }

  loadedCollectionViewSean(args) {
    this.collectionView = args.object;
  }

  loadItems() {
    this.items.push(...this.defaultItems);
  }

  itemTap(args) {
    console.log('itemTap');
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
