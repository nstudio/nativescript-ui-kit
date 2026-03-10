import UIKit
import HorizonCalendar

// MARK: - Helpers

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
    if displayModeStr == "week" {
      horizontalMonthLabel?.isHidden = true
      weekContainer?.frame = bounds
      let headerHeight: CGFloat = 36
      let dowHeight: CGFloat = 24
      let cellWidth = bounds.width / 7
      let dayRowHeight = cellWidth  // Square day cells
      weekMonthLabel?.frame = CGRect(x: 0, y: 0, width: bounds.width, height: headerHeight)
      weekDowStack?.frame = CGRect(x: 0, y: headerHeight, width: bounds.width, height: dowHeight)
      weekDaysStack?.frame = CGRect(x: 0, y: headerHeight + dowHeight, width: bounds.width, height: dayRowHeight)
    } else if isHorizontal {
      // HorizonCalendar bottom-aligns in horizontal mode: y = frameHeight - maxMonthHeight
      // By setting frameHeight == maxMonthHeight, we get y = 0 (top-aligned)
      horizontalMonthLabel?.isHidden = false
      let labelHeight: CGFloat = 44
      horizontalMonthLabel?.frame = CGRect(x: 0, y: 0, width: bounds.width, height: labelHeight)

      let dayWidth = (bounds.width - 6 * horizontalDayMarginPt) / 7
      let dowRowHeight: CGFloat = ceil(dayOfWeekFontSizePt * 1.8) + 10
      let maxMonthHeight = dowRowHeight + 6 * dayWidth + 6 * verticalDayMarginPt
      calendarView.frame = CGRect(x: 0, y: labelHeight, width: bounds.width, height: maxMonthHeight)

      // Scroll callbacks are not guaranteed on first render, so seed the title now.
      if !didInitializeHorizontalMonthLabel {
        syncHorizontalMonthLabelToInitialVisibleMonth(notify: true)
      }
    } else {
      horizontalMonthLabel?.isHidden = true
      calendarView.frame = bounds
    }
  }

  // MARK: - Internal

  private var calendarView: CalendarView!
  private var selectedDayKeys = Set<String>()
  private var rangeStartKey: String?
  private var rangeEndKey: String?
  private var eventsByKey = [String: [[String: Any]]]()
  private var _calendar = Calendar.current
  private lazy var _dateFormatter: DateFormatter = {
    let f = DateFormatter()
    f.dateStyle = .long
    return f
  }()

  // Week strip views
  private var weekContainer: UIView?
  private var weekDowStack: UIStackView?
  private var weekDaysStack: UIStackView?
  private var weekDayCells: [WeekDayCell] = []
  private var weekMonthLabel: UILabel?
  private var _weekStartDate: Date = Date()

  // Horizontal mode month label
  private var horizontalMonthLabel: UILabel?
  private var didInitializeHorizontalMonthLabel = false

  // MARK: - Configuration Properties

  @objc public var isHorizontal: Bool = false {
    didSet {
      guard oldValue != isHorizontal else { return }
      if isHorizontal {
        ensureHorizontalMonthLabel()
        didInitializeHorizontalMonthLabel = false
      }
      recreateCalendarView()
      setNeedsLayout()
    }
  }
  @objc public var isPaginated: Bool = false { didSet { rebuildContent() } }
  @objc public var pinDaysOfWeekToTop: Bool = true {
    didSet {
      guard oldValue != pinDaysOfWeekToTop else { return }
      recreateCalendarView()
      setNeedsLayout()
    }
  }
  @objc public var showCompleteBoundaryMonths: Bool = true { didSet { rebuildContent() } }

  @objc public var minDateMs: Double = 0 { didSet { rebuildContent() } }
  @objc public var maxDateMs: Double = 0 { didSet { rebuildContent() } }
  @objc public var firstDayOfWeekJS: Int = 0 {
    didSet {
      guard oldValue != firstDayOfWeekJS else { return }
      updateCalendar()
      if displayModeStr == "week" {
        rebuildContent()
      } else {
        recreateCalendarView()
        setNeedsLayout()
      }
    }
  }

  @objc public var interMonthSpacingPt: CGFloat = 0 { didSet { rebuildContent() } }
  @objc public var verticalDayMarginPt: CGFloat = 0 { didSet { rebuildContent() } }
  @objc public var horizontalDayMarginPt: CGFloat = 0 { didSet { rebuildContent() } }

  // Selection
  @objc public var selectionModeStr: String = "single"

  // Display Mode
  @objc public var displayModeStr: String = "month" {
    didSet {
      guard oldValue != displayModeStr else { return }
      switchDisplayMode()
    }
  }

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
    attachCalendarHandlers()
  }

  private func recreateCalendarView() {
    guard calendarView != nil else { return }

    // Detach and remove old
    calendarView.daySelectionHandler = nil
    calendarView.didScroll = nil
    calendarView.didEndDecelerating = nil
    calendarView.removeFromSuperview()

    // Create new with current layout
    let content = buildContent()
    calendarView = CalendarView(initialContent: content)
    calendarView.directionalLayoutMargins = .zero

    // Insert below the horizontal month label if it exists
    if let label = horizontalMonthLabel {
      insertSubview(calendarView, belowSubview: label)
    } else {
      addSubview(calendarView)
    }
    calendarView.frame = bounds
    attachCalendarHandlers()
  }

  private func attachCalendarHandlers() {
    calendarView.daySelectionHandler = { [weak self] day in
      self?.handleDaySelection(day)
    }

    calendarView.didScroll = { [weak self] visibleDayRange, isDragging in
      guard let self = self else { return }
      let startDay = visibleDayRange.lowerBound
      let endDay = visibleDayRange.upperBound
      let visibleMonth = self.resolvePrimaryVisibleMonth(startDay: startDay, endDay: endDay)
      self.updateHorizontalMonthLabel(year: visibleMonth.year, month: visibleMonth.month)
      self.onScroll?(visibleMonth.year, visibleMonth.month, endDay.month.year, endDay.month.month, isDragging)
    }

    calendarView.didEndDecelerating = { [weak self] visibleDayRange in
      guard let self = self else { return }
      let startDay = visibleDayRange.lowerBound
      let endDay = visibleDayRange.upperBound
      let visibleMonth = self.resolvePrimaryVisibleMonth(startDay: startDay, endDay: endDay)
      self.updateHorizontalMonthLabel(year: visibleMonth.year, month: visibleMonth.month)
      self.onScrollEnd?(visibleMonth.year, visibleMonth.month, endDay.month.year, endDay.month.month)
      self.onMonthChanged?(visibleMonth.year, visibleMonth.month)
    }
  }

  private func resolvePrimaryVisibleMonth(startDay: DayComponents, endDay: DayComponents) -> (year: Int, month: Int) {
    let fallback = (year: startDay.month.year, month: startDay.month.month)

    guard
      let startDate = _calendar.date(from: DateComponents(year: startDay.month.year, month: startDay.month.month, day: startDay.day)),
      let endDate = _calendar.date(from: DateComponents(year: endDay.month.year, month: endDay.month.month, day: endDay.day))
    else {
      return fallback
    }

    let lower = min(startDate.timeIntervalSinceReferenceDate, endDate.timeIntervalSinceReferenceDate)
    let upper = max(startDate.timeIntervalSinceReferenceDate, endDate.timeIntervalSinceReferenceDate)
    let midpoint = Date(timeIntervalSinceReferenceDate: lower + ((upper - lower) / 2.0))
    let comps = _calendar.dateComponents([.year, .month], from: midpoint)

    guard let year = comps.year, let month = comps.month else {
      return fallback
    }
    return (year, month)
  }

  private func updateCalendar() {
    _calendar = Calendar.current
    _calendar.firstWeekday = firstDayOfWeekJS + 1
  }

  // MARK: - Content Building

  @objc public func rebuildContent() {
    if displayModeStr == "week" {
      rebuildWeekDowLabels()
      updateWeekCells()
      return
    }
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

    // Month header provider (skip in horizontal mode — external label is used instead)
    if !isHorizontal {
      content = content.monthHeaderItemProvider { [weak self] monthComponents in
        guard let self = self else { return nil }
        return self.makeMonthHeaderItem(for: monthComponents)
      }
    }

    // Day-of-week provider
    content = content.dayOfWeekItemProvider { [weak self] month, weekdayIndex in
      guard let self = self else { return nil }
      return self.makeDayOfWeekItem(month: month, weekdayIndex: weekdayIndex)
    }

    // Day range highlight (Airbnb-style band behind range days)
    if let startKey = rangeStartKey,
       let endKey = rangeEndKey,
       startKey != endKey,
       let startDate = dateFromKey(startKey),
       let endDate = dateFromKey(endKey) {
      let rangeColorHex = selectedRangeColorHex.isEmpty ? "#BBDEFB" : selectedRangeColorHex
      let dateRanges: Set<ClosedRange<Date>> = [startDate...endDate]
      content = content.dayRangeItemProvider(for: dateRanges) { dayRangeLayoutContext in
        DayRangeHighlightView.calendarItemModel(
          invariantViewProperties: .init(colorHex: rangeColorHex),
          content: .init(
            framesOfDaysToHighlight: dayRangeLayoutContext.daysAndFrames.map { $0.frame }
          )
        )
      }
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

    // Range position detection
    let isRangeStart = key == rangeStartKey && rangeEndKey != nil
    let isRangeEnd = key == rangeEndKey && rangeStartKey != nil
    let isSingleDayRange = isRangeStart && isRangeEnd
    let isMiddleOfRange = isInRange && !isRangeStart && !isRangeEnd

    // Get event colors for this day
    let dayEvents = eventsByKey[key] ?? []
    let eventColorHexes: [String] = dayEvents.compactMap { $0["color"] as? String }

    // Determine text color hex
    let textColorHex: String
    if isDisabled {
      textColorHex = disabledDayTextColorHex.isEmpty ? "#C7C7CC" : disabledDayTextColorHex
    } else if (isRangeStart || isRangeEnd) && !isSingleDayRange {
      textColorHex = selectedDayTextColorHex.isEmpty ? "#FFFFFF" : selectedDayTextColorHex
    } else if isMiddleOfRange && !isSingleDayRange {
      // Middle-of-range days use normal text color (range indicator behind handles visual)
      textColorHex = dayTextColorHex.isEmpty ? "#000000" : dayTextColorHex
    } else if isSelected {
      textColorHex = selectedDayTextColorHex.isEmpty ? "#FFFFFF" : selectedDayTextColorHex
    } else if isToday {
      textColorHex = todayTextColorHex.isEmpty ? "#2196F3" : todayTextColorHex
    } else if isWeekend {
      textColorHex = weekendTextColorHex.isEmpty ? "#757575" : weekendTextColorHex
    } else {
      textColorHex = dayTextColorHex.isEmpty ? "#000000" : dayTextColorHex
    }

    // Determine background
    let bgFillHex: String
    let bgBorderHex: String
    let bgBorderWidth: CGFloat
    let isCircle: Bool

    if (isRangeStart || isRangeEnd) && !isSingleDayRange {
      // Range start/end: selection circle (range indicator behind provides the band)
      bgFillHex = selectedDayBgColorHex.isEmpty ? "#2196F3" : selectedDayBgColorHex
      bgBorderHex = ""
      bgBorderWidth = 0
      isCircle = true
    } else if isMiddleOfRange && !isSingleDayRange {
      // Middle of range: transparent (range indicator behind handles visual)
      bgFillHex = ""
      bgBorderHex = ""
      bgBorderWidth = 0
      isCircle = false
    } else if isSelected {
      bgFillHex = selectedDayBgColorHex.isEmpty ? "#2196F3" : selectedDayBgColorHex
      bgBorderHex = ""
      bgBorderWidth = 0
      isCircle = true
    } else if isToday {
      if !todayBgColorHex.isEmpty {
        bgFillHex = todayBgColorHex
        bgBorderHex = ""
        bgBorderWidth = 0
      } else {
        bgFillHex = ""
        bgBorderHex = todayTextColorHex.isEmpty ? "#2196F3" : todayTextColorHex
        bgBorderWidth = 1
      }
      isCircle = true
    } else {
      bgFillHex = ""
      bgBorderHex = ""
      bgBorderWidth = 0
      isCircle = true
    }

    let dayText = "\(dayComponents.day)"
    let accLabel = _dateFormatter.string(from: date)

    // Use DayWithEventsView when this day has events, otherwise standard DayView
    if !eventColorHexes.isEmpty {
      let properties = DayWithEventsView.InvariantViewProperties(
        textColorHex: textColorHex,
        fontSize: dayFontSizePt,
        bgFillColorHex: bgFillHex,
        bgBorderColorHex: bgBorderHex,
        bgBorderWidth: bgBorderWidth,
        isCircle: isCircle
      )

      return DayWithEventsView.calendarItemModel(
        invariantViewProperties: properties,
        content: .init(dayText: dayText, accessibilityLabel: accLabel, eventColorHexes: eventColorHexes)
      )
    } else {
      // Standard DayView — no events
      let textColor: UIColor = colorFromHex(textColorHex) ?? .label

      let bgDrawingConfig: DrawingConfig
      if (isRangeStart || isRangeEnd) && !isSingleDayRange {
        bgDrawingConfig = DrawingConfig(fillColor: colorFromHex(bgFillHex) ?? .systemBlue, borderColor: .clear)
      } else if isMiddleOfRange && !isSingleDayRange {
        bgDrawingConfig = .transparent
      } else if isSelected {
        bgDrawingConfig = DrawingConfig(fillColor: colorFromHex(bgFillHex) ?? .systemBlue, borderColor: .clear)
      } else if isToday && !todayBgColorHex.isEmpty {
        bgDrawingConfig = DrawingConfig(fillColor: colorFromHex(todayBgColorHex) ?? .clear, borderColor: .clear)
      } else if isToday {
        bgDrawingConfig = DrawingConfig(fillColor: .clear, borderColor: colorFromHex(bgBorderHex) ?? .systemBlue, borderWidth: 1)
      } else {
        bgDrawingConfig = .transparent
      }

      var properties = DayView.InvariantViewProperties.baseInteractive
      properties.textColor = textColor
      properties.font = .systemFont(ofSize: dayFontSizePt)
      properties.backgroundShapeDrawingConfig = bgDrawingConfig
      properties.shape = isCircle ? .circle : .rectangle(cornerRadius: 0)

      return DayView.calendarItemModel(
        invariantViewProperties: properties,
        content: .init(dayText: dayText, accessibilityLabel: accLabel, accessibilityHint: nil)
      )
    }
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
    if displayModeStr == "week" {
      showWeekContaining(date)
    } else {
      calendarView.scroll(toMonthContaining: date, scrollPosition: .firstFullyVisiblePosition, animated: animated)
      if isHorizontal {
        updateHorizontalMonthLabel(year: year, month: month)
        onMonthChanged?(year, month)
      }
    }
  }

  @objc public func scrollToDayContaining(year: Int, month: Int, day: Int, animated: Bool) {
    let components = DateComponents(year: year, month: month, day: day)
    guard let date = _calendar.date(from: components) else { return }
    if displayModeStr == "week" {
      showWeekContaining(date)
    } else if isHorizontal && isPaginated {
      // In horizontal paged mode, paging is month-based. Scrolling to day can be a no-op
      // when the target day's month is not promoted to the leading page.
      calendarView.scroll(toMonthContaining: date, scrollPosition: .firstFullyVisiblePosition, animated: animated)
      updateHorizontalMonthLabel(year: year, month: month)
      onMonthChanged?(year, month)
    } else {
      calendarView.scroll(toDayContaining: date, scrollPosition: .centered, animated: animated)
      if isHorizontal {
        updateHorizontalMonthLabel(year: year, month: month)
        onMonthChanged?(year, month)
      }
    }
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

  private func dateFromKey(_ key: String) -> Date? {
    let parts = key.split(separator: "-")
    guard parts.count == 3,
          let y = Int(parts[0]),
          let m = Int(parts[1]),
          let d = Int(parts[2]) else { return nil }
    return _calendar.date(from: DateComponents(year: y, month: m, day: d))
  }

  private func ensureHorizontalMonthLabel() {
    guard horizontalMonthLabel == nil else { return }
    let label = UILabel()
    label.textAlignment = .center
    label.font = .boldSystemFont(ofSize: monthHeaderFontSizePt)
    label.textColor = colorFromHex(monthHeaderTextColorHex) ?? .label
    label.isHidden = true
    addSubview(label)
    horizontalMonthLabel = label
  }

  private func updateHorizontalMonthLabel(year: Int, month: Int) {
    guard let label = horizontalMonthLabel, !label.isHidden else { return }
    let dateComponents = DateComponents(year: year, month: month)
    let date = _calendar.date(from: dateComponents) ?? Date()
    let formatter = DateFormatter()
    formatter.calendar = _calendar
    formatter.dateFormat = "MMMM yyyy"
    label.text = formatter.string(from: date)
    label.font = .boldSystemFont(ofSize: monthHeaderFontSizePt)
    label.textColor = colorFromHex(monthHeaderTextColorHex) ?? .label
    didInitializeHorizontalMonthLabel = true
  }

  private func syncHorizontalMonthLabelToInitialVisibleMonth(notify: Bool) {
    guard isHorizontal else { return }

    let now = Date()
    var anchorDate = now

    if minDateMs > 0 {
      let minDate = Date(timeIntervalSince1970: minDateMs / 1000)
      if anchorDate < minDate {
        anchorDate = minDate
      }
    }

    if maxDateMs > 0 {
      let maxDate = Date(timeIntervalSince1970: maxDateMs / 1000)
      if anchorDate > maxDate {
        anchorDate = maxDate
      }
    }

    let comps = _calendar.dateComponents([.year, .month], from: anchorDate)
    guard let year = comps.year, let month = comps.month else { return }

    updateHorizontalMonthLabel(year: year, month: month)
    if notify {
      onMonthChanged?(year, month)
    }
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

  // MARK: - Week Strip

  private func switchDisplayMode() {
    if displayModeStr == "week" {
      calendarView.isHidden = true
      horizontalMonthLabel?.isHidden = true
      ensureWeekStrip()
      weekContainer?.isHidden = false
      showWeekContaining(Date())
    } else {
      weekContainer?.isHidden = true
      calendarView.isHidden = false
      rebuildContent()
    }
    setNeedsLayout()
  }

  private func ensureWeekStrip() {
    guard weekContainer == nil else { return }

    let container = UIView()
    container.backgroundColor = .clear

    // Month label
    let monthLabel = UILabel()
    monthLabel.textAlignment = .center
    monthLabel.font = .boldSystemFont(ofSize: monthHeaderFontSizePt)
    monthLabel.textColor = colorFromHex(monthHeaderTextColorHex) ?? .label
    container.addSubview(monthLabel)
    weekMonthLabel = monthLabel

    // Day-of-week labels
    let dowStack = UIStackView()
    dowStack.axis = .horizontal
    dowStack.distribution = .fillEqually
    dowStack.alignment = .center

    let symbols = _calendar.shortWeekdaySymbols
    for i in 0..<7 {
      let idx = (_calendar.firstWeekday - 1 + i) % 7
      let label = UILabel()
      label.text = symbols[idx]
      label.textAlignment = .center
      label.font = .systemFont(ofSize: dayOfWeekFontSizePt, weight: .medium)
      label.textColor = colorFromHex(dayOfWeekTextColorHex) ?? .secondaryLabel
      dowStack.addArrangedSubview(label)
    }

    // Day cells
    let daysStack = UIStackView()
    daysStack.axis = .horizontal
    daysStack.distribution = .fillEqually
    daysStack.alignment = .fill

    var cells: [WeekDayCell] = []
    for _ in 0..<7 {
      let cell = WeekDayCell(frame: .zero)
      let tap = UITapGestureRecognizer(target: self, action: #selector(weekCellTapped(_:)))
      cell.addGestureRecognizer(tap)
      daysStack.addArrangedSubview(cell)
      cells.append(cell)
    }

    container.addSubview(dowStack)
    container.addSubview(daysStack)

    // Swipe gestures
    let leftSwipe = UISwipeGestureRecognizer(target: self, action: #selector(weekSwipeLeft))
    leftSwipe.direction = .left
    container.addGestureRecognizer(leftSwipe)

    let rightSwipe = UISwipeGestureRecognizer(target: self, action: #selector(weekSwipeRight))
    rightSwipe.direction = .right
    container.addGestureRecognizer(rightSwipe)

    addSubview(container)

    weekContainer = container
    weekDowStack = dowStack
    weekDaysStack = daysStack
    weekDayCells = cells
  }

  private func showWeekContaining(_ date: Date) {
    let comps = _calendar.dateComponents([.yearForWeekOfYear, .weekOfYear], from: date)
    guard let weekStart = _calendar.date(from: comps) else { return }
    _weekStartDate = weekStart
    updateWeekCells()

    // Update month label
    let formatter = DateFormatter()
    formatter.calendar = _calendar
    formatter.dateFormat = "MMMM yyyy"
    weekMonthLabel?.text = formatter.string(from: date)

    // Notify month changed
    let monthComps = _calendar.dateComponents([.year, .month], from: weekStart)
    onMonthChanged?(monthComps.year!, monthComps.month!)
  }

  private func updateWeekCells() {
    guard weekDayCells.count == 7 else { return }

    for i in 0..<7 {
      guard let date = _calendar.date(byAdding: .day, value: i, to: _weekStartDate) else { continue }
      let cell = weekDayCells[i]
      cell.date = date

      let key = dateKey(date)
      let isSelected = selectedDayKeys.contains(key)
      let isInRange = isKeyInRange(key)
      let isToday = _calendar.isDateInToday(date)
      let isDisabled = isDateDisabled(date)
      let isWeekend = _calendar.isDateInWeekend(date)

      // Range position
      let isRangeStart = key == rangeStartKey && rangeEndKey != nil
      let isRangeEnd = key == rangeEndKey && rangeStartKey != nil
      let isSingleDayRange = isRangeStart && isRangeEnd
      let isMiddleOfRange = isInRange && !isRangeStart && !isRangeEnd

      let day = _calendar.component(.day, from: date)
      cell.dayLabel.text = "\(day)"
      cell.dayLabel.font = .systemFont(ofSize: dayFontSizePt)

      // Text color
      if isDisabled {
        cell.dayLabel.textColor = colorFromHex(disabledDayTextColorHex) ?? UIColor(white: 0.8, alpha: 1)
      } else if (isRangeStart || isRangeEnd) && !isSingleDayRange {
        cell.dayLabel.textColor = colorFromHex(selectedDayTextColorHex) ?? .white
      } else if isMiddleOfRange && !isSingleDayRange {
        cell.dayLabel.textColor = colorFromHex(dayTextColorHex) ?? .label
      } else if isSelected {
        cell.dayLabel.textColor = colorFromHex(selectedDayTextColorHex) ?? .white
      } else if isToday {
        cell.dayLabel.textColor = colorFromHex(todayTextColorHex) ?? .systemBlue
      } else if isWeekend {
        cell.dayLabel.textColor = colorFromHex(weekendTextColorHex) ?? .secondaryLabel
      } else {
        cell.dayLabel.textColor = colorFromHex(dayTextColorHex) ?? .label
      }

      // Range type (for Airbnb-style band rendering)
      if isRangeStart && !isSingleDayRange {
        cell.rangeType = .start
      } else if isRangeEnd && !isSingleDayRange {
        cell.rangeType = .end
      } else if isMiddleOfRange && !isSingleDayRange {
        cell.rangeType = .middle
      } else {
        cell.rangeType = .none
      }

      // Range fill color
      if cell.rangeType != .none {
        cell.rangeBg.fillColor = (colorFromHex(selectedRangeColorHex) ?? .systemBlue.withAlphaComponent(0.2)).cgColor
      } else {
        cell.rangeBg.fillColor = UIColor.clear.cgColor
      }

      // Background circle
      if (isRangeStart || isRangeEnd) && !isSingleDayRange {
        cell.bgShape.fillColor = (colorFromHex(selectedDayBgColorHex) ?? .systemBlue).cgColor
        cell.bgShape.strokeColor = UIColor.clear.cgColor
        cell.bgShape.lineWidth = 0
      } else if isSelected {
        cell.bgShape.fillColor = (colorFromHex(selectedDayBgColorHex) ?? .systemBlue).cgColor
        cell.bgShape.strokeColor = UIColor.clear.cgColor
        cell.bgShape.lineWidth = 0
      } else if isToday {
        if !todayBgColorHex.isEmpty {
          cell.bgShape.fillColor = (colorFromHex(todayBgColorHex) ?? .clear).cgColor
          cell.bgShape.strokeColor = UIColor.clear.cgColor
          cell.bgShape.lineWidth = 0
        } else {
          cell.bgShape.fillColor = UIColor.clear.cgColor
          cell.bgShape.strokeColor = (colorFromHex(todayTextColorHex) ?? .systemBlue).cgColor
          cell.bgShape.lineWidth = 1
        }
      } else {
        cell.bgShape.fillColor = UIColor.clear.cgColor
        cell.bgShape.strokeColor = UIColor.clear.cgColor
        cell.bgShape.lineWidth = 0
      }

      // Event dot
      let events = eventsByKey[key] ?? []
      if !events.isEmpty {
        cell.dotView.isHidden = false
        let dotColor = events.first?["color"] as? String
        cell.dotView.backgroundColor = colorFromHex(dotColor ?? "") ?? .systemBlue
      } else {
        cell.dotView.isHidden = true
      }

      cell.alpha = isDisabled ? 0.3 : 1.0
      cell.setNeedsLayout()
    }
  }

  private func rebuildWeekDowLabels() {
    guard let dowStack = weekDowStack else { return }
    let symbols = _calendar.shortWeekdaySymbols
    for (i, view) in dowStack.arrangedSubviews.enumerated() {
      guard let label = view as? UILabel else { continue }
      let idx = (_calendar.firstWeekday - 1 + i) % 7
      label.text = symbols[idx]
      label.font = .systemFont(ofSize: dayOfWeekFontSizePt, weight: .medium)
      label.textColor = colorFromHex(dayOfWeekTextColorHex) ?? .secondaryLabel
    }
    weekMonthLabel?.font = .boldSystemFont(ofSize: monthHeaderFontSizePt)
    weekMonthLabel?.textColor = colorFromHex(monthHeaderTextColorHex) ?? .label
  }

  @objc private func weekCellTapped(_ gesture: UITapGestureRecognizer) {
    guard let cell = gesture.view as? WeekDayCell,
          let date = cell.date else { return }
    let comps = _calendar.dateComponents([.year, .month, .day], from: date)
    onDaySelect?(comps.year!, comps.month!, comps.day!)
  }

  @objc private func weekSwipeLeft() {
    guard let next = _calendar.date(byAdding: .weekOfYear, value: 1, to: _weekStartDate) else { return }
    let maxDate = maxDateMs > 0 ? Date(timeIntervalSince1970: maxDateMs / 1000) : Calendar.current.date(byAdding: .year, value: 2, to: Date())!
    if next <= maxDate {
      showWeekContaining(next)
    }
  }

  @objc private func weekSwipeRight() {
    guard let prev = _calendar.date(byAdding: .weekOfYear, value: -1, to: _weekStartDate) else { return }
    let minDate = minDateMs > 0 ? Date(timeIntervalSince1970: minDateMs / 1000) : Calendar.current.date(byAdding: .year, value: -2, to: Date())!
    if prev >= minDate {
      showWeekContaining(prev)
    }
  }
}

// MARK: - DayRangeHighlightView

/// Draws pill-shaped highlights behind rows of days in a selected range (Airbnb-style).
public final class DayRangeHighlightView: UIView, CalendarItemViewRepresentable {

  public struct InvariantViewProperties: Hashable {
    var colorHex: String
  }

  public struct Content: Equatable {
    let framesOfDaysToHighlight: [CGRect]
  }

  private var framesOfDaysToHighlight = [CGRect]()
  private var highlightColor: UIColor = .systemBlue.withAlphaComponent(0.2)

  fileprivate init(invariantViewProperties props: InvariantViewProperties) {
    super.init(frame: .zero)
    backgroundColor = .clear
    highlightColor = colorFromHex(props.colorHex) ?? .systemBlue.withAlphaComponent(0.2)
  }

  required init?(coder: NSCoder) { fatalError() }

  fileprivate func setContent(_ content: Content) {
    framesOfDaysToHighlight = content.framesOfDaysToHighlight
    setNeedsDisplay()
  }

  public override func draw(_ rect: CGRect) {
    guard let context = UIGraphicsGetCurrentContext() else { return }
    context.setFillColor(highlightColor.cgColor)

    // Group day frames by row (same minY = same row)
    var dayRowFrames = [CGRect]()
    var currentDayRowMinY: CGFloat?
    for dayFrame in framesOfDaysToHighlight {
      if dayFrame.minY != currentDayRowMinY {
        currentDayRowMinY = dayFrame.minY
        dayRowFrames.append(dayFrame)
      } else {
        let lastIndex = dayRowFrames.count - 1
        dayRowFrames[lastIndex] = dayRowFrames[lastIndex].union(dayFrame)
      }
    }

    // Draw pill-shaped highlight per row
    for dayRowFrame in dayRowFrames {
      let cornerRadius = dayRowFrame.height / 2
      let path = UIBezierPath(roundedRect: dayRowFrame, cornerRadius: cornerRadius)
      context.addPath(path.cgPath)
      context.fillPath()
    }
  }

  public static func makeView(
    withInvariantViewProperties props: InvariantViewProperties
  ) -> DayRangeHighlightView {
    DayRangeHighlightView(invariantViewProperties: props)
  }

  public static func setContent(_ content: Content, on view: DayRangeHighlightView) {
    view.setContent(content)
  }
}

// MARK: - DayWithEventsView

/// A custom day view that shows the day number and event indicator dots.
/// Used in place of DayView when a day has associated events.
public final class DayWithEventsView: UIView, CalendarItemViewRepresentable {

  public struct InvariantViewProperties: Hashable {
    var textColorHex: String
    var fontSize: CGFloat
    var bgFillColorHex: String
    var bgBorderColorHex: String
    var bgBorderWidth: CGFloat
    var isCircle: Bool
  }

  public struct Content: Equatable {
    let dayText: String
    let accessibilityLabel: String?
    let eventColorHexes: [String]
  }

  private let dayLabel = UILabel()
  private let bgShapeLayer = CAShapeLayer()
  private var dotLayers: [CAShapeLayer] = []
  private var isCircle: Bool = true

  fileprivate init(invariantViewProperties props: InvariantViewProperties) {
    super.init(frame: .zero)
    isCircle = props.isCircle

    // Background shape layer
    bgShapeLayer.fillColor = (colorFromHex(props.bgFillColorHex) ?? .clear).cgColor
    bgShapeLayer.strokeColor = (colorFromHex(props.bgBorderColorHex) ?? .clear).cgColor
    bgShapeLayer.lineWidth = props.bgBorderWidth
    layer.addSublayer(bgShapeLayer)

    // Day label
    dayLabel.textAlignment = .center
    dayLabel.font = .systemFont(ofSize: props.fontSize)
    dayLabel.textColor = colorFromHex(props.textColorHex) ?? .label
    addSubview(dayLabel)

    isUserInteractionEnabled = true
  }

  required init?(coder: NSCoder) { fatalError() }

  public override func layoutSubviews() {
    super.layoutSubviews()

    let w = bounds.width
    let h = bounds.height
    let size = min(w, h)

    // Background shape — centered
    if isCircle {
      let bgRect = CGRect(x: (w - size) / 2, y: (h - size) / 2, width: size, height: size)
      bgShapeLayer.path = UIBezierPath(ovalIn: bgRect).cgPath
    } else {
      // Rectangle for range — spans full width
      bgShapeLayer.path = UIBezierPath(rect: CGRect(x: 0, y: (h - size) / 2, width: w, height: size)).cgPath
    }

    // Day label — shifted up slightly to accommodate dots
    let labelOffset: CGFloat = dotLayers.isEmpty ? 0 : -3
    dayLabel.frame = CGRect(x: 0, y: labelOffset, width: w, height: h)

    layoutDots()
  }

  private func layoutDots() {
    let dotSize: CGFloat = 4
    let spacing: CGFloat = 3
    let count = dotLayers.count
    guard count > 0 else { return }

    let totalWidth = CGFloat(count) * dotSize + CGFloat(count - 1) * spacing
    var x = (bounds.width - totalWidth) / 2
    let y = bounds.height - dotSize - 4

    for dot in dotLayers {
      dot.path = UIBezierPath(ovalIn: CGRect(x: 0, y: 0, width: dotSize, height: dotSize)).cgPath
      dot.frame = CGRect(x: x, y: y, width: dotSize, height: dotSize)
      x += dotSize + spacing
    }
  }

  fileprivate func setContent(_ content: Content) {
    dayLabel.text = content.dayText
    accessibilityLabel = content.accessibilityLabel

    // Remove old dots
    for dot in dotLayers { dot.removeFromSuperlayer() }
    dotLayers = []

    // Add event dots (max 3)
    for hex in content.eventColorHexes.prefix(3) {
      let dot = CAShapeLayer()
      dot.fillColor = (colorFromHex(hex) ?? .systemBlue).cgColor
      layer.addSublayer(dot)
      dotLayers.append(dot)
    }

    setNeedsLayout()
  }

  public static func makeView(
    withInvariantViewProperties props: InvariantViewProperties
  ) -> DayWithEventsView {
    DayWithEventsView(invariantViewProperties: props)
  }

  public static func setContent(_ content: Content, on view: DayWithEventsView) {
    view.setContent(content)
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
    label.textAlignment = .natural  // Left-aligned (respects RTL)
    label.font = invariantViewProperties.font
    label.textColor = invariantViewProperties.textColor
    label.translatesAutoresizingMaskIntoConstraints = false
    addSubview(label)
    NSLayoutConstraint.activate([
      label.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 2),
      label.trailingAnchor.constraint(equalTo: trailingAnchor),
      label.topAnchor.constraint(equalTo: topAnchor, constant: 12),
      label.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -4),
    ])
  }

  required init?(coder: NSCoder) { fatalError() }

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
    label.translatesAutoresizingMaskIntoConstraints = false
    addSubview(label)
    NSLayoutConstraint.activate([
      label.leadingAnchor.constraint(equalTo: leadingAnchor),
      label.trailingAnchor.constraint(equalTo: trailingAnchor),
      label.topAnchor.constraint(equalTo: topAnchor),
      label.bottomAnchor.constraint(equalTo: bottomAnchor),
    ])
  }

  required init?(coder: NSCoder) { fatalError() }

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

// MARK: - WeekDayCell

/// A single day cell used in the custom week strip view.
fileprivate final class WeekDayCell: UIView {

  enum RangeType {
    case none, start, middle, end
  }

  let dayLabel = UILabel()
  let bgShape = CAShapeLayer()
  let rangeBg = CAShapeLayer()
  let dotView = UIView()
  var date: Date?
  var rangeType: RangeType = .none

  override init(frame: CGRect) {
    super.init(frame: frame)

    rangeBg.fillColor = UIColor.clear.cgColor
    layer.addSublayer(rangeBg)

    bgShape.fillColor = UIColor.clear.cgColor
    bgShape.strokeColor = UIColor.clear.cgColor
    layer.addSublayer(bgShape)

    dayLabel.textAlignment = .center
    addSubview(dayLabel)

    dotView.isHidden = true
    dotView.clipsToBounds = true
    addSubview(dotView)

    isUserInteractionEnabled = true
  }

  required init?(coder: NSCoder) { fatalError() }

  override func layoutSubviews() {
    super.layoutSubviews()
    let w = bounds.width
    let h = bounds.height
    let size = min(w, h)

    // Range background band
    rangeBg.frame = bounds
    switch rangeType {
    case .start:
      rangeBg.path = UIBezierPath(rect: CGRect(x: w / 2, y: (h - size) / 2, width: w / 2, height: size)).cgPath
    case .end:
      rangeBg.path = UIBezierPath(rect: CGRect(x: 0, y: (h - size) / 2, width: w / 2, height: size)).cgPath
    case .middle:
      rangeBg.path = UIBezierPath(rect: CGRect(x: 0, y: (h - size) / 2, width: w, height: size)).cgPath
    case .none:
      rangeBg.path = nil
    }

    // Selection/today circle
    bgShape.frame = bounds
    let bgRect = CGRect(x: (w - size) / 2, y: (h - size) / 2, width: size, height: size)
    bgShape.path = UIBezierPath(ovalIn: bgRect).cgPath

    dayLabel.frame = bounds

    let dotSize: CGFloat = 4
    dotView.frame = CGRect(x: (w - dotSize) / 2, y: h - dotSize - 2, width: dotSize, height: dotSize)
    dotView.layer.cornerRadius = dotSize / 2
  }
}
