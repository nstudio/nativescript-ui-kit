import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptFluidSegmentedBarComponent } from './nativescript-fluid-segmented-bar.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptFluidSegmentedBarComponent }])],
  declarations: [NativescriptFluidSegmentedBarComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class NativescriptFluidSegmentedBarModule {}
