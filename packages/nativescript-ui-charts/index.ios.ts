import { UIChartsViewBase } from './common';
import { optionsHandler } from './options-handlers/options-handler';
import { langHandler } from './options-handlers/lang/lang-handler';
import { Utils, ViewBase } from '@nativescript/core';

export class UIChartsView extends UIChartsViewBase {
  public _chartInitialized: boolean = false;
  private _delegate: HighchartsViewDelegateImpl;

  public createNativeView() {
    const chartView = HIChartView.alloc().init();
    // always retain delegate on owner class to ensure it doesn't inadvertently get garbage collected
    this._delegate = HighchartsViewDelegateImpl.initWithOwner(new WeakRef(this));
    chartView.delegate = this._delegate;
    // chartView.viewController = Utils.ios.getRootViewController();
    return chartView;
  }

  initNativeView(): void {
    // Attach the owner to nativeView.
    // When nativeView is tapped we get the owning JS object through this field.
    (<any>this.nativeView).owner = new WeakRef(this);
    super.initNativeView();

    // NSNotificationCenter.defaultCenter.addObserverForNameObjectQueueUsingBlock("valueChange", null, NSOperationQueue.mainQueue, this.onValueChange);
  }

  disposeNativeView() {
    this._chartInitialized = false;
    super.disposeNativeView();
  }

  onLoaded() {
		super.onLoaded();
		// we do this on onLoaded as the viewControllers are not properly setup on createNativeView
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		let vcParent: ViewBase = this;
		// start iterating over viewControllers
		// we also iterate over this as if it has a viewController, it's most likely a modal
		while (vcParent && !vcParent.viewController) {
			vcParent = vcParent.parent;
		}
		const vc = vcParent?.viewController || Utils.ios.getRootViewController();
		if (this.nativeView && vc) {
			this.nativeView.viewController = vc;
		}
	}


  public setOptions(opts: any) {
    this.options = opts;
    const hiOptions = optionsHandler(this.options);
    if (this.nativeView) {
      this.nativeView.options = hiOptions;
      this._chartInitialized = true;
      this.nativeView.reload();
    }
  }

  public setLangOptions(opts: any) {
    const hiLang = langHandler(opts);
    if (this.nativeView) {
      this.nativeView.lang = hiLang;
    }
  }

  public updateOptions(opts) {
    this.options = opts;
    const hiOptions = optionsHandler(this.options);
    if (this.nativeView) {
      this.nativeView.updateRedrawOneToOneAnimation(hiOptions, 1, 1, new HIAnimationOptionsObject());
    }
  }

  setExtremes(newMin, newMax, xAxisIndex = 0) {
    const nativeview = this.nativeView;
    if (nativeview) {
      const opts = nativeview.options;
      if (opts) {
        const xaxis = opts.xAxis.objectAtIndex(xAxisIndex);

        if (xaxis) {
          xaxis.min = newMin;
          xaxis.max = newMax;
        }
        nativeview.zoomOut();
        nativeview.updateRedrawOneToOneAnimation(nativeview.options, 1, 1, new HIAnimationOptionsObject());
      }
    }
  }

  public enableAnnotationsModule() {
    if (this.nativeView) {
      this.nativeView.plugins = ['annotations'];
    }
  }
}

@NativeClass()
class HighchartsViewDelegateImpl extends NSObject implements HIChartViewDelegate {
  static ObjCProtocols = [HIChartViewDelegate]; // define our native protocalls
  private _owner: WeakRef<UIChartsView>;

  static initWithOwner(owner: WeakRef<UIChartsView>): HighchartsViewDelegateImpl {
    const delegate = <HighchartsViewDelegateImpl>HighchartsViewDelegateImpl.new();
    delegate._owner = owner;
    return delegate;
  }

  chartViewDidLoad(chart) {
    // console.log('HighchartsViewDelegateImpl Did load chart:', chart);
  }
}
