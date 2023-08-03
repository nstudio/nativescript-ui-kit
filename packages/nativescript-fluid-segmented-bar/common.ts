import { CoercibleProperty, Color, EventData, Property, View } from '@nativescript/core';

export interface FluidSegmentedBarItem {
    title: string;
    colors: Array<Color>;
}
export interface FluidSegmentedBarGradientColorSides {
    left: Array<Color>;
    right: Array<Color>;
}
export abstract class FluidSegmentedBarCommon extends View {
    static selectedIndexChangedEvent = 'selectedIndexChanged';
    static didScrollOffsetEvent = 'didScrollOffset';
	items: Array<FluidSegmentedBarItem>;
    selectedIndex: number;
    gradientColorSides: FluidSegmentedBarGradientColorSides;
}

export interface FluidSegmentedBarIndexChangedEvent extends EventData {
	oldIndex: number;
	newIndex: number;
}
export interface FluidSegmentedBarDidScrollEvent extends EventData {
	offset: number;
    maxOffset: number;
}

