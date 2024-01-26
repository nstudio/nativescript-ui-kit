import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptMarkdownViewComponent } from './nativescript-markdown-view.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptMarkdownViewComponent }])],
  declarations: [NativescriptMarkdownViewComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class NativescriptMarkdownViewModule {}
