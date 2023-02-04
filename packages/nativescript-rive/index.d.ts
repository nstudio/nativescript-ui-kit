import { View } from '@nativescript/core';
export { RiveAlignment, RiveDirection, RiveFit, RiveLoop } from './common';

export declare class RiveView extends View {
  /**
   * app.rive.runtime.kotlin.RiveAnimationView
   */
  readonly android: any;

  /**
   * AnimationView
   */
  readonly ios: any;

  constructor();

  public src: string;
  public autoPlay: boolean;
  public alignment?: RiveAlignment;
  public fit?: RiveFit;
  public artboardName?: string;
  public animationName?: string;
  public stateMachineName?: string;

  /*
   * loop: default AUTO
   * direction: default AUTO
   * */
  public play(loop?: RiveLoop, direction?: RiveDirection, settleInitialState?: true): void;

  /*
   * loop: default AUTO
   * direction: default AUTO
   * */
  public playWithAnimations(animationNames: string[], loop?: RiveLoop, direction?: RiveDirection, areStateMachines?: false, settleInitialState?: true): void;

  /*
   * loop: default AUTO
   * direction: default AUTO
   * */
  public playWithAnimation(animationName: string, loop?: RiveLoop, direction?: RiveDirection, areStateMachines?: false, settleInitialState?: true): void;

  public stop(): void;

  public stopWithAnimations(animationNames: string[], areStateMachines?: false): void;

  public stopWithAnimation(animationName: String, isStateMachine?: false): void;

  public pause(): void;

  public pauseWithAnimation(animationName: string, areStateMachines?: false): void;

  public pauseWithAnimations(animationNames: string[], areStateMachines?: false): void;

  public reset(): void;

  public fireState(stateMachineName: string, inputName: string): void;

  public setBooleanState(stateMachineName: string, inputName: string, value: boolean): void;

  public setNumberState(stateMachineName: string, inputName: string, value: number): void;

  public isPlaying(): boolean;

  public getStateMachines();

  public getAnimations();
}
