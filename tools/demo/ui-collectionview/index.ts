import { ObservableArray } from '@nativescript/core';
import { DemoSharedBase } from '../utils';
import {} from '@nstudio/ui-collectionview';

export interface Item {
  id: number;
  name: string;
  role: string;
  subject?: string;
  body?: string;
  date?: Date;
}

export class DemoSharedUiCollectionview extends DemoSharedBase {
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
    { id: 1, name: 'Charlie Brown', subject: `NativeScript is amazing`, role: 'Goalkeeper' },
    { id: 3, name: 'Dr. Seuss', subject: `Natural platform`, role: 'Defender' },
    { id: 4, name: 'Mickey Mouse', subject: `Platform celebration`, role: 'Midfielder' },
    { id: 5, name: 'Buzz Lightyear', subject: `Come together`, role: 'Midfielder' },
    { id: 6, name: 'Snoopy', subject: `Angular, Ionic, Qwik, React, Solid, Svelte, Vue`, role: 'Midfielder' },
    { id: 7, name: 'Donald Duck', subject: `Liberating solutions`, role: 'Midfielder' },
    { id: 8, name: 'Bugs Bunny', subject: `Natural platform`, role: 'Midfielder' },
    { id: 9, name: 'Scooby Doo', subject: `Platform celebration`, role: 'Forward' },
    { id: 10, name: 'Peter Pan', subject: `NativeScript is amazing`, role: 'Forward' },
    { id: 11, name: 'Pluto', subject: `Come together`, role: 'Forward' },
  ];
  items: ObservableArray<Item> = new ObservableArray([]);

  constructor() {
    super();
    setTimeout(() => {
      let cnt = 0;
      this.items.push(
        ...this.defaultItems
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
          })
      );
      // test delayed hydration
      this.notifyPropertyChange('items', this.items);

      setTimeout(() => {
        // test item updates
        this.items.setItem(3, { id: 8, name: 'Bugs Bunny', subject: `Natural platform`, role: 'Midfielder', body: this.randomBody(), date: this.randomDate(new Date(2012, 0, 1), new Date()) });
      }, 500);
    }, 400);
  }

  randomTitles() {
    const titles = [`NativeScript is amazing`, `Creative developer bliss`, `Liberating solutions`, `Natural platform`, `Platform celebration`, `Come together`, `Angular, Ionic, Qwik, React, Solid, Svelte, Vue`];
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
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
}
