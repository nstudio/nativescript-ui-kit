import { BehaviorSubject } from 'rxjs';

export class FontIconFactory {
  static debug: boolean = false;
  // configuration of css collections to load
  static paths: any = {};
  static filesLoaded: BehaviorSubject<any> = new BehaviorSubject(null);
  // font icon collections containing maps of classnames to unicode
  static css: any = {}; 
  static _currentName: string;

  static loadCss() {
    let cnt = 0;
    let fontIconCollections = Object.keys(FontIconFactory.paths);
    if (FontIconFactory.debug) {
      console.log(`Collections to load: ${fontIconCollections}`);
    }

    let initCollection = () => {
      FontIconFactory._currentName = fontIconCollections[cnt];
      FontIconFactory.css[FontIconFactory._currentName] = {};
    };

    let loadData = () => {
      initCollection();
      if (cnt === fontIconCollections.length) {
        FontIconFactory.filesLoaded.next(FontIconFactory.css);
      } else {
        FontIconFactory.loadCssData(FontIconFactory._currentName).then(() => {
          cnt++;
          loadData();
        });
      }
    };

    loadData();

    // Legacy flow
    // let loadFiles = () => {
    //   initCollection();
    //   if (cnt === fontIconCollections.length) {
    //     this.filesLoaded.next(this.css);
    //   } else {
    //     let fonts: any = this.config;
    //     this.loadFile(fonts[this._currentName]).then(() => {
    //       cnt++;
    //       loadFiles();
    //     });
    //   }
    // };
  }

  // Don't try to load the file data in the plugin.
  // Instead, initialize the config data with a key value pair where
  // the file data is in the value, so all we need to do is parse the
  // file data.
  static loadCssData(configKey): Promise<any> {
    if (FontIconFactory.debug) {
      console.log('----------');
      console.log("Loading collection '" + FontIconFactory._currentName + "' from config key name: " + configKey);
    }
    return new Promise<void>((resolve, reject) => {
      try {
        const cssData = FontIconFactory.paths[configKey];
        FontIconFactory.mapCss(cssData);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  static mapCss(data: any): void {
    let sets = data.split('}');
    let mappedCss = '';
    let cleanValue = (val: string) => {
      let v = val.replace(/\r\n|\n/g, '').split('content:')[1].toLowerCase().replace(/\\e/, '\\ue').replace(/\\f/, '\\uf').trim().replace(/\"/g, '').replace(/;/g, '');
      return v;
    };

    for (let set of sets) {
      let pair = set.replace(/ /g, '').split(':before{');
      let keyGroups = pair[0];
      let keys = keyGroups.split(',');
      if (pair[1]) {
        let value = cleanValue(pair[1]);
        for (let key of keys) {
          key = key.trim().slice(1).split(':before')[0];
          FontIconFactory.css[FontIconFactory._currentName][key] = String.fromCharCode(parseInt(value.substring(2), 16));
          if (FontIconFactory.debug) {
            mappedCss += `${key}: ${value}\n`;
          }
        }
      }
    }

    if (FontIconFactory.debug) {
      console.log(`mapped css:\n${mappedCss}`);
    }
  }
}

export function fonticon(value: string): string {
  if (value) {
    if (value.indexOf('-') > -1) {
      const prefix = value.split('-')[0];
      return FontIconFactory.css[prefix][value];
    } else {
      console.log("Fonticon classname did not contain a prefix. i.e., 'fa-bluetooth'");
    }
  }
  return value;
}
