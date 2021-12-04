package io.github.nstudio.ui;

import android.animation.ValueAnimator;
import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Color;
import android.graphics.RectF;
import android.util.AttributeSet;


import androidx.annotation.ColorInt;
import androidx.annotation.FloatRange;


public class Shimmer {

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
        LEFT_TO_RIGHT(0),
        TOP_TO_BOTTOM(1),
        RIGHT_TO_LEFT(2),
        BOTTOM_TO_TOP(3);

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

    Shimmer() {
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
        final Shimmer mShimmer = new Shimmer();

        // Gets around unchecked cast
        protected abstract T getThis();


        /**
         * Copies the configuration of an already built Shimmer to this builder
         */
        public T copyFrom(Shimmer other) {
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

        public Shimmer build() {
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