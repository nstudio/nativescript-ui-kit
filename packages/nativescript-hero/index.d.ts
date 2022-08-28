import { HeroCommon } from './common';

export function init(): void;

export declare class Hero extends HeroCommon {
  openIt();
}

export type HeroUIViewController = {
  _heroEnabled: boolean;
  heroModalAnimationTypeString: string;
  isHeroEnabled: boolean;
  hero_dismissViewController(): void;
  hero_unwindToRootViewController(): void;
} & UIViewController;

export type HeroUINavigationController = { _heroEnabled: boolean;heroNavigationAnimationTypeString: string } & UINavigationController;

export type HeroUITabBarController = { heroNavigationAnimationTypeString: string } & UITabBarController;

export type HeroUIView = {
  _heroEnabled: boolean;
	_heroID: string;
  heroID: string;
  heroModifierString: string;
  isHeroEnabled: boolean;
  isHeroEnabledForSubviews: boolean;
} & UIView;
