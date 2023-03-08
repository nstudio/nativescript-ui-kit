import { Color, Utils } from '@nativescript/core';
import { typesMap as _typesMap } from './_helpers.common';

const typesMap = Object.assign({}, _typesMap, {
  number: (options) => Utils.dataSerialize(options, true),
  boolean: (options) => Utils.dataSerialize(options, true),
  Array: (options) => Utils.dataSerialize(options, true),
  LinkedList: (options) => toLinkedList(options),
  HIColor: (options) => toHIColor(options),
});

export function toArrayList(arr, isNumber = false) {
  // const arrayList = new java.util.ArrayList<any>();
  // arr.forEach((item) => {
  //   arrayList.add(item);
  // });
  // return arrayList;
  return Utils.dataSerialize(arr, true);
}

export function toLinkedList(arr, isNumber = false) {
  const linkedList = new java.util.LinkedList<any>();
  arr.forEach((item, i) => {
    linkedList.add(i, item);
  });
  return linkedList;
}

export function toArrayListRecursive(arr, isNumber = false) {
  const arrayList = new java.util.ArrayList<any>();
  arr.forEach((item) => {
    if (item.length) {
      arrayList.add(toArrayListRecursive(item, isNumber));
    } else {
      if (isNumber) {
        arrayList.add(Utils.dataSerialize(item, true));
      } else {
        arrayList.add(item);
      }
    }
  });
  return arrayList;
}

export function colorToString(color: any) {
  const c = new Color(color);
  return `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a / 255})`;
}

export function toHIColor(color) {
  if (color instanceof Array) {
    const colorArray = [];
    for (let i = 0; i < color.length; i++) {
      const c = color[i];

      if (c.radialGradient && c.stops) {
        const grad = c.radialGradient;
        const gradient = new com.highsoft.highcharts.common.HIGradient(grad.cx, grad.cy, grad.r);
        const stops = c.stops.map((stop, i) => new com.highsoft.highcharts.common.HIStop(i, toHIColor(stop)));
        const stopslist = toLinkedList(stops);

        colorArray.push(com.highsoft.highcharts.common.HIColor.initWithRadialGradient(gradient, stopslist));
      } else if (c.linearGradient && c.stops) {
        const grad = c.linearGradient;
        const gradient = new com.highsoft.highcharts.common.HIGradient(grad.x1, grad.y1, grad.x2, grad.y2);
        const stops = c.stops.map((stop, i) => new com.highsoft.highcharts.common.HIStop(i, toHIColor(stop)));
        const stopslist = toLinkedList(stops);

        colorArray.push(com.highsoft.highcharts.common.HIColor.initWithLinearGradient(gradient, stopslist));
      } else {
        const _c = new Color(c);
        colorArray.push(com.highsoft.highcharts.common.HIColor.initWithRGBA(_c.r, _c.g, _c.b, _c.a / 255) as any);
      }
    }

    return Utils.dataSerialize(colorArray, true);
  } else {
    if (color.radialGradient && color.stops) {
      const grad = color.radialGradient;
      const gradient = new com.highsoft.highcharts.common.HIGradient(grad.cx, grad.cy, grad.r);
      const stops = color.stops.map((stop, i) => new com.highsoft.highcharts.common.HIStop(i, toHIColor(stop)));
      const stopslist = toLinkedList(stops);

      return com.highsoft.highcharts.common.HIColor.initWithRadialGradient(gradient, stopslist);
    } else if (color.linearGradient && color.stops) {
      const grad = color.linearGradient;
      const gradient = new com.highsoft.highcharts.common.HIGradient(grad.x1, grad.y1, grad.x2, grad.y2);
      const stops = color.stops.map((stop, i) => new com.highsoft.highcharts.common.HIStop(i, toHIColor(stop)));
      const stopslist = toLinkedList(stops);

      return com.highsoft.highcharts.common.HIColor.initWithLinearGradient(gradient, stopslist);
    } else {
      const c = new Color(color);
      return com.highsoft.highcharts.common.HIColor.initWithRGBA(c.r, c.g, c.b, c.a / 255) as any;
    }
  }
}

export function optionsBuilder(schema, options, containerObject) {
  if (containerObject) {
    const schemaKeys = Object.keys(schema);
    const optionsKeys = Object.keys(options);
  
    for (const schemaKey of schemaKeys) {
      if ((<any>optionsKeys).includes(schemaKey)) {
        if (typeof typesMap[schema[schemaKey]] === 'function') {
          if (options[schemaKey] !== null && typeof options[schemaKey] !== 'undefined') {
            const methodName = 'set' + schemaKey[0].toUpperCase() + schemaKey.slice(1);
            if (methodName === 'setColor') {
              // does not work on android
              return containerObject;
            }
            if (containerObject[methodName]) {
              containerObject[methodName](
                typesMap[schema[schemaKey]](options[schemaKey])
              );
            }
          }
        } else {
          console.log('Handler for', schemaKey, schema[schemaKey], 'not implemented');
        }
      }
    }
  }

  return containerObject;
}
