import { File, Folder, Http, knownFolders, Utils } from '@nativescript/core';
import { RiveViewBase, TypeRiveAlignment, TypeRiveDirection, TypeRiveFit, TypeRiveLoop, autoPlayProperty, srcProperty, fitProperty, alignmentProperty, artboardProperty, RiveEvents } from './common';
export { TypeRiveAlignment, TypeRiveDirection, TypeRiveFit, TypeRiveLoop } from './common';

function lazy<T>(action: () => T): () => T {
  let _value: T;

  return () => _value || (_value = action());
}

@NativeClass()
@Interfaces([app.rive.runtime.kotlin.RiveArtboardRenderer.Listener])
class Listener extends java.lang.Object implements app.rive.runtime.kotlin.RiveArtboardRenderer.Listener {
  owner: RiveView;

  constructor(owner: RiveView) {
    super();
    this.owner = owner;
  }

  notifyPlay(animation: app.rive.runtime.kotlin.core.PlayableInstance): void {
    this.owner.events.notifyEvent(RiveEvents.onPlayEvent, { name: animation.getName() });
  }

  notifyStop(animation: app.rive.runtime.kotlin.core.PlayableInstance): void {
    this.owner.events.notifyEvent(RiveEvents.onStopEvent, { name: animation.getName() });
  }

  notifyPause(animation: app.rive.runtime.kotlin.core.PlayableInstance): void {
    this.owner.events.notifyEvent(RiveEvents.onPauseEvent, { name: animation.getName() });
  }

  notifyLoop(animation: app.rive.runtime.kotlin.core.PlayableInstance): void {
    this.owner.events.notifyEvent(RiveEvents.onLoopEndEvent, { name: animation.getName(), loop: this.owner.loop });
  }

  notifyStateChanged(stateMachine: string, stateName: string): void {
    this.owner.events.notifyEvent(RiveEvents.stateChangedEvent, { stateMachine, stateName });
  }
}

export class RiveView extends RiveViewBase {
  bytes: any;
  nativeViewProtected: app.rive.runtime.kotlin.RiveAnimationView;

  listener: Listener;

  constructor() {
    super();
    this.events = new RiveEvents(this);
  }

  public createNativeView() {
    return new app.rive.runtime.kotlin.RiveAnimationView(this._context, null);
  }

  public initNativeView(): void {
    this.addListener();
  }

  public disposeNativeView(): void {
    super.disposeNativeView();
  }

  async [srcProperty.setNative](src: string) {
    if (!src) {
      console.log('No rive file specified');
    } else if (src[0] === '~' || src[0] === '@') {
      if (!/.(riv)$/.test(src)) {
        src += '.riv';
      }
      const app: Folder = <Folder>knownFolders.currentApp();
      const filename = src.replace(/^.*[\\\/]/, '');
      const folder: Folder = <Folder>app.getFolder(src.substring(2).replace(filename, ''));
      const file: File = folder.getFile(filename);
      this.bytes = await file.read();
    } else if (src.startsWith(Utils.RESOURCE_PREFIX)) {
      const resName = src
        .replace(Utils.RESOURCE_PREFIX + 'raw/', '')
        .replace(Utils.RESOURCE_PREFIX, '')
        .replace('.riv', '');
      const context = <android.content.Context>Utils.android.getApplicationContext();
      const resId = context.getResources().getIdentifier(resName, 'raw', context.getPackageName());
      const inStream: java.io.InputStream = context.getResources().openRawResource(resId);
      const buffer = Array.create('byte', inStream.available());
      inStream.read(buffer);
      this.bytes = buffer;
    } else if (src.startsWith('http')) {
      const file = await Http.getFile(src);
      this.bytes = await file.read();
    } else {
      console.log('[ui-rive] File not supported');
    }

    if (this.bytes) {
      this._init();
    }
  }

  [autoPlayProperty.setNative](autoPlay: boolean) {
    this.nativeViewProtected.setAutoplay(autoPlay);
  }

  [fitProperty.getDefault]() {
    return TypeRiveFit.CONTAIN;
  }

  [fitProperty.setNative](value: TypeRiveFit) {
    this.nativeViewProtected.setFit(this.getFit(value));
  }

  [alignmentProperty.getDefault]() {
    return TypeRiveAlignment.CENTER;
  }

  [alignmentProperty.setNative](value: RiveAlignment) {
    this.nativeViewProtected.setAlignment(value);
  }

  [artboardProperty.getDefault]() {
    return null;
  }

  [artboardProperty.setNative](value: string | null) {
    this.nativeViewProtected.setArtboardName(value);
  }

  private _init() {
    if (this.nativeViewProtected) {
      if (!this.isPlaying()) {
        this.nativeViewProtected.reset();
        this.nativeViewProtected.setRiveBytes(this.bytes, this.artboard, this.animation, this.stateMachine, this.autoPlay, this.getFit(this.fit), this.getAlignment(this.alignment), this.getLoop(this.loop));
      }
    }
  }

  public isPlaying(): boolean {
    return this.nativeViewProtected ? this.nativeViewProtected.isPlaying() : false;
  }

  public play(loop = TypeRiveLoop.AUTO, direction = TypeRiveDirection.AUTO, settleInitialState = true) {
    this.nativeViewProtected.play(this.getLoop(loop), this.getDirection(direction), settleInitialState);
  }

  public playWithAnimations(animationNames: string | string[] = [], loop = TypeRiveLoop.AUTO, direction = TypeRiveDirection.AUTO, areStateMachines = false, settleInitialState = true) {
    if (Array.isArray(animationNames)) {
      this.nativeViewProtected.play(this.buildList(animationNames), this.getLoop(loop), this.getDirection(direction), areStateMachines, settleInitialState);
    } else if (typeof animationNames === 'string') {
      this.nativeViewProtected.play(animationNames, this.getLoop(loop), this.getDirection(direction), areStateMachines, settleInitialState);
    }
  }

  public stop(): void {
    if (this.nativeViewProtected) {
      this.nativeViewProtected.stop();
    }
  }

  public stopWithAnimations(animations: string[] = [], areStateMachines = false): void {
    if (Array.isArray(animations)) {
      this.nativeViewProtected.stop(this.buildList(animations), areStateMachines);
    } else if (typeof animations === 'string') {
      this.nativeViewProtected.stop(animations, areStateMachines);
    }
  }

  public pause(): void {
    if (this.nativeViewProtected) {
      this.nativeViewProtected.pause();
    }
  }

  public pauseWithAnimations(animations: string | string[] = [], areStateMachines = false): void {
    if (Array.isArray(animations)) {
      this.nativeViewProtected.pause(this.buildList(animations), areStateMachines);
    } else if (typeof animations === 'string') {
      this.nativeViewProtected.pause(animations, areStateMachines);
    }
  }

  public reset(): void {
    if (this.nativeViewProtected) {
      this.nativeViewProtected.reset();
    }
  }

  public fireState(stateMachineName: string, inputName: string): void {
    if (this.nativeViewProtected) {
      this.nativeViewProtected.fireState(stateMachineName, inputName);
    }
  }

  public setBooleanState(stateMachineName: string, inputName: string, value): void {
    if (this.nativeViewProtected) {
      this.nativeViewProtected.setBooleanState(stateMachineName, inputName, value);
    }
  }

  public setNumberState(stateMachineName: string, inputName: string, value): void {
    if (this.nativeViewProtected) {
      this.nativeViewProtected.setNumberState(stateMachineName, inputName, value);
    }
  }

  public getStateMachines() {
    if (this.nativeViewProtected) {
      this.nativeViewProtected.getStateMachines();
    }
  }

  public getPlayingStateMachines() {
    if (this.nativeViewProtected) {
      this.nativeViewProtected.getPlayingStateMachines();
    }
  }

  public getAnimations() {
    if (this.nativeViewProtected) {
      this.nativeViewProtected.getAnimations();
    }
  }

  public getPlayingAnimations() {
    if (this.nativeViewProtected) {
      this.nativeViewProtected.getPlayingAnimations();
    }
  }

  private addListener() {
    if (!this.listener) {
      this.listener = new Listener(this);
      this.nativeViewProtected.registerListener(this.listener);
    }
  }

  private buildList(array: string[]): java.util.ArrayList<any> {
    const animations = new java.util.ArrayList();
    array.forEach((item) => animations.add(item));
    return animations;
  }

  private getLoop(riveLoop: TypeRiveLoop): app.rive.runtime.kotlin.core.Loop {
    switch (riveLoop) {
      case TypeRiveLoop.ONESHOT:
        return app.rive.runtime.kotlin.core.Loop.ONESHOT;
      case TypeRiveLoop.LOOP:
        return app.rive.runtime.kotlin.core.Loop.LOOP;
      case TypeRiveLoop.PINGPONG:
        return app.rive.runtime.kotlin.core.Loop.PINGPONG;
      default:
        return app.rive.runtime.kotlin.core.Loop.AUTO;
    }
  }

  private getDirection(riveDirection: TypeRiveDirection): app.rive.runtime.kotlin.core.Direction {
    switch (riveDirection) {
      case TypeRiveDirection.BACKWARDS:
        return app.rive.runtime.kotlin.core.Direction.BACKWARDS;
      case TypeRiveDirection.FORWARDS:
        return app.rive.runtime.kotlin.core.Direction.FORWARDS;
      default:
        return app.rive.runtime.kotlin.core.Direction.AUTO;
    }
  }

  private getFit(riveFit: TypeRiveFit): app.rive.runtime.kotlin.core.Fit {
    switch (riveFit) {
      case TypeRiveFit.FILL:
        return app.rive.runtime.kotlin.core.Fit.FILL;
      case TypeRiveFit.CONTAIN:
        return app.rive.runtime.kotlin.core.Fit.CONTAIN;
      case TypeRiveFit.COVER:
        return app.rive.runtime.kotlin.core.Fit.COVER;
      case TypeRiveFit.FIT_WIDTH:
        return app.rive.runtime.kotlin.core.Fit.FIT_WIDTH;
      case TypeRiveFit.FIT_HEIGHT:
        return app.rive.runtime.kotlin.core.Fit.FIT_HEIGHT;
      case TypeRiveFit.SCALE_DOWN:
        return app.rive.runtime.kotlin.core.Fit.SCALE_DOWN;
      default:
        return app.rive.runtime.kotlin.core.Fit.NONE;
    }
  }

  private getAlignment(riveAlignment: TypeRiveAlignment): app.rive.runtime.kotlin.core.Alignment {
    switch (riveAlignment) {
      case TypeRiveAlignment.TOP_LEFT:
        return app.rive.runtime.kotlin.core.Alignment.TOP_LEFT;
      case TypeRiveAlignment.TOP_CENTER:
        return app.rive.runtime.kotlin.core.Alignment.TOP_CENTER;
      case TypeRiveAlignment.TOP_RIGHT:
        return app.rive.runtime.kotlin.core.Alignment.TOP_RIGHT;
      case TypeRiveAlignment.CENTER_LEFT:
        return app.rive.runtime.kotlin.core.Alignment.CENTER_LEFT;
      case TypeRiveAlignment.CENTER_RIGHT:
        return app.rive.runtime.kotlin.core.Alignment.CENTER_RIGHT;
      case TypeRiveAlignment.BOTTOM_LEFT:
        return app.rive.runtime.kotlin.core.Alignment.BOTTOM_LEFT;
      case TypeRiveAlignment.BOTTOM_RIGHT:
        return app.rive.runtime.kotlin.core.Alignment.BOTTOM_RIGHT;
      default:
        return app.rive.runtime.kotlin.core.Alignment.CENTER;
    }
  }
}
