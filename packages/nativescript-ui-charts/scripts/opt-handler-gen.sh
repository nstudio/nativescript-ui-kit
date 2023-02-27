eval 'mkdir $1 && touch ./$1/$1-handler.ts && touch ./$1/$1-handler.d.ts'
eval 'cat <<EOT >> ./$1/$1-handler.ts
import { optionsBuilder } from "../helpers/helpers";
import { isAndroid } from "@nativescript/core";

export function $1Handler($1Options) {
  const $1 = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HI$1() : new HI$1();

  const $1Schema = {
  };

  return optionsBuilder($1Schema, $1Options, $1);
}
EOT'
