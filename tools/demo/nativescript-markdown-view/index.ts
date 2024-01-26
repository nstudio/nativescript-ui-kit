import { DemoSharedBase } from '../utils';
import {} from '@nstudio/nativescript-markdown-view';

export class DemoSharedNativescriptMarkdownView extends DemoSharedBase {
  headings = '# H1\n## H2\n### H3\n#### H4\n##### H5\n###### H6';
  
  code = "`private doSomething(): Something[] { console.log('YES!') }`";
  
  emphasis = '**bold** or __bold__\n*italic* or _italic_';
  
  lists = '* First\n* Second\n1. Third\n4. Fourth';
  
  link = '[Sample link](https://github.com/nstudio/nativescript-ui-kit/blob/feat/rive/packages/nativescript-markdown/README.md)';
  
  quote = '> Quote\n>> Quote';
  
  img = '![nativescript website](https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/NativeScript_Logo.png/128px-NativeScript_Logo.png)';
  
  text = 'This is a sample text';


}
