import { DemoSharedBase } from '../utils';
import {  } from '@nstudio/nativescript-label-marquee';
import { Switch } from '@nativescript/core';

export class DemoSharedNativescriptLabelMarquee extends DemoSharedBase {
  labelize = false;

  testIt() {
    console.log('test nativescript-label-marquee!');
  }

  checkedChange(args) {
		const checked = (args.object as Switch).checked;
		this.set('labelize', checked);
	}
}