declare module com {
  export module kizitonwose {
    export module calendar {
      export module core {
        export class CalendarDay {
          public static class: java.lang.Class<com.kizitonwose.calendar.core.CalendarDay>;
          public toString(): string;
          public equals(other: any): boolean;
          public component2(): com.kizitonwose.calendar.core.DayPosition;
          public copy(date: java.time.LocalDate, position: com.kizitonwose.calendar.core.DayPosition): com.kizitonwose.calendar.core.CalendarDay;
          public constructor(date: java.time.LocalDate, position: com.kizitonwose.calendar.core.DayPosition);
          public getPosition(): com.kizitonwose.calendar.core.DayPosition;
          public component1(): java.time.LocalDate;
          public hashCode(): number;
          public getDate(): java.time.LocalDate;
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module core {
        export class CalendarMonth {
          public static class: java.lang.Class<com.kizitonwose.calendar.core.CalendarMonth>;
          public getYearMonth(): java.time.YearMonth;
          public toString(): string;
          public component2(): java.util.List<java.util.List<com.kizitonwose.calendar.core.CalendarDay>>;
          public copy(yearMonth: java.time.YearMonth, weekDays: java.util.List<any>): com.kizitonwose.calendar.core.CalendarMonth;
          public equals(other: any): boolean;
          public component1(): java.time.YearMonth;
          public constructor(yearMonth: java.time.YearMonth, weekDays: java.util.List<any>);
          public getWeekDays(): java.util.List<java.util.List<com.kizitonwose.calendar.core.CalendarDay>>;
          public hashCode(): number;
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module core {
        export class CalendarYear {
          public static class: java.lang.Class<com.kizitonwose.calendar.core.CalendarYear>;
          public getMonths(): java.util.List<com.kizitonwose.calendar.core.CalendarMonth>;
          public toString(): string;
          public constructor(year: java.time.Year, months: java.util.List<com.kizitonwose.calendar.core.CalendarMonth>);
          public component1(): java.time.Year;
          public equals(other: any): boolean;
          public copy(year: java.time.Year, months: java.util.List<com.kizitonwose.calendar.core.CalendarMonth>): com.kizitonwose.calendar.core.CalendarYear;
          public getYear(): java.time.Year;
          public component2(): java.util.List<com.kizitonwose.calendar.core.CalendarMonth>;
          public hashCode(): number;
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module core {
        export class DayPosition {
          public static class: java.lang.Class<com.kizitonwose.calendar.core.DayPosition>;
          public static InDate: com.kizitonwose.calendar.core.DayPosition;
          public static MonthDate: com.kizitonwose.calendar.core.DayPosition;
          public static OutDate: com.kizitonwose.calendar.core.DayPosition;
          public static getEntries(): any;
          public static valueOf(value: string): com.kizitonwose.calendar.core.DayPosition;
          public static values(): androidNative.Array<com.kizitonwose.calendar.core.DayPosition>;
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module core {
        export class ExperimentalCalendarApi {
          public static class: java.lang.Class<com.kizitonwose.calendar.core.ExperimentalCalendarApi>;
          /**
           * Constructs a new instance of the com.kizitonwose.calendar.core.ExperimentalCalendarApi interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module core {
        export module ExtensionsKt {
          export class EntriesMappings {
            public static class: java.lang.Class<com.kizitonwose.calendar.core.ExtensionsKt.EntriesMappings>;
          }
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module core {
        export class OutDateStyle {
          public static class: java.lang.Class<com.kizitonwose.calendar.core.OutDateStyle>;
          public static EndOfRow: com.kizitonwose.calendar.core.OutDateStyle;
          public static EndOfGrid: com.kizitonwose.calendar.core.OutDateStyle;
          public static values(): androidNative.Array<com.kizitonwose.calendar.core.OutDateStyle>;
          public static getEntries(): any;
          public static valueOf(value: string): com.kizitonwose.calendar.core.OutDateStyle;
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module core {
        export class Week {
          public static class: java.lang.Class<com.kizitonwose.calendar.core.Week>;
          public component1(): java.util.List<com.kizitonwose.calendar.core.WeekDay>;
          public toString(): string;
          public getDays(): java.util.List<com.kizitonwose.calendar.core.WeekDay>;
          public constructor(days: java.util.List<com.kizitonwose.calendar.core.WeekDay>);
          public equals(other: any): boolean;
          public copy(days: java.util.List<com.kizitonwose.calendar.core.WeekDay>): com.kizitonwose.calendar.core.Week;
          public hashCode(): number;
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module core {
        export class WeekDay {
          public static class: java.lang.Class<com.kizitonwose.calendar.core.WeekDay>;
          public copy(date: java.time.LocalDate, position: com.kizitonwose.calendar.core.WeekDayPosition): com.kizitonwose.calendar.core.WeekDay;
          public toString(): string;
          public getPosition(): com.kizitonwose.calendar.core.WeekDayPosition;
          public component2(): com.kizitonwose.calendar.core.WeekDayPosition;
          public constructor(date: java.time.LocalDate, position: com.kizitonwose.calendar.core.WeekDayPosition);
          public equals(other: any): boolean;
          public component1(): java.time.LocalDate;
          public hashCode(): number;
          public getDate(): java.time.LocalDate;
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module core {
        export class WeekDayPosition {
          public static class: java.lang.Class<com.kizitonwose.calendar.core.WeekDayPosition>;
          public static InDate: com.kizitonwose.calendar.core.WeekDayPosition;
          public static RangeDate: com.kizitonwose.calendar.core.WeekDayPosition;
          public static OutDate: com.kizitonwose.calendar.core.WeekDayPosition;
          public static getEntries(): any;
          public static values(): androidNative.Array<com.kizitonwose.calendar.core.WeekDayPosition>;
          public static valueOf(value: string): com.kizitonwose.calendar.core.WeekDayPosition;
        }
      }
    }
  }
}

//Generics information:
