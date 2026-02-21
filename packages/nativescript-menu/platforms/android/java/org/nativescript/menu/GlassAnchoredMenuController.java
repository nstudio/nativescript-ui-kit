package org.nativescript.menu;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.animation.AnimatorSet;
import android.animation.ObjectAnimator;
import android.app.Activity;
import android.content.Context;
import android.content.res.Configuration;
import android.graphics.Color;
import android.graphics.Point;
import android.graphics.Rect;
import android.graphics.RectF;
import android.graphics.drawable.ColorDrawable;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.os.Build;
import android.text.TextUtils;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.HapticFeedbackConstants;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.VelocityTracker;
import android.view.ViewConfiguration;
import android.view.WindowManager;
import android.view.animation.OvershootInterpolator;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.PopupWindow;
import android.widget.ScrollView;
import android.widget.TextView;

import androidx.dynamicanimation.animation.DynamicAnimation;
import androidx.dynamicanimation.animation.SpringAnimation;
import androidx.dynamicanimation.animation.SpringForce;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class GlassAnchoredMenuController {

    private static final int MAX_MENU_WIDTH_DP = 340;
    private static final int MAX_MENU_HEIGHT_DP = 560;
    private static final int ROOT_VERTICAL_OFFSET_DP = 8;
    private static final int SUBMENU_HORIZONTAL_OFFSET_DP = 6;
    private static final int WINDOW_MARGIN_DP = 12;
    private static final int CARD_CORNER_RADIUS_DP = 28;
    private static final int CARD_SHADOW_ELEVATION_DP = 12;
    private static final int CARD_SHADOW_PADDING_MIN_DP = 8;
    private static final int CARD_SOFT_SHADOW_BLUR_DP = 14;
    private static final int CARD_SOFT_SHADOW_OFFSET_Y_DP = 2;

    public interface SelectionListener {
        void onSelected(String path, boolean keepsMenuOpen);
        void onDismiss();
    }

    private static class MenuItem {
        String name;
        String subtitle;
        String icon;
        String iconType;
        String iconSrc;
        String iconText;
        String iconFontFamily;
        int iconFontWeight;
        String iconColor;
        boolean destructive;
        boolean disabled;
        boolean hidden;
        boolean keepsMenuOpen;
        boolean singleSelection;
        String state;
        String childrenStyle;
        final List<MenuItem> children = new ArrayList<>();
    }

    private static class IndexedMenuItem {
        final int originalIndex;
        final MenuItem item;

        IndexedMenuItem(int originalIndex, MenuItem item) {
            this.originalIndex = originalIndex;
            this.item = item;
        }
    }

    private static class Placement {
        int x;
        int y;
        int popupWidth;
        int popupHeight;
        int anchorCenterX;
        boolean openAbove;
        boolean openRight;
        float distance;
    }

    private static class PopupRecord {
        final PopupWindow popup;
        final int depth;

        PopupRecord(PopupWindow popup, int depth) {
            this.popup = popup;
            this.depth = depth;
        }
    }

    private final Context context;
    private final List<PopupRecord> stack = new ArrayList<>();
    private SelectionListener listener;
    private boolean notifyingDismiss;
    private View hostWindowAnchor;
    private Float androidBackgroundOpacity;

    public GlassAnchoredMenuController(Context context) {
        this.context = context;
    }

    public void dismiss() {
        notifyingDismiss = true;
        for (int i = stack.size() - 1; i >= 0; i--) {
            PopupRecord record = stack.get(i);
            if (record != null && record.popup != null && record.popup.isShowing()) {
                record.popup.dismiss();
            }
        }
        stack.clear();
        notifyingDismiss = false;
    }

    public void show(View anchor, String json, SelectionListener listener) {
        this.androidBackgroundOpacity = null;
        showInternal(anchor, json, listener);
    }

    public void show(View anchor, String json, SelectionListener listener, double androidBackgroundOpacity) {
        this.androidBackgroundOpacity = clampOpacity(androidBackgroundOpacity);
        showInternal(anchor, json, listener);
    }

    private void showInternal(View anchor, String json, SelectionListener listener) {
        dismiss();
        this.listener = listener;
        this.hostWindowAnchor = resolveHostWindowAnchor(anchor);

        if (!isHostWindowValid(this.hostWindowAnchor)) {
            if (listener != null) {
                listener.onDismiss();
            }
            return;
        }

        try {
            JSONArray array = new JSONArray(json);
            List<MenuItem> items = parseItems(array);
            if (items.isEmpty()) {
                if (listener != null) {
                    listener.onDismiss();
                }
                return;
            }
            showMenu(anchor, items, new ArrayList<Integer>(), true);
        } catch (JSONException e) {
            if (listener != null) {
                listener.onDismiss();
            }
        }
    }

    private List<MenuItem> parseItems(JSONArray array) throws JSONException {
        List<MenuItem> items = new ArrayList<>();
        for (int i = 0; i < array.length(); i++) {
            JSONObject obj = array.optJSONObject(i);
            if (obj == null) {
                continue;
            }
            MenuItem item = parseItem(obj);
            items.add(item);
        }
        return items;
    }

    private MenuItem parseItem(JSONObject obj) throws JSONException {
        MenuItem item = new MenuItem();
        item.name = obj.optString("name", "");
        item.subtitle = obj.optString("subtitle", "");
        item.icon = obj.optString("icon", "");
        item.iconType = obj.optString("iconType", "symbol");
        item.iconSrc = obj.optString("iconSrc", "");
        item.iconText = obj.optString("iconText", "");
        item.iconFontFamily = obj.optString("iconFontFamily", "");
        item.iconFontWeight = obj.optInt("iconFontWeight", 400);
        item.iconColor = obj.optString("iconColor", "");
        item.destructive = obj.optBoolean("destructive", false);
        item.disabled = obj.optBoolean("disabled", false);
        item.hidden = obj.optBoolean("hidden", false);
        item.keepsMenuOpen = obj.optBoolean("keepsMenuOpen", false);
        item.singleSelection = obj.optBoolean("singleSelection", false);
        item.state = obj.optString("state", "off");
        item.childrenStyle = obj.optString("childrenStyle", "dropdown");

        JSONArray children = obj.optJSONArray("children");
        if (children != null) {
            for (int i = 0; i < children.length(); i++) {
                JSONObject child = children.optJSONObject(i);
                if (child == null) {
                    continue;
                }
                MenuItem parsedChild = parseItem(child);
                item.children.add(parsedChild);
            }
        }

        return item;
    }

    private void showMenu(final View anchor, final List<MenuItem> items, final List<Integer> parentPath, final boolean root) {
        if (items == null || items.isEmpty()) {
            return;
        }

        LinearLayout card = new LinearLayout(context);
        card.setOrientation(LinearLayout.VERTICAL);
        card.setPadding(dp(8), dp(8), dp(8), dp(8));
        card.setElevation(dp(CARD_SHADOW_ELEVATION_DP));
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            card.setTranslationZ(dp(2));
        }

        int glassColor = resolveGlassBackgroundColor(!root);

        GradientDrawable background = new GradientDrawable();
        background.setCornerRadius(dp(CARD_CORNER_RADIUS_DP));
        background.setColor(glassColor);
        background.setStroke(dp(1), resolveGlassStrokeColor());
        card.setBackground(background);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            card.setOutlineAmbientShadowColor(resolveCardAmbientShadowColor());
            card.setOutlineSpotShadowColor(resolveCardSpotShadowColor());
        }

        IndexedMenuItem paletteGroup = null;
        List<IndexedMenuItem> visibleItems = new ArrayList<>();
        for (int i = 0; i < items.size(); i++) {
            MenuItem item = items.get(i);
            if (item.hidden) {
                continue;
            }
            if (paletteGroup == null && "palette".equals(item.childrenStyle) && !item.children.isEmpty()) {
                paletteGroup = new IndexedMenuItem(i, item);
            } else {
                visibleItems.add(new IndexedMenuItem(i, item));
            }
        }

        if (root && !visibleItems.isEmpty()) {
            Collections.reverse(visibleItems);
        }

        if (paletteGroup != null) {
            card.addView(createPaletteRow(paletteGroup, parentPath));
        }

        LinearLayout menuRows = new LinearLayout(context);
        menuRows.setOrientation(LinearLayout.VERTICAL);

        for (int i = 0; i < visibleItems.size(); i++) {
            final IndexedMenuItem indexedItem = visibleItems.get(i);
            final int index = indexedItem.originalIndex;
            final MenuItem item = indexedItem.item;
            boolean rowHasIcon = hasVisibleIcon(item);

            final View row = createMenuRow(item, rowHasIcon);
            row.setEnabled(!item.disabled);
            row.setAlpha(item.disabled ? 0.45f : 1f);

            if (!item.disabled) {
                row.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        view.performHapticFeedback(HapticFeedbackConstants.VIRTUAL_KEY);
                        List<Integer> path = new ArrayList<>(parentPath);
                        path.add(index);

                        if (!item.children.isEmpty()) {
                            pruneStackForDepth(path.size());
                            showMenu(view, item.children, path, false);
                            return;
                        }

                        if (listener != null) {
                            listener.onSelected(pathToString(path), item.keepsMenuOpen);
                        }
                        if (!item.keepsMenuOpen) {
                            dismissAnimated();
                        }
                    }
                });
            }

            menuRows.addView(row);

            if (i != visibleItems.size() - 1) {
                View divider = new View(context);
                divider.setBackgroundColor(resolveDividerColor());
                LinearLayout.LayoutParams dividerParams = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(1));
                dividerParams.leftMargin = dp(rowHasIcon ? 52 : 14);
                menuRows.addView(divider, dividerParams);
            }
        }

        if (paletteGroup != null && menuRows.getChildCount() > 0) {
            LinearLayout spaced = new LinearLayout(context);
            spaced.setOrientation(LinearLayout.VERTICAL);
            spaced.setPadding(0, dp(8), 0, 0);
            spaced.addView(menuRows);
            card.addView(spaced);
        } else {
            card.addView(menuRows);
        }

        SoftShadowLayout cardShadowHost = new SoftShadowLayout(context);
        cardShadowHost.setClipChildren(false);
        cardShadowHost.setClipToPadding(false);
        float shadowBlur = dp(CARD_SOFT_SHADOW_BLUR_DP);
        float shadowDx = 0f;
        float shadowDy = dp(CARD_SOFT_SHADOW_OFFSET_Y_DP);
        int minShadowPad = dp(CARD_SHADOW_PADDING_MIN_DP);
        int shadowPadLeft = Math.max(minShadowPad, (int) Math.ceil(shadowBlur + Math.max(0f, -shadowDx)));
        int shadowPadTop = Math.max(minShadowPad, (int) Math.ceil(shadowBlur + Math.max(0f, -shadowDy)));
        int shadowPadRight = Math.max(minShadowPad, (int) Math.ceil(shadowBlur + Math.max(0f, shadowDx)));
        int shadowPadBottom = Math.max(minShadowPad, (int) Math.ceil(shadowBlur + Math.max(0f, shadowDy)));
        cardShadowHost.setPadding(shadowPadLeft, shadowPadTop, shadowPadRight, shadowPadBottom);
        cardShadowHost.setCornerRadius(dp(CARD_CORNER_RADIUS_DP));
        cardShadowHost.setShadow(
            shadowBlur,
            shadowDx,
            shadowDy,
            resolveCardSoftShadowColor(),
            resolveCardSoftFillColor()
        );
        cardShadowHost.addView(card, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT));

        ScrollView scroll = new ScrollView(context);
        scroll.setVerticalScrollBarEnabled(false);
        scroll.setOverScrollMode(View.OVER_SCROLL_NEVER);
        scroll.setClipToPadding(false);
        scroll.addView(cardShadowHost, new ScrollView.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT));

        FrameLayout container = new FrameLayout(context);
        container.setClipChildren(false);
        container.setClipToPadding(false);

        FrameLayout.LayoutParams scrollParams = new FrameLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        container.addView(scroll, scrollParams);

        container.measure(
                View.MeasureSpec.makeMeasureSpec(dp(MAX_MENU_WIDTH_DP), View.MeasureSpec.AT_MOST),
                View.MeasureSpec.makeMeasureSpec(dp(MAX_MENU_HEIGHT_DP), View.MeasureSpec.AT_MOST)
        );

        Placement placement = calculatePlacement(anchor, container.getMeasuredWidth(), container.getMeasuredHeight(), root);

        final PopupWindow popup = new PopupWindow(container, ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT, true);
        popup.setTouchable(true);
        popup.setOutsideTouchable(true);
        popup.setClippingEnabled(false);
        popup.setElevation(dp(2));
        popup.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        popup.setTouchInterceptor(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                if (event == null) {
                    return false;
                }

                if (event.getAction() == MotionEvent.ACTION_OUTSIDE) {
                    dismissAnimated();
                    return true;
                }

                if (event.getAction() == MotionEvent.ACTION_DOWN && isOutsideContentBounds(event, container)) {
                    dismissAnimated();
                    return true;
                }

                return false;
            }
        });

        popup.setOnDismissListener(new PopupWindow.OnDismissListener() {
            @Override
            public void onDismiss() {
                if (!notifyingDismiss) {
                    removePopupFromStack(popup);
                }
                if (!notifyingDismiss && stack.isEmpty() && listener != null) {
                    listener.onDismiss();
                }
            }
        });

        stack.add(new PopupRecord(popup, parentPath.size()));
        View popupHost = resolvePopupHost(anchor);
        if (!isHostWindowValid(popupHost)) {
            popup.dismiss();
            return;
        }

        popup.showAtLocation(popupHost, Gravity.NO_GRAVITY, placement.x, placement.y);
        animateEntrance(container, placement, root);

        if (root) {
            setupDragToDismiss(container, popup);
        }
    }

    private View createPaletteRow(final IndexedMenuItem paletteGroup, final List<Integer> parentPath) {
        LinearLayout row = new LinearLayout(context);
        row.setOrientation(LinearLayout.HORIZONTAL);
        row.setGravity(Gravity.CENTER_HORIZONTAL);
        row.setPadding(dp(8), dp(6), dp(8), dp(6));

        for (int i = 0; i < paletteGroup.item.children.size(); i++) {
            final int index = i;
            final MenuItem child = paletteGroup.item.children.get(i);
            if (child.hidden) {
                continue;
            }

            LinearLayout iconWrap = new LinearLayout(context);
            iconWrap.setGravity(Gravity.CENTER);
            iconWrap.setPadding(dp(18), dp(9), dp(18), dp(9));

            View icon = createIconView(child);
            LinearLayout.LayoutParams iconParams = new LinearLayout.LayoutParams(dp(22), dp(22));
            iconParams.gravity = Gravity.CENTER;
            iconWrap.addView(icon, iconParams);

            GradientDrawable pressed = new GradientDrawable();
            pressed.setCornerRadius(dp(14));
            pressed.setColor(resolveRowPressedColor());
            iconWrap.setOnTouchListener(new View.OnTouchListener() {
                @Override
                public boolean onTouch(View v, MotionEvent event) {
                    if (!v.isEnabled()) {
                        return false;
                    }
                    if (event.getAction() == MotionEvent.ACTION_DOWN) {
                        v.setBackground(pressed);
                    } else if (event.getAction() == MotionEvent.ACTION_UP || event.getAction() == MotionEvent.ACTION_CANCEL) {
                        v.setBackground(null);
                    }
                    return false;
                }
            });

            iconWrap.setAlpha(child.disabled ? 0.45f : 1f);
            iconWrap.setEnabled(!child.disabled);

            if (!child.disabled) {
                iconWrap.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        v.performHapticFeedback(HapticFeedbackConstants.VIRTUAL_KEY);
                        List<Integer> path = new ArrayList<>(parentPath);
                        path.add(paletteGroup.originalIndex);
                        path.add(index);

                        if (!child.children.isEmpty()) {
                            pruneStackForDepth(path.size());
                            showMenu(v, child.children, path, false);
                            return;
                        }

                        if (listener != null) {
                            listener.onSelected(pathToString(path), child.keepsMenuOpen);
                        }
                        if (!child.keepsMenuOpen) {
                            dismissAnimated();
                        }
                    }
                });
            }

            row.addView(iconWrap, new LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT));
        }

        return row;
    }

    private View createMenuRow(MenuItem item, boolean reserveIconSpace) {
        LinearLayout row = new LinearLayout(context);
        row.setOrientation(LinearLayout.HORIZONTAL);
        row.setGravity(Gravity.CENTER_VERTICAL);
        row.setMinimumHeight(dp(46));
        row.setPadding(dp(14), dp(11), dp(12), dp(11));

        GradientDrawable pressed = new GradientDrawable();
        pressed.setCornerRadius(dp(16));
        pressed.setColor(resolveRowPressedColor());

        row.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                if (!v.isEnabled()) {
                    return false;
                }
                if (event.getAction() == MotionEvent.ACTION_DOWN) {
                    v.setBackground(pressed);
                } else if (event.getAction() == MotionEvent.ACTION_CANCEL || event.getAction() == MotionEvent.ACTION_UP) {
                    v.setBackgroundColor(Color.TRANSPARENT);
                }
                return false;
            }
        });

        if (reserveIconSpace) {
            View iconView = createIconView(item);
            LinearLayout.LayoutParams iconParams = new LinearLayout.LayoutParams(dp(26), dp(22));
            iconParams.gravity = Gravity.CENTER_VERTICAL;
            row.addView(iconView, iconParams);
        }

        LinearLayout textWrap = new LinearLayout(context);
        textWrap.setOrientation(LinearLayout.VERTICAL);
        textWrap.setPadding(dp(reserveIconSpace ? 12 : 0), 0, dp(8), 0);

        TextView title = new TextView(context);
        title.setText(TextUtils.isEmpty(item.name) ? "Untitled" : item.name);
        title.setTextColor(item.destructive ? resolveDestructiveColor() : resolvePrimaryTextColor());
        title.setTextSize(TypedValue.COMPLEX_UNIT_SP, 16);
        title.setSingleLine(true);
        title.setEllipsize(TextUtils.TruncateAt.END);

        textWrap.addView(title);

        if (!TextUtils.isEmpty(item.subtitle)) {
            TextView subtitle = new TextView(context);
            subtitle.setText(item.subtitle);
            subtitle.setTextColor(resolveSecondaryTextColor());
            subtitle.setTextSize(TypedValue.COMPLEX_UNIT_SP, 13);
            subtitle.setSingleLine(true);
            subtitle.setEllipsize(TextUtils.TruncateAt.END);
            textWrap.addView(subtitle);
        }

        LinearLayout.LayoutParams textParams = new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f);
        row.addView(textWrap, textParams);

        TextView trailing = new TextView(context);
        String trailingGlyph = resolveTrailingGlyph(item);
        trailing.setText(trailingGlyph);
        trailing.setTextSize(TypedValue.COMPLEX_UNIT_SP, 18);
        trailing.setTextColor(item.destructive ? resolveDestructiveColor() : resolvePrimaryTextColor());
        trailing.setAlpha(TextUtils.isEmpty(trailingGlyph) ? 0f : 1f);
        trailing.setGravity(Gravity.CENTER_VERTICAL);
        row.addView(trailing);
        return row;
    }

    private boolean hasVisibleIcon(MenuItem item) {
        if (item == null) {
            return false;
        }
        if (resolveIconRes(item) != 0) {
            return true;
        }
        if ("font".equals(item.iconType)) {
            return !TextUtils.isEmpty(item.iconText);
        }
        return !TextUtils.isEmpty(resolveIconGlyph(item.icon));
    }

    private Placement calculatePlacement(final View anchor, int popupWidth, int popupHeight, boolean root) {
        Placement placement = new Placement();
        placement.popupWidth = popupWidth;
        placement.popupHeight = popupHeight;

        int[] location = new int[2];
        anchor.getLocationOnScreen(location);
        Rect anchorRect = new Rect(location[0], location[1], location[0] + anchor.getWidth(), location[1] + anchor.getHeight());
        placement.anchorCenterX = anchorRect.centerX();

        WindowManager wm = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
        Point size = new Point();
        if (wm != null) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                Rect bounds = wm.getCurrentWindowMetrics().getBounds();
                size.x = bounds.width();
                size.y = bounds.height();
            } else {
                wm.getDefaultDisplay().getSize(size);
            }
        }

        int margin = dp(WINDOW_MARGIN_DP);
        int x;
        int y;

        int spaceBelow = size.y - anchorRect.bottom - margin;
        int spaceAbove = anchorRect.top - margin;
        boolean openAbove = spaceBelow < popupHeight && spaceAbove > spaceBelow;
        placement.openAbove = openAbove;

        if (root) {
            x = anchorRect.centerX() - (popupWidth / 2);
            y = openAbove ? (anchorRect.top - popupHeight - dp(ROOT_VERTICAL_OFFSET_DP)) : (anchorRect.bottom + dp(ROOT_VERTICAL_OFFSET_DP));
        } else {
            x = anchorRect.right + dp(SUBMENU_HORIZONTAL_OFFSET_DP);
            placement.openRight = true;
            if (x + popupWidth > size.x - margin) {
                x = anchorRect.left - popupWidth - dp(SUBMENU_HORIZONTAL_OFFSET_DP);
                placement.openRight = false;
            }
            y = openAbove ? (anchorRect.bottom - popupHeight) : anchorRect.top;
        }

        if (x < margin) {
            x = margin;
        }
        if (x + popupWidth > size.x - margin) {
            x = Math.max(margin, size.x - popupWidth - margin);
        }

        if (y < margin) {
            y = margin;
        }
        if (y + popupHeight > size.y - margin) {
            y = Math.max(margin, size.y - popupHeight - margin);
        }

        placement.x = x;
        placement.y = y;
        float anchorY = openAbove ? anchorRect.top : anchorRect.bottom;
        placement.distance = Math.abs(anchorY - y);
        return placement;
    }

    private void animateEntrance(final View content, Placement placement, boolean root) {
        float normalized = Math.min(1f, placement.distance / dp(600));
        float overshoot = 0.22f - (normalized * 0.08f);
        float startScale = 0.86f + (normalized * 0.06f);
        float startTranslationY = root ? (placement.openAbove ? dp(12) : -dp(12)) : 0f;
        float startTranslationX = root ? 0f : (placement.openRight ? -dp(16) : dp(16));

        content.setPivotX(Math.max(dp(18), Math.min(content.getMeasuredWidth() - dp(18), placement.anchorCenterX - placement.x)));
        content.setPivotY(placement.openAbove ? content.getMeasuredHeight() : 0f);
        content.setScaleX(startScale);
        content.setScaleY(startScale);
        content.setAlpha(0f);
        content.setTranslationY(startTranslationY);
        content.setTranslationX(startTranslationX);

        content.animate()
                .alpha(1f)
                .translationY(0f)
                .translationX(0f)
                .setDuration(root ? 180 : 140)
                .setInterpolator(new OvershootInterpolator(overshoot))
                .start();

        SpringAnimation sx = new SpringAnimation(content, DynamicAnimation.SCALE_X, 1f);
        SpringAnimation sy = new SpringAnimation(content, DynamicAnimation.SCALE_Y, 1f);
        SpringForce springX = new SpringForce(1f);
        SpringForce springY = new SpringForce(1f);

        float stiffness = 450f - (normalized * 150f);
        float damping = 0.72f - (normalized * 0.08f);

        springX.setStiffness(stiffness);
        springY.setStiffness(stiffness);
        springX.setDampingRatio(damping);
        springY.setDampingRatio(damping);
        sx.setSpring(springX);
        sy.setSpring(springY);
        sx.start();
        sy.start();
    }

    private void setupDragToDismiss(final View content, final PopupWindow popup) {
        content.setOnTouchListener(new View.OnTouchListener() {
            float downY = 0f;
            float offsetY = 0f;
            VelocityTracker tracker;
            boolean dragging;

            @Override
            public boolean onTouch(View v, MotionEvent event) {
                switch (event.getActionMasked()) {
                    case MotionEvent.ACTION_DOWN:
                        downY = event.getRawY();
                        dragging = false;
                        if (tracker != null) {
                            tracker.recycle();
                        }
                        tracker = VelocityTracker.obtain();
                        tracker.addMovement(event);
                        return true;
                    case MotionEvent.ACTION_MOVE:
                        if (tracker != null) {
                            tracker.addMovement(event);
                        }
                        offsetY = event.getRawY() - downY;
                        if (Math.abs(offsetY) > dp(4)) {
                            dragging = true;
                            float damped = offsetY * 0.72f;
                            content.setTranslationY(damped);
                            float fade = Math.max(0.65f, 1f - (Math.abs(damped) / dp(180)));
                            content.setAlpha(fade);
                        }
                        return true;
                    case MotionEvent.ACTION_CANCEL:
                    case MotionEvent.ACTION_UP:
                        float velocity = 0f;
                        if (tracker != null) {
                            tracker.addMovement(event);
                            tracker.computeCurrentVelocity(1000);
                            velocity = tracker.getYVelocity();
                            tracker.recycle();
                            tracker = null;
                        }

                        boolean shouldDismiss = Math.abs(offsetY) > dp(88) || Math.abs(velocity) > 1300f;
                        if (dragging && shouldDismiss) {
                            float target = offsetY >= 0 ? dp(260) : -dp(260);
                            content.animate()
                                    .translationY(target)
                                    .alpha(0f)
                                    .setDuration(140)
                                    .setListener(new AnimatorListenerAdapter() {
                                        @Override
                                        public void onAnimationEnd(Animator animation) {
                                            popup.dismiss();
                                        }
                                    })
                                    .start();
                            return true;
                        }

                        content.animate()
                                .translationY(0f)
                                .alpha(1f)
                                .setDuration(160)
                                .setInterpolator(new OvershootInterpolator(0.35f))
                                .setListener(null)
                                .start();
                        return dragging;
                    default:
                        return false;
                }
            }
        });
    }

    private View createIconView(MenuItem item) {
        int iconColor = resolveIconColor(item);
        int drawableRes = resolveIconRes(item);

        if (drawableRes != 0) {
            ImageView image = new ImageView(context);
            image.setImageResource(drawableRes);
            image.setColorFilter(iconColor);
            image.setScaleType(ImageView.ScaleType.CENTER_INSIDE);
            return image;
        }

        TextView textIcon = new TextView(context);
        if ("font".equals(item.iconType) && !TextUtils.isEmpty(item.iconText)) {
            textIcon.setText(item.iconText);
            if (!TextUtils.isEmpty(item.iconFontFamily)) {
                Typeface typeface = Typeface.create(item.iconFontFamily, item.iconFontWeight >= 600 ? Typeface.BOLD : Typeface.NORMAL);
                if (typeface != null) {
                    textIcon.setTypeface(typeface);
                }
            }
        } else {
            textIcon.setText(resolveIconGlyph(item.icon));
        }
        textIcon.setTextSize(TypedValue.COMPLEX_UNIT_SP, 19);
        textIcon.setTextColor(iconColor);
        textIcon.setGravity(Gravity.CENTER_VERTICAL);
        return textIcon;
    }

    private int resolveIconColor(MenuItem item) {
        int base = item.destructive ? resolveDestructiveColor() : resolvePrimaryTextColor();
        if (TextUtils.isEmpty(item.iconColor)) {
            return base;
        }
        try {
            return Color.parseColor(item.iconColor);
        } catch (Exception ignore) {
            return base;
        }
    }

    private String pathToString(List<Integer> path) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < path.size(); i++) {
            if (i > 0) {
                sb.append(',');
            }
            sb.append(path.get(i));
        }
        return sb.toString();
    }

    private View resolveHostWindowAnchor(View anchor) {
        if (anchor == null) {
            return resolveActivityDecorView();
        }

        View root = anchor.getRootView();
        if (isHostWindowValid(root)) {
            return root;
        }

        if (isHostWindowValid(anchor)) {
            return anchor;
        }

        return resolveActivityDecorView();
    }

    private View resolveActivityDecorView() {
        if (context instanceof Activity) {
            Activity activity = (Activity) context;
            if (activity.getWindow() != null) {
                return activity.getWindow().getDecorView();
            }
        }
        return null;
    }

    private boolean isHostWindowValid(View view) {
        if (view == null || view.getWindowToken() == null) {
            return false;
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            return view.isAttachedToWindow();
        }
        return true;
    }

    private View resolvePopupHost(View fallbackAnchor) {
        if (isHostWindowValid(hostWindowAnchor)) {
            return hostWindowAnchor;
        }
        View fallback = resolveHostWindowAnchor(fallbackAnchor);
        if (isHostWindowValid(fallback)) {
            hostWindowAnchor = fallback;
            return fallback;
        }
        return null;
    }

    private void removePopupFromStack(PopupWindow popup) {
        for (int i = stack.size() - 1; i >= 0; i--) {
            PopupRecord record = stack.get(i);
            if (record.popup == popup) {
                stack.remove(i);
                return;
            }
        }
    }

    private void pruneStackForDepth(int depth) {
        notifyingDismiss = true;
        for (int i = stack.size() - 1; i >= 0; i--) {
            PopupRecord record = stack.get(i);
            if (record.depth >= depth) {
                if (record.popup != null && record.popup.isShowing()) {
                    record.popup.dismiss();
                }
                stack.remove(i);
            }
        }
        notifyingDismiss = false;
    }

    private void dismissAnimated() {
        if (stack.isEmpty()) {
            dismiss();
            return;
        }

        List<PopupRecord> snapshot = new ArrayList<>(stack);
        notifyingDismiss = true;
        AtomicInteger remaining = new AtomicInteger(snapshot.size());

        for (PopupRecord record : snapshot) {
            PopupWindow popup = record.popup;
            if (popup == null || !popup.isShowing()) {
                if (remaining.decrementAndGet() == 0) {
                    finalizeAnimatedDismiss();
                }
                continue;
            }

            View content = popup.getContentView();
            if (content == null) {
                popup.dismiss();
                if (remaining.decrementAndGet() == 0) {
                    finalizeAnimatedDismiss();
                }
                continue;
            }

            content.setPivotX(content.getWidth() * 0.5f);
            content.setPivotY(content.getHeight() * 0.5f);

            ObjectAnimator scaleX = ObjectAnimator.ofFloat(content, View.SCALE_X, content.getScaleX(), 0.92f);
            ObjectAnimator scaleY = ObjectAnimator.ofFloat(content, View.SCALE_Y, content.getScaleY(), 0.92f);
            ObjectAnimator alpha = ObjectAnimator.ofFloat(content, View.ALPHA, content.getAlpha(), 0f);
            ObjectAnimator translateY = ObjectAnimator.ofFloat(content, View.TRANSLATION_Y, content.getTranslationY(), content.getTranslationY() - dp(6));

            AnimatorSet closeSet = new AnimatorSet();
            closeSet.setDuration(130);
            closeSet.setInterpolator(new OvershootInterpolator(0.15f));
            closeSet.playTogether(scaleX, scaleY, alpha, translateY);
            closeSet.addListener(new AnimatorListenerAdapter() {
                @Override
                public void onAnimationEnd(Animator animation) {
                    popup.dismiss();
                    if (remaining.decrementAndGet() == 0) {
                        finalizeAnimatedDismiss();
                    }
                }

                @Override
                public void onAnimationCancel(Animator animation) {
                    popup.dismiss();
                    if (remaining.decrementAndGet() == 0) {
                        finalizeAnimatedDismiss();
                    }
                }
            });
            closeSet.start();
        }
    }

    private boolean isOutsideContentBounds(MotionEvent event, View content) {
        if (content == null) {
            return false;
        }

        float x = event.getX();
        float y = event.getY();
        int slop = ViewConfiguration.get(context).getScaledTouchSlop();

        return x < -slop || y < -slop || x > (content.getWidth() + slop) || y > (content.getHeight() + slop);
    }

    private void finalizeAnimatedDismiss() {
        stack.clear();
        notifyingDismiss = false;
        if (listener != null) {
            listener.onDismiss();
        }
    }

    private int dp(int value) {
        return (int) TypedValue.applyDimension(
                TypedValue.COMPLEX_UNIT_DIP,
                value,
                context.getResources().getDisplayMetrics()
        );
    }

    private int resolveGlassBackgroundColor(boolean submenu) {
        int alphaBoost = submenu ? 36 : 0;
        int baseAlpha;
        if (androidBackgroundOpacity != null) {
            baseAlpha = Math.round(255f * androidBackgroundOpacity);
        } else {
            baseAlpha = isDarkTheme() ? 179 : 191;
        }
        int alpha = Math.min(255, Math.max(0, baseAlpha + alphaBoost));

        if (isDarkTheme()) {
            return Color.argb(alpha, 28, 28, 30);
        }
        return Color.argb(alpha, 255, 255, 255);
    }

    private Float clampOpacity(double value) {
        if (Double.isNaN(value)) {
            return null;
        }
        float floatValue = (float) value;
        return Math.max(0f, Math.min(1f, floatValue));
    }

    private int resolveGlassStrokeColor() {
        return isDarkTheme() ? Color.argb(76, 255, 255, 255) : Color.argb(54, 255, 255, 255);
    }

    private int resolvePrimaryTextColor() {
        return isDarkTheme() ? Color.argb(240, 255, 255, 255) : Color.argb(235, 17, 24, 39);
    }

    private int resolveSecondaryTextColor() {
        return isDarkTheme() ? Color.argb(185, 255, 255, 255) : Color.argb(178, 55, 65, 81);
    }

    private int resolveDividerColor() {
        return isDarkTheme() ? Color.argb(40, 255, 255, 255) : Color.argb(20, 15, 23, 42);
    }

    private int resolveRowPressedColor() {
        return isDarkTheme() ? Color.argb(20, 255, 255, 255) : Color.argb(16, 15, 23, 42);
    }

    private int resolveDestructiveColor() {
        return Color.argb(245, 220, 38, 38);
    }

    private int resolveCardAmbientShadowColor() {
        return isDarkTheme() ? Color.argb(84, 0, 0, 0) : Color.argb(46, 0, 0, 0);
    }

    private int resolveCardSpotShadowColor() {
        return isDarkTheme() ? Color.argb(70, 0, 0, 0) : Color.argb(36, 0, 0, 0);
    }

    private int resolveCardSoftShadowColor() {
        return isDarkTheme() ? Color.argb(46, 0, 0, 0) : Color.argb(30, 15, 23, 42);
    }

    private int resolveCardSoftFillColor() {
        return isDarkTheme() ? Color.argb(8, 0, 0, 0) : Color.argb(6, 15, 23, 42);
    }

    private boolean isDarkTheme() {
        int nightModeFlags = context.getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK;
        return nightModeFlags == Configuration.UI_MODE_NIGHT_YES;
    }

    private int resolveIconRes(MenuItem item) {
        String icon = item.icon;
        if (TextUtils.isEmpty(icon)) {
            if (!TextUtils.isEmpty(item.iconSrc)) {
                icon = item.iconSrc;
            } else {
                return 0;
            }
        }

        if ("src".equals(item.iconType)) {
            String src = !TextUtils.isEmpty(item.iconSrc) ? item.iconSrc : icon;
            if (src.startsWith("res://")) {
                src = src.replace("res://", "");
            }
            int appRes = context.getResources().getIdentifier(src, "drawable", context.getPackageName());
            if (appRes != 0) {
                return appRes;
            }
            int mipmapRes = context.getResources().getIdentifier(src, "mipmap", context.getPackageName());
            if (mipmapRes != 0) {
                return mipmapRes;
            }
        }

        int appRes = context.getResources().getIdentifier(icon, "drawable", context.getPackageName());
        if (appRes != 0) {
            return appRes;
        }

        if (icon.contains(".")) {
            String sanitized = icon.replace('.', '_').replace('-', '_');
            int sanitizedRes = context.getResources().getIdentifier(sanitized, "drawable", context.getPackageName());
            if (sanitizedRes != 0) {
                return sanitizedRes;
            }
        }

        switch (icon) {
            case "folder.badge.plus":
            case "plus.rectangle.on.folder":
                return android.R.drawable.ic_menu_add;
            case "square.2.layers.3d":
            case "layers":
                return android.R.drawable.ic_menu_sort_by_size;
            case "circle.dotted":
                return android.R.drawable.presence_invisible;
            case "ellipsis":
            case "ellipsis.circle":
                return android.R.drawable.ic_menu_more;
            case "checkmark":
                return android.R.drawable.checkbox_on_background;
            case "xmark":
                return android.R.drawable.ic_menu_close_clear_cancel;
            case "trash":
            case "delete":
                return android.R.drawable.ic_menu_delete;
            case "doc":
            case "document":
                return android.R.drawable.ic_menu_save;
            case "paperclip":
                return android.R.drawable.ic_menu_upload;
            case "gear":
            case "settings":
                return android.R.drawable.ic_menu_manage;
            case "magnifyingglass":
            case "search":
                return android.R.drawable.ic_menu_search;
            case "photo":
            case "image":
                return android.R.drawable.ic_menu_gallery;
            case "camera":
                return android.R.drawable.ic_menu_camera;
            case "folder":
                return android.R.drawable.ic_menu_agenda;
            case "cloud":
                return android.R.drawable.stat_notify_sync;
            case "person":
            case "profile":
                return android.R.drawable.ic_menu_myplaces;
            case "lock":
                return android.R.drawable.ic_lock_lock;
            case "square.and.arrow.up":
            case "share":
                return android.R.drawable.ic_menu_share;
            case "star":
                return android.R.drawable.btn_star;
            case "heart":
                return android.R.drawable.btn_star_big_off;
            case "phone":
                return android.R.drawable.ic_menu_call;
            case "video":
                return android.R.drawable.ic_menu_slideshow;
            default:
                break;
        }

        if (TextUtils.isEmpty(icon)) {
            return 0;
        }

        switch (icon) {
            case "camera":
                return android.R.drawable.ic_menu_camera;
            case "photo":
            case "image":
                return android.R.drawable.ic_menu_gallery;
            case "folder":
                return android.R.drawable.ic_menu_agenda;
            case "cloud":
                return android.R.drawable.stat_notify_sync;
            case "square.and.pencil":
            case "edit":
                return android.R.drawable.ic_menu_edit;
            case "plus":
            case "add":
                return android.R.drawable.ic_input_add;
            default:
                return 0;
        }
    }

    private String resolveTrailingGlyph(MenuItem item) {
        if (!item.children.isEmpty()) {
            return "›";
        }
        if ("on".equals(item.state)) {
            return "✓";
        }
        if ("mixed".equals(item.state)) {
            return "−";
        }
        return "";
    }

    private String resolveIconGlyph(String icon) {
        if (TextUtils.isEmpty(icon)) {
            return "";
        }

        switch (icon) {
            case "plus":
            case "add":
                return "+";
            case "camera":
                return "◉";
            case "photo":
            case "image":
                return "▦";
            case "folder":
                return "▤";
            case "cloud":
                return "☁";
            case "square.and.pencil":
            case "edit":
                return "✎";
            case "square.2.layers.3d":
            case "layers":
                return "◫";
            case "circle.dotted":
                return "◌";
            default:
                if (icon.length() == 1) {
                    return icon;
                }
                return "•";
        }
    }

    private static class SoftShadowLayout extends FrameLayout {
        private final android.graphics.Paint shadowPaint = new android.graphics.Paint(android.graphics.Paint.ANTI_ALIAS_FLAG);
        private final RectF rect = new RectF();
        private float cornerRadius;
        private float shadowRadius;
        private float shadowDx;
        private float shadowDy;

        SoftShadowLayout(Context context) {
            super(context);
            setWillNotDraw(false);
            setLayerType(LAYER_TYPE_SOFTWARE, null);
            shadowPaint.setStyle(android.graphics.Paint.Style.FILL);
        }

        void setCornerRadius(float cornerRadius) {
            this.cornerRadius = cornerRadius;
            invalidate();
        }

        void setShadow(float radius, float dx, float dy, int shadowColor, int fillColor) {
            this.shadowRadius = radius;
            this.shadowDx = dx;
            this.shadowDy = dy;
            shadowPaint.setColor(fillColor);
            shadowPaint.setShadowLayer(radius, dx, dy, shadowColor);
            invalidate();
        }

        @Override
        protected void dispatchDraw(android.graphics.Canvas canvas) {
            View child = getChildCount() > 0 ? getChildAt(0) : null;
            if (child != null && child.getVisibility() == VISIBLE) {
                rect.set(child.getLeft(), child.getTop(), child.getRight(), child.getBottom());
                if (shadowRadius > 0f) {
                    canvas.drawRoundRect(rect, cornerRadius, cornerRadius, shadowPaint);
                }
            }
            super.dispatchDraw(canvas);
        }
    }

}
