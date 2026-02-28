import { Color, EventData, fromObject, ShownModallyData } from '@nativescript/core';

function _setBindingContext(page: any, modalContext: any) {
  if (!modalContext || page.bindingContext) return;
  page.bindingContext = fromObject({
    ...modalContext,
    onClose() {
      page.closeModal();
    },
  });
}

export function onLoaded(args: EventData) {
  const page = args.object as any;

  // Set binding context early so content renders before the sheet animates in.
  // NativeScript stores the modal context on the page before presentation.
  _setBindingContext(page, page._modalContext);

  if (__IOS__) {
    // Configure sheet BEFORE presentation animation begins.
    let vc = page.ios || page.viewController;
    let sheet = vc?.sheetPresentationController;
    if (!sheet && vc?.parentViewController) {
      sheet = vc.parentViewController.sheetPresentationController;
    }
    if (sheet) {
      sheet.detents = [UISheetPresentationControllerDetent.mediumDetent(), UISheetPresentationControllerDetent.largeDetent()];
      sheet.prefersGrabberVisible = true;
      sheet.preferredCornerRadius = 20;
    }

    // iOS 26+ Liquid Glass: clear opaque background so the system
    // glass material on sheets shows through automatically.
    const majorVersion = parseInt(UIDevice.currentDevice.systemVersion);
    if (majorVersion >= 26) {
      page.backgroundColor = new Color('transparent');
    }
  }
}

export function onShownModally(args: ShownModallyData) {
  // Fallback in case binding context wasn't set during onLoaded
  _setBindingContext(args.object, args.context);
}
