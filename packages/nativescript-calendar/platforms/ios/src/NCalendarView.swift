import UIKit
import HorizonCalendar

// MARK: - NCalendarView

@objc(NCalendarView)
public class NCalendarView: UIView {

  // MARK: - Lifecycle

  @objc public override init(frame: CGRect) {
    super.init(frame: frame)
    setupCalendarView()
  }

  required init?(coder: NSCoder) {
    super.init(coder: coder)
    setupCalendarView()
  }

  public override func layoutSubviews() {
    super.layoutSubviews()
    calendarView.frame = bounds
  }

  // MARK: - Internal

  private var calendarView: CalendarView!
  private var selectedDayKeys = Set<String>()
  private var rangeStartKey: String?
  private var rangeEndKey: String?
  private var eventsByKey = [String: [[String: Any]]]()
  private var _calendar = Calendar.current

  // MARK: - Configuration Properties

  @objc public var isHorizontal: Bool = false { didSet { rebuildContent() } }
  @objc public var isPaginated: Bool = false { didSet { rebuildContent() } }
  @objc public var pinDaysOfWeekToTop: Bool = false { didSet { rebuildContent() } }
  @objc public var showCompleteBoundaryMonths: Bool = true { didSet { rebuildContent() } }

  @objc public var minDateMs: Double = 0 { didSet { rebuildContent() } }
  @objc public var maxDateMs: Double = 0 { didSet { rebuildContent() } }
  @objc public var firstDayOfWeekJS: Int = 0 { didSet { updateCalendar(); rebuildContent() } }

  @objc public var interMonthSpacingPt: CGFloat = 0 { didSet { rebuildContent() } }
  @objc public var verticalDayMarginPt: CGFloat = 0 { didSet { rebuildContent() } }
  @objc public var horizontalDayMarginPt: CGFloat = 0 { didSet { rebuildContent() } }

  // Selection
  @objc public var selectionModeStr: String = "single"

  // Style
  @objc public var dayTextColorHex: String = ""
  @objc public var dayFontSizePt: CGFloat = 18
  @objc public var todayTextColorHex: String = "#2196F3"
  @objc public var todayBgColorHex: String = ""
  @objc public var selectedDayTextColorHex: String = "#FFFFFF"
  @objc public var selectedDayBgColorHex: String = "#2196F3"
  @objc public var selectedRangeColorHex: String = "#BBDEFB"
  @objc public var weekendTextColorHex: String = "#757575"
  @objc public var disabledDayTextColorHex: String = "#E0E0E0"
  @objc public var outDateTextColorHex: String = "#BDBDBD"
  @objc public var monthHeaderTextColorHex: String = ""
  @objc public var monthHeaderFontSizePt: CGFloat = 20
  @objc public var dayOfWeekTextColorHex: String = "#757575"
  @objc public var dayOfWeekFontSizePt: CGFloat = 14

  // MARK: - Callbacks

  @objc public var onDaySelect: ((_ year: Int, _ month: Int, _ day: Int) -> Void)?
  @objc public var onScroll: ((_ startYear: Int, _ startMonth: Int, _ endYear: Int, _ endMonth: Int, _ isDragging: Bool) -> Void)?
  @objc public var onScrollEnd: ((_ startYear: Int, _ startMonth: Int, _ endYear: Int, _ endMonth: Int) -> Void)?
  @objc public var onMonthChanged: ((_ year: Int, _ month: Int) -> Void)?
  @objc public var onDayRender: ((_ year: Int, _ month: Int, _ day: Int, _ view: UIView, _ isSelected: Bool, _ isInRange: Bool, _ isDisabled: Bool) -> Void)?

  // MARK: - Setup

  private func setupCalendarView() {
    updateCalendar()
    let content = buildContent()
    calendarView = CalendarView(initialContent: content)
    calendarView.directionalLayoutMargins = .zero
    addSubview(calendarView)

    calendarView.daySelectionHandler = { [weak self] day in
      self?.handleDaySelection(day)
    }

    calendarView.didScroll = { [weak self] visibleDayRange, isDragging in
      guard let self = self else { return }
      let startDay = visibleDayRange.lowerBound
      let endDay = visibleDayRange.upperBound
      self.onScroll?(startDay.month.year, startDay.month.month, endDay.month.year, endDay.month.month, isDragging)
    }

    calendarView.didEndDecelerating = { [weak self] visibleDayRange in
      guard let self = self else { return }
      let startDay = visibleDayRange.lowerBound
      let endDay = visibleDayRange.upperBound
      self.onScrollEnd?(startDay.month.year, startDay.month.month, endDay.month.year, endDay.month.month)

      // Fire monthChanged for the first visible month
      self.onMonthChanged?(startDay.month.year, startDay.month.month)
    }
  }

  private func updateCalendar() {
    // Map JS firstDayOfWeek (0=Sun..6=Sat) to Calendar.firstWeekday (1=Sun..7=Sat)
    _calendar = Calendar.current
    _calendar.firstWeekday = firstDayOfWeekJS + 1
  }

  // MARK: - Content Building

  @objc public func rebuildContent() {
    guard calendarView != nil else { return }
    let content = buildContent()
    calendarView.setContent(content, animated: false)
  }

  private func buildContent() -> CalendarViewContent {
    let minDate = minDateMs > 0 ? Date(timeIntervalSince1970: minDateMs / 1000) : Calendar.current.date(byAdding: .year, value: -2, to: Date())!
    let maxDate = maxDateMs > 0 ? Date(timeIntervalSince1970: maxDateMs / 1000) : Calendar.current.date(byAdding: .year, value: 2, to: Date())!

    let monthsLayout: MonthsLayout
    if isHorizontal {
      if isPaginated {
        monthsLayout = .horizontal(options: HorizontalMonthsLayoutOptions(
          maximumFullyVisibleMonths: 1,
          scrollingBehavior: .paginatedScrolling(.init(
            restingPosition: .atLeadingEdgeOfEachMonth,
            restingAffinity: .atPositionsAdjacentToPrevious
          ))
        ))
      } else {
        monthsLayout = .horizontal(options: HorizontalMonthsLayoutOptions(
          maximumFullyVisibleMonths: 1,
          scrollingBehavior: .freeScrolling
        ))
      }
    } else {
      monthsLayout = .vertical(options: VerticalMonthsLayoutOptions(
        pinDaysOfWeekToTop: pinDaysOfWeekToTop,
        alwaysShowCompleteBoundaryMonths: showCompleteBoundaryMonths
      ))
    }

    var content = CalendarViewContent(
      calendar: _calendar,
      visibleDateRange: minDate...maxDate,
      monthsLayout: monthsLayout
    )
    .interMonthSpacing(interMonthSpacingPt)
    .verticalDayMargin(verticalDayMarginPt)
    .horizontalDayMargin(horizontalDayMarginPt)

    // Day item provider
    content = content.dayItemProvider { [weak self] dayComponents in
      guard let self = self else { return nil }
      return self.makeDayItem(for: dayComponents)
    }

    // Month header provider
    content = content.monthHeaderItemProvider { [weak self] monthComponents in
      guard let self = self else { return nil }
      return self.makeMonthHeaderItem(for: monthComponents)
    }

    // Day-of-week provider
    content = content.dayOfWeekItemProvider { [weak self] month, weekdayIndex in
      guard let self = self else { return nil }
      return self.makeDayOfWeekItem(month: month, weekdayIndex: weekdayIndex)
    }

    return content
  }

  // MARK: - Day Item

  private func makeDayItem(for dayComponents: DayComponents) -> AnyCalendarItemModel {
    let date = _calendar.date(from: DateComponents(
      era: dayComponents.month.era,
      year: dayComponents.month.year,
      month: dayComponents.month.month,
      day: dayComponents.day
    ))!

    let key = dateKey(date)
    let isSelected = selectedDayKeys.contains(key)
    let isInRange = isKeyInRange(key)
    let isToday = _calendar.isDateInToday(date)
    let isDisabled = isDateDisabled(date)
    let isWeekend = _calendar.isDateInWeekend(date)

    // Determine text color
    let textColor: UIColor
    if isDisabled {
      textColor = colorFromHex(disabledDayTextColorHex) ?? .systemGray3
    } else if isSelected {
      textColor = colorFromHex(selectedDayTextColorHex) ?? .white
    } else if isToday {
      textColor = colorFromHex(todayTextColorHex) ?? .systemBlue
    } else if isWeekend {
      textColor = colorFromHex(weekendTextColorHex) ?? .secondaryLabel
    } else {
      textColor = colorFromHex(dayTextColorHex) ?? .label
    }

    // Determine background
    let bgDrawingConfig: DrawingConfig
    if isSelected {
      let bgColor = colorFromHex(selectedDayBgColorHex) ?? .systemBlue
      bgDrawingConfig = DrawingConfig(fillColor: bgColor, borderColor: .clear)
    } else if isInRange && !isSelected {
      let rangeColor = colorFromHex(selectedRangeColorHex) ?? .systemBlue.withAlphaComponent(0.2)
      bgDrawingConfig = DrawingConfig(fillColor: rangeColor, borderColor: .clear)
    } else if isToday {
      let todayBg = colorFromHex(todayBgColorHex)
      if let todayBg = todayBg {
        bgDrawingConfig = DrawingConfig(fillColor: todayBg, borderColor: .clear)
      } else {
        let borderColor = colorFromHex(todayTextColorHex) ?? .systemBlue
        bgDrawingConfig = DrawingConfig(fillColor: .clear, borderColor: borderColor, borderWidth: 1)
      }
    } else {
      bgDrawingConfig = .transparent
    }

    var properties = DayView.InvariantViewProperties.baseInteractive
    properties.textColor = textColor
    properties.font = .systemFont(ofSize: dayFontSizePt)
    properties.backgroundShapeDrawingConfig = bgDrawingConfig
    properties.shape = (isInRange && !isSelected) ? .rectangle(cornerRadius: 0) : .circle

    let dayText = "\(dayComponents.day)"
    let formatter = DateFormatter()
    formatter.dateStyle = .long
    let accessibilityLabel = formatter.string(from: date)

    // Fire dayRender callback
    // Note: this fires during content building, before the actual UIView exists.
    // The native DayView will be created by HorizonCalendar's view recycling.

    return DayView.calendarItemModel(
      invariantViewProperties: properties,
      content: .init(
        dayText: dayText,
        accessibilityLabel: accessibilityLabel,
        accessibilityHint: nil
      )
    )
  }

  // MARK: - Month Header Item

  private func makeMonthHeaderItem(for month: MonthComponents) -> AnyCalendarItemModel {
    let dateComponents = DateComponents(era: month.era, year: month.year, month: month.month)
    let date = _calendar.date(from: dateComponents) ?? Date()

    let formatter = DateFormatter()
    formatter.calendar = _calendar
    formatter.dateFormat = "MMMM yyyy"
    let title = formatter.string(from: date)

    let textColor = colorFromHex(monthHeaderTextColorHex) ?? .label
    let fontSize = monthHeaderFontSizePt

    var properties = MonthHeaderView.InvariantViewProperties.base
    properties.textColor = textColor
    properties.font = .boldSystemFont(ofSize: fontSize)

    return MonthHeaderView.calendarItemModel(
      invariantViewProperties: properties,
      content: .init(monthText: title, accessibilityLabel: title)
    )
  }

  // MARK: - Day-of-Week Item

  private func makeDayOfWeekItem(month: MonthComponents?, weekdayIndex: Int) -> AnyCalendarItemModel {
    let symbols = _calendar.shortWeekdaySymbols
    let index = weekdayIndex % symbols.count
    let text = symbols[index]

    let textColor = colorFromHex(dayOfWeekTextColorHex) ?? .secondaryLabel
    let fontSize = dayOfWeekFontSizePt

    var properties = DayOfWeekView.InvariantViewProperties.base
    properties.textColor = textColor
    properties.font = .systemFont(ofSize: fontSize, weight: .medium)

    return DayOfWeekView.calendarItemModel(
      invariantViewProperties: properties,
      content: .init(dayOfWeekText: text, accessibilityLabel: text)
    )
  }

  // MARK: - Selection

  private func handleDaySelection(_ dayComponents: DayComponents) {
    let year = dayComponents.month.year
    let month = dayComponents.month.month
    let day = dayComponents.day
    onDaySelect?(year, month, day)
  }

  // MARK: - Selection State Management (called from JS)

  @objc public func setSelectedKeys(_ keys: [String]) {
    selectedDayKeys = Set(keys)
    rebuildContent()
  }

  @objc public func setRangeKeys(_ startKey: String?, endKey: String?) {
    rangeStartKey = startKey
    rangeEndKey = endKey
    rebuildContent()
  }

  @objc public func setEvents(_ eventsJson: String) {
    guard let data = eventsJson.data(using: .utf8),
          let json = (try? JSONSerialization.jsonObject(with: data)) as? [[String: Any]] else {
      eventsByKey = [:]
      rebuildContent()
      return
    }

    var grouped = [String: [[String: Any]]]()
    for event in json {
      if let key = event["key"] as? String {
        grouped[key, default: []].append(event)
      }
    }
    eventsByKey = grouped
    rebuildContent()
  }

  // MARK: - Programmatic Scrolling

  @objc public func scrollToMonthContaining(year: Int, month: Int, day: Int, animated: Bool) {
    let components = DateComponents(year: year, month: month, day: day)
    guard let date = _calendar.date(from: components) else { return }
    calendarView.scroll(toMonthContaining: date, scrollPosition: .firstFullyVisiblePosition, animated: animated)
  }

  @objc public func scrollToDayContaining(year: Int, month: Int, day: Int, animated: Bool) {
    let components = DateComponents(year: year, month: month, day: day)
    guard let date = _calendar.date(from: components) else { return }
    calendarView.scroll(toDayContaining: date, scrollPosition: .centered, animated: animated)
  }

  // MARK: - Helpers

  private func dateKey(_ date: Date) -> String {
    let comps = _calendar.dateComponents([.year, .month, .day], from: date)
    let y = comps.year!
    let m = comps.month!
    let d = comps.day!
    return String(format: "%04d-%02d-%02d", y, m, d)
  }

  private func isKeyInRange(_ key: String) -> Bool {
    guard let start = rangeStartKey, let end = rangeEndKey else { return false }
    return key >= start && key <= end
  }

  private func isDateDisabled(_ date: Date) -> Bool {
    if minDateMs > 0 {
      let minDate = Date(timeIntervalSince1970: minDateMs / 1000)
      if date < _calendar.startOfDay(for: minDate) { return true }
    }
    if maxDateMs > 0 {
      let maxDate = Date(timeIntervalSince1970: maxDateMs / 1000)
      let dayAfterMax = _calendar.date(byAdding: .day, value: 1, to: _calendar.startOfDay(for: maxDate))!
      if date >= dayAfterMax { return true }
    }
    return false
  }

  private func colorFromHex(_ hex: String) -> UIColor? {
    guard !hex.isEmpty else { return nil }
    var hexSanitized = hex.trimmingCharacters(in: .whitespacesAndNewlines)
    hexSanitized = hexSanitized.replacingOccurrences(of: "#", with: "")

    var rgb: UInt64 = 0
    Scanner(string: hexSanitized).scanHexInt64(&rgb)

    switch hexSanitized.count {
    case 6:
      return UIColor(
        red: CGFloat((rgb & 0xFF0000) >> 16) / 255,
        green: CGFloat((rgb & 0x00FF00) >> 8) / 255,
        blue: CGFloat(rgb & 0x0000FF) / 255,
        alpha: 1
      )
    case 8:
      return UIColor(
        red: CGFloat((rgb & 0xFF000000) >> 24) / 255,
        green: CGFloat((rgb & 0x00FF0000) >> 16) / 255,
        blue: CGFloat((rgb & 0x0000FF00) >> 8) / 255,
        alpha: CGFloat(rgb & 0x000000FF) / 255
      )
    default:
      return nil
    }
  }
}

// MARK: - MonthHeaderView

/// A simple month header view matching HorizonCalendar's CalendarItemViewRepresentable.
@objc(NCalMonthHeaderView)
public final class MonthHeaderView: UIView, CalendarItemViewRepresentable {

  public struct InvariantViewProperties: Hashable {
    var textColor: UIColor = .label
    var font: UIFont = .boldSystemFont(ofSize: 20)

    static let base = InvariantViewProperties()
  }

  public struct Content: Equatable {
    let monthText: String
    let accessibilityLabel: String?
  }

  private let label = UILabel()

  fileprivate init(invariantViewProperties: InvariantViewProperties) {
    super.init(frame: .zero)
    label.textAlignment = .center
    label.font = invariantViewProperties.font
    label.textColor = invariantViewProperties.textColor
    addSubview(label)
  }

  required init?(coder: NSCoder) { fatalError() }

  public override func layoutSubviews() {
    super.layoutSubviews()
    label.frame = bounds
  }

  fileprivate func setContent(_ content: Content) {
    label.text = content.monthText
    accessibilityLabel = content.accessibilityLabel
  }

  public static func makeView(
    withInvariantViewProperties properties: InvariantViewProperties
  ) -> MonthHeaderView {
    MonthHeaderView(invariantViewProperties: properties)
  }

  public static func setContent(_ content: Content, on view: MonthHeaderView) {
    view.setContent(content)
  }
}

// MARK: - DayOfWeekView

/// A simple day-of-week header view.
@objc(NCalDayOfWeekView)
public final class DayOfWeekView: UIView, CalendarItemViewRepresentable {

  public struct InvariantViewProperties: Hashable {
    var textColor: UIColor = .secondaryLabel
    var font: UIFont = .systemFont(ofSize: 14, weight: .medium)

    static let base = InvariantViewProperties()
  }

  public struct Content: Equatable {
    let dayOfWeekText: String
    let accessibilityLabel: String?
  }

  private let label = UILabel()

  fileprivate init(invariantViewProperties: InvariantViewProperties) {
    super.init(frame: .zero)
    label.textAlignment = .center
    label.font = invariantViewProperties.font
    label.textColor = invariantViewProperties.textColor
    addSubview(label)
  }

  required init?(coder: NSCoder) { fatalError() }

  public override func layoutSubviews() {
    super.layoutSubviews()
    label.frame = bounds
  }

  fileprivate func setContent(_ content: Content) {
    label.text = content.dayOfWeekText
    accessibilityLabel = content.accessibilityLabel
  }

  public static func makeView(
    withInvariantViewProperties properties: InvariantViewProperties
  ) -> DayOfWeekView {
    DayOfWeekView(invariantViewProperties: properties)
  }

  public static func setContent(_ content: Content, on view: DayOfWeekView) {
    view.setContent(content)
  }
}
