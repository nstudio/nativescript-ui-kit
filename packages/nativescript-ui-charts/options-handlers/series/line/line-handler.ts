import { isAndroid, Utils } from "@nativescript/core";
import { seriesHandler } from "../series-handler";

export function lineHandler(lineOptions) {
  if (lineOptions instanceof Array) {
    const seriesArr = [];

    for (const opts of lineOptions) {
      const line = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HILine() : new HILine();
      seriesArr.push(seriesHandler(opts, line));
    }

    return Utils.dataSerialize(seriesArr, true);
  } else {
    const line = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HILine() : new HILine();
    return seriesHandler(lineOptions, line);
  }
}
