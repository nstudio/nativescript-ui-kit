import { ShowModalOptions } from '@nativescript/core';
import { DemoSharedBase } from '../utils';
import { NCalendar, DisplayMode, SelectionMode, Orientation, CalendarDayEventData, CalendarMonthEventData, CalendarEvent } from '@nstudio/nativescript-calendar';

const SCENARIOS = ['Single', 'Range', 'Multiple', 'Horizontal', 'Week', 'Events', 'Disabled', 'Styled'];

function pad(n: number): string {
  return n < 10 ? '0' + n : '' + n;
}

function formatDate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export class DemoSharedNativescriptCalendar extends DemoSharedBase {
  calendar: NCalendar;

  // UI state
  scenarioLabel = 'Single Selection';
  statusText = 'Tap a day to select it';
  selectedText = '';
  scenarioDescription = 'Vertical scroll, tap to select a single date';
  private _scenarioIndex = 0;
  private _events: CalendarEvent[] = [];

  onCalendarLoaded(args: any) {
    this.calendar = args.object as NCalendar;

    this.calendar.on(NCalendar.daySelectEvent, (e: CalendarDayEventData) => {
      this._updateSelectedText();
      if (SCENARIOS[this._scenarioIndex] === 'Events') {
        this._showEventsForDay(e.data.day.date);
      }
    });

    this.calendar.on(NCalendar.dayDeselectEvent, (e: CalendarDayEventData) => {
      this._updateSelectedText();
    });

    this.calendar.on(NCalendar.monthChangedEvent, (e: CalendarMonthEventData) => {
      const m = e.data.month;
      // this.set('statusText', `${this._monthName(m.month)} ${m.year}`);
      this.set('statusText', `Selected:`);
    });

    // Start in first scenario
    this._applyScenario(0);
  }

  // Scenario Navigation

  nextScenario() {
    this._scenarioIndex = (this._scenarioIndex + 1) % SCENARIOS.length;
    this._applyScenario(this._scenarioIndex);
  }

  prevScenario() {
    this._scenarioIndex = (this._scenarioIndex - 1 + SCENARIOS.length) % SCENARIOS.length;
    this._applyScenario(this._scenarioIndex);
  }

  private _applyScenario(index: number) {
    if (!this.calendar) return;
    const name = SCENARIOS[index];

    // Reset to defaults
    this.calendar.clearSelection();
    this.calendar.events = [];
    this._events = [];
    this.calendar.displayMode = DisplayMode.Month;
    this.calendar.orientation = Orientation.Vertical;
    this.calendar.scrollPaged = false;
    this.calendar.pinDaysOfWeekToTop = true;

    // Reset colors to defaults
    this.calendar.todayTextColor = null;
    this.calendar.todayBackgroundColor = null;
    this.calendar.selectedDayTextColor = null;
    this.calendar.selectedDayBackgroundColor = null;
    this.calendar.selectedRangeColor = null;
    this.calendar.weekendTextColor = null;
    this.calendar.dayTextColor = null;
    this.calendar.monthHeaderTextColor = null;
    this.calendar.dayOfWeekTextColor = null;
    this.calendar.outDateTextColor = null;
    this.calendar.disabledDayTextColor = null;
    this.calendar.disabledDates = [];
    this.calendar.disabledWeekdays = [];

    switch (name) {
      case 'Single':
        this._setupSingle();
        break;
      case 'Range':
        this._setupRange();
        break;
      case 'Multiple':
        this._setupMultiple();
        break;
      case 'Horizontal':
        this._setupHorizontal();
        break;
      case 'Week':
        this._setupWeek();
        break;
      case 'Events':
        this._setupEvents();
        break;
      case 'Disabled':
        this._setupDisabled();
        break;
      case 'Styled':
        this._setupStyled();
        break;
    }

    this.set('selectedText', '');
    this.calendar.goToToday(false);
  }

  // Scenario Setups

  private _setupSingle() {
    this.calendar.selectionMode = SelectionMode.Single;
    this.set('scenarioLabel', 'Single Selection');
    this.set('scenarioDescription', 'Vertical scroll \u2022 Tap to select one date');
    this.set('statusText', 'Tap a day to select it');
  }

  private _setupRange() {
    this.calendar.selectionMode = SelectionMode.Range;
    this.set('scenarioLabel', 'Range Selection');
    this.set('scenarioDescription', 'Vertical scroll \u2022 Tap start, then tap end');
    this.set('statusText', 'Tap a start date, then an end date');
  }

  private _setupMultiple() {
    this.calendar.selectionMode = SelectionMode.Multiple;
    this.set('scenarioLabel', 'Multi Selection');
    this.set('scenarioDescription', 'Vertical scroll \u2022 Tap to toggle dates');
    this.set('statusText', 'Tap dates to toggle selection');
  }

  private _setupHorizontal() {
    this.calendar.selectionMode = SelectionMode.Single;
    this.calendar.orientation = Orientation.Horizontal;
    this.calendar.scrollPaged = true;
    this.calendar.pinDaysOfWeekToTop = false;
    this.set('scenarioLabel', 'Horizontal Paged');
    this.set('scenarioDescription', 'Swipe left/right \u2022 One month at a time');
    this.set('statusText', 'Swipe to navigate months');
  }

  private _setupWeek() {
    this.calendar.selectionMode = SelectionMode.Single;
    this.calendar.displayMode = DisplayMode.Week;
    this.set('scenarioLabel', 'Week View');
    this.set('scenarioDescription', 'Swipe left/right \u2022 One week at a time');
    this.set('statusText', 'Swipe to navigate weeks');
  }

  private _setupEvents() {
    this.calendar.selectionMode = SelectionMode.Single;
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();

    this._events = [
      { date: new Date(y, m, 3), color: '#E91E63', data: { title: 'Team Standup', time: '9:00 AM' } },
      { date: new Date(y, m, 3), color: '#2196F3', data: { title: 'Design Review', time: '2:00 PM' } },
      { date: new Date(y, m, 7), color: '#4CAF50', data: { title: 'Lunch with Sarah', time: '12:30 PM' } },
      { date: new Date(y, m, 12), color: '#FF9800', data: { title: 'Sprint Planning', time: '10:00 AM' } },
      { date: new Date(y, m, 15), color: '#9C27B0', data: { title: 'Product Demo', time: '3:00 PM' } },
      { date: new Date(y, m, 15), color: '#FF5722', data: { title: 'Happy Hour', time: '5:30 PM' } },
      { date: new Date(y, m, 20), color: '#00BCD4', data: { title: 'Doctor Appointment', time: '11:00 AM' } },
      { date: new Date(y, m, 22), color: '#E91E63', data: { title: 'Conference Call', time: '4:00 PM' } },
      { date: new Date(y, m, 28), color: '#4CAF50', data: { title: 'Team Offsite', time: '9:00 AM' } },
      { date: new Date(y, m + 1, 5), color: '#2196F3', data: { title: 'Quarterly Review', time: '1:00 PM' } },
      { date: new Date(y, m + 1, 10), color: '#FF9800', data: { title: 'Workshop', time: '10:00 AM' } },
      { date: new Date(y, m + 1, 18), color: '#9C27B0', data: { title: 'Release Day', time: '9:00 AM' } },
      { date: new Date(y, m - 1, 10), color: '#E91E63', data: { title: 'Retrospective', time: '2:00 PM' } },
      { date: new Date(y, m - 1, 20), color: '#4CAF50', data: { title: 'Birthday Lunch', time: '12:00 PM' } },
    ];
    this.calendar.events = this._events;
    this.set('scenarioLabel', 'Events');
    this.set('scenarioDescription', 'Pinned day headers \u2022 Tap a day with dots');
    this.set('statusText', 'Tap a day with events to see details');
  }

  private _setupDisabled() {
    this.calendar.selectionMode = SelectionMode.Single;
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();

    // Disable specific dates (e.g. holidays)
    this.calendar.disabledDates = [new Date(y, m, 5), new Date(y, m, 10), new Date(y, m, 15), new Date(y, m, 25)];

    // Disable weekends (0 = Sunday, 6 = Saturday)
    this.calendar.disabledWeekdays = [0, 6];

    this.set('scenarioLabel', 'Disabled Dates');
    this.set('scenarioDescription', 'Weekends + specific dates disabled');
    this.set('statusText', 'Weekends and select dates are disabled');
  }

  private _setupStyled() {
    this.calendar.selectionMode = SelectionMode.Single;
    // Dark elegant theme
    this.calendar.set('todayTextColor', '#FF6B6B');
    this.calendar.set('todayBackgroundColor', '#2D2D2D');
    this.calendar.set('selectedDayTextColor', '#FFFFFF');
    this.calendar.set('selectedDayBackgroundColor', '#FF6B6B');
    this.calendar.set('selectedRangeColor', '#FF6B6B40');
    this.calendar.set('weekendTextColor', '#666666');
    this.calendar.set('dayTextColor', '#333333');
    this.calendar.set('monthHeaderTextColor', '#FF6B6B');
    this.calendar.set('dayOfWeekTextColor', '#999999');
    this.calendar.set('outDateTextColor', '#CCCCCC');
    this.set('scenarioLabel', 'Custom Styled');
    this.set('scenarioDescription', 'Custom color theme \u2022 All style properties');
    this.set('statusText', 'Custom accent color theme');
  }

  // Navigation

  goToToday() {
    if (this.calendar) {
      this.calendar.goToToday(true);
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

  clearSelection() {
    if (this.calendar) {
      this.calendar.clearSelection();
      this.set('selectedText', '');
    }
  }

  // Helpers

  private _showEventsForDay(date: Date) {
    const key = formatDate(date);
    const dayEvents = this._events.filter((ev) => formatDate(ev.date) === key);
    if (!dayEvents.length) return;

    const page = this.calendar.page;
    if (!page) return;

    const events = dayEvents.map((ev) => {
      const d = ev.data || {};
      return { title: d.title || 'Event', time: d.time || '', color: ev.color || '#2196F3' };
    });

    const dateFormatted = date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
    const eventCount = `${events.length} event${events.length > 1 ? 's' : ''}`;

    const options: ShowModalOptions = {
      fullscreen: __ANDROID__,
      context: { dateFormatted, eventCount, events },
      closeCallback() {},
    };
    page.showModal('~/modal/calendar-events', options);
  }

  private _updateSelectedText() {
    if (!this.calendar) return;
    const dates = this.calendar.getSelectedDates();
    if (dates.length === 0) {
      this.set('selectedText', '');
    } else if (dates.length === 1) {
      this.set('selectedText', formatDate(dates[0]));
    } else if (dates.length === 2 && this.calendar.selectionMode === SelectionMode.Range) {
      this.set('selectedText', `${formatDate(dates[0])}  \u2192  ${formatDate(dates[dates.length - 1])}`);
    } else if (this.calendar.selectionMode === SelectionMode.Range) {
      this.set('selectedText', `${formatDate(dates[0])}  \u2192  ${formatDate(dates[dates.length - 1])} (${dates.length} days)`);
    } else {
      this.set('selectedText', `${dates.length} dates selected`);
    }
  }

  private _monthName(month: number): string {
    const names = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return names[month] || '';
  }
}
