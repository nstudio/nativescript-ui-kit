import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { HomeComponent } from './home.component';

const routes: Routes = [
   { path: '', redirectTo: '/home', pathMatch: 'full' },
   { path: 'home', component: HomeComponent },
	{ path: 'nativescript-coachmarks', loadChildren: () => import('./plugin-demos/nativescript-coachmarks.module').then(m => m.NativescriptCoachmarksModule) },
	{ path: 'nativescript-label-marquee', loadChildren: () => import('./plugin-demos/nativescript-label-marquee.module').then(m => m.NativescriptLabelMarqueeModule) },
	{ path: 'nativescript-shimmer', loadChildren: () => import('./plugin-demos/nativescript-shimmer.module').then(m => m.NativescriptShimmerModule) },
	{ path: 'ui-collectionview', loadChildren: () => import('./plugin-demos/ui-collectionview.module').then(m => m.UiCollectionviewModule) }
];

@NgModule({
	imports: [NativeScriptRouterModule.forRoot(routes)],
	exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
