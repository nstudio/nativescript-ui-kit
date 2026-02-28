declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export class Binder<Data, Container> extends java.lang.Object {
          public static class: java.lang.Class<com.kizitonwose.calendar.view.Binder<any, any>>;
          /**
           * Constructs a new instance of the com.kizitonwose.calendar.view.Binder<any,any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { create(param0: globalAndroid.view.View): Container; bind(param0: Container, param1: Data): void });
          public constructor();
          public create(param0: globalAndroid.view.View): Container;
          public bind(param0: Container, param1: Data): void;
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export class CalendarView {
          public static class: java.lang.Class<com.kizitonwose.calendar.view.CalendarView>;
          public setMonthFooterResource(value: number): void;
          public getScrollPaged(): boolean;
          public scrollToDay(day: com.kizitonwose.calendar.core.CalendarDay): void;
          public getMonthViewClass(): string;
          public notifyDateChanged(days: java.time.LocalDate, it: androidNative.Array<com.kizitonwose.calendar.core.DayPosition>): void;
          public getOutDateStyle(): com.kizitonwose.calendar.core.OutDateStyle;
          public smoothScrollToDate(date: java.time.LocalDate): void;
          public notifyDayChanged(day: com.kizitonwose.calendar.core.CalendarDay): void;
          public scrollToDate(date: java.time.LocalDate, position: com.kizitonwose.calendar.core.DayPosition): void;
          public setup(startMonth: java.time.YearMonth, endMonth: java.time.YearMonth, firstDayOfWeek: java.time.DayOfWeek): void;
          public getOrientation(): number;
          public getDaySize(): com.kizitonwose.calendar.view.DaySize;
          public getMonthFooterResource(): number;
          public updateMonthData(startMonth: java.time.YearMonth): void;
          public setDayBinder(value: com.kizitonwose.calendar.view.MonthDayBinder<any>): void;
          public setMonthHeaderResource(value: number): void;
          public findFirstVisibleDay(): com.kizitonwose.calendar.core.CalendarDay;
          public setMonthHeaderBinder(value: com.kizitonwose.calendar.view.MonthHeaderFooterBinder<any>): void;
          public setDayViewResource(this_: number): void;
          public getMonthHeaderResource(): number;
          public setScrollPaged(value: boolean): void;
          public notifyCalendarChanged(): void;
          public setMonthMargins(value: com.kizitonwose.calendar.view.MarginValues): void;
          public constructor(context: globalAndroid.content.Context);
          public smoothScrollToDate(date: java.time.LocalDate, position: com.kizitonwose.calendar.core.DayPosition): void;
          public scrollToDate(date: java.time.LocalDate): void;
          public findLastVisibleDay(): com.kizitonwose.calendar.core.CalendarDay;
          public getMonthScrollListener(): any;
          public updateMonthData(startMonth: java.time.YearMonth, endMonth: java.time.YearMonth, firstDayOfWeek: java.time.DayOfWeek): void;
          public getDayViewResource(): number;
          public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet);
          public notifyDateChanged(date: java.time.LocalDate, position: com.kizitonwose.calendar.core.DayPosition): void;
          public setMonthViewClass(value: string): void;
          public scrollToMonth(month: java.time.YearMonth): void;
          public findFirstVisibleMonth(): com.kizitonwose.calendar.core.CalendarMonth;
          public smoothScrollToDay(day: com.kizitonwose.calendar.core.CalendarDay): void;
          public notifyMonthChanged(month: java.time.YearMonth): void;
          public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet, defStyleAttr: number);
          public findLastVisibleMonth(): com.kizitonwose.calendar.core.CalendarMonth;
          public getMonthMargins(): com.kizitonwose.calendar.view.MarginValues;
          public setDaySize(value: com.kizitonwose.calendar.view.DaySize): void;
          public getDayBinder(): com.kizitonwose.calendar.view.MonthDayBinder<any>;
          public notifyDateChanged(date: java.time.LocalDate): void;
          public updateMonthData(): void;
          public updateMonthData(startMonth: java.time.YearMonth, endMonth: java.time.YearMonth): void;
          public getMonthFooterBinder(): com.kizitonwose.calendar.view.MonthHeaderFooterBinder<any>;
          public setMonthFooterBinder(value: com.kizitonwose.calendar.view.MonthHeaderFooterBinder<any>): void;
          public setOrientation(value: number): void;
          public smoothScrollToMonth(month: java.time.YearMonth): void;
          public getMonthHeaderBinder(): com.kizitonwose.calendar.view.MonthHeaderFooterBinder<any>;
          public setMonthScrollListener(value: any): void;
          public setOutDateStyle(value: com.kizitonwose.calendar.core.OutDateStyle): void;
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export class DaySize {
          public static class: java.lang.Class<com.kizitonwose.calendar.view.DaySize>;
          public static Square: com.kizitonwose.calendar.view.DaySize;
          public static Rectangle: com.kizitonwose.calendar.view.DaySize;
          public static SeventhWidth: com.kizitonwose.calendar.view.DaySize;
          public static FreeForm: com.kizitonwose.calendar.view.DaySize;
          public getParentDecidesWidth$view_release(): boolean;
          public static getEntries(): any;
          public getParentDecidesHeight$view_release(): boolean;
          public static valueOf(value: string): com.kizitonwose.calendar.view.DaySize;
          public static values(): androidNative.Array<com.kizitonwose.calendar.view.DaySize>;
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export class MarginValues {
          public static class: java.lang.Class<com.kizitonwose.calendar.view.MarginValues>;
          public copy(start: number, top: number, end: number, bottom: number): com.kizitonwose.calendar.view.MarginValues;
          public getBottom(): number;
          public component3(): number;
          public getEnd(): number;
          public equals(other: any): boolean;
          public constructor(horizontal: number, vertical: number);
          public getTop(): number;
          public getStart(): number;
          public toString(): string;
          public component4(): number;
          public constructor();
          public component1(): number;
          public component2(): number;
          public constructor(start: number, top: number, end: number, bottom: number);
          public hashCode(): number;
        }
        export module MarginValues {
          export class Companion {
            public static class: java.lang.Class<com.kizitonwose.calendar.view.MarginValues.Companion>;
            public getZERO(): com.kizitonwose.calendar.view.MarginValues;
          }
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export class MonthDayBinder<Container> extends com.kizitonwose.calendar.view.Binder<com.kizitonwose.calendar.core.CalendarDay, any> {
          public static class: java.lang.Class<com.kizitonwose.calendar.view.MonthDayBinder<any>>;
          /**
           * Constructs a new instance of the com.kizitonwose.calendar.view.MonthDayBinder<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { create(param0: globalAndroid.view.View): any; bind(param0: any, param1: any): void });
          public constructor();
          public bind(param0: any, param1: any): void;
          public create(param0: globalAndroid.view.View): any;
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export class MonthHeaderFooterBinder<Container> extends com.kizitonwose.calendar.view.Binder<com.kizitonwose.calendar.core.CalendarMonth, any> {
          public static class: java.lang.Class<com.kizitonwose.calendar.view.MonthHeaderFooterBinder<any>>;
          /**
           * Constructs a new instance of the com.kizitonwose.calendar.view.MonthHeaderFooterBinder<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { create(param0: globalAndroid.view.View): any; bind(param0: any, param1: any): void });
          public constructor();
          public bind(param0: any, param1: any): void;
          public create(param0: globalAndroid.view.View): any;
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export class MonthHeight {
          public static class: java.lang.Class<com.kizitonwose.calendar.view.MonthHeight>;
          public static FollowDaySize: com.kizitonwose.calendar.view.MonthHeight;
          public static Fill: com.kizitonwose.calendar.view.MonthHeight;
          public static values(): androidNative.Array<com.kizitonwose.calendar.view.MonthHeight>;
          public static getEntries(): any;
          public static valueOf(value: string): com.kizitonwose.calendar.view.MonthHeight;
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export class ViewContainer {
          public static class: java.lang.Class<com.kizitonwose.calendar.view.ViewContainer>;
          public getView(): globalAndroid.view.View;
          public constructor(view: globalAndroid.view.View);
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export class WeekCalendarView {
          public static class: java.lang.Class<com.kizitonwose.calendar.view.WeekCalendarView>;
          public getWeekViewClass(): string;
          public getDayViewResource(): number;
          public scrollToDay(day: com.kizitonwose.calendar.core.WeekDay): void;
          public updateWeekData(startDate: java.time.LocalDate, endDate: java.time.LocalDate, firstDayOfWeek: java.time.DayOfWeek): void;
          public getWeekHeaderResource(): number;
          public setWeekFooterResource(value: number): void;
          public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet);
          public getWeekMargins(): com.kizitonwose.calendar.view.MarginValues;
          public updateWeekData(startDate: java.time.LocalDate): void;
          public getScrollPaged(): boolean;
          public smoothScrollToWeek(day: com.kizitonwose.calendar.core.WeekDay): void;
          public getWeekFooterBinder(): com.kizitonwose.calendar.view.WeekHeaderFooterBinder<any>;
          public notifyWeekChanged(date: java.time.LocalDate): void;
          public smoothScrollToDate(date: java.time.LocalDate): void;
          public getDayBinder(): com.kizitonwose.calendar.view.WeekDayBinder<any>;
          public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet, defStyleAttr: number);
          public getWeekFooterResource(): number;
          public scrollToWeek(date: java.time.LocalDate): void;
          public findLastVisibleDay(): com.kizitonwose.calendar.core.WeekDay;
          public notifyDayChanged(day: com.kizitonwose.calendar.core.WeekDay): void;
          public setWeekMargins(value: com.kizitonwose.calendar.view.MarginValues): void;
          public setDaySize(value: com.kizitonwose.calendar.view.DaySize): void;
          public getDaySize(): com.kizitonwose.calendar.view.DaySize;
          public setDayBinder(value: com.kizitonwose.calendar.view.WeekDayBinder<any>): void;
          public notifyDateChanged(date: java.time.LocalDate): void;
          public findFirstVisibleWeek(): com.kizitonwose.calendar.core.Week;
          public updateWeekData(startDate: java.time.LocalDate, endDate: java.time.LocalDate): void;
          public scrollToWeek(day: com.kizitonwose.calendar.core.WeekDay): void;
          public notifyWeekChanged(day: com.kizitonwose.calendar.core.WeekDay): void;
          public setup(startDate: java.time.LocalDate, endDate: java.time.LocalDate, firstDayOfWeek: java.time.DayOfWeek): void;
          public setWeekHeaderResource(value: number): void;
          public getWeekScrollListener(): any;
          public setWeekFooterBinder(value: com.kizitonwose.calendar.view.WeekHeaderFooterBinder<any>): void;
          public setWeekScrollListener(value: any): void;
          public findLastVisibleWeek(): com.kizitonwose.calendar.core.Week;
          public setWeekViewClass(value: string): void;
          public setDayViewResource(this_: number): void;
          public setScrollPaged(value: boolean): void;
          public notifyCalendarChanged(): void;
          public getWeekHeaderBinder(): com.kizitonwose.calendar.view.WeekHeaderFooterBinder<any>;
          public constructor(context: globalAndroid.content.Context);
          public scrollToDate(date: java.time.LocalDate): void;
          public smoothScrollToDay(day: com.kizitonwose.calendar.core.WeekDay): void;
          public smoothScrollToWeek(date: java.time.LocalDate): void;
          public setWeekHeaderBinder(value: com.kizitonwose.calendar.view.WeekHeaderFooterBinder<any>): void;
          public findFirstVisibleDay(): com.kizitonwose.calendar.core.WeekDay;
          public updateWeekData(): void;
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export class WeekDayBinder<Container> extends com.kizitonwose.calendar.view.Binder<com.kizitonwose.calendar.core.WeekDay, any> {
          public static class: java.lang.Class<com.kizitonwose.calendar.view.WeekDayBinder<any>>;
          /**
           * Constructs a new instance of the com.kizitonwose.calendar.view.WeekDayBinder<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { create(param0: globalAndroid.view.View): any; bind(param0: any, param1: any): void });
          public constructor();
          public bind(param0: any, param1: any): void;
          public create(param0: globalAndroid.view.View): any;
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export class WeekHeaderFooterBinder<Container> extends com.kizitonwose.calendar.view.Binder<com.kizitonwose.calendar.core.Week, any> {
          public static class: java.lang.Class<com.kizitonwose.calendar.view.WeekHeaderFooterBinder<any>>;
          /**
           * Constructs a new instance of the com.kizitonwose.calendar.view.WeekHeaderFooterBinder<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { create(param0: globalAndroid.view.View): any; bind(param0: any, param1: any): void });
          public constructor();
          public bind(param0: any, param1: any): void;
          public create(param0: globalAndroid.view.View): any;
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export class YearCalendarView {
          public static class: java.lang.Class<com.kizitonwose.calendar.view.YearCalendarView>;
          public setYearFooterBinder(value: com.kizitonwose.calendar.view.YearHeaderFooterBinder<any>): void;
          public updateYearData(startYear: java.time.Year, endYear: java.time.Year, firstDayOfWeek: java.time.DayOfWeek): void;
          public isMonthVisible(): any;
          public setup(startYear: java.time.Year, endYear: java.time.Year, firstDayOfWeek: java.time.DayOfWeek): void;
          public setMonthHeight(value: com.kizitonwose.calendar.view.MonthHeight): void;
          public setMonthFooterResource(value: number): void;
          public getScrollPaged(): boolean;
          public scrollToDay(day: com.kizitonwose.calendar.core.CalendarDay): void;
          public getMonthViewClass(): string;
          public setYearViewClass(value: string): void;
          public getOutDateStyle(): com.kizitonwose.calendar.core.OutDateStyle;
          public getYearMargins(): com.kizitonwose.calendar.view.MarginValues;
          public smoothScrollToDate(date: java.time.LocalDate): void;
          public notifyDayChanged(day: com.kizitonwose.calendar.core.CalendarDay): void;
          public scrollToYear(year: java.time.Year): void;
          public scrollToDate(date: java.time.LocalDate, position: com.kizitonwose.calendar.core.DayPosition): void;
          public findFirstVisibleYear(): com.kizitonwose.calendar.core.CalendarYear;
          public setMonthColumns(this_: number): void;
          public getOrientation(): number;
          public notifyDateChanged(days: java.time.LocalDate, it: androidNative.Array<com.kizitonwose.calendar.core.DayPosition>): void;
          public getDaySize(): com.kizitonwose.calendar.view.DaySize;
          public getMonthFooterResource(): number;
          public setYearHeaderResource(value: number): void;
          public setDayBinder(value: com.kizitonwose.calendar.view.MonthDayBinder<any>): void;
          public setMonthVerticalSpacing(value: number): void;
          public setMonthHeaderResource(value: number): void;
          public findFirstVisibleDay(): com.kizitonwose.calendar.core.CalendarDay;
          public smoothScrollToYear(year: java.time.Year): void;
          public setMonthHeaderBinder(value: com.kizitonwose.calendar.view.MonthHeaderFooterBinder<any>): void;
          public setDayViewResource(this_: number): void;
          public getMonthHeaderResource(): number;
          public setScrollPaged(value: boolean): void;
          public updateYearData(startYear: java.time.Year): void;
          public notifyCalendarChanged(): void;
          public getYearFooterBinder(): com.kizitonwose.calendar.view.YearHeaderFooterBinder<any>;
          public setMonthHorizontalSpacing(value: number): void;
          public constructor(context: globalAndroid.content.Context);
          public getYearScrollListener(): any;
          public smoothScrollToDate(date: java.time.LocalDate, position: com.kizitonwose.calendar.core.DayPosition): void;
          public scrollToDate(date: java.time.LocalDate): void;
          public findLastVisibleDay(): com.kizitonwose.calendar.core.CalendarDay;
          public setYearMargins(value: com.kizitonwose.calendar.view.MarginValues): void;
          public getYearHeaderBinder(): com.kizitonwose.calendar.view.YearHeaderFooterBinder<any>;
          public getDayViewResource(): number;
          public notifyYearChanged(year: java.time.Year): void;
          public getMonthVerticalSpacing(): number;
          public setYearFooterResource(value: number): void;
          public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet);
          public notifyDateChanged(date: java.time.LocalDate, position: com.kizitonwose.calendar.core.DayPosition): void;
          public updateYearData(): void;
          public setYearHeaderBinder(value: com.kizitonwose.calendar.view.YearHeaderFooterBinder<any>): void;
          public setMonthViewClass(value: string): void;
          public scrollToMonth(month: java.time.YearMonth): void;
          public findFirstVisibleMonth(): com.kizitonwose.calendar.core.CalendarMonth;
          public smoothScrollToDay(day: com.kizitonwose.calendar.core.CalendarDay): void;
          public setYearBodyMargins(value: com.kizitonwose.calendar.view.MarginValues): void;
          public notifyMonthChanged(month: java.time.YearMonth): void;
          public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet, defStyleAttr: number);
          public findLastVisibleMonth(): com.kizitonwose.calendar.core.CalendarMonth;
          public getYearBodyMargins(): com.kizitonwose.calendar.view.MarginValues;
          public setDaySize(value: com.kizitonwose.calendar.view.DaySize): void;
          public getDayBinder(): com.kizitonwose.calendar.view.MonthDayBinder<any>;
          public notifyDateChanged(date: java.time.LocalDate): void;
          public getMonthFooterBinder(): com.kizitonwose.calendar.view.MonthHeaderFooterBinder<any>;
          public setMonthVisible(value: any): void;
          public setMonthFooterBinder(value: com.kizitonwose.calendar.view.MonthHeaderFooterBinder<any>): void;
          public getYearViewClass(): string;
          public updateYearData(startYear: java.time.Year, endYear: java.time.Year): void;
          public getYearHeaderResource(): number;
          public setOrientation(value: number): void;
          public getMonthHeight(): com.kizitonwose.calendar.view.MonthHeight;
          public smoothScrollToMonth(month: java.time.YearMonth): void;
          public getMonthHorizontalSpacing(): number;
          public getMonthColumns(): number;
          public getYearFooterResource(): number;
          public findLastVisibleYear(): com.kizitonwose.calendar.core.CalendarYear;
          public getMonthHeaderBinder(): com.kizitonwose.calendar.view.MonthHeaderFooterBinder<any>;
          public setYearScrollListener(value: any): void;
          public setOutDateStyle(value: com.kizitonwose.calendar.core.OutDateStyle): void;
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export class YearHeaderFooterBinder<Container> extends com.kizitonwose.calendar.view.Binder<com.kizitonwose.calendar.core.CalendarYear, any> {
          public static class: java.lang.Class<com.kizitonwose.calendar.view.YearHeaderFooterBinder<any>>;
          /**
           * Constructs a new instance of the com.kizitonwose.calendar.view.YearHeaderFooterBinder<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { create(param0: globalAndroid.view.View): any; bind(param0: any, param1: any): void });
          public constructor();
          public bind(param0: any, param1: any): void;
          public create(param0: globalAndroid.view.View): any;
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export module internal {
          export abstract class CalendarLayoutManager<IndexData, DayData> extends androidx.recyclerview.widget.LinearLayoutManager {
            public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.CalendarLayoutManager<any, any>>;
            public getDayTag(param0: any): number;
            public getaItemAdapterPosition(param0: any): number;
            public smoothScrollToDay(this_: any): void;
            public smoothScrollToIndex(this_: any): void;
            public constructor(calView: androidx.recyclerview.widget.RecyclerView, orientation: number);
            public getItemMargins(): com.kizitonwose.calendar.view.MarginValues;
            public scrollToIndex(this_: any): void;
            public scrollPaged(): boolean;
            public scrollToDay(this_: any): void;
            public getaDayAdapterPosition(param0: any): number;
            public notifyScrollListenerIfNeeded(): void;
          }
          export module CalendarLayoutManager {
            export class CalendarSmoothScroller {
              public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.CalendarLayoutManager.CalendarSmoothScroller>;
              public constructor(this$0: number, position: any);
              public calculateDyToMakeVisible(offset: globalAndroid.view.View, this_: number): number;
              public getHorizontalSnapPreference(): number;
              public calculateDxToMakeVisible(offset: globalAndroid.view.View, this_: number): number;
              public getDay(): any;
              public getVerticalSnapPreference(): number;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export module internal {
          export class CalendarPageSnapHelper {
            public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.CalendarPageSnapHelper>;
            public constructor();
            public calculateDistanceToFinalSnap($this$calculateDistanceToFinalSnap_u24lambda_u240: androidx.recyclerview.widget.RecyclerView.LayoutManager, this_: globalAndroid.view.View): androidNative.Array<number>;
            public findSnapView(nextPos: androidx.recyclerview.widget.RecyclerView.LayoutManager): globalAndroid.view.View;
            public attachToRecyclerView(recyclerView: androidx.recyclerview.widget.RecyclerView): void;
            public findTargetSnapPosition(it: androidx.recyclerview.widget.RecyclerView.LayoutManager, targetPosition: number, this_: number): number;
          }
          export module CalendarPageSnapHelper {
            export class WhenMappings {
              public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.CalendarPageSnapHelper.WhenMappings>;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export module internal {
          export class CalendarPageSnapHelperLegacy {
            public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.CalendarPageSnapHelperLegacy>;
            public constructor();
            public calculateDistanceToFinalSnap($this$calculateDistanceToFinalSnap_u24lambda_u240: androidx.recyclerview.widget.RecyclerView.LayoutManager, this_: globalAndroid.view.View): androidNative.Array<number>;
          }
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export module internal {
          export class DayConfig<Day> extends java.lang.Object {
            public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.DayConfig<any>>;
            public component2(): number;
            public equals(other: any): boolean;
            public constructor(daySize: com.kizitonwose.calendar.view.DaySize, dayViewRes: number, dayBinder: com.kizitonwose.calendar.view.Binder<Day, com.kizitonwose.calendar.view.ViewContainer>);
            public getDayBinder(): com.kizitonwose.calendar.view.Binder<Day, com.kizitonwose.calendar.view.ViewContainer>;
            public component3(): com.kizitonwose.calendar.view.Binder<Day, com.kizitonwose.calendar.view.ViewContainer>;
            public hashCode(): number;
            public copy(daySize: com.kizitonwose.calendar.view.DaySize, dayViewRes: number, dayBinder: com.kizitonwose.calendar.view.Binder<Day, com.kizitonwose.calendar.view.ViewContainer>): com.kizitonwose.calendar.view.internal.DayConfig<Day>;
            public getDaySize(): com.kizitonwose.calendar.view.DaySize;
            public component1(): com.kizitonwose.calendar.view.DaySize;
            public getDayViewRes(): number;
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export module internal {
          export class DayHolder<Day> extends java.lang.Object {
            public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.DayHolder<any>>;
            public inflateDayView($this$inflateDayView_u24lambda_u241_u24lambda_u240: globalAndroid.widget.LinearLayout): globalAndroid.view.View;
            public reloadViewIfNecessary(day: Day): boolean;
            public constructor(config: com.kizitonwose.calendar.view.internal.DayConfig<Day>);
            public bindDayView(currentDay: Day): void;
          }
          export module DayHolder {
            export class WhenMappings {
              public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.DayHolder.WhenMappings>;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export module internal {
          export module ExtensionsKt {
            export class WhenMappings {
              public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.ExtensionsKt.WhenMappings>;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export module internal {
          export class ItemContent<Day> extends java.lang.Object {
            public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.ItemContent<any>>;
            public component3(): globalAndroid.view.View;
            public equals(other: any): boolean;
            public getFooterView(): globalAndroid.view.View;
            public component1(): globalAndroid.view.ViewGroup;
            public hashCode(): number;
            public getItemView(): globalAndroid.view.ViewGroup;
            public getWeekHolders(): java.util.List<com.kizitonwose.calendar.view.internal.WeekHolder<Day>>;
            public toString(): string;
            public getHeaderView(): globalAndroid.view.View;
            public component2(): globalAndroid.view.View;
            public component4(): java.util.List<com.kizitonwose.calendar.view.internal.WeekHolder<Day>>;
            public constructor(itemView: globalAndroid.view.ViewGroup, headerView: globalAndroid.view.View, footerView: globalAndroid.view.View, weekHolders: java.util.List<com.kizitonwose.calendar.view.internal.WeekHolder<Day>>);
            public copy(itemView: globalAndroid.view.ViewGroup, headerView: globalAndroid.view.View, footerView: globalAndroid.view.View, weekHolders: java.util.List<com.kizitonwose.calendar.view.internal.WeekHolder<Day>>): com.kizitonwose.calendar.view.internal.ItemContent<Day>;
          }
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export module internal {
          export class ScrollAction {
            public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.ScrollAction>;
            public static Forward: com.kizitonwose.calendar.view.internal.ScrollAction;
            public static Backward: com.kizitonwose.calendar.view.internal.ScrollAction;
            public static Layout: com.kizitonwose.calendar.view.internal.ScrollAction;
            public static valueOf(value: string): com.kizitonwose.calendar.view.internal.ScrollAction;
            public static getEntries(): any;
            public static values(): androidNative.Array<com.kizitonwose.calendar.view.internal.ScrollAction>;
          }
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export module internal {
          export class WeekHolder<Day> extends java.lang.Object {
            public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.WeekHolder<any>>;
            public reloadDay(it: Day): boolean;
            public inflateWeekView(week: globalAndroid.widget.LinearLayout): globalAndroid.view.View;
            public constructor(daySize: com.kizitonwose.calendar.view.DaySize, dayHolders: java.util.List<com.kizitonwose.calendar.view.internal.DayHolder<Day>>);
            public bindWeekView($this$isGone$iv: java.util.List<any>): void;
          }
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export module internal {
          export class WidthDivisorLinearLayout {
            public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.WidthDivisorLinearLayout>;
            public onLayout($this$isGone$iv: boolean, widthDivisor: number, it: number, element$iv: number, $i$f$none: number): void;
            public onMeasure(heightMeasureSpec: number, this_: number): void;
            public getWidthDivisorForHeight(): number;
            public setWidthDivisorForHeight(value: number): void;
            public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet);
            public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet, defStyle: number);
            public constructor(context: globalAndroid.content.Context);
          }
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export module internal {
          export module monthcalendar {
            export class MonthCalendarAdapter extends androidx.recyclerview.widget.RecyclerView.Adapter<com.kizitonwose.calendar.view.internal.monthcalendar.MonthViewHolder> {
              public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.monthcalendar.MonthCalendarAdapter>;
              public getAdapterPosition$view_release(day: com.kizitonwose.calendar.core.CalendarDay): number;
              public onAttachedToRecyclerView(recyclerView: androidx.recyclerview.widget.RecyclerView): void;
              public onBindViewHolder(holder: com.kizitonwose.calendar.view.internal.monthcalendar.MonthViewHolder, position: number): void;
              public constructor(calView: com.kizitonwose.calendar.view.CalendarView, outDateStyle: com.kizitonwose.calendar.core.OutDateStyle, startMonth: java.time.YearMonth, endMonth: java.time.YearMonth, firstDayOfWeek: java.time.DayOfWeek);
              public findFirstVisibleMonth(): com.kizitonwose.calendar.core.CalendarMonth;
              public onBindViewHolder(it: com.kizitonwose.calendar.view.internal.monthcalendar.MonthViewHolder, element$iv: number, $i$f$forEach: java.util.List<any>): void;
              public getAdapterPosition$view_release(month: java.time.YearMonth): number;
              public findFirstVisibleDay(): com.kizitonwose.calendar.core.CalendarDay;
              public findLastVisibleDay(): com.kizitonwose.calendar.core.CalendarDay;
              public reloadMonth(month: java.time.YearMonth): void;
              public reloadDay(position: androidNative.Array<com.kizitonwose.calendar.core.CalendarDay>): void;
              public notifyMonthScrollListenerIfNeeded(): void;
              public getItemCount(): number;
              public findLastVisibleMonth(): com.kizitonwose.calendar.core.CalendarMonth;
              public onCreateViewHolder(this_: globalAndroid.view.ViewGroup, parent: number): com.kizitonwose.calendar.view.internal.monthcalendar.MonthViewHolder;
              public getItemId(position: number): number;
              public reloadCalendar(): void;
              public updateData$view_release(startMonth: java.time.YearMonth, endMonth: java.time.YearMonth, outDateStyle: com.kizitonwose.calendar.core.OutDateStyle, firstDayOfWeek: java.time.DayOfWeek): void;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export module internal {
          export module monthcalendar {
            export class MonthCalendarLayoutManager extends com.kizitonwose.calendar.view.internal.CalendarLayoutManager<java.time.YearMonth, com.kizitonwose.calendar.core.CalendarDay> {
              public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.monthcalendar.MonthCalendarLayoutManager>;
              public getaItemAdapterPosition(data: java.time.YearMonth): number;
              public notifyScrollListenerIfNeeded(): void;
              public getDayTag(data: com.kizitonwose.calendar.core.CalendarDay): number;
              public getaItemAdapterPosition(param0: any): number;
              public getItemMargins(): com.kizitonwose.calendar.view.MarginValues;
              public constructor(calView: com.kizitonwose.calendar.view.CalendarView);
              public constructor(calView: androidx.recyclerview.widget.RecyclerView, orientation: number);
              public getaDayAdapterPosition(param0: any): number;
              public getDayTag(param0: any): number;
              public scrollPaged(): boolean;
              public getaDayAdapterPosition(data: com.kizitonwose.calendar.core.CalendarDay): number;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export module internal {
          export module monthcalendar {
            export class MonthViewHolder {
              public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.monthcalendar.MonthViewHolder>;
              public reloadDay(it: com.kizitonwose.calendar.core.CalendarDay): void;
              public constructor(rootLayout: globalAndroid.view.ViewGroup, headerView: globalAndroid.view.View, footerView: globalAndroid.view.View, weekHolders: java.util.List<com.kizitonwose.calendar.view.internal.WeekHolder<com.kizitonwose.calendar.core.CalendarDay>>, monthHeaderBinder: com.kizitonwose.calendar.view.MonthHeaderFooterBinder<com.kizitonwose.calendar.view.ViewContainer>, monthFooterBinder: com.kizitonwose.calendar.view.MonthHeaderFooterBinder<com.kizitonwose.calendar.view.ViewContainer>);
              public bindMonth(it: com.kizitonwose.calendar.core.CalendarMonth): void;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export module internal {
          export module weekcalendar {
            export class WeekCalendarAdapter extends androidx.recyclerview.widget.RecyclerView.Adapter<com.kizitonwose.calendar.view.internal.weekcalendar.WeekViewHolder> {
              public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.weekcalendar.WeekCalendarAdapter>;
              public constructor(calView: com.kizitonwose.calendar.view.WeekCalendarView, startDate: java.time.LocalDate, endDate: java.time.LocalDate, firstDayOfWeek: java.time.DayOfWeek);
              public reloadDay(it: java.time.LocalDate): void;
              public findLastVisibleWeek(): com.kizitonwose.calendar.core.Week;
              public onAttachedToRecyclerView(recyclerView: androidx.recyclerview.widget.RecyclerView): void;
              public updateData$view_release(startDate: java.time.LocalDate, endDate: java.time.LocalDate, firstDayOfWeek: java.time.DayOfWeek): void;
              public notifyWeekScrollListenerIfNeeded(): void;
              public getAdapterPosition$view_release(date: java.time.LocalDate): number;
              public onCreateViewHolder(this_: globalAndroid.view.ViewGroup, parent: number): com.kizitonwose.calendar.view.internal.weekcalendar.WeekViewHolder;
              public onBindViewHolder(it: com.kizitonwose.calendar.view.internal.weekcalendar.WeekViewHolder, element$iv: number, $i$f$forEach: java.util.List<any>): void;
              public getItemCount(): number;
              public findFirstVisibleDay(): com.kizitonwose.calendar.core.WeekDay;
              public onBindViewHolder(holder: com.kizitonwose.calendar.view.internal.weekcalendar.WeekViewHolder, position: number): void;
              public getItemId(position: number): number;
              public reloadWeek(date: java.time.LocalDate): void;
              public findFirstVisibleWeek(): com.kizitonwose.calendar.core.Week;
              public reloadCalendar(): void;
              public findLastVisibleDay(): com.kizitonwose.calendar.core.WeekDay;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export module internal {
          export module weekcalendar {
            export class WeekCalendarLayoutManager extends com.kizitonwose.calendar.view.internal.CalendarLayoutManager<java.time.LocalDate, java.time.LocalDate> {
              public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.weekcalendar.WeekCalendarLayoutManager>;
              public notifyScrollListenerIfNeeded(): void;
              public getaItemAdapterPosition(param0: any): number;
              public getItemMargins(): com.kizitonwose.calendar.view.MarginValues;
              public constructor(calView: com.kizitonwose.calendar.view.WeekCalendarView);
              public getaDayAdapterPosition(data: java.time.LocalDate): number;
              public constructor(calView: androidx.recyclerview.widget.RecyclerView, orientation: number);
              public getaItemAdapterPosition(data: java.time.LocalDate): number;
              public getaDayAdapterPosition(param0: any): number;
              public getDayTag(param0: any): number;
              public getDayTag(data: java.time.LocalDate): number;
              public scrollPaged(): boolean;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export module internal {
          export module weekcalendar {
            export class WeekViewHolder {
              public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.weekcalendar.WeekViewHolder>;
              public week: com.kizitonwose.calendar.core.Week;
              public setWeek(value: com.kizitonwose.calendar.core.Week): void;
              public bindWeek(it: com.kizitonwose.calendar.core.Week): void;
              public reloadDay(day: com.kizitonwose.calendar.core.WeekDay): void;
              public getWeek(): com.kizitonwose.calendar.core.Week;
              public constructor(rootLayout: globalAndroid.view.ViewGroup, headerView: globalAndroid.view.View, footerView: globalAndroid.view.View, weekHolder: com.kizitonwose.calendar.view.internal.WeekHolder<com.kizitonwose.calendar.core.WeekDay>, weekHeaderBinder: com.kizitonwose.calendar.view.WeekHeaderFooterBinder<com.kizitonwose.calendar.view.ViewContainer>, weekFooterBinder: com.kizitonwose.calendar.view.WeekHeaderFooterBinder<com.kizitonwose.calendar.view.ViewContainer>);
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export module internal {
          export module yearcalendar {
            export class YearCalendarAdapter extends androidx.recyclerview.widget.RecyclerView.Adapter<com.kizitonwose.calendar.view.internal.yearcalendar.YearViewHolder> {
              public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.yearcalendar.YearCalendarAdapter>;
              public getAdapterPosition$view_release(day: com.kizitonwose.calendar.core.CalendarDay): number;
              public reloadMonth(this_: java.time.YearMonth): void;
              public onAttachedToRecyclerView(recyclerView: androidx.recyclerview.widget.RecyclerView): void;
              public findFirstVisibleMonth(): com.kizitonwose.calendar.core.CalendarMonth;
              public onCreateViewHolder(this_: globalAndroid.view.ViewGroup, parent: number): com.kizitonwose.calendar.view.internal.yearcalendar.YearViewHolder;
              public getAdapterPosition$view_release(year: java.time.Year): number;
              public updateData$view_release(startYear: java.time.Year, endYear: java.time.Year, outDateStyle: com.kizitonwose.calendar.core.OutDateStyle, firstDayOfWeek: java.time.DayOfWeek): void;
              public getAdapterPosition$view_release(month: java.time.YearMonth): number;
              public findFirstVisibleDay(): com.kizitonwose.calendar.core.CalendarDay;
              public constructor(calView: com.kizitonwose.calendar.view.YearCalendarView, outDateStyle: com.kizitonwose.calendar.core.OutDateStyle, startYear: java.time.Year, endYear: java.time.Year, firstDayOfWeek: java.time.DayOfWeek);
              public reloadYear(year: java.time.Year): void;
              public findLastVisibleDay(): com.kizitonwose.calendar.core.CalendarDay;
              public findFirstVisibleYear(): com.kizitonwose.calendar.core.CalendarYear;
              public reloadDay(position: androidNative.Array<com.kizitonwose.calendar.core.CalendarDay>): void;
              public onBindViewHolder(it: com.kizitonwose.calendar.view.internal.yearcalendar.YearViewHolder, element$iv: number, $i$f$forEach: java.util.List<any>): void;
              public onBindViewHolder(holder: com.kizitonwose.calendar.view.internal.yearcalendar.YearViewHolder, position: number): void;
              public notifyYearScrollListenerIfNeeded(): void;
              public getItemCount(): number;
              public findLastVisibleMonth(): com.kizitonwose.calendar.core.CalendarMonth;
              public findLastVisibleYear(): com.kizitonwose.calendar.core.CalendarYear;
              public getItemId(position: number): number;
              public reloadCalendar(): void;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export module internal {
          export module yearcalendar {
            export class YearCalendarLayoutManager extends com.kizitonwose.calendar.view.internal.CalendarLayoutManager<java.time.Year, com.kizitonwose.calendar.core.CalendarDay> {
              public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.yearcalendar.YearCalendarLayoutManager>;
              public getDayTag(data: com.kizitonwose.calendar.core.CalendarDay): number;
              public getaItemAdapterPosition(param0: any): number;
              public getItemMargins(): com.kizitonwose.calendar.view.MarginValues;
              public getaItemAdapterPosition(data: java.time.Year): number;
              public smoothScrollToMonth(this_: java.time.YearMonth): void;
              public constructor(calView: androidx.recyclerview.widget.RecyclerView, orientation: number);
              public getaDayAdapterPosition(param0: any): number;
              public scrollToMonth(this_: java.time.YearMonth): void;
              public notifyScrollListenerIfNeeded(): void;
              public constructor(calView: com.kizitonwose.calendar.view.YearCalendarView);
              public getDayTag(param0: any): number;
              public scrollPaged(): boolean;
              public getaDayAdapterPosition(data: com.kizitonwose.calendar.core.CalendarDay): number;
            }
            export module YearCalendarLayoutManager {
              export class CalendarSmoothScroller {
                public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.yearcalendar.YearCalendarLayoutManager.CalendarSmoothScroller>;
                public constructor(this$0: number, position: java.time.YearMonth);
                public getMonth(): java.time.YearMonth;
                public calculateDyToMakeVisible(offset: globalAndroid.view.View, this_: number): number;
                public getVerticalSnapPreference(): number;
                public getHorizontalSnapPreference(): number;
                public calculateDxToMakeVisible(offset: globalAndroid.view.View, this_: number): number;
              }
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export module internal {
          export module yearcalendar {
            export class YearItemContent {
              public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.yearcalendar.YearItemContent>;
              public hashCode(): number;
              public component3(): globalAndroid.view.View;
              public getMonthRowHolders(): java.util.List<any>;
              public toString(): string;
              public copy(itemView: globalAndroid.view.ViewGroup, headerView: globalAndroid.view.View, footerView: globalAndroid.view.View, monthRowHolders: java.util.List<any>): com.kizitonwose.calendar.view.internal.yearcalendar.YearItemContent;
              public getHeaderView(): globalAndroid.view.View;
              public constructor(itemView: globalAndroid.view.ViewGroup, headerView: globalAndroid.view.View, footerView: globalAndroid.view.View, monthRowHolders: java.util.List<any>);
              public component2(): globalAndroid.view.View;
              public component4(): java.util.List<any>;
              public equals(other: any): boolean;
              public getFooterView(): globalAndroid.view.View;
              public getItemView(): globalAndroid.view.ViewGroup;
              public component1(): globalAndroid.view.ViewGroup;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export module internal {
          export module yearcalendar {
            export class YearMonthHolder {
              public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.yearcalendar.YearMonthHolder>;
              public reloadDay(it: com.kizitonwose.calendar.core.CalendarDay): boolean;
              public inflateMonthView(it: globalAndroid.widget.LinearLayout): globalAndroid.view.View;
              public bindMonthView($this$isVisible$iv: com.kizitonwose.calendar.core.CalendarMonth): void;
              public isVisible(): boolean;
              public reloadMonth(yearMonth: java.time.YearMonth): boolean;
              public makeInvisible(): void;
              public constructor(daySize: com.kizitonwose.calendar.view.DaySize, dayViewResource: number, dayBinder: com.kizitonwose.calendar.view.MonthDayBinder<com.kizitonwose.calendar.view.ViewContainer>, monthHeaderResource: number, monthFooterResource: number, monthViewClass: string, monthHeaderBinder: com.kizitonwose.calendar.view.MonthHeaderFooterBinder<com.kizitonwose.calendar.view.ViewContainer>, monthFooterBinder: com.kizitonwose.calendar.view.MonthHeaderFooterBinder<com.kizitonwose.calendar.view.ViewContainer>);
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export module internal {
          export module yearcalendar {
            export module YearRootKt {
              export class WhenMappings {
                public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.yearcalendar.YearRootKt.WhenMappings>;
              }
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module view {
        export module internal {
          export module yearcalendar {
            export class YearViewHolder {
              public static class: java.lang.Class<com.kizitonwose.calendar.view.internal.yearcalendar.YearViewHolder>;
              public year: com.kizitonwose.calendar.core.CalendarYear;
              public bindYear(it: com.kizitonwose.calendar.core.CalendarYear): void;
              public getYear(): com.kizitonwose.calendar.core.CalendarYear;
              public setYear(value: com.kizitonwose.calendar.core.CalendarYear): void;
              public reloadMonth(it: java.time.YearMonth): void;
              public reloadDay(it: com.kizitonwose.calendar.core.CalendarDay): void;
              public constructor(rootLayout: globalAndroid.view.ViewGroup, headerView: globalAndroid.view.View, footerView: globalAndroid.view.View, monthRowHolders: java.util.List<any>, yearHeaderBinder: com.kizitonwose.calendar.view.YearHeaderFooterBinder<com.kizitonwose.calendar.view.ViewContainer>, yearFooterBinder: com.kizitonwose.calendar.view.YearHeaderFooterBinder<com.kizitonwose.calendar.view.ViewContainer>, isMonthVisible: java.lang.Boolean);
            }
          }
        }
      }
    }
  }
}

//Generics information:
//com.kizitonwose.calendar.view.Binder:2
//com.kizitonwose.calendar.view.MonthDayBinder:1
//com.kizitonwose.calendar.view.MonthHeaderFooterBinder:1
//com.kizitonwose.calendar.view.WeekDayBinder:1
//com.kizitonwose.calendar.view.WeekHeaderFooterBinder:1
//com.kizitonwose.calendar.view.YearHeaderFooterBinder:1
//com.kizitonwose.calendar.view.internal.CalendarLayoutManager:2
//com.kizitonwose.calendar.view.internal.DayConfig:1
//com.kizitonwose.calendar.view.internal.DayHolder:1
//com.kizitonwose.calendar.view.internal.ItemContent:1
//com.kizitonwose.calendar.view.internal.WeekHolder:1
