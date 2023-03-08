import { isAndroid, Utils } from "@nativescript/core";
import { seriesHandler } from "../series-handler";
import { optionsBuilder } from "../../helpers/helpers";

export function solidgaugeHandler(solidgaugeOptions) {
  const solidgaugeSchema = {
	  colorByPoint: 'number',
    innerRadius: 'number',
    overshoot: 'number',
    radius: 'number',
    rounded: 'number',
  };

  if (solidgaugeOptions instanceof Array) {
    const seriesArr = [];

    for (const opts of solidgaugeOptions) {
      const solidgauge = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HISolidgauge() : new HISolidgauge();
      seriesArr.push(seriesHandler(opts, optionsBuilder(solidgaugeSchema, opts, solidgauge)));
    }

    return Utils.dataSerialize(seriesArr, true);
  } else {
    const solidgauge = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HISolidgauge() : new HISolidgauge();
    return seriesHandler(solidgaugeOptions, optionsBuilder(solidgaugeSchema, solidgaugeOptions, solidgauge));
  }
}
