import {View} from '@nativescript/core';


export class RiveView extends View {
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
    public artboardName?: string
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


export declare const enum RiveLoop {
    ONESHOT,
    LOOP,
    PINGPONG,
    AUTO,
}

export declare const enum RiveDirection {
    BACKWARDS,
    FORWARDS,
    AUTO,
}

export declare const enum RiveFit {
    FILL,
    CONTAIN,
    COVER,
    FIT_WIDTH,
    FIT_HEIGHT,
    NONE,
    SCALE_DOWN,
}

export declare const enum RiveAlignment {
    TOP_LEFT,
    TOP_CENTER,
    TOP_RIGHT,
    CENTER_LEFT,
    CENTER,
    CENTER_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
}
