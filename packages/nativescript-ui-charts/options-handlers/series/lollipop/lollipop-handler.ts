import { isAndroid, Utils } from "@nativescript/core";
import { seriesHandler } from "../series-handler";
import { optionsBuilder } from "../../helpers/helpers";

export function lollipopHandler(lollipopOptions) {
  const lollipopSchema = {
    connectorColor: 'string',
    connectorWidth: 'number',
    groupPadding: 'number',
    lineColor: 'HIColor',
    negativeFillColor: 'HIColor',
    pointPadding: 'number',
    pointRange: 'number'
  };

  if (lollipopOptions instanceof Array) {
    const seriesArr = [];

    for (const opts of lollipopOptions) {
      const lollipop = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HILollipop() : new HILollipop();
      seriesArr.push(seriesHandler(opts, optionsBuilder(lollipopSchema, opts, lollipop)));
    }

    return Utils.dataSerialize(seriesArr, true);
  } else {
    const lollipop = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HILollipop() : new HILollipop();
    return seriesHandler(lollipopOptions, optionsBuilder(lollipopSchema, lollipopOptions, lollipop));
  }
}
