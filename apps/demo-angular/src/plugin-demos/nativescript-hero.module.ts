import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptHeroComponent } from './nativescript-hero.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptHeroComponent }])],
  declarations: [NativescriptHeroComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class NativescriptHeroModule {}
