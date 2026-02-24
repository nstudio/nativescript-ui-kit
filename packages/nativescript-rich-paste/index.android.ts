import { TextViewRichPasteBase, TextFieldRichPasteBase, PastePayload, PasteImageItem, PasteFileItem, PasteInputTempFiles, mimeMatchesAccept, textViewEnableDragDropProperty, textFieldEnableDragDropProperty } from './common';

/**
 * Content processing helpers
 */

function extensionFromName(name: string | null | undefined): string | null {
  if (!name) return null;
  const dotIndex = name.lastIndexOf('.');
  if (dotIndex < 0 || dotIndex === name.length - 1) return null;
  return name.substring(dotIndex + 1).toLowerCase();
}

function readDisplayName(uri: android.net.Uri, contentResolver: android.content.ContentResolver): string | null {
  let cursor: android.database.Cursor = null;
  try {
    cursor = contentResolver.query(uri, null, null, null, null);
    if (!cursor || !cursor.moveToFirst()) return null;
    const nameIndex = cursor.getColumnIndex(android.provider.OpenableColumns.DISPLAY_NAME);
    if (nameIndex < 0 || cursor.isNull(nameIndex)) return null;
    return cursor.getString(nameIndex);
  } catch (_e) {
    return null;
  } finally {
    if (cursor) cursor.close();
  }
}

function fallbackMimeFromClipDescription(desc?: android.content.ClipDescription | null): string | null {
  if (!desc) return null;
  if (desc.hasMimeType('image/gif')) return 'image/gif';
  if (desc.hasMimeType('image/*')) return 'image/*';
  if (desc.hasMimeType('image/png')) return 'image/png';
  if (desc.hasMimeType('image/jpeg')) return 'image/jpeg';
  if (desc.hasMimeType('text/*')) return 'text/plain';
  return null;
}

function resolveMimeType(uri: android.net.Uri, contentResolver: android.content.ContentResolver, desc?: android.content.ClipDescription | null): string {
  const providerMime = contentResolver.getType(uri);
  if (providerMime && providerMime !== 'application/octet-stream') {
    return providerMime;
  }

  const map = android.webkit.MimeTypeMap.getSingleton();
  const pathExt = extensionFromName(uri.getLastPathSegment());
  if (pathExt) {
    const extMime = map.getMimeTypeFromExtension(pathExt);
    if (extMime) return extMime;
  }

  const displayName = readDisplayName(uri, contentResolver);
  const nameExt = extensionFromName(displayName);
  if (nameExt) {
    const extMime = map.getMimeTypeFromExtension(nameExt);
    if (extMime) return extMime;
  }

  const descMime = fallbackMimeFromClipDescription(desc);
  if (descMime) return descMime;

  return providerMime || 'application/octet-stream';
}

function processClipDataItem(item: android.content.ClipData.Item, context: android.content.Context, accept: string, desc?: android.content.ClipDescription | null): { images: PasteImageItem[]; files: PasteFileItem[]; text: string | null } {
  const result = { images: [] as PasteImageItem[], files: [] as PasteFileItem[], text: null as string | null };
  const contentResolver = context.getContentResolver();

  const uri = item.getUri();
  if (uri) {
    const mimeType = resolveMimeType(uri, contentResolver, desc);

    if (mimeType === 'image/gif' && mimeMatchesAccept('image/gif', accept)) {
      const filePath = copyUriToTempFile(uri, contentResolver, 'gif');
      if (filePath) {
        if (isGifFile(filePath)) {
          result.images.push({ uri: filePath, mimeType: 'image/gif', animated: true });
        } else {
          const imageItem = decodeImageUri(uri, contentResolver, 'image/*');
          if (imageItem) {
            result.images.push(imageItem);
          }
        }
      }
      return result;
    }

    if (mimeType.startsWith('image/') && mimeMatchesAccept(mimeType, accept)) {
      const imageItem = decodeImageUri(uri, contentResolver, mimeType);
      if (imageItem) result.images.push(imageItem);
      return result;
    }

    if (mimeMatchesAccept(mimeType, accept)) {
      const fileItem = copyFileUri(uri, contentResolver, context, mimeType);
      if (fileItem) result.files.push(fileItem);
      return result;
    }
  }

  const text = item.getText();
  if (text) {
    const textStr = text.toString();
    if (textStr && mimeMatchesAccept('text/plain', accept)) {
      result.text = textStr;
    }
  } else {
    const coerced = item.coerceToText(context);
    if (coerced) {
      const coercedStr = coerced.toString();
      if (coercedStr && mimeMatchesAccept('text/plain', accept)) {
        result.text = coercedStr;
      }
    }
  }

  return result;
}

function isGifFile(filePath: string): boolean {
  let inputStream: java.io.FileInputStream = null;
  try {
    inputStream = new java.io.FileInputStream(filePath);
    const header = Array.create('byte', 6);
    const bytesRead = inputStream.read(header);
    if (bytesRead < 6) return false;

    const b0 = header[0] & 0xff;
    const b1 = header[1] & 0xff;
    const b2 = header[2] & 0xff;
    const b3 = header[3] & 0xff;
    const b4 = header[4] & 0xff;
    const b5 = header[5] & 0xff;

    return b0 === 0x47 && b1 === 0x49 && b2 === 0x46 && b3 === 0x38 && (b4 === 0x37 || b4 === 0x39) && b5 === 0x61;
  } catch (_e) {
    return false;
  } finally {
    if (inputStream) {
      try {
        inputStream.close();
      } catch (_e) {
        /* ignore */
      }
    }
  }
}

function decodeImageUri(uri: android.net.Uri, contentResolver: android.content.ContentResolver, mimeType: string): PasteImageItem | null {
  let inputStream: java.io.InputStream = null;
  try {
    inputStream = contentResolver.openInputStream(uri);
    if (!inputStream) return null;

    const bitmap = android.graphics.BitmapFactory.decodeStream(inputStream);
    if (!bitmap) return null;

    const width = bitmap.getWidth();
    const height = bitmap.getHeight();
    const filePath = PasteInputTempFiles.generateFilePath('jpg');
    const file = new java.io.File(filePath);
    const outputStream = new java.io.FileOutputStream(file);
    bitmap.compress(android.graphics.Bitmap.CompressFormat.JPEG, 80, outputStream);
    outputStream.flush();
    outputStream.close();
    bitmap.recycle();

    return {
      uri: filePath,
      mimeType: mimeType.startsWith('image/') ? mimeType : 'image/jpeg',
      width,
      height,
      animated: false,
    };
  } catch (e) {
    return null;
  } finally {
    if (inputStream) {
      try {
        inputStream.close();
      } catch (_e) {
        /* ignore */
      }
    }
  }
}

function copyUriToTempFile(uri: android.net.Uri, contentResolver: android.content.ContentResolver, extension: string): string | null {
  let inputStream: java.io.InputStream = null;
  let outputStream: java.io.FileOutputStream = null;
  try {
    inputStream = contentResolver.openInputStream(uri);
    if (!inputStream) return null;

    const filePath = PasteInputTempFiles.generateFilePath(extension);
    const file = new java.io.File(filePath);
    outputStream = new java.io.FileOutputStream(file);

    const buffer = Array.create('byte', 8192);
    let bytesRead: number;
    while ((bytesRead = inputStream.read(buffer)) !== -1) {
      outputStream.write(buffer, 0, bytesRead);
    }
    outputStream.flush();
    return filePath;
  } catch (e) {
    return null;
  } finally {
    if (inputStream) {
      try {
        inputStream.close();
      } catch (_e) {
        /* ignore */
      }
    }
    if (outputStream) {
      try {
        outputStream.close();
      } catch (_e) {
        /* ignore */
      }
    }
  }
}

function copyFileUri(uri: android.net.Uri, contentResolver: android.content.ContentResolver, _context: android.content.Context, mimeType: string): PasteFileItem | null {
  const ext = mimeToExtension(mimeType);
  const filePath = copyUriToTempFile(uri, contentResolver, ext);
  if (!filePath) return null;

  let name: string | undefined;
  let size: number | undefined;

  let cursor: android.database.Cursor = null;
  try {
    cursor = contentResolver.query(uri, null, null, null, null);
    if (cursor && cursor.moveToFirst()) {
      const nameIndex = cursor.getColumnIndex(android.provider.OpenableColumns.DISPLAY_NAME);
      if (nameIndex >= 0) name = cursor.getString(nameIndex);
      const sizeIndex = cursor.getColumnIndex(android.provider.OpenableColumns.SIZE);
      if (sizeIndex >= 0 && !cursor.isNull(sizeIndex)) size = cursor.getLong(sizeIndex);
    }
  } catch (_e) {
    // ignore query errors
  } finally {
    if (cursor) cursor.close();
  }

  return { uri: PasteInputTempFiles.getFileUri(filePath), mimeType, name, size };
}

function mimeToExtension(mime: string): string {
  const map: Record<string, string> = { 'application/pdf': 'pdf', 'application/rtf': 'rtf', 'text/html': 'html', 'text/plain': 'txt', 'image/png': 'png', 'image/jpeg': 'jpg', 'image/gif': 'gif', 'image/webp': 'webp' };
  return map[mime] || 'bin';
}

function buildPayloadFromClipData(clip: android.content.ClipData, context: android.content.Context, accept: string): PastePayload | null {
  const allImages: PasteImageItem[] = [];
  const allFiles: PasteFileItem[] = [];
  let textValue: string | null = null;
  const description = clip.getDescription();

  const itemCount = clip.getItemCount();
  for (let i = 0; i < itemCount; i++) {
    const processed = processClipDataItem(clip.getItemAt(i), context, accept, description);
    allImages.push(...processed.images);
    allFiles.push(...processed.files);
    if (processed.text && !textValue) textValue = processed.text;
  }

  if (allImages.length > 0) return { type: 'images', items: allImages };
  if (allFiles.length > 0) return { type: 'files', items: allFiles };
  if (textValue) return { type: 'text', value: textValue };

  const availableTypes: string[] = [];
  const desc = description;
  if (desc) {
    const mimeCount = desc.getMimeTypeCount();
    for (let i = 0; i < mimeCount; i++) availableTypes.push(desc.getMimeType(i));
  }
  if (availableTypes.length > 0) return { type: 'unsupported', availableTypes };

  return null;
}

/**
 * Shared paste listener setup (used by both components)
 */

interface RichPasteOwner {
  accept: string;
  _context: android.content.Context;
  notifyPaste(payload: PastePayload): void;
  notifyDrop(payload: PastePayload): void;
}

function setupReceiveContentListener(editText: androidx.appcompat.widget.AppCompatEditText, ownerRef: WeakRef<RichPasteOwner>): void {
  const mimeTypes = ['image/*', 'text/*', 'application/pdf', 'application/rtf'];

  const listener = new androidx.core.view.OnReceiveContentListener({
    onReceiveContent(view: android.view.View, payload: androidx.core.view.ContentInfoCompat): androidx.core.view.ContentInfoCompat {
      const owner = ownerRef.deref();
      if (!owner) return payload;

      const clip = payload.getClip();
      if (!clip || clip.getItemCount() === 0) return payload;

      const accept = owner.accept || 'all';
      const source = payload.getSource();
      const pastePayload = buildPayloadFromClipData(clip, view.getContext(), accept);

      if (pastePayload) {
        if (pastePayload.type === 'text') {
          owner.notifyPaste(pastePayload);
          return payload;
        }
        if (source === androidx.core.view.ContentInfoCompat.SOURCE_DRAG_AND_DROP) {
          owner.notifyDrop(pastePayload);
        } else {
          owner.notifyPaste(pastePayload);
        }
        return null;
      }

      return payload;
    },
  });

  androidx.core.view.ViewCompat.setOnReceiveContentListener(editText, mimeTypes, listener);
}

function setupLegacyPasteInterception(editText: androidx.appcompat.widget.AppCompatEditText, ownerRef: WeakRef<RichPasteOwner>): void {
  editText.onTextContextMenuItem = (id: number): boolean => {
    const result = (androidx.appcompat.widget.AppCompatEditText.prototype as any).onTextContextMenuItem.call(editText, id);

    if (id === android.R.id.paste) {
      const owner = ownerRef.deref();
      if (owner) {
        const clipboard = owner._context.getSystemService(android.content.Context.CLIPBOARD_SERVICE) as android.content.ClipboardManager;
        if (clipboard?.hasPrimaryClip()) {
          const clip = clipboard.getPrimaryClip();
          const accept = owner.accept || 'all';
          const payload = buildPayloadFromClipData(clip, owner._context, accept);
          if (payload) owner.notifyPaste(payload);
        }
      }
    }

    return result;
  };
}

function createPasteEditText(owner: RichPasteOwner): androidx.appcompat.widget.AppCompatEditText {
  const editText = new androidx.appcompat.widget.AppCompatEditText(owner._context);
  const ownerRef = new WeakRef(owner);

  if (android.os.Build.VERSION.SDK_INT >= 31) {
    setupReceiveContentListener(editText, ownerRef);
  } else {
    setupLegacyPasteInterception(editText, ownerRef);
  }

  return editText;
}

/**
 * TextViewRichPaste — drop-in replacement for TextView with rich paste support
 */

export class TextViewRichPaste extends TextViewRichPasteBase {
  nativeViewProtected: androidx.appcompat.widget.AppCompatEditText;

  createNativeView(): android.widget.EditText {
    return createPasteEditText(this);
  }

  [textViewEnableDragDropProperty.setNative](_value: boolean) {
    // On API 31+, OnReceiveContentListener already handles drag & drop
  }
}

/**
 * TextFieldRichPaste — drop-in replacement for TextField with rich paste support
 */

export class TextFieldRichPaste extends TextFieldRichPasteBase {
  nativeViewProtected: androidx.appcompat.widget.AppCompatEditText;

  createNativeView(): android.widget.EditText {
    return createPasteEditText(this);
  }

  [textFieldEnableDragDropProperty.setNative](_value: boolean) {
    // On API 31+, OnReceiveContentListener already handles drag & drop
  }
}
