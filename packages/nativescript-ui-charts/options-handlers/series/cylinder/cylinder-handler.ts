import { isAndroid, Utils } from "@nativescript/core";
import { seriesHandler } from "../series-handler";
import { optionsBuilder } from "../../helpers/helpers";

export function cylinderHandler(cylinderOptions) {
  const cylinderSchema = {
    borderColor: 'HIColor',
    borderRadius: 'number',
    borderWidth: 'number',
    centerInCategory: 'number',
    colorByPoint: 'number',
    colors: 'HIColor',
    depth: 'number',
    edgeColor: 'HIColor',
    edgeWidth: 'number',
    groupPadding: 'number',
    groupZPadding: 'number',
    grouping: 'number',
    maxPointWidth: 'number',
    minPointLength: 'number',
    pointPadding: 'number',
    pointRange: 'number',
    pointWidth: 'number'
  };

  if (cylinderOptions instanceof Array) {
    const seriesArr = [];

    for (const opts of cylinderOptions) {
      const cylinder = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HICylinder() : new HICylinder();
      seriesArr.push(seriesHandler(opts, optionsBuilder(cylinderSchema, opts, cylinder)));
    }

    return Utils.dataSerialize(seriesArr, true);
  } else {
    const cylinder = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HICylinder() : new HICylinder();
    return seriesHandler(cylinderOptions, optionsBuilder(cylinderSchema, cylinderOptions, cylinder));
  }
}
