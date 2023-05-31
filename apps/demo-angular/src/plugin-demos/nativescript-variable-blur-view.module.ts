import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptVariableBlurViewComponent } from './nativescript-variable-blur-view.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptVariableBlurViewComponent }])],
  declarations: [NativescriptVariableBlurViewComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class NativescriptVariableBlurViewModule {}
