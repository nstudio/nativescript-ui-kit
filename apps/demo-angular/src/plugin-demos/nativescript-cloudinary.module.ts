import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptCloudinaryComponent } from './nativescript-cloudinary.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptCloudinaryComponent }])],
  declarations: [NativescriptCloudinaryComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NativescriptCloudinaryModule {}
