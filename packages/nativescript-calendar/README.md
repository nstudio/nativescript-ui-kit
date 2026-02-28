# @nstudio/nativescript-calendar

A full-featured native calendar view for NativeScript. Uses [HorizonCalendar](https://github.com/airbnb/HorizonCalendar) (iOS, by Airbnb) and [kizitonwose Calendar](https://github.com/kizitonwose/Calendar) (Android).

```bash
npm install @nstudio/nativescript-calendar
```

Compatible with Angular, React, Solid, Svelte and Vue.

## Usage

### NativeScript Core

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd"
  xmlns:cal="@nstudio/nativescript-calendar"
  navigatingTo="navigatingTo">
  <cal:NCalendar
    displayMode="month"
    selectionMode="single"
    orientation="vertical"
    daySelect="{{ onDaySelect }}" />
</Page>
```

```typescript
import { NCalendar, CalendarDayEventData, SelectionMode } from '@nstudio/nativescript-calendar';

// Listen for selection
function onDaySelect(args: CalendarDayEventData) {
  console.log('Selected:', args.data.day.date);
}

// Programmatic control
const calendar = page.getViewById<NCalendar>('calendar');
calendar.goToToday(true);
calendar.selectDate(new Date(2026, 2, 15));
```

### Angular

```typescript
import { registerElement } from '@nativescript/angular';
import { NCalendar } from '@nstudio/nativescript-calendar';

registerElement('NCalendar', () => NCalendar);
```

```html
<NCalendar
  displayMode="month"
  selectionMode="range"
  orientation="vertical"
  (daySelect)="onDaySelect($event)">
</NCalendar>
```

### Other Flavors

```typescript
import { NCalendar } from '@nstudio/nativescript-calendar';

// Vue
Vue.registerElement('NCalendar', () => NCalendar);

// React
registerElement('nCalendar', () => NCalendar);

// Svelte
registerNativeViewElement('nCalendar', () => NCalendar);

// Solid
registerElement('nCalendar', NCalendar);
```

## Quick Examples

### Range Selection

```xml
<cal:NCalendar selectionMode="range" />
```

```typescript
calendar.on('daySelect', (args: CalendarDayEventData) => {
  const range = calendar.selectedDateRange;
  if (range) {
    console.log(`${range.start} to ${range.end}`);
  }
});
```

### Week View

```xml
<cal:NCalendar displayMode="week" />
```

### Horizontal Paged

```xml
<cal:NCalendar orientation="horizontal" scrollPaged="true" />
```

### Events / Markers

```typescript
calendar.events = [
  { date: new Date(2026, 2, 3), color: '#E91E63', data: { title: 'Team Standup' } },
  { date: new Date(2026, 2, 3), color: '#2196F3', data: { title: 'Design Review' } },
  { date: new Date(2026, 2, 7), color: '#4CAF50', data: { title: 'Lunch' } },
];
```

### Custom Colors

```xml
<cal:NCalendar
  todayTextColor="#FF6B6B"
  selectedDayBackgroundColor="#FF6B6B"
  selectedDayTextColor="#FFFFFF"
  monthHeaderTextColor="#FF6B6B"
  weekendTextColor="#666666" />
```

## Docs

[https://plugins.nstudio.io/plugins/calendar](https://plugins.nstudio.io/plugins/calendar)

## License

Apache License Version 2.0
