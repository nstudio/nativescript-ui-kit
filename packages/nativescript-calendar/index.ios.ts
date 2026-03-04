import { Color } from '@nativescript/core';
import {
  NCalendarCommon,
  DisplayMode,
  Orientation,
  DayPosition,
  SelectionMode,
  ScrollPosition,
  CalendarMonth,
  CalendarDayEventData,
  displayModeProperty,
  selectionModeProperty,
  orientationProperty,
  scrollPagedProperty,
  minDateProperty,
  maxDateProperty,
  firstDayOfWeekProperty,
  selectedDatesProperty,
  selectedDateRangeProperty,
  eventsProperty,
  interMonthSpacingProperty,
  verticalDayMarginProperty,
  horizontalDayMarginProperty,
  pinDaysOfWeekToTopProperty,
  alwaysShowCompleteBoundaryMonthsProperty,
  monthColumnsProperty,
  dayTextColorProperty,
  dayFontSizeProperty,
  todayTextColorProperty,
  todayBackgroundColorProperty,
  selectedDayTextColorProperty,
  selectedDayBackgroundColorProperty,
  selectedRangeColorProperty,
  weekendTextColorProperty,
  disabledDayTextColorProperty,
  outDateTextColorProperty,
  monthHeaderTextColorProperty,
  monthHeaderFontSizeProperty,
  dayOfWeekTextColorProperty,
  dayOfWeekFontSizeProperty,
} from './common';

export * from './common';

function colorToHex(color: Color | undefined): string {
  if (!color) return '';
  return color.hex;
}

export class NCalendar extends NCalendarCommon {
  private _calView: NCalendarView;

  // @ts-ignore
  get ios(): NCalendarView {
    return this._calView;
  }

  createNativeView() {
    this._calView = NCalendarView.alloc().initWithFrame(CGRectZero);
    this._configureCallbacks();
    this._applyAllProperties();
    return this._calView;
  }

  initNativeView() {
    super.initNativeView();
  }

  disposeNativeView() {
    if (this._calView) {
      this._calView.onDaySelect = null;
      this._calView.onScroll = null;
      this._calView.onScrollEnd = null;
      this._calView.onMonthChanged = null;
      this._calView.onDayRender = null;
    }
    this._calView = null;
    super.disposeNativeView();
  }

  // Callbacks

  private _configureCallbacks() {
    if (!this._calView) return;

    this._calView.onDaySelect = (year: number, month: number, day: number) => {
      const date = new Date(year, month - 1, day);
      if (this._isDateDisabled(date)) return;
      if (this.selectionMode === SelectionMode.None) return;

      this._handleSelection(date);
      this._syncSelectionToBridge();
    };

    this._calView.onScroll = (startYear: number, startMonth: number, endYear: number, endMonth: number, isDragging: boolean) => {
      const month: CalendarMonth = { month: startMonth, year: startYear };
      this.notify({
        eventName: NCalendarCommon.scrollEvent,
        object: this,
        data: { month, isUserDragging: isDragging },
      });
    };

    this._calView.onScrollEnd = (startYear: number, startMonth: number, _endYear: number, _endMonth: number) => {
      const month: CalendarMonth = { month: startMonth, year: startYear };
      this.notify({
        eventName: NCalendarCommon.scrollEndEvent,
        object: this,
        data: { month, isUserDragging: false },
      });
    };

    this._calView.onMonthChanged = (year: number, month: number) => {
      this._notifyMonthChanged({ month, year });
    };
  }

  // Selection Sync

  private _syncSelectionToBridge() {
    if (!this._calView) return;

    const keys = Array.from(this._selectedKeys);
    this._calView.setSelectedKeys(keys);

    if (this.selectionMode === SelectionMode.Range && this._rangeStart && this._rangeEnd) {
      this._calView.setRangeKeysEndKey(this._toDateKey(this._rangeStart), this._toDateKey(this._rangeEnd));
    } else {
      this._calView.setRangeKeysEndKey(null, null);
    }
  }

  private _applyAllProperties() {
    if (!this._calView) return;

    // Layout
    (this._calView as any).displayModeStr = this.displayMode;
    this._calView.isHorizontal = this.orientation === Orientation.Horizontal;
    this._calView.isPaginated = this.scrollPaged;
    this._calView.pinDaysOfWeekToTop = this.pinDaysOfWeekToTop;
    this._calView.showCompleteBoundaryMonths = this.alwaysShowCompleteBoundaryMonths;

    // Dates
    this._calView.minDateMs = this.minDate ? this.minDate.getTime() : 0;
    this._calView.maxDateMs = this.maxDate ? this.maxDate.getTime() : 0;
    this._calView.firstDayOfWeekJS = this.firstDayOfWeek;

    // Spacing
    this._calView.interMonthSpacingPt = this.interMonthSpacing;
    this._calView.verticalDayMarginPt = this.verticalDayMargin;
    this._calView.horizontalDayMarginPt = this.horizontalDayMargin;

    // Selection
    this._calView.selectionModeStr = this.selectionMode;

    // Style
    this._applyStyleProperties();

    // Selection state
    this._syncSelectionToBridge();
  }

  private _applyStyleProperties() {
    if (!this._calView) return;

    this._calView.dayTextColorHex = colorToHex(this.dayTextColor);
    this._calView.dayFontSizePt = this.dayFontSize || 18;
    this._calView.todayTextColorHex = colorToHex(this.todayTextColor) || '#2196F3';
    this._calView.todayBgColorHex = colorToHex(this.todayBackgroundColor);
    this._calView.selectedDayTextColorHex = colorToHex(this.selectedDayTextColor) || '#FFFFFF';
    this._calView.selectedDayBgColorHex = colorToHex(this.selectedDayBackgroundColor) || '#2196F3';
    this._calView.selectedRangeColorHex = colorToHex(this.selectedRangeColor) || '#BBDEFB';
    this._calView.weekendTextColorHex = colorToHex(this.weekendTextColor) || '#757575';
    this._calView.disabledDayTextColorHex = colorToHex(this.disabledDayTextColor) || '#E0E0E0';
    this._calView.outDateTextColorHex = colorToHex(this.outDateTextColor) || '#BDBDBD';
    this._calView.monthHeaderTextColorHex = colorToHex(this.monthHeaderTextColor);
    this._calView.monthHeaderFontSizePt = this.monthHeaderFontSize || 20;
    this._calView.dayOfWeekTextColorHex = colorToHex(this.dayOfWeekTextColor) || '#757575';
    this._calView.dayOfWeekFontSizePt = this.dayOfWeekFontSize || 14;
  }

  // Refresh

  private _rebuild() {
    if (!this._calView) return;
    this._calView.rebuildContent();
  }

  _refreshAfterSelectionChange(): void {
    this._syncSelectionToBridge();
  }

  refresh(): void {
    this._rebuild();
  }

  // Programmatic Scrolling

  scrollToDate(date: Date, animated = true, _position?: ScrollPosition): void {
    if (!this._calView) return;
    this._calView.scrollToDayContainingWithYearMonthDayAnimated(date.getFullYear(), date.getMonth() + 1, date.getDate(), animated);
  }

  scrollToMonth(year: number, month: number, animated = true): void {
    if (!this._calView) return;
    this._calView.scrollToMonthContainingWithYearMonthDayAnimated(year, month, 1, animated);
  }

  // Property Setters

  [displayModeProperty.setNative](value: DisplayMode) {
    if (this._calView) {
      (this._calView as any).displayModeStr = value;
    }
  }

  [orientationProperty.setNative](value: Orientation) {
    if (this._calView) {
      this._calView.isHorizontal = value === Orientation.Horizontal;
    }
  }

  [scrollPagedProperty.setNative](value: boolean) {
    if (this._calView) {
      this._calView.isPaginated = value;
    }
  }

  [selectionModeProperty.setNative](_value: SelectionMode) {
    if (this._calView) {
      this._calView.selectionModeStr = this.selectionMode;
      this.clearSelection();
    }
  }

  [minDateProperty.setNative](value: Date) {
    if (this._calView) {
      this._calView.minDateMs = value ? value.getTime() : 0;
    }
  }

  [maxDateProperty.setNative](value: Date) {
    if (this._calView) {
      this._calView.maxDateMs = value ? value.getTime() : 0;
    }
  }

  [firstDayOfWeekProperty.setNative](value: number) {
    if (this._calView) {
      this._calView.firstDayOfWeekJS = value;
      // After recreating the CalendarView, restore scroll position
      if (this._currentMonth) {
        this.scrollToMonth(this._currentMonth.year, this._currentMonth.month, false);
      }
    }
  }

  [selectedDatesProperty.setNative](value: Date[]) {
    if (this._internalSelectionChange) return;
    this._selectedKeys.clear();
    if (value && value.length) {
      for (const d of value) {
        this._selectedKeys.add(this._toDateKey(d));
      }
    }
    this._syncSelectionToBridge();
  }

  [selectedDateRangeProperty.setNative](value: any) {
    if (this._internalSelectionChange) return;
    if (value && value.start && value.end) {
      this._rangeStart = value.start;
      this._rangeEnd = value.end;
      this._selectedKeys.clear();
      const cursor = new Date(this._rangeStart.getTime());
      while (cursor.getTime() <= this._rangeEnd.getTime()) {
        this._selectedKeys.add(this._toDateKey(cursor));
        cursor.setDate(cursor.getDate() + 1);
      }
    } else {
      this._rangeStart = null;
      this._rangeEnd = null;
      this._selectedKeys.clear();
    }
    this._syncSelectionToBridge();
  }

  [eventsProperty.setNative](value: any) {
    if (this._calView && value) {
      const mapped = value.map((e: any) => ({
        key: this._toDateKey(e.date),
        color: e.color || '',
      }));
      this._calView.setEvents(JSON.stringify(mapped));
    } else if (this._calView) {
      this._calView.setEvents('[]');
    }
  }

  [interMonthSpacingProperty.setNative](value: number) {
    if (this._calView) this._calView.interMonthSpacingPt = value;
  }

  [verticalDayMarginProperty.setNative](value: number) {
    if (this._calView) this._calView.verticalDayMarginPt = value;
  }

  [horizontalDayMarginProperty.setNative](value: number) {
    if (this._calView) this._calView.horizontalDayMarginPt = value;
  }

  [pinDaysOfWeekToTopProperty.setNative](value: boolean) {
    if (this._calView) this._calView.pinDaysOfWeekToTop = value;
  }

  [alwaysShowCompleteBoundaryMonthsProperty.setNative](value: boolean) {
    if (this._calView) this._calView.showCompleteBoundaryMonths = value;
  }

  [monthColumnsProperty.setNative](_value: number) {
    // Year view - to be implemented
  }

  // Style property setters
  [dayTextColorProperty.setNative]() {
    this._applyStyleProperties();
    this._rebuild();
  }
  [dayFontSizeProperty.setNative]() {
    this._applyStyleProperties();
    this._rebuild();
  }
  [todayTextColorProperty.setNative]() {
    this._applyStyleProperties();
    this._rebuild();
  }
  [todayBackgroundColorProperty.setNative]() {
    this._applyStyleProperties();
    this._rebuild();
  }
  [selectedDayTextColorProperty.setNative]() {
    this._applyStyleProperties();
    this._rebuild();
  }
  [selectedDayBackgroundColorProperty.setNative]() {
    this._applyStyleProperties();
    this._rebuild();
  }
  [selectedRangeColorProperty.setNative]() {
    this._applyStyleProperties();
    this._rebuild();
  }
  [weekendTextColorProperty.setNative]() {
    this._applyStyleProperties();
    this._rebuild();
  }
  [disabledDayTextColorProperty.setNative]() {
    this._applyStyleProperties();
    this._rebuild();
  }
  [outDateTextColorProperty.setNative]() {
    this._applyStyleProperties();
    this._rebuild();
  }
  [monthHeaderTextColorProperty.setNative]() {
    this._applyStyleProperties();
    this._rebuild();
  }
  [monthHeaderFontSizeProperty.setNative]() {
    this._applyStyleProperties();
    this._rebuild();
  }
  [dayOfWeekTextColorProperty.setNative]() {
    this._applyStyleProperties();
    this._rebuild();
  }
  [dayOfWeekFontSizeProperty.setNative]() {
    this._applyStyleProperties();
    this._rebuild();
  }
}
