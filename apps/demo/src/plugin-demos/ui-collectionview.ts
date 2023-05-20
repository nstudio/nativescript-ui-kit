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
    CollectionView.registerLayoutStyle('headers', {
      createLayout: () => {

        // const itemSize = NSCollectionLayoutSize.sizeWithWidthDimensionHeightDimension(NSCollectionLayoutDimension.fractionalWidthDimension(1.0),NSCollectionLayoutDimension.fractionalHeightDimension(1.0));
        const itemSize = NSCollectionLayoutSize.sizeWithWidthDimensionHeightDimension(NSCollectionLayoutDimension.fractionalWidthDimension(1.0),NSCollectionLayoutDimension.estimatedDimension(100));
        const item = NSCollectionLayoutItem.itemWithLayoutSize(itemSize)

        const groupSize = NSCollectionLayoutSize.sizeWithWidthDimensionHeightDimension(NSCollectionLayoutDimension.fractionalWidthDimension(1.0), NSCollectionLayoutDimension.estimatedDimension(100));
        const group = NSCollectionLayoutGroup.horizontalGroupWithLayoutSizeSubitems(groupSize, [item]);

        const section = NSCollectionLayoutSection.sectionWithGroup(group);
        // section.interGroupSpacing = 5
        // section.contentInsets = NSDirectionalEdgeInsetsFromString('{0,10,0,10}')
      
        // first define header/footer size
        // estimated height will size to fit its contents
        const headerSize = NSCollectionLayoutSize.sizeWithWidthDimensionHeightDimension(NSCollectionLayoutDimension.fractionalWidthDimension(1.0), NSCollectionLayoutDimension.estimatedDimension(100));

        // create header/footer item with the defined size
        // absoluteOffset: gives you an opportunity to offset your header/footer, usually you only want to offset them on y axis if you are building a vertical collection view. Use a positive y value to move down, negative y to move up.
        const header = NSCollectionLayoutBoundarySupplementaryItem.boundarySupplementaryItemWithLayoutSizeElementKindAlignmentAbsoluteOffset(headerSize, 'Header1', NSRectAlignment.Top, CGPointMake(0, 0));
        header.pinToVisibleBounds = true
        // header.zIndex = 2

        const footerSize = NSCollectionLayoutSize.sizeWithWidthDimensionHeightDimension(NSCollectionLayoutDimension.fractionalWidthDimension(1.0), NSCollectionLayoutDimension.estimatedDimension(40));
        const footer = NSCollectionLayoutBoundarySupplementaryItem.boundarySupplementaryItemWithLayoutSizeElementKindAlignment(footerSize, "Footer1", NSRectAlignment.Bottom)
        
        section.boundarySupplementaryItems = Utils.ios.collections.jsArrayToNSArray([header, footer]);

        const layout = UICollectionViewCompositionalLayout.alloc().initWithSection(section);
        return layout;
      },
    });
  }
}
