import { NgModule, ModuleWithProviders } from '@angular/core';
import { FontIconPipe, FontIconPurePipe } from './fonticon.pipe';
import { FontIconService, USE_STORE } from './fonticon.service';

export * from './fonticon.pipe';
export * from './fonticon.service';

@NgModule({
  declarations: [
    FontIconPipe,
    FontIconPurePipe
  ],
  exports: [
    FontIconPipe,
    FontIconPurePipe
  ]
})
export class FontIconModule {

  constructor(fonticon: FontIconService) {}
  
  static forRoot(providedConfig: any = {}): ModuleWithProviders<FontIconModule> {
    return {
      ngModule: FontIconModule,
      providers: [
        { provide: USE_STORE, useValue: providedConfig },
        FontIconService
      ]
    };
  }
}
