import { EventData, TextView, TextField } from '@nativescript/core';

export interface PasteTextPayload {
  type: 'text';
  value: string;
}

export interface PasteImageItem {
  uri: string;
  mimeType: string;
  width?: number;
  height?: number;
  animated: boolean;
}

export interface PasteImagesPayload {
  type: 'images';
  items: PasteImageItem[];
}

export interface PasteFileItem {
  uri: string;
  mimeType: string;
  name?: string;
  size?: number;
}

export interface PasteFilesPayload {
  type: 'files';
  items: PasteFileItem[];
}

export interface PasteUnsupportedPayload {
  type: 'unsupported';
  availableTypes: string[];
}

export type PastePayload = PasteTextPayload | PasteImagesPayload | PasteFilesPayload | PasteUnsupportedPayload;

export interface PasteEventData extends EventData {
  data: PastePayload;
}

export interface DropEventData extends EventData {
  data: PastePayload;
}

/**
 * Drop-in replacement for TextView with rich paste support.
 * Intercepts paste/drop for images, GIFs, files, and text.
 */
export declare class TextViewRichPaste extends TextView {
  static pasteEvent: string;
  static dropEvent: string;

  accept: string;
  enableDragDrop: boolean;

  on(eventName: 'paste', callback: (args: PasteEventData) => void, thisArg?: any): void;
  on(eventName: 'drop', callback: (args: DropEventData) => void, thisArg?: any): void;
  on(eventName: string, callback: (args: EventData) => void, thisArg?: any): void;

  cleanupTempFiles(): void;
}

/**
 * Drop-in replacement for TextField with rich paste support.
 * Intercepts paste/drop for images, GIFs, files, and text.
 */
export declare class TextFieldRichPaste extends TextField {
  static pasteEvent: string;
  static dropEvent: string;

  accept: string;
  enableDragDrop: boolean;

  on(eventName: 'paste', callback: (args: PasteEventData) => void, thisArg?: any): void;
  on(eventName: 'drop', callback: (args: DropEventData) => void, thisArg?: any): void;
  on(eventName: string, callback: (args: EventData) => void, thisArg?: any): void;

  cleanupTempFiles(): void;
}
