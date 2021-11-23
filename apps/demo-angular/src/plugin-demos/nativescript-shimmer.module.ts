import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptShimmerComponent } from './nativescript-shimmer.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptShimmerComponent }])],
  declarations: [NativescriptShimmerComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class NativescriptShimmerModule {}
