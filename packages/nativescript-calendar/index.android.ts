import { Color, Utils } from '@nativescript/core';
import {
  NCalendarCommon,
  DisplayMode,
  Orientation,
  DayPosition,
  OutDateStyle,
  SelectionMode,
  ScrollPosition,
  CalendarMonth,
  CalendarDayRenderEventData,
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
  outDateStyleProperty,
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

// ── Native type aliases ────────────────────────────────────────────────────

declare const com: any;
declare const java: any;
declare const kotlin: any;

// ── Helpers ────────────────────────────────────────────────────────────────

function jsDateToLocalDate(date: Date): any {
  return java.time.LocalDate.of(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

function localDateToJSDate(localDate: any): Date {
  return new Date(localDate.getYear(), localDate.getMonthValue() - 1, localDate.getDayOfMonth());
}

function toJavaDayOfWeek(jsDay: number): any {
  const javaValue = jsDay === 0 ? 7 : jsDay;
  return java.time.DayOfWeek.of(javaValue);
}

function toAndroidColor(color: Color | undefined, fallback: string): number {
  if (color) return color.android;
  return new Color(fallback).android;
}

function dipToPx(dip: number): number {
  return Math.round(Utils.layout.toDevicePixels(dip));
}

// ── ViewContainer subclass ─────────────────────────────────────────────────

let DayViewContainer: any;
let MonthHeaderContainer: any;

function ensureContainerClasses() {
  if (DayViewContainer) return;

  @NativeClass()
  class _DayViewContainer extends com.kizitonwose.calendar.view.ViewContainer {
    constructor(view: any) {
      super(view);
      return global.__native(this);
    }
  }
  DayViewContainer = _DayViewContainer;

  @NativeClass()
  class _MonthHeaderContainer extends com.kizitonwose.calendar.view.ViewContainer {
    constructor(view: any) {
      super(view);
      return global.__native(this);
    }
  }
  MonthHeaderContainer = _MonthHeaderContainer;
}

// ── Resource ID cache ──────────────────────────────────────────────────────

let _dayViewResId = 0;
let _monthHeaderResId = 0;

function getDayViewResId(context: any): number {
  if (!_dayViewResId) {
    _dayViewResId = context.getResources().getIdentifier('calendar_day_view', 'layout', context.getPackageName());
  }
  return _dayViewResId;
}

function getMonthHeaderResId(context: any): number {
  if (!_monthHeaderResId) {
    _monthHeaderResId = context.getResources().getIdentifier('calendar_month_header', 'layout', context.getPackageName());
  }
  return _monthHeaderResId;
}

// ── Main Implementation ────────────────────────────────────────────────────

export class NCalendar extends NCalendarCommon {
  private _wrapper: any;
  private _calendarView: any;
  private _dayTextId = 0;
  private _dotViewId = 0;
  private _monthTitleId = 0;

  // @ts-ignore
  get android(): any {
    return this._calendarView;
  }

  createNativeView() {
    ensureContainerClasses();
    this._wrapper = new android.widget.FrameLayout(this._context);
    this._cacheResourceIds();
    this._calendarView = this._createCalendarForMode(this.displayMode);
    if (this._calendarView) {
      this._wrapper.addView(this._calendarView);
    }
    return this._wrapper;
  }

  initNativeView() {
    super.initNativeView();
  }

  disposeNativeView() {
    this._calendarView = null;
    this._wrapper = null;
    super.disposeNativeView();
  }

  // ── Resource ID caching ──────────────────────────────────────────────

  private _cacheResourceIds() {
    const ctx = this._context;
    if (!ctx) return;
    this._dayTextId = ctx.getResources().getIdentifier('dayText', 'id', ctx.getPackageName());
    this._dotViewId = ctx.getResources().getIdentifier('dotView', 'id', ctx.getPackageName());
    this._monthTitleId = ctx.getResources().getIdentifier('monthTitle', 'id', ctx.getPackageName());
  }

  // ── Calendar Factory ─────────────────────────────────────────────────

  private _createCalendarForMode(mode: DisplayMode): any {
    switch (mode) {
      case DisplayMode.Week:
        return this._createWeekCalendarView();
      case DisplayMode.Year:
        return this._createYearCalendarView();
      case DisplayMode.Month:
      default:
        return this._createMonthCalendarView();
    }
  }

  // ── Month Calendar ───────────────────────────────────────────────────

  private _createMonthCalendarView(): any {
    const ctx = this._context;
    if (!ctx) return null;

    const cv = new com.kizitonwose.calendar.view.CalendarView(ctx);

    cv.dayViewResource = getDayViewResId(ctx);
    const headerRes = getMonthHeaderResId(ctx);
    if (headerRes) cv.monthHeaderResource = headerRes;

    cv.orientation = this.orientation === Orientation.Horizontal ? androidx.recyclerview.widget.RecyclerView.HORIZONTAL : androidx.recyclerview.widget.RecyclerView.VERTICAL;
    cv.scrollPaged = this.scrollPaged;
    cv.daySize = com.kizitonwose.calendar.view.DaySize.Square;
    cv.outDateStyle = this.outDateStyle === OutDateStyle.EndOfGrid ? com.kizitonwose.calendar.core.OutDateStyle.EndOfGrid : com.kizitonwose.calendar.core.OutDateStyle.EndOfRow;

    if (this.interMonthSpacing > 0) {
      const px = dipToPx(this.interMonthSpacing);
      cv.monthMargins = new com.kizitonwose.calendar.view.MarginValues(0, px, 0, 0);
    }

    cv.dayBinder = this._createMonthDayBinder();
    cv.monthHeaderBinder = this._createMonthHeaderBinder();
    cv.monthScrollListener = this._createMonthScrollListener();

    const startMonth = java.time.YearMonth.of(this.minDate.getFullYear(), this.minDate.getMonth() + 1);
    const endMonth = java.time.YearMonth.of(this.maxDate.getFullYear(), this.maxDate.getMonth() + 1);
    const firstDow = toJavaDayOfWeek(this.firstDayOfWeek);
    cv.setup(startMonth, endMonth, firstDow);

    return cv;
  }

  // ── Week Calendar ────────────────────────────────────────────────────

  private _createWeekCalendarView(): any {
    const ctx = this._context;
    if (!ctx) return null;

    const wv = new com.kizitonwose.calendar.view.WeekCalendarView(ctx);
    wv.dayViewResource = getDayViewResId(ctx);
    wv.scrollPaged = true;
    wv.daySize = com.kizitonwose.calendar.view.DaySize.Square;

    wv.dayBinder = this._createWeekDayBinder();
    wv.weekScrollListener = this._createWeekScrollListener();

    const startDate = jsDateToLocalDate(this.minDate);
    const endDate = jsDateToLocalDate(this.maxDate);
    const firstDow = toJavaDayOfWeek(this.firstDayOfWeek);
    wv.setup(startDate, endDate, firstDow);

    return wv;
  }

  // ── Year Calendar ────────────────────────────────────────────────────

  private _createYearCalendarView(): any {
    const ctx = this._context;
    if (!ctx) return null;

    const yv = new com.kizitonwose.calendar.view.YearCalendarView(ctx);
    yv.dayViewResource = getDayViewResId(ctx);
    const headerRes = getMonthHeaderResId(ctx);
    if (headerRes) yv.monthHeaderResource = headerRes;
    yv.monthColumns = this.monthColumns;
    if (this.interMonthSpacing > 0) {
      const px = dipToPx(this.interMonthSpacing);
      yv.monthVerticalSpacing = px;
      yv.monthHorizontalSpacing = px;
    }
    yv.scrollPaged = this.scrollPaged;
    yv.daySize = com.kizitonwose.calendar.view.DaySize.Square;

    yv.dayBinder = this._createMonthDayBinder();
    yv.monthHeaderBinder = this._createMonthHeaderBinder();
    yv.yearScrollListener = this._createYearScrollListener();

    const startYear = java.time.Year.of(this.minDate.getFullYear());
    const endYear = java.time.Year.of(this.maxDate.getFullYear());
    const firstDow = toJavaDayOfWeek(this.firstDayOfWeek);
    yv.setup(startYear, endYear, firstDow);

    return yv;
  }

  // ── Day Binder (Month / Year) ────────────────────────────────────────

  private _createMonthDayBinder(): any {
    const owner = new WeakRef(this);

    return new com.kizitonwose.calendar.view.MonthDayBinder({
      create(view: any) {
        return new DayViewContainer(view);
      },
      bind(container: any, data: any) {
        const cal = owner.deref();
        if (!cal) return;

        const dayView = container.getView();
        const textView = cal._dayTextId ? dayView.findViewById(cal._dayTextId) : dayView;
        const dotView = cal._dotViewId ? dayView.findViewById(cal._dotViewId) : null;

        const localDate = data.getDate();
        const position = data.getPosition();
        const jsDate = localDateToJSDate(localDate);
        const dayNum = localDate.getDayOfMonth();

        let dayPos: DayPosition;
        if (position === com.kizitonwose.calendar.core.DayPosition.MonthDate) {
          dayPos = DayPosition.MonthDate;
        } else if (position === com.kizitonwose.calendar.core.DayPosition.InDate) {
          dayPos = DayPosition.InDate;
        } else {
          dayPos = DayPosition.OutDate;
        }

        const isMonthDate = dayPos === DayPosition.MonthDate;
        const isSelected = cal._isDateSelected(jsDate);
        const isInRange = cal.selectionMode === SelectionMode.Range && cal._isDateInRange(jsDate);
        const now = new Date();
        const isToday = jsDate.getFullYear() === now.getFullYear() && jsDate.getMonth() === now.getMonth() && jsDate.getDate() === now.getDate();
        const isDisabled = cal._isDateDisabled(jsDate);
        const isWeekend = jsDate.getDay() === 0 || jsDate.getDay() === 6;

        if (textView && textView.setText) {
          textView.setText(String(dayNum));
          textView.setTextSize(android.util.TypedValue.COMPLEX_UNIT_DIP, cal.dayFontSize || 14);

          if (!isMonthDate) {
            textView.setTextColor(toAndroidColor(cal.outDateTextColor, '#BDBDBD'));
          } else if (isDisabled) {
            textView.setTextColor(toAndroidColor(cal.disabledDayTextColor, '#E0E0E0'));
          } else if (isSelected) {
            textView.setTextColor(toAndroidColor(cal.selectedDayTextColor, '#FFFFFF'));
          } else if (isToday) {
            textView.setTextColor(toAndroidColor(cal.todayTextColor, '#2196F3'));
          } else if (isWeekend) {
            textView.setTextColor(toAndroidColor(cal.weekendTextColor, '#757575'));
          } else {
            textView.setTextColor(toAndroidColor(cal.dayTextColor, '#212121'));
          }
        }

        // Background
        if (isMonthDate && isSelected) {
          const bgColor = toAndroidColor(cal.selectedDayBackgroundColor, '#2196F3');
          const gd = new android.graphics.drawable.GradientDrawable();
          gd.setShape(android.graphics.drawable.GradientDrawable.OVAL);
          gd.setColor(bgColor);
          dayView.setBackground(gd);
        } else if (isMonthDate && isInRange && !isSelected) {
          dayView.setBackgroundColor(toAndroidColor(cal.selectedRangeColor, '#BBDEFB'));
        } else if (isMonthDate && isToday) {
          const todayBg = cal.todayBackgroundColor;
          if (todayBg) {
            const gd = new android.graphics.drawable.GradientDrawable();
            gd.setShape(android.graphics.drawable.GradientDrawable.OVAL);
            gd.setColor(todayBg.android);
            dayView.setBackground(gd);
          } else {
            const gd = new android.graphics.drawable.GradientDrawable();
            gd.setShape(android.graphics.drawable.GradientDrawable.OVAL);
            gd.setStroke(dipToPx(1), toAndroidColor(cal.todayTextColor, '#2196F3'));
            gd.setColor(android.graphics.Color.TRANSPARENT);
            dayView.setBackground(gd);
          }
        } else {
          dayView.setBackground(null);
        }

        // Event dot
        if (dotView) {
          const events = cal._getEventsForDate(jsDate);
          if (events.length > 0) {
            dotView.setVisibility(android.view.View.VISIBLE);
            const dotColor = events[0].color ? new Color(events[0].color).android : toAndroidColor(cal.todayTextColor, '#2196F3');
            const dotGd = new android.graphics.drawable.GradientDrawable();
            dotGd.setShape(android.graphics.drawable.GradientDrawable.OVAL);
            dotGd.setColor(dotColor);
            dotView.setBackground(dotGd);
          } else {
            dotView.setVisibility(android.view.View.GONE);
          }
        }

        // Fire dayRender event
        if (cal.hasListeners(NCalendarCommon.dayRenderEvent)) {
          const calDay = cal._buildCalendarDay(jsDate, dayPos);
          cal.notify({
            eventName: NCalendarCommon.dayRenderEvent,
            object: cal,
            data: {
              day: calDay,
              view: dayView,
              isSelected,
              isInRange,
              isDisabled,
              events: cal._getEventsForDate(jsDate),
            },
          } as CalendarDayRenderEventData);
        }

        // Click handler
        if (isMonthDate && !isDisabled && cal.selectionMode !== SelectionMode.None) {
          dayView.setOnClickListener(
            new android.view.View.OnClickListener({
              onClick() {
                const c = owner.deref();
                if (!c) return;
                const { previousKeys } = c._handleSelection(jsDate);

                if (c.displayMode === DisplayMode.Month && c._calendarView) {
                  for (const key of previousKeys) {
                    const prev = c._dateFromKey(key);
                    c._calendarView.notifyDateChanged(jsDateToLocalDate(prev));
                  }
                  c._calendarView.notifyDateChanged(localDate);
                } else {
                  c._refreshCalendar();
                }
              },
            }),
          );
        } else {
          dayView.setOnClickListener(null);
          dayView.setClickable(false);
        }
      },
    });
  }

  // ── Week Day Binder ──────────────────────────────────────────────────

  private _createWeekDayBinder(): any {
    const owner = new WeakRef(this);

    return new com.kizitonwose.calendar.view.WeekDayBinder({
      create(view: any) {
        return new DayViewContainer(view);
      },
      bind(container: any, data: any) {
        const cal = owner.deref();
        if (!cal) return;

        const dayView = container.getView();
        const textView = cal._dayTextId ? dayView.findViewById(cal._dayTextId) : dayView;
        const dotView = cal._dotViewId ? dayView.findViewById(cal._dotViewId) : null;

        const localDate = data.getDate();
        const jsDate = localDateToJSDate(localDate);
        const dayNum = localDate.getDayOfMonth();

        const isSelected = cal._isDateSelected(jsDate);
        const isInRange = cal.selectionMode === SelectionMode.Range && cal._isDateInRange(jsDate);
        const now = new Date();
        const isToday = jsDate.getFullYear() === now.getFullYear() && jsDate.getMonth() === now.getMonth() && jsDate.getDate() === now.getDate();
        const isDisabled = cal._isDateDisabled(jsDate);

        if (textView && textView.setText) {
          textView.setText(String(dayNum));
          textView.setTextSize(android.util.TypedValue.COMPLEX_UNIT_DIP, cal.dayFontSize || 14);

          if (isDisabled) {
            textView.setTextColor(toAndroidColor(cal.disabledDayTextColor, '#E0E0E0'));
          } else if (isSelected) {
            textView.setTextColor(toAndroidColor(cal.selectedDayTextColor, '#FFFFFF'));
          } else if (isToday) {
            textView.setTextColor(toAndroidColor(cal.todayTextColor, '#2196F3'));
          } else {
            textView.setTextColor(toAndroidColor(cal.dayTextColor, '#212121'));
          }
        }

        if (isSelected) {
          const bgColor = toAndroidColor(cal.selectedDayBackgroundColor, '#2196F3');
          const gd = new android.graphics.drawable.GradientDrawable();
          gd.setShape(android.graphics.drawable.GradientDrawable.OVAL);
          gd.setColor(bgColor);
          dayView.setBackground(gd);
        } else if (isInRange) {
          dayView.setBackgroundColor(toAndroidColor(cal.selectedRangeColor, '#BBDEFB'));
        } else if (isToday) {
          const gd = new android.graphics.drawable.GradientDrawable();
          gd.setShape(android.graphics.drawable.GradientDrawable.OVAL);
          gd.setStroke(dipToPx(1), toAndroidColor(cal.todayTextColor, '#2196F3'));
          gd.setColor(android.graphics.Color.TRANSPARENT);
          dayView.setBackground(gd);
        } else {
          dayView.setBackground(null);
        }

        if (dotView) {
          const events = cal._getEventsForDate(jsDate);
          if (events.length > 0) {
            dotView.setVisibility(android.view.View.VISIBLE);
            const dotColor = events[0].color ? new Color(events[0].color).android : toAndroidColor(cal.todayTextColor, '#2196F3');
            const dotGd = new android.graphics.drawable.GradientDrawable();
            dotGd.setShape(android.graphics.drawable.GradientDrawable.OVAL);
            dotGd.setColor(dotColor);
            dotView.setBackground(dotGd);
          } else {
            dotView.setVisibility(android.view.View.GONE);
          }
        }

        if (!isDisabled && cal.selectionMode !== SelectionMode.None) {
          dayView.setOnClickListener(
            new android.view.View.OnClickListener({
              onClick() {
                const c = owner.deref();
                if (!c) return;
                c._handleSelection(jsDate);
                c._refreshCalendar();
              },
            }),
          );
        } else {
          dayView.setOnClickListener(null);
          dayView.setClickable(false);
        }
      },
    });
  }

  // ── Month Header Binder ──────────────────────────────────────────────

  private _createMonthHeaderBinder(): any {
    const owner = new WeakRef(this);

    return new com.kizitonwose.calendar.view.MonthHeaderFooterBinder({
      create(view: any) {
        return new MonthHeaderContainer(view);
      },
      bind(container: any, data: any) {
        const cal = owner.deref();
        if (!cal) return;

        const headerView = container.getView();
        const textView = cal._monthTitleId ? headerView.findViewById(cal._monthTitleId) : headerView;
        if (!textView || !textView.setText) return;

        const yearMonth = data.getYearMonth();
        const monthName = yearMonth.getMonth().getDisplayName(java.time.format.TextStyle.FULL, java.util.Locale.getDefault());
        textView.setText(`${monthName} ${yearMonth.getYear()}`);
        textView.setTextColor(toAndroidColor(cal.monthHeaderTextColor, '#212121'));
        textView.setTextSize(android.util.TypedValue.COMPLEX_UNIT_DIP, cal.monthHeaderFontSize || 18);
      },
    });
  }

  // ── Scroll Listeners ─────────────────────────────────────────────────

  private _createMonthScrollListener(): any {
    const owner = new WeakRef(this);
    return new kotlin.jvm.functions.Function1({
      invoke(month: any) {
        const cal = owner.deref();
        if (!cal) return;
        const ym = month.getYearMonth();
        const calMonth: CalendarMonth = { month: ym.getMonthValue(), year: ym.getYear() };
        cal._notifyMonthChanged(calMonth);
      },
    });
  }

  private _createWeekScrollListener(): any {
    const owner = new WeakRef(this);
    return new kotlin.jvm.functions.Function1({
      invoke(week: any) {
        const cal = owner.deref();
        if (!cal) return;
        const days = week.getDays();
        if (days && days.size() > 0) {
          const firstDay = days.get(0);
          const localDate = firstDay.getDate();
          const calMonth: CalendarMonth = { month: localDate.getMonthValue(), year: localDate.getYear() };
          cal._notifyMonthChanged(calMonth);
        }
      },
    });
  }

  private _createYearScrollListener(): any {
    const owner = new WeakRef(this);
    return new kotlin.jvm.functions.Function1({
      invoke(year: any) {
        const cal = owner.deref();
        if (!cal) return;
        const calMonth: CalendarMonth = { month: 1, year: year.getYear().getValue() };
        cal._notifyMonthChanged(calMonth);
      },
    });
  }

  // ── Refresh ──────────────────────────────────────────────────────────

  private _refreshCalendar() {
    if (!this._calendarView) return;
    if (this._calendarView.notifyCalendarChanged) {
      this._calendarView.notifyCalendarChanged();
    }
  }

  _refreshAfterSelectionChange(): void {
    this._refreshCalendar();
  }

  refresh(): void {
    this._refreshCalendar();
  }

  // ── View Swapping ────────────────────────────────────────────────────

  private _swapCalendarView() {
    if (!this._wrapper) return;
    this._wrapper.removeAllViews();
    this._cacheResourceIds();
    this._calendarView = this._createCalendarForMode(this.displayMode);
    if (this._calendarView) {
      this._wrapper.addView(this._calendarView);
    }
  }

  // ── Programmatic Scrolling ───────────────────────────────────────────

  scrollToDate(date: Date, animated = true, _position?: ScrollPosition): void {
    if (!this._calendarView) return;
    const localDate = jsDateToLocalDate(date);

    if (this.displayMode === DisplayMode.Month) {
      if (animated) {
        this._calendarView.smoothScrollToDate(localDate);
      } else {
        this._calendarView.scrollToDate(localDate);
      }
    } else if (this.displayMode === DisplayMode.Week) {
      if (animated) {
        this._calendarView.smoothScrollToDate(localDate);
      } else {
        this._calendarView.scrollToDate(localDate);
      }
    } else if (this.displayMode === DisplayMode.Year) {
      const ym = java.time.YearMonth.of(date.getFullYear(), date.getMonth() + 1);
      if (animated) {
        this._calendarView.smoothScrollToMonth(ym);
      } else {
        this._calendarView.scrollToMonth(ym);
      }
    }
  }

  scrollToMonth(year: number, month: number, animated = true): void {
    if (!this._calendarView) return;

    if (this.displayMode === DisplayMode.Month) {
      const ym = java.time.YearMonth.of(year, month);
      if (animated) {
        this._calendarView.smoothScrollToMonth(ym);
      } else {
        this._calendarView.scrollToMonth(ym);
      }
    } else if (this.displayMode === DisplayMode.Week) {
      const date = java.time.LocalDate.of(year, month, 1);
      if (animated) {
        this._calendarView.smoothScrollToDate(date);
      } else {
        this._calendarView.scrollToDate(date);
      }
    } else if (this.displayMode === DisplayMode.Year) {
      const ym = java.time.YearMonth.of(year, month);
      if (animated) {
        this._calendarView.smoothScrollToMonth(ym);
      } else {
        this._calendarView.scrollToMonth(ym);
      }
    }
  }

  // ── Property Setters ─────────────────────────────────────────────────

  [displayModeProperty.setNative](_value: DisplayMode) {
    this._swapCalendarView();
  }

  [orientationProperty.setNative](_value: Orientation) {
    this._swapCalendarView();
  }

  [scrollPagedProperty.setNative](value: boolean) {
    if (this._calendarView && this._calendarView.scrollPaged !== undefined) {
      this._calendarView.scrollPaged = value;
    }
  }

  [selectionModeProperty.setNative](_value: SelectionMode) {
    this.clearSelection();
    this._refreshCalendar();
  }

  [minDateProperty.setNative](_value: Date) {
    this._swapCalendarView();
  }

  [maxDateProperty.setNative](_value: Date) {
    this._swapCalendarView();
  }

  [firstDayOfWeekProperty.setNative](_value: number) {
    this._swapCalendarView();
  }

  [selectedDatesProperty.setNative](value: Date[]) {
    this._selectedKeys.clear();
    if (value && value.length) {
      for (const d of value) {
        this._selectedKeys.add(this._toDateKey(d));
      }
    }
    this._refreshCalendar();
  }

  [selectedDateRangeProperty.setNative](value: any) {
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
    this._refreshCalendar();
  }

  [eventsProperty.setNative](_value: any) {
    this._refreshCalendar();
  }
  [interMonthSpacingProperty.setNative](_value: number) {
    this._swapCalendarView();
  }
  [outDateStyleProperty.setNative](_value: OutDateStyle) {
    this._swapCalendarView();
  }
  [monthColumnsProperty.setNative](_value: number) {
    if (this.displayMode === DisplayMode.Year) this._swapCalendarView();
  }

  // Style property setters
  [dayTextColorProperty.setNative]() {
    this._refreshCalendar();
  }
  [dayFontSizeProperty.setNative]() {
    this._refreshCalendar();
  }
  [todayTextColorProperty.setNative]() {
    this._refreshCalendar();
  }
  [todayBackgroundColorProperty.setNative]() {
    this._refreshCalendar();
  }
  [selectedDayTextColorProperty.setNative]() {
    this._refreshCalendar();
  }
  [selectedDayBackgroundColorProperty.setNative]() {
    this._refreshCalendar();
  }
  [selectedRangeColorProperty.setNative]() {
    this._refreshCalendar();
  }
  [weekendTextColorProperty.setNative]() {
    this._refreshCalendar();
  }
  [disabledDayTextColorProperty.setNative]() {
    this._refreshCalendar();
  }
  [outDateTextColorProperty.setNative]() {
    this._refreshCalendar();
  }
  [monthHeaderTextColorProperty.setNative]() {
    this._refreshCalendar();
  }
  [monthHeaderFontSizeProperty.setNative]() {
    this._refreshCalendar();
  }
  [dayOfWeekTextColorProperty.setNative]() {
    this._refreshCalendar();
  }
  [dayOfWeekFontSizeProperty.setNative]() {
    this._refreshCalendar();
  }
}
