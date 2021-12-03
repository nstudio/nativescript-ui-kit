package io.github.nstudio.ui;

import android.annotation.TargetApi;
import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.util.AttributeSet;
import android.view.View;
import android.widget.FrameLayout;

import androidx.annotation.ColorInt;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

public class ShimmerView extends FrameLayout {
    private final Paint mContentPaint = new Paint();
    private final ShimmerDrawable mShimmerDrawable = new ShimmerDrawable();

    private boolean mShowShimmer = true;
    private boolean mStoppedShimmerBecauseVisibility = false;

    public ShimmerView(Context context) {
        super(context);
        init(context, null);
    }

    public ShimmerView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context, attrs);
    }

    public ShimmerView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context, attrs);
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public ShimmerView(
            Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        init(context, attrs);
    }

    private void init(Context context, @Nullable AttributeSet attrs) {
        setWillNotDraw(false);
        mShimmerDrawable.setCallback(this);

        if (attrs == null) {
            setShimmer(new Shimmer.AlphaHighlightBuilder().build());
            return;
        }
    }

    public ShimmerView setShimmer(@Nullable Shimmer shimmer) {
        mShimmerDrawable.setShimmer(shimmer);
        if (shimmer != null && shimmer.clipToChildren) {
            setLayerType(LAYER_TYPE_HARDWARE, mContentPaint);
        } else {
            setLayerType(LAYER_TYPE_NONE, null);
        }

        return this;
    }

    public @Nullable
    Shimmer getShimmer() {
        return mShimmerDrawable.getShimmer();
    }


   private long mSpeed = 1100;
    public void setSpeed(long speed){
        if(speed > 0){
            mSpeed = speed;
        }

        if(getShimmer() != null){
            Shimmer.Builder builder = new Shimmer.AlphaHighlightBuilder();
            builder.copyFrom(getShimmer());
            builder.setDuration(speed);
            setShimmer(builder.build());
        }
    }

    public void setLightColor(@ColorInt int color) {
        if (getShimmer() != null) {
            Shimmer.Builder builder = new Shimmer.AlphaHighlightBuilder();
            builder.copyFrom(getShimmer());
            builder.setHighLightColor(color);
            setShimmer(builder.build());
        }
    }


    public void setDarkColor(@ColorInt int color) {
        if (getShimmer() != null) {
            Shimmer.Builder builder = new Shimmer.AlphaHighlightBuilder();
            builder.copyFrom(getShimmer());
            builder.setBaseColor(color);
            setShimmer(builder.build());
        }
    }

    public void start(long speed, int direction, int repeatCount, @ColorInt int lightColor, @ColorInt int blackColor) {
        if (getShimmer() != null) {
            Shimmer.Builder builder = new Shimmer.AlphaHighlightBuilder();
            builder.copyFrom(getShimmer());
            builder.setDuration(speed);

            switch (direction) {
                case 0:
                    builder.setDirection(Shimmer.Direction.LEFT_TO_RIGHT);
                    break;
                case 1:
                    builder.setDirection(Shimmer.Direction.TOP_TO_BOTTOM);
                    break;
                case 2:
                    builder.setDirection(Shimmer.Direction.RIGHT_TO_LEFT);
                    break;
                case 3:
                    builder.setDirection(Shimmer.Direction.BOTTOM_TO_TOP);
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
        if (visibility != ShimmerView.VISIBLE) {
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