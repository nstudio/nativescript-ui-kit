import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptMarkdownView } from '@demo/shared';
import { } from '@nstudio/nativescript-markdown-view';

@Component({
	selector: 'demo-nativescript-markdown-view',
	templateUrl: 'nativescript-markdown-view.component.html',
})
export class NativescriptMarkdownViewComponent {
  
  demoShared: DemoSharedNativescriptMarkdownView;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptMarkdownView();
  }

}