import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { UIChartsView } from '@nativescript/ui-charts';
import { UIChartsViewDirective } from './chart.directive';

export * from './chart.directive';

@NgModule({
  declarations: [UIChartsViewDirective],
  exports: [UIChartsViewDirective],
})
export class UIChartsViewModule {}

registerElement('UIChartsView', () => UIChartsView);
