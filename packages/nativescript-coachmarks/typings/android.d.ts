declare module com {
  export module takusemba {
    export module spotlight {
      export class OnSpotlightListener {
        public static class: java.lang.Class<com.takusemba.spotlight.OnSpotlightListener>;
        /**
         * Constructs a new instance of the com.takusemba.spotlight.OnSpotlightListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { onWillNavigate(param0: number): void; onStarted(): void; onDidNavigate(param0: number): void; onEnded(): void });
        public constructor();
        public onEnded(): void;
        public onDidNavigate(param0: number): void;
        public onStarted(): void;
        public onWillNavigate(param0: number): void;
      }
    }
  }
}

declare module com {
  export module takusemba {
    export module spotlight {
      export class OnTargetListener {
        public static class: java.lang.Class<com.takusemba.spotlight.OnTargetListener>;
        /**
         * Constructs a new instance of the com.takusemba.spotlight.OnTargetListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { onStarted(): void; onEnded(): void });
        public constructor();
        public onEnded(): void;
        public onStarted(): void;
      }
    }
  }
}

declare module com {
  export module takusemba {
    export module spotlight {
      export class Spotlight {
        public static class: java.lang.Class<com.takusemba.spotlight.Spotlight>;
        public start(): void;
        public show(index: number): void;
        public next(): void;
        public finish(): void;
        public previous(): void;
      }
      export module Spotlight {
        export class Builder {
          public static class: java.lang.Class<com.takusemba.spotlight.Spotlight.Builder>;
          public build(): com.takusemba.spotlight.Spotlight;
          public setDuration(duration: number): com.takusemba.spotlight.Spotlight.Builder;
          public setOnSpotlightListener(listener: com.takusemba.spotlight.OnSpotlightListener): com.takusemba.spotlight.Spotlight.Builder;
          public setBackgroundColor(color: number): com.takusemba.spotlight.Spotlight.Builder;
          public setTargets(targets: androidNative.Array<com.takusemba.spotlight.Target>): com.takusemba.spotlight.Spotlight.Builder;
          public setTargets(targets: java.util.List<com.takusemba.spotlight.Target>): com.takusemba.spotlight.Spotlight.Builder;
          public setBackgroundColorRes(color: number): com.takusemba.spotlight.Spotlight.Builder;
          public setContainer(container: globalAndroid.view.ViewGroup): com.takusemba.spotlight.Spotlight.Builder;
          public constructor(activity: globalAndroid.app.Activity);
          public setAnimation(animation: globalAndroid.animation.TimeInterpolator): com.takusemba.spotlight.Spotlight.Builder;
        }
        export module Builder {
          export class Companion {
            public static class: java.lang.Class<com.takusemba.spotlight.Spotlight.Builder.Companion>;
          }
        }
        export class Companion {
          public static class: java.lang.Class<com.takusemba.spotlight.Spotlight.Companion>;
        }
      }
    }
  }
}

declare module com {
  export module takusemba {
    export module spotlight {
      export class SpotlightView {
        public static class: java.lang.Class<com.takusemba.spotlight.SpotlightView>;
        public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet, backgroundColor: number);
        public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet, defStyleAttr: number, backgroundColor: number);
        public finishTarget(listener: globalAndroid.animation.Animator.AnimatorListener): void;
        public cleanup(): void;
        public onDraw(currentShapeAnimator: globalAndroid.graphics.Canvas): void;
        public constructor(context: globalAndroid.content.Context, backgroundColor: number);
        public startTarget(location: com.takusemba.spotlight.Target): void;
        public finishSpotlight(spotlight: number, objectAnimator: globalAndroid.animation.TimeInterpolator, this_: globalAndroid.animation.Animator.AnimatorListener): void;
        public startSpotlight(spotlight: number, objectAnimator: globalAndroid.animation.TimeInterpolator, this_: globalAndroid.animation.Animator.AnimatorListener): void;
      }
    }
  }
}

declare module com {
  export module takusemba {
    export module spotlight {
      export class Target {
        public static class: java.lang.Class<com.takusemba.spotlight.Target>;
        public getShape(): com.takusemba.spotlight.shape.Shape;
        public getOverlay(): globalAndroid.view.View;
        public constructor(anchor: globalAndroid.graphics.PointF, shape: com.takusemba.spotlight.shape.Shape, effect: com.takusemba.spotlight.effet.Effect, overlay: globalAndroid.view.View, listener: com.takusemba.spotlight.OnTargetListener);
        public getEffect(): com.takusemba.spotlight.effet.Effect;
        public getAnchor(): globalAndroid.graphics.PointF;
        public getListener(): com.takusemba.spotlight.OnTargetListener;
      }
      export module Target {
        export class Builder {
          public static class: java.lang.Class<com.takusemba.spotlight.Target.Builder>;
          public setShape(shape: com.takusemba.spotlight.shape.Shape): com.takusemba.spotlight.Target.Builder;
          public setEffect(effect: com.takusemba.spotlight.effet.Effect): com.takusemba.spotlight.Target.Builder;
          public setAnchor(anchor: number, this_: number): com.takusemba.spotlight.Target.Builder;
          public build(): com.takusemba.spotlight.Target;
          public constructor();
          public setOnTargetListener(listener: com.takusemba.spotlight.OnTargetListener): com.takusemba.spotlight.Target.Builder;
          public setAnchor(anchor: globalAndroid.graphics.PointF): com.takusemba.spotlight.Target.Builder;
          public setOverlay(overlay: globalAndroid.view.View): com.takusemba.spotlight.Target.Builder;
          public setAnchor(location: globalAndroid.view.View): com.takusemba.spotlight.Target.Builder;
        }
        export module Builder {
          export class Companion {
            public static class: java.lang.Class<com.takusemba.spotlight.Target.Builder.Companion>;
          }
        }
      }
    }
  }
}

declare module com {
  export module takusemba {
    export module spotlight {
      export module effet {
        export class Effect {
          public static class: java.lang.Class<com.takusemba.spotlight.effet.Effect>;
          /**
           * Constructs a new instance of the com.takusemba.spotlight.effet.Effect interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { getDuration(): number; getInterpolator(): globalAndroid.animation.TimeInterpolator; getRepeatMode(): number; draw(param0: globalAndroid.graphics.Canvas, param1: globalAndroid.graphics.PointF, param2: number, param3: globalAndroid.graphics.Paint): void });
          public constructor();
          public getDuration(): number;
          public getRepeatMode(): number;
          public draw(param0: globalAndroid.graphics.Canvas, param1: globalAndroid.graphics.PointF, param2: number, param3: globalAndroid.graphics.Paint): void;
          public getInterpolator(): globalAndroid.animation.TimeInterpolator;
        }
      }
    }
  }
}

declare module com {
  export module takusemba {
    export module spotlight {
      export module effet {
        export class EmptyEffect extends com.takusemba.spotlight.effet.Effect {
          public static class: java.lang.Class<com.takusemba.spotlight.effet.EmptyEffect>;
          public static DEFAULT_REPEAT_MODE: number = 2;
          public getDuration(): number;
          public draw(canvas: globalAndroid.graphics.Canvas, point: globalAndroid.graphics.PointF, value: number, paint: globalAndroid.graphics.Paint): void;
          public getRepeatMode(): number;
          public constructor();
          public draw(param0: globalAndroid.graphics.Canvas, param1: globalAndroid.graphics.PointF, param2: number, param3: globalAndroid.graphics.Paint): void;
          public getInterpolator(): globalAndroid.animation.TimeInterpolator;
          public constructor(duration: number, interpolator: globalAndroid.animation.TimeInterpolator);
          public constructor(duration: number);
          public constructor(duration: number, interpolator: globalAndroid.animation.TimeInterpolator, repeatMode: number);
        }
        export module EmptyEffect {
          export class Companion {
            public static class: java.lang.Class<com.takusemba.spotlight.effet.EmptyEffect.Companion>;
            public getDEFAULT_INTERPOLATOR(): globalAndroid.view.animation.LinearInterpolator;
            public getDEFAULT_DURATION(): number;
          }
        }
      }
    }
  }
}

declare module com {
  export module takusemba {
    export module spotlight {
      export module effet {
        export class FlickerEffect extends com.takusemba.spotlight.effet.Effect {
          public static class: java.lang.Class<com.takusemba.spotlight.effet.FlickerEffect>;
          public static DEFAULT_REPEAT_MODE: number = 2;
          public constructor(radius: number, color: number, duration: number);
          public getDuration(): number;
          public draw(canvas: globalAndroid.graphics.Canvas, point: globalAndroid.graphics.PointF, value: number, paint: globalAndroid.graphics.Paint): void;
          public getRepeatMode(): number;
          public draw(param0: globalAndroid.graphics.Canvas, param1: globalAndroid.graphics.PointF, param2: number, param3: globalAndroid.graphics.Paint): void;
          public getInterpolator(): globalAndroid.animation.TimeInterpolator;
          public constructor(radius: number, color: number, duration: number, interpolator: globalAndroid.animation.TimeInterpolator, repeatMode: number);
          public constructor(radius: number, color: number);
          public constructor(radius: number, color: number, duration: number, interpolator: globalAndroid.animation.TimeInterpolator);
        }
        export module FlickerEffect {
          export class Companion {
            public static class: java.lang.Class<com.takusemba.spotlight.effet.FlickerEffect.Companion>;
            public getDEFAULT_INTERPOLATOR(): globalAndroid.view.animation.LinearInterpolator;
            public getDEFAULT_DURATION(): number;
          }
        }
      }
    }
  }
}

declare module com {
  export module takusemba {
    export module spotlight {
      export module effet {
        export class RippleEffect extends com.takusemba.spotlight.effet.Effect {
          public static class: java.lang.Class<com.takusemba.spotlight.effet.RippleEffect>;
          public static DEFAULT_REPEAT_MODE: number = 2;
          public constructor(offset: number, radius: number, color: number, duration: number, interpolator: globalAndroid.animation.TimeInterpolator);
          public getDuration(): number;
          public constructor(this_: number, offset: number, radius: number, color: number, duration: globalAndroid.animation.TimeInterpolator, interpolator: number);
          public getRepeatMode(): number;
          public draw(alpha: globalAndroid.graphics.Canvas, this_: globalAndroid.graphics.PointF, canvas: number, point: globalAndroid.graphics.Paint): void;
          public draw(param0: globalAndroid.graphics.Canvas, param1: globalAndroid.graphics.PointF, param2: number, param3: globalAndroid.graphics.Paint): void;
          public getInterpolator(): globalAndroid.animation.TimeInterpolator;
          public constructor(offset: number, radius: number, color: number, duration: number);
          public constructor(offset: number, radius: number, color: number);
        }
        export module RippleEffect {
          export class Companion {
            public static class: java.lang.Class<com.takusemba.spotlight.effet.RippleEffect.Companion>;
            public getDEFAULT_DURATION(): number;
            public getDEFAULT_INTERPOLATOR(): globalAndroid.view.animation.DecelerateInterpolator;
          }
        }
      }
    }
  }
}

declare module com {
  export module takusemba {
    export module spotlight {
      export module shape {
        export class Circle extends com.takusemba.spotlight.shape.Shape {
          public static class: java.lang.Class<com.takusemba.spotlight.shape.Circle>;
          public getDuration(): number;
          public draw(canvas: globalAndroid.graphics.Canvas, point: globalAndroid.graphics.PointF, value: number, paint: globalAndroid.graphics.Paint): void;
          public draw(param0: globalAndroid.graphics.Canvas, param1: globalAndroid.graphics.PointF, param2: number, param3: globalAndroid.graphics.Paint): void;
          public getInterpolator(): globalAndroid.animation.TimeInterpolator;
          public constructor(radius: number, duration: number);
          public constructor(radius: number, duration: number, interpolator: globalAndroid.animation.TimeInterpolator);
          public constructor(radius: number);
        }
        export module Circle {
          export class Companion {
            public static class: java.lang.Class<com.takusemba.spotlight.shape.Circle.Companion>;
            public getDEFAULT_DURATION(): number;
            public getDEFAULT_INTERPOLATOR(): globalAndroid.view.animation.DecelerateInterpolator;
          }
        }
      }
    }
  }
}

declare module com {
  export module takusemba {
    export module spotlight {
      export module shape {
        export class RoundedRectangle extends com.takusemba.spotlight.shape.Shape {
          public static class: java.lang.Class<com.takusemba.spotlight.shape.RoundedRectangle>;
          public getDuration(): number;
          public draw(halfHeight: globalAndroid.graphics.Canvas, left: globalAndroid.graphics.PointF, top: number, right: globalAndroid.graphics.Paint): void;
          public draw(param0: globalAndroid.graphics.Canvas, param1: globalAndroid.graphics.PointF, param2: number, param3: globalAndroid.graphics.Paint): void;
          public getInterpolator(): globalAndroid.animation.TimeInterpolator;
          public constructor(height: number, width: number, radius: number);
          public constructor(height: number, width: number, radius: number, duration: number, interpolator: globalAndroid.animation.TimeInterpolator);
          public constructor(height: number, width: number, radius: number, duration: number);
        }
        export module RoundedRectangle {
          export class Companion {
            public static class: java.lang.Class<com.takusemba.spotlight.shape.RoundedRectangle.Companion>;
            public getDEFAULT_DURATION(): number;
            public getDEFAULT_INTERPOLATOR(): globalAndroid.view.animation.DecelerateInterpolator;
          }
        }
      }
    }
  }
}

declare module com {
  export module takusemba {
    export module spotlight {
      export module shape {
        export class Shape {
          public static class: java.lang.Class<com.takusemba.spotlight.shape.Shape>;
          /**
           * Constructs a new instance of the com.takusemba.spotlight.shape.Shape interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { getDuration(): number; getInterpolator(): globalAndroid.animation.TimeInterpolator; draw(param0: globalAndroid.graphics.Canvas, param1: globalAndroid.graphics.PointF, param2: number, param3: globalAndroid.graphics.Paint): void });
          public constructor();
          public getDuration(): number;
          public draw(param0: globalAndroid.graphics.Canvas, param1: globalAndroid.graphics.PointF, param2: number, param3: globalAndroid.graphics.Paint): void;
          public getInterpolator(): globalAndroid.animation.TimeInterpolator;
        }
      }
    }
  }
}

//Generics information:
