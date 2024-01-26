import { markdownProperty, MarkdownViewBase } from './common';
import { fontSizeProperty } from '@nativescript/core';

declare var io: any;

export class MarkdownView extends MarkdownViewBase {
  // @ts-ignore
  nativeView: android.widget.TextView;
  markwon: any;
  constructor() {
    super();
  }

  public createNativeView() {
    const img = io.noties.markwon.image;
    this.markwon = io.noties.markwon.Markwon.builder(this._context).usePlugin(img.ImagesPlugin.create()).build();

    this.nativeView = new android.widget.TextView(this._context);
    this.nativeView.setInputType(android.text.InputType.TYPE_NULL);
    return this.nativeView;
  }

  [fontSizeProperty.setNative](fontSize: number) {
    this.nativeView.setTextSize(Number(fontSize));
  }

  [markdownProperty.setNative](markdown: string) {
    this.markwon.setMarkdown(this.nativeView, markdown);
  }
}
