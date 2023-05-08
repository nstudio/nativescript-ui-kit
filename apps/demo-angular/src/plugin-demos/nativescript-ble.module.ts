import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptBleComponent } from './nativescript-ble.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptBleComponent }])],
  declarations: [NativescriptBleComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class NativescriptBleModule {}
