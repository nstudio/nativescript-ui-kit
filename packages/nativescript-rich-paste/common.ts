import { EventData, Property, TextView, TextField, booleanConverter, knownFolders, path, Folder } from '@nativescript/core';

/**
 * Payload types (discriminated union)
 */

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
 * Temp file helpers
 */

export class PasteInputTempFiles {
  static getTempDir(): string {
    return path.join(knownFolders.temp().path, 'rich-paste');
  }

  static ensureTempDir(): string {
    const dir = PasteInputTempFiles.getTempDir();
    const folder = Folder.fromPath(dir);
    return folder.path;
  }

  static generateFileName(extension: string): string {
    const random = Math.random().toString(36).substring(2, 8);
    return `paste-${Date.now()}-${random}.${extension}`;
  }

  static generateFilePath(extension: string): string {
    const dir = PasteInputTempFiles.ensureTempDir();
    return path.join(dir, PasteInputTempFiles.generateFileName(extension));
  }

  static getFileUri(filePath: string): string {
    return 'file://' + filePath;
  }

  static cleanupAll(): void {
    try {
      const folder = Folder.fromPath(PasteInputTempFiles.getTempDir());
      folder.clearSync();
    } catch (e) {
      // temp dir may not exist yet
    }
  }
}

/**
 * MIME matching
 */

export function mimeMatchesAccept(mime: string, accept: string): boolean {
  if (!accept || accept === 'all') {
    return true;
  }
  const acceptParts = accept.split(',').map((s) => s.trim().toLowerCase());
  const mimeLower = mime.toLowerCase();
  for (const part of acceptParts) {
    if (part === 'all') return true;
    if (part === 'text' && mimeLower.startsWith('text/')) return true;
    if (part === 'image' && mimeLower.startsWith('image/')) return true;
    if (part === mimeLower) return true;
    // wildcard like image/*
    if (part.endsWith('/*') && mimeLower.startsWith(part.replace('/*', '/'))) return true;
  }
  return false;
}

/**
 * UTI to MIME mapping (iOS)
 */

export const utiToMime: Record<string, string> = {
  'com.compuserve.gif': 'image/gif',
  'public.png': 'image/png',
  'public.jpeg': 'image/jpeg',
  'public.tiff': 'image/tiff',
  'com.microsoft.bmp': 'image/bmp',
  'public.heic': 'image/heic',
  'com.adobe.pdf': 'application/pdf',
  'public.rtf': 'application/rtf',
  'public.html': 'text/html',
  'public.plain-text': 'text/plain',
  'public.utf8-plain-text': 'text/plain',
  'public.url': 'text/uri-list',
};

/**
 * Base class
 */

export abstract class TextViewRichPasteBase extends TextView {
  static pasteEvent = 'paste';
  static dropEvent = 'drop';

  accept: string;
  enableDragDrop: boolean;

  notifyPaste(payload: PastePayload) {
    this.notify({
      eventName: TextViewRichPasteBase.pasteEvent,
      object: this,
      data: payload,
    });
  }

  notifyDrop(payload: PastePayload) {
    this.notify({
      eventName: TextViewRichPasteBase.dropEvent,
      object: this,
      data: payload,
    });
  }

  cleanupTempFiles(): void {
    PasteInputTempFiles.cleanupAll();
  }
}

export abstract class TextFieldRichPasteBase extends TextField {
  static pasteEvent = 'paste';
  static dropEvent = 'drop';

  accept: string;
  enableDragDrop: boolean;

  notifyPaste(payload: PastePayload) {
    this.notify({
      eventName: TextFieldRichPasteBase.pasteEvent,
      object: this,
      data: payload,
    });
  }

  notifyDrop(payload: PastePayload) {
    this.notify({
      eventName: TextFieldRichPasteBase.dropEvent,
      object: this,
      data: payload,
    });
  }

  cleanupTempFiles(): void {
    PasteInputTempFiles.cleanupAll();
  }
}

/**
 * Property registrations
 */

const acceptPropertyConfig = {
  name: 'accept',
  defaultValue: 'all',
};

export const textViewAcceptProperty = new Property<TextViewRichPasteBase, string>({
  ...acceptPropertyConfig,
});
textViewAcceptProperty.register(TextViewRichPasteBase);

export const textFieldAcceptProperty = new Property<TextFieldRichPasteBase, string>({
  ...acceptPropertyConfig,
});
textFieldAcceptProperty.register(TextFieldRichPasteBase);

const enableDragDropPropertyConfig = {
  name: 'enableDragDrop',
  defaultValue: false,
  valueConverter: booleanConverter,
};

export const textViewEnableDragDropProperty = new Property<TextViewRichPasteBase, boolean>({
  ...enableDragDropPropertyConfig,
});
textViewEnableDragDropProperty.register(TextViewRichPasteBase);

export const textFieldEnableDragDropProperty = new Property<TextFieldRichPasteBase, boolean>({
  ...enableDragDropPropertyConfig,
});
textFieldEnableDragDropProperty.register(TextFieldRichPasteBase);
