import { isAndroid, Utils } from "@nativescript/core";
import { seriesHandler } from "../series-handler";
import { optionsBuilder } from "../../helpers/helpers";

export function scatterHandler(scatterOptions) {
  const scatterSchema = {
    cluster: 'HICluster',
	  jitter: 'HIJitter'
  };

  if (scatterOptions instanceof Array) {
    const seriesArr = [];

    for (const opts of scatterOptions) {
      const scatter = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HIScatter() : new HIScatter();
      seriesArr.push(seriesHandler(opts, optionsBuilder(scatterSchema, opts, scatter)));
    }

    return Utils.dataSerialize(seriesArr, true);
  } else {
    const scatter = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HIScatter() : new HIScatter();
    return seriesHandler(scatterOptions, optionsBuilder(scatterSchema, scatterOptions, scatter));
  }
}
