import { isAndroid, Utils } from "@nativescript/core";
import { seriesHandler } from "../series-handler";
import { optionsBuilder } from "../../helpers/helpers";

export function dumbbellHandler(dumbbellOptions) {
  const dumbbellSchema = {
    connectorColor: 'string',
    connectorWidth: 'number',
    groupPadding: 'number',
    lineColor: 'HIColor',
    lowColor: 'HIColor',
    negativeFillColor: 'HIColor',
    pointPadding: 'number',
    pointRange: 'number'
  };

  if (dumbbellOptions instanceof Array) {
    const seriesArr = [];

    for (const opts of dumbbellOptions) {
      const dumbbell = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HIDumbbell() : new HIDumbbell();
      seriesArr.push(seriesHandler(opts, optionsBuilder(dumbbellSchema, opts, dumbbell)));
    }

    return Utils.dataSerialize(seriesArr, true);
  } else {
    const dumbbell = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HIDumbbell() : new HIDumbbell();
    return seriesHandler(dumbbellOptions, optionsBuilder(dumbbellSchema, dumbbellOptions, dumbbell));
  }
}
