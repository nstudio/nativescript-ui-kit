import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { HomeComponent } from './home.component';

const routes: Routes = [
   { path: '', redirectTo: '/home', pathMatch: 'full' },
   { path: 'home', component: HomeComponent },
	{ path: 'nativescript-coachmarks', loadChildren: () => import('./plugin-demos/nativescript-coachmarks.module').then(m => m.NativescriptCoachmarksModule) },
	{ path: 'nativescript-fonticon', loadChildren: () => import('./plugin-demos/nativescript-fonticon.module').then(m => m.NativescriptFonticonModule) },
	{ path: 'nativescript-label-marquee', loadChildren: () => import('./plugin-demos/nativescript-label-marquee.module').then(m => m.NativescriptLabelMarqueeModule) },
	{ path: 'nativescript-rive', loadChildren: () => import('./plugin-demos/nativescript-rive.module').then(m => m.NativescriptRiveModule) },
	{ path: 'nativescript-shimmer', loadChildren: () => import('./plugin-demos/nativescript-shimmer.module').then(m => m.NativescriptShimmerModule) }
];

@NgModule({
	imports: [NativeScriptRouterModule.forRoot(routes)],
	exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
