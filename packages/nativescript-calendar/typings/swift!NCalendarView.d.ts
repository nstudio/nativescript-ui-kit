declare class NCalDayOfWeekView extends UIView {
  static alloc(): NCalDayOfWeekView; // inherited from NSObject

  static appearance(): NCalDayOfWeekView; // inherited from UIAppearance

  /**
   * @since 8.0
   */
  static appearanceForTraitCollection(trait: UITraitCollection): NCalDayOfWeekView; // inherited from UIAppearance

  /**
   * @since 8.0
   * @deprecated 9.0
   */
  static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): NCalDayOfWeekView; // inherited from UIAppearance

  /**
   * @since 9.0
   */
  static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): NCalDayOfWeekView; // inherited from UIAppearance

  /**
   * @since 5.0
   * @deprecated 9.0
   */
  static appearanceWhenContainedIn(ContainerClass: typeof NSObject): NCalDayOfWeekView; // inherited from UIAppearance

  /**
   * @since 9.0
   */
  static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): NCalDayOfWeekView; // inherited from UIAppearance

  static new(): NCalDayOfWeekView; // inherited from NSObject
}

declare class NCalMonthHeaderView extends UIView {
  static alloc(): NCalMonthHeaderView; // inherited from NSObject

  static appearance(): NCalMonthHeaderView; // inherited from UIAppearance

  /**
   * @since 8.0
   */
  static appearanceForTraitCollection(trait: UITraitCollection): NCalMonthHeaderView; // inherited from UIAppearance

  /**
   * @since 8.0
   * @deprecated 9.0
   */
  static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): NCalMonthHeaderView; // inherited from UIAppearance

  /**
   * @since 9.0
   */
  static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): NCalMonthHeaderView; // inherited from UIAppearance

  /**
   * @since 5.0
   * @deprecated 9.0
   */
  static appearanceWhenContainedIn(ContainerClass: typeof NSObject): NCalMonthHeaderView; // inherited from UIAppearance

  /**
   * @since 9.0
   */
  static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): NCalMonthHeaderView; // inherited from UIAppearance

  static new(): NCalMonthHeaderView; // inherited from NSObject
}

declare class NCalendarView extends UIView {
  static alloc(): NCalendarView; // inherited from NSObject

  static appearance(): NCalendarView; // inherited from UIAppearance

  /**
   * @since 8.0
   */
  static appearanceForTraitCollection(trait: UITraitCollection): NCalendarView; // inherited from UIAppearance

  /**
   * @since 8.0
   * @deprecated 9.0
   */
  static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): NCalendarView; // inherited from UIAppearance

  /**
   * @since 9.0
   */
  static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): NCalendarView; // inherited from UIAppearance

  /**
   * @since 5.0
   * @deprecated 9.0
   */
  static appearanceWhenContainedIn(ContainerClass: typeof NSObject): NCalendarView; // inherited from UIAppearance

  /**
   * @since 9.0
   */
  static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): NCalendarView; // inherited from UIAppearance

  static new(): NCalendarView; // inherited from NSObject

  dayFontSizePt: number;

  dayOfWeekFontSizePt: number;

  dayOfWeekTextColorHex: string;

  dayTextColorHex: string;

  disabledDayTextColorHex: string;

  firstDayOfWeekJS: number;

  horizontalDayMarginPt: number;

  interMonthSpacingPt: number;

  isHorizontal: boolean;

  isPaginated: boolean;

  maxDateMs: number;

  minDateMs: number;

  monthHeaderFontSizePt: number;

  monthHeaderTextColorHex: string;

  onDayRender: (p1: number, p2: number, p3: number, p4: UIView, p5: boolean, p6: boolean, p7: boolean) => void;

  onDaySelect: (p1: number, p2: number, p3: number) => void;

  onMonthChanged: (p1: number, p2: number) => void;

  onScroll: (p1: number, p2: number, p3: number, p4: number, p5: boolean) => void;

  onScrollEnd: (p1: number, p2: number, p3: number, p4: number) => void;

  outDateTextColorHex: string;

  pinDaysOfWeekToTop: boolean;

  selectedDayBgColorHex: string;

  selectedDayTextColorHex: string;

  selectedRangeColorHex: string;

  selectionModeStr: string;

  showCompleteBoundaryMonths: boolean;

  todayBgColorHex: string;

  todayTextColorHex: string;

  verticalDayMarginPt: number;

  weekendTextColorHex: string;

  rebuildContent(): void;

  scrollToDayContainingWithYearMonthDayAnimated(year: number, month: number, day: number, animated: boolean): void;

  scrollToMonthContainingWithYearMonthDayAnimated(year: number, month: number, day: number, animated: boolean): void;

  setEvents(eventsJson: string): void;

  setRangeKeysEndKey(startKey: string, endKey: string): void;

  setSelectedKeys(keys: NSArray<string> | string[]): void;
}
