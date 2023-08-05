declare class NSCRiveController extends UIViewController {

	static alloc(): NSCRiveController; // inherited from NSObject

	static new(): NSCRiveController; // inherited from NSObject

	riveView: RiveView;

	riveViewModel: RiveViewModel;

	configureModelWithArtboardStateMachineAnimation(artboard: string, stateMachine: string, animation: string): void;

	isPlaying(): boolean;

	pause(): void;

	playWithDirectionLoopName(direction: number, loop: string, name: string): void;

	setDelegateWithDelegate(delegate: RiveStateMachineDelegate): void;

	setFit(fit: number): void;

	setInputWithNameNumber(name: string, number: number): void;

	setInputWithNameBinary(name: string, binary: boolean): void;

	setModelResourceWithNameFit(name: string, fit: number): void;

	setModelWithFileFit(file: RiveFile, fit: number): void;

	stop(): void;

	triggerInputWithName(name: string): void;
}
