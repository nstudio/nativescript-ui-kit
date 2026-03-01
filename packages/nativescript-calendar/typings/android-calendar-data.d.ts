/// <reference path="android-declarations.d.ts"/>

declare module com {
  export module kizitonwose {
    export module calendar {
      export module data {
        export class DataStore<V> extends java.lang.Object {
          public static class: java.lang.Class<com.kizitonwose.calendar.data.DataStore<any>>;
          public remove(key: any): V;
          public containsKey(key: any): boolean;
          public isEmpty(): boolean;
          public values(): java.util.Collection<V>;
          public getValues(): java.util.Collection<V>;
          public containsKey(key: number): boolean;
          public size(): number;
          public constructor(store: java.util.Map<java.lang.Integer, V>, create: any);
          public getSize(): number;
          public containsValue(value: any): boolean;
          public keySet(): java.util.Set<java.lang.Integer>;
          public get(key: any): V;
          public put(key: number, value: V): V;
          public getKeys(): java.util.Set<java.lang.Integer>;
          public entrySet(): java.util.Set<java.util.Map.Entry<java.lang.Integer, V>>;
          public clear(): void;
          public putAll(from: java.util.Map<any, any>): void;
          public remove(key: number): V;
          public getEntries(): java.util.Set<java.util.Map.Entry<java.lang.Integer, V>>;
          public get(value: number): V;
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module data {
        export class MonthData {
          public static class: java.lang.Class<com.kizitonwose.calendar.data.MonthData>;
          public constructor(dayOffset: java.time.YearMonth, item$iv$iv: number, $i$f$mapTo: number);
          public copy(month: java.time.YearMonth, inDays: number, outDays: number): com.kizitonwose.calendar.data.MonthData;
          public toString(): string;
          public equals(other: any): boolean;
          public getCalendarMonth(): com.kizitonwose.calendar.core.CalendarMonth;
          public hashCode(): number;
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module data {
        export class WeekData {
          public static class: java.lang.Class<com.kizitonwose.calendar.data.WeekData>;
          public toString(): string;
          public copy(firstDayInWeek: java.time.LocalDate, desiredStartDate: java.time.LocalDate, desiredEndDate: java.time.LocalDate): com.kizitonwose.calendar.data.WeekData;
          public equals(other: any): boolean;
          public getWeek(): com.kizitonwose.calendar.core.Week;
          public hashCode(): number;
          public constructor(dayOffset: java.time.LocalDate, item$iv$iv: java.time.LocalDate, $i$f$mapTo: java.time.LocalDate);
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module data {
        export class WeekDateRange {
          public static class: java.lang.Class<com.kizitonwose.calendar.data.WeekDateRange>;
          public getEndDateAdjusted(): java.time.LocalDate;
          public toString(): string;
          public getStartDateAdjusted(): java.time.LocalDate;
          public equals(other: any): boolean;
          public component2(): java.time.LocalDate;
          public copy(startDateAdjusted: java.time.LocalDate, endDateAdjusted: java.time.LocalDate): com.kizitonwose.calendar.data.WeekDateRange;
          public component1(): java.time.LocalDate;
          public hashCode(): number;
          public constructor(startDateAdjusted: java.time.LocalDate, endDateAdjusted: java.time.LocalDate);
        }
      }
    }
  }
}

declare module com {
  export module kizitonwose {
    export module calendar {
      export module data {
        export module YearDataKt {
          export class EntriesMappings {
            public static class: java.lang.Class<com.kizitonwose.calendar.data.YearDataKt.EntriesMappings>;
          }
        }
      }
    }
  }
}

//Generics information:
//com.kizitonwose.calendar.data.DataStore:1
