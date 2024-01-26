import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { HomeComponent } from './home.component';

const routes: Routes = [
   { path: '', redirectTo: '/home', pathMatch: 'full' },
   { path: 'home', component: HomeComponent },
	{ path: 'nativescript-coachmarks', loadChildren: () => import('./plugin-demos/nativescript-coachmarks.module').then(m => m.NativescriptCoachmarksModule) },
	{ path: 'nativescript-fluid-segmented-bar', loadChildren: () => import('./plugin-demos/nativescript-fluid-segmented-bar.module').then(m => m.NativescriptFluidSegmentedBarModule) },
	{ path: 'nativescript-fonticon', loadChildren: () => import('./plugin-demos/nativescript-fonticon.module').then(m => m.NativescriptFonticonModule) },
	{ path: 'nativescript-label-marquee', loadChildren: () => import('./plugin-demos/nativescript-label-marquee.module').then(m => m.NativescriptLabelMarqueeModule) },
	{ path: 'nativescript-markdown-view', loadChildren: () => import('./plugin-demos/nativescript-markdown-view.module').then(m => m.NativescriptMarkdownViewModule) },
	{ path: 'nativescript-shimmer', loadChildren: () => import('./plugin-demos/nativescript-shimmer.module').then(m => m.NativescriptShimmerModule) },
	{ path: 'nativescript-smartlook', loadChildren: () => import('./plugin-demos/nativescript-smartlook.module').then(m => m.NativescriptSmartlookModule) },
	{ path: 'nativescript-variable-blur-view', loadChildren: () => import('./plugin-demos/nativescript-variable-blur-view.module').then(m => m.NativescriptVariableBlurViewModule) }
];

@NgModule({
	imports: [NativeScriptRouterModule.forRoot(routes)],
	exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
