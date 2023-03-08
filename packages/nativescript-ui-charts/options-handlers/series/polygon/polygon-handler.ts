import { isAndroid, Utils } from "@nativescript/core";
import { seriesHandler } from "../series-handler";
import { optionsBuilder } from "../../helpers/helpers";

export function polygonHandler(polygonOptions) {
  const polygonSchema = {
    trackByArea: 'number'
  };

  if (polygonOptions instanceof Array) {
    const seriesArr = [];

    for (const opts of polygonOptions) {
      const polygon = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HIPolygon() : new HIPolygon();
      seriesArr.push(seriesHandler(opts, optionsBuilder(polygonSchema, opts, polygon)));
    }

    return Utils.dataSerialize(seriesArr, true);
  } else {
    const polygon = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HIPolygon() : new HIPolygon();
    return seriesHandler(polygonOptions, optionsBuilder(polygonSchema, polygonOptions, polygon));
  }
}
