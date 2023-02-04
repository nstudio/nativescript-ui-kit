import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptRiveComponent } from './nativescript-rive.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptRiveComponent }])],
  declarations: [NativescriptRiveComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class NativescriptRiveModule {}
