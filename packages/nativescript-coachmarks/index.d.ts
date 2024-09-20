import { Color, Observable } from '@nativescript/core';
export interface ICoachMarkOptions {
  enableContinueLabel?: boolean;
  enableSkipButton?: boolean;
  continueLabelText?: string;
  continueLabelTextColor?: Color | string;
  continueLabelBackgroundColor?: Color | string;
  continueLabelOffset?: { x?: number; y?: number };
  continueLabelSize?: { width?: number; height?: number };
  skipButtonText?: string;
  skipButtonTextColor?: Color | string;
  skipButtonBackgroundColor?: Color | string;
  skipButtonOffset?: { x?: number; y?: number };
  animationDuration?: number;
  continueLocation?: number;
  lblSpacing?: number;
  lblTextColor?: Color | string;
  cutoutRadius?: number;
  maskColor?: any;
  maxLblWidth?: number;
  persist?: boolean;
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
  position?: any;
  caption: string;
  shape?: number;
  labelPosition?: number;
  labelAlignment?: number;
  showArrow?: boolean;
  view?: any;
  closeOnCutOutTap?: boolean;
}
export interface ICONTINUE_LOCATION {
  TOP: number;
  CENTER: number;
  BOTTOM: number;
}
export declare class CoachMark {
  position: any;
  caption: string;
  shape: number;
  labelPosition: number;
  labelAlignment: number;
  showArrow: boolean;
  view?: any;
  closeOnCutOutTap?: boolean;
  static SHAPES: ICoachMarkShape;
  static LABEL_POSITIONS: ICoachMarkLabelPosition;
  static LABEL_ALIGNMENTS: ICoachMarkLabelAlignment;
  constructor(model?: ICoachMark);
}
export declare class CoachMarks {
  static APP_SETTINGS_KEY: string;
  static DEBUG: boolean;
  static CONTINUE_LOCATIONS: ICONTINUE_LOCATION;
  events: Observable;
  private _willNavigateEvent;
  private _navigateEvent;
  private _clickEvent;
  private _cleanupEvent;
  static start(marks: Array<CoachMark>, options?: ICoachMarkOptions, instance?: CoachMarks): void;
  static HAS_SHOWN(): boolean;
  static PERSIST(): void;
  static RESET(): void;
  initEvents(): void;
  coachMarksViewWillNavigateToIndex(coachMarks: any, index: number): void;
  coachMarksViewDidNavigateToIndex(coachMarks: any, index: number): void;
  coachMarksViewDidClickedAtIndex(coachMarks: any, index: number): void;
  coachMarksViewDidCleanup(coachMarks: any): void;
}
