import { Observable, EventData, Page } from '@nativescript/core';
import { HeroUIView, HeroUIViewController } from '@nstudio/nativescript-hero';

export function shownModally(args: EventData) {
	const page = <Page>args.object;
	const pageVc: HeroUIViewController = page.viewController;
	pageVc._heroEnabled = true;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends Observable {
	loadedEnd(args) {
		// const grid = <HeroUIView>args.object.ios;
		// grid._heroID = 'start';
		// console.log('grid isHeroEnabled:', grid._heroEnabled);
		// console.log('grid heroID:', grid._heroID);
	  }
}
