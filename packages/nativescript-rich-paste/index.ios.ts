import { Utils } from '@nativescript/core';
import { TextViewRichPasteBase, TextFieldRichPasteBase, PastePayload, PasteImageItem, PasteFileItem, PasteInputTempFiles, mimeMatchesAccept, utiToMime, textViewEnableDragDropProperty, textFieldEnableDragDropProperty } from './common';

interface RichPasteOwner {
  accept: string;
  notifyPaste(payload: PastePayload): void;
  notifyDrop(payload: PastePayload): void;
}

function canPasteAction(): boolean {
  const clipboard = UIPasteboard.generalPasteboard;
  return clipboard.hasImages || clipboard.hasStrings || clipboard.hasURLs || clipboard.numberOfItems > 0;
}

function handlePaste(owner: RichPasteOwner | undefined, callSuper: () => void): void {
  if (!owner) {
    callSuper();
    return;
  }

  const clipboard = UIPasteboard.generalPasteboard;
  const accept = owner.accept || 'all';
  const payload = extractPasteboardContent(clipboard, accept);

  if (payload) {
    if (payload.type === 'text') {
      callSuper();
    }
    owner.notifyPaste(payload);
  } else {
    callSuper();
  }
}

/**
 * UIDropInteraction delegate (shared by both components)
 */

@NativeClass()
class NSPasteDropDelegate extends NSObject implements UIDropInteractionDelegate {
  static ObjCProtocols = [UIDropInteractionDelegate];

  owner: WeakRef<RichPasteOwner>;

  static initWithOwner(owner: WeakRef<RichPasteOwner>): NSPasteDropDelegate {
    const delegate = NSPasteDropDelegate.new() as NSPasteDropDelegate;
    delegate.owner = owner;
    return delegate;
  }

  dropInteractionCanHandleSession(_interaction: UIDropInteraction, session: UIDropSession): boolean {
    const owner = this.owner?.deref();
    if (!owner) return false;
    const accept = owner.accept || 'all';
    if (accept === 'all') return true;
    return session.hasItemsConformingToTypeIdentifiers(['public.image', 'public.data', 'public.text']);
  }

  dropInteractionSessionDidUpdate(_interaction: UIDropInteraction, _session: UIDropSession): UIDropProposal {
    return UIDropProposal.alloc().initWithDropOperation(UIDropOperation.Copy);
  }

  dropInteractionPerformDrop(_interaction: UIDropInteraction, session: UIDropSession): void {
    const owner = this.owner?.deref();
    if (!owner) return;

    const itemCount = session.items.count;
    const imageItems: PasteImageItem[] = [];
    let pendingLoads = 0;

    for (let i = 0; i < itemCount; i++) {
      const dragItem = session.items.objectAtIndex(i);
      const provider = dragItem.itemProvider;

      if (provider.hasItemConformingToTypeIdentifier('com.compuserve.gif')) {
        pendingLoads++;
        provider.loadDataRepresentationForTypeIdentifierCompletionHandler('com.compuserve.gif', (data: NSData, _error: NSError) => {
          if (data) {
            const filePath = PasteInputTempFiles.generateFilePath('gif');
            data.writeToFileAtomically(filePath, true);
            imageItems.push({
              uri: PasteInputTempFiles.getFileUri(filePath),
              mimeType: 'image/gif',
              animated: true,
            });
          }
          pendingLoads--;
          if (pendingLoads === 0 && imageItems.length > 0) {
            Utils.executeOnMainThread(() => {
              owner.notifyDrop({ type: 'images', items: imageItems });
            });
          }
        });
      } else if (provider.canLoadObjectOfClass(UIImage.class())) {
        pendingLoads++;
        provider.loadObjectOfClassCompletionHandler(UIImage.class(), (object: UIImage, _error: NSError) => {
          if (object) {
            const item = writeImageToTemp(object);
            if (item) {
              imageItems.push(item);
            }
          }
          pendingLoads--;
          if (pendingLoads === 0 && imageItems.length > 0) {
            Utils.executeOnMainThread(() => {
              owner.notifyDrop({ type: 'images', items: imageItems });
            });
          }
        });
      }
    }
  }
}

/**
 * UITextView subclass — paste interception + no-scroll-animation fix
 */

@NativeClass()
class NSPasteTextView extends UITextView {
  owner: WeakRef<TextViewRichPaste>;

  static initWithOwner(owner: WeakRef<TextViewRichPaste>): NSPasteTextView {
    const view = NSPasteTextView.new() as NSPasteTextView;
    view.owner = owner;
    return view;
  }

  override setContentOffsetAnimated(contentOffset: CGPoint, animated: boolean): void {
    super.setContentOffsetAnimated(contentOffset, false);
  }

  override canPerformActionWithSender(action: string, sender: any): boolean {
    if (action === 'paste:' && canPasteAction()) return true;
    return super.canPerformActionWithSender(action, sender);
  }

  override paste(sender: any): void {
    handlePaste(this.owner?.deref(), () => super.paste(sender));
  }
}

/**
 * UITextField subclass — paste interception + padding rect support
 */

@NativeClass()
class NSPasteTextField extends UITextField {
  owner: WeakRef<TextFieldRichPaste>;

  static initWithOwner(owner: WeakRef<TextFieldRichPaste>): NSPasteTextField {
    const view = NSPasteTextField.new() as NSPasteTextField;
    view.owner = owner;
    return view;
  }

  // Padding support — matches NativeScript core's UITextFieldImpl pattern
  _getTextRectForBounds(bounds: CGRect): CGRect {
    const owner = this.owner?.deref();
    if (!owner) return bounds;
    const size = bounds.size;
    const x = Utils.layout.toDeviceIndependentPixels(owner.effectiveBorderLeftWidth + owner.effectivePaddingLeft);
    const y = Utils.layout.toDeviceIndependentPixels(owner.effectiveBorderTopWidth + owner.effectivePaddingTop);
    const width = Utils.layout.toDeviceIndependentPixels(Utils.layout.toDevicePixels(size.width) - (owner.effectiveBorderLeftWidth + owner.effectivePaddingLeft + owner.effectivePaddingRight + owner.effectiveBorderRightWidth));
    const height = Utils.layout.toDeviceIndependentPixels(Utils.layout.toDevicePixels(size.height) - (owner.effectiveBorderTopWidth + owner.effectivePaddingTop + owner.effectivePaddingBottom + owner.effectiveBorderBottomWidth));
    return CGRectMake(x, y, width, height);
  }

  override textRectForBounds(bounds: CGRect): CGRect {
    return this._getTextRectForBounds(bounds);
  }

  override editingRectForBounds(bounds: CGRect): CGRect {
    return this._getTextRectForBounds(bounds);
  }

  override canPerformActionWithSender(action: string, sender: any): boolean {
    if (action === 'paste:' && canPasteAction()) return true;
    return super.canPerformActionWithSender(action, sender);
  }

  override paste(sender: any): void {
    handlePaste(this.owner?.deref(), () => super.paste(sender));
  }
}

/**
 * Pasteboard content extraction
 */

function acceptsImages(accept: string): boolean {
  return !accept || accept === 'all' || mimeMatchesAccept('image/png', accept) || mimeMatchesAccept('image/jpeg', accept) || mimeMatchesAccept('image/gif', accept);
}

function acceptsText(accept: string): boolean {
  return !accept || accept === 'all' || mimeMatchesAccept('text/plain', accept);
}

function acceptsFiles(accept: string): boolean {
  return !accept || accept === 'all' || mimeMatchesAccept('application/pdf', accept) || mimeMatchesAccept('application/rtf', accept) || mimeMatchesAccept('text/html', accept);
}

const imageExtensions: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  heic: 'image/heic',
  heif: 'image/heif',
  webp: 'image/webp',
  tiff: 'image/tiff',
  tif: 'image/tiff',
  bmp: 'image/bmp',
  ico: 'image/x-icon',
  icns: 'image/x-icns',
};

function processFileUrl(fileUrl: NSURL, accept: string, hintFilename?: string): PastePayload | null {
  const filePath = fileUrl.path;
  const isFileRef = !filePath || filePath.startsWith('/.file/');

  let ext = '';
  if (!isFileRef && filePath) {
    ext = filePath.split('.').pop()?.toLowerCase() || '';
  }
  if (!ext && hintFilename) {
    const dotIndex = hintFilename.lastIndexOf('.');
    if (dotIndex >= 0) {
      ext = hintFilename.substring(dotIndex + 1).toLowerCase();
    }
  }

  const imageMime = imageExtensions[ext];

  const loadData = (): NSData | null => {
    if (!isFileRef && filePath) {
      return NSData.dataWithContentsOfFile(filePath);
    }
    try {
      return NSData.dataWithContentsOfURL(fileUrl);
    } catch (_e) {
      return null;
    }
  };

  const loadImage = (): UIImage | null => {
    if (!isFileRef && filePath) {
      return UIImage.imageWithContentsOfFile(filePath);
    }
    const data = loadData();
    return data ? UIImage.imageWithData(data) : null;
  };

  if (imageMime && acceptsImages(accept)) {
    if (ext === 'gif') {
      const data = loadData();
      if (data) {
        const tempPath = PasteInputTempFiles.generateFilePath('gif');
        data.writeToFileAtomically(tempPath, true);
        return {
          type: 'images',
          items: [{ uri: PasteInputTempFiles.getFileUri(tempPath), mimeType: 'image/gif', animated: true }],
        };
      }
    }

    const image = loadImage();
    if (image) {
      const item = writeImageToTemp(image);
      if (item) {
        return { type: 'images', items: [item] };
      }
    }
  }

  if (!imageMime && acceptsImages(accept)) {
    const image = loadImage();
    if (image) {
      const item = writeImageToTemp(image);
      if (item) {
        return { type: 'images', items: [item] };
      }
    }
  }

  if (acceptsFiles(accept)) {
    const data = loadData();
    if (data) {
      const tempPath = PasteInputTempFiles.generateFilePath(ext || 'bin');
      data.writeToFileAtomically(tempPath, true);
      const fileName = !isFileRef && filePath ? filePath.split('/').pop() : hintFilename || undefined;
      return {
        type: 'files',
        items: [{ uri: PasteInputTempFiles.getFileUri(tempPath), mimeType: imageMime || 'application/octet-stream', name: fileName, size: data.length }],
      };
    }
  }

  return null;
}

function resolveToPathUrl(url: NSURL): NSURL | null {
  if (!url) return null;
  const path = url.path;
  if (path && !path.startsWith('/.file/')) return url;
  const pathUrl = url.filePathURL;
  if (pathUrl && pathUrl.path && !pathUrl.path.startsWith('/.file/')) return pathUrl;
  return null;
}

function resolveBookmarkData(data: NSData): NSURL | null {
  try {
    const isStale = new interop.Reference<boolean>();
    const resolved = NSURL.URLByResolvingBookmarkDataOptionsRelativeToURLBookmarkDataIsStaleError(data, NSURLBookmarkResolutionOptions.WithoutUI, null, isStale);
    if (resolved && resolved.path && !resolved.path.startsWith('/.file/')) return resolved;
  } catch (_e) {
    // Not valid bookmark data or resolution failed
  }
  return null;
}

/**
 * Extract a usable file URL from the pasteboard.
 * Note: macOS Finder file reference URLs (file:///.file/id=...) cannot be resolved
 * on the iOS Simulator — this is a known simulator limitation.
 */
function extractFileUrls(clipboard: UIPasteboard): NSURL[] {
  const urls: NSURL[] = [];
  const seen = new Set<string>();

  const addUrl = (url: NSURL | null): void => {
    if (!url) return;
    const key = url.absoluteString || url.path;
    if (!key || seen.has(key)) return;
    seen.add(key);
    urls.push(url);
  };

  const directUrl = clipboard.URL;
  if (directUrl && directUrl.fileURL) {
    addUrl(resolveToPathUrl(directUrl) || directUrl);
  }

  const itemCount = clipboard.items?.count || 0;
  for (let i = 0; i < itemCount; i++) {
    const itemDict = clipboard.items.objectAtIndex(i) as NSDictionary<string, any>;

    const noderefData = itemDict.objectForKey('com.apple.finder.noderef') as NSData;
    if (noderefData) {
      addUrl(resolveBookmarkData(noderefData));
    }

    const fileUrlData = itemDict.objectForKey('public.file-url') as NSData;
    if (!fileUrlData) continue;

    const bookmarkResolved = resolveBookmarkData(fileUrlData);
    if (bookmarkResolved) {
      addUrl(bookmarkResolved);
      continue;
    }

    try {
      const url = NSURL.URLWithDataRepresentationRelativeToURL(fileUrlData, null);
      if (url) {
        addUrl(resolveToPathUrl(url) || url);
      }
    } catch (_e) {
      // ignore
    }
  }

  return urls;
}

function asWritableData(value: any): NSData | null {
  if (!value) return null;
  const data = value as NSData;
  return typeof data.writeToFileAtomically === 'function' ? data : null;
}

function appendGifData(items: PasteImageItem[], data: NSData | null): void {
  if (!data) return;
  const filePath = PasteInputTempFiles.generateFilePath('gif');
  data.writeToFileAtomically(filePath, true);
  items.push({ uri: PasteInputTempFiles.getFileUri(filePath), mimeType: 'image/gif', animated: true });
}

function collectGifDataForType(clipboard: UIPasteboard, uti: string): NSData[] {
  const result: NSData[] = [];
  try {
    const itemSet = clipboard.itemSetWithPasteboardTypes([uti]);
    if (!itemSet) return result;
    const allData = clipboard.dataForPasteboardTypeInItemSet(uti, itemSet);
    if (!allData || allData.count === 0) return result;
    for (let i = 0; i < allData.count; i++) {
      const data = asWritableData(allData.objectAtIndex(i));
      if (data) result.push(data);
    }
  } catch (_e) {
    // ignore
  }
  return result;
}

function extractPasteboardContent(clipboard: UIPasteboard, accept: string): PastePayload | null {
  const wantsImages = acceptsImages(accept);
  const wantsText = acceptsText(accept);
  const wantsFiles = acceptsFiles(accept);

  // 1. GIF check first (preserves animation)
  if (wantsImages) {
    const items: PasteImageItem[] = [];

    const gifTypes = ['com.compuserve.gif', 'public.gif'];
    for (const gifType of gifTypes) {
      const typeData = collectGifDataForType(clipboard, gifType);
      for (const data of typeData) {
        appendGifData(items, data);
      }
    }

    if (items.length === 0) {
      const itemCount = clipboard.items?.count || 0;
      for (let i = 0; i < itemCount; i++) {
        const itemDict = clipboard.items.objectAtIndex(i) as NSDictionary<string, any>;
        appendGifData(items, asWritableData(itemDict.objectForKey('com.compuserve.gif')));
        appendGifData(items, asWritableData(itemDict.objectForKey('public.gif')));
      }
    }

    if (items.length === 0) {
      for (const gifType of gifTypes) {
        appendGifData(items, asWritableData(clipboard.dataForPasteboardType(gifType)));
      }
    }

    if (items.length > 0) {
      return { type: 'images', items };
    }
  }

  // 2. Static images
  if (wantsImages && clipboard.hasImages) {
    const images = clipboard.images;
    if (images && images.count > 0) {
      const items: PasteImageItem[] = [];
      for (let i = 0; i < images.count; i++) {
        const item = writeImageToTemp(images.objectAtIndex(i));
        if (item) items.push(item);
      }
      if (items.length > 0) return { type: 'images', items };
    }
  }

  // 3. File URLs
  if (wantsImages || wantsFiles) {
    const fileUrls = extractFileUrls(clipboard);
    if (fileUrls.length > 0) {
      const imageItems: PasteImageItem[] = [];
      const fileItems: PasteFileItem[] = [];

      for (const fileUrl of fileUrls) {
        const result = processFileUrl(fileUrl, accept, clipboard.string);
        if (!result) continue;
        if (result.type === 'images') {
          imageItems.push(...result.items);
        } else if (result.type === 'files') {
          fileItems.push(...result.items);
        }
      }

      if (imageItems.length > 0) return { type: 'images', items: imageItems };
      if (fileItems.length > 0) return { type: 'files', items: fileItems };
    }
  }

  // 4. Documents via UTI
  if (wantsFiles) {
    const fileTypes = ['com.adobe.pdf', 'public.rtf', 'public.html'];
    for (const uti of fileTypes) {
      const mime = utiToMime[uti] || 'application/octet-stream';
      if (mimeMatchesAccept(mime, accept)) {
        const data = clipboard.dataForPasteboardType(uti);
        if (data) {
          const ext = mimeToExtension(mime);
          const filePath = PasteInputTempFiles.generateFilePath(ext);
          data.writeToFileAtomically(filePath, true);
          return { type: 'files', items: [{ uri: PasteInputTempFiles.getFileUri(filePath), mimeType: mime, size: data.length }] };
        }
      }
    }
  }

  // 5. Text
  if (wantsText && clipboard.hasStrings) {
    const text = clipboard.string;
    if (text) return { type: 'text', value: text };
  }

  // 6. Unsupported
  const availableTypes: string[] = [];
  const itemCount = clipboard.items?.count || 0;
  for (let i = 0; i < itemCount; i++) {
    const itemDict = clipboard.items.objectAtIndex(i) as NSDictionary<string, any>;
    const keys = itemDict.allKeys;
    for (let k = 0; k < keys.count; k++) {
      const uti = keys.objectAtIndex(k) as string;
      const mime = utiToMime[uti] || uti;
      if (availableTypes.indexOf(mime) === -1) availableTypes.push(mime);
    }
  }
  if (availableTypes.length > 0) return { type: 'unsupported', availableTypes };

  return null;
}

/**
 * Image writing helpers
 */

function writeImageToTemp(image: UIImage): PasteImageItem | null {
  if (!image) return null;
  const hasAlpha = hasAlphaChannel(image);
  let data: NSData;
  let mimeType: string;
  let ext: string;

  if (hasAlpha) {
    data = UIImagePNGRepresentation(image);
    mimeType = 'image/png';
    ext = 'png';
  } else {
    data = UIImageJPEGRepresentation(image, 0.8);
    mimeType = 'image/jpeg';
    ext = 'jpg';
  }
  if (!data) return null;

  const filePath = PasteInputTempFiles.generateFilePath(ext);
  data.writeToFileAtomically(filePath, true);
  return { uri: PasteInputTempFiles.getFileUri(filePath), mimeType, width: image.size.width, height: image.size.height, animated: false };
}

function hasAlphaChannel(image: UIImage): boolean {
  if (!image.CGImage) return false;
  const alphaInfo = CGImageGetAlphaInfo(image.CGImage);
  return alphaInfo !== CGImageAlphaInfo.kCGImageAlphaNone && alphaInfo !== CGImageAlphaInfo.kCGImageAlphaNoneSkipLast && alphaInfo !== CGImageAlphaInfo.kCGImageAlphaNoneSkipFirst;
}

function mimeToExtension(mime: string): string {
  const map: Record<string, string> = { 'application/pdf': 'pdf', 'application/rtf': 'rtf', 'text/html': 'html', 'text/plain': 'txt', 'image/png': 'png', 'image/jpeg': 'jpg', 'image/gif': 'gif', 'image/heic': 'heic' };
  return map[mime] || 'bin';
}

/**
 * Drag & drop setup/teardown (shared by both components)
 */

function setupDragDrop(view: UIView, ownerRef: WeakRef<RichPasteOwner>): { interaction: UIDropInteraction; delegate: NSPasteDropDelegate } {
  const delegate = NSPasteDropDelegate.initWithOwner(ownerRef);
  const interaction = UIDropInteraction.alloc().initWithDelegate(delegate);
  view.addInteraction(interaction);
  return { interaction, delegate };
}

function removeDragDrop(view: UIView, interaction: UIDropInteraction | null): void {
  if (interaction) {
    view.removeInteraction(interaction);
  }
}

/**
 * TextViewRichPaste — drop-in replacement for TextView with rich paste support
 */

export class TextViewRichPaste extends TextViewRichPasteBase {
  nativeViewProtected: NSPasteTextView;
  private _dropInteraction: UIDropInteraction;
  private _dropDelegate: NSPasteDropDelegate;

  createNativeView(): UITextView {
    const view = NSPasteTextView.initWithOwner(new WeakRef(this));
    if (!view.font) {
      view.font = UIFont.systemFontOfSize(12);
    }
    return view;
  }

  initNativeView(): void {
    super.initNativeView();
  }

  disposeNativeView(): void {
    removeDragDrop(this.nativeViewProtected, this._dropInteraction);
    this._dropInteraction = null;
    this._dropDelegate = null;
    super.disposeNativeView();
  }

  [textViewEnableDragDropProperty.setNative](value: boolean) {
    if (value && !this._dropInteraction) {
      const result = setupDragDrop(this.nativeViewProtected, new WeakRef(this));
      this._dropInteraction = result.interaction;
      this._dropDelegate = result.delegate;
    } else if (!value) {
      removeDragDrop(this.nativeViewProtected, this._dropInteraction);
      this._dropInteraction = null;
      this._dropDelegate = null;
    }
  }
}

/**
 * TextFieldRichPaste — drop-in replacement for TextField with rich paste support
 */

export class TextFieldRichPaste extends TextFieldRichPasteBase {
  nativeViewProtected: NSPasteTextField;
  private _dropInteraction: UIDropInteraction;
  private _dropDelegate: NSPasteDropDelegate;

  createNativeView(): UITextField {
    return NSPasteTextField.initWithOwner(new WeakRef(this));
  }

  initNativeView(): void {
    super.initNativeView();
  }

  disposeNativeView(): void {
    removeDragDrop(this.nativeViewProtected, this._dropInteraction);
    this._dropInteraction = null;
    this._dropDelegate = null;
    super.disposeNativeView();
  }

  [textFieldEnableDragDropProperty.setNative](value: boolean) {
    if (value && !this._dropInteraction) {
      const result = setupDragDrop(this.nativeViewProtected, new WeakRef(this));
      this._dropInteraction = result.interaction;
      this._dropDelegate = result.delegate;
    } else if (!value) {
      removeDragDrop(this.nativeViewProtected, this._dropInteraction);
      this._dropInteraction = null;
      this._dropDelegate = null;
    }
  }
}
