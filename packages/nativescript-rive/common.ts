import { Property, View, booleanConverter } from '@nativescript/core';

export enum RiveLoop {
  ONESHOT,
  LOOP,
  PINGPONG,
  AUTO,
}

export enum RiveDirection {
  BACKWARDS,
  FORWARDS,
  AUTO,
}

export enum RiveFit {
  FILL,
  CONTAIN,
  COVER,
  FIT_WIDTH,
  FIT_HEIGHT,
  NONE,
  SCALE_DOWN,
}

export enum RiveAlignment {
  TOP_LEFT,
  TOP_CENTER,
  TOP_RIGHT,
  CENTER_LEFT,
  CENTER,
  CENTER_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
}

export abstract class RiveViewBase extends View {
  /*
   * Android: file in folder raw of android or path of file
   * Required
   * */
  public src: string;
  /* autoplay (optional) - Opening a rive animation view or specifying new resourceName or url will make it automatically play, when it is ready.
   * Default: true
   * */
  public autoPlay: boolean;
  /* alignment. (optional) - Specifies how animation should be aligned inside rive animation view..
   * Default: RiveAlignment.NONE
   * */
  public alignment?: RiveAlignment;
  /*
   * fit (optional) - Specifies how animation should be displayed inside rive animation view
   * Default: RiveFit.CONTAIN
   * */
  public fit?: RiveFit;
  /*
   * artboardName. (optional) - Specifies which animation artboard should be displayed in rive animation view.
   * Default: null
   * */
  public artboardName?: string;
  /*
   * animationName. (optional) - Specifies which animation should be played when autoplay is set to true.
   * Default: null
   * */
  public animationName?: string;

  /*
   * stateMachineName. (optional) - Specifies which stateMachine should be played when autoplay is set to true.
   * Default: undefined
   * */
  public stateMachineName?: string;
  /*
   * loop. (optional).
   * Default: Loop.AUTO
   * */
  public loop?: RiveLoop;

  onPlay: (animationName: string) => void;
  onPause: (animationName: string) => void;
  onStop: (animationName: string) => void;
  onLoopEnd: (animationName: string, loopMode: RiveLoop) => void;
  onStateChanged: (stateMachineName: string, stateName: string) => void;

  /*
   * loop: default AUTO
   * direction: default AUTO
   * settleInitialState: default true
   * */
  public abstract play(loop?: RiveLoop, direction?: RiveDirection, settleInitialState?: true): void;

  /*
   * animationNames: default []
   * loop: default AUTO
   * direction: default AUTO
   * areStateMachines: default false
   * settleInitialState: default true
   * */
  public abstract playWithAnimations(animationNames?: string | string[], loop?: RiveLoop, direction?: RiveDirection, areStateMachines?: false, settleInitialState?: true): void;

  /**
   * Stops all.
   */
  public abstract stop(): void;

  /**
   * Stops any of the provided animationNames.
   */
  public abstract stopWithAnimations(animationNames: string | string[], areStateMachines?: false): void;

  /**
   * Pauses all playing animations.
   */
  public abstract pause(): void;

  /*
   * Pauses any of the provided animationNames.
   * animationNames: default []
   * areStateMachines: default false
   * */
  public abstract pauseWithAnimations(animationNames: string | string[], areStateMachines?: false): void;

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

export const fitProperty = new Property<RiveViewBase, RiveFit>({
  name: 'fit',
  defaultValue: RiveFit.CONTAIN,
});
fitProperty.register(RiveViewBase);

export const alignmentProperty = new Property<RiveViewBase, RiveAlignment>({
  name: 'alignment',
  defaultValue: RiveAlignment.CENTER,
});
alignmentProperty.register(RiveViewBase);

export const loopProperty = new Property<RiveViewBase, RiveLoop>({
  name: 'loop',
  defaultValue: RiveLoop.AUTO,
});
loopProperty.register(RiveViewBase);

export const artboardNameProperty = new Property<RiveViewBase, string | null>({
  name: 'artboardName',
  defaultValue: null,
});
artboardNameProperty.register(RiveViewBase);
export const animationNameProperty = new Property<RiveViewBase, string | null>({
  name: 'animationName',
  defaultValue: null,
});
animationNameProperty.register(RiveViewBase);
export const stateMachineNameProperty = new Property<RiveViewBase, string | null>({
  name: 'stateMachineName',
  defaultValue: null,
});
stateMachineNameProperty.register(RiveViewBase);

export const onPlayProperty = new Property<RiveViewBase, () => void>({
  name: 'onPlay',
  defaultValue: null,
});
onPlayProperty.register(RiveViewBase);

export const onPauseProperty = new Property<RiveViewBase, () => void>({
  name: 'onPause',
  defaultValue: null,
});
onPauseProperty.register(RiveViewBase);

export const onStopProperty = new Property<RiveViewBase, () => void>({
  name: 'onStop',
  defaultValue: null,
});
onStopProperty.register(RiveViewBase);

export const onLoopEndProperty = new Property<RiveViewBase, () => void>({
  name: 'onLoopEnd',
  defaultValue: null,
});
onLoopEndProperty.register(RiveViewBase);

export const onStateChangedProperty = new Property<RiveViewBase, () => void>({
  name: 'onStateChanged',
  defaultValue: null,
});
onStateChangedProperty.register(RiveViewBase);

export const srcProperty = new Property<RiveViewBase, string>({
  name: 'src',
});
srcProperty.register(RiveViewBase);
