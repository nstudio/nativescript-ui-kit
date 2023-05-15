import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptFonticon } from '@demo/shared';
import {} from 'nativescript-fonticon';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'demo-nativescript-fonticon',
  templateUrl: 'nativescript-fonticon.component.html',
})
export class NativescriptFonticonComponent {
  demoShared: DemoSharedNativescriptFonticon;
  public firstIcon$: BehaviorSubject<string> = new BehaviorSubject('');
  public firstIonIcon$: BehaviorSubject<string> = new BehaviorSubject('');
  public isToggled: boolean = false;

  constructor(private _ngZone: NgZone) {
    setTimeout(() => {
      this.firstIcon$.next('fa-glass');
      this.firstIonIcon$.next('ion-ios-close');
    });
  }

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptFonticon();
  }

  toggleFirst() {
    this.isToggled = !this.isToggled;
    if (this.isToggled) {
      this.firstIcon$.next('fa-stop');
      this.firstIonIcon$.next('ion-videocamera');
    } else {
      this.firstIcon$.next('fa-glass');
      this.firstIonIcon$.next('ion-close');
    }
  }
}
