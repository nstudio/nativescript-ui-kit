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
        // const config = UICollectionLayoutListConfiguration.alloc().initWithAppearance(UICollectionLayoutListAppearance.Grouped);

        // 1
        // config.headerMode = UICollectionLayoutListHeaderMode.Supplementary;
        // config.footerMode = UICollectionLayoutListFooterMode.Supplementary;

        // config.boundar
        // return UICollectionViewCompositionalLayout.layoutWithListConfiguration(config);

        const config = UICollectionViewCompositionalLayoutConfiguration.alloc().init();

        // first define header/footer size, I used estimated height here so my header will size to fit its contents
        const headerSize = NSCollectionLayoutSize.sizeWithWidthDimensionHeightDimension(NSCollectionLayoutDimension.fractionalWidthDimension(1.0), NSCollectionLayoutDimension.estimatedDimension(150));

        // create header/footer item with the defined size
        // elementKind: use a unique string for `elementKind`. e.g. if you want to add 3 different kinds of headers, then you should have 3 different elementKind strings
        // alignment: use `.top` for headers, `.bottom` for footers
        // absoluteOffset: gives you an opportunity to offset your header/footer, usually you only want to offset them on y axis if you are building a vertical collection view. Use a positive y value to move down, negative y to move up.
        const header = NSCollectionLayoutBoundarySupplementaryItem.boundarySupplementaryItemWithLayoutSizeElementKindAlignment(headerSize, 'Header1', NSRectAlignment.Top);

        // create another header and a footer
        // let layoutHeader2 = NSCollectionLayoutBoundarySupplementaryItem(layoutSize: headerFooterSize, elementKind: "Header2", alignment: .top)
        // let layoutFooter = NSCollectionLayoutBoundarySupplementaryItem(layoutSize: headerFooterSize, elementKind: "Footer", alignment: .bottom, absoluteOffset: CGPoint(x: 0, y: 20))

        config.boundarySupplementaryItems = Utils.ios.collections.jsArrayToNSArray([header]);
        const layout = UICollectionViewCompositionalLayout.alloc().init();
        layout.configuration = config;
        return layout;
      },
    });
  }
}
