import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { CollectionViewModule } from '@nstudio/ui-collectionview/angular';
import { UiCollectionviewComponent } from './ui-collectionview.component';

@NgModule({
	imports: [NativeScriptCommonModule, CollectionViewModule, NativeScriptRouterModule.forChild([{ path: '', component: UiCollectionviewComponent }])],
  declarations: [UiCollectionviewComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class UiCollectionviewModule {}
