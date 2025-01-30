declare class TSBaseParser extends NSObject {
  static alloc(): TSBaseParser; // inherited from NSObject

  static new(): TSBaseParser; // inherited from NSObject

  defaultAttributes: NSDictionary<string, any>;

  addParsingRuleWithRegularExpressionBlock(regularExpression: NSRegularExpression, block: (p1: NSTextCheckingResult, p2: NSMutableAttributedString) => void): void;

  attributedStringFromAttributedMarkdownString(attributedString: NSAttributedString): NSAttributedString;

  attributedStringFromMarkdown(markdown: string): NSAttributedString;

  attributedStringFromMarkdownAttributes(markdown: string, attributes: NSDictionary<string, any>): NSAttributedString;
}

declare class TSMarkdownParser extends TSBaseParser {
  static alloc(): TSMarkdownParser; // inherited from NSObject

  static new(): TSMarkdownParser; // inherited from NSObject

  static standardParser(): TSMarkdownParser;

  emphasisAttributes: NSDictionary<string, any>;

  headerAttributes: NSArray<NSDictionary<string, any>>;

  imageAttributes: NSDictionary<string, any>;

  linkAttributes: NSDictionary<string, any>;

  listAttributes: NSArray<NSDictionary<string, any>>;

  monospaceAttributes: NSDictionary<string, any>;

  quoteAttributes: NSArray<NSDictionary<string, any>>;

  skipLinkAttribute: boolean;

  strongAttributes: NSDictionary<string, any>;

  addCodeEscapingParsing(): void;

  addCodeUnescapingParsingWithFormattingBlock(formattingBlock: (p1: NSMutableAttributedString, p2: NSRange) => void): void;

  addEmphasisParsingWithFormattingBlock(formattingBlock: (p1: NSMutableAttributedString, p2: NSRange) => void): void;

  addEscapingParsing(): void;

  addHeaderParsingWithMaxLevelLeadFormattingBlockTextFormattingBlock(maxLevel: number, leadFormattingBlock: (p1: NSMutableAttributedString, p2: NSRange, p3: number) => void, formattingBlock: (p1: NSMutableAttributedString, p2: NSRange, p3: number) => void): void;

  addImageParsingWithImageFormattingBlockAlternativeTextFormattingBlock(formattingBlock: (p1: NSMutableAttributedString, p2: NSRange) => void, alternativeFormattingBlock: (p1: NSMutableAttributedString, p2: NSRange) => void): void;

  addImageParsingWithLinkFormattingBlock(formattingBlock: (p1: NSMutableAttributedString, p2: NSRange, p3: string) => void): void;

  addLinkDetectionWithFormattingBlock(formattingBlock: (p1: NSMutableAttributedString, p2: NSRange) => void): void;

  addLinkDetectionWithLinkFormattingBlock(formattingBlock: (p1: NSMutableAttributedString, p2: NSRange, p3: string) => void): void;

  addLinkParsingWithFormattingBlock(formattingBlock: (p1: NSMutableAttributedString, p2: NSRange) => void): void;

  addLinkParsingWithLinkFormattingBlock(formattingBlock: (p1: NSMutableAttributedString, p2: NSRange, p3: string) => void): void;

  addListParsingWithMaxLevelLeadFormattingBlockTextFormattingBlock(maxLevel: number, leadFormattingBlock: (p1: NSMutableAttributedString, p2: NSRange, p3: number) => void, formattingBlock: (p1: NSMutableAttributedString, p2: NSRange, p3: number) => void): void;

  addMonospacedParsingWithFormattingBlock(formattingBlock: (p1: NSMutableAttributedString, p2: NSRange) => void): void;

  addQuoteParsingWithMaxLevelLeadFormattingBlockTextFormattingBlock(maxLevel: number, leadFormattingBlock: (p1: NSMutableAttributedString, p2: NSRange, p3: number) => void, formattingBlock: (p1: NSMutableAttributedString, p2: NSRange, p3: number) => void): void;

  addShortHeaderParsingWithMaxLevelLeadFormattingBlockTextFormattingBlock(maxLevel: number, leadFormattingBlock: (p1: NSMutableAttributedString, p2: NSRange, p3: number) => void, formattingBlock: (p1: NSMutableAttributedString, p2: NSRange, p3: number) => void): void;

  addShortListParsingWithMaxLevelLeadFormattingBlockTextFormattingBlock(maxLevel: number, leadFormattingBlock: (p1: NSMutableAttributedString, p2: NSRange, p3: number) => void, formattingBlock: (p1: NSMutableAttributedString, p2: NSRange, p3: number) => void): void;

  addShortQuoteParsingWithMaxLevelLeadFormattingBlockTextFormattingBlock(maxLevel: number, leadFormattingBlock: (p1: NSMutableAttributedString, p2: NSRange, p3: number) => void, formattingBlock: (p1: NSMutableAttributedString, p2: NSRange, p3: number) => void): void;

  addStrongParsingWithFormattingBlock(formattingBlock: (p1: NSMutableAttributedString, p2: NSRange) => void): void;

  addUnescapingParsing(): void;
}

declare var TSMarkdownParserVersionNumber: number;

declare var TSMarkdownParserVersionString: interop.Reference<number>;
