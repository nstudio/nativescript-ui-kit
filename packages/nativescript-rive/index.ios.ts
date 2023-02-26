import { File, Folder, knownFolders, Utils } from '@nativescript/core';
import { RiveViewBase, RiveAlignment, RiveDirection, RiveFit, RiveLoop, alignmentProperty, artboardNameProperty, autoPlayProperty, fitProperty, onLoopEndProperty, onPauseProperty, onPlayProperty, onStateChangedProperty, onStopProperty, srcProperty } from './common';
export { RiveAlignment, RiveDirection, RiveFit, RiveLoop } from './common';
declare var NSCRiveController;

export class RiveView extends RiveViewBase {
  // model: RiveViewModel;
  ctrl: NSCRiveController;
  nativeViewProtected: UIView;

  public createNativeView() {
    this.ctrl = NSCRiveController.alloc().init();
    return this.ctrl.view;
  }

  public initNativeView(): void {
    this.ctrl.setFileWithName('flux_capacitor');
  }

  public disposeNativeView(): void {
    super.disposeNativeView();
  }

  async [srcProperty.setNative](src: string) {
    // if (!src) {
    //     console.log("No rive file specified")
    // } else {
    //     if (!/.(riv)$/.test(src)) {
    //         src += '.riv';
    //     }
    //     if (src[0] === '~' || src[0] === '@') {
    //         const app: Folder = <Folder>knownFolders.currentApp();
    //         const filename = src.replace(/^.*[\\\/]/, '')
    //         const folder: Folder = <Folder>app.getFolder(src.substring(2).replace(filename, ""));
    //         const file: File = folder.getFile(filename);
    //         this.bytes = await file.read()
    //     } else {
    //         console.log("[ui-rive] File not supported")
    //     }
    // }
    // if (this.autoPlay) {
    //     this.init();
    // }
  }

  [autoPlayProperty.setNative](autoPlay: boolean) {
    
    // this.nativeViewProtected.setAutoplay(autoPlay);
  }

  [fitProperty.getDefault]() {
    return RiveFit.CONTAIN;
  }

  [fitProperty.setNative](value: RiveFit) {
    // this.nativeViewProtected.setFit(value);
  }

  [alignmentProperty.getDefault]() {
    return RiveAlignment.CENTER;
  }

  [alignmentProperty.setNative](value: RiveAlignment) {
    // this.nativeViewProtected.setAlignment(value);
  }

  [artboardNameProperty.getDefault]() {
    return null;
  }

  [artboardNameProperty.setNative](value: string | null) {
    // this.nativeViewProtected.setArtboardName(value);
  }

  [onPlayProperty.setNative](value: () => void) {
    this.addListener();
  }

  [onPauseProperty.setNative](value: () => void) {
    this.addListener();
  }

  [onStopProperty.setNative](value: () => void) {
    this.addListener();
  }

  [onLoopEndProperty.setNative](value: () => void) {
    this.addListener();
  }

  [onStateChangedProperty.setNative](value: () => void) {
    this.addListener();
  }

  public init = (): void => {
    // if (this.nativeViewProtected) {
    //     if (!this.isPlaying()) {
    //         this.nativeViewProtected.reset();
    //         this.nativeViewProtected.setRiveBytes(
    //             this.bytes,
    //             this.artboardName,
    //             this.animationName,
    //             this.stateMachineName,
    //             this.autoPlay,
    //             this.getFit(this.fit),
    //             this.getAlignment(this.alignment),
    //             this.getLoop(this.loop)
    //         )
    //     }
    // }
  };

  public isPlaying(): boolean {
    if (this.ctrl) {
      return this.ctrl.isPlaying();
    }
    return false;
  }

  public play(loop = RiveLoop.AUTO, direction = RiveDirection.AUTO, settleInitialState = true) {
    if (this.ctrl) {
      this.ctrl.playWithNameDirectionLoop(null, this.getDirection(direction), this.getLoop(loop));
    }
    // this.nativeViewProtected.play(this.getLoop(loop), this.getDirection(direction), settleInitialState)
  }

  public playWithAnimations(animationNames: string | string[] = [], loop = RiveLoop.AUTO, direction = RiveDirection.AUTO, areStateMachines = false, settleInitialState = true) {
    // if (Array.isArray(animationNames)) {
    //     this.nativeViewProtected.play(this.buildList(animationNames), this.getLoop(loop), this.getDirection(direction), areStateMachines, settleInitialState)
    // } else if (typeof animationNames === 'string') {
    //     this.nativeViewProtected.play(animationNames, this.getLoop(loop), this.getDirection(direction), areStateMachines, settleInitialState)
    // }
  }

  public stop(): void {
    if (this.ctrl) {
      this.ctrl.stop();
    }
  }

  public stopWithAnimations(animationNames: string[] = [], areStateMachines = false): void {
    if (this.ctrl) {
      this.ctrl.stop();
    }
    // if (Array.isArray(animationNames)) {
    //     this.nativeViewProtected.stop(this.buildList(animationNames), areStateMachines);
    // } else if (typeof animationNames === 'string') {
    //     this.nativeViewProtected.stop(animationNames, areStateMachines);
    // }
  }

  public pause(): void {
    if (this.ctrl) {
      this.ctrl.pause();
    }
  }

  public pauseWithAnimations(animationNames: string | string[] = [], areStateMachines = false): void {
    // if (Array.isArray(animationNames)) {
    //     this.nativeViewProtected.pause(this.buildList(animationNames), areStateMachines);
    // } else if (typeof animationNames === 'string') {
    //     this.nativeViewProtected.pause(animationNames, areStateMachines);
    // }
  }

  public reset(): void {
    // if (this.nativeViewProtected) {
    //     this.nativeViewProtected.reset();
    // }
  }

  public fireState(stateMachineName: string, inputName: string): void {
    // if (this.nativeViewProtected) {
    //     this.nativeViewProtected.fireState(stateMachineName, inputName);
    // }
  }

  public setBooleanState(stateMachineName: string, inputName: string, value): void {
    // if (this.nativeViewProtected) {
    //     this.nativeViewProtected.setBooleanState(stateMachineName, inputName, value);
    // }
  }

  public setNumberState(stateMachineName: string, inputName: string, value): void {
    // if (this.nativeViewProtected) {
    //     this.nativeViewProtected.setNumberState(stateMachineName, inputName, value);
    // }
  }

  public getStateMachines() {
    // if (this.nativeViewProtected) {
    //     this.nativeViewProtected.getStateMachines();
    // }
  }

  public getPlayingStateMachines() {
    // if (this.nativeViewProtected) {
    //     this.nativeViewProtected.getPlayingStateMachines();
    // }
  }

  public getAnimations() {
    // if (this.nativeViewProtected) {
    //     this.nativeViewProtected.getAnimations();
    // }
  }

  public getPlayingAnimations() {
    // if (this.nativeViewProtected) {
    //     this.nativeViewProtected.getPlayingAnimations();
    // }
  }

  private addListener() {
    // if (!this.listener) {
    //     this.listener = new Listener(this);
    //     this.nativeViewProtected.registerListener(this.listener);
    // }
  }

  private buildList(array: string[]): java.util.ArrayList<any> {
    const animations = new java.util.ArrayList();
    array.forEach((item) => animations.add(item));
    return animations;
  }

  private getLoop(riveLoop: RiveLoop): string {
    switch (riveLoop) {
      case RiveLoop.ONESHOT:
        return 'oneShot';
      case RiveLoop.LOOP:
        return 'loop';
      case RiveLoop.PINGPONG:
        return 'pingPong';
      case RiveLoop.NONE:
        return 'none';
      default:
        return null;
    }
  }

  private getDirection(riveDirection: RiveDirection) {
    //: Direction {
    switch (riveDirection) {
      case RiveDirection.BACKWARDS:
        return -1;
      case RiveDirection.FORWARDS:
        return 1;
      default:
        return 0;
    }
  }

  private getFit(riveFit: RiveFit) {
    //: Fit {
    // switch (riveFit) {
    //     case RiveFit.FILL:
    //         return Fit.FILL;
    //     case RiveFit.CONTAIN:
    //         return Fit.CONTAIN;
    //     case RiveFit.COVER:
    //         return Fit.COVER;
    //     case RiveFit.FIT_WIDTH:
    //         return Fit.FIT_WIDTH;
    //     case RiveFit.FIT_HEIGHT:
    //         return Fit.FIT_HEIGHT;
    //     case RiveFit.SCALE_DOWN:
    //         return Fit.SCALE_DOWN;
    //     default:
    //         return Fit.NONE;
    // }
  }

  private getAlignment(riveAlignment: RiveAlignment) {
    //: Alignment {
    // switch (riveAlignment) {
    //     case RiveAlignment.TOP_LEFT:
    //         return Alignment.TOP_LEFT;
    //     case RiveAlignment.TOP_CENTER:
    //         return Alignment.TOP_CENTER;
    //     case RiveAlignment.TOP_RIGHT:
    //         return Alignment.TOP_RIGHT;
    //     case RiveAlignment.CENTER_LEFT:
    //         return Alignment.CENTER_LEFT;
    //     case RiveAlignment.CENTER_RIGHT:
    //         return Alignment.CENTER_RIGHT;
    //     case RiveAlignment.BOTTOM_LEFT:
    //         return Alignment.BOTTOM_LEFT;
    //     case RiveAlignment.BOTTOM_RIGHT:
    //         return Alignment.BOTTOM_RIGHT;
    //     default:
    //         return Alignment.CENTER;
    // }
  }
}
