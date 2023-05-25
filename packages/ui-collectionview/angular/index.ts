// External
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { CollectionViewComponent, TemplateKeyDirective, TemplateHeaderDirective, TemplateFooterDirective } from './collectionview.component';
export { CollectionViewComponent, TemplateKeyDirective, TemplateHeaderDirective, TemplateFooterDirective } from './collectionview.component';

@NgModule({
  declarations: [CollectionViewComponent, TemplateKeyDirective, TemplateHeaderDirective, TemplateFooterDirective],
  exports: [CollectionViewComponent, TemplateKeyDirective, TemplateHeaderDirective, TemplateFooterDirective],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CollectionViewModule {}
