import { isAndroid, Utils } from "@nativescript/core";
import { seriesHandler } from "../series-handler";

export function splineHandler(splineOptions) {
  if (splineOptions instanceof Array) {
    const seriesArr = [];

    for (const opts of splineOptions) {
      const spline = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HISpline() : new HISpline();
      seriesArr.push(seriesHandler(opts, spline));
    }

    return Utils.dataSerialize(seriesArr, true);
  } else {
    const spline = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HISpline() : new HISpline();
    return seriesHandler(splineOptions, spline);
  }
}
