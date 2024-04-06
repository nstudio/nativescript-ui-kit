import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptParallaxComponent } from './nativescript-parallax.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptParallaxComponent }])],
  declarations: [NativescriptParallaxComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NativescriptParallaxModule {}
