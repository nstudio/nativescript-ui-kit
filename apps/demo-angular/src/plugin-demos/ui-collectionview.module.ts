import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { UiCollectionviewComponent } from './ui-collectionview.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: UiCollectionviewComponent }])],
  declarations: [UiCollectionviewComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class UiCollectionviewModule {}
