import { HeroCommon } from './common';
// import { HeroUINavigationController } from '.';
import { Application, booleanConverter, Page, Property, Utils, ViewBase } from '@nativescript/core';
import { HeroUIView, HeroUIViewController } from '.';

export class Hero extends HeroCommon {
    vc: ViewController;
  // blah: HeroUINavigationController
  createNativeView() {
    // this.blah.heroNavigationAnimationTypeString = ''
    this.vc = ViewController.alloc().init();
    
    // this.vc.view.hidden = false;
    return this.vc.view;
  }

  initNativeView() {
    (<any>this.vc).setupViews();
  }

  openIt() {
    console.log('opneit!')
    // this.vc.openSecondVC();

    let sc = SecondViewController.alloc().init();
        let nc = UINavigationController.alloc().initWithRootViewController(sc);
//        nc.hero.isEnabled = true
        (<any>nc)._heroEnabled = true;
        (<any>sc).setupViews();
        console.log('this.page.ios:', this.page.ios);
        console.log('this.currentPage.ios:', this.currentPage.ios);
        (<UIViewController>this.page.ios).navigationController
        console.log(`(<UIViewController>this.page.ios).navigationController:`, (<UIViewController>this.page.ios).navigationController);
        (<UIViewController>this.page.ios).navigationController.pushViewControllerAnimated(sc, true);
        // self.navigationController?.pushViewController(sc, animated: true)
  }
}

export const heroIDProperty = new Property<ViewBase, string>({
  name: 'heroID',
  //   valueChanged(target, oldValue, newValue) {
  //     if (target.ios) {
  //       console.log('setting heroId:', newValue);
  //       (<HeroUIView>target.ios)._heroID = newValue;
  //     }
  //   },
});

export const heroEnabledProperty = new Property<ViewBase, boolean>({
  name: 'heroEnabled',
  defaultValue: false,
  valueConverter: booleanConverter,
  //   valueChanged(target, oldValue, newValue) {
  //     if (target.ios) {
  //       console.log('setting heroEnabled:', newValue);
  //       (<HeroUIView>target.ios)._heroEnabled = newValue;
  //     }
  //   },
});

// let appDelegateInitialized = false;
// let appDelegate;

// @NativeClass()
// class HeroDelegateImpl extends UIResponder implements UIApplicationDelegate {
//   static ObjCProtocols = [UIApplicationDelegate];

//   applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: NSDictionary<string, any>): boolean {
//     console.log('applicationOpenURLOptions set rootview _heroEnabled!');
//     (<HeroUIViewController>getRootViewController())._heroEnabled = true;
//     return true;
//   }
// }

export function init() {
//   if (!appDelegateInitialized) {
//     appDelegateInitialized = true;
//     Application.ios.delegate = HeroDelegateImpl;
//   }
  heroIDProperty.register(ViewBase);
  ViewBase.prototype[heroIDProperty.setNative] = function (value: string) {
    console.log('setting heroId:', value);
    (<HeroUIView>this.ios)._heroID = value;
    console.log('hero Enabled?', (<HeroUIView>this.ios)._heroEnabled);
  };
  heroEnabledProperty.register(ViewBase);
  ViewBase.prototype[heroEnabledProperty.setNative] = function (value: boolean) {
    console.log('setting _heroEnabled:', value);
    (<HeroUIView>this.ios)._heroEnabled = value;
  };
}

function getRootViewController() {
  const app = UIApplication.sharedApplication;
  const win = app.keyWindow || (app.windows && app.windows.count > 0 && app.windows.objectAtIndex(0));
  return win.rootViewController;
}
