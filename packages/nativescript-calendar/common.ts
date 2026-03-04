import { booleanConverter, Color, EventData, Property, View } from '@nativescript/core';

// Enums

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

// Data Interfaces

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

// Event Interfaces

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

// Helpers

function dateToKey(date: Date): string {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${y}-${m < 10 ? '0' : ''}${m}-${d < 10 ? '0' : ''}${d}`;
}

function dateFromKey(key: string): Date {
  const parts = key.split('-');
  return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
}

function normalizeDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

const _today = new Date();

function isToday(date: Date): boolean {
  return isSameDay(date, _today);
}

function isWeekend(date: Date): boolean {
  const dow = date.getDay();
  return dow === 0 || dow === 6;
}

// Base Class

export abstract class NCalendarCommon extends View {
  // Event names
  static daySelectEvent = 'daySelect';
  static dayDeselectEvent = 'dayDeselect';
  static dateRangeDragEvent = 'dateRangeDrag';
  static scrollEvent = 'scroll';
  static scrollEndEvent = 'scrollEnd';
  static monthChangedEvent = 'monthChanged';
  static dayRenderEvent = 'dayRender';

  // Property values (set by the Property system)
  displayMode: DisplayMode;
  selectionMode: SelectionMode;
  orientation: Orientation;
  scrollPaged: boolean;
  minDate: Date;
  maxDate: Date;
  firstDayOfWeek: number;
  selectedDates: Date[];
  selectedDateRange: DateRange;
  events: CalendarEvent[];
  interMonthSpacing: number;
  verticalDayMargin: number;
  horizontalDayMargin: number;
  pinDaysOfWeekToTop: boolean;
  alwaysShowCompleteBoundaryMonths: boolean;
  outDateStyle: OutDateStyle;
  monthColumns: number;
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

  // Internal selection state

  _selectedKeys = new Set<string>();
  _rangeStart: Date | null = null;
  _rangeEnd: Date | null = null;
  _currentMonth: CalendarMonth | null = null;
  _internalSelectionChange = false;

  // Selection helpers

  _toDateKey(date: Date): string {
    return dateToKey(date);
  }

  _dateFromKey(key: string): Date {
    return dateFromKey(key);
  }

  _isDateSelected(date: Date): boolean {
    return this._selectedKeys.has(dateToKey(date));
  }

  _isDateInRange(date: Date): boolean {
    if (!this._rangeStart || !this._rangeEnd) return false;
    const t = normalizeDate(date).getTime();
    return t >= normalizeDate(this._rangeStart).getTime() && t <= normalizeDate(this._rangeEnd).getTime();
  }

  _isDateDisabled(date: Date): boolean {
    const t = normalizeDate(date).getTime();
    if (this.minDate && t < normalizeDate(this.minDate).getTime()) return true;
    if (this.maxDate && t > normalizeDate(this.maxDate).getTime()) return true;
    return false;
  }

  _getEventsForDate(date: Date): CalendarEvent[] {
    if (!this.events || !this.events.length) return [];
    const key = dateToKey(date);
    return this.events.filter((e) => dateToKey(e.date) === key);
  }

  _buildCalendarDay(date: Date, position: DayPosition): CalendarDay {
    return {
      date: normalizeDate(date),
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      position,
      isToday: isToday(date),
      isWeekend: isWeekend(date),
    };
  }

  _buildCalendarMonth(year: number, month: number): CalendarMonth {
    return { month, year };
  }

  /**
   * Central selection handler called by platform implementations when a day is tapped.
   * Returns the previous selection keys so platforms can refresh the affected cells.
   */
  _handleSelection(date: Date): { previousKeys: Set<string>; deselected: boolean } {
    const key = dateToKey(date);
    const previousKeys = new Set(this._selectedKeys);
    let deselected = false;

    switch (this.selectionMode) {
      case SelectionMode.None:
        return { previousKeys, deselected: false };

      case SelectionMode.Single: {
        if (this._selectedKeys.has(key)) {
          // Deselect
          this._selectedKeys.clear();
          deselected = true;
        } else {
          this._selectedKeys.clear();
          this._selectedKeys.add(key);
        }
        this._internalSelectionChange = true;
        this._syncSelectedDatesFromKeys();
        this._internalSelectionChange = false;
        break;
      }

      case SelectionMode.Multiple: {
        if (this._selectedKeys.has(key)) {
          this._selectedKeys.delete(key);
          deselected = true;
        } else {
          this._selectedKeys.add(key);
        }
        this._internalSelectionChange = true;
        this._syncSelectedDatesFromKeys();
        this._internalSelectionChange = false;
        break;
      }

      case SelectionMode.Range: {
        if (!this._rangeStart || (this._rangeStart && this._rangeEnd)) {
          // Start new range
          this._rangeStart = normalizeDate(date);
          this._rangeEnd = null;
          this._selectedKeys.clear();
          this._selectedKeys.add(key);
          this._internalSelectionChange = true;
          this._syncSelectedDateRange();
          this._internalSelectionChange = false;
        } else {
          // Complete range
          const start = normalizeDate(this._rangeStart);
          const end = normalizeDate(date);
          if (end.getTime() < start.getTime()) {
            this._rangeStart = end;
            this._rangeEnd = start;
          } else {
            this._rangeEnd = end;
          }
          // Populate all keys in range
          this._selectedKeys.clear();
          const cursor = new Date(this._rangeStart.getTime());
          while (cursor.getTime() <= this._rangeEnd.getTime()) {
            this._selectedKeys.add(dateToKey(cursor));
            cursor.setDate(cursor.getDate() + 1);
          }
          this._internalSelectionChange = true;
          this._syncSelectedDateRange();
          this._internalSelectionChange = false;
        }
        break;
      }
    }

    const calDay = this._buildCalendarDay(date, DayPosition.MonthDate);
    if (deselected) {
      this.notify({ eventName: NCalendarCommon.dayDeselectEvent, object: this, data: { day: calDay } } as CalendarDayEventData);
    } else {
      this.notify({ eventName: NCalendarCommon.daySelectEvent, object: this, data: { day: calDay } } as CalendarDayEventData);
    }

    return { previousKeys, deselected };
  }

  _syncSelectedDatesFromKeys() {
    const dates = Array.from(this._selectedKeys).map(dateFromKey);
    dates.sort((a, b) => a.getTime() - b.getTime());
    this.set('selectedDates', dates);
  }

  _syncSelectedDateRange() {
    if (this._rangeStart && this._rangeEnd) {
      this.set('selectedDateRange', { start: this._rangeStart, end: this._rangeEnd });
    } else if (this._rangeStart) {
      this.set('selectedDateRange', { start: this._rangeStart, end: this._rangeStart });
    } else {
      this.set('selectedDateRange', null);
    }
  }

  _notifyMonthChanged(month: CalendarMonth) {
    if (this._currentMonth && this._currentMonth.month === month.month && this._currentMonth.year === month.year) {
      return;
    }
    this._currentMonth = month;
    this.notify({ eventName: NCalendarCommon.monthChangedEvent, object: this, data: { month } } as CalendarMonthEventData);
  }

  // Public API stubs (implemented per-platform)

  scrollToDate(_date: Date, _animated?: boolean, _position?: ScrollPosition): void {}
  scrollToMonth(_year: number, _month: number, _animated?: boolean): void {}

  selectDate(date: Date): void {
    const key = dateToKey(date);
    if (this.selectionMode === SelectionMode.Single) {
      this._selectedKeys.clear();
    }
    this._selectedKeys.add(key);
    this._syncSelectedDatesFromKeys();
    this._refreshAfterSelectionChange();
  }

  deselectDate(date: Date): void {
    this._selectedKeys.delete(dateToKey(date));
    this._syncSelectedDatesFromKeys();
    this._refreshAfterSelectionChange();
  }

  selectDateRange(start: Date, end: Date): void {
    this._rangeStart = normalizeDate(start);
    this._rangeEnd = normalizeDate(end);
    this._selectedKeys.clear();
    const cursor = new Date(this._rangeStart.getTime());
    while (cursor.getTime() <= this._rangeEnd.getTime()) {
      this._selectedKeys.add(dateToKey(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    this._syncSelectedDateRange();
    this._refreshAfterSelectionChange();
  }

  clearSelection(): void {
    this._selectedKeys.clear();
    this._rangeStart = null;
    this._rangeEnd = null;
    this.set('selectedDates', []);
    this.set('selectedDateRange', null);
    this._refreshAfterSelectionChange();
  }

  getSelectedDates(): Date[] {
    return Array.from(this._selectedKeys)
      .map(dateFromKey)
      .sort((a, b) => a.getTime() - b.getTime());
  }

  goToToday(animated?: boolean): void {
    this.scrollToDate(new Date(), animated);
  }

  goToNextMonth(animated?: boolean): void {
    const m = this._currentMonth;
    if (!m) return;
    let nextMonth = m.month + 1;
    let nextYear = m.year;
    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear++;
    }
    this.scrollToMonth(nextYear, nextMonth, animated);
  }

  goToPreviousMonth(animated?: boolean): void {
    const m = this._currentMonth;
    if (!m) return;
    let prevMonth = m.month - 1;
    let prevYear = m.year;
    if (prevMonth < 1) {
      prevMonth = 12;
      prevYear--;
    }
    this.scrollToMonth(prevYear, prevMonth, animated);
  }

  /** Platform implementations override this to refresh native views after selection change. */
  _refreshAfterSelectionChange(): void {}

  /** Platform implementations override this to fully reload the calendar. */
  refresh(): void {}
}

// Property Definitions

function defaultMinDate(): Date {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 2);
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function defaultMaxDate(): Date {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 2);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

export const displayModeProperty = new Property<NCalendarCommon, DisplayMode>({
  name: 'displayMode',
  defaultValue: DisplayMode.Month,
});
displayModeProperty.register(NCalendarCommon);

export const selectionModeProperty = new Property<NCalendarCommon, SelectionMode>({
  name: 'selectionMode',
  defaultValue: SelectionMode.Single,
});
selectionModeProperty.register(NCalendarCommon);

export const orientationProperty = new Property<NCalendarCommon, Orientation>({
  name: 'orientation',
  defaultValue: Orientation.Vertical,
});
orientationProperty.register(NCalendarCommon);

export const scrollPagedProperty = new Property<NCalendarCommon, boolean>({
  name: 'scrollPaged',
  defaultValue: false,
  valueConverter: booleanConverter,
});
scrollPagedProperty.register(NCalendarCommon);

export const minDateProperty = new Property<NCalendarCommon, Date>({
  name: 'minDate',
  defaultValue: defaultMinDate(),
});
minDateProperty.register(NCalendarCommon);

export const maxDateProperty = new Property<NCalendarCommon, Date>({
  name: 'maxDate',
  defaultValue: defaultMaxDate(),
});
maxDateProperty.register(NCalendarCommon);

export const firstDayOfWeekProperty = new Property<NCalendarCommon, number>({
  name: 'firstDayOfWeek',
  defaultValue: 0,
  valueConverter: (v) => parseInt(v, 10),
});
firstDayOfWeekProperty.register(NCalendarCommon);

export const selectedDatesProperty = new Property<NCalendarCommon, Date[]>({
  name: 'selectedDates',
  defaultValue: [],
  valueChanged: (target, _oldValue, newValue) => {
    if (target._internalSelectionChange) return;
    target._selectedKeys.clear();
    if (newValue && newValue.length) {
      for (const d of newValue) {
        target._selectedKeys.add(target._toDateKey(d));
      }
    }
  },
});
selectedDatesProperty.register(NCalendarCommon);

export const selectedDateRangeProperty = new Property<NCalendarCommon, DateRange>({
  name: 'selectedDateRange',
  defaultValue: undefined,
  valueChanged: (target, _oldValue, newValue) => {
    if (target._internalSelectionChange) return;
    if (newValue && newValue.start && newValue.end) {
      target._rangeStart = newValue.start;
      target._rangeEnd = newValue.end;
      target._selectedKeys.clear();
      const cursor = new Date(newValue.start.getTime());
      const endTime = newValue.end.getTime();
      while (cursor.getTime() <= endTime) {
        target._selectedKeys.add(target._toDateKey(cursor));
        cursor.setDate(cursor.getDate() + 1);
      }
    } else {
      target._rangeStart = null;
      target._rangeEnd = null;
      target._selectedKeys.clear();
    }
  },
});
selectedDateRangeProperty.register(NCalendarCommon);

export const eventsProperty = new Property<NCalendarCommon, CalendarEvent[]>({
  name: 'events',
  defaultValue: [],
});
eventsProperty.register(NCalendarCommon);

export const interMonthSpacingProperty = new Property<NCalendarCommon, number>({
  name: 'interMonthSpacing',
  defaultValue: 0,
  valueConverter: (v) => parseFloat(v),
});
interMonthSpacingProperty.register(NCalendarCommon);

export const verticalDayMarginProperty = new Property<NCalendarCommon, number>({
  name: 'verticalDayMargin',
  defaultValue: 0,
  valueConverter: (v) => parseFloat(v),
});
verticalDayMarginProperty.register(NCalendarCommon);

export const horizontalDayMarginProperty = new Property<NCalendarCommon, number>({
  name: 'horizontalDayMargin',
  defaultValue: 0,
  valueConverter: (v) => parseFloat(v),
});
horizontalDayMarginProperty.register(NCalendarCommon);

export const pinDaysOfWeekToTopProperty = new Property<NCalendarCommon, boolean>({
  name: 'pinDaysOfWeekToTop',
  defaultValue: true,
  valueConverter: booleanConverter,
});
pinDaysOfWeekToTopProperty.register(NCalendarCommon);

export const alwaysShowCompleteBoundaryMonthsProperty = new Property<NCalendarCommon, boolean>({
  name: 'alwaysShowCompleteBoundaryMonths',
  defaultValue: true,
  valueConverter: booleanConverter,
});
alwaysShowCompleteBoundaryMonthsProperty.register(NCalendarCommon);

export const outDateStyleProperty = new Property<NCalendarCommon, OutDateStyle>({
  name: 'outDateStyle',
  defaultValue: OutDateStyle.EndOfRow,
});
outDateStyleProperty.register(NCalendarCommon);

export const monthColumnsProperty = new Property<NCalendarCommon, number>({
  name: 'monthColumns',
  defaultValue: 3,
  valueConverter: (v) => parseInt(v, 10),
});
monthColumnsProperty.register(NCalendarCommon);

// Style Properties

export const dayTextColorProperty = new Property<NCalendarCommon, Color>({
  name: 'dayTextColor',
  equalityComparer: Color.equals,
  valueConverter: (v) => new Color(v),
});
dayTextColorProperty.register(NCalendarCommon);

export const dayFontSizeProperty = new Property<NCalendarCommon, number>({
  name: 'dayFontSize',
  defaultValue: 18,
  valueConverter: (v) => parseFloat(v),
});
dayFontSizeProperty.register(NCalendarCommon);

export const todayTextColorProperty = new Property<NCalendarCommon, Color>({
  name: 'todayTextColor',
  equalityComparer: Color.equals,
  valueConverter: (v) => new Color(v),
});
todayTextColorProperty.register(NCalendarCommon);

export const todayBackgroundColorProperty = new Property<NCalendarCommon, Color>({
  name: 'todayBackgroundColor',
  equalityComparer: Color.equals,
  valueConverter: (v) => new Color(v),
});
todayBackgroundColorProperty.register(NCalendarCommon);

export const selectedDayTextColorProperty = new Property<NCalendarCommon, Color>({
  name: 'selectedDayTextColor',
  equalityComparer: Color.equals,
  valueConverter: (v) => new Color(v),
});
selectedDayTextColorProperty.register(NCalendarCommon);

export const selectedDayBackgroundColorProperty = new Property<NCalendarCommon, Color>({
  name: 'selectedDayBackgroundColor',
  equalityComparer: Color.equals,
  valueConverter: (v) => new Color(v),
});
selectedDayBackgroundColorProperty.register(NCalendarCommon);

export const selectedRangeColorProperty = new Property<NCalendarCommon, Color>({
  name: 'selectedRangeColor',
  equalityComparer: Color.equals,
  valueConverter: (v) => new Color(v),
});
selectedRangeColorProperty.register(NCalendarCommon);

export const weekendTextColorProperty = new Property<NCalendarCommon, Color>({
  name: 'weekendTextColor',
  equalityComparer: Color.equals,
  valueConverter: (v) => new Color(v),
});
weekendTextColorProperty.register(NCalendarCommon);

export const disabledDayTextColorProperty = new Property<NCalendarCommon, Color>({
  name: 'disabledDayTextColor',
  equalityComparer: Color.equals,
  valueConverter: (v) => new Color(v),
});
disabledDayTextColorProperty.register(NCalendarCommon);

export const outDateTextColorProperty = new Property<NCalendarCommon, Color>({
  name: 'outDateTextColor',
  equalityComparer: Color.equals,
  valueConverter: (v) => new Color(v),
});
outDateTextColorProperty.register(NCalendarCommon);

export const monthHeaderTextColorProperty = new Property<NCalendarCommon, Color>({
  name: 'monthHeaderTextColor',
  equalityComparer: Color.equals,
  valueConverter: (v) => new Color(v),
});
monthHeaderTextColorProperty.register(NCalendarCommon);

export const monthHeaderFontSizeProperty = new Property<NCalendarCommon, number>({
  name: 'monthHeaderFontSize',
  defaultValue: 20,
  valueConverter: (v) => parseFloat(v),
});
monthHeaderFontSizeProperty.register(NCalendarCommon);

export const dayOfWeekTextColorProperty = new Property<NCalendarCommon, Color>({
  name: 'dayOfWeekTextColor',
  equalityComparer: Color.equals,
  valueConverter: (v) => new Color(v),
});
dayOfWeekTextColorProperty.register(NCalendarCommon);

export const dayOfWeekFontSizeProperty = new Property<NCalendarCommon, number>({
  name: 'dayOfWeekFontSize',
  defaultValue: 14,
  valueConverter: (v) => parseFloat(v),
});
dayOfWeekFontSizeProperty.register(NCalendarCommon);
