import { TextView, CSSType, Property } from '@nativescript/core';

@CSSType('MarkdownView')
export class MarkdownViewBase extends TextView {
  /**
   * Gets the native [android widget](http://developer.android.com/reference/android/widget/TextView.html) that represents the user interface for this component. Valid only when running on Android OS.
   */
  android: android.widget.TextView;

  /**
   * Gets the native UITextView that represents the user interface for this component. Valid only when running on iOS.
   */
  ios: UITextView;
}

export const markdownProperty = new Property<MarkdownViewBase, string>({
  name: 'markdown',
  defaultValue: '',
  affectsLayout: true,
});

markdownProperty.register(MarkdownViewBase);
