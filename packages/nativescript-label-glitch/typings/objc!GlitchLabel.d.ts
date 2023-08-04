
declare class GlitchLabel extends UILabel {

	static alloc(): GlitchLabel; // inherited from NSObject

	static appearance(): GlitchLabel; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): GlitchLabel; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): GlitchLabel; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): GlitchLabel; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): GlitchLabel; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): GlitchLabel; // inherited from UIAppearance

	static new(): GlitchLabel; // inherited from NSObject

	alphaMin: number;

	amplitudeBase: number;

	amplitudeRange: number;

	blendMode: CGBlendMode;

	drawScanline: boolean;

	glitchAmplitude: number;

	glitchEnabled: boolean;

	glitchThreshold: number;

	start(): void;

	stop(): void;
}