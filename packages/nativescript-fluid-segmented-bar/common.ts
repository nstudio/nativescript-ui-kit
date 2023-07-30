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

export const selectedIndexProperty = new CoercibleProperty<FluidSegmentedBarCommon, number>({
	name: 'selectedIndex',
	defaultValue: -1,
	valueChanged: (target, oldValue, newValue) => {
		target.notify(<FluidSegmentedBarIndexChangedEvent>{
			eventName: FluidSegmentedBarCommon.selectedIndexChangedEvent,
			object: target,
			oldIndex: oldValue,
			newIndex: newValue,
		});
	},
	coerceValue: (target, value) => {
		const items = target.items;
		if (items) {
			const max = items.length - 1;
			if (value < 0) {
				value = 0;
			}
			if (value > max) {
				value = max;
			}
		} else {
			value = -1;
		}

		return value;
	},
	valueConverter: (v) => parseInt(v),
});
selectedIndexProperty.register(FluidSegmentedBarCommon);

export const itemsProperty = new Property<FluidSegmentedBarCommon, Array<FluidSegmentedBarItem>>({
	name: 'items',
});
itemsProperty.register(FluidSegmentedBarCommon);

export const gradientColorSidesProperty = new Property<FluidSegmentedBarCommon, FluidSegmentedBarGradientColorSides>({
	name: 'gradientColorSides',
});
gradientColorSidesProperty.register(FluidSegmentedBarCommon);

