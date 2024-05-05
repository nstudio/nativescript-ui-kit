import { ScrollView, ScrollEventData, GridLayout, Label, Color, ItemSpec, GridUnitType, AbsoluteLayout, View, StackLayout, Screen, Application, OrientationChangedEventData } from '@nativescript/core';

export interface IMinimumHeights {
  portrait: number;
  landscape: number;
}

/**
 * Used for content area
 */
export class Content extends StackLayout {}

export class ParallaxUtilities {
  static setMinimumHeight(contentView: View, anchoredRow: AbsoluteLayout, minHeight: number, includesAnchored): void {
    if (includesAnchored) {
      minHeight = minHeight - anchoredRow.getMeasuredHeight() * 0.9; //0.9 is to give it a little bit extra space.
    }
    contentView.minHeight = minHeight;
  }

  static getMinimumHeights(): IMinimumHeights {
    let height1 = Screen.mainScreen.heightDIPs;
    let height2 = Screen.mainScreen.widthDIPs;
    //if the first hieght is lager than the second hiehgt it's the portrait views min hieght.
    if (height1 > height2) {
      return {
        portrait: height1,
        landscape: height2,
      };
    } else {
      return {
        portrait: height2,
        landscape: height1,
      };
    }
  }

  static addDropShadow(translateY: number, width: number): StackLayout {
    let wrapper = new StackLayout();
    wrapper.width = width;
    wrapper.height = 3;
    wrapper.translateY = translateY;
    wrapper.addChild(this.shadowView(0.4, width));
    wrapper.addChild(this.shadowView(0.2, width));
    wrapper.addChild(this.shadowView(0.05, width));
    return wrapper;
  }

  private static shadowView(opacity: number, width: number): StackLayout {
    let shadowRow = new StackLayout();
    shadowRow.backgroundColor = new Color('black');
    shadowRow.opacity = opacity;
    shadowRow.height = 1;
    return shadowRow;
  }
  static fadeViews(topHeight: number, verticalOffset: number, viewsToFade: View[], topOpacity): void {
    if (verticalOffset < topHeight) {
      topOpacity = parseFloat((1 - verticalOffset * 0.01).toString());
      if (topOpacity > 0 && topOpacity <= 1) {
        //fade each control
        for (var v = 0; v < viewsToFade.length; v++) {
          var view = viewsToFade[v];
          view.opacity = topOpacity;
        }
      }
    }
  }
  static getAnchoredTopHeight(topHeight: number, verticalOffset: number): number {
    let translateY: number;
    if (verticalOffset <= topHeight) {
      translateY = topHeight - verticalOffset * 2;
      if (translateY > topHeight) {
        translateY = topHeight;
      }
      if (__ANDROID__) {
        translateY = translateY - 5; // get rid of white line that happens on android
      }
    } else {
      translateY = 0;
    }
    if (translateY < 0) {
      translateY = 0;
    }

    return translateY;
  }
  //calcutes the top views height  using the scrollview's verticalOffset
  static getTopViewHeight(topHeight: number, verticalOffset: number): number {
    if (topHeight - verticalOffset >= 0) {
      return topHeight - verticalOffset;
    } else {
      return 0;
    }
  }

  static displayDevWarning(parent: GridLayout, message: string, ...viewsToCollapse: View[]): void {
    let warningText = new Label();
    warningText.text = message;
    warningText.color = new Color('red');
    warningText.textWrap = true;
    warningText.translateY = 50;
    parent.addChild(warningText);

    viewsToCollapse.forEach((view: View) => {
      if (view != null) {
        view.visibility = 'collapse';
      }
    });
  }

  static pluckViews(parent: GridLayout): View[] {
    let returnViews: View[] = [];

    parent.eachLayoutChild((child: View) => {
      returnViews.push(child);
    });

    parent.removeChildren();
    return returnViews;
  }

  static containsCssClass(view: View, className: string): boolean {
    const cssClasses = view.className.split(' ');
    return cssClasses.indexOf(className) > -1 ? true : false;
  }
}

export class Header extends StackLayout {}
export class Anchored extends StackLayout {
  private _dropShadow: boolean;
  get dropShadow(): boolean {
    return this._dropShadow;
  }
  set dropShadow(value: boolean) {
    this._dropShadow = value;
  }

  constructor() {
    super();
    this.dropShadow = false;
  }
}

export class ParallaxView extends GridLayout {
  private _controlsToFade: string;
  private _childLayouts: View[];
  private _includesAnchored: boolean;
  private _isAnchored: boolean;
  private _topOpacity: number;
  private _loaded: boolean;
  private _minimumHeights: IMinimumHeights;
  private _bounce: boolean;

  //Events
  static scrollEvent = 'scroll';
  static anchoredEvent = 'anchored';
  static unanchoredEvent = 'unanchored';

  get bounce(): boolean {
    return this._bounce;
  }
  set bounce(value: boolean) {
    this._bounce = value;
  }

  get controlsToFade(): string {
    return this._controlsToFade;
  }

  set controlsToFade(value: string) {
    this._controlsToFade = value;
  }

  get isAnchored() {
    return this._isAnchored;
  }

  // @ts-ignore
  get android(): any {
    return;
  }

  // @ts-ignore
  get ios(): any {
    return;
  }

  constructor() {
    super();
    this._childLayouts = [];

    let headerView: Header;
    let contentView: View;
    let scrollView: ScrollView = new ScrollView();
    let viewsToFade: View[];
    let maxTopViewHeight: number;
    let controlsToFade: string[];
    let anchoredRow: AbsoluteLayout = new AbsoluteLayout();
    let row = new ItemSpec(2, GridUnitType.STAR);
    let column = new ItemSpec(1, GridUnitType.STAR);
    let invalidSetup = false;
    let hasBeenAnchored: boolean = false;
    this._isAnchored = false;
    this.bounce = false; //disable bounce by default.
    this._minimumHeights = ParallaxUtilities.getMinimumHeights();

    //must set the vertical alignmnet or else there is issues with margin-top of 0 being the middle of the screen.
    this.verticalAlignment = 'top';
    scrollView.verticalAlignment = 'top';
    anchoredRow.verticalAlignment = 'top';
    this._includesAnchored = false;
    this._topOpacity = 1;
    this._loaded = false;

    this.on(GridLayout.loadedEvent, (data: any) => {
      //prevents re adding views on resume in android.
      if (!this._loaded) {
        this._loaded = true;
        this._childLayouts = ParallaxUtilities.pluckViews(this);

        this.addRow(row);
        this.addColumn(column);
        this.addChild(scrollView);
        this.addChild(anchoredRow);

        GridLayout.setRow(scrollView, 1);
        GridLayout.setRow(anchoredRow, 0);
        GridLayout.setColumn(scrollView, 1);
        GridLayout.setColumn(anchoredRow, 0);

        //creates a new stack layout to wrap the content inside of the plugin.
        let wrapperStackLayout = new StackLayout();
        scrollView.content = wrapperStackLayout;

        for (var c = 0; c < this._childLayouts.length; c++) {
          var element = this._childLayouts[c];

          if (element instanceof Header || (StackLayout && ParallaxUtilities.containsCssClass(element, 'header'))) {
            wrapperStackLayout.addChild(element);
            headerView = <Header>element;
          } else if (element instanceof Content || (StackLayout && ParallaxUtilities.containsCssClass(element, 'content'))) {
            wrapperStackLayout.addChild(element);
            contentView = <Content>element;
          } else if (element instanceof Anchored || (StackLayout && ParallaxUtilities.containsCssClass(element, 'anchor'))) {
            anchoredRow.addChild(element);
            if ((<Anchored>element).dropShadow || ParallaxUtilities.containsCssClass(element, 'dropShadow')) {
              anchoredRow.height = element.height;
              anchoredRow.addChild(ParallaxUtilities.addDropShadow(element.height as number, element.getMeasuredWidth()));
            } else {
              anchoredRow.height = element.height;
            }
            element.verticalAlignment = 'top';
            this._includesAnchored = true;
          }
        }

        if (headerView == null || contentView == null) {
          ParallaxUtilities.displayDevWarning(this, 'Parallax ScrollView Setup Invalid. You must have Header and Content tags', headerView, contentView, contentView);
          return;
        }
        if (isNaN(headerView.height as number)) {
          ParallaxUtilities.displayDevWarning(this, 'Header MUST have a height set.', headerView, anchoredRow, contentView);
          return;
        }
        if (this._includesAnchored && isNaN(anchoredRow.height as number)) {
          ParallaxUtilities.displayDevWarning(this, 'Anchor MUST have a height set.', anchoredRow, headerView, contentView);
          return;
        }
        maxTopViewHeight = headerView.height as number;

        if (this._includesAnchored) {
          anchoredRow.translateY = maxTopViewHeight;
          if (__ANDROID__) {
            //helps prevent background leaking int on scroll;
            anchoredRow.translateY = anchoredRow.translateY - 5; // get rid of white line that happens on android
          }
          //pushes content down a to compensate for anchor.
          contentView.translateY = anchoredRow.height as number;
        }

        //disables bounce/overscroll defaulted to false
        if (<any>this._bounce == 'false' || this._bounce === false) {
          if (__IOS__) {
            scrollView.ios.bounces = false;
          } else if (__ANDROID__) {
            scrollView.android.setOverScrollMode(2);
          }
        }

        viewsToFade = [];
        //scrollView = <ScrollView>this;
        if (this.controlsToFade == null) {
          controlsToFade = [];
        } else {
          controlsToFade = this.controlsToFade.split(',');
        }

        for (var c = 0; c < controlsToFade.length; c++) {
          let newView: View = headerView.getViewById(controlsToFade[c]) as View;
          if (newView != null) {
            viewsToFade.push(newView);
          }
        }

        let prevOffset = -10;
        //set the min height on load
        ParallaxUtilities.setMinimumHeight(contentView, anchoredRow, Screen.mainScreen.heightDIPs, this._includesAnchored);
        Application.on(Application.orientationChangedEvent, (args: OrientationChangedEventData) => {
          //sets the content view to have a min height so that scroll always allows full coverage of header, with or without anchor.
          ParallaxUtilities.setMinimumHeight(contentView, anchoredRow, this._minimumHeights[args.newValue], this._includesAnchored);
        });

        scrollView.on(ScrollView.scrollEvent, (args: ScrollEventData) => {
          this.notify({
            eventName: ParallaxView.scrollEvent,
            object: this,
            data: args,
            direction: prevOffset > args.scrollY ? 'down' : 'up',
          });

          if (this._includesAnchored) {
            anchoredRow.translateY = ParallaxUtilities.getAnchoredTopHeight(maxTopViewHeight, scrollView.verticalOffset);

            if (anchoredRow.translateY === 0) {
              if (!this._isAnchored) {
                this._isAnchored = true;
                hasBeenAnchored = true;

                this.notify({
                  eventName: ParallaxView.anchoredEvent,
                  object: this,
                  data: anchoredRow,
                });
              }
            } else if (anchoredRow.translateY > 0) {
              if (hasBeenAnchored && this._isAnchored) {
                this.notify({
                  eventName: ParallaxView.unanchoredEvent,
                  object: this,
                  data: anchoredRow,
                });
              }

              this._isAnchored = false;
            }
          }

          headerView.height = ParallaxUtilities.getTopViewHeight(maxTopViewHeight, scrollView.verticalOffset);

          if (headerView.height > 0) {
            //fades in and out label in topView, but only if there is a header
            ParallaxUtilities.fadeViews(maxTopViewHeight, scrollView.verticalOffset, viewsToFade, this._topOpacity);
          }
          //leaving in the up/down detection as it may be handy in the future.
          //if (prevOffset <= scrollView.verticalOffset) {
          //when scrolling down
          //} else {
          //scrolling up,
          //}
          prevOffset = scrollView.verticalOffset;
        });
      }
    });
  }
}
