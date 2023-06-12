import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptWaterRippleComponent } from './nativescript-water-ripple.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptWaterRippleComponent }])],
  declarations: [NativescriptWaterRippleComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class NativescriptWaterRippleModule {}
