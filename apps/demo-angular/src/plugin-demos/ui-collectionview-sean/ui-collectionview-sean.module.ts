import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { CollectionViewModule } from '@nstudio/ui-collectionview/angular';
import { UiCollectionviewSeanComponent } from '../ui-collectionview-sean/ui-collectionview-sean.component';

@NgModule({
	imports: [NativeScriptCommonModule, CollectionViewModule, NativeScriptRouterModule.forChild([{ path: '', component: UiCollectionviewSeanComponent }])],
  declarations: [UiCollectionviewSeanComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class UiCollectionviewSeanModule {}