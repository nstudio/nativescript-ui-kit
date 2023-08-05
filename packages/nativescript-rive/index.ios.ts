import { File, Folder, knownFolders, Utils } from '@nativescript/core';
import { RiveEvents, RiveViewBase, TypeRiveAlignment, TypeRiveDirection, TypeRiveFit, TypeRiveLoop, alignmentProperty, fitProperty, inputValueProperty, srcProperty } from './common';
export { TypeRiveAlignment, TypeRiveDirection, TypeRiveFit, TypeRiveLoop } from './common';
declare var NSCRiveController;

export class RiveView extends RiveViewBase {
  riveFile: RiveFile;
  ctrl: NSCRiveController;
  nativeViewProtected: UIView;
  fileName: string;
  fit: TypeRiveFit;
  autoPlay: boolean;
  riveFileDelegate: RiveFileDelegateImpl;
  riveStateMachineDelegate: RiveStateMachineDelegateImpl;

  constructor() {
    super();
    this.events = new RiveEvents(this);
  }

  public createNativeView() {
    this.ctrl = NSCRiveController.alloc().init();
    return this.ctrl.view;
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
      // TODO: fix typings in 8.5.1 to includes these new file apis
      // const bytes = await file.readBufferAsync();
      const bytes = interop.bufferFromData(NSData.dataWithContentsOfFile(file.path));
      this.riveFile = RiveFile.alloc().initWithBytesByteLengthError(<any>bytes, bytes.byteLength);
      this._init();
    } else if (src.startsWith(Utils.RESOURCE_PREFIX)) {
      this.fileName = src.replace(Utils.RESOURCE_PREFIX, '').replace('.riv', '');
      this._init();
    } else if (src.startsWith('http')) {
      this.riveFileDelegate = RiveFileDelegateImpl.initWithOwner(new WeakRef(this));
      this.riveFile = RiveFile.alloc().initWithHttpUrlWithDelegate(src, <RiveFileDelegate>(<unknown>this.riveFileDelegate));
    } else {
      console.log('[ui-rive] File not supported');
    }
  }

  riveFileHttpSrcDidLoad(riveFile: RiveFile) {
    this._init();
  }

  [fitProperty.getDefault]() {
    return TypeRiveFit.CONTAIN;
  }

  [fitProperty.setNative](value: TypeRiveFit) {
    this.fit = value;
    // this.nativeViewProtected.setFit(value);
  }

  [alignmentProperty.getDefault]() {
    return TypeRiveAlignment.CENTER;
  }

  [alignmentProperty.setNative](value: TypeRiveAlignment) {
    // this.nativeViewProtected.setAlignment(value);
  }

  [inputValueProperty.setNative](value: string | boolean | number | null) {
    this.setInputValue(value);
  }

  setInputValue(value: string | boolean | number | null) {
    if (this.input) {
      if (Utils.isBoolean(value) || ['true', 'false'].includes(value as string)) {
        this.ctrl.setInputWithNameBinary(this.input, value === true || value === 'true');
      } else {
        const number = Number(value);
        if (!isNaN(number)) {
          this.ctrl.setInputWithNameNumber(this.input, number);
        }
      }
    }
  }

  private _init() {
    // console.log('init autoPlay:', this.autoPlay);
    // console.log('init this.fit:', this.fit);

    if (this.riveFile) {
      this.ctrl.setModelWithFileFit(this.riveFile, this.getFit(this.fit));
    } else if (this.fileName) {
      this.ctrl.setModelResourceWithNameFit(this.fileName, this.getFit(this.fit));
    }
    if (this.artboard || this.animation || this.stateMachine) {
      this.ctrl.configureModelWithArtboardStateMachineAnimation(this.artboard, this.stateMachine, this.animation);
    }
    this.riveStateMachineDelegate = RiveStateMachineDelegateImpl.initWithOwner(new WeakRef(this));
    this.ctrl.setDelegateWithDelegate(this.riveStateMachineDelegate);
    if (this.input) {
      if (this.inputValue) {
        this.setInputValue(this.inputValue);
      } else {
        this.ctrl.triggerInputWithName(this.input);
      }
    }
    if (this.autoPlay) {
      this.play(this.loop, this.direction);
    }
  }

  public isPlaying(): boolean {
    if (this.ctrl) {
      return this.ctrl.isPlaying();
    }
    return false;
  }

  public play(loop = TypeRiveLoop.AUTO, direction = TypeRiveDirection.AUTO, settleInitialState = true) {
    if (this.ctrl) {
      // console.log('looop:', loop)
      this.ctrl.playWithDirectionLoopName(this.getDirection(direction), this.getLoop(loop), null);
    }
  }

  public playWithAnimations(animationNames: string | string[] = [], loop = TypeRiveLoop.AUTO, direction = TypeRiveDirection.AUTO, areStateMachines = false, settleInitialState = true) {
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

  private getLoop(riveLoop: TypeRiveLoop): string {
    switch (riveLoop) {
      case TypeRiveLoop.ONESHOT:
        return 'oneShot';
      case TypeRiveLoop.LOOP:
        return 'loop';
      case TypeRiveLoop.PINGPONG:
        return 'pingPong';
      case TypeRiveLoop.NONE:
        return 'none';
      default:
        return null;
    }
  }

  private getDirection(riveDirection: TypeRiveDirection): number {
    switch (riveDirection) {
      case TypeRiveDirection.BACKWARDS:
        return -1;
      case TypeRiveDirection.FORWARDS:
        return 1;
      default:
        return 0;
    }
  }

  private getFit(riveFit: TypeRiveFit): RiveFit {
    switch (riveFit) {
      case TypeRiveFit.FILL:
        return RiveFit.fill;
      case TypeRiveFit.CONTAIN:
        return RiveFit.contain;
      case TypeRiveFit.COVER:
        return RiveFit.cover;
      case TypeRiveFit.FIT_WIDTH:
        return RiveFit.fitWidth;
      case TypeRiveFit.FIT_HEIGHT:
        return RiveFit.fitHeight;
      case TypeRiveFit.SCALE_DOWN:
        return RiveFit.scaleDown;
      default:
        return RiveFit.noFit;
    }
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

@NativeClass()
class RiveFileDelegateImpl extends NSObject implements RiveFileDelegate {
  static ObjCProtocols = [RiveFileDelegate];

  private _owner: WeakRef<RiveView>;

  static initWithOwner(owner: WeakRef<RiveView>): RiveFileDelegateImpl {
    const delegate = <RiveFileDelegateImpl>RiveFileDelegateImpl.new();
    delegate._owner = owner;
    return delegate;
  }

  riveFileDidLoadError(riveFile: RiveFile) {
    console.log('riveFileDidLoadError:', riveFile.isLoaded);
    const owner = this._owner.deref();
    if (owner) {
      if (riveFile.isLoaded) {
        owner.riveFileHttpSrcDidLoad(riveFile);
      }
    }
    return riveFile.isLoaded;
  }
}

@NativeClass()
class RiveStateMachineDelegateImpl extends NSObject implements RiveStateMachineDelegate {
  static ObjCProtocols = [RiveStateMachineDelegate];

  private _owner: WeakRef<RiveView>;

  static initWithOwner(owner: WeakRef<RiveView>): RiveStateMachineDelegateImpl {
    const delegate = <RiveStateMachineDelegateImpl>RiveStateMachineDelegateImpl.new();
    delegate._owner = owner;
    return delegate;
  }

  stateMachineDidChangeState?(stateMachine: RiveStateMachineInstance, stateName: string): void {
    console.log('stateMachineDidChangeState:', stateName);
    const owner = this._owner.deref();
    if (owner) {
      owner.events.notifyEvent(RiveEvents.stateChangedEvent, { stateMachine, stateName });
    }
  }

  stateMachineReceivedInput?(stateMachine: RiveStateMachineInstance, input: StateMachineInput): void {
    console.log('stateMachineReceivedInput:', input);
    const owner = this._owner.deref();
    if (owner) {
      owner.events.notifyEvent(RiveEvents.receivedInputEvent, { stateMachine, input });
    }
  }

  touchBeganOnArtboardAtLocation?(artboard: RiveArtboard, location: CGPoint): void {
    console.log('touchBeganOnArtboardAtLocation:', location);
    const owner = this._owner.deref();
    if (owner) {
      owner.events.notifyEvent(RiveEvents.touchBeganEvent, { artboard, location });
    }
  }

  touchCancelledOnArtboardAtLocation?(artboard: RiveArtboard, location: CGPoint): void {
    console.log('touchCancelledOnArtboardAtLocation:', location);
    const owner = this._owner.deref();
    if (owner) {
      owner.events.notifyEvent(RiveEvents.touchCancelledEvent, { artboard, location });
    }
  }

  touchEndedOnArtboardAtLocation?(artboard: RiveArtboard, location: CGPoint): void {
    console.log('touchEndedOnArtboardAtLocation:', location);
    const owner = this._owner.deref();
    if (owner) {
      owner.events.notifyEvent(RiveEvents.touchEndedEvent, { artboard, location });
    }
  }

  touchMovedOnArtboardAtLocation?(artboard: RiveArtboard, location: CGPoint): void {
    console.log('touchMovedOnArtboardAtLocation:', location);
    const owner = this._owner.deref();
    if (owner) {
      owner.events.notifyEvent(RiveEvents.touchMovedEvent, { artboard, location });
    }
  }
}
