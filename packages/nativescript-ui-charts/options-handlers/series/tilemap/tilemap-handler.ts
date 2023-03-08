import { isAndroid, Utils } from "@nativescript/core";
import { seriesHandler } from "../series-handler";
import { optionsBuilder } from "../../helpers/helpers";

export function tilemapHandler(tilemapOptions) {
  const tilemapSchema = {
	  colsize: 'number',
    nullColor: 'HIColor',
    pointPadding: 'number',
    rowsize: 'number',
    tileShape: 'string'
  };

  if (tilemapOptions instanceof Array) {
    const seriesArr = [];

    for (const opts of tilemapOptions) {
      const tilemap = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HITilemap() : new HITilemap();
      seriesArr.push(seriesHandler(opts, optionsBuilder(tilemapSchema, opts, tilemap)));
    }

    return Utils.dataSerialize(seriesArr, true);
  } else {
    const tilemap = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HITilemap() : new HITilemap();
    return seriesHandler(tilemapOptions, optionsBuilder(tilemapSchema, tilemapOptions, tilemap));
  }
}
