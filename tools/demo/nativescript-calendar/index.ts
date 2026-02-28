import { DemoSharedBase } from '../utils';
import { NCalendar, DisplayMode, SelectionMode, Orientation, CalendarDayEventData, CalendarMonthEventData, CalendarScrollEventData, CalendarEvent } from '@nstudio/nativescript-calendar';

export class DemoSharedNativescriptCalendar extends DemoSharedBase {
  calendar: NCalendar;
  statusText = '';
  selectedText = 'No selection';

  // ── Calendar setup ──────────────────────────────────────────────────

  onCalendarLoaded(args: any) {
    this.calendar = args.object as NCalendar;

    this.calendar.on(NCalendar.daySelectEvent, (e: CalendarDayEventData) => {
      const d = e.data.day;
      console.log(`Day selected: ${d.year}-${d.month}-${d.day}`);
      this._updateSelectedText();
    });

    this.calendar.on(NCalendar.dayDeselectEvent, (e: CalendarDayEventData) => {
      const d = e.data.day;
      console.log(`Day deselected: ${d.year}-${d.month}-${d.day}`);
      this._updateSelectedText();
    });

    this.calendar.on(NCalendar.monthChangedEvent, (e: CalendarMonthEventData) => {
      const m = e.data.month;
      this.set('statusText', `Viewing: ${m.year}-${m.month < 10 ? '0' : ''}${m.month}`);
    });

    this.calendar.on(NCalendar.scrollEvent, (e: CalendarScrollEventData) => {
      // Scroll events available for custom behavior
    });

    // Add sample events
    const today = new Date();
    const sampleEvents: CalendarEvent[] = [
      { date: new Date(today.getFullYear(), today.getMonth(), 5), color: '#FF5722' },
      { date: new Date(today.getFullYear(), today.getMonth(), 12), color: '#4CAF50' },
      { date: new Date(today.getFullYear(), today.getMonth(), 20), color: '#2196F3' },
      { date: new Date(today.getFullYear(), today.getMonth(), 25), color: '#FF9800' },
    ];
    this.calendar.events = sampleEvents;
  }

  // ── Display Mode ────────────────────────────────────────────────────

  switchToMonth() {
    if (this.calendar) {
      this.calendar.displayMode = DisplayMode.Month;
      this.set('statusText', 'Mode: Month');
    }
  }

  switchToWeek() {
    if (this.calendar) {
      this.calendar.displayMode = DisplayMode.Week;
      this.set('statusText', 'Mode: Week');
    }
  }

  switchToYear() {
    if (this.calendar) {
      this.calendar.displayMode = DisplayMode.Year;
      this.set('statusText', 'Mode: Year');
    }
  }

  // ── Selection Mode ──────────────────────────────────────────────────

  setSelectionNone() {
    if (this.calendar) {
      this.calendar.selectionMode = SelectionMode.None;
      this.set('statusText', 'Selection: None');
    }
  }

  setSelectionSingle() {
    if (this.calendar) {
      this.calendar.selectionMode = SelectionMode.Single;
      this.set('statusText', 'Selection: Single');
    }
  }

  setSelectionMultiple() {
    if (this.calendar) {
      this.calendar.selectionMode = SelectionMode.Multiple;
      this.set('statusText', 'Selection: Multiple');
    }
  }

  setSelectionRange() {
    if (this.calendar) {
      this.calendar.selectionMode = SelectionMode.Range;
      this.set('statusText', 'Selection: Range');
    }
  }

  // ── Navigation ──────────────────────────────────────────────────────

  goToToday() {
    if (this.calendar) {
      this.calendar.goToToday(true);
      this.set('statusText', 'Scrolled to today');
    }
  }

  goToPrevMonth() {
    if (this.calendar) {
      this.calendar.goToPreviousMonth(true);
    }
  }

  goToNextMonth() {
    if (this.calendar) {
      this.calendar.goToNextMonth(true);
    }
  }

  // ── Orientation ─────────────────────────────────────────────────────

  toggleOrientation() {
    if (this.calendar) {
      const isVertical = this.calendar.orientation === Orientation.Vertical;
      this.calendar.orientation = isVertical ? Orientation.Horizontal : Orientation.Vertical;
      this.set('statusText', `Orientation: ${this.calendar.orientation}`);
    }
  }

  togglePaged() {
    if (this.calendar) {
      this.calendar.scrollPaged = !this.calendar.scrollPaged;
      this.set('statusText', `Paged: ${this.calendar.scrollPaged}`);
    }
  }

  // ── Helpers ─────────────────────────────────────────────────────────

  clearSelection() {
    if (this.calendar) {
      this.calendar.clearSelection();
      this._updateSelectedText();
    }
  }

  private _updateSelectedText() {
    if (!this.calendar) return;
    const dates = this.calendar.getSelectedDates();
    if (dates.length === 0) {
      this.set('selectedText', 'No selection');
    } else if (dates.length === 1) {
      const d = dates[0];
      this.set('selectedText', `Selected: ${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
    } else {
      this.set('selectedText', `Selected: ${dates.length} dates`);
    }
  }
}
