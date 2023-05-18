declare class NSCSmartlook extends NSObject {

	static alloc(): NSCSmartlook; // inherited from NSObject

	static isRecording(): boolean;

	static new(): NSCSmartlook; // inherited from NSObject

	static start(key: string): void;

	static stop(): void;
}
