import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptCoachmarksComponent } from './nativescript-coachmarks.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptCoachmarksComponent }])],
  declarations: [NativescriptCoachmarksComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class NativescriptCoachmarksModule {}
