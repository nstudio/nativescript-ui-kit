import { Observable, EventData, Frame, ApplicationSettings, Utils, GridLayout } from '@nativescript/core';

export interface ICoachMarkOptions {
  enableContinueLabel?: boolean; // true
  enableSkipButton?: boolean; // true
  continueLabelText?: string; // 'Tap to continue'
  skipButtonText?: string; // 'Skip'
  animationDuration?: number; // .3
  continueLocation?: number; // Bottom
  lblSpacing?: number; // 35
  cutoutRadius?: number; // 2
  maskColor?: any; // 0,0,0 alpha 0.9
  maxLblWidth?: number; // 230
  persist?: boolean; // false
}

export interface ICoachMarkShape {
  DEFAULT: number;
  CIRCLE: number;
  SQUARE: number;
}

export interface ICoachMarkLabelPosition {
  BOTTOM: number;
  LEFT: number;
  TOP: number;
  RIGHT: number;
  RIGHT_BOTTOM: number;
}

export interface ICoachMarkLabelAlignment {
  CENTER: number;
  LEFT: number;
  RIGHT: number;
}

export interface ICoachMark {
  position: any;
  caption: string;
  shape?: number;
  labelPosition?: number;
  labelAlignment?: number;
  showArrow?: boolean;
  closeOnCutOutTap?: boolean;
}

export interface ICONTINUE_LOCATION {
  TOP: number;
  CENTER: number;
  BOTTOM: number;
}

export class CoachMark {
  position: any;
  caption: string;
  shape: number;
  labelPosition: number;
  labelAlignment: number;
  showArrow: boolean;
  closeOnCutOutTap?: boolean;

  static SHAPES: ICoachMarkShape = {
    DEFAULT: MaskShape.DEFAULT,
    CIRCLE: MaskShape.SHAPE_CIRCLE,
    SQUARE: MaskShape.SHAPE_SQUARE,
  };

  static LABEL_POSITIONS: ICoachMarkLabelPosition = {
    BOTTOM: LabelPosition.ABEL_POSITION_BOTTOM,
    LEFT: LabelPosition.ABEL_POSITION_LEFT,
    TOP: LabelPosition.ABEL_POSITION_TOP,
    RIGHT: LabelPosition.ABEL_POSITION_RIGHT,
    RIGHT_BOTTOM: LabelPosition.ABEL_POSITION_RIGHT_BOTTOM,
  };

  static LABEL_ALIGNMENTS: ICoachMarkLabelAlignment = {
    CENTER: LabelAligment.ABEL_ALIGNMENT_CENTER,
    LEFT: LabelAligment.ABEL_ALIGNMENT_LEFT,
    RIGHT: LabelAligment.ABEL_ALIGNMENT_RIGHT,
  };

  constructor(model?: ICoachMark) {
    if (model) {
      for (let key in model) {
        this[key] = model[key];
      }
    }
  }
}

export class CoachMarks {
  static APP_SETTINGS_KEY: string = 'CoachMarks';
  static DEBUG: boolean = false;

  static CONTINUE_LOCATIONS: ICONTINUE_LOCATION = {
    TOP: ContinueLocation.LOCATION_TOP,
    CENTER: ContinueLocation.LOCATION_CENTER,
    BOTTOM: ContinueLocation.LOCATION_BOTTOM,
  };

  events: Observable;
  willNavigateEvent: any;
  navigateEvent: any;
  clickEvent: any;
  skipEvent: any;
  cleanupEvent: any;
  willCleanupEvent: any;
  static delegate: CoachMarksDelegateImpl;

  static start(marks: Array<CoachMark>, options?: ICoachMarkOptions, instance?: CoachMarks) {
    if (CoachMarks.DEBUG) console.log('CoachMarks start...');

    // Setup coach marks
    let coachMarks = [];

    for (let mark of marks) {
      if (CoachMarks.DEBUG) console.log(`Setting up mark --`);

      let markObj: any = {
        rect: NSValue.valueWithCGRect(mark.position),
        caption: mark.caption,
      };
      if (mark.shape) markObj.shape = NSNumber.numberWithInt(mark.shape);
      if (mark.labelPosition) markObj.position = NSNumber.numberWithInt(mark.labelPosition);
      if (mark.labelAlignment) markObj.alignment = NSNumber.numberWithInt(mark.labelAlignment);
      if (mark.showArrow) markObj.showArrow = NSNumber.numberWithBool(mark.showArrow);
      if (mark.closeOnCutOutTap) markObj.closeOnCutOutTap = NSNumber.numberWithBool(mark.closeOnCutOutTap);

      let markDictionary = NSDictionary.dictionaryWithDictionary(markObj);
      if (CoachMarks.DEBUG) console.log(`Adding mark with caption: ${markObj.caption}`);
      coachMarks.push(markDictionary);
    }

    if (CoachMarks.DEBUG) {
      console.log(`Total marks: ${coachMarks.length}`);
    }

    const rootVc = <UIViewController>Utils.ios.getRootViewController();

    const mpCoachMarks = MPCoachMarks.alloc().initWithFrameCoachMarks(rootVc.view.frame, coachMarks);
    rootVc.view.addSubview(mpCoachMarks);

    // options
    if (options) {
      if (typeof options.enableContinueLabel !== 'undefined') mpCoachMarks.enableContinueLabel = options.enableContinueLabel;

      if (typeof options.enableSkipButton !== 'undefined') mpCoachMarks.enableSkipButton = options.enableSkipButton;

      if (typeof options.continueLabelText !== 'undefined') mpCoachMarks.continueLabelText = options.continueLabelText;

      if (typeof options.skipButtonText !== 'undefined') mpCoachMarks.skipButtonText = options.skipButtonText;

      if (typeof options.animationDuration !== 'undefined') mpCoachMarks.animationDuration = options.animationDuration;

      if (typeof options.continueLocation !== 'undefined') mpCoachMarks.continueLocation = options.continueLocation;

      if (typeof options.lblSpacing !== 'undefined') mpCoachMarks.lblSpacing = options.lblSpacing;

      if (typeof options.cutoutRadius !== 'undefined') mpCoachMarks.cutoutRadius = options.cutoutRadius;

      if (typeof options.maskColor !== 'undefined') mpCoachMarks.maskColor = options.maskColor;

      if (typeof options.maxLblWidth !== 'undefined') mpCoachMarks.maxLblWidth = options.maxLblWidth;

      if (options.persist) CoachMarks.PERSIST();
    }

    if (instance) {
      CoachMarks.delegate = CoachMarksDelegateImpl.initWithOwner(new WeakRef(instance));
      mpCoachMarks.delegate = CoachMarks.delegate;
    }

    mpCoachMarks.start();
  }

  static HAS_SHOWN(): boolean {
    return ApplicationSettings.getBoolean(CoachMarks.APP_SETTINGS_KEY, false);
  }

  static PERSIST() {
    if (!CoachMarks.HAS_SHOWN()) {
      // Don't show again
      ApplicationSettings.setBoolean(CoachMarks.APP_SETTINGS_KEY, true);
    }
  }

  static RESET() {
    ApplicationSettings.setBoolean(CoachMarks.APP_SETTINGS_KEY, false);
  }

  initEvents() {
    this.events = new Observable();
    this.willNavigateEvent = {
      eventName: 'willNavigate',
      object: this,
      data: {},
    };
    this.navigateEvent = {
      eventName: 'navigate',
      object: this,
      data: {},
    };
    this.clickEvent = {
      eventName: 'click',
      object: this,
      data: {},
    };
    this.skipEvent = {
      eventName: 'skip',
      object: this,
      data: {},
    };
    this.cleanupEvent = {
      eventName: 'cleanup',
      object: this,
      data: {},
    };
    this.willCleanupEvent = {
      eventName: 'willCleanup',
      object: this,
      data: {},
    };
  }
}

@NativeClass()
class CoachMarksDelegateImpl extends NSObject implements MPCoachMarksViewDelegate {
  static ObjCProtocols = [MPCoachMarksViewDelegate];
  owner: WeakRef<CoachMarks>;

  static initWithOwner(owner: WeakRef<CoachMarks>) {
    const delegate = <CoachMarksDelegateImpl>CoachMarksDelegateImpl.new();
    delegate.owner = owner;
    return delegate;
  }

  coachMarksViewDidCleanup?(coachMarksView: MPCoachMarks): void {
    if (CoachMarks.DEBUG) {
      console.log('coachMarks did cleanup, clear your instances if you have any');
    }
    const owner = this.owner.deref();
    if (owner?.events) {
      owner.events.notify(owner.cleanupEvent);
    }
    CoachMarks.delegate = null;
  }

  coachMarksViewDidClickedAtIndex?(coachMarksView: MPCoachMarks, index: number): void {
    if (CoachMarks.DEBUG) {
      console.log(`coachmarks did click item at step index: ${index}`);
    }
    const owner = this.owner.deref();
    if (owner?.events) {
      owner.clickEvent.data = {
        instance: coachMarksView,
        index,
      };
      owner.events.notify(owner.cleanupEvent);
    }
  }

  coachMarksViewDidNavigateToIndex?(coachMarksView: MPCoachMarks, index: number): void {
    if (CoachMarks.DEBUG) {
      console.log(`navigated to index: ${index}`);
    }
    const owner = this.owner.deref();
    if (owner?.events) {
      owner.navigateEvent.data = {
        instance: coachMarksView,
        index,
      };
      owner.events.notify(owner.navigateEvent);
    }
  }

  coachMarksViewSkipButtonClicked?(coachMarksView: MPCoachMarks): void {
    if (CoachMarks.DEBUG) {
      console.log('coachMarks skip button clicked.');
    }
    const owner = this.owner.deref();
    if (owner?.events) {
      owner.events.notify(owner.skipEvent);
    }
  }

  coachMarksViewWillCleanup?(coachMarksView: MPCoachMarks): void {
    if (CoachMarks.DEBUG) {
      console.log('coachMarks is about to cleanup, prepare any final adjustments if needed.');
    }
    const owner = this.owner.deref();
    if (owner?.events) {
      owner.events.notify(owner.willCleanupEvent);
    }
  }

  coachMarksViewWillNavigateToIndex?(coachMarksView: MPCoachMarks, index: number): void {
    if (CoachMarks.DEBUG) {
      console.log(`will navigate to index: ${index}`);
    }
    const owner = this.owner.deref();
    if (owner?.events) {
      owner.willNavigateEvent.data = {
        instance: coachMarksView,
        index,
      };
      owner.events.notify(owner.willNavigateEvent);
    }
  }
}
