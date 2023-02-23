// External
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { CollectionViewComponent, TemplateKeyDirective } from './collectionview.component';
export { CollectionViewComponent, TemplateKeyDirective } from './collectionview.component';

@NgModule({
    declarations: [CollectionViewComponent, TemplateKeyDirective],
    exports: [CollectionViewComponent, TemplateKeyDirective],
    schemas: [NO_ERRORS_SCHEMA]
})
export class CollectionViewModule {}
