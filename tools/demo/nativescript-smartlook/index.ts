import { DemoSharedBase } from '../utils';
import { Smartlook } from '@nstudio/nativescript-smartlook';

export class DemoSharedNativescriptSmartlook extends DemoSharedBase {

  stop() {
    Smartlook.stop();
  }

  start() {
    Smartlook.start('<api-key>')
  }

  logSessionUrl() {
    console.log(Smartlook.sessionUrl());
  }
}