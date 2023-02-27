import { Component } from '@angular/core';

@Component({
	selector: 'demo-home',
	templateUrl: 'home.component.html',
})
export class HomeComponent {
	demos = [
	{
		name: 'nativescript-label-marquee'
	},
	{
		name: 'nativescript-rive'
	},
	{
		name: 'nativescript-shimmer'
	},
	{
		name: 'nativescript-ui-charts'
	}
];
}