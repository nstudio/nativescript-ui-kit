import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptRichPasteComponent } from './nativescript-rich-paste.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptRichPasteComponent }])],
  declarations: [NativescriptRichPasteComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NativescriptRichPasteModule {}
