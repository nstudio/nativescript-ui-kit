import { Component, NgZone } from '@angular/core';
import { DemoSharedUiCollectionview } from '@demo/shared';
import { Dialogs } from '@nativescript/core';
import { CollectionView } from '@nstudio/ui-collectionview';

interface Item {
  id: number
  name: string
  role: string
  subject?: string;
  body?: string;
  date?: Date;
}

@Component({
	selector: 'demo-ui-collectionview',
	templateUrl: 'ui-collectionview.component.html',
})
export class UiCollectionviewComponent {
  collectionView: CollectionView;
  demoShared: DemoSharedUiCollectionview;
  
	constructor() {
    CollectionView.registerLayoutStyle("swipe", {
      createLayout: () => {
        const layout =
          UICollectionViewCompositionalLayout.alloc().initWithSectionProvider(
            (
              sectionIndex: number,
              layoutEnvironment: NSCollectionLayoutEnvironment
            ) => {
              let config =
                UICollectionLayoutListConfiguration.alloc().initWithAppearance(
                  UICollectionLayoutListAppearance.Plain
                );
              config.showsSeparators = true;

              config.trailingSwipeActionsConfigurationProvider = (
                p1: NSIndexPath
              ) => {
                const moreAction =
                  UIContextualAction.contextualActionWithStyleTitleHandler(
                    UIContextualActionStyle.Normal,
                    "More",
                    (
                      action: UIContextualAction,
                      sourceView: UIView,
                      actionPerformed: (p1: boolean) => void
                    ) => {
                      console.log("more actionPerformed!");
                      actionPerformed(true);
                      Dialogs.action("✨", "Cancel", [
                        "Take",
                        "NativeScript",
                        "To",
                        "The",
                        "🌝 Moon 🌝",
                      ]).then((value) => {
                        if (value !== "Cancel") {
                          Dialogs.alert({
                            title: "🚀🚀🚀",
                            message: `💨💨💨💨💨💨💨`,
                            okButtonText: "Blast Off!",
                          }).then(() => {});
                        }
                      });
                    }
                  );
                moreAction.backgroundColor = UIColor.systemGray4Color;
                moreAction.image = UIImage.systemImageNamed('ellipsis.circle.fill');
                const flagAction =
                  UIContextualAction.contextualActionWithStyleTitleHandler(
                    UIContextualActionStyle.Normal,
                    "Flag",
                    (
                      action: UIContextualAction,
                      sourceView: UIView,
                      actionPerformed: (p1: boolean) => void
                    ) => {
                      console.log("flag actionPerformed!");
                      actionPerformed(true);
                    }
                  );
                flagAction.backgroundColor = UIColor.systemOrangeColor;
                flagAction.image = UIImage.systemImageNamed('flag.fill');
                const archiveAction =
                  UIContextualAction.contextualActionWithStyleTitleHandler(
                    UIContextualActionStyle.Normal,
                    "Archive",
                    (
                      action: UIContextualAction,
                      sourceView: UIView,
                      actionPerformed: (p1: boolean) => void
                    ) => {
                      console.log("archive actionPerformed!");
                      actionPerformed(true);
                    }
                  );
                archiveAction.backgroundColor = UIColor.systemPurpleColor;
                archiveAction.image = UIImage.systemImageNamed('archivebox.fill');

                return UISwipeActionsConfiguration.configurationWithActions([
                  archiveAction,
                  flagAction,
                  moreAction,
                ]);
              };

              config.leadingSwipeActionsConfigurationProvider = (
                p1: NSIndexPath
              ) => {
                const readAction =
                  UIContextualAction.contextualActionWithStyleTitleHandler(
                    UIContextualActionStyle.Normal,
                    "Read",
                    (
                      action: UIContextualAction,
                      sourceView: UIView,
                      actionPerformed: (p1: boolean) => void
                    ) => {
                      console.log("read actionPerformed!");
                      actionPerformed(true);
                    }
                  );
                readAction.backgroundColor = UIColor.systemBlueColor;
                readAction.image = UIImage.systemImageNamed('envelope.badge.fill');

                const remindMeAction =
                  UIContextualAction.contextualActionWithStyleTitleHandler(
                    UIContextualActionStyle.Normal,
                    "Remind Me",
                    (
                      action: UIContextualAction,
                      sourceView: UIView,
                      actionPerformed: (p1: boolean) => void
                    ) => {
                      console.log("remind me actionPerformed!");
                      actionPerformed(true);
                    }
                  );
                remindMeAction.backgroundColor = UIColor.systemPurpleColor;
                remindMeAction.image = UIImage.systemImageNamed('clock.fill');
                return UISwipeActionsConfiguration.configurationWithActions([
                  readAction,
                  remindMeAction,
                ]);
              };

              const section =
                NSCollectionLayoutSection.sectionWithListConfigurationLayoutEnvironment(
                  config,
                  layoutEnvironment
                );

              // let itemSize =
              //   NSCollectionLayoutSize.sizeWithWidthDimensionHeightDimension(
              //     NSCollectionLayoutDimension.fractionalWidthDimension(1),
              //     NSCollectionLayoutDimension.estimatedDimension(100)
              //   );
              // let item = NSCollectionLayoutItem.itemWithLayoutSize(itemSize);
              // let groupSize =
              //   NSCollectionLayoutSize.sizeWithWidthDimensionHeightDimension(
              //     NSCollectionLayoutDimension.fractionalWidthDimension(1),
              //     NSCollectionLayoutDimension.estimatedDimension(100)
              //   );
              // let group =
              //   NSCollectionLayoutGroup.horizontalGroupWithLayoutSizeSubitemCount(
              //     groupSize,
              //     item,
              //     1
              //   );
              // const section = NSCollectionLayoutSection.sectionWithGroup(group);

              return section;
            }
          );

        return layout;
      },
    });
  }

  ngOnInit() {
    this.demoShared = new DemoSharedUiCollectionview();
    this.items = this.getItems();
  }

  items: Array<Item> = [
    { id: 1, name: "Ter Stegen", role: "Goalkeeper" },
    { id: 3, name: "Piqué", role: "Defender" },
    { id: 4, name: "I. Rakitic", role: "Midfielder" },
    { id: 5, name: "Sergio", role: "Midfielder" },
    { id: 6, name: "Denis Suárez", role: "Midfielder" },
    { id: 7, name: "Arda", role: "Midfielder" },
    { id: 8, name: "A. Iniesta", role: "Midfielder" },
    { id: 9, name: "Suárez", role: "Forward" },
    { id: 10, name: "Messi", role: "Forward" },
    { id: 11, name: "Neymar", role: "Forward" },
    { id: 12, name: "Rafinha", role: "Midfielder" },
    { id: 13, name: "Cillessen", role: "Goalkeeper" },
    { id: 14, name: "Mascherano", role: "Defender" },
    { id: 17, name: "Paco Alcácer", role: "Forward" },
    { id: 18, name: "Jordi Alba", role: "Defender" },
    { id: 19, name: "Digne", role: "Defender" },
    { id: 20, name: "Sergi Roberto", role: "Midfielder" },
    { id: 21, name: "André Gomes", role: "Midfielder" },
    { id: 22, name: "Aleix Vidal", role: "Midfielder" },
    { id: 23, name: "Umtiti", role: "Defender" },
    { id: 24, name: "Mathieu", role: "Defender" },
    { id: 25, name: "Masip", role: "Goalkeeper" },
  ].map((i) => {
    return {
      ...i,
      subject: this.randomTitles(),
      body: this.randomBody(),
      date: this.randomDate(new Date(2012, 0, 1), new Date()),
    };
  }).sort((a,b) => {
    // @ts-ignore
    return b.date - a.date;
  });

  getItems(): Array<Item> {
    return this.items;
  }

  getItem(id: number): Item {
    return this.items.filter((item) => item.id === id)[0];
  }

  randomTitles() {
    const titles = [
      `NativeScript is amazing`,
      `Creative developer bliss`,
      `Liberating solutions`,
      `JS ecosystem no boundaries`,
      `Platform celebration`,
      `Come together`,
      `Angular, Ionic, Qwik, React, Solid, Svelte, Vue`,
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  randomBody() {
    const body = [
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
      `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`,
      `It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    ];
    return body[Math.floor(Math.random() * body.length)];
  }

  randomDate(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  itemTap(args) {
    console.log("itemTap:", args.item);
  }

  spanSize(item, index: number) {
    return 1;
  }

  loaded(args) {
    this.collectionView = args.object;
  }

  templateSelector = (item: any) => {
    return "default";
  };
}