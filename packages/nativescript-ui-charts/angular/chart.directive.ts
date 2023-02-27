import { Directive, ElementRef, Inject, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { EventData } from '@nativescript/core';
import { UIChartsView } from '@nativescript/ui-charts';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'UIChartsView',
})
export class UIChartsViewDirective implements OnChanges, OnDestroy {
  private _uiChartsView: UIChartsView = null;
  private _chartViewLoaded = false;

  @Input() options: any = null;
  @Input() langOptions: any = null;
  @Input() updateChartContent = false;
  //////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(@Inject(ElementRef) _elementRef: ElementRef) {
    this._uiChartsView = _elementRef.nativeElement;
    this._uiChartsView.on('loaded', this.onChartViewLoaded, this);
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////
  public ngOnDestroy() {
    this._uiChartsView.off('loaded', this.onChartViewLoaded, this);
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////
  onChartViewLoaded(args: EventData) {
    this.setChartViewOptions();
    this._chartViewLoaded = true;
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'options':
            if (changes.options.currentValue) {
              this.options = changes.options.currentValue;
              if (this._chartViewLoaded) {
                this.setChartViewOptions();
              }
            }
            break;
          case 'langOptions':
            if (changes.langOptions.currentValue) {
              this.langOptions = changes.langOptions.currentValue;
              if (this._chartViewLoaded) {
                this._uiChartsView.setLangOptions(this.langOptions);
              }
            }
            break;
          case 'updateChartContent':
            if (changes.updateChartContent) {
              this.updateChartContent = changes.updateChartContent.currentValue === 'true';
            }
            break;
        }
      }
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////
  private setChartViewOptions() {
    if (this.options !== null && this.options !== undefined) {
      if (!(<any>this._uiChartsView)._chartInitialized) {
        this._uiChartsView.setOptions(this.options);
      } else {
        if (this.updateChartContent) {
          this._uiChartsView.updateOptions(this.options);
        } else {
          this._uiChartsView.setOptions(this.options);
        }
      }
    }
  }
}
