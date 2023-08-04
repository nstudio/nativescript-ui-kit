import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptLabelGlitchComponent } from './nativescript-label-glitch.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptLabelGlitchComponent }])],
  declarations: [NativescriptLabelGlitchComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class NativescriptLabelGlitchModule {}
