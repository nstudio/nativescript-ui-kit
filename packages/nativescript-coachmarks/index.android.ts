import { Observable, EventData, Frame, ApplicationSettings, Application, Screen, Color, GridLayout, Utils, Button, GridUnitType, ItemSpec, StackLayout, View, Label, ImageSource, Image } from '@nativescript/core';
// declare const com;
export interface ICoachMarkOptions {
  enableContinueLabel?: boolean; // true
  enableSkipButton?: boolean; // true
  continueLabelText?: string; // 'Tap to continue'
  skipButtonText?: string; // 'Skip'
  animationDuration?: number; // .3
  continueLocation?: number; // Bottom
  lblSpacing?: number; // 35
  lblTextColor?: Color | string;
  cutoutRadius?: number; // 2
  maskColor?: any; // 0,0,0 alpha 0.9
  maxLblWidth?: number; // 230
  persist?: boolean; // false
  continueLabelTextColor?: Color | string;
  continueLabelBackgroundColor?: Color | string;
  continueLabelOffset?: { x?: number; y?: number };
  continueLabelSize?: { width?: number; height?: number };
  skipButtonTextColor?: Color | string;
  skipButtonBackgroundColor?: Color | string;
  skipButtonOffset?: { x?: number; y?: number };
}

export interface ICoachMarkShape {
  DEFAULT?: number;
  CIRCLE?: number;
  SQUARE?: number;
}

export interface ICoachMarkLabelPosition {
  BOTTOM?: number;
  LEFT?: number;
  TOP?: number;
  RIGHT?: number;
  RIGHT_BOTTOM?: number;
}

export interface ICoachMarkLabelAlignment {
  CENTER?: number;
  LEFT?: number;
  RIGHT?: number;
}

export interface ICoachMark {
  position?: any;
  caption?: string;
  shape?: number;
  labelPosition?: number;
  labelAlignment?: number;
  showArrow?: boolean;
  view?: any;
}

export interface ICONTINUE_LOCATION {
  TOP?: number;
  CENTER?: number;
  BOTTOM?: number;
}

const arrows = {};

export class CoachMark {
  public position: { x: number; y: number; width: number; height: number };
  public caption: string;
  public shape: number;
  public labelPosition: number;
  public labelAlignment: number;
  public showArrow: boolean;
  public view: any;
  closeOnCutOutTap?: boolean;

  static SHAPES: ICoachMarkShape = {
    DEFAULT: 0,
    CIRCLE: 1,
    SQUARE: 2,
  };

  static LABEL_POSITIONS: ICoachMarkLabelPosition = {
    BOTTOM: 0,
    LEFT: 1,
    TOP: 2,
    RIGHT: 3,
    RIGHT_BOTTOM: 4,
  };

  static LABEL_ALIGNMENTS: ICoachMarkLabelAlignment = {
    CENTER: 0,
    LEFT: 1,
    RIGHT: 2,
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
  public static DEBUG: boolean = false;

  public events: Observable;
  private _navigateEvent: any;
  private _clickEvent: any;
  private _cleanupEvent: any;
  private _showCase: com.takusemba.spotlight.Spotlight;
  private nextView = 0;
  private marks: any[];
  private _willNavigateEvent: any;
  private _willCleanupEvent: any;

  static CONTINUE_LOCATIONS: ICONTINUE_LOCATION = {
    TOP: 0,
    CENTER: 1,
    BOTTOM: 2,
  };
  private _targets: java.util.ArrayList<unknown>;

  setStyle(style: any) {
    if (this._showCase) {
      // this._showCase.setStyle(style);
    }
  }
  setTitle(title: string) {
    if (this._showCase) {
      //  this._showCase.setContentTitle(title);
    }
  }
  setCaption(caption) {
    if (this._showCase) {
      //  this._showCase.setContentText(caption);
    }
  }
  setButton(buttonText) {
    if (this._showCase) {
      // this._showCase.setButtonText(buttonText);
    }
  }

  static start(marks: Array<CoachMark>, options?: ICoachMarkOptions, instance?: CoachMarks) {
    const coachmarks = new CoachMarks();
    coachmarks.startMarks(marks, options, instance);
  }

  public startMarks(marks: Array<CoachMark>, options?: ICoachMarkOptions, instance?: CoachMarks) {
    this.marks = marks;

    if (CoachMarks.DEBUG) console.log('CoachMarks start...');

    if (CoachMarks.DEBUG) {
      console.log(`Total marks: ${marks.length}`);
    }
    const targets = new java.util.ArrayList(marks.length);

    const activity = Utils.android.getCurrentActivity();
    const that = new WeakRef(this);
    for (let i = 0; i < marks.length; i++) {
      let build: com.takusemba.spotlight.Target;
      const mark = marks[i];
      if (CoachMarks.DEBUG) console.log(`Setting up mark --`);
      let target = new com.takusemba.spotlight.Target.Builder();

      if (mark?.position && 'x' in mark.position && 'y' in mark.position) {
        target.setAnchor(mark.position.x, mark.position.y);
      }

      if (mark?.view) {
        mark.view instanceof android.view.View ? target.setAnchor(mark.view) : target.setAnchor(mark.view.nativeView);
      }

      let width = 100;
      let height = 100;
      if (mark?.position && 'width' in mark.position && 'height' in mark.position) {
        width = mark.position.width;
        height = mark.position.height;
      } else if (mark?.view) {
        width = mark.view.getMeasuredWidth();
        height = mark.view.getMeasuredHeight();
      }

      let shape: com.takusemba.spotlight.shape.Shape;

      switch (mark.shape) {
        case 1:
          shape = new com.takusemba.spotlight.shape.Circle(height / 2);
          break;
        case 2:
          shape = new com.takusemba.spotlight.shape.RoundedRectangle(height, width, 0);
          break;
        default:
          shape = new com.takusemba.spotlight.shape.RoundedRectangle(height, width, 5 * Screen.mainScreen.scale);
          break;
      }

      target = target.setShape(shape);

      //target.setEffect(new com.takusemba.spotlight.effet.RippleEffect(100, 200, color.argb));

      const overlay = new GridLayout();

      const lblCaption = new Label();
      lblCaption.verticalAlignment = 'top';
      lblCaption.horizontalAlignment = 'left';
      lblCaption.text = mark.caption;
      lblCaption.textAlignment = 'center';
      lblCaption.color = (options.lblTextColor ?? new Color('white')) as never;

      overlay.addChild(lblCaption);

      overlay.on(View.layoutChangedEvent, (args: EventData) => {
        let x = 0;
        let y = 0;
        const scale = Screen.mainScreen.scale;
        const anchor = build.getAnchor();
        // anchor.x - (width / 2) gives us the correct x position
        // anchor.y - (height / 2) gives us the correct y position
        const position = {
          x: anchor.x - width / 2,
          y: anchor.y - height / 2,
        };
        const labelWidth = lblCaption.getMeasuredWidth();
        const labelHeight = lblCaption.getMeasuredHeight();
        const lblSpacing = (options.lblSpacing ?? 35) * scale;
        const labelMargin = 5 * scale;

        const bounds = {
          width: overlay.getMeasuredWidth(),
          height: overlay.getMeasuredHeight(),
        };

        switch (mark.labelAlignment) {
          case 1:
            x = Math.floor(bounds.width - labelWidth - labelMargin);
            break;
          case 2:
            x = labelMargin;
            break;
          default:
            x = Math.floor((bounds.width - labelWidth) / 2.0);
            break;
        }
        if (mark.labelPosition === CoachMark.LABEL_POSITIONS.TOP) {
          y = position.y - labelHeight - labelMargin;
          if (mark.showArrow) {
            if (!('arrow-down' in arrows)) {
              arrows['arrow-down'] = ImageSource.fromResourceSync('arrow_down');
            }
            const arrowImage = arrows['arrow-down'];

            const imageView = new Image();
            imageView.verticalAlignment = 'top';
            imageView.horizontalAlignment = 'left';
            imageView.stretch = 'none';
            imageView.width = arrowImage.width;
            imageView.height = arrowImage.height;
            imageView.imageSource = arrowImage;

            const translateX = x / scale;
            const translateY = y / scale;

            y -= arrowImage.height + labelMargin;

            imageView.translateX = translateX;
            imageView.translateY = translateY;

            overlay.addChild(imageView);
          }

          lblCaption.translateX = x / scale;
          lblCaption.translateY = y / scale;
        } else if (mark.labelPosition === CoachMark.LABEL_POSITIONS.RIGHT_BOTTOM) {
          y = position.y + height + lblSpacing;
          const bottomY = y + labelHeight + lblSpacing;
          if (bottomY > bounds.height) {
            y = position.y - lblSpacing - labelHeight;
          }
          x = position.x + width + labelMargin;
          if (mark.showArrow) {
            if (!('arrow-top' in arrows)) {
              arrows['arrow-top'] = ImageSource.fromResourceSync('arrow_top');
            }

            const arrowImage = arrows['arrow-top'];
            const imageView = new Image();
            imageView.verticalAlignment = 'top';
            imageView.horizontalAlignment = 'left';
            imageView.stretch = 'none';
            imageView.width = arrowImage.width;
            imageView.height = arrowImage.height;
            imageView.imageSource = arrowImage;
            imageView.translateX = width / 2 / scale; //(width / 2 - (arrowImage.width * scale) / 2) / scale;
            imageView.translateY = (y - labelMargin) / scale;

            y += (arrowImage.height * scale) / 2;

            overlay.addChild(imageView);
          }

          lblCaption.translateX = x / scale;
          lblCaption.translateY = y / scale;
        } else if (mark.labelPosition === CoachMark.LABEL_POSITIONS.RIGHT) {
          y = position.y + height / 2 - labelHeight / 2;
          x = position.x + width + labelMargin;

          lblCaption.translateX = x / scale;
          lblCaption.translateY = y / scale;
        } else if (mark.labelPosition === CoachMark.LABEL_POSITIONS.LEFT) {
          y = position.y + height / 2 - labelHeight / 2;
          x = bounds.width - labelWidth - labelMargin - width;
          if (mark.showArrow) {
            if (!('arrow-right' in arrows)) {
              arrows['arrow-right'] = ImageSource.fromResourceSync('arrow_right');
            }

            const arrowImage = arrows['arrow-right'];
            const imageView = new Image();
            imageView.verticalAlignment = 'top';
            imageView.horizontalAlignment = 'left';
            imageView.stretch = 'none';
            imageView.width = arrowImage.width;
            imageView.height = arrowImage.height;
            imageView.imageSource = arrowImage;

            const newX = bounds.width - arrowImage.width * scale - labelMargin - width;
            const newY = y + labelHeight / 2 - (arrowImage.height * scale) / 2;

            imageView.translateX = newX / scale;
            imageView.translateY = newY / scale;

            x -= arrowImage.width * scale + labelMargin;

            overlay.addChild(imageView);
          }

          lblCaption.translateX = x / scale;
          lblCaption.translateY = y / scale;
        } else {
          y = position.y + height + lblSpacing;

          const bottomY = y + labelHeight + lblSpacing;
          if (bottomY > bounds.height) {
            y = position.y - lblSpacing - labelHeight;
          }

          if (mark.showArrow) {
            if (!('arrow-top' in arrows)) {
              arrows['arrow-top'] = ImageSource.fromResourceSync('arrow_top');
            }
            const arrowImage = arrows['arrow-top'];
            const imageView = new Image();
            imageView.verticalAlignment = 'top';
            imageView.horizontalAlignment = 'left';
            imageView.stretch = 'none';
            imageView.width = arrowImage.width;
            imageView.height = arrowImage.height;
            imageView.imageSource = arrowImage;

            imageView.translateX = x / scale;
            imageView.translateY = y / scale;
            y += (arrowImage.height * scale) / 2;

            overlay.addChild(imageView);
          }

          lblCaption.translateX = x / scale;
          lblCaption.translateY = y / scale;
        }
      });

      overlay.on('tap', () => {
        const owner = that.deref();
        if (owner) {
          if (owner.events) {
            owner._clickEvent = {
              eventName: 'click',
              object: owner,
              data: {},
            };
            owner.events.notify(owner._clickEvent);
          }
          owner._showCase?.next?.();
        }
      });

      if (options.enableSkipButton ?? true) {
        const skipButton = new Label();
        skipButton.fontSize = 13;
        skipButton.height = 30;

        if (!options.continueLabelSize && typeof options?.continueLabelSize?.width === 'undefined') {
          skipButton.width = { value: 0.3, unit: '%' };
        }

        skipButton.text = options.skipButtonText ?? 'Skip';

        if ('skipButtonTextColor' in options) {
          if (options.skipButtonTextColor instanceof Color || typeof options.skipButtonTextColor === 'string') {
            skipButton.color = options.skipButtonTextColor as never;
          }
        } else {
          skipButton.color = new Color('white');
        }

        if ('skipButtonBackgroundColor' in options) {
          if (options.skipButtonBackgroundColor instanceof Color || typeof options.skipButtonBackgroundColor === 'string') {
            skipButton.backgroundColor = options.skipButtonBackgroundColor;
          }
        }

        if (options.skipButtonOffset && 'x' in options.skipButtonOffset) {
          skipButton.translateX = options.skipButtonOffset.x;
        }

        if (options.skipButtonOffset && 'y' in options.skipButtonOffset) {
          skipButton.translateY = options.skipButtonOffset.y;
        }

        skipButton.horizontalAlignment = 'right';
        skipButton.verticalAlignment = 'bottom';
        skipButton.textAlignment = 'center';
        skipButton.on('tap', () => {
          if (CoachMarks.DEBUG) {
            console.log('coachMarks is about to cleanup, prepare any final adjustments if needed.');
          }
          const owner = that.deref();
          if (owner) {
            if (owner?.events) {
              owner.events.notify(owner._willCleanupEvent);
            }
            owner._showCase?.finish?.();
          }
        });
        overlay.addChild(skipButton);
      }

      // continue label
      if (i === 0 && (options.enableContinueLabel ?? true)) {
        const continueLabel = new Label();
        continueLabel.fontSize = 13;
        continueLabel.height = 30;
        if (options.enableSkipButton ?? true) {
          continueLabel.width = { value: 0.7, unit: '%' };
        } else {
          continueLabel.width = { value: 1, unit: '%' };
        }
        if ('continueLabelSize' in options) {
          if ('width' in options.continueLabelSize) {
            continueLabel.width = options.continueLabelSize.width;
          }
          if ('height' in options.continueLabelSize) {
            continueLabel.height = options.continueLabelSize.height;
          }
        }

        continueLabel.text = options.continueLabelText ?? 'Tap to continue';

        if ('continueLabelTextColor' in options) {
          if (options.continueLabelTextColor instanceof Color || typeof options.continueLabelTextColor === 'string') {
            continueLabel.color = options.continueLabelTextColor as never;
          }
        }

        if ('continueLabelBackgroundColor' in options) {
          if (options.continueLabelBackgroundColor instanceof Color || typeof options.continueLabelBackgroundColor === 'string') {
            continueLabel.backgroundColor = options.continueLabelBackgroundColor;
          }
        }
        continueLabel.horizontalAlignment = 'left';
        continueLabel.verticalAlignment = 'bottom';
        continueLabel.textAlignment = 'center';
        switch (options.continueLocation) {
          case 0:
            continueLabel.verticalAlignment = 'top';
            break;
          case 1:
            continueLabel.verticalAlignment = 'middle';
            break;
        }

        if (options.continueLabelOffset && 'x' in options.continueLabelOffset) {
          continueLabel.translateX = options.continueLabelOffset.x;
        }

        if (options.continueLabelOffset && 'y' in options.continueLabelOffset) {
          continueLabel.translateY = options.continueLabelOffset.y;
        }

        continueLabel.on('tap', () => {
          this._showCase?.next?.();
        });

        overlay.addChild(continueLabel);
      }

      overlay._setupAsRootView(activity);
      overlay._setupUI(activity);
      overlay.callLoaded();

      target.setOnTargetListener(
        new com.takusemba.spotlight.OnTargetListener({
          onStarted() {},
          onEnded() {
            if (i === marks.length - 1) {
              if (CoachMarks.DEBUG) {
                console.log('coachMarks is about to cleanup, prepare any final adjustments if needed.');
              }
              const owner = that.deref();
              if (owner?.events) {
                owner.events.notify(owner._willCleanupEvent);
              }
            }
          },
        })
      );

      build = target.setOverlay(overlay.nativeView).build();

      targets.add(build);
    }

    this._targets = targets;

    const background = options.maskColor instanceof Color ? options.maskColor : new Color('rgba(0, 0, 0, 0.5)');
    this._showCase = new com.takusemba.spotlight.Spotlight.Builder(activity)
      .setBackgroundColor(background.argb)
      .setDuration(300)
      .setTargets(targets)
      .setOnSpotlightListener(
        new com.takusemba.spotlight.OnSpotlightListener({
          onStarted() {},
          onWillNavigate(index) {
            if (CoachMarks.DEBUG) {
              console.log(`will navigate to index: ${index}`);
            }
            const owner = that.get();
            if (owner?.events) {
              owner._willNavigateEvent.data = {
                instance: owner,
                index,
              };
              owner.events.notify(owner._willNavigateEvent);
            }
          },
          onDidNavigate(index) {
            if (CoachMarks.DEBUG) {
              console.log(`navigated to index: ${index}`);
            }
            const owner = that.get();
            if (owner?.events) {
              owner._navigateEvent.data = {
                instance: owner,
                index,
              };
              owner.events.notify(owner._navigateEvent);
            }
          },
          onEnded() {
            if (CoachMarks.DEBUG) {
              console.log('coachMarks did cleanup, clear your instances if you have any');
            }
            const owner = that.get();
            if (owner?.events) {
              owner._cleanupEvent = {
                eventName: 'cleanup',
                object: owner,
                data: {},
              };
              owner.events.notify(owner._cleanupEvent);
            }
          },
        })
      )
      .build();

    if (this.marks[this.nextView] && this.marks[this.nextView].caption) {
      //  this.setCaption(this.marks[this.nextView].caption);
    }

    if (options.skipButtonText) {
      //  this.setButton(options.skipButtonText);
    }
    /*
    this._showCase.setOnShowcaseEventListener(
      new com.github.amlcurran.showcaseview.OnShowcaseEventListener({
        owner: that.get(),
        onShowcaseViewHide: function (showcaseView) {},
        onShowcaseViewDidHide: function (showcaseView) {
          if (this.owner.events) {
            this.owner._cleanupEvent = {
              eventName: 'cleanup',
              object: this.owner,
              data: {},
            };
            this.owner.events.notify(this.owner._cleanupEvent);
          }
        },
        onShowcaseViewShow: function (showcaseView) {
          if (this.owner.marks[this.owner.nextView] && this.owner.marks[this.owner.nextView].caption) {
            this.owner.setCaption(this.owner.marks[this.owner.nextView].caption);
          }

          if (this.owner.events) {
            this.owner._navigateEvent.data = {
              instance: this.owner,
              index: this.owner.nextView,
            };
            this.owner.events.notify(this.owner._navigateEvent);
          }
        },
        onShowcaseViewTouchBlocked: function (motionEvent) {
          if (motionEvent.getAction() === android.view.MotionEvent.ACTION_UP) {
            this.owner.nextView++;
            if (this.owner.events) {
              this.owner._clickEvent = {
                eventName: 'click',
                object: this.owner,
                data: {},
              };
              this.owner.events.notify(this.owner._clickEvent);
            }
            if (this.owner.nextView < this.owner.marks.length) {
              this.owner._showCase.setTarget(new com.github.amlcurran.showcaseview.targets.ViewTarget(this.owner.marks[this.owner.nextView].view.android));
              this.owner._showCase.show();
            } else {
              this.owner._showCase.hide();
            }
          }
        },
      }),
    );
    */

    this._showCase.start();
  }

  public initEvents() {
    this.events = new Observable();
    this._willNavigateEvent = {
      eventName: 'willNavigate',
      object: this,
      data: {},
    };
    this._navigateEvent = {
      eventName: 'navigate',
      object: this,
      data: {},
    };
    this._clickEvent = {
      eventName: 'click',
      object: this,
      data: {},
    };
    this._cleanupEvent = {
      eventName: 'cleanup',
      object: this,
      data: {},
    };
    this._willCleanupEvent = {
      eventName: 'willCleanup',
      object: this,
      data: {},
    };
  }
}
