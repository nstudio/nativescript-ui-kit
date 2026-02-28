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
  pinDaysOfWeekToTopProperty,
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

// Native type aliases

// declare const com: any;
// declare const java: any;
declare const kotlin: any;

// Helpers

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

// Range Drawable (Airbnb-style range band + circle)

let _RangeDrawable: any;

function ensureRangeDrawable() {
  if (_RangeDrawable) return;

  @NativeClass()
  class RangeDrawableImpl extends android.graphics.drawable.Drawable {
    _circleColor = 0;
    _rangeColor = 0;
    _type = 1; // 0=start, 1=middle, 2=end
    _circlePaint: android.graphics.Paint;
    _rangePaint: android.graphics.Paint;

    constructor() {
      super();
      this._circlePaint = new android.graphics.Paint(android.graphics.Paint.ANTI_ALIAS_FLAG);
      this._rangePaint = new android.graphics.Paint();
      return global.__native(this);
    }

    draw(canvas: android.graphics.Canvas) {
      const bounds = this.getBounds();
      const w = bounds.width();
      const h = bounds.height();
      const size = Math.min(w, h);
      const radius = size / 2;
      const cx = w / 2;
      const cy = h / 2;

      this._rangePaint.setColor(this._rangeColor);

      // Range band
      if (this._type === 0) {
        // Start: band fills right half
        canvas.drawRect(cx, cy - radius, w, cy + radius, this._rangePaint);
      } else if (this._type === 2) {
        // End: band fills left half
        canvas.drawRect(0, cy - radius, cx, cy + radius, this._rangePaint);
      } else {
        // Middle: band fills full width
        canvas.drawRect(0, cy - radius, w, cy + radius, this._rangePaint);
      }

      // Circle for start/end
      if (this._type !== 1) {
        this._circlePaint.setColor(this._circleColor);
        canvas.drawCircle(cx, cy, radius, this._circlePaint);
      }
    }

    setAlpha(alpha: number) {
      this._circlePaint.setAlpha(alpha);
      this._rangePaint.setAlpha(alpha);
    }

    setColorFilter(filter: any) {
      this._circlePaint.setColorFilter(filter);
      this._rangePaint.setColorFilter(filter);
    }

    getOpacity(): number {
      return android.graphics.PixelFormat.TRANSLUCENT;
    }
  }

  _RangeDrawable = RangeDrawableImpl;
}

// ViewContainer subclass

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

// Resource ID cache

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

// Main Implementation

export class NCalendar extends NCalendarCommon {
  private _wrapper: any;
  private _calendarView: any;
  private _dowHeader: any;
  private _dayTextId = 0;
  private _dotViewId = 0;
  private _monthTitleId = 0;

  // @ts-ignore
  get android(): any {
    return this._calendarView;
  }

  createNativeView() {
    ensureContainerClasses();
    ensureRangeDrawable();
    this._wrapper = new android.widget.LinearLayout(this._context);
    this._wrapper.setOrientation(android.widget.LinearLayout.VERTICAL);
    this._cacheResourceIds();
    this._buildDowHeader();
    this._calendarView = this._createCalendarForMode(this.displayMode);
    if (this._dowHeader) {
      this._wrapper.addView(this._dowHeader);
    }
    if (this._calendarView) {
      const lp = new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, 0, 1.0);
      this._calendarView.setLayoutParams(lp);
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

  // Resource ID caching

  private _cacheResourceIds() {
    const ctx = this._context;
    if (!ctx) return;
    this._dayTextId = ctx.getResources().getIdentifier('dayText', 'id', ctx.getPackageName());
    this._dotViewId = ctx.getResources().getIdentifier('dotView', 'id', ctx.getPackageName());
    this._monthTitleId = ctx.getResources().getIdentifier('monthTitle', 'id', ctx.getPackageName());
  }

  // DOW Header

  private _buildDowHeader() {
    const ctx = this._context;
    if (!ctx) return;

    this._dowHeader = new android.widget.LinearLayout(ctx);
    this._dowHeader.setOrientation(android.widget.LinearLayout.HORIZONTAL);
    this._dowHeader.setVisibility(this.pinDaysOfWeekToTop ? android.view.View.VISIBLE : android.view.View.GONE);

    const paddingV = dipToPx(6);
    this._dowHeader.setPadding(0, paddingV, 0, paddingV);

    const firstDow = this.firstDayOfWeek; // 0=Sun...6=Sat
    // Map JS day index (0=Sun) to Java DayOfWeek value (1=Mon...7=Sun)
    const jsDayOrder = [7, 1, 2, 3, 4, 5, 6];

    for (let i = 0; i < 7; i++) {
      const jsDayIndex = (firstDow + i) % 7;
      const javaDowValue = jsDayOrder[jsDayIndex]; // 1=Mon...7=Sun
      const javaDow = java.time.DayOfWeek.of(javaDowValue);
      const name = javaDow.getDisplayName(java.time.format.TextStyle.SHORT, java.util.Locale.getDefault());

      const tv = new android.widget.TextView(ctx);
      tv.setText(name);
      tv.setGravity(android.view.Gravity.CENTER);
      tv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_DIP, this.dayOfWeekFontSize || 14);
      tv.setTextColor(toAndroidColor(this.dayOfWeekTextColor, '#757575'));

      const lp = new android.widget.LinearLayout.LayoutParams(0, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, 1.0);
      tv.setLayoutParams(lp);
      this._dowHeader.addView(tv);
    }
  }

  private _updateDowHeaderStyle() {
    if (!this._dowHeader) return;
    for (let i = 0; i < this._dowHeader.getChildCount(); i++) {
      const tv = this._dowHeader.getChildAt(i);
      if (tv && tv.setTextSize) {
        tv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_DIP, this.dayOfWeekFontSize || 14);
        tv.setTextColor(toAndroidColor(this.dayOfWeekTextColor, '#757575'));
      }
    }
  }

  // Calendar Factory

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

  // Month Calendar

  private _createMonthCalendarView(): any {
    const ctx = this._context;
    if (!ctx) return null;

    const cv = new com.kizitonwose.calendar.view.CalendarView(ctx);

    cv.setDayViewResource(getDayViewResId(ctx));
    const headerRes = getMonthHeaderResId(ctx);
    if (headerRes) cv.setMonthHeaderResource(headerRes);

    cv.setOrientation(this.orientation === Orientation.Horizontal ? androidx.recyclerview.widget.RecyclerView.HORIZONTAL : androidx.recyclerview.widget.RecyclerView.VERTICAL);
    cv.setScrollPaged(this.scrollPaged);
    cv.setDaySize(com.kizitonwose.calendar.view.DaySize.Square);
    cv.setOutDateStyle(this.outDateStyle === OutDateStyle.EndOfGrid ? com.kizitonwose.calendar.core.OutDateStyle.EndOfGrid : com.kizitonwose.calendar.core.OutDateStyle.EndOfRow);

    if (this.interMonthSpacing > 0) {
      const px = dipToPx(this.interMonthSpacing);
      cv.setMonthMargins(new com.kizitonwose.calendar.view.MarginValues(0, px, 0, 0));
    }

    cv.setDayBinder(this._createMonthDayBinder());
    cv.setMonthHeaderBinder(this._createMonthHeaderBinder());
    cv.setMonthScrollListener(this._createMonthScrollListener());

    const startMonth = java.time.YearMonth.of(this.minDate.getFullYear(), this.minDate.getMonth() + 1);
    const endMonth = java.time.YearMonth.of(this.maxDate.getFullYear(), this.maxDate.getMonth() + 1);
    const firstDow = toJavaDayOfWeek(this.firstDayOfWeek);
    cv.setup(startMonth, endMonth, firstDow);

    return cv;
  }

  // Week Calendar

  private _createWeekCalendarView(): any {
    const ctx = this._context;
    if (!ctx) return null;

    const wv = new com.kizitonwose.calendar.view.WeekCalendarView(ctx);
    wv.setDayViewResource(getDayViewResId(ctx));
    wv.setScrollPaged(true);
    wv.setDaySize(com.kizitonwose.calendar.view.DaySize.Square);

    wv.setDayBinder(this._createWeekDayBinder());
    wv.setWeekScrollListener(this._createWeekScrollListener());

    const startDate = jsDateToLocalDate(this.minDate);
    const endDate = jsDateToLocalDate(this.maxDate);
    const firstDow = toJavaDayOfWeek(this.firstDayOfWeek);
    wv.setup(startDate, endDate, firstDow);

    return wv;
  }

  // Year Calendar

  private _createYearCalendarView(): any {
    const ctx = this._context;
    if (!ctx) return null;

    const yv = new com.kizitonwose.calendar.view.YearCalendarView(ctx);
    yv.setDayViewResource(getDayViewResId(ctx));
    const headerRes = getMonthHeaderResId(ctx);
    if (headerRes) yv.setMonthHeaderResource(headerRes);
    yv.setMonthColumns(this.monthColumns);
    if (this.interMonthSpacing > 0) {
      const px = dipToPx(this.interMonthSpacing);
      yv.setMonthVerticalSpacing(px);
      yv.setMonthHorizontalSpacing(px);
    }
    yv.setScrollPaged(this.scrollPaged);
    yv.setDaySize(com.kizitonwose.calendar.view.DaySize.Square);

    yv.setDayBinder(this._createMonthDayBinder());
    yv.setMonthHeaderBinder(this._createMonthHeaderBinder());
    yv.setYearScrollListener(this._createYearScrollListener());

    const startYear = java.time.Year.of(this.minDate.getFullYear());
    const endYear = java.time.Year.of(this.maxDate.getFullYear());
    const firstDow = toJavaDayOfWeek(this.firstDayOfWeek);
    yv.setup(startYear, endYear, firstDow);

    return yv;
  }

  // Day Binder (Month / Year)

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

        // Range position detection
        const dateKey = cal._toDateKey(jsDate);
        const isRangeStart = isMonthDate && cal._rangeStart != null && cal._rangeEnd != null && dateKey === cal._toDateKey(cal._rangeStart);
        const isRangeEnd = isMonthDate && cal._rangeStart != null && cal._rangeEnd != null && dateKey === cal._toDateKey(cal._rangeEnd);
        const isSingleDayRange = isRangeStart && isRangeEnd;
        const isMiddleOfRange = isMonthDate && isInRange && !isRangeStart && !isRangeEnd;

        if (textView && textView.setText) {
          textView.setText(String(dayNum));
          textView.setTextSize(android.util.TypedValue.COMPLEX_UNIT_DIP, cal.dayFontSize || 14);

          if (!isMonthDate) {
            textView.setTextColor(toAndroidColor(cal.outDateTextColor, '#BDBDBD'));
          } else if (isDisabled) {
            textView.setTextColor(toAndroidColor(cal.disabledDayTextColor, '#E0E0E0'));
          } else if (isRangeStart || isRangeEnd) {
            textView.setTextColor(toAndroidColor(cal.selectedDayTextColor, '#FFFFFF'));
          } else if (isMiddleOfRange) {
            textView.setTextColor(toAndroidColor(cal.dayTextColor, '#212121'));
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
        if (isMonthDate && (isRangeStart || isRangeEnd || isMiddleOfRange) && !isSingleDayRange) {
          // Airbnb-style range rendering
          const rd = new _RangeDrawable();
          rd._circleColor = toAndroidColor(cal.selectedDayBackgroundColor, '#2196F3');
          rd._rangeColor = toAndroidColor(cal.selectedRangeColor, '#BBDEFB');
          if (isRangeStart) {
            rd._type = 0;
          } else if (isRangeEnd) {
            rd._type = 2;
          } else {
            rd._type = 1;
          }
          dayView.setBackground(rd);
        } else if (isMonthDate && isSelected) {
          const bgColor = toAndroidColor(cal.selectedDayBackgroundColor, '#2196F3');
          const gd = new android.graphics.drawable.GradientDrawable();
          gd.setShape(android.graphics.drawable.GradientDrawable.OVAL);
          gd.setColor(bgColor);
          dayView.setBackground(gd);
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

                // Range selection affects many cells (start, end, and all middle dates),
                // so do a full refresh. For single/multiple, targeted refresh is sufficient.
                if (c.selectionMode === SelectionMode.Range) {
                  c._refreshCalendar();
                } else if (c.displayMode === DisplayMode.Month && c._calendarView) {
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

  // Week Day Binder

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

        // Range position detection
        const dateKey = cal._toDateKey(jsDate);
        const isRangeStart = cal._rangeStart != null && cal._rangeEnd != null && dateKey === cal._toDateKey(cal._rangeStart);
        const isRangeEnd = cal._rangeStart != null && cal._rangeEnd != null && dateKey === cal._toDateKey(cal._rangeEnd);
        const isSingleDayRange = isRangeStart && isRangeEnd;
        const isMiddleOfRange = isInRange && !isRangeStart && !isRangeEnd;

        if (textView && textView.setText) {
          textView.setText(String(dayNum));
          textView.setTextSize(android.util.TypedValue.COMPLEX_UNIT_DIP, cal.dayFontSize || 14);

          if (isDisabled) {
            textView.setTextColor(toAndroidColor(cal.disabledDayTextColor, '#E0E0E0'));
          } else if (isRangeStart || isRangeEnd) {
            textView.setTextColor(toAndroidColor(cal.selectedDayTextColor, '#FFFFFF'));
          } else if (isMiddleOfRange) {
            textView.setTextColor(toAndroidColor(cal.dayTextColor, '#212121'));
          } else if (isSelected) {
            textView.setTextColor(toAndroidColor(cal.selectedDayTextColor, '#FFFFFF'));
          } else if (isToday) {
            textView.setTextColor(toAndroidColor(cal.todayTextColor, '#2196F3'));
          } else {
            textView.setTextColor(toAndroidColor(cal.dayTextColor, '#212121'));
          }
        }

        if ((isRangeStart || isRangeEnd || isMiddleOfRange) && !isSingleDayRange) {
          const rd = new _RangeDrawable();
          rd._circleColor = toAndroidColor(cal.selectedDayBackgroundColor, '#2196F3');
          rd._rangeColor = toAndroidColor(cal.selectedRangeColor, '#BBDEFB');
          if (isRangeStart) {
            rd._type = 0;
          } else if (isRangeEnd) {
            rd._type = 2;
          } else {
            rd._type = 1;
          }
          dayView.setBackground(rd);
        } else if (isSelected) {
          const bgColor = toAndroidColor(cal.selectedDayBackgroundColor, '#2196F3');
          const gd = new android.graphics.drawable.GradientDrawable();
          gd.setShape(android.graphics.drawable.GradientDrawable.OVAL);
          gd.setColor(bgColor);
          dayView.setBackground(gd);
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

  // Month Header Binder

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

  // Scroll Listeners

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

  // Refresh

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

  // View Swapping

  private _swapCalendarView() {
    if (!this._wrapper) return;
    this._wrapper.removeAllViews();
    this._cacheResourceIds();
    this._buildDowHeader();
    this._calendarView = this._createCalendarForMode(this.displayMode);
    if (this._dowHeader) {
      this._wrapper.addView(this._dowHeader);
    }
    if (this._calendarView) {
      const lp = new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, 0, 1.0);
      this._calendarView.setLayoutParams(lp);
      this._wrapper.addView(this._calendarView);
    }
  }

  // Programmatic Scrolling

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

  // Property Setters

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
    if (this._internalSelectionChange) return;
    this._selectedKeys.clear();
    if (value && value.length) {
      for (const d of value) {
        this._selectedKeys.add(this._toDateKey(d));
      }
    }
    this._refreshCalendar();
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
    this._refreshCalendar();
  }

  [eventsProperty.setNative](_value: any) {
    this._refreshCalendar();
  }
  [interMonthSpacingProperty.setNative](_value: number) {
    this._swapCalendarView();
  }
  // @ts-ignore
  [outDateStyleProperty.setNative](_value: OutDateStyle) {
    this._swapCalendarView();
  }
  [monthColumnsProperty.setNative](_value: number) {
    if (this.displayMode === DisplayMode.Year) this._swapCalendarView();
  }
  [pinDaysOfWeekToTopProperty.setNative](value: boolean) {
    if (this._dowHeader) {
      this._dowHeader.setVisibility(value ? android.view.View.VISIBLE : android.view.View.GONE);
    }
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
    this._updateDowHeaderStyle();
    this._refreshCalendar();
  }
  [dayOfWeekFontSizeProperty.setNative]() {
    this._updateDowHeaderStyle();
    this._refreshCalendar();
  }
}
