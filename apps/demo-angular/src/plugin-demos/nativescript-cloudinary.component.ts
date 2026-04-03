import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptCloudinary } from '@demo/shared';
import {} from '@nstudio/nativescript-cloudinary';

@Component({
  selector: 'demo-nativescript-cloudinary',
  templateUrl: 'nativescript-cloudinary.component.html',
})
export class NativescriptCloudinaryComponent {
  demoShared: DemoSharedNativescriptCloudinary;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptCloudinary();
  }
}
