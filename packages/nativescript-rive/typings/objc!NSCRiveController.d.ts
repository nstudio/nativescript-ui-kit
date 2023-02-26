
declare class NSCRiveController extends UIViewController {

	static alloc(): NSCRiveController; // inherited from NSObject

	static new(): NSCRiveController; // inherited from NSObject

	playWithNameDirectionLoop(name: string, direction: number, loop: string): void;

	setFileWithName(name: string): void;

	pause(): void;

    stop(): void;

    isPlaying(): boolean;
}
