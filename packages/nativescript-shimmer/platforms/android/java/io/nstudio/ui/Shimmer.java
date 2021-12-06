package io.nstudio.ui;

import android.animation.ValueAnimator;
import android.annotation.TargetApi;
import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.ColorFilter;
import android.graphics.LinearGradient;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.PixelFormat;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.graphics.RadialGradient;
import android.graphics.Rect;
import android.graphics.RectF;
import android.graphics.Shader;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.view.animation.LinearInterpolator;
import android.view.View;
import android.util.AttributeSet;
import android.widget.FrameLayout;

import androidx.annotation.ColorInt;
import androidx.annotation.FloatRange;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

class ShimmerBuilder {

    private static final int COMPONENT_COUNT = 4;

    /**
     * The shape of the shimmer's highlight. By default LINEAR is used.
     */
    public enum Shape {
        /**
         * Linear gives a ray reflection effect.
         */
        LINEAR(0),
        /**
         * Radial gives a spotlight effect.
         */
        RADIAL(1);
        private final int value;

        Shape(int value) {
            this.value = value;
        }
    }

    /**
     * Direction of the shimmer's sweep.
     */
    public enum Direction {
        TOP_TO_BOTTOM(0),
        BOTTOM_TO_TOP(1),
        LEFT_TO_RIGHT(2),
        RIGHT_TO_LEFT(3);

        private final int value;

        Direction(int value) {
            this.value = value;
        }
    }

    final float[] positions = new float[COMPONENT_COUNT];
    final int[] colors = new int[COMPONENT_COUNT];
    final RectF bounds = new RectF();

    Direction direction = Direction.LEFT_TO_RIGHT;
    @ColorInt
    int highlightColor = Color.WHITE;
    @ColorInt
    int baseColor = 0x4cffffff;
    Shape shape = Shape.LINEAR;
    int fixedWidth = 0;
    int fixedHeight = 0;

    float widthRatio = 1f;
    float heightRatio = 1f;
    float intensity = 0f;
    float dropoff = 0.5f;
    float tilt = 20f;

    boolean clipToChildren = true;
    boolean autoStart = false;
    boolean alphaShimmer = true;

    int repeatCount = ValueAnimator.INFINITE;
    int repeatMode = ValueAnimator.RESTART;
    long animationDuration = 1100L;
    long repeatDelay;
    long startDelay;

    ShimmerBuilder() {
    }

    int width(int width) {
        return fixedWidth > 0 ? fixedWidth : Math.round(widthRatio * width);
    }

    int height(int height) {
        return fixedHeight > 0 ? fixedHeight : Math.round(heightRatio * height);
    }

    void updateColors() {
        switch (shape) {
            default:
            case LINEAR:
                colors[0] = baseColor;
                colors[1] = highlightColor;
                colors[2] = highlightColor;
                colors[3] = baseColor;
                break;
            case RADIAL:
                colors[0] = highlightColor;
                colors[1] = highlightColor;
                colors[2] = baseColor;
                colors[3] = baseColor;
                break;
        }
    }

    void updatePositions() {
        switch (shape) {
            default:
            case LINEAR:
                positions[0] = Math.max((1f - intensity - dropoff) / 2f, 0f);
                positions[1] = Math.max((1f - intensity - 0.001f) / 2f, 0f);
                positions[2] = Math.min((1f + intensity + 0.001f) / 2f, 1f);
                positions[3] = Math.min((1f + intensity + dropoff) / 2f, 1f);
                break;
            case RADIAL:
                positions[0] = 0f;
                positions[1] = Math.min(intensity, 1f);
                positions[2] = Math.min(intensity + dropoff, 1f);
                positions[3] = 1f;
                break;
        }
    }

    void updateBounds(int viewWidth, int viewHeight) {
        int magnitude = Math.max(viewWidth, viewHeight);
        double rad = Math.PI / 2f - Math.toRadians(tilt % 90f);
        double hyp = magnitude / Math.sin(rad);
        int padding = 3 * Math.round((float) (hyp - magnitude) / 2f);
        bounds.set(-padding, -padding, width(viewWidth) + padding, height(viewHeight) + padding);
    }

    public abstract static class Builder<T extends Builder<T>> {
        final ShimmerBuilder mShimmer = new ShimmerBuilder();

        // Gets around unchecked cast
        protected abstract T getThis();


        /**
         * Copies the configuration of an already built ShimmerBuilder to this builder
         */
        public T copyFrom(ShimmerBuilder other) {
            setDirection(other.direction);
            setShape(other.shape);
            setFixedWidth(other.fixedWidth);
            setFixedHeight(other.fixedHeight);
            setWidthRatio(other.widthRatio);
            setHeightRatio(other.heightRatio);
            setIntensity(other.intensity);
            setDropoff(other.dropoff);
            setTilt(other.tilt);
            setClipToChildren(other.clipToChildren);
            setAutoStart(other.autoStart);
            setRepeatCount(other.repeatCount);
            setRepeatMode(other.repeatMode);
            setRepeatDelay(other.repeatDelay);
            setStartDelay(other.startDelay);
            setDuration(other.animationDuration);
            setBaseColor(other.baseColor);
            setHighLightColor(other.highlightColor);
            return getThis();
        }


        public T setBaseColor(@ColorInt int color) {
            mShimmer.baseColor = color;
            return getThis();
        }


        public T setHighLightColor(@ColorInt int color) {
            mShimmer.highlightColor = color;
            return getThis();
        }

        /**
         * Sets the direction of the shimmer's sweep. See {@link Direction}.
         */
        public T setDirection(Direction direction) {
            mShimmer.direction = direction;
            return getThis();
        }

        /**
         * Sets the shape of the shimmer. See {@link Shape}.
         */
        public T setShape(Shape shape) {
            mShimmer.shape = shape;
            return getThis();
        }

        /**
         * Sets the fixed width of the shimmer, in pixels.
         */
        public T setFixedWidth(int fixedWidth) {
            if (fixedWidth < 0) {
                throw new IllegalArgumentException("Given invalid width: " + fixedWidth);
            }
            mShimmer.fixedWidth = fixedWidth;
            return getThis();
        }

        /**
         * Sets the fixed height of the shimmer, in pixels.
         */
        public T setFixedHeight(int fixedHeight) {
            if (fixedHeight < 0) {
                throw new IllegalArgumentException("Given invalid height: " + fixedHeight);
            }
            mShimmer.fixedHeight = fixedHeight;
            return getThis();
        }

        /**
         * Sets the width ratio of the shimmer, multiplied against the total width of the layout.
         */
        public T setWidthRatio(float widthRatio) {
            if (widthRatio < 0f) {
                throw new IllegalArgumentException("Given invalid width ratio: " + widthRatio);
            }
            mShimmer.widthRatio = widthRatio;
            return getThis();
        }

        /**
         * Sets the height ratio of the shimmer, multiplied against the total height of the layout.
         */
        public T setHeightRatio(float heightRatio) {
            if (heightRatio < 0f) {
                throw new IllegalArgumentException("Given invalid height ratio: " + heightRatio);
            }
            mShimmer.heightRatio = heightRatio;
            return getThis();
        }

        /**
         * Sets the intensity of the shimmer. A larger value causes the shimmer to be larger.
         */
        public T setIntensity(float intensity) {
            if (intensity < 0f) {
                throw new IllegalArgumentException("Given invalid intensity value: " + intensity);
            }
            mShimmer.intensity = intensity;
            return getThis();
        }

        /**
         * Sets how quickly the shimmer's gradient drops-off. A larger value causes a sharper drop-off.
         */
        public T setDropoff(float dropoff) {
            if (dropoff < 0f) {
                throw new IllegalArgumentException("Given invalid dropoff value: " + dropoff);
            }
            mShimmer.dropoff = dropoff;
            return getThis();
        }

        /**
         * Sets the tilt angle of the shimmer in degrees.
         */
        public T setTilt(float tilt) {
            mShimmer.tilt = tilt;
            return getThis();
        }

        /**
         * Sets the base alpha, which is the alpha of the underlying children, amount in the range [0,
         * 1].
         */
        public T setBaseAlpha(@FloatRange(from = 0, to = 1) float alpha) {
            int intAlpha = (int) (clamp(0f, 1f, alpha) * 255f);
            mShimmer.baseColor = intAlpha << 24 | (mShimmer.baseColor & 0x00FFFFFF);
            return getThis();
        }

        /**
         * Sets the shimmer alpha amount in the range [0, 1].
         */
        public T setHighlightAlpha(@FloatRange(from = 0, to = 1) float alpha) {
            int intAlpha = (int) (clamp(0f, 1f, alpha) * 255f);
            mShimmer.highlightColor = intAlpha << 24 | (mShimmer.highlightColor & 0x00FFFFFF);
            return getThis();
        }

        /**
         * Sets whether the shimmer will clip to the childrens' contents, or if it will opaquely draw on
         * top of the children.
         */
        public T setClipToChildren(boolean status) {
            mShimmer.clipToChildren = status;
            return getThis();
        }

        /**
         * Sets whether the shimmering animation will start automatically.
         */
        public T setAutoStart(boolean status) {
            mShimmer.autoStart = status;
            return getThis();
        }

        /**
         * Sets how often the shimmering animation will repeat. See {@link
         * android.animation.ValueAnimator#setRepeatCount(int)}.
         */
        public T setRepeatCount(int repeatCount) {
            mShimmer.repeatCount = repeatCount;
            return getThis();
        }

        /**
         * Sets how the shimmering animation will repeat. See {@link
         * android.animation.ValueAnimator#setRepeatMode(int)}.
         */
        public T setRepeatMode(int mode) {
            mShimmer.repeatMode = mode;
            return getThis();
        }

        /**
         * Sets how long to wait in between repeats of the shimmering animation.
         */
        public T setRepeatDelay(long millis) {
            if (millis < 0) {
                throw new IllegalArgumentException("Given a negative repeat delay: " + millis);
            }
            mShimmer.repeatDelay = millis;
            return getThis();
        }

        /**
         * Sets how long to wait for starting the shimmering animation.
         */
        public T setStartDelay(long millis) {
            if (millis < 0) {
                throw new IllegalArgumentException("Given a negative start delay: " + millis);
            }
            mShimmer.startDelay = millis;
            return getThis();
        }

        /**
         * Sets how long the shimmering animation takes to do one full sweep.
         */
        public T setDuration(long millis) {
            if (millis < 0) {
                throw new IllegalArgumentException("Given a negative duration: " + millis);
            }
            mShimmer.animationDuration = millis;
            return getThis();
        }

        public ShimmerBuilder build() {
            mShimmer.updateColors();
            mShimmer.updatePositions();
            return mShimmer;
        }

        private static float clamp(float min, float max, float value) {
            return Math.min(max, Math.max(min, value));
        }
    }

    public static class AlphaHighlightBuilder extends Builder<AlphaHighlightBuilder> {
        public AlphaHighlightBuilder() {
            mShimmer.alphaShimmer = true;
        }

        @Override
        protected AlphaHighlightBuilder getThis() {
            return this;
        }
    }

    public static class ColorHighlightBuilder extends Builder<ColorHighlightBuilder> {
        public ColorHighlightBuilder() {
            mShimmer.alphaShimmer = false;
        }

        /**
         * Sets the highlight color for the shimmer.
         */
        public ColorHighlightBuilder setHighlightColor(@ColorInt int color) {
            mShimmer.highlightColor = color;
            return getThis();
        }

        /**
         * Sets the base color for the shimmer.
         */
        public ColorHighlightBuilder setBaseColor(@ColorInt int color) {
            mShimmer.baseColor = (mShimmer.baseColor & 0xFF000000) | (color & 0x00FFFFFF);
            return getThis();
        }

        @Override
        protected ColorHighlightBuilder getThis() {
            return this;
        }
    }
}

class ShimmerDrawable extends Drawable {
     private final ValueAnimator.AnimatorUpdateListener mUpdateListener =
      new ValueAnimator.AnimatorUpdateListener() {
        @Override
        public void onAnimationUpdate(ValueAnimator animation) {
          invalidateSelf();
        }
      };


    private final Paint mShimmerPaint = new Paint();
    private final Rect mDrawRect = new Rect();
    private final Matrix mShaderMatrix = new Matrix();

    private @Nullable
    ValueAnimator mValueAnimator;

    private @Nullable
    ShimmerBuilder mShimmer;

    public ShimmerDrawable() {
        mShimmerPaint.setAntiAlias(true);
    }

    public void setShimmer(@Nullable ShimmerBuilder shimmer) {
        mShimmer = shimmer;
        if (mShimmer != null) {
            mShimmerPaint.setXfermode(
                    new PorterDuffXfermode(
                            mShimmer.alphaShimmer ? PorterDuff.Mode.DST_IN : PorterDuff.Mode.SRC_IN));
        }
        updateShader();
        updateValueAnimator();
        invalidateSelf();
    }

    public @Nullable
    ShimmerBuilder getShimmer() {
        return mShimmer;
    }

    /**
     * Starts the shimmer animation.
     */
    public void startShimmer() {
        if (mValueAnimator != null && !isShimmerStarted() && getCallback() != null) {
            mValueAnimator.start();
        }
    }

    /**
     * Stops the shimmer animation.
     */
    public void stopShimmer() {
        if (mValueAnimator != null && isShimmerStarted()) {
            mValueAnimator.cancel();
        }
    }

    /**
     * Return whether the shimmer animation has been started.
     */
    public boolean isShimmerStarted() {
        return mValueAnimator != null && mValueAnimator.isStarted();
    }

    @Override
    public void onBoundsChange(Rect bounds) {
        super.onBoundsChange(bounds);
        mDrawRect.set(bounds);
        updateShader();
        maybeStartShimmer();
    }

    @Override
    public void draw(@NonNull Canvas canvas) {
        if (mShimmer == null || mShimmerPaint.getShader() == null) {
            return;
        }

        final float tiltTan = (float) Math.tan(Math.toRadians(mShimmer.tilt));
        final float translateHeight = mDrawRect.height() + tiltTan * mDrawRect.width();
        final float translateWidth = mDrawRect.width() + tiltTan * mDrawRect.height();
        final float dx;
        final float dy;
        final float animatedValue =
                mValueAnimator != null ? (float) mValueAnimator.getAnimatedValue() : 0f;
        switch (mShimmer.direction) {
            default:
            case LEFT_TO_RIGHT:
                dx = offset(-translateWidth, translateWidth, animatedValue);
                dy = 0;
                break;
            case RIGHT_TO_LEFT:
                dx = offset(translateWidth, -translateWidth, animatedValue);
                dy = 0f;
                break;
            case TOP_TO_BOTTOM:
                dx = 0f;
                dy = offset(-translateHeight, translateHeight, animatedValue);
                break;
            case BOTTOM_TO_TOP:
                dx = 0f;
                dy = offset(translateHeight, -translateHeight, animatedValue);
                break;
        }

        mShaderMatrix.reset();
        mShaderMatrix.setRotate(mShimmer.tilt, mDrawRect.width() / 2f, mDrawRect.height() / 2f);
        mShaderMatrix.postTranslate(dx, dy);
        mShimmerPaint.getShader().setLocalMatrix(mShaderMatrix);
        canvas.drawRect(mDrawRect, mShimmerPaint);
    }

    @Override
    public void setAlpha(int alpha) {
        // No-op, modify the ShimmerBuilder object you pass in instead
    }

    @Override
    public void setColorFilter(@Nullable ColorFilter colorFilter) {
        // No-op, modify the ShimmerBuilder object you pass in instead
    }

    @Override
    public int getOpacity() {
        return mShimmer != null && (mShimmer.clipToChildren || mShimmer.alphaShimmer)
                ? PixelFormat.TRANSLUCENT
                : PixelFormat.OPAQUE;
    }

    private float offset(float start, float end, float percent) {
        return start + (end - start) * percent;
    }

    private void updateValueAnimator() {
        if (mShimmer == null) {
            return;
        }

        final boolean started;
        if (mValueAnimator != null) {
            started = mValueAnimator.isStarted();
            mValueAnimator.cancel();
            mValueAnimator.removeAllUpdateListeners();
        } else {
            started = false;
        }

        mValueAnimator =
                ValueAnimator.ofFloat(0f, 1f + (float) (mShimmer.repeatDelay / mShimmer.animationDuration));
        mValueAnimator.setInterpolator(new LinearInterpolator());
        mValueAnimator.setRepeatMode(mShimmer.repeatMode);
        mValueAnimator.setStartDelay(mShimmer.startDelay);
        mValueAnimator.setRepeatCount(mShimmer.repeatCount);
        mValueAnimator.setDuration(mShimmer.animationDuration + mShimmer.repeatDelay);
        mValueAnimator.addUpdateListener(mUpdateListener);
        if (started) {
            mValueAnimator.start();
        }
    }

    void maybeStartShimmer() {
        if (mValueAnimator != null
                && !mValueAnimator.isStarted()
                && mShimmer != null
                && mShimmer.autoStart
                && getCallback() != null) {
            mValueAnimator.start();
        }
    }

    private void updateShader() {
        final Rect bounds = getBounds();
        final int boundsWidth = bounds.width();
        final int boundsHeight = bounds.height();
        if (boundsWidth == 0 || boundsHeight == 0 || mShimmer == null) {
            return;
        }
        final int width = mShimmer.width(boundsWidth);
        final int height = mShimmer.height(boundsHeight);

        final Shader shader;
        switch (mShimmer.shape) {
            default:
            case LINEAR:
                boolean vertical =
                        mShimmer.direction == ShimmerBuilder.Direction.TOP_TO_BOTTOM
                                || mShimmer.direction == ShimmerBuilder.Direction.BOTTOM_TO_TOP;
                int endX = vertical ? 0 : width;
                int endY = vertical ? height : 0;
                shader =
                        new LinearGradient(
                                0, 0, endX, endY, mShimmer.colors, mShimmer.positions, Shader.TileMode.CLAMP);
                break;
            case RADIAL:
                shader =
                        new RadialGradient(
                                width / 2f,
                                height / 2f,
                                (float) (Math.max(width, height) / Math.sqrt(2)),
                                mShimmer.colors,
                                mShimmer.positions,
                                Shader.TileMode.CLAMP);
                break;
        }

        mShimmerPaint.setShader(shader);
    }
}

public class Shimmer extends FrameLayout {
    private final Paint mContentPaint = new Paint();
    private final ShimmerDrawable mShimmerDrawable = new ShimmerDrawable();

    private boolean mShowShimmer = true;
    private boolean mStoppedShimmerBecauseVisibility = false;

    public Shimmer(Context context) {
        super(context);
        init(context, null);
    }

    public Shimmer(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context, attrs);
    }

    public Shimmer(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context, attrs);
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public Shimmer(
            Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        init(context, attrs);
    }

    private void init(Context context, @Nullable AttributeSet attrs) {
        setWillNotDraw(false);
        mShimmerDrawable.setCallback(this);

        if (attrs == null) {
            setShimmer(new ShimmerBuilder.AlphaHighlightBuilder().build());
            return;
        }
    }

    public Shimmer setShimmer(@Nullable ShimmerBuilder shimmer) {
        mShimmerDrawable.setShimmer(shimmer);
        if (shimmer != null && shimmer.clipToChildren) {
            setLayerType(LAYER_TYPE_HARDWARE, mContentPaint);
        } else {
            setLayerType(LAYER_TYPE_NONE, null);
        }

        return this;
    }

    public @Nullable
    ShimmerBuilder getShimmer() {
        return mShimmerDrawable.getShimmer();
    }


   private long mSpeed = 1100;
    public void setSpeed(long speed){
        if(speed > 0){
            mSpeed = speed;
        }

        if(getShimmer() != null){
            ShimmerBuilder.Builder builder = new ShimmerBuilder.AlphaHighlightBuilder();
            builder.copyFrom(getShimmer());
            builder.setDuration(speed);
            setShimmer(builder.build());
        }
    }

    public void setLightColor(@ColorInt int color) {
        if (getShimmer() != null) {
            ShimmerBuilder.Builder builder = new ShimmerBuilder.AlphaHighlightBuilder();
            builder.copyFrom(getShimmer());
            builder.setHighLightColor(color);
            setShimmer(builder.build());
        }
    }


    public void setDarkColor(@ColorInt int color) {
        if (getShimmer() != null) {
            ShimmerBuilder.Builder builder = new ShimmerBuilder.AlphaHighlightBuilder();
            builder.copyFrom(getShimmer());
            builder.setBaseColor(color);
            setShimmer(builder.build());
        }
    }

    public void start(long speed, int direction, int repeatCount, @ColorInt int lightColor, @ColorInt int blackColor) {
        if (getShimmer() != null) {
            ShimmerBuilder.Builder builder = new ShimmerBuilder.AlphaHighlightBuilder();
            builder.copyFrom(getShimmer());
            builder.setDuration(speed);

            switch (direction) {
                case 0:
                    builder.setDirection(ShimmerBuilder.Direction.TOP_TO_BOTTOM);
                    break;
                case 1:
                    builder.setDirection(ShimmerBuilder.Direction.BOTTOM_TO_TOP);
                    break;
                case 2:
                    builder.setDirection(ShimmerBuilder.Direction.LEFT_TO_RIGHT);
                    break;
                case 3:
                    builder.setDirection(ShimmerBuilder.Direction.RIGHT_TO_LEFT);
                    break;
                default:
                    break;
            }

            builder.setRepeatCount(repeatCount);
            builder.setHighLightColor(lightColor);
            builder.setBaseColor(blackColor);
            setShimmer(builder.build());
        }

        showShimmer(true);
    }


    /**
     * Starts the shimmer animation.
     */
    public void startShimmer() {
        mShimmerDrawable.startShimmer();
    }

    /**
     * Stops the shimmer animation.
     */
    public void stopShimmer() {
        mStoppedShimmerBecauseVisibility = false;
        mShimmerDrawable.stopShimmer();
    }

    /**
     * Return whether the shimmer animation has been started.
     */
    public boolean isShimmerStarted() {
        return mShimmerDrawable.isShimmerStarted();
    }

    /**
     * Sets the ShimmerDrawable to be visible.
     *
     * @param startShimmer Whether to start the shimmer again.
     */
    public void showShimmer(boolean startShimmer) {
        mShowShimmer = true;
        if (startShimmer) {
            startShimmer();
        }
        invalidate();
    }

    /**
     * Sets the ShimmerDrawable to be invisible, stopping it in the process.
     */
    public void hideShimmer() {
        stopShimmer();
        mShowShimmer = false;
        invalidate();
    }

    /**
     * Return whether the shimmer drawable is visible.
     */
    public boolean isShimmerVisible() {
        return mShowShimmer;
    }

    @Override
    public void onLayout(boolean changed, int left, int top, int right, int bottom) {
        super.onLayout(changed, left, top, right, bottom);
        final int width = getWidth();
        final int height = getHeight();
        mShimmerDrawable.setBounds(0, 0, width, height);
    }


    @Override
    protected void onVisibilityChanged(@NonNull View changedView, int visibility) {
        super.onVisibilityChanged(changedView, visibility);

        // View's constructor directly invokes this method, in which case no fields on
        // this class have been fully initialized yet.
        if (mShimmerDrawable == null) {
            return;
        }
        if (visibility != Shimmer.VISIBLE) {
            // GONE or INVISIBLE
            if (isShimmerStarted()) {
                stopShimmer();
                mStoppedShimmerBecauseVisibility = true;
            }
        } else if (mStoppedShimmerBecauseVisibility) {
            mShimmerDrawable.maybeStartShimmer();
            mStoppedShimmerBecauseVisibility = false;
        }
    }

    @Override
    public void onAttachedToWindow() {
        super.onAttachedToWindow();
        mShimmerDrawable.maybeStartShimmer();
    }

    @Override
    public void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        stopShimmer();
    }

    @Override
    public void dispatchDraw(Canvas canvas) {
        super.dispatchDraw(canvas);
        if (mShowShimmer) {
            mShimmerDrawable.draw(canvas);
        }
    }

    @Override
    protected boolean verifyDrawable(@NonNull Drawable who) {
        return super.verifyDrawable(who) || who == mShimmerDrawable;
    }

}