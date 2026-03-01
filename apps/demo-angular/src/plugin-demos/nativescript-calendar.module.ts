import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptCalendarComponent } from './nativescript-calendar.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptCalendarComponent }])],
  declarations: [NativescriptCalendarComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NativescriptCalendarModule {}
