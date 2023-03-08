import { isAndroid, Utils } from "@nativescript/core";
import { seriesHandler } from "../series-handler";
import { optionsBuilder } from "../../helpers/helpers";

export function networkgraphHandler(networkgraphOptions) {
  const networkgraphSchema = {
    draggable: 'number',
    layoutAlgorithm: 'HILayoutAlgorithm',
    link: 'HILink',
    nodes: 'HINodes' // array
  };

  if (networkgraphOptions instanceof Array) {
    const seriesArr = [];

    for (const opts of networkgraphOptions) {
      const networkgraph = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HINetworkgraph() : new HINetworkgraph();
      seriesArr.push(seriesHandler(opts, optionsBuilder(networkgraphSchema, opts, networkgraph)));
    }

    return Utils.dataSerialize(seriesArr, true);
  } else {
    const networkgraph = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HINetworkgraph() : new HINetworkgraph();
    return seriesHandler(networkgraphOptions, optionsBuilder(networkgraphSchema, networkgraphOptions, networkgraph));
  }
}
