import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptToolbarComponent } from './nativescript-toolbar.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptToolbarComponent }])],
  declarations: [NativescriptToolbarComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NativescriptToolbarModule {}
