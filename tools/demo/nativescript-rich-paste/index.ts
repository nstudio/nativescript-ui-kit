import { ObservableArray } from '@nativescript/core';
import { DemoSharedBase } from '../utils';
import { PasteEventData, PasteImageItem } from '@nstudio/nativescript-rich-paste';

export class DemoSharedNativescriptRichPaste extends DemoSharedBase {
  pasteResult: string = '';
  showImages: boolean = false;
  pastedImages: ObservableArray<PasteImageItem> = new ObservableArray<PasteImageItem>();

  onPaste(args: PasteEventData) {
    const payload = args.data;
    switch (payload.type) {
      case 'text':
        this.set('pasteResult', `Text: ${payload.value}`);
        console.log('[RichPaste] Text pasted:', payload.value);
        break;
      case 'images':
        const imgInfo = payload.items.map((i) => `  ${i.mimeType} ${i.width || '?'}x${i.height || '?'} animated:${i.animated}`).join('\n');
        this.set('pasteResult', `Images (${payload.items.length}):\n${imgInfo}`);
        this.pastedImages.push(...payload.items);
        this.set('showImages', true);
        console.log('[RichPaste] Images pasted:', payload.items.length);
        break;
      case 'files':
        const fileInfo = payload.items.map((f) => `  ${f.name || 'unknown'} (${f.mimeType}, ${f.size || '?'} bytes)`).join('\n');
        this.set('pasteResult', `Files (${payload.items.length}):\n${fileInfo}`);
        console.log('[RichPaste] Files pasted:', payload.items.length);
        break;
      case 'unsupported':
        this.set('pasteResult', `Unsupported. Available types:\n  ${payload.availableTypes.join(', ')}`);
        console.log('[RichPaste] Unsupported paste, types:', payload.availableTypes);
        break;
    }
  }

  onDrop(args: PasteEventData) {
    console.log('[RichPaste] Drop event');
    this.onPaste(args);
  }

  onSend() {
    console.log('[RichPaste] Send - images:', this.pastedImages.length);
    this.pastedImages.splice(0, this.pastedImages.length);
    this.set('showImages', false);
  }
}
