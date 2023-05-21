import { Observable, EventData, Page, Utils } from '@nativescript/core';
import { DemoSharedUiCollectionview } from '@demo/shared';
import { CollectionView } from '@nstudio/ui-collectionview';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedUiCollectionview {
  constructor() {
    super();
    CollectionView.registerLayoutStyle('header-and-footer', {
      createLayout: () => {
        const itemSize = NSCollectionLayoutSize.sizeWithWidthDimensionHeightDimension(NSCollectionLayoutDimension.fractionalWidthDimension(1.0), NSCollectionLayoutDimension.estimatedDimension(100));
        const item = NSCollectionLayoutItem.itemWithLayoutSize(itemSize);

        const groupSize = NSCollectionLayoutSize.sizeWithWidthDimensionHeightDimension(NSCollectionLayoutDimension.fractionalWidthDimension(1.0), NSCollectionLayoutDimension.estimatedDimension(100));
        const group = NSCollectionLayoutGroup.horizontalGroupWithLayoutSizeSubitems(groupSize, [item]);

        const section = NSCollectionLayoutSection.sectionWithGroup(group);
        // section.interGroupSpacing = 5
        // section.contentInsets = NSDirectionalEdgeInsetsFromString('{0,10,0,10}')

        const { header, footer } = this._getHeaderFooter({
          headerPinned: false
        });
        section.boundarySupplementaryItems = Utils.ios.collections.jsArrayToNSArray([header, footer]);

        const layout = UICollectionViewCompositionalLayout.alloc().initWithSectionProvider((sectionIndex, layoutEnvironment) => {
          return section;
        });
        return layout;
      },
    });

    CollectionView.registerLayoutStyle('swipe', {
      createLayout: () => {
        const layout = UICollectionViewCompositionalLayout.alloc().initWithSectionProvider((sectionIndex, layoutEnvironment) => {
          const config = this._getLayoutListConfig();

          const section = NSCollectionLayoutSection.sectionWithListConfigurationLayoutEnvironment(config, layoutEnvironment);
          const { header, footer } = this._getHeaderFooter({ headerHeight: 20, headerPinned: true, headerOffset: { x: 0, y: 0 }});

          section.boundarySupplementaryItems = Utils.ios.collections.jsArrayToNSArray([header, footer]);
          return section;
        });
        return layout;
      },
    });
  }

  private _getHeaderFooter(options?: { headerHeight?: number; headerId?: string; headerOffset?: { x: number; y: number }; headerPinned?: boolean; footerHeight?: number; footerId?: string }) {
    options = {
      headerHeight: 100,
      headerId: 'Header1',
      headerOffset: { x: 0, y: 0 },
      headerPinned: false,
      footerHeight: 40,
      footerId: 'Footer1',
      ...(options || {}),
    };
    // first define header/footer size
    // estimated height will size to fit its contents
    const headerSize = NSCollectionLayoutSize.sizeWithWidthDimensionHeightDimension(NSCollectionLayoutDimension.fractionalWidthDimension(1.0), NSCollectionLayoutDimension.estimatedDimension(options.headerHeight));

    // create header/footer item with the defined size
    // absoluteOffset: gives you an opportunity to offset your header/footer, usually you only want to offset them on y axis if you are building a vertical collection view. Use a positive y value to move down, negative y to move up.
    const header = NSCollectionLayoutBoundarySupplementaryItem.boundarySupplementaryItemWithLayoutSizeElementKindAlignmentAbsoluteOffset(headerSize, options.headerId, NSRectAlignment.Top, CGPointMake(options.headerOffset.x, options.headerOffset.y));
    header.pinToVisibleBounds = options.headerPinned;
    // header.zIndex = 2

    const footerSize = NSCollectionLayoutSize.sizeWithWidthDimensionHeightDimension(NSCollectionLayoutDimension.fractionalWidthDimension(1.0), NSCollectionLayoutDimension.estimatedDimension(options.footerHeight));
    const footer = NSCollectionLayoutBoundarySupplementaryItem.boundarySupplementaryItemWithLayoutSizeElementKindAlignment(footerSize, options.footerId, NSRectAlignment.Bottom);

    return { header, footer };
  }

  private _getLayoutListConfig() {
    const config = UICollectionLayoutListConfiguration.alloc().initWithAppearance(UICollectionLayoutListAppearance.Plain);
    config.showsSeparators = true;
    config.headerMode = UICollectionLayoutListHeaderMode.Supplementary;
    config.footerMode = UICollectionLayoutListFooterMode.Supplementary;

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
    if (item.name === 'Dr. Seuss') {
      return 'custom';
    } else {
      return 'default';
    }
  }
}
