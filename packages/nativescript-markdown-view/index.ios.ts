import { markdownProperty, MarkdownViewBase } from './common';
import { Color, fontSizeProperty, colorProperty } from '@nativescript/core';

export class MarkdownView extends MarkdownViewBase {
  // @ts-ignore
  nativeView: UITextView;
  mdParser: TSMarkdownParser;

  _currentMarkdown: string;
  _fontSize: number;
  _color: UIColor;

  public createNativeView() {
    this.mdParser = TSMarkdownParser.standardParser();
    this.nativeView = super.createNativeView() as UITextView;
    this.nativeView.editable = false;
    this.nativeView.selectable = true;
    this.nativeView.scrollEnabled = false;
    return this.nativeView;
  }

  [fontSizeProperty.setNative](fontSize: number) {
    this._fontSize = fontSize;
    this._updateStyling();
  }

  [colorProperty.setNative](value: Color | UIColor) {
    this._color = value instanceof Color ? value.ios : value;
    this._updateStyling();
  }

  [markdownProperty.setNative](markdown: string) {
    this._currentMarkdown = markdown;
    this._updateMarkdown();
  }

  private _updateMarkdown() {
    if (this._currentMarkdown) {
      this.nativeView.attributedText = this.mdParser.attributedStringFromMarkdown(this._currentMarkdown);
    } else {
      this.nativeView.text = '';
    }
  }

  private _updateStyling() {
    const defaultAttributes = NSDictionary.dictionaryWithObjectsForKeys([UIFont.systemFontOfSize(this._fontSize), this._color], [NSFontAttributeName, NSForegroundColorAttributeName]);
    const emphasisAttributes = NSDictionary.dictionaryWithObjectsForKeys([UIFont.italicSystemFontOfSize(this._fontSize)], [NSFontAttributeName]);
    const strongAttributes = NSDictionary.dictionaryWithObjectsForKeys([UIFont.boldSystemFontOfSize(this._fontSize)], [NSFontAttributeName]);

    this.mdParser.defaultAttributes = defaultAttributes;
    this.mdParser.emphasisAttributes = emphasisAttributes;
    this.mdParser.strongAttributes = strongAttributes;
    this._updateMarkdown();
  }
}
