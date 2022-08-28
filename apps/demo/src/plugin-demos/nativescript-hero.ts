import { Observable, EventData, Page, GridLayout, ShowModalOptions, Frame } from '@nativescript/core';
import { DemoSharedNativescriptHero } from '@demo/shared';
import { Hero, HeroUINavigationController, HeroUIView, HeroUIViewController } from '@nstudio/nativescript-hero';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  const pageVc: HeroUIViewController = page.viewController;
  pageVc._heroEnabled = true;
  (<HeroUINavigationController>pageVc.navigationController)._heroEnabled = true;
  console.log('pageVc.isHeroEnabled:', pageVc._heroEnabled);
  // console.log('page.viewController.hero:', pageVc.isHeroEnabled);

  page.bindingContext = new DemoModel(page);
}

export class DemoModel extends DemoSharedNativescriptHero {
  showEnd = false;
  hero: Hero;
  constructor(public page: Page) {
    super();
  }
  loadedHeroTest(args) {
    console.log('loadedHeroTest!')
    this.hero = args.object;
    this.hero.currentPage = this.page;
  }
  openIt() {
    console.log('openIt!')
    this.hero.openIt();
  }
  loadedStart(args) {
    // const grid = <HeroUIView>args.object.ios;
    // grid._heroID = 'start';
    // console.log('grid isHeroEnabled:', grid._heroEnabled);
    // console.log('grid heroID:', grid._heroID);
  }

  loadedEnd(args) {
    // const grid = <HeroUIView>args.object.ios;
    // grid._heroID = 'start';
    // console.log('grid isHeroEnabled:', grid._heroEnabled);
    // console.log('grid heroID:', grid._heroID);
  }

  doTransition() {
	// this.openModal();
	// return;
  this.showDetail();
  return;
    console.log('heelo');
    this.showEnd = !this.showEnd;
    this.notifyPropertyChange('showEnd', this.showEnd);
  }

  showDetail() {
    Frame.topmost().navigate('modals/modal-nativescript-hero');
  }

  openModal() {
    this.page.showModal('modals/modal-nativescript-hero', <ShowModalOptions>{
      fullscreen: false,
    });
  }
}
