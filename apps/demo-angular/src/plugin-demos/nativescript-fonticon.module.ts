import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptFonticonComponent } from './nativescript-fonticon.component';
import { FontIconModule, USE_STORE } from 'nativescript-fonticon/angular';
import { fontAwesome } from '../fontawesome';
import { ionIcons } from '../ionicons';

@NgModule({
	imports: [NativeScriptCommonModule, FontIconModule.forRoot({}), NativeScriptRouterModule.forChild([{ path: '', component: NativescriptFonticonComponent }])],
  declarations: [NativescriptFonticonComponent],
  providers: [
    {
      // ensure dependency injector inlines icons sets (TNSFontIconModule.forRoot doesn't work with inlining)
      provide: USE_STORE,
      useValue: {
        fa: fontAwesome,
        ion: ionIcons,
      },
    },
  ],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class NativescriptFonticonModule {}
