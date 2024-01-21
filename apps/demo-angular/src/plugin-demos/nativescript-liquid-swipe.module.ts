import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptLiquidSwipeComponent } from './nativescript-liquid-swipe.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptLiquidSwipeComponent }])],
  declarations: [NativescriptLiquidSwipeComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class NativescriptLiquidSwipeModule {}
