import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptLabelMarqueeComponent } from './nativescript-label-marquee.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptLabelMarqueeComponent }])],
  declarations: [NativescriptLabelMarqueeComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class NativescriptLabelMarqueeModule {}
