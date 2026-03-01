declare class CalendarView extends UIView {
  static alloc(): CalendarView; // inherited from NSObject

  static appearance(): CalendarView; // inherited from UIAppearance

  /**
   * @since 8.0
   */
  static appearanceForTraitCollection(trait: UITraitCollection): CalendarView; // inherited from UIAppearance

  /**
   * @since 8.0
   * @deprecated 9.0
   */
  static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): CalendarView; // inherited from UIAppearance

  /**
   * @since 9.0
   */
  static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): CalendarView; // inherited from UIAppearance

  /**
   * @since 5.0
   * @deprecated 9.0
   */
  static appearanceWhenContainedIn(ContainerClass: typeof NSObject): CalendarView; // inherited from UIAppearance

  /**
   * @since 9.0
   */
  static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): CalendarView; // inherited from UIAppearance

  static new(): CalendarView; // inherited from NSObject
}

declare class DayOfWeekView extends UIView {
  static alloc(): DayOfWeekView; // inherited from NSObject

  static appearance(): DayOfWeekView; // inherited from UIAppearance

  /**
   * @since 8.0
   */
  static appearanceForTraitCollection(trait: UITraitCollection): DayOfWeekView; // inherited from UIAppearance

  /**
   * @since 8.0
   * @deprecated 9.0
   */
  static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): DayOfWeekView; // inherited from UIAppearance

  /**
   * @since 9.0
   */
  static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): DayOfWeekView; // inherited from UIAppearance

  /**
   * @since 5.0
   * @deprecated 9.0
   */
  static appearanceWhenContainedIn(ContainerClass: typeof NSObject): DayOfWeekView; // inherited from UIAppearance

  /**
   * @since 9.0
   */
  static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): DayOfWeekView; // inherited from UIAppearance

  static new(): DayOfWeekView; // inherited from NSObject
}

declare class DayView extends UIView implements UIPointerInteractionDelegate {
  static alloc(): DayView; // inherited from NSObject

  static appearance(): DayView; // inherited from UIAppearance

  /**
   * @since 8.0
   */
  static appearanceForTraitCollection(trait: UITraitCollection): DayView; // inherited from UIAppearance

  /**
   * @since 8.0
   * @deprecated 9.0
   */
  static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): DayView; // inherited from UIAppearance

  /**
   * @since 9.0
   */
  static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): DayView; // inherited from UIAppearance

  /**
   * @since 5.0
   * @deprecated 9.0
   */
  static appearanceWhenContainedIn(ContainerClass: typeof NSObject): DayView; // inherited from UIAppearance

  /**
   * @since 9.0
   */
  static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): DayView; // inherited from UIAppearance

  static new(): DayView; // inherited from NSObject

  readonly debugDescription: string; // inherited from NSObjectProtocol

  readonly description: string; // inherited from NSObjectProtocol

  readonly hash: number; // inherited from NSObjectProtocol

  readonly isProxy: boolean; // inherited from NSObjectProtocol

  readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

  readonly; // inherited from NSObjectProtocol

  class(): typeof NSObject;

  conformsToProtocol(aProtocol: any /* Protocol */): boolean;

  isEqual(object: any): boolean;

  isKindOfClass(aClass: typeof NSObject): boolean;

  isMemberOfClass(aClass: typeof NSObject): boolean;

  performSelector(aSelector: string): any;

  performSelectorWithObject(aSelector: string, object: any): any;

  performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

  pointerInteractionRegionForRequestDefaultRegion(interaction: UIPointerInteraction, request: UIPointerRegionRequest, defaultRegion: UIPointerRegion): UIPointerRegion;

  pointerInteractionStyleForRegion(interaction: UIPointerInteraction, region: UIPointerRegion): UIPointerStyle;

  pointerInteractionWillEnterRegionAnimator(interaction: UIPointerInteraction, region: UIPointerRegion, animator: UIPointerInteractionAnimating): void;

  pointerInteractionWillExitRegionAnimator(interaction: UIPointerInteraction, region: UIPointerRegion, animator: UIPointerInteractionAnimating): void;

  respondsToSelector(aSelector: string): boolean;

  retainCount(): number;

  self(): this;
}

declare class MonthGridBackgroundView extends UIView {
  static alloc(): MonthGridBackgroundView; // inherited from NSObject

  static appearance(): MonthGridBackgroundView; // inherited from UIAppearance

  /**
   * @since 8.0
   */
  static appearanceForTraitCollection(trait: UITraitCollection): MonthGridBackgroundView; // inherited from UIAppearance

  /**
   * @since 8.0
   * @deprecated 9.0
   */
  static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MonthGridBackgroundView; // inherited from UIAppearance

  /**
   * @since 9.0
   */
  static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): MonthGridBackgroundView; // inherited from UIAppearance

  /**
   * @since 5.0
   * @deprecated 9.0
   */
  static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MonthGridBackgroundView; // inherited from UIAppearance

  /**
   * @since 9.0
   */
  static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): MonthGridBackgroundView; // inherited from UIAppearance

  static new(): MonthGridBackgroundView; // inherited from NSObject
}

declare class MonthHeaderView extends UIView {
  static alloc(): MonthHeaderView; // inherited from NSObject

  static appearance(): MonthHeaderView; // inherited from UIAppearance

  /**
   * @since 8.0
   */
  static appearanceForTraitCollection(trait: UITraitCollection): MonthHeaderView; // inherited from UIAppearance

  /**
   * @since 8.0
   * @deprecated 9.0
   */
  static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MonthHeaderView; // inherited from UIAppearance

  /**
   * @since 9.0
   */
  static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): MonthHeaderView; // inherited from UIAppearance

  /**
   * @since 5.0
   * @deprecated 9.0
   */
  static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MonthHeaderView; // inherited from UIAppearance

  /**
   * @since 9.0
   */
  static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): MonthHeaderView; // inherited from UIAppearance

  static new(): MonthHeaderView; // inherited from NSObject
}
