import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptMenuComponent } from './nativescript-menu.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptMenuComponent }])],
  declarations: [NativescriptMenuComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NativescriptMenuModule {}
