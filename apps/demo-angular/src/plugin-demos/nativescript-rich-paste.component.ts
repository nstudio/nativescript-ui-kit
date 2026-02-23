import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptRichPaste } from '@demo/shared';
import {} from '@nstudio/nativescript-rich-paste';

@Component({
  selector: 'demo-nativescript-rich-paste',
  templateUrl: 'nativescript-rich-paste.component.html',
})
export class NativescriptRichPasteComponent {
  demoShared: DemoSharedNativescriptRichPaste;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptRichPaste();
  }
}
