import { Observable, Property, View, booleanConverter } from '@nativescript/core';

export enum TypeRiveLoop {
  ONESHOT,
  LOOP,
  PINGPONG,
  AUTO,
  NONE,
}

export enum TypeRiveDirection {
  BACKWARDS,
  FORWARDS,
  AUTO,
}

export enum TypeRiveFit {
  FILL,
  CONTAIN,
  COVER,
  FIT_WIDTH,
  FIT_HEIGHT,
  NONE,
  SCALE_DOWN,
}

export enum TypeRiveAlignment {
  TOP_LEFT,
  TOP_CENTER,
  TOP_RIGHT,
  CENTER_LEFT,
  CENTER,
  CENTER_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
}

export class RiveEvents {
  
  static onPlayEvent = 'onPlayEvent';
  static onPauseEvent = 'onPauseEvent';
  static onLoopEndEvent = 'onLoopEndEvent';
  static onStopEvent = 'onStopEvent';
  static stateChangedEvent = 'stageChangedEvent';
  static receivedInputEvent = 'receivedInputEvent';
  static touchBeganEvent = 'touchBeganEvent';
  static touchCancelledEvent = 'touchCancelledEvent';
  static touchEndedEvent = 'touchEndedEvent';
  static touchMovedEvent = 'touchMovedEvent';
  constructor(public view: View) {}
  notifyEvent(name: string, data: any) {
    this.view.notify({ eventName: name, object: this.view, data });
  }
}

export abstract class RiveViewBase extends View {
  /*
   * Android: file in folder raw of android or path of file
   * Required
   * */
  public src: string;
  /**
   * Rive events
   */
  public events: RiveEvents;

  /* autoplay (optional) - Opening a rive animation view or specifying new resourceName or url will make it automatically play, when it is ready.
   * Default: true
   * */
  public autoPlay: boolean;
  /* alignment. (optional) - Specifies how animation should be aligned inside rive animation view..
   * Default: TypeRiveAlignment.NONE
   * */
  public alignment?: TypeRiveAlignment;
  /*
   * fit (optional) - Specifies how animation should be displayed inside rive animation view
   * Default: TypeRiveFit.CONTAIN
   * */
  public fit?: TypeRiveFit;
  /*
   * artboard (optional) - Specifies which animation artboard should be displayed in rive animation view.
   * Default: null
   * */
  public artboard?: string;
  /*
   * animation (optional) - Specifies which animation should be played when autoplay is set to true.
   * Default: null
   * */
  public animation?: string;

  /**
   * input (optional) - Specifies which input should be used.
   */
  public input?: string;

  /**
   * inputValue (optional) - Specifies which input value should be used.
   */
  public inputValue?: boolean;

  /*
   * stateMachine (optional) - Specifies which stateMachine should be played when autoplay is set to true.
   * Default: undefined
   * */
  public stateMachine?: string;
  /*
   * loop. (optional).
   * Default: TypeRiveLoop.AUTO
   * */
  public loop?: TypeRiveLoop;

  /**
   * direction. (optional).
   */
  public direction?: TypeRiveDirection;

  onPlay: (animation: string) => void;
  onPause: (animation: string) => void;
  onStop: (animation: string) => void;
  onLoopEnd: (animation: string, loopMode: TypeRiveLoop) => void;

  /*
   * loop: default AUTO
   * direction: default AUTO
   * settleInitialState: default true
   * */
  public abstract play(loop?: TypeRiveLoop, direction?: TypeRiveDirection, settleInitialState?: true): void;

  /*
   * animations: default []
   * loop: default AUTO
   * direction: default AUTO
   * areStateMachines: default false
   * settleInitialState: default true
   * */
  public abstract playWithAnimations(animations?: string | string[], loop?: TypeRiveLoop, direction?: TypeRiveDirection, areStateMachines?: false, settleInitialState?: true): void;

  /**
   * Stops all.
   */
  public abstract stop(): void;

  /**
   * Stops any of the provided animations.
   */
  public abstract stopWithAnimations(animations: string | string[], areStateMachines?: false): void;

  /**
   * Pauses all playing animations.
   */
  public abstract pause(): void;

  /*
   * Pauses any of the provided animations.
   * animations: default []
   * areStateMachines: default false
   * */
  public abstract pauseWithAnimations(animations: string | string[], areStateMachines?: false): void;

  /**
   * Reset the view by resetting the current artboard, before any animations have been applied
   *
   * Note: this will respect [autoplay]
   */
  public abstract reset(): void;

  /*
   * Fire the Trigger input called inputName on all active matching state machines
   * stateMachineName - Specifies state machine name which will be matched against all active state machines.
   * inputName - Specifies the name of the trigger that should be fired.
   * */
  public abstract fireState(stateMachineName: string, inputName: string): void;

  /**
   * Update the state of the Boolea input called inputName on all active matching state machines
   * to [value]
   */
  public abstract setBooleanState(stateMachineName: string, inputName: string, value: boolean): void;

  /*
   * Update the state of the Number input called inputName on all active matching state machines
   * stateMachineName - Specifies state machine name which will be matched against all active state machines.
   * inputName - Specifies name of the input which state should be updated.
   * value - Specifies a value that the input state should be set to.
   * */
  public abstract setNumberState(stateMachineName: string, inputName: string, value: number): void;

  public abstract isPlaying(): boolean;

  /**
   * Get the currently loaded StateMachine.
   */
  public abstract getStateMachines();

  /**
   * * Get the currently playing StateMachine.
   */
  public abstract getPlayingStateMachines();

  /**
   * Get the currently loaded animations.
   */
  public abstract getAnimations();

  /**
   * Get the currently playing animations.
   */
  public abstract getPlayingAnimations();
}

export const autoPlayProperty = new Property<RiveViewBase, boolean>({
  name: 'autoPlay',
  defaultValue: true,
  valueConverter: booleanConverter,
});
autoPlayProperty.register(RiveViewBase);

export const fitProperty = new Property<RiveViewBase, TypeRiveFit>({
  name: 'fit',
  defaultValue: TypeRiveFit.CONTAIN,
});
fitProperty.register(RiveViewBase);

export const alignmentProperty = new Property<RiveViewBase, TypeRiveAlignment>({
  name: 'alignment',
  defaultValue: TypeRiveAlignment.CENTER,
});
alignmentProperty.register(RiveViewBase);

export const artboardProperty = new Property<RiveViewBase, string | null>({
  name: 'artboard',
  defaultValue: null,
});
artboardProperty.register(RiveViewBase);
export const animationProperty = new Property<RiveViewBase, string | null>({
  name: 'animation',
  defaultValue: null,
});
animationProperty.register(RiveViewBase);
export const stateMachineProperty = new Property<RiveViewBase, string | null>({
  name: 'stateMachine',
  defaultValue: null,
});
stateMachineProperty.register(RiveViewBase);
export const inputValueProperty = new Property<RiveViewBase, string | null>({
  name: 'inputValue',
  defaultValue: null,
});
inputValueProperty.register(RiveViewBase);

export const srcProperty = new Property<RiveViewBase, string>({
  name: 'src',
});
srcProperty.register(RiveViewBase);
