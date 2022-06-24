import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptSplitViewLayoutComponent } from './nativescript-split-view-layout.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptSplitViewLayoutComponent }])],
  declarations: [NativescriptSplitViewLayoutComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class NativescriptSplitViewLayoutModule {}
