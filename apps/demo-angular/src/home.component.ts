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
		name: 'nativescript-fluid-segmented-bar'
	},
	{
		name: 'nativescript-fonticon'
	},
	{
		name: 'nativescript-label-marquee'
	},
	{
		name: 'nativescript-shimmer'
	},
	{
		name: 'nativescript-smartlook'
	},
	{
		name: 'ui-collectionview'
	},
	{
		name: 'ui-collectionview-sean'
	},
	{
		name: 'nativescript-variable-blur-view'
	}
];
}