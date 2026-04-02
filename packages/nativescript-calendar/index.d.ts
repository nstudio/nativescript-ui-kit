import { Color, EventData, View } from '@nativescript/core';

// ── Enums ──────────────────────────────────────────────────────────────────

export enum DisplayMode {
  Month = 'month',
  Week = 'week',
  Year = 'year',
}

export enum SelectionMode {
  None = 'none',
  Single = 'single',
  Multiple = 'multiple',
  Range = 'range',
}

export enum Orientation {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

export enum ScrollPosition {
  Start = 'start',
  Center = 'center',
  End = 'end',
}

export enum DayPosition {
  MonthDate = 'monthDate',
  InDate = 'inDate',
  OutDate = 'outDate',
}

export enum OutDateStyle {
  EndOfRow = 'endOfRow',
  EndOfGrid = 'endOfGrid',
}

// ── Data Interfaces ────────────────────────────────────────────────────────

export interface CalendarDay {
  date: Date;
  day: number;
  month: number;
  year: number;
  position: DayPosition;
  isToday: boolean;
  isWeekend: boolean;
}

export interface CalendarMonth {
  month: number;
  year: number;
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface CalendarEvent {
  date: Date;
  color?: string;
  data?: any;
}

// ── Event Interfaces ───────────────────────────────────────────────────────

export interface CalendarDayEventData extends EventData {
  data: { day: CalendarDay };
}

export interface CalendarDateRangeEventData extends EventData {
  data: { day: CalendarDay; state: 'began' | 'changed' | 'ended' };
}

export interface CalendarScrollEventData extends EventData {
  data: { month: CalendarMonth; isUserDragging: boolean };
}

export interface CalendarMonthEventData extends EventData {
  data: { month: CalendarMonth };
}

export interface CalendarDayRenderEventData extends EventData {
  data: {
    day: CalendarDay;
    view: any;
    isSelected: boolean;
    isInRange: boolean;
    isDisabled: boolean;
    events: CalendarEvent[];
  };
}

// ── NCalendar ──────────────────────────────────────────────────────────────

export class NCalendar extends View {
  // Event name constants
  static daySelectEvent: string;
  static dayDeselectEvent: string;
  static dateRangeDragEvent: string;
  static scrollEvent: string;
  static scrollEndEvent: string;
  static monthChangedEvent: string;
  static dayRenderEvent: string;

  // Layout & Mode
  displayMode: DisplayMode;
  selectionMode: SelectionMode;
  orientation: Orientation;
  scrollPaged: boolean;

  // Date Range
  minDate: Date;
  maxDate: Date;
  firstDayOfWeek: number;

  // Selection
  selectedDates: Date[];
  selectedDateRange: DateRange;

  // Events / Markers
  events: CalendarEvent[];

  // Spacing
  interMonthSpacing: number;
  verticalDayMargin: number;
  horizontalDayMargin: number;

  // iOS-specific
  pinDaysOfWeekToTop: boolean;
  alwaysShowCompleteBoundaryMonths: boolean;

  // Layout
  outDateStyle: OutDateStyle;
  monthColumns: number;

  // Disabled dates
  disabledDates: Date[];
  disabledWeekdays: number[];

  // Style
  dayTextColor: Color;
  dayFontSize: number;
  todayTextColor: Color;
  todayBackgroundColor: Color;
  selectedDayTextColor: Color;
  selectedDayBackgroundColor: Color;
  selectedRangeColor: Color;
  weekendTextColor: Color;
  disabledDayTextColor: Color;
  outDateTextColor: Color;
  monthHeaderTextColor: Color;
  monthHeaderFontSize: number;
  dayOfWeekTextColor: Color;
  dayOfWeekFontSize: number;

  // Native view access
  readonly ios: any;
  readonly android: any;

  // Programmatic Scrolling
  scrollToDate(date: Date, animated?: boolean, position?: ScrollPosition): void;
  scrollToMonth(year: number, month: number, animated?: boolean): void;
  goToToday(animated?: boolean): void;
  goToNextMonth(animated?: boolean): void;
  goToPreviousMonth(animated?: boolean): void;

  // Selection
  selectDate(date: Date): void;
  deselectDate(date: Date): void;
  selectDateRange(start: Date, end: Date): void;
  clearSelection(): void;
  getSelectedDates(): Date[];

  // Refresh
  refresh(): void;

  // Events
  on(eventName: 'daySelect', callback: (args: CalendarDayEventData) => void, thisArg?: any): void;
  on(eventName: 'dayDeselect', callback: (args: CalendarDayEventData) => void, thisArg?: any): void;
  on(eventName: 'dateRangeDrag', callback: (args: CalendarDateRangeEventData) => void, thisArg?: any): void;
  on(eventName: 'scroll', callback: (args: CalendarScrollEventData) => void, thisArg?: any): void;
  on(eventName: 'scrollEnd', callback: (args: CalendarScrollEventData) => void, thisArg?: any): void;
  on(eventName: 'monthChanged', callback: (args: CalendarMonthEventData) => void, thisArg?: any): void;
  on(eventName: 'dayRender', callback: (args: CalendarDayRenderEventData) => void, thisArg?: any): void;
  on(eventName: string, callback: (data: EventData) => void, thisArg?: any): void;
}
