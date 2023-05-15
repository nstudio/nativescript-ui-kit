// angular
import { Injectable, Inject, InjectionToken } from "@angular/core";
import { FontIconFactory } from 'nativescript-fonticon';

export const USE_STORE = new InjectionToken<any>("USE_STORE");

@Injectable({
  providedIn: 'root'
})
export class FontIconService {
  static debug = false;
  
  constructor(@Inject(USE_STORE) private config: any) {
    FontIconFactory.paths = this.config;
    FontIconFactory.debug = FontIconService.debug;
    FontIconFactory.loadCss();
  }
}
