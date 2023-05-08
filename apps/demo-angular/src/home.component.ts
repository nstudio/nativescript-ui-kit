import { Component } from '@angular/core';

@Component({
	selector: 'demo-home',
	templateUrl: 'home.component.html',
})
export class HomeComponent {
	demos = [
	{
		name: 'nativescript-coachmarks'
	},
	{
		name: 'nativescript-fonticon'
	},
	{
		name: 'nativescript-label-marquee'
	},
	{
		name: 'nativescript-shimmer'
	}
];
}