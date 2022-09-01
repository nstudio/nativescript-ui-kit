import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptSplitSheetComponent } from './nativescript-split-sheet.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptSplitSheetComponent }])],
  declarations: [NativescriptSplitSheetComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class NativescriptSplitSheetModule {}
