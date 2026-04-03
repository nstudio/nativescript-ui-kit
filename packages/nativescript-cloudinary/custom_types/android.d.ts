/// <reference path="android-declarations.d.ts"/>

declare module com {
  export module cloudinary {
    export module android {
      export class AndroidJobStrategy extends com.cloudinary.android.BackgroundRequestStrategy {
        public static class: java.lang.Class<com.cloudinary.android.AndroidJobStrategy>;
        public doDispatch(uploadWorkRequest: com.cloudinary.android.UploadRequest<any>): void;
        public init(param0: globalAndroid.content.Context): void;
        public init(context: globalAndroid.content.Context): void;
        public executeRequestsNow(param0: number): void;
        public executeRequestsNow(howMany: number): void;
        public doDispatch(param0: com.cloudinary.android.UploadRequest<any>): void;
        public getPendingImmediateJobsCount(): number;
        public constructor();
        public getRunningJobsCount(): number;
        public cancelRequest(requestId: string): boolean;
        public static adapt(request: com.cloudinary.android.UploadRequest<any>, payloadFile: java.io.File): androidx.work.OneTimeWorkRequest;
        public cancelAllRequests(): number;
        public cancelRequest(param0: string): boolean;
      }
      export module AndroidJobStrategy {
        export class AndroidJobRequestParams extends com.cloudinary.android.RequestParams {
          public static class: java.lang.Class<com.cloudinary.android.AndroidJobStrategy.AndroidJobRequestParams>;
          public putString(param0: string, param1: string): void;
          public getInt(key: string, defaultValue: number): number;
          public putLong(key: string, value: number): void;
          public getBoolean(param0: string, param1: boolean): boolean;
          public getString(param0: string, param1: string): string;
          public putInt(param0: string, param1: number): void;
          public getLong(param0: string, param1: number): number;
          public getString(key: string, defaultValue: string): string;
          public getLong(key: string, defaultValue: number): number;
          public putInt(key: string, value: number): void;
          public putLong(param0: string, param1: number): void;
          public putBoolean(param0: string, param1: boolean): void;
          public putBoolean(key: string, value: boolean): void;
          public putString(key: string, value: string): void;
          public getBoolean(key: string, defaultValue: boolean): boolean;
          public getInt(param0: string, param1: number): number;
        }
        export class UploadJob {
          public static class: java.lang.Class<com.cloudinary.android.AndroidJobStrategy.UploadJob>;
          public constructor(context: globalAndroid.content.Context, workerParams: androidx.work.WorkerParameters);
          public onStopped(): void;
          public doWork(): androidx.work.ListenableWorker.Result;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export class ApiStrategy {
        public static class: java.lang.Class<com.cloudinary.android.ApiStrategy>;
        public callApi(method: com.cloudinary.Api.HttpMethod, uri: java.lang.Iterable<string>, params: java.util.Map<string, any>, options: java.util.Map<any, any>): com.cloudinary.api.ApiResponse;
        public callAccountApi(method: com.cloudinary.Api.HttpMethod, uri: java.lang.Iterable<string>, params: java.util.Map<string, any>, options: java.util.Map<any, any>): com.cloudinary.api.ApiResponse;
        public constructor();
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export class BackgroundRequestStrategy {
        public static class: java.lang.Class<com.cloudinary.android.BackgroundRequestStrategy>;
        /**
         * Constructs a new instance of the com.cloudinary.android.BackgroundRequestStrategy interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { init(param0: globalAndroid.content.Context): void; doDispatch(param0: com.cloudinary.android.UploadRequest<any>): void; executeRequestsNow(param0: number): void; cancelRequest(param0: string): boolean; cancelAllRequests(): number; getPendingImmediateJobsCount(): number; getRunningJobsCount(): number });
        public constructor();
        public static IMMEDIATE_THRESHOLD: number = 60000;
        public static SOON_THRESHOLD: number = 1800000;
        public init(param0: globalAndroid.content.Context): void;
        public getRunningJobsCount(): number;
        public executeRequestsNow(param0: number): void;
        public cancelAllRequests(): number;
        public doDispatch(param0: com.cloudinary.android.UploadRequest<any>): void;
        public cancelRequest(param0: string): boolean;
        public getPendingImmediateJobsCount(): number;
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export class BackgroundStrategyProvider {
        public static class: java.lang.Class<com.cloudinary.android.BackgroundStrategyProvider>;
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export class CallbackDispatcher {
        public static class: java.lang.Class<com.cloudinary.android.CallbackDispatcher>;
        /**
         * Constructs a new instance of the com.cloudinary.android.CallbackDispatcher interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          registerCallback(param0: com.cloudinary.android.callback.UploadCallback): void;
          registerCallback(param0: string, param1: com.cloudinary.android.callback.UploadCallback): void;
          unregisterCallback(param0: com.cloudinary.android.callback.UploadCallback): void;
          wakeListenerServiceWithRequestStart(param0: globalAndroid.content.Context, param1: string): void;
          wakeListenerServiceWithRequestFinished(param0: globalAndroid.content.Context, param1: string, param2: com.cloudinary.android.callback.UploadStatus): void;
          dispatchStart(param0: string): void;
          dispatchProgress(param0: string, param1: number, param2: number): void;
          dispatchSuccess(param0: globalAndroid.content.Context, param1: string, param2: java.util.Map<any, any>): void;
          dispatchError(param0: globalAndroid.content.Context, param1: string, param2: com.cloudinary.android.callback.ErrorInfo): void;
          dispatchReschedule(param0: globalAndroid.content.Context, param1: string, param2: com.cloudinary.android.callback.ErrorInfo): void;
          popPendingResult(param0: string): com.cloudinary.android.callback.UploadResult;
        });
        public constructor();
        public wakeListenerServiceWithRequestFinished(param0: globalAndroid.content.Context, param1: string, param2: com.cloudinary.android.callback.UploadStatus): void;
        public wakeListenerServiceWithRequestStart(param0: globalAndroid.content.Context, param1: string): void;
        public dispatchStart(param0: string): void;
        public dispatchProgress(param0: string, param1: number, param2: number): void;
        public dispatchError(param0: globalAndroid.content.Context, param1: string, param2: com.cloudinary.android.callback.ErrorInfo): void;
        public popPendingResult(param0: string): com.cloudinary.android.callback.UploadResult;
        public dispatchReschedule(param0: globalAndroid.content.Context, param1: string, param2: com.cloudinary.android.callback.ErrorInfo): void;
        public dispatchSuccess(param0: globalAndroid.content.Context, param1: string, param2: java.util.Map<any, any>): void;
        public registerCallback(param0: com.cloudinary.android.callback.UploadCallback): void;
        public registerCallback(param0: string, param1: com.cloudinary.android.callback.UploadCallback): void;
        public unregisterCallback(param0: com.cloudinary.android.callback.UploadCallback): void;
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export class CloudinaryRequest {
        public static class: java.lang.Class<com.cloudinary.android.CloudinaryRequest>;
        public getPublicId(): string;
        public getResponsive(): com.cloudinary.android.ResponsiveUrl;
        public getTransformation(): com.cloudinary.Transformation;
      }
      export module CloudinaryRequest {
        export class Builder {
          public static class: java.lang.Class<com.cloudinary.android.CloudinaryRequest.Builder>;
          public build(): com.cloudinary.android.CloudinaryRequest;
          public constructor(publicId: string);
          public responsive(responsiveUrl: com.cloudinary.android.ResponsiveUrl): com.cloudinary.android.CloudinaryRequest.Builder;
          public transformation(transformation: com.cloudinary.Transformation): com.cloudinary.android.CloudinaryRequest.Builder;
          public responsive(responsivePreset: com.cloudinary.android.ResponsiveUrl.Preset): com.cloudinary.android.CloudinaryRequest.Builder;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export class DefaultCallbackDispatcher extends com.cloudinary.android.CallbackDispatcher {
        public static class: java.lang.Class<com.cloudinary.android.DefaultCallbackDispatcher>;
        public dispatchStart(requestId: string): void;
        public wakeListenerServiceWithRequestFinished(param0: globalAndroid.content.Context, param1: string, param2: com.cloudinary.android.callback.UploadStatus): void;
        public dispatchProgress(param0: string, param1: number, param2: number): void;
        public registerCallback(callback: com.cloudinary.android.callback.UploadCallback): void;
        public dispatchReschedule(param0: globalAndroid.content.Context, param1: string, param2: com.cloudinary.android.callback.ErrorInfo): void;
        public unregisterCallback(callback: com.cloudinary.android.callback.UploadCallback): void;
        public registerCallback(param0: com.cloudinary.android.callback.UploadCallback): void;
        public wakeListenerServiceWithRequestStart(appContext: globalAndroid.content.Context, requestId: string): void;
        public dispatchError(context: globalAndroid.content.Context, requestId: string, error: com.cloudinary.android.callback.ErrorInfo): void;
        public popPendingResult(requestId: string): com.cloudinary.android.callback.UploadResult;
        public wakeListenerServiceWithRequestStart(param0: globalAndroid.content.Context, param1: string): void;
        public dispatchStart(param0: string): void;
        public dispatchError(param0: globalAndroid.content.Context, param1: string, param2: com.cloudinary.android.callback.ErrorInfo): void;
        public popPendingResult(param0: string): com.cloudinary.android.callback.UploadResult;
        public dispatchSuccess(context: globalAndroid.content.Context, requestId: string, resultData: java.util.Map<any, any>): void;
        public dispatchSuccess(param0: globalAndroid.content.Context, param1: string, param2: java.util.Map<any, any>): void;
        public registerCallback(uploadCallbackWrapper: string, this_: com.cloudinary.android.callback.UploadCallback): void;
        public wakeListenerServiceWithRequestFinished(appContext: globalAndroid.content.Context, requestId: string, uploadStatus: com.cloudinary.android.callback.UploadStatus): void;
        public registerCallback(param0: string, param1: com.cloudinary.android.callback.UploadCallback): void;
        public dispatchReschedule(context: globalAndroid.content.Context, requestId: string, error: com.cloudinary.android.callback.ErrorInfo): void;
        public unregisterCallback(param0: com.cloudinary.android.callback.UploadCallback): void;
        public dispatchProgress(requestId: string, bytes: number, totalBytes: number): void;
      }
      export module DefaultCallbackDispatcher {
        export class CallbackMessage {
          public static class: java.lang.Class<com.cloudinary.android.DefaultCallbackDispatcher.CallbackMessage>;
        }
        export class UploadCallbackWrapper {
          public static class: java.lang.Class<com.cloudinary.android.DefaultCallbackDispatcher.UploadCallbackWrapper>;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export class DefaultImmediateRequestsRunner extends com.cloudinary.android.ImmediateRequestsRunner {
        public static class: java.lang.Class<com.cloudinary.android.DefaultImmediateRequestsRunner>;
        public static tasks: java.util.Map<string, java.util.concurrent.Future<any>>;
        public runRequest(context: globalAndroid.content.Context, uploadRequest: com.cloudinary.android.UploadRequest<any>): void;
        public cancelRequest(requestId: string): boolean;
        public cancelAllRequests(): number;
        public cancelRequest(param0: string): boolean;
        public runRequest(param0: globalAndroid.content.Context, param1: com.cloudinary.android.UploadRequest<any>): void;
      }
      export module DefaultImmediateRequestsRunner {
        export class ImmediateRequestParams extends com.cloudinary.android.RequestParams {
          public static class: java.lang.Class<com.cloudinary.android.DefaultImmediateRequestsRunner.ImmediateRequestParams>;
          public putString(param0: string, param1: string): void;
          public getInt(key: string, defaultValue: number): number;
          public putLong(key: string, value: number): void;
          public getBoolean(param0: string, param1: boolean): boolean;
          public getString(param0: string, param1: string): string;
          public putInt(param0: string, param1: number): void;
          public getLong(param0: string, param1: number): number;
          public getString(key: string, defaultValue: string): string;
          public getLong(key: string, defaultValue: number): number;
          public putInt(key: string, value: number): void;
          public putLong(param0: string, param1: number): void;
          public putBoolean(param0: string, param1: boolean): void;
          public putBoolean(key: string, value: boolean): void;
          public putString(key: string, value: string): void;
          public getBoolean(key: string, defaultValue: boolean): boolean;
          public getInt(param0: string, param1: number): number;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export class DefaultRequestDispatcher extends com.cloudinary.android.RequestDispatcher {
        public static class: java.lang.Class<com.cloudinary.android.DefaultRequestDispatcher>;
        public startNow(context: globalAndroid.content.Context, request: com.cloudinary.android.UploadRequest<any>): string;
        public queueRoomFreed(): void;
        public dispatch(param0: com.cloudinary.android.UploadRequest<any>): string;
        public cancelAllRequests(): number;
        public startNow(param0: globalAndroid.content.Context, param1: com.cloudinary.android.UploadRequest<any>): string;
        public cancelRequest(param0: string): boolean;
        public dispatch(this_: com.cloudinary.android.UploadRequest<any>): string;
        public cancelRequest(this_: string): boolean;
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export class DefaultRequestProcessor extends com.cloudinary.android.RequestProcessor {
        public static class: java.lang.Class<com.cloudinary.android.DefaultRequestProcessor>;
        public static ERROR_COUNT_PARAM: string = 'errorCount';
        public processRequest(param0: globalAndroid.content.Context, param1: com.cloudinary.android.RequestParams): com.cloudinary.android.callback.UploadStatus;
        public processRequest(requestResultStatus: globalAndroid.content.Context, e: com.cloudinary.android.RequestParams): com.cloudinary.android.callback.UploadStatus;
      }
      export module DefaultRequestProcessor {
        export class ProcessorCallback {
          public static class: java.lang.Class<com.cloudinary.android.DefaultRequestProcessor.ProcessorCallback>;
          public onProgress(bytes: number, totalBytes: number): void;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export class ErrorRetrievingSignatureException {
        public static class: java.lang.Class<com.cloudinary.android.ErrorRetrievingSignatureException>;
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export class ImmediateRequestsRunner {
        public static class: java.lang.Class<com.cloudinary.android.ImmediateRequestsRunner>;
        /**
         * Constructs a new instance of the com.cloudinary.android.ImmediateRequestsRunner interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { runRequest(param0: globalAndroid.content.Context, param1: com.cloudinary.android.UploadRequest<any>): void; cancelRequest(param0: string): boolean; cancelAllRequests(): number });
        public constructor();
        public cancelAllRequests(): number;
        public cancelRequest(param0: string): boolean;
        public runRequest(param0: globalAndroid.content.Context, param1: com.cloudinary.android.UploadRequest<any>): void;
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export class InvalidParamsException {
        public static class: java.lang.Class<com.cloudinary.android.InvalidParamsException>;
        public constructor(message: string, cause: java.lang.Throwable);
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export class LogLevel {
        public static class: java.lang.Class<com.cloudinary.android.LogLevel>;
        public static NONE: com.cloudinary.android.LogLevel;
        public static ERROR: com.cloudinary.android.LogLevel;
        public static INFO: com.cloudinary.android.LogLevel;
        public static DEBUG: com.cloudinary.android.LogLevel;
        public static valueOf(name: string): com.cloudinary.android.LogLevel;
        public static values(): androidNative.Array<com.cloudinary.android.LogLevel>;
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export class Logger {
        public static class: java.lang.Class<com.cloudinary.android.Logger>;
        public static e(tag: string, message: string): void;
        public static d(tag: string, message: string): void;
        public static e(tag: string, message: string, t: java.lang.Throwable): void;
        public constructor();
        public static i(tag: string, message: string): void;
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export class MediaManager {
        public static class: java.lang.Class<com.cloudinary.android.MediaManager>;
        public static VERSION: string = '3.0.2';
        public static INTENT_EXTRA_REQUEST_ID: string = 'INTENT_EXTRA_REQUEST_ID';
        public static INTENT_EXTRA_REQUEST_RESULT_STATUS: string = 'INTENT_EXTRA_REQUEST_RESULT_STATUS';
        public static ACTION_REQUEST_STARTED: string = 'com.cloudinary.ACTION_REQUEST_STARTED';
        public static ACTION_REQUEST_FINISHED: string = 'com.cloudinary.ACTION_REQUEST_FINISHED';
        public url(): com.cloudinary.Url;
        public static setLogLevel(logLevel: com.cloudinary.android.LogLevel): void;
        public download(context: globalAndroid.content.Context): com.cloudinary.android.download.DownloadRequestBuilder;
        public static init(context: globalAndroid.content.Context, config: java.util.Map<any, any>): void;
        public static init(context: globalAndroid.content.Context, config: com.cloudinary.Configuration): void;
        public upload(rawResourceId: number): com.cloudinary.android.UploadRequest<any>;
        public getGlobalUploadPolicy(): com.cloudinary.android.policy.GlobalUploadPolicy;
        public popPendingResult(requestId: string): com.cloudinary.android.callback.UploadResult;
        public responsiveUrl(view: globalAndroid.view.View, baseUrl: com.cloudinary.Url, preset: com.cloudinary.android.ResponsiveUrl.Preset, callback: com.cloudinary.android.ResponsiveUrl.Callback): void;
        public cancelRequest(requestId: string): boolean;
        public cancelAllRequests(): number;
        public static init(context: globalAndroid.content.Context): void;
        public setGlobalUploadPolicy(globalUploadPolicy: com.cloudinary.android.policy.GlobalUploadPolicy): void;
        public responsiveUrl(preset: com.cloudinary.android.ResponsiveUrl.Preset): com.cloudinary.android.ResponsiveUrl;
        public registerCallback(callback: com.cloudinary.android.callback.UploadCallback): void;
        public unregisterCallback(callback: com.cloudinary.android.callback.UploadCallback): void;
        public responsiveUrl(view: globalAndroid.view.View, publicId: string, preset: com.cloudinary.android.ResponsiveUrl.Preset, callback: com.cloudinary.android.ResponsiveUrl.Callback): void;
        public responsiveUrl(autoWidth: boolean, autoHeight: boolean, cropMode: string, gravity: string): com.cloudinary.android.ResponsiveUrl;
        public upload(bytes: androidNative.Array<number>): com.cloudinary.android.UploadRequest<any>;
        public setDownloadRequestBuilderFactory(factory: com.cloudinary.android.download.DownloadRequestBuilderFactory): void;
        public static init(context: globalAndroid.content.Context, provider: com.cloudinary.android.signed.SignatureProvider, config: com.cloudinary.Configuration): void;
        public upload(filePath: string): com.cloudinary.android.UploadRequest<any>;
        public upload(payload: com.cloudinary.android.payload.Payload<any>): com.cloudinary.android.UploadRequest<any>;
        public static init(context: globalAndroid.content.Context, signatureProvider: com.cloudinary.android.signed.SignatureProvider): void;
        public upload(uri: globalAndroid.net.Uri): com.cloudinary.android.UploadRequest<any>;
        public static init(context: globalAndroid.content.Context, provider: com.cloudinary.android.signed.SignatureProvider, config: java.util.Map<any, any>): void;
        public getCloudinary(): com.cloudinary.Cloudinary;
        public static get(): com.cloudinary.android.MediaManager;
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export class MultipartUtility {
        public static class: java.lang.Class<com.cloudinary.android.MultipartUtility>;
        public static USER_AGENT: string;
        public addFilePart(fieldName: string, uploadFile: java.io.File, fileName: string): void;
        public close(): void;
        public constructor(this_: string, requestURL: string, charset: string, boundary: java.util.Map<string, string>, headers: com.cloudinary.android.MultipartUtility.MultipartCallback, multipartCallback: number, connectTimeout: number);
        public constructor(requestURL: string, charset: string, boundary: string, headers: java.util.Map<string, string>, multipartCallback: com.cloudinary.android.MultipartUtility.MultipartCallback);
        public addFilePart(fieldName: string, inputStream: java.io.InputStream, fileName: string): void;
        public constructor(requestURL: string, charset: string, boundary: string, headers: java.util.Map<string, string>);
        public addFormField(name: string, value: string): void;
        public addFilePart(fieldName: string, inputStream: java.io.InputStream): void;
        public addFilePart(fieldName: string, uploadFile: java.io.File): void;
        public execute(): java.net.HttpURLConnection;
        public constructor(requestURL: string, charset: string, boundary: string);
      }
      export module MultipartUtility {
        export class MultipartCallback {
          public static class: java.lang.Class<com.cloudinary.android.MultipartUtility.MultipartCallback>;
          /**
           * Constructs a new instance of the com.cloudinary.android.MultipartUtility$MultipartCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { totalBytesLoaded(param0: number): void });
          public constructor();
          public totalBytesLoaded(param0: number): void;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export class RequestDispatcher {
        public static class: java.lang.Class<com.cloudinary.android.RequestDispatcher>;
        /**
         * Constructs a new instance of the com.cloudinary.android.RequestDispatcher interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { dispatch(param0: com.cloudinary.android.UploadRequest<any>): string; startNow(param0: globalAndroid.content.Context, param1: com.cloudinary.android.UploadRequest<any>): string; cancelRequest(param0: string): boolean; queueRoomFreed(): void; cancelAllRequests(): number });
        public constructor();
        public dispatch(param0: com.cloudinary.android.UploadRequest<any>): string;
        public queueRoomFreed(): void;
        public cancelAllRequests(): number;
        public startNow(param0: globalAndroid.content.Context, param1: com.cloudinary.android.UploadRequest<any>): string;
        public cancelRequest(param0: string): boolean;
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export class RequestParams {
        public static class: java.lang.Class<com.cloudinary.android.RequestParams>;
        /**
         * Constructs a new instance of the com.cloudinary.android.RequestParams interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { putString(param0: string, param1: string): void; putInt(param0: string, param1: number): void; putLong(param0: string, param1: number): void; putBoolean(param0: string, param1: boolean): void; getString(param0: string, param1: string): string; getInt(param0: string, param1: number): number; getLong(param0: string, param1: number): number; getBoolean(param0: string, param1: boolean): boolean });
        public constructor();
        public getString(param0: string, param1: string): string;
        public putInt(param0: string, param1: number): void;
        public getLong(param0: string, param1: number): number;
        public putString(param0: string, param1: string): void;
        public putLong(param0: string, param1: number): void;
        public getBoolean(param0: string, param1: boolean): boolean;
        public putBoolean(param0: string, param1: boolean): void;
        public getInt(param0: string, param1: number): number;
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export class RequestProcessor {
        public static class: java.lang.Class<com.cloudinary.android.RequestProcessor>;
        /**
         * Constructs a new instance of the com.cloudinary.android.RequestProcessor interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { processRequest(param0: globalAndroid.content.Context, param1: com.cloudinary.android.RequestParams): com.cloudinary.android.callback.UploadStatus });
        public constructor();
        public processRequest(param0: globalAndroid.content.Context, param1: com.cloudinary.android.RequestParams): com.cloudinary.android.callback.UploadStatus;
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export class ResponsiveUrl {
        public static class: java.lang.Class<com.cloudinary.android.ResponsiveUrl>;
        public buildUrl(baseUrl: com.cloudinary.Url, width: number, height: number): com.cloudinary.Url;
        public stepSize(stepSize: number): com.cloudinary.android.ResponsiveUrl;
        public minDimension(minDimension: number): com.cloudinary.android.ResponsiveUrl;
        public maxDimension(maxDimension: number): com.cloudinary.android.ResponsiveUrl;
        public generate(publicId: string, view: globalAndroid.view.View, callback: com.cloudinary.android.ResponsiveUrl.Callback): void;
        public generate(baseUrl: com.cloudinary.Url, view: globalAndroid.view.View, callback: com.cloudinary.android.ResponsiveUrl.Callback): void;
      }
      export module ResponsiveUrl {
        export class Callback {
          public static class: java.lang.Class<com.cloudinary.android.ResponsiveUrl.Callback>;
          /**
           * Constructs a new instance of the com.cloudinary.android.ResponsiveUrl$Callback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { onUrlReady(param0: com.cloudinary.Url): void });
          public constructor();
          public onUrlReady(param0: com.cloudinary.Url): void;
        }
        export class Preset {
          public static class: java.lang.Class<com.cloudinary.android.ResponsiveUrl.Preset>;
          public static AUTO_FILL: com.cloudinary.android.ResponsiveUrl.Preset;
          public static FIT: com.cloudinary.android.ResponsiveUrl.Preset;
          public static values(): androidNative.Array<com.cloudinary.android.ResponsiveUrl.Preset>;
          public static valueOf(name: string): com.cloudinary.android.ResponsiveUrl.Preset;
          public get(cloudinary: com.cloudinary.Cloudinary): com.cloudinary.android.ResponsiveUrl;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export class UploadContext<T> extends java.lang.Object {
        public static class: java.lang.Class<com.cloudinary.android.UploadContext<any>>;
        public getPayload(): T;
        public constructor(payload: T, requestDispatcher: com.cloudinary.android.RequestDispatcher);
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export class UploadRequest<T> extends java.lang.Object {
        public static class: java.lang.Class<com.cloudinary.android.UploadRequest<any>>;
        public unsigned(uploadPreset: string): com.cloudinary.android.UploadRequest<T>;
        public maxFileSize(bytes: number): com.cloudinary.android.UploadRequest<T>;
        public option(name: string, value: any): com.cloudinary.android.UploadRequest<T>;
        public preprocess(preprocessChain: com.cloudinary.android.preprocess.PreprocessChain<any>): com.cloudinary.android.UploadRequest<T>;
        public dispatch(): string;
        public constrain(timeWindow: com.cloudinary.android.policy.TimeWindow): com.cloudinary.android.UploadRequest<T>;
        public getRequestId(): string;
        public options(options: java.util.Map<string, any>): com.cloudinary.android.UploadRequest<T>;
        public constructor(uploadContext: com.cloudinary.android.UploadContext<T>);
        public callback(callback: com.cloudinary.android.callback.UploadCallback): com.cloudinary.android.UploadRequest<T>;
        public getPayload(): T;
        public buildPayload(oos: java.io.File): androidx.work.Data;
        public dispatch(context: globalAndroid.content.Context): string;
        public policy(policy: com.cloudinary.android.policy.UploadPolicy): com.cloudinary.android.UploadRequest<T>;
        public startNow(context: globalAndroid.content.Context): string;
      }
      export module UploadRequest {
        export class DelegateCallback extends com.cloudinary.android.callback.UploadCallback {
          public static class: java.lang.Class<com.cloudinary.android.UploadRequest.DelegateCallback>;
          public onError(param0: string, param1: com.cloudinary.android.callback.ErrorInfo): void;
          public onStart(requestId: string): void;
          public onProgress(param0: string, param1: number, param2: number): void;
          public onStart(param0: string): void;
          public onSuccess(param0: string, param1: java.util.Map<any, any>): void;
          public onError(requestId: string, error: com.cloudinary.android.callback.ErrorInfo): void;
          public onProgress(requestId: string, bytes: number, totalBytes: number): void;
          public onReschedule(param0: string, param1: com.cloudinary.android.callback.ErrorInfo): void;
          public onSuccess(requestId: string, resultData: java.util.Map<any, any>): void;
          public onReschedule(requestId: string, error: com.cloudinary.android.callback.ErrorInfo): void;
        }
        export class PayloadData {
          public static class: java.lang.Class<com.cloudinary.android.UploadRequest.PayloadData>;
          public static KEY: string = 'payload_file_path';
          public constructor(uri: string, requestId: string, maxErrorRetries: number, options: string);
          public getOptions(): string;
          public constructor();
          public getRequestId(): string;
          public getUri(): string;
          public getMaxErrorRetries(): number;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export class UploaderStrategy {
        public static class: java.lang.Class<com.cloudinary.android.UploaderStrategy>;
        public callApi(apiKey: string, multipartCallback: java.util.Map<string, any>, totalBytes: java.util.Map<any, any>, value: any, param: com.cloudinary.ProgressCallback): java.util.Map<any, any>;
        public static readFully(in_: java.io.InputStream): string;
        public constructor();
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export class Utils {
        public static class: java.lang.Class<com.cloudinary.android.Utils>;
        public static cloudinaryUrlFromContext(packageManager: globalAndroid.content.Context): string;
        public constructor();
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module callback {
        export class ErrorInfo {
          public static class: java.lang.Class<com.cloudinary.android.callback.ErrorInfo>;
          public static NO_ERROR: number = 0;
          public static FILE_DOES_NOT_EXIST: number = 1;
          public static URI_DOES_NOT_EXIST: number = 2;
          public static RESOURCE_DOES_NOT_EXIST: number = 3;
          public static SIGNATURE_FAILURE: number = 4;
          public static NETWORK_ERROR: number = 5;
          public static UNKNOWN_ERROR: number = 6;
          public static PAYLOAD_LOAD_FAILURE: number = 7;
          public static PAYLOAD_EMPTY: number = 8;
          public static OPTIONS_FAILURE: number = 9;
          public static BYTE_ARRAY_PAYLOAD_EMPTY: number = 10;
          public static REQUEST_CANCELLED: number = 11;
          public static PREPROCESS_ERROR: number = 12;
          public static TOO_MANY_ERRORS: number = 13;
          public constructor(code: number, description: string);
          public getDescription(): string;
          public getCode(): number;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module callback {
        export abstract class ListenerService implements com.cloudinary.android.callback.UploadCallback {
          public static class: java.lang.Class<com.cloudinary.android.callback.ListenerService>;
          public onError(param0: string, param1: com.cloudinary.android.callback.ErrorInfo): void;
          public onCreate(): void;
          public onProgress(param0: string, param1: number, param2: number): void;
          public constructor();
          public onStart(param0: string): void;
          public onStartCommand(uploadResult: globalAndroid.content.Intent, requestId: number, this_: number): number;
          public onSuccess(param0: string, param1: java.util.Map<any, any>): void;
          public onDestroy(): void;
          public onReschedule(param0: string, param1: com.cloudinary.android.callback.ErrorInfo): void;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module callback {
        export class UploadCallback {
          public static class: java.lang.Class<com.cloudinary.android.callback.UploadCallback>;
          /**
           * Constructs a new instance of the com.cloudinary.android.callback.UploadCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { onStart(param0: string): void; onProgress(param0: string, param1: number, param2: number): void; onSuccess(param0: string, param1: java.util.Map<any, any>): void; onError(param0: string, param1: com.cloudinary.android.callback.ErrorInfo): void; onReschedule(param0: string, param1: com.cloudinary.android.callback.ErrorInfo): void });
          public constructor();
          public onError(param0: string, param1: com.cloudinary.android.callback.ErrorInfo): void;
          public onProgress(param0: string, param1: number, param2: number): void;
          public onStart(param0: string): void;
          public onSuccess(param0: string, param1: java.util.Map<any, any>): void;
          public onReschedule(param0: string, param1: com.cloudinary.android.callback.ErrorInfo): void;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module callback {
        export class UploadResult {
          public static class: java.lang.Class<com.cloudinary.android.callback.UploadResult>;
          public getError(): com.cloudinary.android.callback.ErrorInfo;
          public constructor(successResultData: java.util.Map<any, any>, error: com.cloudinary.android.callback.ErrorInfo);
          public getSuccessResultData(): java.util.Map<any, any>;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module callback {
        export class UploadStatus {
          public static class: java.lang.Class<com.cloudinary.android.callback.UploadStatus>;
          public static FAILURE: com.cloudinary.android.callback.UploadStatus;
          public static SUCCESS: com.cloudinary.android.callback.UploadStatus;
          public static RESCHEDULE: com.cloudinary.android.callback.UploadStatus;
          public isFinal(): boolean;
          public static valueOf(name: string): com.cloudinary.android.callback.UploadStatus;
          public static values(): androidNative.Array<com.cloudinary.android.callback.UploadStatus>;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module core {
        export class BuildConfig {
          public static class: java.lang.Class<com.cloudinary.android.core.BuildConfig>;
          public static DEBUG: boolean = 0;
          public static LIBRARY_PACKAGE_NAME: string = 'com.cloudinary.android.core';
          public static BUILD_TYPE: string = 'release';
          public constructor();
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module core {
        export class R {
          public static class: java.lang.Class<com.cloudinary.android.core.R>;
        }
        export module R {
          export class anim {
            public static class: java.lang.Class<com.cloudinary.android.core.R.anim>;
            public static abc_fade_in: number = 0;
            public static abc_fade_out: number = 0;
            public static abc_grow_fade_in_from_bottom: number = 0;
            public static abc_popup_enter: number = 0;
            public static abc_popup_exit: number = 0;
            public static abc_shrink_fade_out_from_bottom: number = 0;
            public static abc_slide_in_bottom: number = 0;
            public static abc_slide_in_top: number = 0;
            public static abc_slide_out_bottom: number = 0;
            public static abc_slide_out_top: number = 0;
            public static abc_tooltip_enter: number = 0;
            public static abc_tooltip_exit: number = 0;
            public static btn_checkbox_to_checked_box_inner_merged_animation: number = 0;
            public static btn_checkbox_to_checked_box_outer_merged_animation: number = 0;
            public static btn_checkbox_to_checked_icon_null_animation: number = 0;
            public static btn_checkbox_to_unchecked_box_inner_merged_animation: number = 0;
            public static btn_checkbox_to_unchecked_check_path_merged_animation: number = 0;
            public static btn_checkbox_to_unchecked_icon_null_animation: number = 0;
            public static btn_radio_to_off_mtrl_dot_group_animation: number = 0;
            public static btn_radio_to_off_mtrl_ring_outer_animation: number = 0;
            public static btn_radio_to_off_mtrl_ring_outer_path_animation: number = 0;
            public static btn_radio_to_on_mtrl_dot_group_animation: number = 0;
            public static btn_radio_to_on_mtrl_ring_outer_animation: number = 0;
            public static btn_radio_to_on_mtrl_ring_outer_path_animation: number = 0;
            public static design_bottom_sheet_slide_in: number = 0;
            public static design_bottom_sheet_slide_out: number = 0;
            public static design_snackbar_in: number = 0;
            public static design_snackbar_out: number = 0;
            public static fragment_fast_out_extra_slow_in: number = 0;
            public static mtrl_bottom_sheet_slide_in: number = 0;
            public static mtrl_bottom_sheet_slide_out: number = 0;
            public static mtrl_card_lowers_interpolator: number = 0;
          }
          export class animator {
            public static class: java.lang.Class<com.cloudinary.android.core.R.animator>;
            public static design_appbar_state_list_animator: number = 0;
            public static design_fab_hide_motion_spec: number = 0;
            public static design_fab_show_motion_spec: number = 0;
            public static fragment_close_enter: number = 0;
            public static fragment_close_exit: number = 0;
            public static fragment_fade_enter: number = 0;
            public static fragment_fade_exit: number = 0;
            public static fragment_open_enter: number = 0;
            public static fragment_open_exit: number = 0;
            public static linear_indeterminate_line1_head_interpolator: number = 0;
            public static linear_indeterminate_line1_tail_interpolator: number = 0;
            public static linear_indeterminate_line2_head_interpolator: number = 0;
            public static linear_indeterminate_line2_tail_interpolator: number = 0;
            public static mtrl_btn_state_list_anim: number = 0;
            public static mtrl_btn_unelevated_state_list_anim: number = 0;
            public static mtrl_card_state_list_anim: number = 0;
            public static mtrl_chip_state_list_anim: number = 0;
            public static mtrl_extended_fab_change_size_collapse_motion_spec: number = 0;
            public static mtrl_extended_fab_change_size_expand_motion_spec: number = 0;
            public static mtrl_extended_fab_hide_motion_spec: number = 0;
            public static mtrl_extended_fab_show_motion_spec: number = 0;
            public static mtrl_extended_fab_state_list_animator: number = 0;
            public static mtrl_fab_hide_motion_spec: number = 0;
            public static mtrl_fab_show_motion_spec: number = 0;
            public static mtrl_fab_transformation_sheet_collapse_spec: number = 0;
            public static mtrl_fab_transformation_sheet_expand_spec: number = 0;
          }
          export class attr {
            public static class: java.lang.Class<com.cloudinary.android.core.R.attr>;
            public static actionBarDivider: number = 0;
            public static actionBarItemBackground: number = 0;
            public static actionBarPopupTheme: number = 0;
            public static actionBarSize: number = 0;
            public static actionBarSplitStyle: number = 0;
            public static actionBarStyle: number = 0;
            public static actionBarTabBarStyle: number = 0;
            public static actionBarTabStyle: number = 0;
            public static actionBarTabTextStyle: number = 0;
            public static actionBarTheme: number = 0;
            public static actionBarWidgetTheme: number = 0;
            public static actionButtonStyle: number = 0;
            public static actionDropDownStyle: number = 0;
            public static actionLayout: number = 0;
            public static actionMenuTextAppearance: number = 0;
            public static actionMenuTextColor: number = 0;
            public static actionModeBackground: number = 0;
            public static actionModeCloseButtonStyle: number = 0;
            public static actionModeCloseContentDescription: number = 0;
            public static actionModeCloseDrawable: number = 0;
            public static actionModeCopyDrawable: number = 0;
            public static actionModeCutDrawable: number = 0;
            public static actionModeFindDrawable: number = 0;
            public static actionModePasteDrawable: number = 0;
            public static actionModePopupWindowStyle: number = 0;
            public static actionModeSelectAllDrawable: number = 0;
            public static actionModeShareDrawable: number = 0;
            public static actionModeSplitBackground: number = 0;
            public static actionModeStyle: number = 0;
            public static actionModeTheme: number = 0;
            public static actionModeWebSearchDrawable: number = 0;
            public static actionOverflowButtonStyle: number = 0;
            public static actionOverflowMenuStyle: number = 0;
            public static actionProviderClass: number = 0;
            public static actionTextColorAlpha: number = 0;
            public static actionViewClass: number = 0;
            public static activityChooserViewStyle: number = 0;
            public static alertDialogButtonGroupStyle: number = 0;
            public static alertDialogCenterButtons: number = 0;
            public static alertDialogStyle: number = 0;
            public static alertDialogTheme: number = 0;
            public static allowStacking: number = 0;
            public static alpha: number = 0;
            public static alphabeticModifiers: number = 0;
            public static altSrc: number = 0;
            public static animate_relativeTo: number = 0;
            public static animationMode: number = 0;
            public static appBarLayoutStyle: number = 0;
            public static applyMotionScene: number = 0;
            public static arcMode: number = 0;
            public static arrowHeadLength: number = 0;
            public static arrowShaftLength: number = 0;
            public static attributeName: number = 0;
            public static autoCompleteTextViewStyle: number = 0;
            public static autoSizeMaxTextSize: number = 0;
            public static autoSizeMinTextSize: number = 0;
            public static autoSizePresetSizes: number = 0;
            public static autoSizeStepGranularity: number = 0;
            public static autoSizeTextType: number = 0;
            public static autoTransition: number = 0;
            public static background: number = 0;
            public static backgroundColor: number = 0;
            public static backgroundInsetBottom: number = 0;
            public static backgroundInsetEnd: number = 0;
            public static backgroundInsetStart: number = 0;
            public static backgroundInsetTop: number = 0;
            public static backgroundOverlayColorAlpha: number = 0;
            public static backgroundSplit: number = 0;
            public static backgroundStacked: number = 0;
            public static backgroundTint: number = 0;
            public static backgroundTintMode: number = 0;
            public static badgeGravity: number = 0;
            public static badgeStyle: number = 0;
            public static badgeTextColor: number = 0;
            public static barLength: number = 0;
            public static barrierAllowsGoneWidgets: number = 0;
            public static barrierDirection: number = 0;
            public static barrierMargin: number = 0;
            public static behavior_autoHide: number = 0;
            public static behavior_autoShrink: number = 0;
            public static behavior_draggable: number = 0;
            public static behavior_expandedOffset: number = 0;
            public static behavior_fitToContents: number = 0;
            public static behavior_halfExpandedRatio: number = 0;
            public static behavior_hideable: number = 0;
            public static behavior_overlapTop: number = 0;
            public static behavior_peekHeight: number = 0;
            public static behavior_saveFlags: number = 0;
            public static behavior_skipCollapsed: number = 0;
            public static borderWidth: number = 0;
            public static borderlessButtonStyle: number = 0;
            public static bottomAppBarStyle: number = 0;
            public static bottomNavigationStyle: number = 0;
            public static bottomSheetDialogTheme: number = 0;
            public static bottomSheetStyle: number = 0;
            public static boxBackgroundColor: number = 0;
            public static boxBackgroundMode: number = 0;
            public static boxCollapsedPaddingTop: number = 0;
            public static boxCornerRadiusBottomEnd: number = 0;
            public static boxCornerRadiusBottomStart: number = 0;
            public static boxCornerRadiusTopEnd: number = 0;
            public static boxCornerRadiusTopStart: number = 0;
            public static boxStrokeColor: number = 0;
            public static boxStrokeErrorColor: number = 0;
            public static boxStrokeWidth: number = 0;
            public static boxStrokeWidthFocused: number = 0;
            public static brightness: number = 0;
            public static buttonBarButtonStyle: number = 0;
            public static buttonBarNegativeButtonStyle: number = 0;
            public static buttonBarNeutralButtonStyle: number = 0;
            public static buttonBarPositiveButtonStyle: number = 0;
            public static buttonBarStyle: number = 0;
            public static buttonCompat: number = 0;
            public static buttonGravity: number = 0;
            public static buttonIconDimen: number = 0;
            public static buttonPanelSideLayout: number = 0;
            public static buttonStyle: number = 0;
            public static buttonStyleSmall: number = 0;
            public static buttonTint: number = 0;
            public static buttonTintMode: number = 0;
            public static cardBackgroundColor: number = 0;
            public static cardCornerRadius: number = 0;
            public static cardElevation: number = 0;
            public static cardForegroundColor: number = 0;
            public static cardMaxElevation: number = 0;
            public static cardPreventCornerOverlap: number = 0;
            public static cardUseCompatPadding: number = 0;
            public static cardViewStyle: number = 0;
            public static chainUseRtl: number = 0;
            public static checkboxStyle: number = 0;
            public static checkedButton: number = 0;
            public static checkedChip: number = 0;
            public static checkedIcon: number = 0;
            public static checkedIconEnabled: number = 0;
            public static checkedIconMargin: number = 0;
            public static checkedIconSize: number = 0;
            public static checkedIconTint: number = 0;
            public static checkedIconVisible: number = 0;
            public static checkedTextViewStyle: number = 0;
            public static chipBackgroundColor: number = 0;
            public static chipCornerRadius: number = 0;
            public static chipEndPadding: number = 0;
            public static chipGroupStyle: number = 0;
            public static chipIcon: number = 0;
            public static chipIconEnabled: number = 0;
            public static chipIconSize: number = 0;
            public static chipIconTint: number = 0;
            public static chipIconVisible: number = 0;
            public static chipMinHeight: number = 0;
            public static chipMinTouchTargetSize: number = 0;
            public static chipSpacing: number = 0;
            public static chipSpacingHorizontal: number = 0;
            public static chipSpacingVertical: number = 0;
            public static chipStandaloneStyle: number = 0;
            public static chipStartPadding: number = 0;
            public static chipStrokeColor: number = 0;
            public static chipStrokeWidth: number = 0;
            public static chipStyle: number = 0;
            public static chipSurfaceColor: number = 0;
            public static circleRadius: number = 0;
            public static circularProgressIndicatorStyle: number = 0;
            public static clickAction: number = 0;
            public static clockFaceBackgroundColor: number = 0;
            public static clockHandColor: number = 0;
            public static clockIcon: number = 0;
            public static clockNumberTextColor: number = 0;
            public static closeIcon: number = 0;
            public static closeIconEnabled: number = 0;
            public static closeIconEndPadding: number = 0;
            public static closeIconSize: number = 0;
            public static closeIconStartPadding: number = 0;
            public static closeIconTint: number = 0;
            public static closeIconVisible: number = 0;
            public static closeItemLayout: number = 0;
            public static collapseContentDescription: number = 0;
            public static collapseIcon: number = 0;
            public static collapsedSize: number = 0;
            public static collapsedTitleGravity: number = 0;
            public static collapsedTitleTextAppearance: number = 0;
            public static collapsingToolbarLayoutStyle: number = 0;
            public static color: number = 0;
            public static colorAccent: number = 0;
            public static colorBackgroundFloating: number = 0;
            public static colorButtonNormal: number = 0;
            public static colorControlActivated: number = 0;
            public static colorControlHighlight: number = 0;
            public static colorControlNormal: number = 0;
            public static colorError: number = 0;
            public static colorOnBackground: number = 0;
            public static colorOnError: number = 0;
            public static colorOnPrimary: number = 0;
            public static colorOnPrimarySurface: number = 0;
            public static colorOnSecondary: number = 0;
            public static colorOnSurface: number = 0;
            public static colorPrimary: number = 0;
            public static colorPrimaryDark: number = 0;
            public static colorPrimarySurface: number = 0;
            public static colorPrimaryVariant: number = 0;
            public static colorSecondary: number = 0;
            public static colorSecondaryVariant: number = 0;
            public static colorSurface: number = 0;
            public static colorSwitchThumbNormal: number = 0;
            public static commitIcon: number = 0;
            public static constraintSet: number = 0;
            public static constraintSetEnd: number = 0;
            public static constraintSetStart: number = 0;
            public static constraint_referenced_ids: number = 0;
            public static constraints: number = 0;
            public static content: number = 0;
            public static contentDescription: number = 0;
            public static contentInsetEnd: number = 0;
            public static contentInsetEndWithActions: number = 0;
            public static contentInsetLeft: number = 0;
            public static contentInsetRight: number = 0;
            public static contentInsetStart: number = 0;
            public static contentInsetStartWithNavigation: number = 0;
            public static contentPadding: number = 0;
            public static contentPaddingBottom: number = 0;
            public static contentPaddingEnd: number = 0;
            public static contentPaddingLeft: number = 0;
            public static contentPaddingRight: number = 0;
            public static contentPaddingStart: number = 0;
            public static contentPaddingTop: number = 0;
            public static contentScrim: number = 0;
            public static contrast: number = 0;
            public static controlBackground: number = 0;
            public static coordinatorLayoutStyle: number = 0;
            public static cornerFamily: number = 0;
            public static cornerFamilyBottomLeft: number = 0;
            public static cornerFamilyBottomRight: number = 0;
            public static cornerFamilyTopLeft: number = 0;
            public static cornerFamilyTopRight: number = 0;
            public static cornerRadius: number = 0;
            public static cornerSize: number = 0;
            public static cornerSizeBottomLeft: number = 0;
            public static cornerSizeBottomRight: number = 0;
            public static cornerSizeTopLeft: number = 0;
            public static cornerSizeTopRight: number = 0;
            public static counterEnabled: number = 0;
            public static counterMaxLength: number = 0;
            public static counterOverflowTextAppearance: number = 0;
            public static counterOverflowTextColor: number = 0;
            public static counterTextAppearance: number = 0;
            public static counterTextColor: number = 0;
            public static crossfade: number = 0;
            public static currentState: number = 0;
            public static curveFit: number = 0;
            public static customBoolean: number = 0;
            public static customColorDrawableValue: number = 0;
            public static customColorValue: number = 0;
            public static customDimension: number = 0;
            public static customFloatValue: number = 0;
            public static customIntegerValue: number = 0;
            public static customNavigationLayout: number = 0;
            public static customPixelDimension: number = 0;
            public static customStringValue: number = 0;
            public static dayInvalidStyle: number = 0;
            public static daySelectedStyle: number = 0;
            public static dayStyle: number = 0;
            public static dayTodayStyle: number = 0;
            public static defaultDuration: number = 0;
            public static defaultQueryHint: number = 0;
            public static defaultState: number = 0;
            public static deltaPolarAngle: number = 0;
            public static deltaPolarRadius: number = 0;
            public static deriveConstraintsFrom: number = 0;
            public static dialogCornerRadius: number = 0;
            public static dialogPreferredPadding: number = 0;
            public static dialogTheme: number = 0;
            public static displayOptions: number = 0;
            public static divider: number = 0;
            public static dividerHorizontal: number = 0;
            public static dividerPadding: number = 0;
            public static dividerVertical: number = 0;
            public static dragDirection: number = 0;
            public static dragScale: number = 0;
            public static dragThreshold: number = 0;
            public static drawPath: number = 0;
            public static drawableBottomCompat: number = 0;
            public static drawableEndCompat: number = 0;
            public static drawableLeftCompat: number = 0;
            public static drawableRightCompat: number = 0;
            public static drawableSize: number = 0;
            public static drawableStartCompat: number = 0;
            public static drawableTint: number = 0;
            public static drawableTintMode: number = 0;
            public static drawableTopCompat: number = 0;
            public static drawerArrowStyle: number = 0;
            public static dropDownListViewStyle: number = 0;
            public static dropdownListPreferredItemHeight: number = 0;
            public static duration: number = 0;
            public static editTextBackground: number = 0;
            public static editTextColor: number = 0;
            public static editTextStyle: number = 0;
            public static elevation: number = 0;
            public static elevationOverlayColor: number = 0;
            public static elevationOverlayEnabled: number = 0;
            public static enableEdgeToEdge: number = 0;
            public static endIconCheckable: number = 0;
            public static endIconContentDescription: number = 0;
            public static endIconDrawable: number = 0;
            public static endIconMode: number = 0;
            public static endIconTint: number = 0;
            public static endIconTintMode: number = 0;
            public static enforceMaterialTheme: number = 0;
            public static enforceTextAppearance: number = 0;
            public static ensureMinTouchTargetSize: number = 0;
            public static errorContentDescription: number = 0;
            public static errorEnabled: number = 0;
            public static errorIconDrawable: number = 0;
            public static errorIconTint: number = 0;
            public static errorIconTintMode: number = 0;
            public static errorTextAppearance: number = 0;
            public static errorTextColor: number = 0;
            public static expandActivityOverflowButtonDrawable: number = 0;
            public static expanded: number = 0;
            public static expandedHintEnabled: number = 0;
            public static expandedTitleGravity: number = 0;
            public static expandedTitleMargin: number = 0;
            public static expandedTitleMarginBottom: number = 0;
            public static expandedTitleMarginEnd: number = 0;
            public static expandedTitleMarginStart: number = 0;
            public static expandedTitleMarginTop: number = 0;
            public static expandedTitleTextAppearance: number = 0;
            public static extendMotionSpec: number = 0;
            public static extendedFloatingActionButtonStyle: number = 0;
            public static extraMultilineHeightEnabled: number = 0;
            public static fabAlignmentMode: number = 0;
            public static fabAnimationMode: number = 0;
            public static fabCradleMargin: number = 0;
            public static fabCradleRoundedCornerRadius: number = 0;
            public static fabCradleVerticalOffset: number = 0;
            public static fabCustomSize: number = 0;
            public static fabSize: number = 0;
            public static fastScrollEnabled: number = 0;
            public static fastScrollHorizontalThumbDrawable: number = 0;
            public static fastScrollHorizontalTrackDrawable: number = 0;
            public static fastScrollVerticalThumbDrawable: number = 0;
            public static fastScrollVerticalTrackDrawable: number = 0;
            public static firstBaselineToTopHeight: number = 0;
            public static floatingActionButtonStyle: number = 0;
            public static flow_firstHorizontalBias: number = 0;
            public static flow_firstHorizontalStyle: number = 0;
            public static flow_firstVerticalBias: number = 0;
            public static flow_firstVerticalStyle: number = 0;
            public static flow_horizontalAlign: number = 0;
            public static flow_horizontalBias: number = 0;
            public static flow_horizontalGap: number = 0;
            public static flow_horizontalStyle: number = 0;
            public static flow_lastHorizontalBias: number = 0;
            public static flow_lastHorizontalStyle: number = 0;
            public static flow_lastVerticalBias: number = 0;
            public static flow_lastVerticalStyle: number = 0;
            public static flow_maxElementsWrap: number = 0;
            public static flow_padding: number = 0;
            public static flow_verticalAlign: number = 0;
            public static flow_verticalBias: number = 0;
            public static flow_verticalGap: number = 0;
            public static flow_verticalStyle: number = 0;
            public static flow_wrapMode: number = 0;
            public static font: number = 0;
            public static fontFamily: number = 0;
            public static fontProviderAuthority: number = 0;
            public static fontProviderCerts: number = 0;
            public static fontProviderFetchStrategy: number = 0;
            public static fontProviderFetchTimeout: number = 0;
            public static fontProviderPackage: number = 0;
            public static fontProviderQuery: number = 0;
            public static fontProviderSystemFontFamily: number = 0;
            public static fontStyle: number = 0;
            public static fontVariationSettings: number = 0;
            public static fontWeight: number = 0;
            public static forceApplySystemWindowInsetTop: number = 0;
            public static foregroundInsidePadding: number = 0;
            public static framePosition: number = 0;
            public static gapBetweenBars: number = 0;
            public static gestureInsetBottomIgnored: number = 0;
            public static goIcon: number = 0;
            public static haloColor: number = 0;
            public static haloRadius: number = 0;
            public static headerLayout: number = 0;
            public static height: number = 0;
            public static helperText: number = 0;
            public static helperTextEnabled: number = 0;
            public static helperTextTextAppearance: number = 0;
            public static helperTextTextColor: number = 0;
            public static hideAnimationBehavior: number = 0;
            public static hideMotionSpec: number = 0;
            public static hideOnContentScroll: number = 0;
            public static hideOnScroll: number = 0;
            public static hintAnimationEnabled: number = 0;
            public static hintEnabled: number = 0;
            public static hintTextAppearance: number = 0;
            public static hintTextColor: number = 0;
            public static homeAsUpIndicator: number = 0;
            public static homeLayout: number = 0;
            public static horizontalOffset: number = 0;
            public static hoveredFocusedTranslationZ: number = 0;
            public static icon: number = 0;
            public static iconEndPadding: number = 0;
            public static iconGravity: number = 0;
            public static iconPadding: number = 0;
            public static iconSize: number = 0;
            public static iconStartPadding: number = 0;
            public static iconTint: number = 0;
            public static iconTintMode: number = 0;
            public static iconifiedByDefault: number = 0;
            public static imageButtonStyle: number = 0;
            public static indeterminateAnimationType: number = 0;
            public static indeterminateProgressStyle: number = 0;
            public static indicatorColor: number = 0;
            public static indicatorDirectionCircular: number = 0;
            public static indicatorDirectionLinear: number = 0;
            public static indicatorInset: number = 0;
            public static indicatorSize: number = 0;
            public static initialActivityCount: number = 0;
            public static insetForeground: number = 0;
            public static isLightTheme: number = 0;
            public static isMaterialTheme: number = 0;
            public static itemBackground: number = 0;
            public static itemFillColor: number = 0;
            public static itemHorizontalPadding: number = 0;
            public static itemHorizontalTranslationEnabled: number = 0;
            public static itemIconPadding: number = 0;
            public static itemIconSize: number = 0;
            public static itemIconTint: number = 0;
            public static itemMaxLines: number = 0;
            public static itemPadding: number = 0;
            public static itemRippleColor: number = 0;
            public static itemShapeAppearance: number = 0;
            public static itemShapeAppearanceOverlay: number = 0;
            public static itemShapeFillColor: number = 0;
            public static itemShapeInsetBottom: number = 0;
            public static itemShapeInsetEnd: number = 0;
            public static itemShapeInsetStart: number = 0;
            public static itemShapeInsetTop: number = 0;
            public static itemSpacing: number = 0;
            public static itemStrokeColor: number = 0;
            public static itemStrokeWidth: number = 0;
            public static itemTextAppearance: number = 0;
            public static itemTextAppearanceActive: number = 0;
            public static itemTextAppearanceInactive: number = 0;
            public static itemTextColor: number = 0;
            public static keyPositionType: number = 0;
            public static keyboardIcon: number = 0;
            public static keylines: number = 0;
            public static lStar: number = 0;
            public static labelBehavior: number = 0;
            public static labelStyle: number = 0;
            public static labelVisibilityMode: number = 0;
            public static lastBaselineToBottomHeight: number = 0;
            public static layout: number = 0;
            public static layoutDescription: number = 0;
            public static layoutDuringTransition: number = 0;
            public static layoutManager: number = 0;
            public static layout_anchor: number = 0;
            public static layout_anchorGravity: number = 0;
            public static layout_behavior: number = 0;
            public static layout_collapseMode: number = 0;
            public static layout_collapseParallaxMultiplier: number = 0;
            public static layout_constrainedHeight: number = 0;
            public static layout_constrainedWidth: number = 0;
            public static layout_constraintBaseline_creator: number = 0;
            public static layout_constraintBaseline_toBaselineOf: number = 0;
            public static layout_constraintBottom_creator: number = 0;
            public static layout_constraintBottom_toBottomOf: number = 0;
            public static layout_constraintBottom_toTopOf: number = 0;
            public static layout_constraintCircle: number = 0;
            public static layout_constraintCircleAngle: number = 0;
            public static layout_constraintCircleRadius: number = 0;
            public static layout_constraintDimensionRatio: number = 0;
            public static layout_constraintEnd_toEndOf: number = 0;
            public static layout_constraintEnd_toStartOf: number = 0;
            public static layout_constraintGuide_begin: number = 0;
            public static layout_constraintGuide_end: number = 0;
            public static layout_constraintGuide_percent: number = 0;
            public static layout_constraintHeight_default: number = 0;
            public static layout_constraintHeight_max: number = 0;
            public static layout_constraintHeight_min: number = 0;
            public static layout_constraintHeight_percent: number = 0;
            public static layout_constraintHorizontal_bias: number = 0;
            public static layout_constraintHorizontal_chainStyle: number = 0;
            public static layout_constraintHorizontal_weight: number = 0;
            public static layout_constraintLeft_creator: number = 0;
            public static layout_constraintLeft_toLeftOf: number = 0;
            public static layout_constraintLeft_toRightOf: number = 0;
            public static layout_constraintRight_creator: number = 0;
            public static layout_constraintRight_toLeftOf: number = 0;
            public static layout_constraintRight_toRightOf: number = 0;
            public static layout_constraintStart_toEndOf: number = 0;
            public static layout_constraintStart_toStartOf: number = 0;
            public static layout_constraintTag: number = 0;
            public static layout_constraintTop_creator: number = 0;
            public static layout_constraintTop_toBottomOf: number = 0;
            public static layout_constraintTop_toTopOf: number = 0;
            public static layout_constraintVertical_bias: number = 0;
            public static layout_constraintVertical_chainStyle: number = 0;
            public static layout_constraintVertical_weight: number = 0;
            public static layout_constraintWidth_default: number = 0;
            public static layout_constraintWidth_max: number = 0;
            public static layout_constraintWidth_min: number = 0;
            public static layout_constraintWidth_percent: number = 0;
            public static layout_dodgeInsetEdges: number = 0;
            public static layout_editor_absoluteX: number = 0;
            public static layout_editor_absoluteY: number = 0;
            public static layout_goneMarginBottom: number = 0;
            public static layout_goneMarginEnd: number = 0;
            public static layout_goneMarginLeft: number = 0;
            public static layout_goneMarginRight: number = 0;
            public static layout_goneMarginStart: number = 0;
            public static layout_goneMarginTop: number = 0;
            public static layout_insetEdge: number = 0;
            public static layout_keyline: number = 0;
            public static layout_optimizationLevel: number = 0;
            public static layout_scrollFlags: number = 0;
            public static layout_scrollInterpolator: number = 0;
            public static liftOnScroll: number = 0;
            public static liftOnScrollTargetViewId: number = 0;
            public static limitBoundsTo: number = 0;
            public static lineHeight: number = 0;
            public static lineSpacing: number = 0;
            public static linearProgressIndicatorStyle: number = 0;
            public static listChoiceBackgroundIndicator: number = 0;
            public static listChoiceIndicatorMultipleAnimated: number = 0;
            public static listChoiceIndicatorSingleAnimated: number = 0;
            public static listDividerAlertDialog: number = 0;
            public static listItemLayout: number = 0;
            public static listLayout: number = 0;
            public static listMenuViewStyle: number = 0;
            public static listPopupWindowStyle: number = 0;
            public static listPreferredItemHeight: number = 0;
            public static listPreferredItemHeightLarge: number = 0;
            public static listPreferredItemHeightSmall: number = 0;
            public static listPreferredItemPaddingEnd: number = 0;
            public static listPreferredItemPaddingLeft: number = 0;
            public static listPreferredItemPaddingRight: number = 0;
            public static listPreferredItemPaddingStart: number = 0;
            public static logo: number = 0;
            public static logoDescription: number = 0;
            public static materialAlertDialogBodyTextStyle: number = 0;
            public static materialAlertDialogTheme: number = 0;
            public static materialAlertDialogTitleIconStyle: number = 0;
            public static materialAlertDialogTitlePanelStyle: number = 0;
            public static materialAlertDialogTitleTextStyle: number = 0;
            public static materialButtonOutlinedStyle: number = 0;
            public static materialButtonStyle: number = 0;
            public static materialButtonToggleGroupStyle: number = 0;
            public static materialCalendarDay: number = 0;
            public static materialCalendarFullscreenTheme: number = 0;
            public static materialCalendarHeaderCancelButton: number = 0;
            public static materialCalendarHeaderConfirmButton: number = 0;
            public static materialCalendarHeaderDivider: number = 0;
            public static materialCalendarHeaderLayout: number = 0;
            public static materialCalendarHeaderSelection: number = 0;
            public static materialCalendarHeaderTitle: number = 0;
            public static materialCalendarHeaderToggleButton: number = 0;
            public static materialCalendarMonth: number = 0;
            public static materialCalendarMonthNavigationButton: number = 0;
            public static materialCalendarStyle: number = 0;
            public static materialCalendarTheme: number = 0;
            public static materialCalendarYearNavigationButton: number = 0;
            public static materialCardViewStyle: number = 0;
            public static materialCircleRadius: number = 0;
            public static materialClockStyle: number = 0;
            public static materialThemeOverlay: number = 0;
            public static materialTimePickerStyle: number = 0;
            public static materialTimePickerTheme: number = 0;
            public static maxAcceleration: number = 0;
            public static maxActionInlineWidth: number = 0;
            public static maxButtonHeight: number = 0;
            public static maxCharacterCount: number = 0;
            public static maxHeight: number = 0;
            public static maxImageSize: number = 0;
            public static maxLines: number = 0;
            public static maxVelocity: number = 0;
            public static maxWidth: number = 0;
            public static measureWithLargestChild: number = 0;
            public static menu: number = 0;
            public static menuGravity: number = 0;
            public static minHeight: number = 0;
            public static minHideDelay: number = 0;
            public static minSeparation: number = 0;
            public static minTouchTargetSize: number = 0;
            public static minWidth: number = 0;
            public static mock_diagonalsColor: number = 0;
            public static mock_label: number = 0;
            public static mock_labelBackgroundColor: number = 0;
            public static mock_labelColor: number = 0;
            public static mock_showDiagonals: number = 0;
            public static mock_showLabel: number = 0;
            public static motionDebug: number = 0;
            public static motionDurationLong1: number = 0;
            public static motionDurationLong2: number = 0;
            public static motionDurationMedium1: number = 0;
            public static motionDurationMedium2: number = 0;
            public static motionDurationShort1: number = 0;
            public static motionDurationShort2: number = 0;
            public static motionEasingAccelerated: number = 0;
            public static motionEasingDecelerated: number = 0;
            public static motionEasingEmphasized: number = 0;
            public static motionEasingLinear: number = 0;
            public static motionEasingStandard: number = 0;
            public static motionInterpolator: number = 0;
            public static motionPath: number = 0;
            public static motionPathRotate: number = 0;
            public static motionProgress: number = 0;
            public static motionStagger: number = 0;
            public static motionTarget: number = 0;
            public static motion_postLayoutCollision: number = 0;
            public static motion_triggerOnCollision: number = 0;
            public static moveWhenScrollAtTop: number = 0;
            public static multiChoiceItemLayout: number = 0;
            public static navigationContentDescription: number = 0;
            public static navigationIcon: number = 0;
            public static navigationIconTint: number = 0;
            public static navigationMode: number = 0;
            public static navigationRailStyle: number = 0;
            public static navigationViewStyle: number = 0;
            public static nestedScrollFlags: number = 0;
            public static nestedScrollViewStyle: number = 0;
            public static nestedScrollable: number = 0;
            public static number: number = 0;
            public static numericModifiers: number = 0;
            public static onCross: number = 0;
            public static onHide: number = 0;
            public static onNegativeCross: number = 0;
            public static onPositiveCross: number = 0;
            public static onShow: number = 0;
            public static onTouchUp: number = 0;
            public static overlapAnchor: number = 0;
            public static overlay: number = 0;
            public static paddingBottomNoButtons: number = 0;
            public static paddingBottomSystemWindowInsets: number = 0;
            public static paddingEnd: number = 0;
            public static paddingLeftSystemWindowInsets: number = 0;
            public static paddingRightSystemWindowInsets: number = 0;
            public static paddingStart: number = 0;
            public static paddingTopNoTitle: number = 0;
            public static paddingTopSystemWindowInsets: number = 0;
            public static panelBackground: number = 0;
            public static panelMenuListTheme: number = 0;
            public static panelMenuListWidth: number = 0;
            public static passwordToggleContentDescription: number = 0;
            public static passwordToggleDrawable: number = 0;
            public static passwordToggleEnabled: number = 0;
            public static passwordToggleTint: number = 0;
            public static passwordToggleTintMode: number = 0;
            public static pathMotionArc: number = 0;
            public static path_percent: number = 0;
            public static percentHeight: number = 0;
            public static percentWidth: number = 0;
            public static percentX: number = 0;
            public static percentY: number = 0;
            public static perpendicularPath_percent: number = 0;
            public static pivotAnchor: number = 0;
            public static placeholderText: number = 0;
            public static placeholderTextAppearance: number = 0;
            public static placeholderTextColor: number = 0;
            public static placeholder_emptyVisibility: number = 0;
            public static popupMenuBackground: number = 0;
            public static popupMenuStyle: number = 0;
            public static popupTheme: number = 0;
            public static popupWindowStyle: number = 0;
            public static prefixText: number = 0;
            public static prefixTextAppearance: number = 0;
            public static prefixTextColor: number = 0;
            public static preserveIconSpacing: number = 0;
            public static pressedTranslationZ: number = 0;
            public static progressBarPadding: number = 0;
            public static progressBarStyle: number = 0;
            public static queryBackground: number = 0;
            public static queryHint: number = 0;
            public static queryPatterns: number = 0;
            public static radioButtonStyle: number = 0;
            public static rangeFillColor: number = 0;
            public static ratingBarStyle: number = 0;
            public static ratingBarStyleIndicator: number = 0;
            public static ratingBarStyleSmall: number = 0;
            public static recyclerViewStyle: number = 0;
            public static region_heightLessThan: number = 0;
            public static region_heightMoreThan: number = 0;
            public static region_widthLessThan: number = 0;
            public static region_widthMoreThan: number = 0;
            public static reverseLayout: number = 0;
            public static rippleColor: number = 0;
            public static round: number = 0;
            public static roundPercent: number = 0;
            public static saturation: number = 0;
            public static scrimAnimationDuration: number = 0;
            public static scrimBackground: number = 0;
            public static scrimVisibleHeightTrigger: number = 0;
            public static searchHintIcon: number = 0;
            public static searchIcon: number = 0;
            public static searchViewStyle: number = 0;
            public static seekBarStyle: number = 0;
            public static selectableItemBackground: number = 0;
            public static selectableItemBackgroundBorderless: number = 0;
            public static selectionRequired: number = 0;
            public static selectorSize: number = 0;
            public static shapeAppearance: number = 0;
            public static shapeAppearanceLargeComponent: number = 0;
            public static shapeAppearanceMediumComponent: number = 0;
            public static shapeAppearanceOverlay: number = 0;
            public static shapeAppearanceSmallComponent: number = 0;
            public static shortcutMatchRequired: number = 0;
            public static showAnimationBehavior: number = 0;
            public static showAsAction: number = 0;
            public static showDelay: number = 0;
            public static showDividers: number = 0;
            public static showMotionSpec: number = 0;
            public static showPaths: number = 0;
            public static showText: number = 0;
            public static showTitle: number = 0;
            public static shrinkMotionSpec: number = 0;
            public static singleChoiceItemLayout: number = 0;
            public static singleLine: number = 0;
            public static singleSelection: number = 0;
            public static sizePercent: number = 0;
            public static sliderStyle: number = 0;
            public static snackbarButtonStyle: number = 0;
            public static snackbarStyle: number = 0;
            public static snackbarTextViewStyle: number = 0;
            public static spanCount: number = 0;
            public static spinBars: number = 0;
            public static spinnerDropDownItemStyle: number = 0;
            public static spinnerStyle: number = 0;
            public static splitTrack: number = 0;
            public static srcCompat: number = 0;
            public static stackFromEnd: number = 0;
            public static staggered: number = 0;
            public static startIconCheckable: number = 0;
            public static startIconContentDescription: number = 0;
            public static startIconDrawable: number = 0;
            public static startIconTint: number = 0;
            public static startIconTintMode: number = 0;
            public static state_above_anchor: number = 0;
            public static state_collapsed: number = 0;
            public static state_collapsible: number = 0;
            public static state_dragged: number = 0;
            public static state_liftable: number = 0;
            public static state_lifted: number = 0;
            public static statusBarBackground: number = 0;
            public static statusBarForeground: number = 0;
            public static statusBarScrim: number = 0;
            public static strokeColor: number = 0;
            public static strokeWidth: number = 0;
            public static subMenuArrow: number = 0;
            public static submitBackground: number = 0;
            public static subtitle: number = 0;
            public static subtitleCentered: number = 0;
            public static subtitleTextAppearance: number = 0;
            public static subtitleTextColor: number = 0;
            public static subtitleTextStyle: number = 0;
            public static suffixText: number = 0;
            public static suffixTextAppearance: number = 0;
            public static suffixTextColor: number = 0;
            public static suggestionRowLayout: number = 0;
            public static switchMinWidth: number = 0;
            public static switchPadding: number = 0;
            public static switchStyle: number = 0;
            public static switchTextAppearance: number = 0;
            public static tabBackground: number = 0;
            public static tabContentStart: number = 0;
            public static tabGravity: number = 0;
            public static tabIconTint: number = 0;
            public static tabIconTintMode: number = 0;
            public static tabIndicator: number = 0;
            public static tabIndicatorAnimationDuration: number = 0;
            public static tabIndicatorAnimationMode: number = 0;
            public static tabIndicatorColor: number = 0;
            public static tabIndicatorFullWidth: number = 0;
            public static tabIndicatorGravity: number = 0;
            public static tabIndicatorHeight: number = 0;
            public static tabInlineLabel: number = 0;
            public static tabMaxWidth: number = 0;
            public static tabMinWidth: number = 0;
            public static tabMode: number = 0;
            public static tabPadding: number = 0;
            public static tabPaddingBottom: number = 0;
            public static tabPaddingEnd: number = 0;
            public static tabPaddingStart: number = 0;
            public static tabPaddingTop: number = 0;
            public static tabRippleColor: number = 0;
            public static tabSelectedTextColor: number = 0;
            public static tabStyle: number = 0;
            public static tabTextAppearance: number = 0;
            public static tabTextColor: number = 0;
            public static tabUnboundedRipple: number = 0;
            public static targetId: number = 0;
            public static telltales_tailColor: number = 0;
            public static telltales_tailScale: number = 0;
            public static telltales_velocityMode: number = 0;
            public static textAllCaps: number = 0;
            public static textAppearanceBody1: number = 0;
            public static textAppearanceBody2: number = 0;
            public static textAppearanceButton: number = 0;
            public static textAppearanceCaption: number = 0;
            public static textAppearanceHeadline1: number = 0;
            public static textAppearanceHeadline2: number = 0;
            public static textAppearanceHeadline3: number = 0;
            public static textAppearanceHeadline4: number = 0;
            public static textAppearanceHeadline5: number = 0;
            public static textAppearanceHeadline6: number = 0;
            public static textAppearanceLargePopupMenu: number = 0;
            public static textAppearanceLineHeightEnabled: number = 0;
            public static textAppearanceListItem: number = 0;
            public static textAppearanceListItemSecondary: number = 0;
            public static textAppearanceListItemSmall: number = 0;
            public static textAppearanceOverline: number = 0;
            public static textAppearancePopupMenuHeader: number = 0;
            public static textAppearanceSearchResultSubtitle: number = 0;
            public static textAppearanceSearchResultTitle: number = 0;
            public static textAppearanceSmallPopupMenu: number = 0;
            public static textAppearanceSubtitle1: number = 0;
            public static textAppearanceSubtitle2: number = 0;
            public static textColorAlertDialogListItem: number = 0;
            public static textColorSearchUrl: number = 0;
            public static textEndPadding: number = 0;
            public static textInputLayoutFocusedRectEnabled: number = 0;
            public static textInputStyle: number = 0;
            public static textLocale: number = 0;
            public static textStartPadding: number = 0;
            public static theme: number = 0;
            public static themeLineHeight: number = 0;
            public static thickness: number = 0;
            public static thumbColor: number = 0;
            public static thumbElevation: number = 0;
            public static thumbRadius: number = 0;
            public static thumbStrokeColor: number = 0;
            public static thumbStrokeWidth: number = 0;
            public static thumbTextPadding: number = 0;
            public static thumbTint: number = 0;
            public static thumbTintMode: number = 0;
            public static tickColor: number = 0;
            public static tickColorActive: number = 0;
            public static tickColorInactive: number = 0;
            public static tickMark: number = 0;
            public static tickMarkTint: number = 0;
            public static tickMarkTintMode: number = 0;
            public static tickVisible: number = 0;
            public static tint: number = 0;
            public static tintMode: number = 0;
            public static title: number = 0;
            public static titleCentered: number = 0;
            public static titleCollapseMode: number = 0;
            public static titleEnabled: number = 0;
            public static titleMargin: number = 0;
            public static titleMarginBottom: number = 0;
            public static titleMarginEnd: number = 0;
            public static titleMarginStart: number = 0;
            public static titleMarginTop: number = 0;
            public static titleMargins: number = 0;
            public static titleTextAppearance: number = 0;
            public static titleTextColor: number = 0;
            public static titleTextStyle: number = 0;
            public static toolbarId: number = 0;
            public static toolbarNavigationButtonStyle: number = 0;
            public static toolbarStyle: number = 0;
            public static tooltipForegroundColor: number = 0;
            public static tooltipFrameBackground: number = 0;
            public static tooltipStyle: number = 0;
            public static tooltipText: number = 0;
            public static touchAnchorId: number = 0;
            public static touchAnchorSide: number = 0;
            public static touchRegionId: number = 0;
            public static track: number = 0;
            public static trackColor: number = 0;
            public static trackColorActive: number = 0;
            public static trackColorInactive: number = 0;
            public static trackCornerRadius: number = 0;
            public static trackHeight: number = 0;
            public static trackThickness: number = 0;
            public static trackTint: number = 0;
            public static trackTintMode: number = 0;
            public static transitionDisable: number = 0;
            public static transitionEasing: number = 0;
            public static transitionFlags: number = 0;
            public static transitionPathRotate: number = 0;
            public static transitionShapeAppearance: number = 0;
            public static triggerId: number = 0;
            public static triggerReceiver: number = 0;
            public static triggerSlack: number = 0;
            public static ttcIndex: number = 0;
            public static useCompatPadding: number = 0;
            public static useMaterialThemeColors: number = 0;
            public static values: number = 0;
            public static verticalOffset: number = 0;
            public static viewInflaterClass: number = 0;
            public static visibilityMode: number = 0;
            public static voiceIcon: number = 0;
            public static warmth: number = 0;
            public static waveDecay: number = 0;
            public static waveOffset: number = 0;
            public static wavePeriod: number = 0;
            public static waveShape: number = 0;
            public static waveVariesBy: number = 0;
            public static windowActionBar: number = 0;
            public static windowActionBarOverlay: number = 0;
            public static windowActionModeOverlay: number = 0;
            public static windowFixedHeightMajor: number = 0;
            public static windowFixedHeightMinor: number = 0;
            public static windowFixedWidthMajor: number = 0;
            public static windowFixedWidthMinor: number = 0;
            public static windowMinWidthMajor: number = 0;
            public static windowMinWidthMinor: number = 0;
            public static windowNoTitle: number = 0;
            public static yearSelectedStyle: number = 0;
            public static yearStyle: number = 0;
            public static yearTodayStyle: number = 0;
          }
          export class bool {
            public static class: java.lang.Class<com.cloudinary.android.core.R.bool>;
            public static abc_action_bar_embed_tabs: number = 0;
            public static abc_allow_stacked_button_bar: number = 0;
            public static abc_config_actionMenuItemAllCaps: number = 0;
            public static enable_system_alarm_service_default: number = 0;
            public static enable_system_foreground_service_default: number = 0;
            public static enable_system_job_service_default: number = 0;
            public static mtrl_btn_textappearance_all_caps: number = 0;
            public static workmanager_test_configuration: number = 0;
          }
          export class color {
            public static class: java.lang.Class<com.cloudinary.android.core.R.color>;
            public static abc_background_cache_hint_selector_material_dark: number = 0;
            public static abc_background_cache_hint_selector_material_light: number = 0;
            public static abc_btn_colored_borderless_text_material: number = 0;
            public static abc_btn_colored_text_material: number = 0;
            public static abc_color_highlight_material: number = 0;
            public static abc_decor_view_status_guard: number = 0;
            public static abc_decor_view_status_guard_light: number = 0;
            public static abc_hint_foreground_material_dark: number = 0;
            public static abc_hint_foreground_material_light: number = 0;
            public static abc_primary_text_disable_only_material_dark: number = 0;
            public static abc_primary_text_disable_only_material_light: number = 0;
            public static abc_primary_text_material_dark: number = 0;
            public static abc_primary_text_material_light: number = 0;
            public static abc_search_url_text: number = 0;
            public static abc_search_url_text_normal: number = 0;
            public static abc_search_url_text_pressed: number = 0;
            public static abc_search_url_text_selected: number = 0;
            public static abc_secondary_text_material_dark: number = 0;
            public static abc_secondary_text_material_light: number = 0;
            public static abc_tint_btn_checkable: number = 0;
            public static abc_tint_default: number = 0;
            public static abc_tint_edittext: number = 0;
            public static abc_tint_seek_thumb: number = 0;
            public static abc_tint_spinner: number = 0;
            public static abc_tint_switch_track: number = 0;
            public static accent_material_dark: number = 0;
            public static accent_material_light: number = 0;
            public static androidx_core_ripple_material_light: number = 0;
            public static androidx_core_secondary_text_default_material_light: number = 0;
            public static background_floating_material_dark: number = 0;
            public static background_floating_material_light: number = 0;
            public static background_material_dark: number = 0;
            public static background_material_light: number = 0;
            public static bright_foreground_disabled_material_dark: number = 0;
            public static bright_foreground_disabled_material_light: number = 0;
            public static bright_foreground_inverse_material_dark: number = 0;
            public static bright_foreground_inverse_material_light: number = 0;
            public static bright_foreground_material_dark: number = 0;
            public static bright_foreground_material_light: number = 0;
            public static button_material_dark: number = 0;
            public static button_material_light: number = 0;
            public static cardview_dark_background: number = 0;
            public static cardview_light_background: number = 0;
            public static cardview_shadow_end_color: number = 0;
            public static cardview_shadow_start_color: number = 0;
            public static checkbox_themeable_attribute_color: number = 0;
            public static design_bottom_navigation_shadow_color: number = 0;
            public static design_box_stroke_color: number = 0;
            public static design_dark_default_color_background: number = 0;
            public static design_dark_default_color_error: number = 0;
            public static design_dark_default_color_on_background: number = 0;
            public static design_dark_default_color_on_error: number = 0;
            public static design_dark_default_color_on_primary: number = 0;
            public static design_dark_default_color_on_secondary: number = 0;
            public static design_dark_default_color_on_surface: number = 0;
            public static design_dark_default_color_primary: number = 0;
            public static design_dark_default_color_primary_dark: number = 0;
            public static design_dark_default_color_primary_variant: number = 0;
            public static design_dark_default_color_secondary: number = 0;
            public static design_dark_default_color_secondary_variant: number = 0;
            public static design_dark_default_color_surface: number = 0;
            public static design_default_color_background: number = 0;
            public static design_default_color_error: number = 0;
            public static design_default_color_on_background: number = 0;
            public static design_default_color_on_error: number = 0;
            public static design_default_color_on_primary: number = 0;
            public static design_default_color_on_secondary: number = 0;
            public static design_default_color_on_surface: number = 0;
            public static design_default_color_primary: number = 0;
            public static design_default_color_primary_dark: number = 0;
            public static design_default_color_primary_variant: number = 0;
            public static design_default_color_secondary: number = 0;
            public static design_default_color_secondary_variant: number = 0;
            public static design_default_color_surface: number = 0;
            public static design_error: number = 0;
            public static design_fab_shadow_end_color: number = 0;
            public static design_fab_shadow_mid_color: number = 0;
            public static design_fab_shadow_start_color: number = 0;
            public static design_fab_stroke_end_inner_color: number = 0;
            public static design_fab_stroke_end_outer_color: number = 0;
            public static design_fab_stroke_top_inner_color: number = 0;
            public static design_fab_stroke_top_outer_color: number = 0;
            public static design_icon_tint: number = 0;
            public static design_snackbar_background_color: number = 0;
            public static dim_foreground_disabled_material_dark: number = 0;
            public static dim_foreground_disabled_material_light: number = 0;
            public static dim_foreground_material_dark: number = 0;
            public static dim_foreground_material_light: number = 0;
            public static error_color_material_dark: number = 0;
            public static error_color_material_light: number = 0;
            public static foreground_material_dark: number = 0;
            public static foreground_material_light: number = 0;
            public static highlighted_text_material_dark: number = 0;
            public static highlighted_text_material_light: number = 0;
            public static material_blue_grey_800: number = 0;
            public static material_blue_grey_900: number = 0;
            public static material_blue_grey_950: number = 0;
            public static material_cursor_color: number = 0;
            public static material_deep_teal_200: number = 0;
            public static material_deep_teal_500: number = 0;
            public static material_grey_100: number = 0;
            public static material_grey_300: number = 0;
            public static material_grey_50: number = 0;
            public static material_grey_600: number = 0;
            public static material_grey_800: number = 0;
            public static material_grey_850: number = 0;
            public static material_grey_900: number = 0;
            public static material_on_background_disabled: number = 0;
            public static material_on_background_emphasis_high_type: number = 0;
            public static material_on_background_emphasis_medium: number = 0;
            public static material_on_primary_disabled: number = 0;
            public static material_on_primary_emphasis_high_type: number = 0;
            public static material_on_primary_emphasis_medium: number = 0;
            public static material_on_surface_disabled: number = 0;
            public static material_on_surface_emphasis_high_type: number = 0;
            public static material_on_surface_emphasis_medium: number = 0;
            public static material_on_surface_stroke: number = 0;
            public static material_slider_active_tick_marks_color: number = 0;
            public static material_slider_active_track_color: number = 0;
            public static material_slider_halo_color: number = 0;
            public static material_slider_inactive_tick_marks_color: number = 0;
            public static material_slider_inactive_track_color: number = 0;
            public static material_slider_thumb_color: number = 0;
            public static material_timepicker_button_background: number = 0;
            public static material_timepicker_button_stroke: number = 0;
            public static material_timepicker_clock_text_color: number = 0;
            public static material_timepicker_clockface: number = 0;
            public static material_timepicker_modebutton_tint: number = 0;
            public static mtrl_btn_bg_color_selector: number = 0;
            public static mtrl_btn_ripple_color: number = 0;
            public static mtrl_btn_stroke_color_selector: number = 0;
            public static mtrl_btn_text_btn_bg_color_selector: number = 0;
            public static mtrl_btn_text_btn_ripple_color: number = 0;
            public static mtrl_btn_text_color_disabled: number = 0;
            public static mtrl_btn_text_color_selector: number = 0;
            public static mtrl_btn_transparent_bg_color: number = 0;
            public static mtrl_calendar_item_stroke_color: number = 0;
            public static mtrl_calendar_selected_range: number = 0;
            public static mtrl_card_view_foreground: number = 0;
            public static mtrl_card_view_ripple: number = 0;
            public static mtrl_chip_background_color: number = 0;
            public static mtrl_chip_close_icon_tint: number = 0;
            public static mtrl_chip_surface_color: number = 0;
            public static mtrl_chip_text_color: number = 0;
            public static mtrl_choice_chip_background_color: number = 0;
            public static mtrl_choice_chip_ripple_color: number = 0;
            public static mtrl_choice_chip_text_color: number = 0;
            public static mtrl_error: number = 0;
            public static mtrl_fab_bg_color_selector: number = 0;
            public static mtrl_fab_icon_text_color_selector: number = 0;
            public static mtrl_fab_ripple_color: number = 0;
            public static mtrl_filled_background_color: number = 0;
            public static mtrl_filled_icon_tint: number = 0;
            public static mtrl_filled_stroke_color: number = 0;
            public static mtrl_indicator_text_color: number = 0;
            public static mtrl_navigation_bar_colored_item_tint: number = 0;
            public static mtrl_navigation_bar_colored_ripple_color: number = 0;
            public static mtrl_navigation_bar_item_tint: number = 0;
            public static mtrl_navigation_bar_ripple_color: number = 0;
            public static mtrl_navigation_item_background_color: number = 0;
            public static mtrl_navigation_item_icon_tint: number = 0;
            public static mtrl_navigation_item_text_color: number = 0;
            public static mtrl_on_primary_text_btn_text_color_selector: number = 0;
            public static mtrl_on_surface_ripple_color: number = 0;
            public static mtrl_outlined_icon_tint: number = 0;
            public static mtrl_outlined_stroke_color: number = 0;
            public static mtrl_popupmenu_overlay_color: number = 0;
            public static mtrl_scrim_color: number = 0;
            public static mtrl_tabs_colored_ripple_color: number = 0;
            public static mtrl_tabs_icon_color_selector: number = 0;
            public static mtrl_tabs_icon_color_selector_colored: number = 0;
            public static mtrl_tabs_legacy_text_color_selector: number = 0;
            public static mtrl_tabs_ripple_color: number = 0;
            public static mtrl_text_btn_text_color_selector: number = 0;
            public static mtrl_textinput_default_box_stroke_color: number = 0;
            public static mtrl_textinput_disabled_color: number = 0;
            public static mtrl_textinput_filled_box_default_background_color: number = 0;
            public static mtrl_textinput_focused_box_stroke_color: number = 0;
            public static mtrl_textinput_hovered_box_stroke_color: number = 0;
            public static notification_action_color_filter: number = 0;
            public static notification_icon_bg_color: number = 0;
            public static notification_material_background_media_default_color: number = 0;
            public static primary_dark_material_dark: number = 0;
            public static primary_dark_material_light: number = 0;
            public static primary_material_dark: number = 0;
            public static primary_material_light: number = 0;
            public static primary_text_default_material_dark: number = 0;
            public static primary_text_default_material_light: number = 0;
            public static primary_text_disabled_material_dark: number = 0;
            public static primary_text_disabled_material_light: number = 0;
            public static radiobutton_themeable_attribute_color: number = 0;
            public static ripple_material_dark: number = 0;
            public static ripple_material_light: number = 0;
            public static secondary_text_default_material_dark: number = 0;
            public static secondary_text_default_material_light: number = 0;
            public static secondary_text_disabled_material_dark: number = 0;
            public static secondary_text_disabled_material_light: number = 0;
            public static switch_thumb_disabled_material_dark: number = 0;
            public static switch_thumb_disabled_material_light: number = 0;
            public static switch_thumb_material_dark: number = 0;
            public static switch_thumb_material_light: number = 0;
            public static switch_thumb_normal_material_dark: number = 0;
            public static switch_thumb_normal_material_light: number = 0;
            public static test_mtrl_calendar_day: number = 0;
            public static test_mtrl_calendar_day_selected: number = 0;
            public static tooltip_background_dark: number = 0;
            public static tooltip_background_light: number = 0;
          }
          export class dimen {
            public static class: java.lang.Class<com.cloudinary.android.core.R.dimen>;
            public static abc_action_bar_content_inset_material: number = 0;
            public static abc_action_bar_content_inset_with_nav: number = 0;
            public static abc_action_bar_default_height_material: number = 0;
            public static abc_action_bar_default_padding_end_material: number = 0;
            public static abc_action_bar_default_padding_start_material: number = 0;
            public static abc_action_bar_elevation_material: number = 0;
            public static abc_action_bar_icon_vertical_padding_material: number = 0;
            public static abc_action_bar_overflow_padding_end_material: number = 0;
            public static abc_action_bar_overflow_padding_start_material: number = 0;
            public static abc_action_bar_stacked_max_height: number = 0;
            public static abc_action_bar_stacked_tab_max_width: number = 0;
            public static abc_action_bar_subtitle_bottom_margin_material: number = 0;
            public static abc_action_bar_subtitle_top_margin_material: number = 0;
            public static abc_action_button_min_height_material: number = 0;
            public static abc_action_button_min_width_material: number = 0;
            public static abc_action_button_min_width_overflow_material: number = 0;
            public static abc_alert_dialog_button_bar_height: number = 0;
            public static abc_alert_dialog_button_dimen: number = 0;
            public static abc_button_inset_horizontal_material: number = 0;
            public static abc_button_inset_vertical_material: number = 0;
            public static abc_button_padding_horizontal_material: number = 0;
            public static abc_button_padding_vertical_material: number = 0;
            public static abc_cascading_menus_min_smallest_width: number = 0;
            public static abc_config_prefDialogWidth: number = 0;
            public static abc_control_corner_material: number = 0;
            public static abc_control_inset_material: number = 0;
            public static abc_control_padding_material: number = 0;
            public static abc_dialog_corner_radius_material: number = 0;
            public static abc_dialog_fixed_height_major: number = 0;
            public static abc_dialog_fixed_height_minor: number = 0;
            public static abc_dialog_fixed_width_major: number = 0;
            public static abc_dialog_fixed_width_minor: number = 0;
            public static abc_dialog_list_padding_bottom_no_buttons: number = 0;
            public static abc_dialog_list_padding_top_no_title: number = 0;
            public static abc_dialog_min_width_major: number = 0;
            public static abc_dialog_min_width_minor: number = 0;
            public static abc_dialog_padding_material: number = 0;
            public static abc_dialog_padding_top_material: number = 0;
            public static abc_dialog_title_divider_material: number = 0;
            public static abc_disabled_alpha_material_dark: number = 0;
            public static abc_disabled_alpha_material_light: number = 0;
            public static abc_dropdownitem_icon_width: number = 0;
            public static abc_dropdownitem_text_padding_left: number = 0;
            public static abc_dropdownitem_text_padding_right: number = 0;
            public static abc_edit_text_inset_bottom_material: number = 0;
            public static abc_edit_text_inset_horizontal_material: number = 0;
            public static abc_edit_text_inset_top_material: number = 0;
            public static abc_floating_window_z: number = 0;
            public static abc_list_item_height_large_material: number = 0;
            public static abc_list_item_height_material: number = 0;
            public static abc_list_item_height_small_material: number = 0;
            public static abc_list_item_padding_horizontal_material: number = 0;
            public static abc_panel_menu_list_width: number = 0;
            public static abc_progress_bar_height_material: number = 0;
            public static abc_search_view_preferred_height: number = 0;
            public static abc_search_view_preferred_width: number = 0;
            public static abc_seekbar_track_background_height_material: number = 0;
            public static abc_seekbar_track_progress_height_material: number = 0;
            public static abc_select_dialog_padding_start_material: number = 0;
            public static abc_star_big: number = 0;
            public static abc_star_medium: number = 0;
            public static abc_star_small: number = 0;
            public static abc_switch_padding: number = 0;
            public static abc_text_size_body_1_material: number = 0;
            public static abc_text_size_body_2_material: number = 0;
            public static abc_text_size_button_material: number = 0;
            public static abc_text_size_caption_material: number = 0;
            public static abc_text_size_display_1_material: number = 0;
            public static abc_text_size_display_2_material: number = 0;
            public static abc_text_size_display_3_material: number = 0;
            public static abc_text_size_display_4_material: number = 0;
            public static abc_text_size_headline_material: number = 0;
            public static abc_text_size_large_material: number = 0;
            public static abc_text_size_medium_material: number = 0;
            public static abc_text_size_menu_header_material: number = 0;
            public static abc_text_size_menu_material: number = 0;
            public static abc_text_size_small_material: number = 0;
            public static abc_text_size_subhead_material: number = 0;
            public static abc_text_size_subtitle_material_toolbar: number = 0;
            public static abc_text_size_title_material: number = 0;
            public static abc_text_size_title_material_toolbar: number = 0;
            public static action_bar_size: number = 0;
            public static appcompat_dialog_background_inset: number = 0;
            public static cardview_compat_inset_shadow: number = 0;
            public static cardview_default_elevation: number = 0;
            public static cardview_default_radius: number = 0;
            public static clock_face_margin_start: number = 0;
            public static compat_button_inset_horizontal_material: number = 0;
            public static compat_button_inset_vertical_material: number = 0;
            public static compat_button_padding_horizontal_material: number = 0;
            public static compat_button_padding_vertical_material: number = 0;
            public static compat_control_corner_material: number = 0;
            public static compat_notification_large_icon_max_height: number = 0;
            public static compat_notification_large_icon_max_width: number = 0;
            public static default_dimension: number = 0;
            public static design_appbar_elevation: number = 0;
            public static design_bottom_navigation_active_item_max_width: number = 0;
            public static design_bottom_navigation_active_item_min_width: number = 0;
            public static design_bottom_navigation_active_text_size: number = 0;
            public static design_bottom_navigation_elevation: number = 0;
            public static design_bottom_navigation_height: number = 0;
            public static design_bottom_navigation_icon_size: number = 0;
            public static design_bottom_navigation_item_max_width: number = 0;
            public static design_bottom_navigation_item_min_width: number = 0;
            public static design_bottom_navigation_label_padding: number = 0;
            public static design_bottom_navigation_margin: number = 0;
            public static design_bottom_navigation_shadow_height: number = 0;
            public static design_bottom_navigation_text_size: number = 0;
            public static design_bottom_sheet_elevation: number = 0;
            public static design_bottom_sheet_modal_elevation: number = 0;
            public static design_bottom_sheet_peek_height_min: number = 0;
            public static design_fab_border_width: number = 0;
            public static design_fab_elevation: number = 0;
            public static design_fab_image_size: number = 0;
            public static design_fab_size_mini: number = 0;
            public static design_fab_size_normal: number = 0;
            public static design_fab_translation_z_hovered_focused: number = 0;
            public static design_fab_translation_z_pressed: number = 0;
            public static design_navigation_elevation: number = 0;
            public static design_navigation_icon_padding: number = 0;
            public static design_navigation_icon_size: number = 0;
            public static design_navigation_item_horizontal_padding: number = 0;
            public static design_navigation_item_icon_padding: number = 0;
            public static design_navigation_max_width: number = 0;
            public static design_navigation_padding_bottom: number = 0;
            public static design_navigation_separator_vertical_padding: number = 0;
            public static design_snackbar_action_inline_max_width: number = 0;
            public static design_snackbar_action_text_color_alpha: number = 0;
            public static design_snackbar_background_corner_radius: number = 0;
            public static design_snackbar_elevation: number = 0;
            public static design_snackbar_extra_spacing_horizontal: number = 0;
            public static design_snackbar_max_width: number = 0;
            public static design_snackbar_min_width: number = 0;
            public static design_snackbar_padding_horizontal: number = 0;
            public static design_snackbar_padding_vertical: number = 0;
            public static design_snackbar_padding_vertical_2lines: number = 0;
            public static design_snackbar_text_size: number = 0;
            public static design_tab_max_width: number = 0;
            public static design_tab_scrollable_min_width: number = 0;
            public static design_tab_text_size: number = 0;
            public static design_tab_text_size_2line: number = 0;
            public static design_textinput_caption_translate_y: number = 0;
            public static disabled_alpha_material_dark: number = 0;
            public static disabled_alpha_material_light: number = 0;
            public static fastscroll_default_thickness: number = 0;
            public static fastscroll_margin: number = 0;
            public static fastscroll_minimum_range: number = 0;
            public static highlight_alpha_material_colored: number = 0;
            public static highlight_alpha_material_dark: number = 0;
            public static highlight_alpha_material_light: number = 0;
            public static hint_alpha_material_dark: number = 0;
            public static hint_alpha_material_light: number = 0;
            public static hint_pressed_alpha_material_dark: number = 0;
            public static hint_pressed_alpha_material_light: number = 0;
            public static item_touch_helper_max_drag_scroll_per_frame: number = 0;
            public static item_touch_helper_swipe_escape_max_velocity: number = 0;
            public static item_touch_helper_swipe_escape_velocity: number = 0;
            public static material_bottom_sheet_max_width: number = 0;
            public static material_clock_display_padding: number = 0;
            public static material_clock_face_margin_top: number = 0;
            public static material_clock_hand_center_dot_radius: number = 0;
            public static material_clock_hand_padding: number = 0;
            public static material_clock_hand_stroke_width: number = 0;
            public static material_clock_number_text_size: number = 0;
            public static material_clock_period_toggle_height: number = 0;
            public static material_clock_period_toggle_margin_left: number = 0;
            public static material_clock_period_toggle_width: number = 0;
            public static material_clock_size: number = 0;
            public static material_cursor_inset_bottom: number = 0;
            public static material_cursor_inset_top: number = 0;
            public static material_cursor_width: number = 0;
            public static material_emphasis_disabled: number = 0;
            public static material_emphasis_high_type: number = 0;
            public static material_emphasis_medium: number = 0;
            public static material_filled_edittext_font_1_3_padding_bottom: number = 0;
            public static material_filled_edittext_font_1_3_padding_top: number = 0;
            public static material_filled_edittext_font_2_0_padding_bottom: number = 0;
            public static material_filled_edittext_font_2_0_padding_top: number = 0;
            public static material_font_1_3_box_collapsed_padding_top: number = 0;
            public static material_font_2_0_box_collapsed_padding_top: number = 0;
            public static material_helper_text_default_padding_top: number = 0;
            public static material_helper_text_font_1_3_padding_horizontal: number = 0;
            public static material_helper_text_font_1_3_padding_top: number = 0;
            public static material_input_text_to_prefix_suffix_padding: number = 0;
            public static material_text_view_test_line_height: number = 0;
            public static material_text_view_test_line_height_override: number = 0;
            public static material_textinput_default_width: number = 0;
            public static material_textinput_max_width: number = 0;
            public static material_textinput_min_width: number = 0;
            public static material_time_picker_minimum_screen_height: number = 0;
            public static material_time_picker_minimum_screen_width: number = 0;
            public static material_timepicker_dialog_buttons_margin_top: number = 0;
            public static mtrl_alert_dialog_background_inset_bottom: number = 0;
            public static mtrl_alert_dialog_background_inset_end: number = 0;
            public static mtrl_alert_dialog_background_inset_start: number = 0;
            public static mtrl_alert_dialog_background_inset_top: number = 0;
            public static mtrl_alert_dialog_picker_background_inset: number = 0;
            public static mtrl_badge_horizontal_edge_offset: number = 0;
            public static mtrl_badge_long_text_horizontal_padding: number = 0;
            public static mtrl_badge_radius: number = 0;
            public static mtrl_badge_text_horizontal_edge_offset: number = 0;
            public static mtrl_badge_text_size: number = 0;
            public static mtrl_badge_toolbar_action_menu_item_horizontal_offset: number = 0;
            public static mtrl_badge_toolbar_action_menu_item_vertical_offset: number = 0;
            public static mtrl_badge_with_text_radius: number = 0;
            public static mtrl_bottomappbar_fabOffsetEndMode: number = 0;
            public static mtrl_bottomappbar_fab_bottom_margin: number = 0;
            public static mtrl_bottomappbar_fab_cradle_margin: number = 0;
            public static mtrl_bottomappbar_fab_cradle_rounded_corner_radius: number = 0;
            public static mtrl_bottomappbar_fab_cradle_vertical_offset: number = 0;
            public static mtrl_bottomappbar_height: number = 0;
            public static mtrl_btn_corner_radius: number = 0;
            public static mtrl_btn_dialog_btn_min_width: number = 0;
            public static mtrl_btn_disabled_elevation: number = 0;
            public static mtrl_btn_disabled_z: number = 0;
            public static mtrl_btn_elevation: number = 0;
            public static mtrl_btn_focused_z: number = 0;
            public static mtrl_btn_hovered_z: number = 0;
            public static mtrl_btn_icon_btn_padding_left: number = 0;
            public static mtrl_btn_icon_padding: number = 0;
            public static mtrl_btn_inset: number = 0;
            public static mtrl_btn_letter_spacing: number = 0;
            public static mtrl_btn_max_width: number = 0;
            public static mtrl_btn_padding_bottom: number = 0;
            public static mtrl_btn_padding_left: number = 0;
            public static mtrl_btn_padding_right: number = 0;
            public static mtrl_btn_padding_top: number = 0;
            public static mtrl_btn_pressed_z: number = 0;
            public static mtrl_btn_snackbar_margin_horizontal: number = 0;
            public static mtrl_btn_stroke_size: number = 0;
            public static mtrl_btn_text_btn_icon_padding: number = 0;
            public static mtrl_btn_text_btn_padding_left: number = 0;
            public static mtrl_btn_text_btn_padding_right: number = 0;
            public static mtrl_btn_text_size: number = 0;
            public static mtrl_btn_z: number = 0;
            public static mtrl_calendar_action_confirm_button_min_width: number = 0;
            public static mtrl_calendar_action_height: number = 0;
            public static mtrl_calendar_action_padding: number = 0;
            public static mtrl_calendar_bottom_padding: number = 0;
            public static mtrl_calendar_content_padding: number = 0;
            public static mtrl_calendar_day_corner: number = 0;
            public static mtrl_calendar_day_height: number = 0;
            public static mtrl_calendar_day_horizontal_padding: number = 0;
            public static mtrl_calendar_day_today_stroke: number = 0;
            public static mtrl_calendar_day_vertical_padding: number = 0;
            public static mtrl_calendar_day_width: number = 0;
            public static mtrl_calendar_days_of_week_height: number = 0;
            public static mtrl_calendar_dialog_background_inset: number = 0;
            public static mtrl_calendar_header_content_padding: number = 0;
            public static mtrl_calendar_header_content_padding_fullscreen: number = 0;
            public static mtrl_calendar_header_divider_thickness: number = 0;
            public static mtrl_calendar_header_height: number = 0;
            public static mtrl_calendar_header_height_fullscreen: number = 0;
            public static mtrl_calendar_header_selection_line_height: number = 0;
            public static mtrl_calendar_header_text_padding: number = 0;
            public static mtrl_calendar_header_toggle_margin_bottom: number = 0;
            public static mtrl_calendar_header_toggle_margin_top: number = 0;
            public static mtrl_calendar_landscape_header_width: number = 0;
            public static mtrl_calendar_maximum_default_fullscreen_minor_axis: number = 0;
            public static mtrl_calendar_month_horizontal_padding: number = 0;
            public static mtrl_calendar_month_vertical_padding: number = 0;
            public static mtrl_calendar_navigation_bottom_padding: number = 0;
            public static mtrl_calendar_navigation_height: number = 0;
            public static mtrl_calendar_navigation_top_padding: number = 0;
            public static mtrl_calendar_pre_l_text_clip_padding: number = 0;
            public static mtrl_calendar_selection_baseline_to_top_fullscreen: number = 0;
            public static mtrl_calendar_selection_text_baseline_to_bottom: number = 0;
            public static mtrl_calendar_selection_text_baseline_to_bottom_fullscreen: number = 0;
            public static mtrl_calendar_selection_text_baseline_to_top: number = 0;
            public static mtrl_calendar_text_input_padding_top: number = 0;
            public static mtrl_calendar_title_baseline_to_top: number = 0;
            public static mtrl_calendar_title_baseline_to_top_fullscreen: number = 0;
            public static mtrl_calendar_year_corner: number = 0;
            public static mtrl_calendar_year_height: number = 0;
            public static mtrl_calendar_year_horizontal_padding: number = 0;
            public static mtrl_calendar_year_vertical_padding: number = 0;
            public static mtrl_calendar_year_width: number = 0;
            public static mtrl_card_checked_icon_margin: number = 0;
            public static mtrl_card_checked_icon_size: number = 0;
            public static mtrl_card_corner_radius: number = 0;
            public static mtrl_card_dragged_z: number = 0;
            public static mtrl_card_elevation: number = 0;
            public static mtrl_card_spacing: number = 0;
            public static mtrl_chip_pressed_translation_z: number = 0;
            public static mtrl_chip_text_size: number = 0;
            public static mtrl_edittext_rectangle_top_offset: number = 0;
            public static mtrl_exposed_dropdown_menu_popup_elevation: number = 0;
            public static mtrl_exposed_dropdown_menu_popup_vertical_offset: number = 0;
            public static mtrl_exposed_dropdown_menu_popup_vertical_padding: number = 0;
            public static mtrl_extended_fab_bottom_padding: number = 0;
            public static mtrl_extended_fab_corner_radius: number = 0;
            public static mtrl_extended_fab_disabled_elevation: number = 0;
            public static mtrl_extended_fab_disabled_translation_z: number = 0;
            public static mtrl_extended_fab_elevation: number = 0;
            public static mtrl_extended_fab_end_padding: number = 0;
            public static mtrl_extended_fab_end_padding_icon: number = 0;
            public static mtrl_extended_fab_icon_size: number = 0;
            public static mtrl_extended_fab_icon_text_spacing: number = 0;
            public static mtrl_extended_fab_min_height: number = 0;
            public static mtrl_extended_fab_min_width: number = 0;
            public static mtrl_extended_fab_start_padding: number = 0;
            public static mtrl_extended_fab_start_padding_icon: number = 0;
            public static mtrl_extended_fab_top_padding: number = 0;
            public static mtrl_extended_fab_translation_z_base: number = 0;
            public static mtrl_extended_fab_translation_z_hovered_focused: number = 0;
            public static mtrl_extended_fab_translation_z_pressed: number = 0;
            public static mtrl_fab_elevation: number = 0;
            public static mtrl_fab_min_touch_target: number = 0;
            public static mtrl_fab_translation_z_hovered_focused: number = 0;
            public static mtrl_fab_translation_z_pressed: number = 0;
            public static mtrl_high_ripple_default_alpha: number = 0;
            public static mtrl_high_ripple_focused_alpha: number = 0;
            public static mtrl_high_ripple_hovered_alpha: number = 0;
            public static mtrl_high_ripple_pressed_alpha: number = 0;
            public static mtrl_large_touch_target: number = 0;
            public static mtrl_low_ripple_default_alpha: number = 0;
            public static mtrl_low_ripple_focused_alpha: number = 0;
            public static mtrl_low_ripple_hovered_alpha: number = 0;
            public static mtrl_low_ripple_pressed_alpha: number = 0;
            public static mtrl_min_touch_target_size: number = 0;
            public static mtrl_navigation_bar_item_default_icon_size: number = 0;
            public static mtrl_navigation_bar_item_default_margin: number = 0;
            public static mtrl_navigation_elevation: number = 0;
            public static mtrl_navigation_item_horizontal_padding: number = 0;
            public static mtrl_navigation_item_icon_padding: number = 0;
            public static mtrl_navigation_item_icon_size: number = 0;
            public static mtrl_navigation_item_shape_horizontal_margin: number = 0;
            public static mtrl_navigation_item_shape_vertical_margin: number = 0;
            public static mtrl_navigation_rail_active_text_size: number = 0;
            public static mtrl_navigation_rail_compact_width: number = 0;
            public static mtrl_navigation_rail_default_width: number = 0;
            public static mtrl_navigation_rail_elevation: number = 0;
            public static mtrl_navigation_rail_icon_margin: number = 0;
            public static mtrl_navigation_rail_icon_size: number = 0;
            public static mtrl_navigation_rail_margin: number = 0;
            public static mtrl_navigation_rail_text_bottom_margin: number = 0;
            public static mtrl_navigation_rail_text_size: number = 0;
            public static mtrl_progress_circular_inset: number = 0;
            public static mtrl_progress_circular_inset_extra_small: number = 0;
            public static mtrl_progress_circular_inset_medium: number = 0;
            public static mtrl_progress_circular_inset_small: number = 0;
            public static mtrl_progress_circular_radius: number = 0;
            public static mtrl_progress_circular_size: number = 0;
            public static mtrl_progress_circular_size_extra_small: number = 0;
            public static mtrl_progress_circular_size_medium: number = 0;
            public static mtrl_progress_circular_size_small: number = 0;
            public static mtrl_progress_circular_track_thickness_extra_small: number = 0;
            public static mtrl_progress_circular_track_thickness_medium: number = 0;
            public static mtrl_progress_circular_track_thickness_small: number = 0;
            public static mtrl_progress_indicator_full_rounded_corner_radius: number = 0;
            public static mtrl_progress_track_thickness: number = 0;
            public static mtrl_shape_corner_size_large_component: number = 0;
            public static mtrl_shape_corner_size_medium_component: number = 0;
            public static mtrl_shape_corner_size_small_component: number = 0;
            public static mtrl_slider_halo_radius: number = 0;
            public static mtrl_slider_label_padding: number = 0;
            public static mtrl_slider_label_radius: number = 0;
            public static mtrl_slider_label_square_side: number = 0;
            public static mtrl_slider_thumb_elevation: number = 0;
            public static mtrl_slider_thumb_radius: number = 0;
            public static mtrl_slider_track_height: number = 0;
            public static mtrl_slider_track_side_padding: number = 0;
            public static mtrl_slider_track_top: number = 0;
            public static mtrl_slider_widget_height: number = 0;
            public static mtrl_snackbar_action_text_color_alpha: number = 0;
            public static mtrl_snackbar_background_corner_radius: number = 0;
            public static mtrl_snackbar_background_overlay_color_alpha: number = 0;
            public static mtrl_snackbar_margin: number = 0;
            public static mtrl_snackbar_message_margin_horizontal: number = 0;
            public static mtrl_snackbar_padding_horizontal: number = 0;
            public static mtrl_switch_thumb_elevation: number = 0;
            public static mtrl_textinput_box_corner_radius_medium: number = 0;
            public static mtrl_textinput_box_corner_radius_small: number = 0;
            public static mtrl_textinput_box_label_cutout_padding: number = 0;
            public static mtrl_textinput_box_stroke_width_default: number = 0;
            public static mtrl_textinput_box_stroke_width_focused: number = 0;
            public static mtrl_textinput_counter_margin_start: number = 0;
            public static mtrl_textinput_end_icon_margin_start: number = 0;
            public static mtrl_textinput_outline_box_expanded_padding: number = 0;
            public static mtrl_textinput_start_icon_margin_end: number = 0;
            public static mtrl_toolbar_default_height: number = 0;
            public static mtrl_tooltip_arrowSize: number = 0;
            public static mtrl_tooltip_cornerSize: number = 0;
            public static mtrl_tooltip_minHeight: number = 0;
            public static mtrl_tooltip_minWidth: number = 0;
            public static mtrl_tooltip_padding: number = 0;
            public static mtrl_transition_shared_axis_slide_distance: number = 0;
            public static notification_action_icon_size: number = 0;
            public static notification_action_text_size: number = 0;
            public static notification_big_circle_margin: number = 0;
            public static notification_content_margin_start: number = 0;
            public static notification_large_icon_height: number = 0;
            public static notification_large_icon_width: number = 0;
            public static notification_main_column_padding_top: number = 0;
            public static notification_media_narrow_margin: number = 0;
            public static notification_right_icon_size: number = 0;
            public static notification_right_side_padding_top: number = 0;
            public static notification_small_icon_background_padding: number = 0;
            public static notification_small_icon_size_as_large: number = 0;
            public static notification_subtext_size: number = 0;
            public static notification_top_pad: number = 0;
            public static notification_top_pad_large_text: number = 0;
            public static subtitle_corner_radius: number = 0;
            public static subtitle_outline_width: number = 0;
            public static subtitle_shadow_offset: number = 0;
            public static subtitle_shadow_radius: number = 0;
            public static test_mtrl_calendar_day_cornerSize: number = 0;
            public static test_navigation_bar_active_item_max_width: number = 0;
            public static test_navigation_bar_active_item_min_width: number = 0;
            public static test_navigation_bar_active_text_size: number = 0;
            public static test_navigation_bar_elevation: number = 0;
            public static test_navigation_bar_height: number = 0;
            public static test_navigation_bar_icon_size: number = 0;
            public static test_navigation_bar_item_max_width: number = 0;
            public static test_navigation_bar_item_min_width: number = 0;
            public static test_navigation_bar_label_padding: number = 0;
            public static test_navigation_bar_shadow_height: number = 0;
            public static test_navigation_bar_text_size: number = 0;
            public static tooltip_corner_radius: number = 0;
            public static tooltip_horizontal_padding: number = 0;
            public static tooltip_margin: number = 0;
            public static tooltip_precise_anchor_extra_offset: number = 0;
            public static tooltip_precise_anchor_threshold: number = 0;
            public static tooltip_vertical_padding: number = 0;
            public static tooltip_y_offset_non_touch: number = 0;
            public static tooltip_y_offset_touch: number = 0;
          }
          export class drawable {
            public static class: java.lang.Class<com.cloudinary.android.core.R.drawable>;
            public static abc_ab_share_pack_mtrl_alpha: number = 0;
            public static abc_action_bar_item_background_material: number = 0;
            public static abc_btn_borderless_material: number = 0;
            public static abc_btn_check_material: number = 0;
            public static abc_btn_check_material_anim: number = 0;
            public static abc_btn_check_to_on_mtrl_000: number = 0;
            public static abc_btn_check_to_on_mtrl_015: number = 0;
            public static abc_btn_colored_material: number = 0;
            public static abc_btn_default_mtrl_shape: number = 0;
            public static abc_btn_radio_material: number = 0;
            public static abc_btn_radio_material_anim: number = 0;
            public static abc_btn_radio_to_on_mtrl_000: number = 0;
            public static abc_btn_radio_to_on_mtrl_015: number = 0;
            public static abc_btn_switch_to_on_mtrl_00001: number = 0;
            public static abc_btn_switch_to_on_mtrl_00012: number = 0;
            public static abc_cab_background_internal_bg: number = 0;
            public static abc_cab_background_top_material: number = 0;
            public static abc_cab_background_top_mtrl_alpha: number = 0;
            public static abc_control_background_material: number = 0;
            public static abc_dialog_material_background: number = 0;
            public static abc_edit_text_material: number = 0;
            public static abc_ic_ab_back_material: number = 0;
            public static abc_ic_arrow_drop_right_black_24dp: number = 0;
            public static abc_ic_clear_material: number = 0;
            public static abc_ic_commit_search_api_mtrl_alpha: number = 0;
            public static abc_ic_go_search_api_material: number = 0;
            public static abc_ic_menu_copy_mtrl_am_alpha: number = 0;
            public static abc_ic_menu_cut_mtrl_alpha: number = 0;
            public static abc_ic_menu_overflow_material: number = 0;
            public static abc_ic_menu_paste_mtrl_am_alpha: number = 0;
            public static abc_ic_menu_selectall_mtrl_alpha: number = 0;
            public static abc_ic_menu_share_mtrl_alpha: number = 0;
            public static abc_ic_search_api_material: number = 0;
            public static abc_ic_star_black_16dp: number = 0;
            public static abc_ic_star_black_36dp: number = 0;
            public static abc_ic_star_black_48dp: number = 0;
            public static abc_ic_star_half_black_16dp: number = 0;
            public static abc_ic_star_half_black_36dp: number = 0;
            public static abc_ic_star_half_black_48dp: number = 0;
            public static abc_ic_voice_search_api_material: number = 0;
            public static abc_item_background_holo_dark: number = 0;
            public static abc_item_background_holo_light: number = 0;
            public static abc_list_divider_material: number = 0;
            public static abc_list_divider_mtrl_alpha: number = 0;
            public static abc_list_focused_holo: number = 0;
            public static abc_list_longpressed_holo: number = 0;
            public static abc_list_pressed_holo_dark: number = 0;
            public static abc_list_pressed_holo_light: number = 0;
            public static abc_list_selector_background_transition_holo_dark: number = 0;
            public static abc_list_selector_background_transition_holo_light: number = 0;
            public static abc_list_selector_disabled_holo_dark: number = 0;
            public static abc_list_selector_disabled_holo_light: number = 0;
            public static abc_list_selector_holo_dark: number = 0;
            public static abc_list_selector_holo_light: number = 0;
            public static abc_menu_hardkey_panel_mtrl_mult: number = 0;
            public static abc_popup_background_mtrl_mult: number = 0;
            public static abc_ratingbar_indicator_material: number = 0;
            public static abc_ratingbar_material: number = 0;
            public static abc_ratingbar_small_material: number = 0;
            public static abc_scrubber_control_off_mtrl_alpha: number = 0;
            public static abc_scrubber_control_to_pressed_mtrl_000: number = 0;
            public static abc_scrubber_control_to_pressed_mtrl_005: number = 0;
            public static abc_scrubber_primary_mtrl_alpha: number = 0;
            public static abc_scrubber_track_mtrl_alpha: number = 0;
            public static abc_seekbar_thumb_material: number = 0;
            public static abc_seekbar_tick_mark_material: number = 0;
            public static abc_seekbar_track_material: number = 0;
            public static abc_spinner_mtrl_am_alpha: number = 0;
            public static abc_spinner_textfield_background_material: number = 0;
            public static abc_star_black_48dp: number = 0;
            public static abc_star_half_black_48dp: number = 0;
            public static abc_switch_thumb_material: number = 0;
            public static abc_switch_track_mtrl_alpha: number = 0;
            public static abc_tab_indicator_material: number = 0;
            public static abc_tab_indicator_mtrl_alpha: number = 0;
            public static abc_text_cursor_material: number = 0;
            public static abc_text_select_handle_left_mtrl: number = 0;
            public static abc_text_select_handle_left_mtrl_dark: number = 0;
            public static abc_text_select_handle_left_mtrl_light: number = 0;
            public static abc_text_select_handle_middle_mtrl: number = 0;
            public static abc_text_select_handle_middle_mtrl_dark: number = 0;
            public static abc_text_select_handle_middle_mtrl_light: number = 0;
            public static abc_text_select_handle_right_mtrl: number = 0;
            public static abc_text_select_handle_right_mtrl_dark: number = 0;
            public static abc_text_select_handle_right_mtrl_light: number = 0;
            public static abc_textfield_activated_mtrl_alpha: number = 0;
            public static abc_textfield_default_mtrl_alpha: number = 0;
            public static abc_textfield_search_activated_mtrl_alpha: number = 0;
            public static abc_textfield_search_default_mtrl_alpha: number = 0;
            public static abc_textfield_search_material: number = 0;
            public static abc_vector_test: number = 0;
            public static avd_hide_password: number = 0;
            public static avd_show_password: number = 0;
            public static btn_checkbox_checked_mtrl: number = 0;
            public static btn_checkbox_checked_to_unchecked_mtrl_animation: number = 0;
            public static btn_checkbox_unchecked_mtrl: number = 0;
            public static btn_checkbox_unchecked_to_checked_mtrl_animation: number = 0;
            public static btn_radio_off_mtrl: number = 0;
            public static btn_radio_off_to_on_mtrl_animation: number = 0;
            public static btn_radio_on_mtrl: number = 0;
            public static btn_radio_on_to_off_mtrl_animation: number = 0;
            public static design_fab_background: number = 0;
            public static design_ic_visibility: number = 0;
            public static design_ic_visibility_off: number = 0;
            public static design_password_eye: number = 0;
            public static design_snackbar_background: number = 0;
            public static ic_clock_black_24dp: number = 0;
            public static ic_keyboard_black_24dp: number = 0;
            public static ic_mtrl_checked_circle: number = 0;
            public static ic_mtrl_chip_checked_black: number = 0;
            public static ic_mtrl_chip_checked_circle: number = 0;
            public static ic_mtrl_chip_close_circle: number = 0;
            public static material_cursor_drawable: number = 0;
            public static material_ic_calendar_black_24dp: number = 0;
            public static material_ic_clear_black_24dp: number = 0;
            public static material_ic_edit_black_24dp: number = 0;
            public static material_ic_keyboard_arrow_left_black_24dp: number = 0;
            public static material_ic_keyboard_arrow_next_black_24dp: number = 0;
            public static material_ic_keyboard_arrow_previous_black_24dp: number = 0;
            public static material_ic_keyboard_arrow_right_black_24dp: number = 0;
            public static material_ic_menu_arrow_down_black_24dp: number = 0;
            public static material_ic_menu_arrow_up_black_24dp: number = 0;
            public static mtrl_dialog_background: number = 0;
            public static mtrl_dropdown_arrow: number = 0;
            public static mtrl_ic_arrow_drop_down: number = 0;
            public static mtrl_ic_arrow_drop_up: number = 0;
            public static mtrl_ic_cancel: number = 0;
            public static mtrl_ic_error: number = 0;
            public static mtrl_navigation_bar_item_background: number = 0;
            public static mtrl_popupmenu_background: number = 0;
            public static mtrl_popupmenu_background_dark: number = 0;
            public static mtrl_tabs_default_indicator: number = 0;
            public static navigation_empty_icon: number = 0;
            public static notification_action_background: number = 0;
            public static notification_bg: number = 0;
            public static notification_bg_low: number = 0;
            public static notification_bg_low_normal: number = 0;
            public static notification_bg_low_pressed: number = 0;
            public static notification_bg_normal: number = 0;
            public static notification_bg_normal_pressed: number = 0;
            public static notification_icon_background: number = 0;
            public static notification_template_icon_bg: number = 0;
            public static notification_template_icon_low_bg: number = 0;
            public static notification_tile_bg: number = 0;
            public static notify_panel_notification_icon_bg: number = 0;
            public static test_custom_background: number = 0;
            public static tooltip_frame_dark: number = 0;
            public static tooltip_frame_light: number = 0;
          }
          export class id {
            public static class: java.lang.Class<com.cloudinary.android.core.R.id>;
            public static BOTTOM_END: number = 0;
            public static BOTTOM_START: number = 0;
            public static NO_DEBUG: number = 0;
            public static SHOW_ALL: number = 0;
            public static SHOW_PATH: number = 0;
            public static SHOW_PROGRESS: number = 0;
            public static TOP_END: number = 0;
            public static TOP_START: number = 0;
            public static accelerate: number = 0;
            public static accessibility_action_clickable_span: number = 0;
            public static accessibility_custom_action_0: number = 0;
            public static accessibility_custom_action_1: number = 0;
            public static accessibility_custom_action_10: number = 0;
            public static accessibility_custom_action_11: number = 0;
            public static accessibility_custom_action_12: number = 0;
            public static accessibility_custom_action_13: number = 0;
            public static accessibility_custom_action_14: number = 0;
            public static accessibility_custom_action_15: number = 0;
            public static accessibility_custom_action_16: number = 0;
            public static accessibility_custom_action_17: number = 0;
            public static accessibility_custom_action_18: number = 0;
            public static accessibility_custom_action_19: number = 0;
            public static accessibility_custom_action_2: number = 0;
            public static accessibility_custom_action_20: number = 0;
            public static accessibility_custom_action_21: number = 0;
            public static accessibility_custom_action_22: number = 0;
            public static accessibility_custom_action_23: number = 0;
            public static accessibility_custom_action_24: number = 0;
            public static accessibility_custom_action_25: number = 0;
            public static accessibility_custom_action_26: number = 0;
            public static accessibility_custom_action_27: number = 0;
            public static accessibility_custom_action_28: number = 0;
            public static accessibility_custom_action_29: number = 0;
            public static accessibility_custom_action_3: number = 0;
            public static accessibility_custom_action_30: number = 0;
            public static accessibility_custom_action_31: number = 0;
            public static accessibility_custom_action_4: number = 0;
            public static accessibility_custom_action_5: number = 0;
            public static accessibility_custom_action_6: number = 0;
            public static accessibility_custom_action_7: number = 0;
            public static accessibility_custom_action_8: number = 0;
            public static accessibility_custom_action_9: number = 0;
            public static action0: number = 0;
            public static action_bar: number = 0;
            public static action_bar_activity_content: number = 0;
            public static action_bar_container: number = 0;
            public static action_bar_root: number = 0;
            public static action_bar_spinner: number = 0;
            public static action_bar_subtitle: number = 0;
            public static action_bar_title: number = 0;
            public static action_container: number = 0;
            public static action_context_bar: number = 0;
            public static action_divider: number = 0;
            public static action_image: number = 0;
            public static action_menu_divider: number = 0;
            public static action_menu_presenter: number = 0;
            public static action_mode_bar: number = 0;
            public static action_mode_bar_stub: number = 0;
            public static action_mode_close_button: number = 0;
            public static action_text: number = 0;
            public static actions: number = 0;
            public static activity_chooser_view_content: number = 0;
            public static add: number = 0;
            public static alertTitle: number = 0;
            public static aligned: number = 0;
            public static animateToEnd: number = 0;
            public static animateToStart: number = 0;
            public static arc: number = 0;
            public static asConfigured: number = 0;
            public static async: number = 0;
            public static auto: number = 0;
            public static autoComplete: number = 0;
            public static autoCompleteToEnd: number = 0;
            public static autoCompleteToStart: number = 0;
            public static barrier: number = 0;
            public static baseline: number = 0;
            public static blocking: number = 0;
            public static bottom: number = 0;
            public static bounce: number = 0;
            public static buttonPanel: number = 0;
            public static cancel_action: number = 0;
            public static cancel_button: number = 0;
            public static center: number = 0;
            public static chain: number = 0;
            public static checkbox: number = 0;
            public static checked: number = 0;
            public static chip: number = 0;
            public static chip1: number = 0;
            public static chip2: number = 0;
            public static chip3: number = 0;
            public static chip_group: number = 0;
            public static chronometer: number = 0;
            public static circle_center: number = 0;
            public static clear_text: number = 0;
            public static clockwise: number = 0;
            public static confirm_button: number = 0;
            public static container: number = 0;
            public static content: number = 0;
            public static contentPanel: number = 0;
            public static contiguous: number = 0;
            public static coordinator: number = 0;
            public static cos: number = 0;
            public static counterclockwise: number = 0;
            public static custom: number = 0;
            public static customPanel: number = 0;
            public static cut: number = 0;
            public static date_picker_actions: number = 0;
            public static decelerate: number = 0;
            public static decelerateAndComplete: number = 0;
            public static decor_content_parent: number = 0;
            public static default_activity_button: number = 0;
            public static deltaRelative: number = 0;
            public static design_bottom_sheet: number = 0;
            public static design_menu_item_action_area: number = 0;
            public static design_menu_item_action_area_stub: number = 0;
            public static design_menu_item_text: number = 0;
            public static design_navigation_view: number = 0;
            public static dialog_button: number = 0;
            public static disjoint: number = 0;
            public static dragDown: number = 0;
            public static dragEnd: number = 0;
            public static dragLeft: number = 0;
            public static dragRight: number = 0;
            public static dragStart: number = 0;
            public static dragUp: number = 0;
            public static dropdown_menu: number = 0;
            public static easeIn: number = 0;
            public static easeInOut: number = 0;
            public static easeOut: number = 0;
            public static edit_query: number = 0;
            public static elastic: number = 0;
            public static end: number = 0;
            public static endToStart: number = 0;
            public static end_padder: number = 0;
            public static expand_activities_button: number = 0;
            public static expanded_menu: number = 0;
            public static fade: number = 0;
            public static fill: number = 0;
            public static filled: number = 0;
            public static fixed: number = 0;
            public static flip: number = 0;
            public static floating: number = 0;
            public static forever: number = 0;
            public static fragment_container_view_tag: number = 0;
            public static ghost_view: number = 0;
            public static ghost_view_holder: number = 0;
            public static gone: number = 0;
            public static group_divider: number = 0;
            public static guideline: number = 0;
            public static header_title: number = 0;
            public static home: number = 0;
            public static honorRequest: number = 0;
            public static icon: number = 0;
            public static icon_group: number = 0;
            public static ignore: number = 0;
            public static ignoreRequest: number = 0;
            public static image: number = 0;
            public static info: number = 0;
            public static invisible: number = 0;
            public static inward: number = 0;
            public static italic: number = 0;
            public static item1: number = 0;
            public static item2: number = 0;
            public static item3: number = 0;
            public static item4: number = 0;
            public static item_touch_helper_previous_elevation: number = 0;
            public static jumpToEnd: number = 0;
            public static jumpToStart: number = 0;
            public static labeled: number = 0;
            public static layout: number = 0;
            public static left: number = 0;
            public static leftToRight: number = 0;
            public static line1: number = 0;
            public static line3: number = 0;
            public static linear: number = 0;
            public static listMode: number = 0;
            public static list_item: number = 0;
            public static masked: number = 0;
            public static material_clock_display: number = 0;
            public static material_clock_face: number = 0;
            public static material_clock_hand: number = 0;
            public static material_clock_period_am_button: number = 0;
            public static material_clock_period_pm_button: number = 0;
            public static material_clock_period_toggle: number = 0;
            public static material_hour_text_input: number = 0;
            public static material_hour_tv: number = 0;
            public static material_label: number = 0;
            public static material_minute_text_input: number = 0;
            public static material_minute_tv: number = 0;
            public static material_textinput_timepicker: number = 0;
            public static material_timepicker_cancel_button: number = 0;
            public static material_timepicker_container: number = 0;
            public static material_timepicker_edit_text: number = 0;
            public static material_timepicker_mode_button: number = 0;
            public static material_timepicker_ok_button: number = 0;
            public static material_timepicker_view: number = 0;
            public static material_value_index: number = 0;
            public static media_actions: number = 0;
            public static message: number = 0;
            public static middle: number = 0;
            public static mini: number = 0;
            public static month_grid: number = 0;
            public static month_navigation_bar: number = 0;
            public static month_navigation_fragment_toggle: number = 0;
            public static month_navigation_next: number = 0;
            public static month_navigation_previous: number = 0;
            public static month_title: number = 0;
            public static motion_base: number = 0;
            public static mtrl_anchor_parent: number = 0;
            public static mtrl_calendar_day_selector_frame: number = 0;
            public static mtrl_calendar_days_of_week: number = 0;
            public static mtrl_calendar_frame: number = 0;
            public static mtrl_calendar_main_pane: number = 0;
            public static mtrl_calendar_months: number = 0;
            public static mtrl_calendar_selection_frame: number = 0;
            public static mtrl_calendar_text_input_frame: number = 0;
            public static mtrl_calendar_year_selector_frame: number = 0;
            public static mtrl_card_checked_layer_id: number = 0;
            public static mtrl_child_content_container: number = 0;
            public static mtrl_internal_children_alpha_tag: number = 0;
            public static mtrl_motion_snapshot_view: number = 0;
            public static mtrl_picker_fullscreen: number = 0;
            public static mtrl_picker_header: number = 0;
            public static mtrl_picker_header_selection_text: number = 0;
            public static mtrl_picker_header_title_and_selection: number = 0;
            public static mtrl_picker_header_toggle: number = 0;
            public static mtrl_picker_text_input_date: number = 0;
            public static mtrl_picker_text_input_range_end: number = 0;
            public static mtrl_picker_text_input_range_start: number = 0;
            public static mtrl_picker_title_text: number = 0;
            public static mtrl_view_tag_bottom_padding: number = 0;
            public static multiply: number = 0;
            public static navigation_bar_item_icon_view: number = 0;
            public static navigation_bar_item_labels_group: number = 0;
            public static navigation_bar_item_large_label_view: number = 0;
            public static navigation_bar_item_small_label_view: number = 0;
            public static navigation_header_container: number = 0;
            public static none: number = 0;
            public static normal: number = 0;
            public static notification_background: number = 0;
            public static notification_main_column: number = 0;
            public static notification_main_column_container: number = 0;
            public static off: number = 0;
            public static on: number = 0;
            public static outline: number = 0;
            public static outward: number = 0;
            public static packed: number = 0;
            public static parallax: number = 0;
            public static parent: number = 0;
            public static parentPanel: number = 0;
            public static parentRelative: number = 0;
            public static parent_matrix: number = 0;
            public static password_toggle: number = 0;
            public static path: number = 0;
            public static pathRelative: number = 0;
            public static percent: number = 0;
            public static pin: number = 0;
            public static position: number = 0;
            public static postLayout: number = 0;
            public static progress_circular: number = 0;
            public static progress_horizontal: number = 0;
            public static radio: number = 0;
            public static rectangles: number = 0;
            public static reverseSawtooth: number = 0;
            public static right: number = 0;
            public static rightToLeft: number = 0;
            public static right_icon: number = 0;
            public static right_side: number = 0;
            public static rounded: number = 0;
            public static row_index_key: number = 0;
            public static save_non_transition_alpha: number = 0;
            public static save_overlay_view: number = 0;
            public static sawtooth: number = 0;
            public static scale: number = 0;
            public static screen: number = 0;
            public static scrollIndicatorDown: number = 0;
            public static scrollIndicatorUp: number = 0;
            public static scrollView: number = 0;
            public static scrollable: number = 0;
            public static search_badge: number = 0;
            public static search_bar: number = 0;
            public static search_button: number = 0;
            public static search_close_btn: number = 0;
            public static search_edit_frame: number = 0;
            public static search_go_btn: number = 0;
            public static search_mag_icon: number = 0;
            public static search_plate: number = 0;
            public static search_src_text: number = 0;
            public static search_voice_btn: number = 0;
            public static select_dialog_listview: number = 0;
            public static selected: number = 0;
            public static selection_type: number = 0;
            public static shortcut: number = 0;
            public static sin: number = 0;
            public static slide: number = 0;
            public static snackbar_action: number = 0;
            public static snackbar_text: number = 0;
            public static spacer: number = 0;
            public static special_effects_controller_view_tag: number = 0;
            public static spline: number = 0;
            public static split_action_bar: number = 0;
            public static spread: number = 0;
            public static spread_inside: number = 0;
            public static square: number = 0;
            public static src_atop: number = 0;
            public static src_in: number = 0;
            public static src_over: number = 0;
            public static standard: number = 0;
            public static start: number = 0;
            public static startHorizontal: number = 0;
            public static startToEnd: number = 0;
            public static startVertical: number = 0;
            public static staticLayout: number = 0;
            public static staticPostLayout: number = 0;
            public static status_bar_latest_event_content: number = 0;
            public static stop: number = 0;
            public static stretch: number = 0;
            public static submenuarrow: number = 0;
            public static submit_area: number = 0;
            public static tabMode: number = 0;
            public static tag_accessibility_actions: number = 0;
            public static tag_accessibility_clickable_spans: number = 0;
            public static tag_accessibility_heading: number = 0;
            public static tag_accessibility_pane_title: number = 0;
            public static tag_on_apply_window_listener: number = 0;
            public static tag_on_receive_content_listener: number = 0;
            public static tag_on_receive_content_mime_types: number = 0;
            public static tag_screen_reader_focusable: number = 0;
            public static tag_state_description: number = 0;
            public static tag_transition_group: number = 0;
            public static tag_unhandled_key_event_manager: number = 0;
            public static tag_unhandled_key_listeners: number = 0;
            public static tag_window_insets_animation_callback: number = 0;
            public static test_checkbox_android_button_tint: number = 0;
            public static test_checkbox_app_button_tint: number = 0;
            public static test_radiobutton_android_button_tint: number = 0;
            public static test_radiobutton_app_button_tint: number = 0;
            public static text: number = 0;
            public static text2: number = 0;
            public static textSpacerNoButtons: number = 0;
            public static textSpacerNoTitle: number = 0;
            public static text_input_end_icon: number = 0;
            public static text_input_error_icon: number = 0;
            public static text_input_start_icon: number = 0;
            public static textinput_counter: number = 0;
            public static textinput_error: number = 0;
            public static textinput_helper_text: number = 0;
            public static textinput_placeholder: number = 0;
            public static textinput_prefix_text: number = 0;
            public static textinput_suffix_text: number = 0;
            public static time: number = 0;
            public static title: number = 0;
            public static titleDividerNoCustom: number = 0;
            public static title_template: number = 0;
            public static top: number = 0;
            public static topPanel: number = 0;
            public static touch_outside: number = 0;
            public static transition_current_scene: number = 0;
            public static transition_layout_save: number = 0;
            public static transition_position: number = 0;
            public static transition_scene_layoutid_cache: number = 0;
            public static transition_transform: number = 0;
            public static triangle: number = 0;
            public static unchecked: number = 0;
            public static uniform: number = 0;
            public static unlabeled: number = 0;
            public static up: number = 0;
            public static view_offset_helper: number = 0;
            public static view_tree_lifecycle_owner: number = 0;
            public static view_tree_saved_state_registry_owner: number = 0;
            public static view_tree_view_model_store_owner: number = 0;
            public static visible: number = 0;
            public static visible_removing_fragment_view_tag: number = 0;
            public static withinBounds: number = 0;
            public static wrap: number = 0;
            public static wrap_content: number = 0;
            public static zero_corner_chip: number = 0;
          }
          export class integer {
            public static class: java.lang.Class<com.cloudinary.android.core.R.integer>;
            public static abc_config_activityDefaultDur: number = 0;
            public static abc_config_activityShortDur: number = 0;
            public static app_bar_elevation_anim_duration: number = 0;
            public static bottom_sheet_slide_duration: number = 0;
            public static cancel_button_image_alpha: number = 0;
            public static config_tooltipAnimTime: number = 0;
            public static design_snackbar_text_max_lines: number = 0;
            public static design_tab_indicator_anim_duration_ms: number = 0;
            public static hide_password_duration: number = 0;
            public static material_motion_duration_long_1: number = 0;
            public static material_motion_duration_long_2: number = 0;
            public static material_motion_duration_medium_1: number = 0;
            public static material_motion_duration_medium_2: number = 0;
            public static material_motion_duration_short_1: number = 0;
            public static material_motion_duration_short_2: number = 0;
            public static material_motion_path: number = 0;
            public static mtrl_badge_max_character_count: number = 0;
            public static mtrl_btn_anim_delay_ms: number = 0;
            public static mtrl_btn_anim_duration_ms: number = 0;
            public static mtrl_calendar_header_orientation: number = 0;
            public static mtrl_calendar_selection_text_lines: number = 0;
            public static mtrl_calendar_year_selector_span: number = 0;
            public static mtrl_card_anim_delay_ms: number = 0;
            public static mtrl_card_anim_duration_ms: number = 0;
            public static mtrl_chip_anim_duration: number = 0;
            public static mtrl_tab_indicator_anim_duration_ms: number = 0;
            public static show_password_duration: number = 0;
            public static status_bar_notification_info_maxnum: number = 0;
          }
          export class interpolator {
            public static class: java.lang.Class<com.cloudinary.android.core.R.interpolator>;
            public static btn_checkbox_checked_mtrl_animation_interpolator_0: number = 0;
            public static btn_checkbox_checked_mtrl_animation_interpolator_1: number = 0;
            public static btn_checkbox_unchecked_mtrl_animation_interpolator_0: number = 0;
            public static btn_checkbox_unchecked_mtrl_animation_interpolator_1: number = 0;
            public static btn_radio_to_off_mtrl_animation_interpolator_0: number = 0;
            public static btn_radio_to_on_mtrl_animation_interpolator_0: number = 0;
            public static fast_out_slow_in: number = 0;
            public static mtrl_fast_out_linear_in: number = 0;
            public static mtrl_fast_out_slow_in: number = 0;
            public static mtrl_linear: number = 0;
            public static mtrl_linear_out_slow_in: number = 0;
          }
          export class layout {
            public static class: java.lang.Class<com.cloudinary.android.core.R.layout>;
            public static abc_action_bar_title_item: number = 0;
            public static abc_action_bar_up_container: number = 0;
            public static abc_action_menu_item_layout: number = 0;
            public static abc_action_menu_layout: number = 0;
            public static abc_action_mode_bar: number = 0;
            public static abc_action_mode_close_item_material: number = 0;
            public static abc_activity_chooser_view: number = 0;
            public static abc_activity_chooser_view_list_item: number = 0;
            public static abc_alert_dialog_button_bar_material: number = 0;
            public static abc_alert_dialog_material: number = 0;
            public static abc_alert_dialog_title_material: number = 0;
            public static abc_cascading_menu_item_layout: number = 0;
            public static abc_dialog_title_material: number = 0;
            public static abc_expanded_menu_layout: number = 0;
            public static abc_list_menu_item_checkbox: number = 0;
            public static abc_list_menu_item_icon: number = 0;
            public static abc_list_menu_item_layout: number = 0;
            public static abc_list_menu_item_radio: number = 0;
            public static abc_popup_menu_header_item_layout: number = 0;
            public static abc_popup_menu_item_layout: number = 0;
            public static abc_screen_content_include: number = 0;
            public static abc_screen_simple: number = 0;
            public static abc_screen_simple_overlay_action_mode: number = 0;
            public static abc_screen_toolbar: number = 0;
            public static abc_search_dropdown_item_icons_2line: number = 0;
            public static abc_search_view: number = 0;
            public static abc_select_dialog_material: number = 0;
            public static abc_tooltip: number = 0;
            public static custom_dialog: number = 0;
            public static design_bottom_navigation_item: number = 0;
            public static design_bottom_sheet_dialog: number = 0;
            public static design_layout_snackbar: number = 0;
            public static design_layout_snackbar_include: number = 0;
            public static design_layout_tab_icon: number = 0;
            public static design_layout_tab_text: number = 0;
            public static design_menu_item_action_area: number = 0;
            public static design_navigation_item: number = 0;
            public static design_navigation_item_header: number = 0;
            public static design_navigation_item_separator: number = 0;
            public static design_navigation_item_subheader: number = 0;
            public static design_navigation_menu: number = 0;
            public static design_navigation_menu_item: number = 0;
            public static design_text_input_end_icon: number = 0;
            public static design_text_input_start_icon: number = 0;
            public static material_chip_input_combo: number = 0;
            public static material_clock_display: number = 0;
            public static material_clock_display_divider: number = 0;
            public static material_clock_period_toggle: number = 0;
            public static material_clock_period_toggle_land: number = 0;
            public static material_clockface_textview: number = 0;
            public static material_clockface_view: number = 0;
            public static material_radial_view_group: number = 0;
            public static material_textinput_timepicker: number = 0;
            public static material_time_chip: number = 0;
            public static material_time_input: number = 0;
            public static material_timepicker: number = 0;
            public static material_timepicker_dialog: number = 0;
            public static material_timepicker_textinput_display: number = 0;
            public static mtrl_alert_dialog: number = 0;
            public static mtrl_alert_dialog_actions: number = 0;
            public static mtrl_alert_dialog_title: number = 0;
            public static mtrl_alert_select_dialog_item: number = 0;
            public static mtrl_alert_select_dialog_multichoice: number = 0;
            public static mtrl_alert_select_dialog_singlechoice: number = 0;
            public static mtrl_calendar_day: number = 0;
            public static mtrl_calendar_day_of_week: number = 0;
            public static mtrl_calendar_days_of_week: number = 0;
            public static mtrl_calendar_horizontal: number = 0;
            public static mtrl_calendar_month: number = 0;
            public static mtrl_calendar_month_labeled: number = 0;
            public static mtrl_calendar_month_navigation: number = 0;
            public static mtrl_calendar_months: number = 0;
            public static mtrl_calendar_vertical: number = 0;
            public static mtrl_calendar_year: number = 0;
            public static mtrl_layout_snackbar: number = 0;
            public static mtrl_layout_snackbar_include: number = 0;
            public static mtrl_navigation_rail_item: number = 0;
            public static mtrl_picker_actions: number = 0;
            public static mtrl_picker_dialog: number = 0;
            public static mtrl_picker_fullscreen: number = 0;
            public static mtrl_picker_header_dialog: number = 0;
            public static mtrl_picker_header_fullscreen: number = 0;
            public static mtrl_picker_header_selection_text: number = 0;
            public static mtrl_picker_header_title_text: number = 0;
            public static mtrl_picker_header_toggle: number = 0;
            public static mtrl_picker_text_input_date: number = 0;
            public static mtrl_picker_text_input_date_range: number = 0;
            public static notification_action: number = 0;
            public static notification_action_tombstone: number = 0;
            public static notification_media_action: number = 0;
            public static notification_media_cancel_action: number = 0;
            public static notification_template_big_media: number = 0;
            public static notification_template_big_media_custom: number = 0;
            public static notification_template_big_media_narrow: number = 0;
            public static notification_template_big_media_narrow_custom: number = 0;
            public static notification_template_custom_big: number = 0;
            public static notification_template_icon_group: number = 0;
            public static notification_template_lines_media: number = 0;
            public static notification_template_media: number = 0;
            public static notification_template_media_custom: number = 0;
            public static notification_template_part_chronometer: number = 0;
            public static notification_template_part_time: number = 0;
            public static select_dialog_item_material: number = 0;
            public static select_dialog_multichoice_material: number = 0;
            public static select_dialog_singlechoice_material: number = 0;
            public static support_simple_spinner_dropdown_item: number = 0;
            public static test_action_chip: number = 0;
            public static test_chip_zero_corner_radius: number = 0;
            public static test_design_checkbox: number = 0;
            public static test_design_radiobutton: number = 0;
            public static test_navigation_bar_item_layout: number = 0;
            public static test_reflow_chipgroup: number = 0;
            public static test_toolbar: number = 0;
            public static test_toolbar_custom_background: number = 0;
            public static test_toolbar_elevation: number = 0;
            public static test_toolbar_surface: number = 0;
            public static text_view_with_line_height_from_appearance: number = 0;
            public static text_view_with_line_height_from_layout: number = 0;
            public static text_view_with_line_height_from_style: number = 0;
            public static text_view_with_theme_line_height: number = 0;
            public static text_view_without_line_height: number = 0;
          }
          export class menu {
            public static class: java.lang.Class<com.cloudinary.android.core.R.menu>;
            public static example_menu: number = 0;
            public static example_menu2: number = 0;
          }
          export class plurals {
            public static class: java.lang.Class<com.cloudinary.android.core.R.plurals>;
            public static mtrl_badge_content_description: number = 0;
          }
          export class style {
            public static class: java.lang.Class<com.cloudinary.android.core.R.style>;
            public static AlertDialog_AppCompat: number = 0;
            public static AlertDialog_AppCompat_Light: number = 0;
            public static AndroidThemeColorAccentYellow: number = 0;
            public static Animation_AppCompat_Dialog: number = 0;
            public static Animation_AppCompat_DropDownUp: number = 0;
            public static Animation_AppCompat_Tooltip: number = 0;
            public static Animation_Design_BottomSheetDialog: number = 0;
            public static Animation_MaterialComponents_BottomSheetDialog: number = 0;
            public static Base_AlertDialog_AppCompat: number = 0;
            public static Base_AlertDialog_AppCompat_Light: number = 0;
            public static Base_Animation_AppCompat_Dialog: number = 0;
            public static Base_Animation_AppCompat_DropDownUp: number = 0;
            public static Base_Animation_AppCompat_Tooltip: number = 0;
            public static Base_CardView: number = 0;
            public static Base_DialogWindowTitleBackground_AppCompat: number = 0;
            public static Base_DialogWindowTitle_AppCompat: number = 0;
            public static Base_MaterialAlertDialog_MaterialComponents_Title_Icon: number = 0;
            public static Base_MaterialAlertDialog_MaterialComponents_Title_Panel: number = 0;
            public static Base_MaterialAlertDialog_MaterialComponents_Title_Text: number = 0;
            public static Base_TextAppearance_AppCompat: number = 0;
            public static Base_TextAppearance_AppCompat_Body1: number = 0;
            public static Base_TextAppearance_AppCompat_Body2: number = 0;
            public static Base_TextAppearance_AppCompat_Button: number = 0;
            public static Base_TextAppearance_AppCompat_Caption: number = 0;
            public static Base_TextAppearance_AppCompat_Display1: number = 0;
            public static Base_TextAppearance_AppCompat_Display2: number = 0;
            public static Base_TextAppearance_AppCompat_Display3: number = 0;
            public static Base_TextAppearance_AppCompat_Display4: number = 0;
            public static Base_TextAppearance_AppCompat_Headline: number = 0;
            public static Base_TextAppearance_AppCompat_Inverse: number = 0;
            public static Base_TextAppearance_AppCompat_Large: number = 0;
            public static Base_TextAppearance_AppCompat_Large_Inverse: number = 0;
            public static Base_TextAppearance_AppCompat_Light_Widget_PopupMenu_Large: number = 0;
            public static Base_TextAppearance_AppCompat_Light_Widget_PopupMenu_Small: number = 0;
            public static Base_TextAppearance_AppCompat_Medium: number = 0;
            public static Base_TextAppearance_AppCompat_Medium_Inverse: number = 0;
            public static Base_TextAppearance_AppCompat_Menu: number = 0;
            public static Base_TextAppearance_AppCompat_SearchResult: number = 0;
            public static Base_TextAppearance_AppCompat_SearchResult_Subtitle: number = 0;
            public static Base_TextAppearance_AppCompat_SearchResult_Title: number = 0;
            public static Base_TextAppearance_AppCompat_Small: number = 0;
            public static Base_TextAppearance_AppCompat_Small_Inverse: number = 0;
            public static Base_TextAppearance_AppCompat_Subhead: number = 0;
            public static Base_TextAppearance_AppCompat_Subhead_Inverse: number = 0;
            public static Base_TextAppearance_AppCompat_Title: number = 0;
            public static Base_TextAppearance_AppCompat_Title_Inverse: number = 0;
            public static Base_TextAppearance_AppCompat_Tooltip: number = 0;
            public static Base_TextAppearance_AppCompat_Widget_ActionBar_Menu: number = 0;
            public static Base_TextAppearance_AppCompat_Widget_ActionBar_Subtitle: number = 0;
            public static Base_TextAppearance_AppCompat_Widget_ActionBar_Subtitle_Inverse: number = 0;
            public static Base_TextAppearance_AppCompat_Widget_ActionBar_Title: number = 0;
            public static Base_TextAppearance_AppCompat_Widget_ActionBar_Title_Inverse: number = 0;
            public static Base_TextAppearance_AppCompat_Widget_ActionMode_Subtitle: number = 0;
            public static Base_TextAppearance_AppCompat_Widget_ActionMode_Title: number = 0;
            public static Base_TextAppearance_AppCompat_Widget_Button: number = 0;
            public static Base_TextAppearance_AppCompat_Widget_Button_Borderless_Colored: number = 0;
            public static Base_TextAppearance_AppCompat_Widget_Button_Colored: number = 0;
            public static Base_TextAppearance_AppCompat_Widget_Button_Inverse: number = 0;
            public static Base_TextAppearance_AppCompat_Widget_DropDownItem: number = 0;
            public static Base_TextAppearance_AppCompat_Widget_PopupMenu_Header: number = 0;
            public static Base_TextAppearance_AppCompat_Widget_PopupMenu_Large: number = 0;
            public static Base_TextAppearance_AppCompat_Widget_PopupMenu_Small: number = 0;
            public static Base_TextAppearance_AppCompat_Widget_Switch: number = 0;
            public static Base_TextAppearance_AppCompat_Widget_TextView_SpinnerItem: number = 0;
            public static Base_TextAppearance_MaterialComponents_Badge: number = 0;
            public static Base_TextAppearance_MaterialComponents_Button: number = 0;
            public static Base_TextAppearance_MaterialComponents_Headline6: number = 0;
            public static Base_TextAppearance_MaterialComponents_Subtitle2: number = 0;
            public static Base_TextAppearance_Widget_AppCompat_ExpandedMenu_Item: number = 0;
            public static Base_TextAppearance_Widget_AppCompat_Toolbar_Subtitle: number = 0;
            public static Base_TextAppearance_Widget_AppCompat_Toolbar_Title: number = 0;
            public static Base_ThemeOverlay_AppCompat: number = 0;
            public static Base_ThemeOverlay_AppCompat_ActionBar: number = 0;
            public static Base_ThemeOverlay_AppCompat_Dark: number = 0;
            public static Base_ThemeOverlay_AppCompat_Dark_ActionBar: number = 0;
            public static Base_ThemeOverlay_AppCompat_Dialog: number = 0;
            public static Base_ThemeOverlay_AppCompat_Dialog_Alert: number = 0;
            public static Base_ThemeOverlay_AppCompat_Light: number = 0;
            public static Base_ThemeOverlay_MaterialComponents_Dialog: number = 0;
            public static Base_ThemeOverlay_MaterialComponents_Dialog_Alert: number = 0;
            public static Base_ThemeOverlay_MaterialComponents_Dialog_Alert_Framework: number = 0;
            public static Base_ThemeOverlay_MaterialComponents_Light_Dialog_Alert_Framework: number = 0;
            public static Base_ThemeOverlay_MaterialComponents_MaterialAlertDialog: number = 0;
            public static Base_Theme_AppCompat: number = 0;
            public static Base_Theme_AppCompat_CompactMenu: number = 0;
            public static Base_Theme_AppCompat_Dialog: number = 0;
            public static Base_Theme_AppCompat_DialogWhenLarge: number = 0;
            public static Base_Theme_AppCompat_Dialog_Alert: number = 0;
            public static Base_Theme_AppCompat_Dialog_FixedSize: number = 0;
            public static Base_Theme_AppCompat_Dialog_MinWidth: number = 0;
            public static Base_Theme_AppCompat_Light: number = 0;
            public static Base_Theme_AppCompat_Light_DarkActionBar: number = 0;
            public static Base_Theme_AppCompat_Light_Dialog: number = 0;
            public static Base_Theme_AppCompat_Light_DialogWhenLarge: number = 0;
            public static Base_Theme_AppCompat_Light_Dialog_Alert: number = 0;
            public static Base_Theme_AppCompat_Light_Dialog_FixedSize: number = 0;
            public static Base_Theme_AppCompat_Light_Dialog_MinWidth: number = 0;
            public static Base_Theme_MaterialComponents: number = 0;
            public static Base_Theme_MaterialComponents_Bridge: number = 0;
            public static Base_Theme_MaterialComponents_CompactMenu: number = 0;
            public static Base_Theme_MaterialComponents_Dialog: number = 0;
            public static Base_Theme_MaterialComponents_DialogWhenLarge: number = 0;
            public static Base_Theme_MaterialComponents_Dialog_Alert: number = 0;
            public static Base_Theme_MaterialComponents_Dialog_Bridge: number = 0;
            public static Base_Theme_MaterialComponents_Dialog_FixedSize: number = 0;
            public static Base_Theme_MaterialComponents_Dialog_MinWidth: number = 0;
            public static Base_Theme_MaterialComponents_Light: number = 0;
            public static Base_Theme_MaterialComponents_Light_Bridge: number = 0;
            public static Base_Theme_MaterialComponents_Light_DarkActionBar: number = 0;
            public static Base_Theme_MaterialComponents_Light_DarkActionBar_Bridge: number = 0;
            public static Base_Theme_MaterialComponents_Light_Dialog: number = 0;
            public static Base_Theme_MaterialComponents_Light_DialogWhenLarge: number = 0;
            public static Base_Theme_MaterialComponents_Light_Dialog_Alert: number = 0;
            public static Base_Theme_MaterialComponents_Light_Dialog_Bridge: number = 0;
            public static Base_Theme_MaterialComponents_Light_Dialog_FixedSize: number = 0;
            public static Base_Theme_MaterialComponents_Light_Dialog_MinWidth: number = 0;
            public static Base_V14_ThemeOverlay_MaterialComponents_BottomSheetDialog: number = 0;
            public static Base_V14_ThemeOverlay_MaterialComponents_Dialog: number = 0;
            public static Base_V14_ThemeOverlay_MaterialComponents_Dialog_Alert: number = 0;
            public static Base_V14_ThemeOverlay_MaterialComponents_MaterialAlertDialog: number = 0;
            public static Base_V14_Theme_MaterialComponents: number = 0;
            public static Base_V14_Theme_MaterialComponents_Bridge: number = 0;
            public static Base_V14_Theme_MaterialComponents_Dialog: number = 0;
            public static Base_V14_Theme_MaterialComponents_Dialog_Bridge: number = 0;
            public static Base_V14_Theme_MaterialComponents_Light: number = 0;
            public static Base_V14_Theme_MaterialComponents_Light_Bridge: number = 0;
            public static Base_V14_Theme_MaterialComponents_Light_DarkActionBar_Bridge: number = 0;
            public static Base_V14_Theme_MaterialComponents_Light_Dialog: number = 0;
            public static Base_V14_Theme_MaterialComponents_Light_Dialog_Bridge: number = 0;
            public static Base_V21_ThemeOverlay_AppCompat_Dialog: number = 0;
            public static Base_V21_ThemeOverlay_MaterialComponents_BottomSheetDialog: number = 0;
            public static Base_V21_Theme_AppCompat: number = 0;
            public static Base_V21_Theme_AppCompat_Dialog: number = 0;
            public static Base_V21_Theme_AppCompat_Light: number = 0;
            public static Base_V21_Theme_AppCompat_Light_Dialog: number = 0;
            public static Base_V21_Theme_MaterialComponents: number = 0;
            public static Base_V21_Theme_MaterialComponents_Dialog: number = 0;
            public static Base_V21_Theme_MaterialComponents_Light: number = 0;
            public static Base_V21_Theme_MaterialComponents_Light_Dialog: number = 0;
            public static Base_V22_Theme_AppCompat: number = 0;
            public static Base_V22_Theme_AppCompat_Light: number = 0;
            public static Base_V23_Theme_AppCompat: number = 0;
            public static Base_V23_Theme_AppCompat_Light: number = 0;
            public static Base_V26_Theme_AppCompat: number = 0;
            public static Base_V26_Theme_AppCompat_Light: number = 0;
            public static Base_V26_Widget_AppCompat_Toolbar: number = 0;
            public static Base_V28_Theme_AppCompat: number = 0;
            public static Base_V28_Theme_AppCompat_Light: number = 0;
            public static Base_V7_ThemeOverlay_AppCompat_Dialog: number = 0;
            public static Base_V7_Theme_AppCompat: number = 0;
            public static Base_V7_Theme_AppCompat_Dialog: number = 0;
            public static Base_V7_Theme_AppCompat_Light: number = 0;
            public static Base_V7_Theme_AppCompat_Light_Dialog: number = 0;
            public static Base_V7_Widget_AppCompat_AutoCompleteTextView: number = 0;
            public static Base_V7_Widget_AppCompat_EditText: number = 0;
            public static Base_V7_Widget_AppCompat_Toolbar: number = 0;
            public static Base_Widget_AppCompat_ActionBar: number = 0;
            public static Base_Widget_AppCompat_ActionBar_Solid: number = 0;
            public static Base_Widget_AppCompat_ActionBar_TabBar: number = 0;
            public static Base_Widget_AppCompat_ActionBar_TabText: number = 0;
            public static Base_Widget_AppCompat_ActionBar_TabView: number = 0;
            public static Base_Widget_AppCompat_ActionButton: number = 0;
            public static Base_Widget_AppCompat_ActionButton_CloseMode: number = 0;
            public static Base_Widget_AppCompat_ActionButton_Overflow: number = 0;
            public static Base_Widget_AppCompat_ActionMode: number = 0;
            public static Base_Widget_AppCompat_ActivityChooserView: number = 0;
            public static Base_Widget_AppCompat_AutoCompleteTextView: number = 0;
            public static Base_Widget_AppCompat_Button: number = 0;
            public static Base_Widget_AppCompat_ButtonBar: number = 0;
            public static Base_Widget_AppCompat_ButtonBar_AlertDialog: number = 0;
            public static Base_Widget_AppCompat_Button_Borderless: number = 0;
            public static Base_Widget_AppCompat_Button_Borderless_Colored: number = 0;
            public static Base_Widget_AppCompat_Button_ButtonBar_AlertDialog: number = 0;
            public static Base_Widget_AppCompat_Button_Colored: number = 0;
            public static Base_Widget_AppCompat_Button_Small: number = 0;
            public static Base_Widget_AppCompat_CompoundButton_CheckBox: number = 0;
            public static Base_Widget_AppCompat_CompoundButton_RadioButton: number = 0;
            public static Base_Widget_AppCompat_CompoundButton_Switch: number = 0;
            public static Base_Widget_AppCompat_DrawerArrowToggle: number = 0;
            public static Base_Widget_AppCompat_DrawerArrowToggle_Common: number = 0;
            public static Base_Widget_AppCompat_DropDownItem_Spinner: number = 0;
            public static Base_Widget_AppCompat_EditText: number = 0;
            public static Base_Widget_AppCompat_ImageButton: number = 0;
            public static Base_Widget_AppCompat_Light_ActionBar: number = 0;
            public static Base_Widget_AppCompat_Light_ActionBar_Solid: number = 0;
            public static Base_Widget_AppCompat_Light_ActionBar_TabBar: number = 0;
            public static Base_Widget_AppCompat_Light_ActionBar_TabText: number = 0;
            public static Base_Widget_AppCompat_Light_ActionBar_TabText_Inverse: number = 0;
            public static Base_Widget_AppCompat_Light_ActionBar_TabView: number = 0;
            public static Base_Widget_AppCompat_Light_PopupMenu: number = 0;
            public static Base_Widget_AppCompat_Light_PopupMenu_Overflow: number = 0;
            public static Base_Widget_AppCompat_ListMenuView: number = 0;
            public static Base_Widget_AppCompat_ListPopupWindow: number = 0;
            public static Base_Widget_AppCompat_ListView: number = 0;
            public static Base_Widget_AppCompat_ListView_DropDown: number = 0;
            public static Base_Widget_AppCompat_ListView_Menu: number = 0;
            public static Base_Widget_AppCompat_PopupMenu: number = 0;
            public static Base_Widget_AppCompat_PopupMenu_Overflow: number = 0;
            public static Base_Widget_AppCompat_PopupWindow: number = 0;
            public static Base_Widget_AppCompat_ProgressBar: number = 0;
            public static Base_Widget_AppCompat_ProgressBar_Horizontal: number = 0;
            public static Base_Widget_AppCompat_RatingBar: number = 0;
            public static Base_Widget_AppCompat_RatingBar_Indicator: number = 0;
            public static Base_Widget_AppCompat_RatingBar_Small: number = 0;
            public static Base_Widget_AppCompat_SearchView: number = 0;
            public static Base_Widget_AppCompat_SearchView_ActionBar: number = 0;
            public static Base_Widget_AppCompat_SeekBar: number = 0;
            public static Base_Widget_AppCompat_SeekBar_Discrete: number = 0;
            public static Base_Widget_AppCompat_Spinner: number = 0;
            public static Base_Widget_AppCompat_Spinner_Underlined: number = 0;
            public static Base_Widget_AppCompat_TextView: number = 0;
            public static Base_Widget_AppCompat_TextView_SpinnerItem: number = 0;
            public static Base_Widget_AppCompat_Toolbar: number = 0;
            public static Base_Widget_AppCompat_Toolbar_Button_Navigation: number = 0;
            public static Base_Widget_Design_TabLayout: number = 0;
            public static Base_Widget_MaterialComponents_AutoCompleteTextView: number = 0;
            public static Base_Widget_MaterialComponents_CheckedTextView: number = 0;
            public static Base_Widget_MaterialComponents_Chip: number = 0;
            public static Base_Widget_MaterialComponents_MaterialCalendar_NavigationButton: number = 0;
            public static Base_Widget_MaterialComponents_PopupMenu: number = 0;
            public static Base_Widget_MaterialComponents_PopupMenu_ContextMenu: number = 0;
            public static Base_Widget_MaterialComponents_PopupMenu_ListPopupWindow: number = 0;
            public static Base_Widget_MaterialComponents_PopupMenu_Overflow: number = 0;
            public static Base_Widget_MaterialComponents_Slider: number = 0;
            public static Base_Widget_MaterialComponents_Snackbar: number = 0;
            public static Base_Widget_MaterialComponents_TextInputEditText: number = 0;
            public static Base_Widget_MaterialComponents_TextInputLayout: number = 0;
            public static Base_Widget_MaterialComponents_TextView: number = 0;
            public static CardView: number = 0;
            public static CardView_Dark: number = 0;
            public static CardView_Light: number = 0;
            public static EmptyTheme: number = 0;
            public static MaterialAlertDialog_MaterialComponents: number = 0;
            public static MaterialAlertDialog_MaterialComponents_Body_Text: number = 0;
            public static MaterialAlertDialog_MaterialComponents_Picker_Date_Calendar: number = 0;
            public static MaterialAlertDialog_MaterialComponents_Picker_Date_Spinner: number = 0;
            public static MaterialAlertDialog_MaterialComponents_Title_Icon: number = 0;
            public static MaterialAlertDialog_MaterialComponents_Title_Icon_CenterStacked: number = 0;
            public static MaterialAlertDialog_MaterialComponents_Title_Panel: number = 0;
            public static MaterialAlertDialog_MaterialComponents_Title_Panel_CenterStacked: number = 0;
            public static MaterialAlertDialog_MaterialComponents_Title_Text: number = 0;
            public static MaterialAlertDialog_MaterialComponents_Title_Text_CenterStacked: number = 0;
            public static Platform_AppCompat: number = 0;
            public static Platform_AppCompat_Light: number = 0;
            public static Platform_MaterialComponents: number = 0;
            public static Platform_MaterialComponents_Dialog: number = 0;
            public static Platform_MaterialComponents_Light: number = 0;
            public static Platform_MaterialComponents_Light_Dialog: number = 0;
            public static Platform_ThemeOverlay_AppCompat: number = 0;
            public static Platform_ThemeOverlay_AppCompat_Dark: number = 0;
            public static Platform_ThemeOverlay_AppCompat_Light: number = 0;
            public static Platform_V21_AppCompat: number = 0;
            public static Platform_V21_AppCompat_Light: number = 0;
            public static Platform_V25_AppCompat: number = 0;
            public static Platform_V25_AppCompat_Light: number = 0;
            public static Platform_Widget_AppCompat_Spinner: number = 0;
            public static RtlOverlay_DialogWindowTitle_AppCompat: number = 0;
            public static RtlOverlay_Widget_AppCompat_ActionBar_TitleItem: number = 0;
            public static RtlOverlay_Widget_AppCompat_DialogTitle_Icon: number = 0;
            public static RtlOverlay_Widget_AppCompat_PopupMenuItem: number = 0;
            public static RtlOverlay_Widget_AppCompat_PopupMenuItem_InternalGroup: number = 0;
            public static RtlOverlay_Widget_AppCompat_PopupMenuItem_Shortcut: number = 0;
            public static RtlOverlay_Widget_AppCompat_PopupMenuItem_SubmenuArrow: number = 0;
            public static RtlOverlay_Widget_AppCompat_PopupMenuItem_Text: number = 0;
            public static RtlOverlay_Widget_AppCompat_PopupMenuItem_Title: number = 0;
            public static RtlOverlay_Widget_AppCompat_SearchView_MagIcon: number = 0;
            public static RtlOverlay_Widget_AppCompat_Search_DropDown: number = 0;
            public static RtlOverlay_Widget_AppCompat_Search_DropDown_Icon1: number = 0;
            public static RtlOverlay_Widget_AppCompat_Search_DropDown_Icon2: number = 0;
            public static RtlOverlay_Widget_AppCompat_Search_DropDown_Query: number = 0;
            public static RtlOverlay_Widget_AppCompat_Search_DropDown_Text: number = 0;
            public static RtlUnderlay_Widget_AppCompat_ActionButton: number = 0;
            public static RtlUnderlay_Widget_AppCompat_ActionButton_Overflow: number = 0;
            public static ShapeAppearanceOverlay: number = 0;
            public static ShapeAppearanceOverlay_BottomLeftDifferentCornerSize: number = 0;
            public static ShapeAppearanceOverlay_BottomRightCut: number = 0;
            public static ShapeAppearanceOverlay_Cut: number = 0;
            public static ShapeAppearanceOverlay_DifferentCornerSize: number = 0;
            public static ShapeAppearanceOverlay_MaterialComponents_BottomSheet: number = 0;
            public static ShapeAppearanceOverlay_MaterialComponents_Chip: number = 0;
            public static ShapeAppearanceOverlay_MaterialComponents_ExtendedFloatingActionButton: number = 0;
            public static ShapeAppearanceOverlay_MaterialComponents_FloatingActionButton: number = 0;
            public static ShapeAppearanceOverlay_MaterialComponents_MaterialCalendar_Day: number = 0;
            public static ShapeAppearanceOverlay_MaterialComponents_MaterialCalendar_Window_Fullscreen: number = 0;
            public static ShapeAppearanceOverlay_MaterialComponents_MaterialCalendar_Year: number = 0;
            public static ShapeAppearanceOverlay_MaterialComponents_TextInputLayout_FilledBox: number = 0;
            public static ShapeAppearanceOverlay_TopLeftCut: number = 0;
            public static ShapeAppearanceOverlay_TopRightDifferentCornerSize: number = 0;
            public static ShapeAppearance_MaterialComponents: number = 0;
            public static ShapeAppearance_MaterialComponents_LargeComponent: number = 0;
            public static ShapeAppearance_MaterialComponents_MediumComponent: number = 0;
            public static ShapeAppearance_MaterialComponents_SmallComponent: number = 0;
            public static ShapeAppearance_MaterialComponents_Test: number = 0;
            public static ShapeAppearance_MaterialComponents_Tooltip: number = 0;
            public static TestStyleWithLineHeight: number = 0;
            public static TestStyleWithLineHeightAppearance: number = 0;
            public static TestStyleWithThemeLineHeightAttribute: number = 0;
            public static TestStyleWithoutLineHeight: number = 0;
            public static TestThemeWithLineHeight: number = 0;
            public static TestThemeWithLineHeightDisabled: number = 0;
            public static Test_ShapeAppearanceOverlay_MaterialComponents_MaterialCalendar_Day: number = 0;
            public static Test_Theme_MaterialComponents_MaterialCalendar: number = 0;
            public static Test_Widget_MaterialComponents_MaterialCalendar: number = 0;
            public static Test_Widget_MaterialComponents_MaterialCalendar_Day: number = 0;
            public static Test_Widget_MaterialComponents_MaterialCalendar_Day_Selected: number = 0;
            public static TextAppearance_AppCompat: number = 0;
            public static TextAppearance_AppCompat_Body1: number = 0;
            public static TextAppearance_AppCompat_Body2: number = 0;
            public static TextAppearance_AppCompat_Button: number = 0;
            public static TextAppearance_AppCompat_Caption: number = 0;
            public static TextAppearance_AppCompat_Display1: number = 0;
            public static TextAppearance_AppCompat_Display2: number = 0;
            public static TextAppearance_AppCompat_Display3: number = 0;
            public static TextAppearance_AppCompat_Display4: number = 0;
            public static TextAppearance_AppCompat_Headline: number = 0;
            public static TextAppearance_AppCompat_Inverse: number = 0;
            public static TextAppearance_AppCompat_Large: number = 0;
            public static TextAppearance_AppCompat_Large_Inverse: number = 0;
            public static TextAppearance_AppCompat_Light_SearchResult_Subtitle: number = 0;
            public static TextAppearance_AppCompat_Light_SearchResult_Title: number = 0;
            public static TextAppearance_AppCompat_Light_Widget_PopupMenu_Large: number = 0;
            public static TextAppearance_AppCompat_Light_Widget_PopupMenu_Small: number = 0;
            public static TextAppearance_AppCompat_Medium: number = 0;
            public static TextAppearance_AppCompat_Medium_Inverse: number = 0;
            public static TextAppearance_AppCompat_Menu: number = 0;
            public static TextAppearance_AppCompat_SearchResult_Subtitle: number = 0;
            public static TextAppearance_AppCompat_SearchResult_Title: number = 0;
            public static TextAppearance_AppCompat_Small: number = 0;
            public static TextAppearance_AppCompat_Small_Inverse: number = 0;
            public static TextAppearance_AppCompat_Subhead: number = 0;
            public static TextAppearance_AppCompat_Subhead_Inverse: number = 0;
            public static TextAppearance_AppCompat_Title: number = 0;
            public static TextAppearance_AppCompat_Title_Inverse: number = 0;
            public static TextAppearance_AppCompat_Tooltip: number = 0;
            public static TextAppearance_AppCompat_Widget_ActionBar_Menu: number = 0;
            public static TextAppearance_AppCompat_Widget_ActionBar_Subtitle: number = 0;
            public static TextAppearance_AppCompat_Widget_ActionBar_Subtitle_Inverse: number = 0;
            public static TextAppearance_AppCompat_Widget_ActionBar_Title: number = 0;
            public static TextAppearance_AppCompat_Widget_ActionBar_Title_Inverse: number = 0;
            public static TextAppearance_AppCompat_Widget_ActionMode_Subtitle: number = 0;
            public static TextAppearance_AppCompat_Widget_ActionMode_Subtitle_Inverse: number = 0;
            public static TextAppearance_AppCompat_Widget_ActionMode_Title: number = 0;
            public static TextAppearance_AppCompat_Widget_ActionMode_Title_Inverse: number = 0;
            public static TextAppearance_AppCompat_Widget_Button: number = 0;
            public static TextAppearance_AppCompat_Widget_Button_Borderless_Colored: number = 0;
            public static TextAppearance_AppCompat_Widget_Button_Colored: number = 0;
            public static TextAppearance_AppCompat_Widget_Button_Inverse: number = 0;
            public static TextAppearance_AppCompat_Widget_DropDownItem: number = 0;
            public static TextAppearance_AppCompat_Widget_PopupMenu_Header: number = 0;
            public static TextAppearance_AppCompat_Widget_PopupMenu_Large: number = 0;
            public static TextAppearance_AppCompat_Widget_PopupMenu_Small: number = 0;
            public static TextAppearance_AppCompat_Widget_Switch: number = 0;
            public static TextAppearance_AppCompat_Widget_TextView_SpinnerItem: number = 0;
            public static TextAppearance_Compat_Notification: number = 0;
            public static TextAppearance_Compat_Notification_Info: number = 0;
            public static TextAppearance_Compat_Notification_Info_Media: number = 0;
            public static TextAppearance_Compat_Notification_Line2: number = 0;
            public static TextAppearance_Compat_Notification_Line2_Media: number = 0;
            public static TextAppearance_Compat_Notification_Media: number = 0;
            public static TextAppearance_Compat_Notification_Time: number = 0;
            public static TextAppearance_Compat_Notification_Time_Media: number = 0;
            public static TextAppearance_Compat_Notification_Title: number = 0;
            public static TextAppearance_Compat_Notification_Title_Media: number = 0;
            public static TextAppearance_Design_CollapsingToolbar_Expanded: number = 0;
            public static TextAppearance_Design_Counter: number = 0;
            public static TextAppearance_Design_Counter_Overflow: number = 0;
            public static TextAppearance_Design_Error: number = 0;
            public static TextAppearance_Design_HelperText: number = 0;
            public static TextAppearance_Design_Hint: number = 0;
            public static TextAppearance_Design_Placeholder: number = 0;
            public static TextAppearance_Design_Prefix: number = 0;
            public static TextAppearance_Design_Snackbar_Message: number = 0;
            public static TextAppearance_Design_Suffix: number = 0;
            public static TextAppearance_Design_Tab: number = 0;
            public static TextAppearance_MaterialComponents_Badge: number = 0;
            public static TextAppearance_MaterialComponents_Body1: number = 0;
            public static TextAppearance_MaterialComponents_Body2: number = 0;
            public static TextAppearance_MaterialComponents_Button: number = 0;
            public static TextAppearance_MaterialComponents_Caption: number = 0;
            public static TextAppearance_MaterialComponents_Chip: number = 0;
            public static TextAppearance_MaterialComponents_Headline1: number = 0;
            public static TextAppearance_MaterialComponents_Headline2: number = 0;
            public static TextAppearance_MaterialComponents_Headline3: number = 0;
            public static TextAppearance_MaterialComponents_Headline4: number = 0;
            public static TextAppearance_MaterialComponents_Headline5: number = 0;
            public static TextAppearance_MaterialComponents_Headline6: number = 0;
            public static TextAppearance_MaterialComponents_Overline: number = 0;
            public static TextAppearance_MaterialComponents_Subtitle1: number = 0;
            public static TextAppearance_MaterialComponents_Subtitle2: number = 0;
            public static TextAppearance_MaterialComponents_TimePicker_Title: number = 0;
            public static TextAppearance_MaterialComponents_Tooltip: number = 0;
            public static TextAppearance_Widget_AppCompat_ExpandedMenu_Item: number = 0;
            public static TextAppearance_Widget_AppCompat_Toolbar_Subtitle: number = 0;
            public static TextAppearance_Widget_AppCompat_Toolbar_Title: number = 0;
            public static ThemeOverlayColorAccentRed: number = 0;
            public static ThemeOverlay_AppCompat: number = 0;
            public static ThemeOverlay_AppCompat_ActionBar: number = 0;
            public static ThemeOverlay_AppCompat_Dark: number = 0;
            public static ThemeOverlay_AppCompat_Dark_ActionBar: number = 0;
            public static ThemeOverlay_AppCompat_DayNight: number = 0;
            public static ThemeOverlay_AppCompat_DayNight_ActionBar: number = 0;
            public static ThemeOverlay_AppCompat_Dialog: number = 0;
            public static ThemeOverlay_AppCompat_Dialog_Alert: number = 0;
            public static ThemeOverlay_AppCompat_Light: number = 0;
            public static ThemeOverlay_Design_TextInputEditText: number = 0;
            public static ThemeOverlay_MaterialComponents: number = 0;
            public static ThemeOverlay_MaterialComponents_ActionBar: number = 0;
            public static ThemeOverlay_MaterialComponents_ActionBar_Primary: number = 0;
            public static ThemeOverlay_MaterialComponents_ActionBar_Surface: number = 0;
            public static ThemeOverlay_MaterialComponents_AutoCompleteTextView: number = 0;
            public static ThemeOverlay_MaterialComponents_AutoCompleteTextView_FilledBox: number = 0;
            public static ThemeOverlay_MaterialComponents_AutoCompleteTextView_FilledBox_Dense: number = 0;
            public static ThemeOverlay_MaterialComponents_AutoCompleteTextView_OutlinedBox: number = 0;
            public static ThemeOverlay_MaterialComponents_AutoCompleteTextView_OutlinedBox_Dense: number = 0;
            public static ThemeOverlay_MaterialComponents_BottomAppBar_Primary: number = 0;
            public static ThemeOverlay_MaterialComponents_BottomAppBar_Surface: number = 0;
            public static ThemeOverlay_MaterialComponents_BottomSheetDialog: number = 0;
            public static ThemeOverlay_MaterialComponents_Dark: number = 0;
            public static ThemeOverlay_MaterialComponents_Dark_ActionBar: number = 0;
            public static ThemeOverlay_MaterialComponents_DayNight_BottomSheetDialog: number = 0;
            public static ThemeOverlay_MaterialComponents_Dialog: number = 0;
            public static ThemeOverlay_MaterialComponents_Dialog_Alert: number = 0;
            public static ThemeOverlay_MaterialComponents_Dialog_Alert_Framework: number = 0;
            public static ThemeOverlay_MaterialComponents_Light: number = 0;
            public static ThemeOverlay_MaterialComponents_Light_Dialog_Alert_Framework: number = 0;
            public static ThemeOverlay_MaterialComponents_MaterialAlertDialog: number = 0;
            public static ThemeOverlay_MaterialComponents_MaterialAlertDialog_Centered: number = 0;
            public static ThemeOverlay_MaterialComponents_MaterialAlertDialog_Picker_Date: number = 0;
            public static ThemeOverlay_MaterialComponents_MaterialAlertDialog_Picker_Date_Calendar: number = 0;
            public static ThemeOverlay_MaterialComponents_MaterialAlertDialog_Picker_Date_Header_Text: number = 0;
            public static ThemeOverlay_MaterialComponents_MaterialAlertDialog_Picker_Date_Header_Text_Day: number = 0;
            public static ThemeOverlay_MaterialComponents_MaterialAlertDialog_Picker_Date_Spinner: number = 0;
            public static ThemeOverlay_MaterialComponents_MaterialCalendar: number = 0;
            public static ThemeOverlay_MaterialComponents_MaterialCalendar_Fullscreen: number = 0;
            public static ThemeOverlay_MaterialComponents_TextInputEditText: number = 0;
            public static ThemeOverlay_MaterialComponents_TextInputEditText_FilledBox: number = 0;
            public static ThemeOverlay_MaterialComponents_TextInputEditText_FilledBox_Dense: number = 0;
            public static ThemeOverlay_MaterialComponents_TextInputEditText_OutlinedBox: number = 0;
            public static ThemeOverlay_MaterialComponents_TextInputEditText_OutlinedBox_Dense: number = 0;
            public static ThemeOverlay_MaterialComponents_TimePicker: number = 0;
            public static ThemeOverlay_MaterialComponents_TimePicker_Display: number = 0;
            public static ThemeOverlay_MaterialComponents_Toolbar_Primary: number = 0;
            public static ThemeOverlay_MaterialComponents_Toolbar_Surface: number = 0;
            public static Theme_AppCompat: number = 0;
            public static Theme_AppCompat_CompactMenu: number = 0;
            public static Theme_AppCompat_DayNight: number = 0;
            public static Theme_AppCompat_DayNight_DarkActionBar: number = 0;
            public static Theme_AppCompat_DayNight_Dialog: number = 0;
            public static Theme_AppCompat_DayNight_DialogWhenLarge: number = 0;
            public static Theme_AppCompat_DayNight_Dialog_Alert: number = 0;
            public static Theme_AppCompat_DayNight_Dialog_MinWidth: number = 0;
            public static Theme_AppCompat_DayNight_NoActionBar: number = 0;
            public static Theme_AppCompat_Dialog: number = 0;
            public static Theme_AppCompat_DialogWhenLarge: number = 0;
            public static Theme_AppCompat_Dialog_Alert: number = 0;
            public static Theme_AppCompat_Dialog_MinWidth: number = 0;
            public static Theme_AppCompat_Empty: number = 0;
            public static Theme_AppCompat_Light: number = 0;
            public static Theme_AppCompat_Light_DarkActionBar: number = 0;
            public static Theme_AppCompat_Light_Dialog: number = 0;
            public static Theme_AppCompat_Light_DialogWhenLarge: number = 0;
            public static Theme_AppCompat_Light_Dialog_Alert: number = 0;
            public static Theme_AppCompat_Light_Dialog_MinWidth: number = 0;
            public static Theme_AppCompat_Light_NoActionBar: number = 0;
            public static Theme_AppCompat_NoActionBar: number = 0;
            public static Theme_Design: number = 0;
            public static Theme_Design_BottomSheetDialog: number = 0;
            public static Theme_Design_Light: number = 0;
            public static Theme_Design_Light_BottomSheetDialog: number = 0;
            public static Theme_Design_Light_NoActionBar: number = 0;
            public static Theme_Design_NoActionBar: number = 0;
            public static Theme_MaterialComponents: number = 0;
            public static Theme_MaterialComponents_BottomSheetDialog: number = 0;
            public static Theme_MaterialComponents_Bridge: number = 0;
            public static Theme_MaterialComponents_CompactMenu: number = 0;
            public static Theme_MaterialComponents_DayNight: number = 0;
            public static Theme_MaterialComponents_DayNight_BottomSheetDialog: number = 0;
            public static Theme_MaterialComponents_DayNight_Bridge: number = 0;
            public static Theme_MaterialComponents_DayNight_DarkActionBar: number = 0;
            public static Theme_MaterialComponents_DayNight_DarkActionBar_Bridge: number = 0;
            public static Theme_MaterialComponents_DayNight_Dialog: number = 0;
            public static Theme_MaterialComponents_DayNight_DialogWhenLarge: number = 0;
            public static Theme_MaterialComponents_DayNight_Dialog_Alert: number = 0;
            public static Theme_MaterialComponents_DayNight_Dialog_Alert_Bridge: number = 0;
            public static Theme_MaterialComponents_DayNight_Dialog_Bridge: number = 0;
            public static Theme_MaterialComponents_DayNight_Dialog_FixedSize: number = 0;
            public static Theme_MaterialComponents_DayNight_Dialog_FixedSize_Bridge: number = 0;
            public static Theme_MaterialComponents_DayNight_Dialog_MinWidth: number = 0;
            public static Theme_MaterialComponents_DayNight_Dialog_MinWidth_Bridge: number = 0;
            public static Theme_MaterialComponents_DayNight_NoActionBar: number = 0;
            public static Theme_MaterialComponents_DayNight_NoActionBar_Bridge: number = 0;
            public static Theme_MaterialComponents_Dialog: number = 0;
            public static Theme_MaterialComponents_DialogWhenLarge: number = 0;
            public static Theme_MaterialComponents_Dialog_Alert: number = 0;
            public static Theme_MaterialComponents_Dialog_Alert_Bridge: number = 0;
            public static Theme_MaterialComponents_Dialog_Bridge: number = 0;
            public static Theme_MaterialComponents_Dialog_FixedSize: number = 0;
            public static Theme_MaterialComponents_Dialog_FixedSize_Bridge: number = 0;
            public static Theme_MaterialComponents_Dialog_MinWidth: number = 0;
            public static Theme_MaterialComponents_Dialog_MinWidth_Bridge: number = 0;
            public static Theme_MaterialComponents_Light: number = 0;
            public static Theme_MaterialComponents_Light_BarSize: number = 0;
            public static Theme_MaterialComponents_Light_BottomSheetDialog: number = 0;
            public static Theme_MaterialComponents_Light_Bridge: number = 0;
            public static Theme_MaterialComponents_Light_DarkActionBar: number = 0;
            public static Theme_MaterialComponents_Light_DarkActionBar_Bridge: number = 0;
            public static Theme_MaterialComponents_Light_Dialog: number = 0;
            public static Theme_MaterialComponents_Light_DialogWhenLarge: number = 0;
            public static Theme_MaterialComponents_Light_Dialog_Alert: number = 0;
            public static Theme_MaterialComponents_Light_Dialog_Alert_Bridge: number = 0;
            public static Theme_MaterialComponents_Light_Dialog_Bridge: number = 0;
            public static Theme_MaterialComponents_Light_Dialog_FixedSize: number = 0;
            public static Theme_MaterialComponents_Light_Dialog_FixedSize_Bridge: number = 0;
            public static Theme_MaterialComponents_Light_Dialog_MinWidth: number = 0;
            public static Theme_MaterialComponents_Light_Dialog_MinWidth_Bridge: number = 0;
            public static Theme_MaterialComponents_Light_LargeTouch: number = 0;
            public static Theme_MaterialComponents_Light_NoActionBar: number = 0;
            public static Theme_MaterialComponents_Light_NoActionBar_Bridge: number = 0;
            public static Theme_MaterialComponents_NoActionBar: number = 0;
            public static Theme_MaterialComponents_NoActionBar_Bridge: number = 0;
            public static Widget_AppCompat_ActionBar: number = 0;
            public static Widget_AppCompat_ActionBar_Solid: number = 0;
            public static Widget_AppCompat_ActionBar_TabBar: number = 0;
            public static Widget_AppCompat_ActionBar_TabText: number = 0;
            public static Widget_AppCompat_ActionBar_TabView: number = 0;
            public static Widget_AppCompat_ActionButton: number = 0;
            public static Widget_AppCompat_ActionButton_CloseMode: number = 0;
            public static Widget_AppCompat_ActionButton_Overflow: number = 0;
            public static Widget_AppCompat_ActionMode: number = 0;
            public static Widget_AppCompat_ActivityChooserView: number = 0;
            public static Widget_AppCompat_AutoCompleteTextView: number = 0;
            public static Widget_AppCompat_Button: number = 0;
            public static Widget_AppCompat_ButtonBar: number = 0;
            public static Widget_AppCompat_ButtonBar_AlertDialog: number = 0;
            public static Widget_AppCompat_Button_Borderless: number = 0;
            public static Widget_AppCompat_Button_Borderless_Colored: number = 0;
            public static Widget_AppCompat_Button_ButtonBar_AlertDialog: number = 0;
            public static Widget_AppCompat_Button_Colored: number = 0;
            public static Widget_AppCompat_Button_Small: number = 0;
            public static Widget_AppCompat_CompoundButton_CheckBox: number = 0;
            public static Widget_AppCompat_CompoundButton_RadioButton: number = 0;
            public static Widget_AppCompat_CompoundButton_Switch: number = 0;
            public static Widget_AppCompat_DrawerArrowToggle: number = 0;
            public static Widget_AppCompat_DropDownItem_Spinner: number = 0;
            public static Widget_AppCompat_EditText: number = 0;
            public static Widget_AppCompat_ImageButton: number = 0;
            public static Widget_AppCompat_Light_ActionBar: number = 0;
            public static Widget_AppCompat_Light_ActionBar_Solid: number = 0;
            public static Widget_AppCompat_Light_ActionBar_Solid_Inverse: number = 0;
            public static Widget_AppCompat_Light_ActionBar_TabBar: number = 0;
            public static Widget_AppCompat_Light_ActionBar_TabBar_Inverse: number = 0;
            public static Widget_AppCompat_Light_ActionBar_TabText: number = 0;
            public static Widget_AppCompat_Light_ActionBar_TabText_Inverse: number = 0;
            public static Widget_AppCompat_Light_ActionBar_TabView: number = 0;
            public static Widget_AppCompat_Light_ActionBar_TabView_Inverse: number = 0;
            public static Widget_AppCompat_Light_ActionButton: number = 0;
            public static Widget_AppCompat_Light_ActionButton_CloseMode: number = 0;
            public static Widget_AppCompat_Light_ActionButton_Overflow: number = 0;
            public static Widget_AppCompat_Light_ActionMode_Inverse: number = 0;
            public static Widget_AppCompat_Light_ActivityChooserView: number = 0;
            public static Widget_AppCompat_Light_AutoCompleteTextView: number = 0;
            public static Widget_AppCompat_Light_DropDownItem_Spinner: number = 0;
            public static Widget_AppCompat_Light_ListPopupWindow: number = 0;
            public static Widget_AppCompat_Light_ListView_DropDown: number = 0;
            public static Widget_AppCompat_Light_PopupMenu: number = 0;
            public static Widget_AppCompat_Light_PopupMenu_Overflow: number = 0;
            public static Widget_AppCompat_Light_SearchView: number = 0;
            public static Widget_AppCompat_Light_Spinner_DropDown_ActionBar: number = 0;
            public static Widget_AppCompat_ListMenuView: number = 0;
            public static Widget_AppCompat_ListPopupWindow: number = 0;
            public static Widget_AppCompat_ListView: number = 0;
            public static Widget_AppCompat_ListView_DropDown: number = 0;
            public static Widget_AppCompat_ListView_Menu: number = 0;
            public static Widget_AppCompat_PopupMenu: number = 0;
            public static Widget_AppCompat_PopupMenu_Overflow: number = 0;
            public static Widget_AppCompat_PopupWindow: number = 0;
            public static Widget_AppCompat_ProgressBar: number = 0;
            public static Widget_AppCompat_ProgressBar_Horizontal: number = 0;
            public static Widget_AppCompat_RatingBar: number = 0;
            public static Widget_AppCompat_RatingBar_Indicator: number = 0;
            public static Widget_AppCompat_RatingBar_Small: number = 0;
            public static Widget_AppCompat_SearchView: number = 0;
            public static Widget_AppCompat_SearchView_ActionBar: number = 0;
            public static Widget_AppCompat_SeekBar: number = 0;
            public static Widget_AppCompat_SeekBar_Discrete: number = 0;
            public static Widget_AppCompat_Spinner: number = 0;
            public static Widget_AppCompat_Spinner_DropDown: number = 0;
            public static Widget_AppCompat_Spinner_DropDown_ActionBar: number = 0;
            public static Widget_AppCompat_Spinner_Underlined: number = 0;
            public static Widget_AppCompat_TextView: number = 0;
            public static Widget_AppCompat_TextView_SpinnerItem: number = 0;
            public static Widget_AppCompat_Toolbar: number = 0;
            public static Widget_AppCompat_Toolbar_Button_Navigation: number = 0;
            public static Widget_Compat_NotificationActionContainer: number = 0;
            public static Widget_Compat_NotificationActionText: number = 0;
            public static Widget_Design_AppBarLayout: number = 0;
            public static Widget_Design_BottomNavigationView: number = 0;
            public static Widget_Design_BottomSheet_Modal: number = 0;
            public static Widget_Design_CollapsingToolbar: number = 0;
            public static Widget_Design_FloatingActionButton: number = 0;
            public static Widget_Design_NavigationView: number = 0;
            public static Widget_Design_ScrimInsetsFrameLayout: number = 0;
            public static Widget_Design_Snackbar: number = 0;
            public static Widget_Design_TabLayout: number = 0;
            public static Widget_Design_TextInputEditText: number = 0;
            public static Widget_Design_TextInputLayout: number = 0;
            public static Widget_MaterialComponents_ActionBar_Primary: number = 0;
            public static Widget_MaterialComponents_ActionBar_PrimarySurface: number = 0;
            public static Widget_MaterialComponents_ActionBar_Solid: number = 0;
            public static Widget_MaterialComponents_ActionBar_Surface: number = 0;
            public static Widget_MaterialComponents_AppBarLayout_Primary: number = 0;
            public static Widget_MaterialComponents_AppBarLayout_PrimarySurface: number = 0;
            public static Widget_MaterialComponents_AppBarLayout_Surface: number = 0;
            public static Widget_MaterialComponents_AutoCompleteTextView_FilledBox: number = 0;
            public static Widget_MaterialComponents_AutoCompleteTextView_FilledBox_Dense: number = 0;
            public static Widget_MaterialComponents_AutoCompleteTextView_OutlinedBox: number = 0;
            public static Widget_MaterialComponents_AutoCompleteTextView_OutlinedBox_Dense: number = 0;
            public static Widget_MaterialComponents_Badge: number = 0;
            public static Widget_MaterialComponents_BottomAppBar: number = 0;
            public static Widget_MaterialComponents_BottomAppBar_Colored: number = 0;
            public static Widget_MaterialComponents_BottomAppBar_PrimarySurface: number = 0;
            public static Widget_MaterialComponents_BottomNavigationView: number = 0;
            public static Widget_MaterialComponents_BottomNavigationView_Colored: number = 0;
            public static Widget_MaterialComponents_BottomNavigationView_PrimarySurface: number = 0;
            public static Widget_MaterialComponents_BottomSheet: number = 0;
            public static Widget_MaterialComponents_BottomSheet_Modal: number = 0;
            public static Widget_MaterialComponents_Button: number = 0;
            public static Widget_MaterialComponents_Button_Icon: number = 0;
            public static Widget_MaterialComponents_Button_OutlinedButton: number = 0;
            public static Widget_MaterialComponents_Button_OutlinedButton_Icon: number = 0;
            public static Widget_MaterialComponents_Button_TextButton: number = 0;
            public static Widget_MaterialComponents_Button_TextButton_Dialog: number = 0;
            public static Widget_MaterialComponents_Button_TextButton_Dialog_Flush: number = 0;
            public static Widget_MaterialComponents_Button_TextButton_Dialog_Icon: number = 0;
            public static Widget_MaterialComponents_Button_TextButton_Icon: number = 0;
            public static Widget_MaterialComponents_Button_TextButton_Snackbar: number = 0;
            public static Widget_MaterialComponents_Button_UnelevatedButton: number = 0;
            public static Widget_MaterialComponents_Button_UnelevatedButton_Icon: number = 0;
            public static Widget_MaterialComponents_CardView: number = 0;
            public static Widget_MaterialComponents_CheckedTextView: number = 0;
            public static Widget_MaterialComponents_ChipGroup: number = 0;
            public static Widget_MaterialComponents_Chip_Action: number = 0;
            public static Widget_MaterialComponents_Chip_Choice: number = 0;
            public static Widget_MaterialComponents_Chip_Entry: number = 0;
            public static Widget_MaterialComponents_Chip_Filter: number = 0;
            public static Widget_MaterialComponents_CircularProgressIndicator: number = 0;
            public static Widget_MaterialComponents_CircularProgressIndicator_ExtraSmall: number = 0;
            public static Widget_MaterialComponents_CircularProgressIndicator_Medium: number = 0;
            public static Widget_MaterialComponents_CircularProgressIndicator_Small: number = 0;
            public static Widget_MaterialComponents_CollapsingToolbar: number = 0;
            public static Widget_MaterialComponents_CompoundButton_CheckBox: number = 0;
            public static Widget_MaterialComponents_CompoundButton_RadioButton: number = 0;
            public static Widget_MaterialComponents_CompoundButton_Switch: number = 0;
            public static Widget_MaterialComponents_ExtendedFloatingActionButton: number = 0;
            public static Widget_MaterialComponents_ExtendedFloatingActionButton_Icon: number = 0;
            public static Widget_MaterialComponents_FloatingActionButton: number = 0;
            public static Widget_MaterialComponents_Light_ActionBar_Solid: number = 0;
            public static Widget_MaterialComponents_LinearProgressIndicator: number = 0;
            public static Widget_MaterialComponents_MaterialButtonToggleGroup: number = 0;
            public static Widget_MaterialComponents_MaterialCalendar: number = 0;
            public static Widget_MaterialComponents_MaterialCalendar_Day: number = 0;
            public static Widget_MaterialComponents_MaterialCalendar_DayTextView: number = 0;
            public static Widget_MaterialComponents_MaterialCalendar_Day_Invalid: number = 0;
            public static Widget_MaterialComponents_MaterialCalendar_Day_Selected: number = 0;
            public static Widget_MaterialComponents_MaterialCalendar_Day_Today: number = 0;
            public static Widget_MaterialComponents_MaterialCalendar_Fullscreen: number = 0;
            public static Widget_MaterialComponents_MaterialCalendar_HeaderCancelButton: number = 0;
            public static Widget_MaterialComponents_MaterialCalendar_HeaderConfirmButton: number = 0;
            public static Widget_MaterialComponents_MaterialCalendar_HeaderDivider: number = 0;
            public static Widget_MaterialComponents_MaterialCalendar_HeaderLayout: number = 0;
            public static Widget_MaterialComponents_MaterialCalendar_HeaderSelection: number = 0;
            public static Widget_MaterialComponents_MaterialCalendar_HeaderSelection_Fullscreen: number = 0;
            public static Widget_MaterialComponents_MaterialCalendar_HeaderTitle: number = 0;
            public static Widget_MaterialComponents_MaterialCalendar_HeaderToggleButton: number = 0;
            public static Widget_MaterialComponents_MaterialCalendar_Item: number = 0;
            public static Widget_MaterialComponents_MaterialCalendar_MonthNavigationButton: number = 0;
            public static Widget_MaterialComponents_MaterialCalendar_MonthTextView: number = 0;
            public static Widget_MaterialComponents_MaterialCalendar_Year: number = 0;
            public static Widget_MaterialComponents_MaterialCalendar_YearNavigationButton: number = 0;
            public static Widget_MaterialComponents_MaterialCalendar_Year_Selected: number = 0;
            public static Widget_MaterialComponents_MaterialCalendar_Year_Today: number = 0;
            public static Widget_MaterialComponents_NavigationRailView: number = 0;
            public static Widget_MaterialComponents_NavigationRailView_Colored: number = 0;
            public static Widget_MaterialComponents_NavigationRailView_Colored_Compact: number = 0;
            public static Widget_MaterialComponents_NavigationRailView_Compact: number = 0;
            public static Widget_MaterialComponents_NavigationRailView_PrimarySurface: number = 0;
            public static Widget_MaterialComponents_NavigationView: number = 0;
            public static Widget_MaterialComponents_PopupMenu: number = 0;
            public static Widget_MaterialComponents_PopupMenu_ContextMenu: number = 0;
            public static Widget_MaterialComponents_PopupMenu_ListPopupWindow: number = 0;
            public static Widget_MaterialComponents_PopupMenu_Overflow: number = 0;
            public static Widget_MaterialComponents_ProgressIndicator: number = 0;
            public static Widget_MaterialComponents_ShapeableImageView: number = 0;
            public static Widget_MaterialComponents_Slider: number = 0;
            public static Widget_MaterialComponents_Snackbar: number = 0;
            public static Widget_MaterialComponents_Snackbar_FullWidth: number = 0;
            public static Widget_MaterialComponents_Snackbar_TextView: number = 0;
            public static Widget_MaterialComponents_TabLayout: number = 0;
            public static Widget_MaterialComponents_TabLayout_Colored: number = 0;
            public static Widget_MaterialComponents_TabLayout_PrimarySurface: number = 0;
            public static Widget_MaterialComponents_TextInputEditText_FilledBox: number = 0;
            public static Widget_MaterialComponents_TextInputEditText_FilledBox_Dense: number = 0;
            public static Widget_MaterialComponents_TextInputEditText_OutlinedBox: number = 0;
            public static Widget_MaterialComponents_TextInputEditText_OutlinedBox_Dense: number = 0;
            public static Widget_MaterialComponents_TextInputLayout_FilledBox: number = 0;
            public static Widget_MaterialComponents_TextInputLayout_FilledBox_Dense: number = 0;
            public static Widget_MaterialComponents_TextInputLayout_FilledBox_Dense_ExposedDropdownMenu: number = 0;
            public static Widget_MaterialComponents_TextInputLayout_FilledBox_ExposedDropdownMenu: number = 0;
            public static Widget_MaterialComponents_TextInputLayout_OutlinedBox: number = 0;
            public static Widget_MaterialComponents_TextInputLayout_OutlinedBox_Dense: number = 0;
            public static Widget_MaterialComponents_TextInputLayout_OutlinedBox_Dense_ExposedDropdownMenu: number = 0;
            public static Widget_MaterialComponents_TextInputLayout_OutlinedBox_ExposedDropdownMenu: number = 0;
            public static Widget_MaterialComponents_TextView: number = 0;
            public static Widget_MaterialComponents_TimePicker: number = 0;
            public static Widget_MaterialComponents_TimePicker_Button: number = 0;
            public static Widget_MaterialComponents_TimePicker_Clock: number = 0;
            public static Widget_MaterialComponents_TimePicker_Display: number = 0;
            public static Widget_MaterialComponents_TimePicker_Display_TextInputEditText: number = 0;
            public static Widget_MaterialComponents_TimePicker_ImageButton: number = 0;
            public static Widget_MaterialComponents_TimePicker_ImageButton_ShapeAppearance: number = 0;
            public static Widget_MaterialComponents_Toolbar: number = 0;
            public static Widget_MaterialComponents_Toolbar_Primary: number = 0;
            public static Widget_MaterialComponents_Toolbar_PrimarySurface: number = 0;
            public static Widget_MaterialComponents_Toolbar_Surface: number = 0;
            public static Widget_MaterialComponents_Tooltip: number = 0;
            public static Widget_Support_CoordinatorLayout: number = 0;
          }
          export class styleable {
            public static class: java.lang.Class<com.cloudinary.android.core.R.styleable>;
            public static ActionBar: androidNative.Array<number>;
            public static ActionBar_background: number = 0;
            public static ActionBar_backgroundSplit: number = 1;
            public static ActionBar_backgroundStacked: number = 2;
            public static ActionBar_contentInsetEnd: number = 3;
            public static ActionBar_contentInsetEndWithActions: number = 4;
            public static ActionBar_contentInsetLeft: number = 5;
            public static ActionBar_contentInsetRight: number = 6;
            public static ActionBar_contentInsetStart: number = 7;
            public static ActionBar_contentInsetStartWithNavigation: number = 8;
            public static ActionBar_customNavigationLayout: number = 9;
            public static ActionBar_displayOptions: number = 10;
            public static ActionBar_divider: number = 11;
            public static ActionBar_elevation: number = 12;
            public static ActionBar_height: number = 13;
            public static ActionBar_hideOnContentScroll: number = 14;
            public static ActionBar_homeAsUpIndicator: number = 15;
            public static ActionBar_homeLayout: number = 16;
            public static ActionBar_icon: number = 17;
            public static ActionBar_indeterminateProgressStyle: number = 18;
            public static ActionBar_itemPadding: number = 19;
            public static ActionBar_logo: number = 20;
            public static ActionBar_navigationMode: number = 21;
            public static ActionBar_popupTheme: number = 22;
            public static ActionBar_progressBarPadding: number = 23;
            public static ActionBar_progressBarStyle: number = 24;
            public static ActionBar_subtitle: number = 25;
            public static ActionBar_subtitleTextStyle: number = 26;
            public static ActionBar_title: number = 27;
            public static ActionBar_titleTextStyle: number = 28;
            public static ActionBarLayout: androidNative.Array<number>;
            public static ActionBarLayout_android_layout_gravity: number = 0;
            public static ActionMenuItemView: androidNative.Array<number>;
            public static ActionMenuItemView_android_minWidth: number = 0;
            public static ActionMenuView: androidNative.Array<number>;
            public static ActionMode: androidNative.Array<number>;
            public static ActionMode_background: number = 0;
            public static ActionMode_backgroundSplit: number = 1;
            public static ActionMode_closeItemLayout: number = 2;
            public static ActionMode_height: number = 3;
            public static ActionMode_subtitleTextStyle: number = 4;
            public static ActionMode_titleTextStyle: number = 5;
            public static ActivityChooserView: androidNative.Array<number>;
            public static ActivityChooserView_expandActivityOverflowButtonDrawable: number = 0;
            public static ActivityChooserView_initialActivityCount: number = 1;
            public static AlertDialog: androidNative.Array<number>;
            public static AlertDialog_android_layout: number = 0;
            public static AlertDialog_buttonIconDimen: number = 1;
            public static AlertDialog_buttonPanelSideLayout: number = 2;
            public static AlertDialog_listItemLayout: number = 3;
            public static AlertDialog_listLayout: number = 4;
            public static AlertDialog_multiChoiceItemLayout: number = 5;
            public static AlertDialog_showTitle: number = 6;
            public static AlertDialog_singleChoiceItemLayout: number = 7;
            public static AnimatedStateListDrawableCompat: androidNative.Array<number>;
            public static AnimatedStateListDrawableCompat_android_constantSize: number = 0;
            public static AnimatedStateListDrawableCompat_android_dither: number = 1;
            public static AnimatedStateListDrawableCompat_android_enterFadeDuration: number = 2;
            public static AnimatedStateListDrawableCompat_android_exitFadeDuration: number = 3;
            public static AnimatedStateListDrawableCompat_android_variablePadding: number = 4;
            public static AnimatedStateListDrawableCompat_android_visible: number = 5;
            public static AnimatedStateListDrawableItem: androidNative.Array<number>;
            public static AnimatedStateListDrawableItem_android_drawable: number = 0;
            public static AnimatedStateListDrawableItem_android_id: number = 1;
            public static AnimatedStateListDrawableTransition: androidNative.Array<number>;
            public static AnimatedStateListDrawableTransition_android_drawable: number = 0;
            public static AnimatedStateListDrawableTransition_android_fromId: number = 1;
            public static AnimatedStateListDrawableTransition_android_reversible: number = 2;
            public static AnimatedStateListDrawableTransition_android_toId: number = 3;
            public static AppBarLayout: androidNative.Array<number>;
            public static AppBarLayout_android_background: number = 0;
            public static AppBarLayout_android_keyboardNavigationCluster: number = 1;
            public static AppBarLayout_android_touchscreenBlocksFocus: number = 2;
            public static AppBarLayout_elevation: number = 3;
            public static AppBarLayout_expanded: number = 4;
            public static AppBarLayout_liftOnScroll: number = 5;
            public static AppBarLayout_liftOnScrollTargetViewId: number = 6;
            public static AppBarLayout_statusBarForeground: number = 7;
            public static AppBarLayoutStates: androidNative.Array<number>;
            public static AppBarLayoutStates_state_collapsed: number = 0;
            public static AppBarLayoutStates_state_collapsible: number = 1;
            public static AppBarLayoutStates_state_liftable: number = 2;
            public static AppBarLayoutStates_state_lifted: number = 3;
            public static AppBarLayout_Layout: androidNative.Array<number>;
            public static AppBarLayout_Layout_layout_scrollFlags: number = 0;
            public static AppBarLayout_Layout_layout_scrollInterpolator: number = 1;
            public static AppCompatImageView: androidNative.Array<number>;
            public static AppCompatImageView_android_src: number = 0;
            public static AppCompatImageView_srcCompat: number = 1;
            public static AppCompatImageView_tint: number = 2;
            public static AppCompatImageView_tintMode: number = 3;
            public static AppCompatSeekBar: androidNative.Array<number>;
            public static AppCompatSeekBar_android_thumb: number = 0;
            public static AppCompatSeekBar_tickMark: number = 1;
            public static AppCompatSeekBar_tickMarkTint: number = 2;
            public static AppCompatSeekBar_tickMarkTintMode: number = 3;
            public static AppCompatTextHelper: androidNative.Array<number>;
            public static AppCompatTextHelper_android_drawableBottom: number = 0;
            public static AppCompatTextHelper_android_drawableEnd: number = 1;
            public static AppCompatTextHelper_android_drawableLeft: number = 2;
            public static AppCompatTextHelper_android_drawableRight: number = 3;
            public static AppCompatTextHelper_android_drawableStart: number = 4;
            public static AppCompatTextHelper_android_drawableTop: number = 5;
            public static AppCompatTextHelper_android_textAppearance: number = 6;
            public static AppCompatTextView: androidNative.Array<number>;
            public static AppCompatTextView_android_textAppearance: number = 0;
            public static AppCompatTextView_autoSizeMaxTextSize: number = 1;
            public static AppCompatTextView_autoSizeMinTextSize: number = 2;
            public static AppCompatTextView_autoSizePresetSizes: number = 3;
            public static AppCompatTextView_autoSizeStepGranularity: number = 4;
            public static AppCompatTextView_autoSizeTextType: number = 5;
            public static AppCompatTextView_drawableBottomCompat: number = 6;
            public static AppCompatTextView_drawableEndCompat: number = 7;
            public static AppCompatTextView_drawableLeftCompat: number = 8;
            public static AppCompatTextView_drawableRightCompat: number = 9;
            public static AppCompatTextView_drawableStartCompat: number = 10;
            public static AppCompatTextView_drawableTint: number = 11;
            public static AppCompatTextView_drawableTintMode: number = 12;
            public static AppCompatTextView_drawableTopCompat: number = 13;
            public static AppCompatTextView_firstBaselineToTopHeight: number = 14;
            public static AppCompatTextView_fontFamily: number = 15;
            public static AppCompatTextView_fontVariationSettings: number = 16;
            public static AppCompatTextView_lastBaselineToBottomHeight: number = 17;
            public static AppCompatTextView_lineHeight: number = 18;
            public static AppCompatTextView_textAllCaps: number = 19;
            public static AppCompatTextView_textLocale: number = 20;
            public static AppCompatTheme: androidNative.Array<number>;
            public static AppCompatTheme_actionBarDivider: number = 0;
            public static AppCompatTheme_actionBarItemBackground: number = 1;
            public static AppCompatTheme_actionBarPopupTheme: number = 2;
            public static AppCompatTheme_actionBarSize: number = 3;
            public static AppCompatTheme_actionBarSplitStyle: number = 4;
            public static AppCompatTheme_actionBarStyle: number = 5;
            public static AppCompatTheme_actionBarTabBarStyle: number = 6;
            public static AppCompatTheme_actionBarTabStyle: number = 7;
            public static AppCompatTheme_actionBarTabTextStyle: number = 8;
            public static AppCompatTheme_actionBarTheme: number = 9;
            public static AppCompatTheme_actionBarWidgetTheme: number = 10;
            public static AppCompatTheme_actionButtonStyle: number = 11;
            public static AppCompatTheme_actionDropDownStyle: number = 12;
            public static AppCompatTheme_actionMenuTextAppearance: number = 13;
            public static AppCompatTheme_actionMenuTextColor: number = 14;
            public static AppCompatTheme_actionModeBackground: number = 15;
            public static AppCompatTheme_actionModeCloseButtonStyle: number = 16;
            public static AppCompatTheme_actionModeCloseContentDescription: number = 17;
            public static AppCompatTheme_actionModeCloseDrawable: number = 18;
            public static AppCompatTheme_actionModeCopyDrawable: number = 19;
            public static AppCompatTheme_actionModeCutDrawable: number = 20;
            public static AppCompatTheme_actionModeFindDrawable: number = 21;
            public static AppCompatTheme_actionModePasteDrawable: number = 22;
            public static AppCompatTheme_actionModePopupWindowStyle: number = 23;
            public static AppCompatTheme_actionModeSelectAllDrawable: number = 24;
            public static AppCompatTheme_actionModeShareDrawable: number = 25;
            public static AppCompatTheme_actionModeSplitBackground: number = 26;
            public static AppCompatTheme_actionModeStyle: number = 27;
            public static AppCompatTheme_actionModeTheme: number = 28;
            public static AppCompatTheme_actionModeWebSearchDrawable: number = 29;
            public static AppCompatTheme_actionOverflowButtonStyle: number = 30;
            public static AppCompatTheme_actionOverflowMenuStyle: number = 31;
            public static AppCompatTheme_activityChooserViewStyle: number = 32;
            public static AppCompatTheme_alertDialogButtonGroupStyle: number = 33;
            public static AppCompatTheme_alertDialogCenterButtons: number = 34;
            public static AppCompatTheme_alertDialogStyle: number = 35;
            public static AppCompatTheme_alertDialogTheme: number = 36;
            public static AppCompatTheme_android_windowAnimationStyle: number = 37;
            public static AppCompatTheme_android_windowIsFloating: number = 38;
            public static AppCompatTheme_autoCompleteTextViewStyle: number = 39;
            public static AppCompatTheme_borderlessButtonStyle: number = 40;
            public static AppCompatTheme_buttonBarButtonStyle: number = 41;
            public static AppCompatTheme_buttonBarNegativeButtonStyle: number = 42;
            public static AppCompatTheme_buttonBarNeutralButtonStyle: number = 43;
            public static AppCompatTheme_buttonBarPositiveButtonStyle: number = 44;
            public static AppCompatTheme_buttonBarStyle: number = 45;
            public static AppCompatTheme_buttonStyle: number = 46;
            public static AppCompatTheme_buttonStyleSmall: number = 47;
            public static AppCompatTheme_checkboxStyle: number = 48;
            public static AppCompatTheme_checkedTextViewStyle: number = 49;
            public static AppCompatTheme_colorAccent: number = 50;
            public static AppCompatTheme_colorBackgroundFloating: number = 51;
            public static AppCompatTheme_colorButtonNormal: number = 52;
            public static AppCompatTheme_colorControlActivated: number = 53;
            public static AppCompatTheme_colorControlHighlight: number = 54;
            public static AppCompatTheme_colorControlNormal: number = 55;
            public static AppCompatTheme_colorError: number = 56;
            public static AppCompatTheme_colorPrimary: number = 57;
            public static AppCompatTheme_colorPrimaryDark: number = 58;
            public static AppCompatTheme_colorSwitchThumbNormal: number = 59;
            public static AppCompatTheme_controlBackground: number = 60;
            public static AppCompatTheme_dialogCornerRadius: number = 61;
            public static AppCompatTheme_dialogPreferredPadding: number = 62;
            public static AppCompatTheme_dialogTheme: number = 63;
            public static AppCompatTheme_dividerHorizontal: number = 64;
            public static AppCompatTheme_dividerVertical: number = 65;
            public static AppCompatTheme_dropDownListViewStyle: number = 66;
            public static AppCompatTheme_dropdownListPreferredItemHeight: number = 67;
            public static AppCompatTheme_editTextBackground: number = 68;
            public static AppCompatTheme_editTextColor: number = 69;
            public static AppCompatTheme_editTextStyle: number = 70;
            public static AppCompatTheme_homeAsUpIndicator: number = 71;
            public static AppCompatTheme_imageButtonStyle: number = 72;
            public static AppCompatTheme_listChoiceBackgroundIndicator: number = 73;
            public static AppCompatTheme_listChoiceIndicatorMultipleAnimated: number = 74;
            public static AppCompatTheme_listChoiceIndicatorSingleAnimated: number = 75;
            public static AppCompatTheme_listDividerAlertDialog: number = 76;
            public static AppCompatTheme_listMenuViewStyle: number = 77;
            public static AppCompatTheme_listPopupWindowStyle: number = 78;
            public static AppCompatTheme_listPreferredItemHeight: number = 79;
            public static AppCompatTheme_listPreferredItemHeightLarge: number = 80;
            public static AppCompatTheme_listPreferredItemHeightSmall: number = 81;
            public static AppCompatTheme_listPreferredItemPaddingEnd: number = 82;
            public static AppCompatTheme_listPreferredItemPaddingLeft: number = 83;
            public static AppCompatTheme_listPreferredItemPaddingRight: number = 84;
            public static AppCompatTheme_listPreferredItemPaddingStart: number = 85;
            public static AppCompatTheme_panelBackground: number = 86;
            public static AppCompatTheme_panelMenuListTheme: number = 87;
            public static AppCompatTheme_panelMenuListWidth: number = 88;
            public static AppCompatTheme_popupMenuStyle: number = 89;
            public static AppCompatTheme_popupWindowStyle: number = 90;
            public static AppCompatTheme_radioButtonStyle: number = 91;
            public static AppCompatTheme_ratingBarStyle: number = 92;
            public static AppCompatTheme_ratingBarStyleIndicator: number = 93;
            public static AppCompatTheme_ratingBarStyleSmall: number = 94;
            public static AppCompatTheme_searchViewStyle: number = 95;
            public static AppCompatTheme_seekBarStyle: number = 96;
            public static AppCompatTheme_selectableItemBackground: number = 97;
            public static AppCompatTheme_selectableItemBackgroundBorderless: number = 98;
            public static AppCompatTheme_spinnerDropDownItemStyle: number = 99;
            public static AppCompatTheme_spinnerStyle: number = 100;
            public static AppCompatTheme_switchStyle: number = 101;
            public static AppCompatTheme_textAppearanceLargePopupMenu: number = 102;
            public static AppCompatTheme_textAppearanceListItem: number = 103;
            public static AppCompatTheme_textAppearanceListItemSecondary: number = 104;
            public static AppCompatTheme_textAppearanceListItemSmall: number = 105;
            public static AppCompatTheme_textAppearancePopupMenuHeader: number = 106;
            public static AppCompatTheme_textAppearanceSearchResultSubtitle: number = 107;
            public static AppCompatTheme_textAppearanceSearchResultTitle: number = 108;
            public static AppCompatTheme_textAppearanceSmallPopupMenu: number = 109;
            public static AppCompatTheme_textColorAlertDialogListItem: number = 110;
            public static AppCompatTheme_textColorSearchUrl: number = 111;
            public static AppCompatTheme_toolbarNavigationButtonStyle: number = 112;
            public static AppCompatTheme_toolbarStyle: number = 113;
            public static AppCompatTheme_tooltipForegroundColor: number = 114;
            public static AppCompatTheme_tooltipFrameBackground: number = 115;
            public static AppCompatTheme_viewInflaterClass: number = 116;
            public static AppCompatTheme_windowActionBar: number = 117;
            public static AppCompatTheme_windowActionBarOverlay: number = 118;
            public static AppCompatTheme_windowActionModeOverlay: number = 119;
            public static AppCompatTheme_windowFixedHeightMajor: number = 120;
            public static AppCompatTheme_windowFixedHeightMinor: number = 121;
            public static AppCompatTheme_windowFixedWidthMajor: number = 122;
            public static AppCompatTheme_windowFixedWidthMinor: number = 123;
            public static AppCompatTheme_windowMinWidthMajor: number = 124;
            public static AppCompatTheme_windowMinWidthMinor: number = 125;
            public static AppCompatTheme_windowNoTitle: number = 126;
            public static Badge: androidNative.Array<number>;
            public static Badge_backgroundColor: number = 0;
            public static Badge_badgeGravity: number = 1;
            public static Badge_badgeTextColor: number = 2;
            public static Badge_horizontalOffset: number = 3;
            public static Badge_maxCharacterCount: number = 4;
            public static Badge_number: number = 5;
            public static Badge_verticalOffset: number = 6;
            public static BaseProgressIndicator: androidNative.Array<number>;
            public static BaseProgressIndicator_android_indeterminate: number = 0;
            public static BaseProgressIndicator_hideAnimationBehavior: number = 1;
            public static BaseProgressIndicator_indicatorColor: number = 2;
            public static BaseProgressIndicator_minHideDelay: number = 3;
            public static BaseProgressIndicator_showAnimationBehavior: number = 4;
            public static BaseProgressIndicator_showDelay: number = 5;
            public static BaseProgressIndicator_trackColor: number = 6;
            public static BaseProgressIndicator_trackCornerRadius: number = 7;
            public static BaseProgressIndicator_trackThickness: number = 8;
            public static BottomAppBar: androidNative.Array<number>;
            public static BottomAppBar_backgroundTint: number = 0;
            public static BottomAppBar_elevation: number = 1;
            public static BottomAppBar_fabAlignmentMode: number = 2;
            public static BottomAppBar_fabAnimationMode: number = 3;
            public static BottomAppBar_fabCradleMargin: number = 4;
            public static BottomAppBar_fabCradleRoundedCornerRadius: number = 5;
            public static BottomAppBar_fabCradleVerticalOffset: number = 6;
            public static BottomAppBar_hideOnScroll: number = 7;
            public static BottomAppBar_paddingBottomSystemWindowInsets: number = 8;
            public static BottomAppBar_paddingLeftSystemWindowInsets: number = 9;
            public static BottomAppBar_paddingRightSystemWindowInsets: number = 10;
            public static BottomNavigationView: androidNative.Array<number>;
            public static BottomNavigationView_itemHorizontalTranslationEnabled: number = 0;
            public static BottomSheetBehavior_Layout: androidNative.Array<number>;
            public static BottomSheetBehavior_Layout_android_elevation: number = 0;
            public static BottomSheetBehavior_Layout_android_maxWidth: number = 1;
            public static BottomSheetBehavior_Layout_backgroundTint: number = 2;
            public static BottomSheetBehavior_Layout_behavior_draggable: number = 3;
            public static BottomSheetBehavior_Layout_behavior_expandedOffset: number = 4;
            public static BottomSheetBehavior_Layout_behavior_fitToContents: number = 5;
            public static BottomSheetBehavior_Layout_behavior_halfExpandedRatio: number = 6;
            public static BottomSheetBehavior_Layout_behavior_hideable: number = 7;
            public static BottomSheetBehavior_Layout_behavior_peekHeight: number = 8;
            public static BottomSheetBehavior_Layout_behavior_saveFlags: number = 9;
            public static BottomSheetBehavior_Layout_behavior_skipCollapsed: number = 10;
            public static BottomSheetBehavior_Layout_gestureInsetBottomIgnored: number = 11;
            public static BottomSheetBehavior_Layout_paddingBottomSystemWindowInsets: number = 12;
            public static BottomSheetBehavior_Layout_paddingLeftSystemWindowInsets: number = 13;
            public static BottomSheetBehavior_Layout_paddingRightSystemWindowInsets: number = 14;
            public static BottomSheetBehavior_Layout_paddingTopSystemWindowInsets: number = 15;
            public static BottomSheetBehavior_Layout_shapeAppearance: number = 16;
            public static BottomSheetBehavior_Layout_shapeAppearanceOverlay: number = 17;
            public static ButtonBarLayout: androidNative.Array<number>;
            public static ButtonBarLayout_allowStacking: number = 0;
            public static Capability: androidNative.Array<number>;
            public static Capability_queryPatterns: number = 0;
            public static Capability_shortcutMatchRequired: number = 1;
            public static CardView: androidNative.Array<number>;
            public static CardView_android_minHeight: number = 0;
            public static CardView_android_minWidth: number = 1;
            public static CardView_cardBackgroundColor: number = 2;
            public static CardView_cardCornerRadius: number = 3;
            public static CardView_cardElevation: number = 4;
            public static CardView_cardMaxElevation: number = 5;
            public static CardView_cardPreventCornerOverlap: number = 6;
            public static CardView_cardUseCompatPadding: number = 7;
            public static CardView_contentPadding: number = 8;
            public static CardView_contentPaddingBottom: number = 9;
            public static CardView_contentPaddingLeft: number = 10;
            public static CardView_contentPaddingRight: number = 11;
            public static CardView_contentPaddingTop: number = 12;
            public static Chip: androidNative.Array<number>;
            public static Chip_android_checkable: number = 0;
            public static Chip_android_ellipsize: number = 1;
            public static Chip_android_maxWidth: number = 2;
            public static Chip_android_text: number = 3;
            public static Chip_android_textAppearance: number = 4;
            public static Chip_android_textColor: number = 5;
            public static Chip_android_textSize: number = 6;
            public static Chip_checkedIcon: number = 7;
            public static Chip_checkedIconEnabled: number = 8;
            public static Chip_checkedIconTint: number = 9;
            public static Chip_checkedIconVisible: number = 10;
            public static Chip_chipBackgroundColor: number = 11;
            public static Chip_chipCornerRadius: number = 12;
            public static Chip_chipEndPadding: number = 13;
            public static Chip_chipIcon: number = 14;
            public static Chip_chipIconEnabled: number = 15;
            public static Chip_chipIconSize: number = 16;
            public static Chip_chipIconTint: number = 17;
            public static Chip_chipIconVisible: number = 18;
            public static Chip_chipMinHeight: number = 19;
            public static Chip_chipMinTouchTargetSize: number = 20;
            public static Chip_chipStartPadding: number = 21;
            public static Chip_chipStrokeColor: number = 22;
            public static Chip_chipStrokeWidth: number = 23;
            public static Chip_chipSurfaceColor: number = 24;
            public static Chip_closeIcon: number = 25;
            public static Chip_closeIconEnabled: number = 26;
            public static Chip_closeIconEndPadding: number = 27;
            public static Chip_closeIconSize: number = 28;
            public static Chip_closeIconStartPadding: number = 29;
            public static Chip_closeIconTint: number = 30;
            public static Chip_closeIconVisible: number = 31;
            public static Chip_ensureMinTouchTargetSize: number = 32;
            public static Chip_hideMotionSpec: number = 33;
            public static Chip_iconEndPadding: number = 34;
            public static Chip_iconStartPadding: number = 35;
            public static Chip_rippleColor: number = 36;
            public static Chip_shapeAppearance: number = 37;
            public static Chip_shapeAppearanceOverlay: number = 38;
            public static Chip_showMotionSpec: number = 39;
            public static Chip_textEndPadding: number = 40;
            public static Chip_textStartPadding: number = 41;
            public static ChipGroup: androidNative.Array<number>;
            public static ChipGroup_checkedChip: number = 0;
            public static ChipGroup_chipSpacing: number = 1;
            public static ChipGroup_chipSpacingHorizontal: number = 2;
            public static ChipGroup_chipSpacingVertical: number = 3;
            public static ChipGroup_selectionRequired: number = 4;
            public static ChipGroup_singleLine: number = 5;
            public static ChipGroup_singleSelection: number = 6;
            public static CircularProgressIndicator: androidNative.Array<number>;
            public static CircularProgressIndicator_indicatorDirectionCircular: number = 0;
            public static CircularProgressIndicator_indicatorInset: number = 1;
            public static CircularProgressIndicator_indicatorSize: number = 2;
            public static ClockFaceView: androidNative.Array<number>;
            public static ClockFaceView_clockFaceBackgroundColor: number = 0;
            public static ClockFaceView_clockNumberTextColor: number = 1;
            public static ClockHandView: androidNative.Array<number>;
            public static ClockHandView_clockHandColor: number = 0;
            public static ClockHandView_materialCircleRadius: number = 1;
            public static ClockHandView_selectorSize: number = 2;
            public static CollapsingToolbarLayout: androidNative.Array<number>;
            public static CollapsingToolbarLayout_collapsedTitleGravity: number = 0;
            public static CollapsingToolbarLayout_collapsedTitleTextAppearance: number = 1;
            public static CollapsingToolbarLayout_contentScrim: number = 2;
            public static CollapsingToolbarLayout_expandedTitleGravity: number = 3;
            public static CollapsingToolbarLayout_expandedTitleMargin: number = 4;
            public static CollapsingToolbarLayout_expandedTitleMarginBottom: number = 5;
            public static CollapsingToolbarLayout_expandedTitleMarginEnd: number = 6;
            public static CollapsingToolbarLayout_expandedTitleMarginStart: number = 7;
            public static CollapsingToolbarLayout_expandedTitleMarginTop: number = 8;
            public static CollapsingToolbarLayout_expandedTitleTextAppearance: number = 9;
            public static CollapsingToolbarLayout_extraMultilineHeightEnabled: number = 10;
            public static CollapsingToolbarLayout_forceApplySystemWindowInsetTop: number = 11;
            public static CollapsingToolbarLayout_maxLines: number = 12;
            public static CollapsingToolbarLayout_scrimAnimationDuration: number = 13;
            public static CollapsingToolbarLayout_scrimVisibleHeightTrigger: number = 14;
            public static CollapsingToolbarLayout_statusBarScrim: number = 15;
            public static CollapsingToolbarLayout_title: number = 16;
            public static CollapsingToolbarLayout_titleCollapseMode: number = 17;
            public static CollapsingToolbarLayout_titleEnabled: number = 18;
            public static CollapsingToolbarLayout_toolbarId: number = 19;
            public static CollapsingToolbarLayout_Layout: androidNative.Array<number>;
            public static CollapsingToolbarLayout_Layout_layout_collapseMode: number = 0;
            public static CollapsingToolbarLayout_Layout_layout_collapseParallaxMultiplier: number = 1;
            public static ColorStateListItem: androidNative.Array<number>;
            public static ColorStateListItem_alpha: number = 0;
            public static ColorStateListItem_android_alpha: number = 1;
            public static ColorStateListItem_android_color: number = 2;
            public static ColorStateListItem_android_lStar: number = 3;
            public static ColorStateListItem_lStar: number = 4;
            public static CompoundButton: androidNative.Array<number>;
            public static CompoundButton_android_button: number = 0;
            public static CompoundButton_buttonCompat: number = 1;
            public static CompoundButton_buttonTint: number = 2;
            public static CompoundButton_buttonTintMode: number = 3;
            public static Constraint: androidNative.Array<number>;
            public static Constraint_android_alpha: number = 0;
            public static Constraint_android_elevation: number = 1;
            public static Constraint_android_id: number = 2;
            public static Constraint_android_layout_height: number = 3;
            public static Constraint_android_layout_marginBottom: number = 4;
            public static Constraint_android_layout_marginEnd: number = 5;
            public static Constraint_android_layout_marginLeft: number = 6;
            public static Constraint_android_layout_marginRight: number = 7;
            public static Constraint_android_layout_marginStart: number = 8;
            public static Constraint_android_layout_marginTop: number = 9;
            public static Constraint_android_layout_width: number = 10;
            public static Constraint_android_maxHeight: number = 11;
            public static Constraint_android_maxWidth: number = 12;
            public static Constraint_android_minHeight: number = 13;
            public static Constraint_android_minWidth: number = 14;
            public static Constraint_android_orientation: number = 15;
            public static Constraint_android_rotation: number = 16;
            public static Constraint_android_rotationX: number = 17;
            public static Constraint_android_rotationY: number = 18;
            public static Constraint_android_scaleX: number = 19;
            public static Constraint_android_scaleY: number = 20;
            public static Constraint_android_transformPivotX: number = 21;
            public static Constraint_android_transformPivotY: number = 22;
            public static Constraint_android_translationX: number = 23;
            public static Constraint_android_translationY: number = 24;
            public static Constraint_android_translationZ: number = 25;
            public static Constraint_android_visibility: number = 26;
            public static Constraint_animate_relativeTo: number = 27;
            public static Constraint_barrierAllowsGoneWidgets: number = 28;
            public static Constraint_barrierDirection: number = 29;
            public static Constraint_barrierMargin: number = 30;
            public static Constraint_chainUseRtl: number = 31;
            public static Constraint_constraint_referenced_ids: number = 32;
            public static Constraint_drawPath: number = 33;
            public static Constraint_flow_firstHorizontalBias: number = 34;
            public static Constraint_flow_firstHorizontalStyle: number = 35;
            public static Constraint_flow_firstVerticalBias: number = 36;
            public static Constraint_flow_firstVerticalStyle: number = 37;
            public static Constraint_flow_horizontalAlign: number = 38;
            public static Constraint_flow_horizontalBias: number = 39;
            public static Constraint_flow_horizontalGap: number = 40;
            public static Constraint_flow_horizontalStyle: number = 41;
            public static Constraint_flow_lastHorizontalBias: number = 42;
            public static Constraint_flow_lastHorizontalStyle: number = 43;
            public static Constraint_flow_lastVerticalBias: number = 44;
            public static Constraint_flow_lastVerticalStyle: number = 45;
            public static Constraint_flow_maxElementsWrap: number = 46;
            public static Constraint_flow_verticalAlign: number = 47;
            public static Constraint_flow_verticalBias: number = 48;
            public static Constraint_flow_verticalGap: number = 49;
            public static Constraint_flow_verticalStyle: number = 50;
            public static Constraint_flow_wrapMode: number = 51;
            public static Constraint_layout_constrainedHeight: number = 52;
            public static Constraint_layout_constrainedWidth: number = 53;
            public static Constraint_layout_constraintBaseline_creator: number = 54;
            public static Constraint_layout_constraintBaseline_toBaselineOf: number = 55;
            public static Constraint_layout_constraintBottom_creator: number = 56;
            public static Constraint_layout_constraintBottom_toBottomOf: number = 57;
            public static Constraint_layout_constraintBottom_toTopOf: number = 58;
            public static Constraint_layout_constraintCircle: number = 59;
            public static Constraint_layout_constraintCircleAngle: number = 60;
            public static Constraint_layout_constraintCircleRadius: number = 61;
            public static Constraint_layout_constraintDimensionRatio: number = 62;
            public static Constraint_layout_constraintEnd_toEndOf: number = 63;
            public static Constraint_layout_constraintEnd_toStartOf: number = 64;
            public static Constraint_layout_constraintGuide_begin: number = 65;
            public static Constraint_layout_constraintGuide_end: number = 66;
            public static Constraint_layout_constraintGuide_percent: number = 67;
            public static Constraint_layout_constraintHeight_default: number = 68;
            public static Constraint_layout_constraintHeight_max: number = 69;
            public static Constraint_layout_constraintHeight_min: number = 70;
            public static Constraint_layout_constraintHeight_percent: number = 71;
            public static Constraint_layout_constraintHorizontal_bias: number = 72;
            public static Constraint_layout_constraintHorizontal_chainStyle: number = 73;
            public static Constraint_layout_constraintHorizontal_weight: number = 74;
            public static Constraint_layout_constraintLeft_creator: number = 75;
            public static Constraint_layout_constraintLeft_toLeftOf: number = 76;
            public static Constraint_layout_constraintLeft_toRightOf: number = 77;
            public static Constraint_layout_constraintRight_creator: number = 78;
            public static Constraint_layout_constraintRight_toLeftOf: number = 79;
            public static Constraint_layout_constraintRight_toRightOf: number = 80;
            public static Constraint_layout_constraintStart_toEndOf: number = 81;
            public static Constraint_layout_constraintStart_toStartOf: number = 82;
            public static Constraint_layout_constraintTag: number = 83;
            public static Constraint_layout_constraintTop_creator: number = 84;
            public static Constraint_layout_constraintTop_toBottomOf: number = 85;
            public static Constraint_layout_constraintTop_toTopOf: number = 86;
            public static Constraint_layout_constraintVertical_bias: number = 87;
            public static Constraint_layout_constraintVertical_chainStyle: number = 88;
            public static Constraint_layout_constraintVertical_weight: number = 89;
            public static Constraint_layout_constraintWidth_default: number = 90;
            public static Constraint_layout_constraintWidth_max: number = 91;
            public static Constraint_layout_constraintWidth_min: number = 92;
            public static Constraint_layout_constraintWidth_percent: number = 93;
            public static Constraint_layout_editor_absoluteX: number = 94;
            public static Constraint_layout_editor_absoluteY: number = 95;
            public static Constraint_layout_goneMarginBottom: number = 96;
            public static Constraint_layout_goneMarginEnd: number = 97;
            public static Constraint_layout_goneMarginLeft: number = 98;
            public static Constraint_layout_goneMarginRight: number = 99;
            public static Constraint_layout_goneMarginStart: number = 100;
            public static Constraint_layout_goneMarginTop: number = 101;
            public static Constraint_motionProgress: number = 102;
            public static Constraint_motionStagger: number = 103;
            public static Constraint_pathMotionArc: number = 104;
            public static Constraint_pivotAnchor: number = 105;
            public static Constraint_transitionEasing: number = 106;
            public static Constraint_transitionPathRotate: number = 107;
            public static Constraint_visibilityMode: number = 108;
            public static ConstraintLayout_Layout: androidNative.Array<number>;
            public static ConstraintLayout_Layout_android_elevation: number = 0;
            public static ConstraintLayout_Layout_android_maxHeight: number = 1;
            public static ConstraintLayout_Layout_android_maxWidth: number = 2;
            public static ConstraintLayout_Layout_android_minHeight: number = 3;
            public static ConstraintLayout_Layout_android_minWidth: number = 4;
            public static ConstraintLayout_Layout_android_orientation: number = 5;
            public static ConstraintLayout_Layout_android_padding: number = 6;
            public static ConstraintLayout_Layout_android_paddingBottom: number = 7;
            public static ConstraintLayout_Layout_android_paddingEnd: number = 8;
            public static ConstraintLayout_Layout_android_paddingLeft: number = 9;
            public static ConstraintLayout_Layout_android_paddingRight: number = 10;
            public static ConstraintLayout_Layout_android_paddingStart: number = 11;
            public static ConstraintLayout_Layout_android_paddingTop: number = 12;
            public static ConstraintLayout_Layout_android_visibility: number = 13;
            public static ConstraintLayout_Layout_barrierAllowsGoneWidgets: number = 14;
            public static ConstraintLayout_Layout_barrierDirection: number = 15;
            public static ConstraintLayout_Layout_barrierMargin: number = 16;
            public static ConstraintLayout_Layout_chainUseRtl: number = 17;
            public static ConstraintLayout_Layout_constraintSet: number = 18;
            public static ConstraintLayout_Layout_constraint_referenced_ids: number = 19;
            public static ConstraintLayout_Layout_flow_firstHorizontalBias: number = 20;
            public static ConstraintLayout_Layout_flow_firstHorizontalStyle: number = 21;
            public static ConstraintLayout_Layout_flow_firstVerticalBias: number = 22;
            public static ConstraintLayout_Layout_flow_firstVerticalStyle: number = 23;
            public static ConstraintLayout_Layout_flow_horizontalAlign: number = 24;
            public static ConstraintLayout_Layout_flow_horizontalBias: number = 25;
            public static ConstraintLayout_Layout_flow_horizontalGap: number = 26;
            public static ConstraintLayout_Layout_flow_horizontalStyle: number = 27;
            public static ConstraintLayout_Layout_flow_lastHorizontalBias: number = 28;
            public static ConstraintLayout_Layout_flow_lastHorizontalStyle: number = 29;
            public static ConstraintLayout_Layout_flow_lastVerticalBias: number = 30;
            public static ConstraintLayout_Layout_flow_lastVerticalStyle: number = 31;
            public static ConstraintLayout_Layout_flow_maxElementsWrap: number = 32;
            public static ConstraintLayout_Layout_flow_verticalAlign: number = 33;
            public static ConstraintLayout_Layout_flow_verticalBias: number = 34;
            public static ConstraintLayout_Layout_flow_verticalGap: number = 35;
            public static ConstraintLayout_Layout_flow_verticalStyle: number = 36;
            public static ConstraintLayout_Layout_flow_wrapMode: number = 37;
            public static ConstraintLayout_Layout_layoutDescription: number = 38;
            public static ConstraintLayout_Layout_layout_constrainedHeight: number = 39;
            public static ConstraintLayout_Layout_layout_constrainedWidth: number = 40;
            public static ConstraintLayout_Layout_layout_constraintBaseline_creator: number = 41;
            public static ConstraintLayout_Layout_layout_constraintBaseline_toBaselineOf: number = 42;
            public static ConstraintLayout_Layout_layout_constraintBottom_creator: number = 43;
            public static ConstraintLayout_Layout_layout_constraintBottom_toBottomOf: number = 44;
            public static ConstraintLayout_Layout_layout_constraintBottom_toTopOf: number = 45;
            public static ConstraintLayout_Layout_layout_constraintCircle: number = 46;
            public static ConstraintLayout_Layout_layout_constraintCircleAngle: number = 47;
            public static ConstraintLayout_Layout_layout_constraintCircleRadius: number = 48;
            public static ConstraintLayout_Layout_layout_constraintDimensionRatio: number = 49;
            public static ConstraintLayout_Layout_layout_constraintEnd_toEndOf: number = 50;
            public static ConstraintLayout_Layout_layout_constraintEnd_toStartOf: number = 51;
            public static ConstraintLayout_Layout_layout_constraintGuide_begin: number = 52;
            public static ConstraintLayout_Layout_layout_constraintGuide_end: number = 53;
            public static ConstraintLayout_Layout_layout_constraintGuide_percent: number = 54;
            public static ConstraintLayout_Layout_layout_constraintHeight_default: number = 55;
            public static ConstraintLayout_Layout_layout_constraintHeight_max: number = 56;
            public static ConstraintLayout_Layout_layout_constraintHeight_min: number = 57;
            public static ConstraintLayout_Layout_layout_constraintHeight_percent: number = 58;
            public static ConstraintLayout_Layout_layout_constraintHorizontal_bias: number = 59;
            public static ConstraintLayout_Layout_layout_constraintHorizontal_chainStyle: number = 60;
            public static ConstraintLayout_Layout_layout_constraintHorizontal_weight: number = 61;
            public static ConstraintLayout_Layout_layout_constraintLeft_creator: number = 62;
            public static ConstraintLayout_Layout_layout_constraintLeft_toLeftOf: number = 63;
            public static ConstraintLayout_Layout_layout_constraintLeft_toRightOf: number = 64;
            public static ConstraintLayout_Layout_layout_constraintRight_creator: number = 65;
            public static ConstraintLayout_Layout_layout_constraintRight_toLeftOf: number = 66;
            public static ConstraintLayout_Layout_layout_constraintRight_toRightOf: number = 67;
            public static ConstraintLayout_Layout_layout_constraintStart_toEndOf: number = 68;
            public static ConstraintLayout_Layout_layout_constraintStart_toStartOf: number = 69;
            public static ConstraintLayout_Layout_layout_constraintTag: number = 70;
            public static ConstraintLayout_Layout_layout_constraintTop_creator: number = 71;
            public static ConstraintLayout_Layout_layout_constraintTop_toBottomOf: number = 72;
            public static ConstraintLayout_Layout_layout_constraintTop_toTopOf: number = 73;
            public static ConstraintLayout_Layout_layout_constraintVertical_bias: number = 74;
            public static ConstraintLayout_Layout_layout_constraintVertical_chainStyle: number = 75;
            public static ConstraintLayout_Layout_layout_constraintVertical_weight: number = 76;
            public static ConstraintLayout_Layout_layout_constraintWidth_default: number = 77;
            public static ConstraintLayout_Layout_layout_constraintWidth_max: number = 78;
            public static ConstraintLayout_Layout_layout_constraintWidth_min: number = 79;
            public static ConstraintLayout_Layout_layout_constraintWidth_percent: number = 80;
            public static ConstraintLayout_Layout_layout_editor_absoluteX: number = 81;
            public static ConstraintLayout_Layout_layout_editor_absoluteY: number = 82;
            public static ConstraintLayout_Layout_layout_goneMarginBottom: number = 83;
            public static ConstraintLayout_Layout_layout_goneMarginEnd: number = 84;
            public static ConstraintLayout_Layout_layout_goneMarginLeft: number = 85;
            public static ConstraintLayout_Layout_layout_goneMarginRight: number = 86;
            public static ConstraintLayout_Layout_layout_goneMarginStart: number = 87;
            public static ConstraintLayout_Layout_layout_goneMarginTop: number = 88;
            public static ConstraintLayout_Layout_layout_optimizationLevel: number = 89;
            public static ConstraintLayout_placeholder: androidNative.Array<number>;
            public static ConstraintLayout_placeholder_content: number = 0;
            public static ConstraintLayout_placeholder_placeholder_emptyVisibility: number = 1;
            public static ConstraintSet: androidNative.Array<number>;
            public static ConstraintSet_android_alpha: number = 0;
            public static ConstraintSet_android_elevation: number = 1;
            public static ConstraintSet_android_id: number = 2;
            public static ConstraintSet_android_layout_height: number = 3;
            public static ConstraintSet_android_layout_marginBottom: number = 4;
            public static ConstraintSet_android_layout_marginEnd: number = 5;
            public static ConstraintSet_android_layout_marginLeft: number = 6;
            public static ConstraintSet_android_layout_marginRight: number = 7;
            public static ConstraintSet_android_layout_marginStart: number = 8;
            public static ConstraintSet_android_layout_marginTop: number = 9;
            public static ConstraintSet_android_layout_width: number = 10;
            public static ConstraintSet_android_maxHeight: number = 11;
            public static ConstraintSet_android_maxWidth: number = 12;
            public static ConstraintSet_android_minHeight: number = 13;
            public static ConstraintSet_android_minWidth: number = 14;
            public static ConstraintSet_android_orientation: number = 15;
            public static ConstraintSet_android_pivotX: number = 16;
            public static ConstraintSet_android_pivotY: number = 17;
            public static ConstraintSet_android_rotation: number = 18;
            public static ConstraintSet_android_rotationX: number = 19;
            public static ConstraintSet_android_rotationY: number = 20;
            public static ConstraintSet_android_scaleX: number = 21;
            public static ConstraintSet_android_scaleY: number = 22;
            public static ConstraintSet_android_transformPivotX: number = 23;
            public static ConstraintSet_android_transformPivotY: number = 24;
            public static ConstraintSet_android_translationX: number = 25;
            public static ConstraintSet_android_translationY: number = 26;
            public static ConstraintSet_android_translationZ: number = 27;
            public static ConstraintSet_android_visibility: number = 28;
            public static ConstraintSet_animate_relativeTo: number = 29;
            public static ConstraintSet_barrierAllowsGoneWidgets: number = 30;
            public static ConstraintSet_barrierDirection: number = 31;
            public static ConstraintSet_barrierMargin: number = 32;
            public static ConstraintSet_chainUseRtl: number = 33;
            public static ConstraintSet_constraint_referenced_ids: number = 34;
            public static ConstraintSet_deriveConstraintsFrom: number = 35;
            public static ConstraintSet_drawPath: number = 36;
            public static ConstraintSet_flow_firstHorizontalBias: number = 37;
            public static ConstraintSet_flow_firstHorizontalStyle: number = 38;
            public static ConstraintSet_flow_firstVerticalBias: number = 39;
            public static ConstraintSet_flow_firstVerticalStyle: number = 40;
            public static ConstraintSet_flow_horizontalAlign: number = 41;
            public static ConstraintSet_flow_horizontalBias: number = 42;
            public static ConstraintSet_flow_horizontalGap: number = 43;
            public static ConstraintSet_flow_horizontalStyle: number = 44;
            public static ConstraintSet_flow_lastHorizontalBias: number = 45;
            public static ConstraintSet_flow_lastHorizontalStyle: number = 46;
            public static ConstraintSet_flow_lastVerticalBias: number = 47;
            public static ConstraintSet_flow_lastVerticalStyle: number = 48;
            public static ConstraintSet_flow_maxElementsWrap: number = 49;
            public static ConstraintSet_flow_verticalAlign: number = 50;
            public static ConstraintSet_flow_verticalBias: number = 51;
            public static ConstraintSet_flow_verticalGap: number = 52;
            public static ConstraintSet_flow_verticalStyle: number = 53;
            public static ConstraintSet_flow_wrapMode: number = 54;
            public static ConstraintSet_layout_constrainedHeight: number = 55;
            public static ConstraintSet_layout_constrainedWidth: number = 56;
            public static ConstraintSet_layout_constraintBaseline_creator: number = 57;
            public static ConstraintSet_layout_constraintBaseline_toBaselineOf: number = 58;
            public static ConstraintSet_layout_constraintBottom_creator: number = 59;
            public static ConstraintSet_layout_constraintBottom_toBottomOf: number = 60;
            public static ConstraintSet_layout_constraintBottom_toTopOf: number = 61;
            public static ConstraintSet_layout_constraintCircle: number = 62;
            public static ConstraintSet_layout_constraintCircleAngle: number = 63;
            public static ConstraintSet_layout_constraintCircleRadius: number = 64;
            public static ConstraintSet_layout_constraintDimensionRatio: number = 65;
            public static ConstraintSet_layout_constraintEnd_toEndOf: number = 66;
            public static ConstraintSet_layout_constraintEnd_toStartOf: number = 67;
            public static ConstraintSet_layout_constraintGuide_begin: number = 68;
            public static ConstraintSet_layout_constraintGuide_end: number = 69;
            public static ConstraintSet_layout_constraintGuide_percent: number = 70;
            public static ConstraintSet_layout_constraintHeight_default: number = 71;
            public static ConstraintSet_layout_constraintHeight_max: number = 72;
            public static ConstraintSet_layout_constraintHeight_min: number = 73;
            public static ConstraintSet_layout_constraintHeight_percent: number = 74;
            public static ConstraintSet_layout_constraintHorizontal_bias: number = 75;
            public static ConstraintSet_layout_constraintHorizontal_chainStyle: number = 76;
            public static ConstraintSet_layout_constraintHorizontal_weight: number = 77;
            public static ConstraintSet_layout_constraintLeft_creator: number = 78;
            public static ConstraintSet_layout_constraintLeft_toLeftOf: number = 79;
            public static ConstraintSet_layout_constraintLeft_toRightOf: number = 80;
            public static ConstraintSet_layout_constraintRight_creator: number = 81;
            public static ConstraintSet_layout_constraintRight_toLeftOf: number = 82;
            public static ConstraintSet_layout_constraintRight_toRightOf: number = 83;
            public static ConstraintSet_layout_constraintStart_toEndOf: number = 84;
            public static ConstraintSet_layout_constraintStart_toStartOf: number = 85;
            public static ConstraintSet_layout_constraintTag: number = 86;
            public static ConstraintSet_layout_constraintTop_creator: number = 87;
            public static ConstraintSet_layout_constraintTop_toBottomOf: number = 88;
            public static ConstraintSet_layout_constraintTop_toTopOf: number = 89;
            public static ConstraintSet_layout_constraintVertical_bias: number = 90;
            public static ConstraintSet_layout_constraintVertical_chainStyle: number = 91;
            public static ConstraintSet_layout_constraintVertical_weight: number = 92;
            public static ConstraintSet_layout_constraintWidth_default: number = 93;
            public static ConstraintSet_layout_constraintWidth_max: number = 94;
            public static ConstraintSet_layout_constraintWidth_min: number = 95;
            public static ConstraintSet_layout_constraintWidth_percent: number = 96;
            public static ConstraintSet_layout_editor_absoluteX: number = 97;
            public static ConstraintSet_layout_editor_absoluteY: number = 98;
            public static ConstraintSet_layout_goneMarginBottom: number = 99;
            public static ConstraintSet_layout_goneMarginEnd: number = 100;
            public static ConstraintSet_layout_goneMarginLeft: number = 101;
            public static ConstraintSet_layout_goneMarginRight: number = 102;
            public static ConstraintSet_layout_goneMarginStart: number = 103;
            public static ConstraintSet_layout_goneMarginTop: number = 104;
            public static ConstraintSet_motionProgress: number = 105;
            public static ConstraintSet_motionStagger: number = 106;
            public static ConstraintSet_pathMotionArc: number = 107;
            public static ConstraintSet_pivotAnchor: number = 108;
            public static ConstraintSet_transitionEasing: number = 109;
            public static ConstraintSet_transitionPathRotate: number = 110;
            public static CoordinatorLayout: androidNative.Array<number>;
            public static CoordinatorLayout_keylines: number = 0;
            public static CoordinatorLayout_statusBarBackground: number = 1;
            public static CoordinatorLayout_Layout: androidNative.Array<number>;
            public static CoordinatorLayout_Layout_android_layout_gravity: number = 0;
            public static CoordinatorLayout_Layout_layout_anchor: number = 1;
            public static CoordinatorLayout_Layout_layout_anchorGravity: number = 2;
            public static CoordinatorLayout_Layout_layout_behavior: number = 3;
            public static CoordinatorLayout_Layout_layout_dodgeInsetEdges: number = 4;
            public static CoordinatorLayout_Layout_layout_insetEdge: number = 5;
            public static CoordinatorLayout_Layout_layout_keyline: number = 6;
            public static CustomAttribute: androidNative.Array<number>;
            public static CustomAttribute_attributeName: number = 0;
            public static CustomAttribute_customBoolean: number = 1;
            public static CustomAttribute_customColorDrawableValue: number = 2;
            public static CustomAttribute_customColorValue: number = 3;
            public static CustomAttribute_customDimension: number = 4;
            public static CustomAttribute_customFloatValue: number = 5;
            public static CustomAttribute_customIntegerValue: number = 6;
            public static CustomAttribute_customPixelDimension: number = 7;
            public static CustomAttribute_customStringValue: number = 8;
            public static DrawerArrowToggle: androidNative.Array<number>;
            public static DrawerArrowToggle_arrowHeadLength: number = 0;
            public static DrawerArrowToggle_arrowShaftLength: number = 1;
            public static DrawerArrowToggle_barLength: number = 2;
            public static DrawerArrowToggle_color: number = 3;
            public static DrawerArrowToggle_drawableSize: number = 4;
            public static DrawerArrowToggle_gapBetweenBars: number = 5;
            public static DrawerArrowToggle_spinBars: number = 6;
            public static DrawerArrowToggle_thickness: number = 7;
            public static ExtendedFloatingActionButton: androidNative.Array<number>;
            public static ExtendedFloatingActionButton_collapsedSize: number = 0;
            public static ExtendedFloatingActionButton_elevation: number = 1;
            public static ExtendedFloatingActionButton_extendMotionSpec: number = 2;
            public static ExtendedFloatingActionButton_hideMotionSpec: number = 3;
            public static ExtendedFloatingActionButton_showMotionSpec: number = 4;
            public static ExtendedFloatingActionButton_shrinkMotionSpec: number = 5;
            public static ExtendedFloatingActionButton_Behavior_Layout: androidNative.Array<number>;
            public static ExtendedFloatingActionButton_Behavior_Layout_behavior_autoHide: number = 0;
            public static ExtendedFloatingActionButton_Behavior_Layout_behavior_autoShrink: number = 1;
            public static FloatingActionButton: androidNative.Array<number>;
            public static FloatingActionButton_android_enabled: number = 0;
            public static FloatingActionButton_backgroundTint: number = 1;
            public static FloatingActionButton_backgroundTintMode: number = 2;
            public static FloatingActionButton_borderWidth: number = 3;
            public static FloatingActionButton_elevation: number = 4;
            public static FloatingActionButton_ensureMinTouchTargetSize: number = 5;
            public static FloatingActionButton_fabCustomSize: number = 6;
            public static FloatingActionButton_fabSize: number = 7;
            public static FloatingActionButton_hideMotionSpec: number = 8;
            public static FloatingActionButton_hoveredFocusedTranslationZ: number = 9;
            public static FloatingActionButton_maxImageSize: number = 10;
            public static FloatingActionButton_pressedTranslationZ: number = 11;
            public static FloatingActionButton_rippleColor: number = 12;
            public static FloatingActionButton_shapeAppearance: number = 13;
            public static FloatingActionButton_shapeAppearanceOverlay: number = 14;
            public static FloatingActionButton_showMotionSpec: number = 15;
            public static FloatingActionButton_useCompatPadding: number = 16;
            public static FloatingActionButton_Behavior_Layout: androidNative.Array<number>;
            public static FloatingActionButton_Behavior_Layout_behavior_autoHide: number = 0;
            public static FlowLayout: androidNative.Array<number>;
            public static FlowLayout_itemSpacing: number = 0;
            public static FlowLayout_lineSpacing: number = 1;
            public static FontFamily: androidNative.Array<number>;
            public static FontFamily_fontProviderAuthority: number = 0;
            public static FontFamily_fontProviderCerts: number = 1;
            public static FontFamily_fontProviderFetchStrategy: number = 2;
            public static FontFamily_fontProviderFetchTimeout: number = 3;
            public static FontFamily_fontProviderPackage: number = 4;
            public static FontFamily_fontProviderQuery: number = 5;
            public static FontFamily_fontProviderSystemFontFamily: number = 6;
            public static FontFamilyFont: androidNative.Array<number>;
            public static FontFamilyFont_android_font: number = 0;
            public static FontFamilyFont_android_fontStyle: number = 1;
            public static FontFamilyFont_android_fontVariationSettings: number = 2;
            public static FontFamilyFont_android_fontWeight: number = 3;
            public static FontFamilyFont_android_ttcIndex: number = 4;
            public static FontFamilyFont_font: number = 5;
            public static FontFamilyFont_fontStyle: number = 6;
            public static FontFamilyFont_fontVariationSettings: number = 7;
            public static FontFamilyFont_fontWeight: number = 8;
            public static FontFamilyFont_ttcIndex: number = 9;
            public static ForegroundLinearLayout: androidNative.Array<number>;
            public static ForegroundLinearLayout_android_foreground: number = 0;
            public static ForegroundLinearLayout_android_foregroundGravity: number = 1;
            public static ForegroundLinearLayout_foregroundInsidePadding: number = 2;
            public static Fragment: androidNative.Array<number>;
            public static Fragment_android_id: number = 0;
            public static Fragment_android_name: number = 1;
            public static Fragment_android_tag: number = 2;
            public static FragmentContainerView: androidNative.Array<number>;
            public static FragmentContainerView_android_name: number = 0;
            public static FragmentContainerView_android_tag: number = 1;
            public static GradientColor: androidNative.Array<number>;
            public static GradientColor_android_centerColor: number = 0;
            public static GradientColor_android_centerX: number = 1;
            public static GradientColor_android_centerY: number = 2;
            public static GradientColor_android_endColor: number = 3;
            public static GradientColor_android_endX: number = 4;
            public static GradientColor_android_endY: number = 5;
            public static GradientColor_android_gradientRadius: number = 6;
            public static GradientColor_android_startColor: number = 7;
            public static GradientColor_android_startX: number = 8;
            public static GradientColor_android_startY: number = 9;
            public static GradientColor_android_tileMode: number = 10;
            public static GradientColor_android_type: number = 11;
            public static GradientColorItem: androidNative.Array<number>;
            public static GradientColorItem_android_color: number = 0;
            public static GradientColorItem_android_offset: number = 1;
            public static ImageFilterView: androidNative.Array<number>;
            public static ImageFilterView_altSrc: number = 0;
            public static ImageFilterView_brightness: number = 1;
            public static ImageFilterView_contrast: number = 2;
            public static ImageFilterView_crossfade: number = 3;
            public static ImageFilterView_overlay: number = 4;
            public static ImageFilterView_round: number = 5;
            public static ImageFilterView_roundPercent: number = 6;
            public static ImageFilterView_saturation: number = 7;
            public static ImageFilterView_warmth: number = 8;
            public static Insets: androidNative.Array<number>;
            public static Insets_paddingBottomSystemWindowInsets: number = 0;
            public static Insets_paddingLeftSystemWindowInsets: number = 1;
            public static Insets_paddingRightSystemWindowInsets: number = 2;
            public static Insets_paddingTopSystemWindowInsets: number = 3;
            public static KeyAttribute: androidNative.Array<number>;
            public static KeyAttribute_android_alpha: number = 0;
            public static KeyAttribute_android_elevation: number = 1;
            public static KeyAttribute_android_rotation: number = 2;
            public static KeyAttribute_android_rotationX: number = 3;
            public static KeyAttribute_android_rotationY: number = 4;
            public static KeyAttribute_android_scaleX: number = 5;
            public static KeyAttribute_android_scaleY: number = 6;
            public static KeyAttribute_android_transformPivotX: number = 7;
            public static KeyAttribute_android_transformPivotY: number = 8;
            public static KeyAttribute_android_translationX: number = 9;
            public static KeyAttribute_android_translationY: number = 10;
            public static KeyAttribute_android_translationZ: number = 11;
            public static KeyAttribute_curveFit: number = 12;
            public static KeyAttribute_framePosition: number = 13;
            public static KeyAttribute_motionProgress: number = 14;
            public static KeyAttribute_motionTarget: number = 15;
            public static KeyAttribute_transitionEasing: number = 16;
            public static KeyAttribute_transitionPathRotate: number = 17;
            public static KeyCycle: androidNative.Array<number>;
            public static KeyCycle_android_alpha: number = 0;
            public static KeyCycle_android_elevation: number = 1;
            public static KeyCycle_android_rotation: number = 2;
            public static KeyCycle_android_rotationX: number = 3;
            public static KeyCycle_android_rotationY: number = 4;
            public static KeyCycle_android_scaleX: number = 5;
            public static KeyCycle_android_scaleY: number = 6;
            public static KeyCycle_android_translationX: number = 7;
            public static KeyCycle_android_translationY: number = 8;
            public static KeyCycle_android_translationZ: number = 9;
            public static KeyCycle_curveFit: number = 10;
            public static KeyCycle_framePosition: number = 11;
            public static KeyCycle_motionProgress: number = 12;
            public static KeyCycle_motionTarget: number = 13;
            public static KeyCycle_transitionEasing: number = 14;
            public static KeyCycle_transitionPathRotate: number = 15;
            public static KeyCycle_waveOffset: number = 16;
            public static KeyCycle_wavePeriod: number = 17;
            public static KeyCycle_waveShape: number = 18;
            public static KeyCycle_waveVariesBy: number = 19;
            public static KeyPosition: androidNative.Array<number>;
            public static KeyPosition_curveFit: number = 0;
            public static KeyPosition_drawPath: number = 1;
            public static KeyPosition_framePosition: number = 2;
            public static KeyPosition_keyPositionType: number = 3;
            public static KeyPosition_motionTarget: number = 4;
            public static KeyPosition_pathMotionArc: number = 5;
            public static KeyPosition_percentHeight: number = 6;
            public static KeyPosition_percentWidth: number = 7;
            public static KeyPosition_percentX: number = 8;
            public static KeyPosition_percentY: number = 9;
            public static KeyPosition_sizePercent: number = 10;
            public static KeyPosition_transitionEasing: number = 11;
            public static KeyTimeCycle: androidNative.Array<number>;
            public static KeyTimeCycle_android_alpha: number = 0;
            public static KeyTimeCycle_android_elevation: number = 1;
            public static KeyTimeCycle_android_rotation: number = 2;
            public static KeyTimeCycle_android_rotationX: number = 3;
            public static KeyTimeCycle_android_rotationY: number = 4;
            public static KeyTimeCycle_android_scaleX: number = 5;
            public static KeyTimeCycle_android_scaleY: number = 6;
            public static KeyTimeCycle_android_translationX: number = 7;
            public static KeyTimeCycle_android_translationY: number = 8;
            public static KeyTimeCycle_android_translationZ: number = 9;
            public static KeyTimeCycle_curveFit: number = 10;
            public static KeyTimeCycle_framePosition: number = 11;
            public static KeyTimeCycle_motionProgress: number = 12;
            public static KeyTimeCycle_motionTarget: number = 13;
            public static KeyTimeCycle_transitionEasing: number = 14;
            public static KeyTimeCycle_transitionPathRotate: number = 15;
            public static KeyTimeCycle_waveDecay: number = 16;
            public static KeyTimeCycle_waveOffset: number = 17;
            public static KeyTimeCycle_wavePeriod: number = 18;
            public static KeyTimeCycle_waveShape: number = 19;
            public static KeyTrigger: androidNative.Array<number>;
            public static KeyTrigger_framePosition: number = 0;
            public static KeyTrigger_motionTarget: number = 1;
            public static KeyTrigger_motion_postLayoutCollision: number = 2;
            public static KeyTrigger_motion_triggerOnCollision: number = 3;
            public static KeyTrigger_onCross: number = 4;
            public static KeyTrigger_onNegativeCross: number = 5;
            public static KeyTrigger_onPositiveCross: number = 6;
            public static KeyTrigger_triggerId: number = 7;
            public static KeyTrigger_triggerReceiver: number = 8;
            public static KeyTrigger_triggerSlack: number = 9;
            public static Layout: androidNative.Array<number>;
            public static Layout_android_layout_height: number = 0;
            public static Layout_android_layout_marginBottom: number = 1;
            public static Layout_android_layout_marginEnd: number = 2;
            public static Layout_android_layout_marginLeft: number = 3;
            public static Layout_android_layout_marginRight: number = 4;
            public static Layout_android_layout_marginStart: number = 5;
            public static Layout_android_layout_marginTop: number = 6;
            public static Layout_android_layout_width: number = 7;
            public static Layout_android_orientation: number = 8;
            public static Layout_barrierAllowsGoneWidgets: number = 9;
            public static Layout_barrierDirection: number = 10;
            public static Layout_barrierMargin: number = 11;
            public static Layout_chainUseRtl: number = 12;
            public static Layout_constraint_referenced_ids: number = 13;
            public static Layout_layout_constrainedHeight: number = 14;
            public static Layout_layout_constrainedWidth: number = 15;
            public static Layout_layout_constraintBaseline_creator: number = 16;
            public static Layout_layout_constraintBaseline_toBaselineOf: number = 17;
            public static Layout_layout_constraintBottom_creator: number = 18;
            public static Layout_layout_constraintBottom_toBottomOf: number = 19;
            public static Layout_layout_constraintBottom_toTopOf: number = 20;
            public static Layout_layout_constraintCircle: number = 21;
            public static Layout_layout_constraintCircleAngle: number = 22;
            public static Layout_layout_constraintCircleRadius: number = 23;
            public static Layout_layout_constraintDimensionRatio: number = 24;
            public static Layout_layout_constraintEnd_toEndOf: number = 25;
            public static Layout_layout_constraintEnd_toStartOf: number = 26;
            public static Layout_layout_constraintGuide_begin: number = 27;
            public static Layout_layout_constraintGuide_end: number = 28;
            public static Layout_layout_constraintGuide_percent: number = 29;
            public static Layout_layout_constraintHeight_default: number = 30;
            public static Layout_layout_constraintHeight_max: number = 31;
            public static Layout_layout_constraintHeight_min: number = 32;
            public static Layout_layout_constraintHeight_percent: number = 33;
            public static Layout_layout_constraintHorizontal_bias: number = 34;
            public static Layout_layout_constraintHorizontal_chainStyle: number = 35;
            public static Layout_layout_constraintHorizontal_weight: number = 36;
            public static Layout_layout_constraintLeft_creator: number = 37;
            public static Layout_layout_constraintLeft_toLeftOf: number = 38;
            public static Layout_layout_constraintLeft_toRightOf: number = 39;
            public static Layout_layout_constraintRight_creator: number = 40;
            public static Layout_layout_constraintRight_toLeftOf: number = 41;
            public static Layout_layout_constraintRight_toRightOf: number = 42;
            public static Layout_layout_constraintStart_toEndOf: number = 43;
            public static Layout_layout_constraintStart_toStartOf: number = 44;
            public static Layout_layout_constraintTop_creator: number = 45;
            public static Layout_layout_constraintTop_toBottomOf: number = 46;
            public static Layout_layout_constraintTop_toTopOf: number = 47;
            public static Layout_layout_constraintVertical_bias: number = 48;
            public static Layout_layout_constraintVertical_chainStyle: number = 49;
            public static Layout_layout_constraintVertical_weight: number = 50;
            public static Layout_layout_constraintWidth_default: number = 51;
            public static Layout_layout_constraintWidth_max: number = 52;
            public static Layout_layout_constraintWidth_min: number = 53;
            public static Layout_layout_constraintWidth_percent: number = 54;
            public static Layout_layout_editor_absoluteX: number = 55;
            public static Layout_layout_editor_absoluteY: number = 56;
            public static Layout_layout_goneMarginBottom: number = 57;
            public static Layout_layout_goneMarginEnd: number = 58;
            public static Layout_layout_goneMarginLeft: number = 59;
            public static Layout_layout_goneMarginRight: number = 60;
            public static Layout_layout_goneMarginStart: number = 61;
            public static Layout_layout_goneMarginTop: number = 62;
            public static Layout_maxHeight: number = 63;
            public static Layout_maxWidth: number = 64;
            public static Layout_minHeight: number = 65;
            public static Layout_minWidth: number = 66;
            public static LinearLayoutCompat: androidNative.Array<number>;
            public static LinearLayoutCompat_android_baselineAligned: number = 0;
            public static LinearLayoutCompat_android_baselineAlignedChildIndex: number = 1;
            public static LinearLayoutCompat_android_gravity: number = 2;
            public static LinearLayoutCompat_android_orientation: number = 3;
            public static LinearLayoutCompat_android_weightSum: number = 4;
            public static LinearLayoutCompat_divider: number = 5;
            public static LinearLayoutCompat_dividerPadding: number = 6;
            public static LinearLayoutCompat_measureWithLargestChild: number = 7;
            public static LinearLayoutCompat_showDividers: number = 8;
            public static LinearLayoutCompat_Layout: androidNative.Array<number>;
            public static LinearLayoutCompat_Layout_android_layout_gravity: number = 0;
            public static LinearLayoutCompat_Layout_android_layout_height: number = 1;
            public static LinearLayoutCompat_Layout_android_layout_weight: number = 2;
            public static LinearLayoutCompat_Layout_android_layout_width: number = 3;
            public static LinearProgressIndicator: androidNative.Array<number>;
            public static LinearProgressIndicator_indeterminateAnimationType: number = 0;
            public static LinearProgressIndicator_indicatorDirectionLinear: number = 1;
            public static ListPopupWindow: androidNative.Array<number>;
            public static ListPopupWindow_android_dropDownHorizontalOffset: number = 0;
            public static ListPopupWindow_android_dropDownVerticalOffset: number = 1;
            public static MaterialAlertDialog: androidNative.Array<number>;
            public static MaterialAlertDialog_backgroundInsetBottom: number = 0;
            public static MaterialAlertDialog_backgroundInsetEnd: number = 1;
            public static MaterialAlertDialog_backgroundInsetStart: number = 2;
            public static MaterialAlertDialog_backgroundInsetTop: number = 3;
            public static MaterialAlertDialogTheme: androidNative.Array<number>;
            public static MaterialAlertDialogTheme_materialAlertDialogBodyTextStyle: number = 0;
            public static MaterialAlertDialogTheme_materialAlertDialogTheme: number = 1;
            public static MaterialAlertDialogTheme_materialAlertDialogTitleIconStyle: number = 2;
            public static MaterialAlertDialogTheme_materialAlertDialogTitlePanelStyle: number = 3;
            public static MaterialAlertDialogTheme_materialAlertDialogTitleTextStyle: number = 4;
            public static MaterialAutoCompleteTextView: androidNative.Array<number>;
            public static MaterialAutoCompleteTextView_android_inputType: number = 0;
            public static MaterialButton: androidNative.Array<number>;
            public static MaterialButton_android_background: number = 0;
            public static MaterialButton_android_checkable: number = 1;
            public static MaterialButton_android_insetBottom: number = 2;
            public static MaterialButton_android_insetLeft: number = 3;
            public static MaterialButton_android_insetRight: number = 4;
            public static MaterialButton_android_insetTop: number = 5;
            public static MaterialButton_backgroundTint: number = 6;
            public static MaterialButton_backgroundTintMode: number = 7;
            public static MaterialButton_cornerRadius: number = 8;
            public static MaterialButton_elevation: number = 9;
            public static MaterialButton_icon: number = 10;
            public static MaterialButton_iconGravity: number = 11;
            public static MaterialButton_iconPadding: number = 12;
            public static MaterialButton_iconSize: number = 13;
            public static MaterialButton_iconTint: number = 14;
            public static MaterialButton_iconTintMode: number = 15;
            public static MaterialButton_rippleColor: number = 16;
            public static MaterialButton_shapeAppearance: number = 17;
            public static MaterialButton_shapeAppearanceOverlay: number = 18;
            public static MaterialButton_strokeColor: number = 19;
            public static MaterialButton_strokeWidth: number = 20;
            public static MaterialButtonToggleGroup: androidNative.Array<number>;
            public static MaterialButtonToggleGroup_checkedButton: number = 0;
            public static MaterialButtonToggleGroup_selectionRequired: number = 1;
            public static MaterialButtonToggleGroup_singleSelection: number = 2;
            public static MaterialCalendar: androidNative.Array<number>;
            public static MaterialCalendar_android_windowFullscreen: number = 0;
            public static MaterialCalendar_dayInvalidStyle: number = 1;
            public static MaterialCalendar_daySelectedStyle: number = 2;
            public static MaterialCalendar_dayStyle: number = 3;
            public static MaterialCalendar_dayTodayStyle: number = 4;
            public static MaterialCalendar_nestedScrollable: number = 5;
            public static MaterialCalendar_rangeFillColor: number = 6;
            public static MaterialCalendar_yearSelectedStyle: number = 7;
            public static MaterialCalendar_yearStyle: number = 8;
            public static MaterialCalendar_yearTodayStyle: number = 9;
            public static MaterialCalendarItem: androidNative.Array<number>;
            public static MaterialCalendarItem_android_insetBottom: number = 0;
            public static MaterialCalendarItem_android_insetLeft: number = 1;
            public static MaterialCalendarItem_android_insetRight: number = 2;
            public static MaterialCalendarItem_android_insetTop: number = 3;
            public static MaterialCalendarItem_itemFillColor: number = 4;
            public static MaterialCalendarItem_itemShapeAppearance: number = 5;
            public static MaterialCalendarItem_itemShapeAppearanceOverlay: number = 6;
            public static MaterialCalendarItem_itemStrokeColor: number = 7;
            public static MaterialCalendarItem_itemStrokeWidth: number = 8;
            public static MaterialCalendarItem_itemTextColor: number = 9;
            public static MaterialCardView: androidNative.Array<number>;
            public static MaterialCardView_android_checkable: number = 0;
            public static MaterialCardView_cardForegroundColor: number = 1;
            public static MaterialCardView_checkedIcon: number = 2;
            public static MaterialCardView_checkedIconMargin: number = 3;
            public static MaterialCardView_checkedIconSize: number = 4;
            public static MaterialCardView_checkedIconTint: number = 5;
            public static MaterialCardView_rippleColor: number = 6;
            public static MaterialCardView_shapeAppearance: number = 7;
            public static MaterialCardView_shapeAppearanceOverlay: number = 8;
            public static MaterialCardView_state_dragged: number = 9;
            public static MaterialCardView_strokeColor: number = 10;
            public static MaterialCardView_strokeWidth: number = 11;
            public static MaterialCheckBox: androidNative.Array<number>;
            public static MaterialCheckBox_buttonTint: number = 0;
            public static MaterialCheckBox_useMaterialThemeColors: number = 1;
            public static MaterialRadioButton: androidNative.Array<number>;
            public static MaterialRadioButton_buttonTint: number = 0;
            public static MaterialRadioButton_useMaterialThemeColors: number = 1;
            public static MaterialShape: androidNative.Array<number>;
            public static MaterialShape_shapeAppearance: number = 0;
            public static MaterialShape_shapeAppearanceOverlay: number = 1;
            public static MaterialTextAppearance: androidNative.Array<number>;
            public static MaterialTextAppearance_android_letterSpacing: number = 0;
            public static MaterialTextAppearance_android_lineHeight: number = 1;
            public static MaterialTextAppearance_lineHeight: number = 2;
            public static MaterialTextView: androidNative.Array<number>;
            public static MaterialTextView_android_lineHeight: number = 0;
            public static MaterialTextView_android_textAppearance: number = 1;
            public static MaterialTextView_lineHeight: number = 2;
            public static MaterialTimePicker: androidNative.Array<number>;
            public static MaterialTimePicker_clockIcon: number = 0;
            public static MaterialTimePicker_keyboardIcon: number = 1;
            public static MaterialToolbar: androidNative.Array<number>;
            public static MaterialToolbar_navigationIconTint: number = 0;
            public static MaterialToolbar_subtitleCentered: number = 1;
            public static MaterialToolbar_titleCentered: number = 2;
            public static MenuGroup: androidNative.Array<number>;
            public static MenuGroup_android_checkableBehavior: number = 0;
            public static MenuGroup_android_enabled: number = 1;
            public static MenuGroup_android_id: number = 2;
            public static MenuGroup_android_menuCategory: number = 3;
            public static MenuGroup_android_orderInCategory: number = 4;
            public static MenuGroup_android_visible: number = 5;
            public static MenuItem: androidNative.Array<number>;
            public static MenuItem_actionLayout: number = 0;
            public static MenuItem_actionProviderClass: number = 1;
            public static MenuItem_actionViewClass: number = 2;
            public static MenuItem_alphabeticModifiers: number = 3;
            public static MenuItem_android_alphabeticShortcut: number = 4;
            public static MenuItem_android_checkable: number = 5;
            public static MenuItem_android_checked: number = 6;
            public static MenuItem_android_enabled: number = 7;
            public static MenuItem_android_icon: number = 8;
            public static MenuItem_android_id: number = 9;
            public static MenuItem_android_menuCategory: number = 10;
            public static MenuItem_android_numericShortcut: number = 11;
            public static MenuItem_android_onClick: number = 12;
            public static MenuItem_android_orderInCategory: number = 13;
            public static MenuItem_android_title: number = 14;
            public static MenuItem_android_titleCondensed: number = 15;
            public static MenuItem_android_visible: number = 16;
            public static MenuItem_contentDescription: number = 17;
            public static MenuItem_iconTint: number = 18;
            public static MenuItem_iconTintMode: number = 19;
            public static MenuItem_numericModifiers: number = 20;
            public static MenuItem_showAsAction: number = 21;
            public static MenuItem_tooltipText: number = 22;
            public static MenuView: androidNative.Array<number>;
            public static MenuView_android_headerBackground: number = 0;
            public static MenuView_android_horizontalDivider: number = 1;
            public static MenuView_android_itemBackground: number = 2;
            public static MenuView_android_itemIconDisabledAlpha: number = 3;
            public static MenuView_android_itemTextAppearance: number = 4;
            public static MenuView_android_verticalDivider: number = 5;
            public static MenuView_android_windowAnimationStyle: number = 6;
            public static MenuView_preserveIconSpacing: number = 7;
            public static MenuView_subMenuArrow: number = 8;
            public static MockView: androidNative.Array<number>;
            public static MockView_mock_diagonalsColor: number = 0;
            public static MockView_mock_label: number = 1;
            public static MockView_mock_labelBackgroundColor: number = 2;
            public static MockView_mock_labelColor: number = 3;
            public static MockView_mock_showDiagonals: number = 4;
            public static MockView_mock_showLabel: number = 5;
            public static Motion: androidNative.Array<number>;
            public static Motion_animate_relativeTo: number = 0;
            public static Motion_drawPath: number = 1;
            public static Motion_motionPathRotate: number = 2;
            public static Motion_motionStagger: number = 3;
            public static Motion_pathMotionArc: number = 4;
            public static Motion_transitionEasing: number = 5;
            public static MotionHelper: androidNative.Array<number>;
            public static MotionHelper_onHide: number = 0;
            public static MotionHelper_onShow: number = 1;
            public static MotionLayout: androidNative.Array<number>;
            public static MotionLayout_applyMotionScene: number = 0;
            public static MotionLayout_currentState: number = 1;
            public static MotionLayout_layoutDescription: number = 2;
            public static MotionLayout_motionDebug: number = 3;
            public static MotionLayout_motionProgress: number = 4;
            public static MotionLayout_showPaths: number = 5;
            public static MotionScene: androidNative.Array<number>;
            public static MotionScene_defaultDuration: number = 0;
            public static MotionScene_layoutDuringTransition: number = 1;
            public static MotionTelltales: androidNative.Array<number>;
            public static MotionTelltales_telltales_tailColor: number = 0;
            public static MotionTelltales_telltales_tailScale: number = 1;
            public static MotionTelltales_telltales_velocityMode: number = 2;
            public static NavigationBarView: androidNative.Array<number>;
            public static NavigationBarView_backgroundTint: number = 0;
            public static NavigationBarView_elevation: number = 1;
            public static NavigationBarView_itemBackground: number = 2;
            public static NavigationBarView_itemIconSize: number = 3;
            public static NavigationBarView_itemIconTint: number = 4;
            public static NavigationBarView_itemRippleColor: number = 5;
            public static NavigationBarView_itemTextAppearanceActive: number = 6;
            public static NavigationBarView_itemTextAppearanceInactive: number = 7;
            public static NavigationBarView_itemTextColor: number = 8;
            public static NavigationBarView_labelVisibilityMode: number = 9;
            public static NavigationBarView_menu: number = 10;
            public static NavigationRailView: androidNative.Array<number>;
            public static NavigationRailView_headerLayout: number = 0;
            public static NavigationRailView_menuGravity: number = 1;
            public static NavigationView: androidNative.Array<number>;
            public static NavigationView_android_background: number = 0;
            public static NavigationView_android_fitsSystemWindows: number = 1;
            public static NavigationView_android_maxWidth: number = 2;
            public static NavigationView_elevation: number = 3;
            public static NavigationView_headerLayout: number = 4;
            public static NavigationView_itemBackground: number = 5;
            public static NavigationView_itemHorizontalPadding: number = 6;
            public static NavigationView_itemIconPadding: number = 7;
            public static NavigationView_itemIconSize: number = 8;
            public static NavigationView_itemIconTint: number = 9;
            public static NavigationView_itemMaxLines: number = 10;
            public static NavigationView_itemShapeAppearance: number = 11;
            public static NavigationView_itemShapeAppearanceOverlay: number = 12;
            public static NavigationView_itemShapeFillColor: number = 13;
            public static NavigationView_itemShapeInsetBottom: number = 14;
            public static NavigationView_itemShapeInsetEnd: number = 15;
            public static NavigationView_itemShapeInsetStart: number = 16;
            public static NavigationView_itemShapeInsetTop: number = 17;
            public static NavigationView_itemTextAppearance: number = 18;
            public static NavigationView_itemTextColor: number = 19;
            public static NavigationView_menu: number = 20;
            public static NavigationView_shapeAppearance: number = 21;
            public static NavigationView_shapeAppearanceOverlay: number = 22;
            public static OnClick: androidNative.Array<number>;
            public static OnClick_clickAction: number = 0;
            public static OnClick_targetId: number = 1;
            public static OnSwipe: androidNative.Array<number>;
            public static OnSwipe_dragDirection: number = 0;
            public static OnSwipe_dragScale: number = 1;
            public static OnSwipe_dragThreshold: number = 2;
            public static OnSwipe_limitBoundsTo: number = 3;
            public static OnSwipe_maxAcceleration: number = 4;
            public static OnSwipe_maxVelocity: number = 5;
            public static OnSwipe_moveWhenScrollAtTop: number = 6;
            public static OnSwipe_nestedScrollFlags: number = 7;
            public static OnSwipe_onTouchUp: number = 8;
            public static OnSwipe_touchAnchorId: number = 9;
            public static OnSwipe_touchAnchorSide: number = 10;
            public static OnSwipe_touchRegionId: number = 11;
            public static PopupWindow: androidNative.Array<number>;
            public static PopupWindow_android_popupAnimationStyle: number = 0;
            public static PopupWindow_android_popupBackground: number = 1;
            public static PopupWindow_overlapAnchor: number = 2;
            public static PopupWindowBackgroundState: androidNative.Array<number>;
            public static PopupWindowBackgroundState_state_above_anchor: number = 0;
            public static PropertySet: androidNative.Array<number>;
            public static PropertySet_android_alpha: number = 0;
            public static PropertySet_android_visibility: number = 1;
            public static PropertySet_layout_constraintTag: number = 2;
            public static PropertySet_motionProgress: number = 3;
            public static PropertySet_visibilityMode: number = 4;
            public static RadialViewGroup: androidNative.Array<number>;
            public static RadialViewGroup_materialCircleRadius: number = 0;
            public static RangeSlider: androidNative.Array<number>;
            public static RangeSlider_minSeparation: number = 0;
            public static RangeSlider_values: number = 1;
            public static RecycleListView: androidNative.Array<number>;
            public static RecycleListView_paddingBottomNoButtons: number = 0;
            public static RecycleListView_paddingTopNoTitle: number = 1;
            public static RecyclerView: androidNative.Array<number>;
            public static RecyclerView_android_clipToPadding: number = 0;
            public static RecyclerView_android_descendantFocusability: number = 1;
            public static RecyclerView_android_orientation: number = 2;
            public static RecyclerView_fastScrollEnabled: number = 3;
            public static RecyclerView_fastScrollHorizontalThumbDrawable: number = 4;
            public static RecyclerView_fastScrollHorizontalTrackDrawable: number = 5;
            public static RecyclerView_fastScrollVerticalThumbDrawable: number = 6;
            public static RecyclerView_fastScrollVerticalTrackDrawable: number = 7;
            public static RecyclerView_layoutManager: number = 8;
            public static RecyclerView_reverseLayout: number = 9;
            public static RecyclerView_spanCount: number = 10;
            public static RecyclerView_stackFromEnd: number = 11;
            public static ScrimInsetsFrameLayout: androidNative.Array<number>;
            public static ScrimInsetsFrameLayout_insetForeground: number = 0;
            public static ScrollingViewBehavior_Layout: androidNative.Array<number>;
            public static ScrollingViewBehavior_Layout_behavior_overlapTop: number = 0;
            public static SearchView: androidNative.Array<number>;
            public static SearchView_android_focusable: number = 0;
            public static SearchView_android_imeOptions: number = 1;
            public static SearchView_android_inputType: number = 2;
            public static SearchView_android_maxWidth: number = 3;
            public static SearchView_closeIcon: number = 4;
            public static SearchView_commitIcon: number = 5;
            public static SearchView_defaultQueryHint: number = 6;
            public static SearchView_goIcon: number = 7;
            public static SearchView_iconifiedByDefault: number = 8;
            public static SearchView_layout: number = 9;
            public static SearchView_queryBackground: number = 10;
            public static SearchView_queryHint: number = 11;
            public static SearchView_searchHintIcon: number = 12;
            public static SearchView_searchIcon: number = 13;
            public static SearchView_submitBackground: number = 14;
            public static SearchView_suggestionRowLayout: number = 15;
            public static SearchView_voiceIcon: number = 16;
            public static ShapeAppearance: androidNative.Array<number>;
            public static ShapeAppearance_cornerFamily: number = 0;
            public static ShapeAppearance_cornerFamilyBottomLeft: number = 1;
            public static ShapeAppearance_cornerFamilyBottomRight: number = 2;
            public static ShapeAppearance_cornerFamilyTopLeft: number = 3;
            public static ShapeAppearance_cornerFamilyTopRight: number = 4;
            public static ShapeAppearance_cornerSize: number = 5;
            public static ShapeAppearance_cornerSizeBottomLeft: number = 6;
            public static ShapeAppearance_cornerSizeBottomRight: number = 7;
            public static ShapeAppearance_cornerSizeTopLeft: number = 8;
            public static ShapeAppearance_cornerSizeTopRight: number = 9;
            public static ShapeableImageView: androidNative.Array<number>;
            public static ShapeableImageView_contentPadding: number = 0;
            public static ShapeableImageView_contentPaddingBottom: number = 1;
            public static ShapeableImageView_contentPaddingEnd: number = 2;
            public static ShapeableImageView_contentPaddingLeft: number = 3;
            public static ShapeableImageView_contentPaddingRight: number = 4;
            public static ShapeableImageView_contentPaddingStart: number = 5;
            public static ShapeableImageView_contentPaddingTop: number = 6;
            public static ShapeableImageView_shapeAppearance: number = 7;
            public static ShapeableImageView_shapeAppearanceOverlay: number = 8;
            public static ShapeableImageView_strokeColor: number = 9;
            public static ShapeableImageView_strokeWidth: number = 10;
            public static Slider: androidNative.Array<number>;
            public static Slider_android_enabled: number = 0;
            public static Slider_android_stepSize: number = 1;
            public static Slider_android_value: number = 2;
            public static Slider_android_valueFrom: number = 3;
            public static Slider_android_valueTo: number = 4;
            public static Slider_haloColor: number = 5;
            public static Slider_haloRadius: number = 6;
            public static Slider_labelBehavior: number = 7;
            public static Slider_labelStyle: number = 8;
            public static Slider_thumbColor: number = 9;
            public static Slider_thumbElevation: number = 10;
            public static Slider_thumbRadius: number = 11;
            public static Slider_thumbStrokeColor: number = 12;
            public static Slider_thumbStrokeWidth: number = 13;
            public static Slider_tickColor: number = 14;
            public static Slider_tickColorActive: number = 15;
            public static Slider_tickColorInactive: number = 16;
            public static Slider_tickVisible: number = 17;
            public static Slider_trackColor: number = 18;
            public static Slider_trackColorActive: number = 19;
            public static Slider_trackColorInactive: number = 20;
            public static Slider_trackHeight: number = 21;
            public static Snackbar: androidNative.Array<number>;
            public static Snackbar_snackbarButtonStyle: number = 0;
            public static Snackbar_snackbarStyle: number = 1;
            public static Snackbar_snackbarTextViewStyle: number = 2;
            public static SnackbarLayout: androidNative.Array<number>;
            public static SnackbarLayout_actionTextColorAlpha: number = 0;
            public static SnackbarLayout_android_maxWidth: number = 1;
            public static SnackbarLayout_animationMode: number = 2;
            public static SnackbarLayout_backgroundOverlayColorAlpha: number = 3;
            public static SnackbarLayout_backgroundTint: number = 4;
            public static SnackbarLayout_backgroundTintMode: number = 5;
            public static SnackbarLayout_elevation: number = 6;
            public static SnackbarLayout_maxActionInlineWidth: number = 7;
            public static Spinner: androidNative.Array<number>;
            public static Spinner_android_dropDownWidth: number = 0;
            public static Spinner_android_entries: number = 1;
            public static Spinner_android_popupBackground: number = 2;
            public static Spinner_android_prompt: number = 3;
            public static Spinner_popupTheme: number = 4;
            public static State: androidNative.Array<number>;
            public static State_android_id: number = 0;
            public static State_constraints: number = 1;
            public static StateListDrawable: androidNative.Array<number>;
            public static StateListDrawable_android_constantSize: number = 0;
            public static StateListDrawable_android_dither: number = 1;
            public static StateListDrawable_android_enterFadeDuration: number = 2;
            public static StateListDrawable_android_exitFadeDuration: number = 3;
            public static StateListDrawable_android_variablePadding: number = 4;
            public static StateListDrawable_android_visible: number = 5;
            public static StateListDrawableItem: androidNative.Array<number>;
            public static StateListDrawableItem_android_drawable: number = 0;
            public static StateSet: androidNative.Array<number>;
            public static StateSet_defaultState: number = 0;
            public static SwitchCompat: androidNative.Array<number>;
            public static SwitchCompat_android_textOff: number = 0;
            public static SwitchCompat_android_textOn: number = 1;
            public static SwitchCompat_android_thumb: number = 2;
            public static SwitchCompat_showText: number = 3;
            public static SwitchCompat_splitTrack: number = 4;
            public static SwitchCompat_switchMinWidth: number = 5;
            public static SwitchCompat_switchPadding: number = 6;
            public static SwitchCompat_switchTextAppearance: number = 7;
            public static SwitchCompat_thumbTextPadding: number = 8;
            public static SwitchCompat_thumbTint: number = 9;
            public static SwitchCompat_thumbTintMode: number = 10;
            public static SwitchCompat_track: number = 11;
            public static SwitchCompat_trackTint: number = 12;
            public static SwitchCompat_trackTintMode: number = 13;
            public static SwitchMaterial: androidNative.Array<number>;
            public static SwitchMaterial_useMaterialThemeColors: number = 0;
            public static TabItem: androidNative.Array<number>;
            public static TabItem_android_icon: number = 0;
            public static TabItem_android_layout: number = 1;
            public static TabItem_android_text: number = 2;
            public static TabLayout: androidNative.Array<number>;
            public static TabLayout_tabBackground: number = 0;
            public static TabLayout_tabContentStart: number = 1;
            public static TabLayout_tabGravity: number = 2;
            public static TabLayout_tabIconTint: number = 3;
            public static TabLayout_tabIconTintMode: number = 4;
            public static TabLayout_tabIndicator: number = 5;
            public static TabLayout_tabIndicatorAnimationDuration: number = 6;
            public static TabLayout_tabIndicatorAnimationMode: number = 7;
            public static TabLayout_tabIndicatorColor: number = 8;
            public static TabLayout_tabIndicatorFullWidth: number = 9;
            public static TabLayout_tabIndicatorGravity: number = 10;
            public static TabLayout_tabIndicatorHeight: number = 11;
            public static TabLayout_tabInlineLabel: number = 12;
            public static TabLayout_tabMaxWidth: number = 13;
            public static TabLayout_tabMinWidth: number = 14;
            public static TabLayout_tabMode: number = 15;
            public static TabLayout_tabPadding: number = 16;
            public static TabLayout_tabPaddingBottom: number = 17;
            public static TabLayout_tabPaddingEnd: number = 18;
            public static TabLayout_tabPaddingStart: number = 19;
            public static TabLayout_tabPaddingTop: number = 20;
            public static TabLayout_tabRippleColor: number = 21;
            public static TabLayout_tabSelectedTextColor: number = 22;
            public static TabLayout_tabTextAppearance: number = 23;
            public static TabLayout_tabTextColor: number = 24;
            public static TabLayout_tabUnboundedRipple: number = 25;
            public static TextAppearance: androidNative.Array<number>;
            public static TextAppearance_android_fontFamily: number = 0;
            public static TextAppearance_android_shadowColor: number = 1;
            public static TextAppearance_android_shadowDx: number = 2;
            public static TextAppearance_android_shadowDy: number = 3;
            public static TextAppearance_android_shadowRadius: number = 4;
            public static TextAppearance_android_textColor: number = 5;
            public static TextAppearance_android_textColorHint: number = 6;
            public static TextAppearance_android_textColorLink: number = 7;
            public static TextAppearance_android_textFontWeight: number = 8;
            public static TextAppearance_android_textSize: number = 9;
            public static TextAppearance_android_textStyle: number = 10;
            public static TextAppearance_android_typeface: number = 11;
            public static TextAppearance_fontFamily: number = 12;
            public static TextAppearance_fontVariationSettings: number = 13;
            public static TextAppearance_textAllCaps: number = 14;
            public static TextAppearance_textLocale: number = 15;
            public static TextInputEditText: androidNative.Array<number>;
            public static TextInputEditText_textInputLayoutFocusedRectEnabled: number = 0;
            public static TextInputLayout: androidNative.Array<number>;
            public static TextInputLayout_android_enabled: number = 0;
            public static TextInputLayout_android_hint: number = 1;
            public static TextInputLayout_android_maxWidth: number = 2;
            public static TextInputLayout_android_minWidth: number = 3;
            public static TextInputLayout_android_textColorHint: number = 4;
            public static TextInputLayout_boxBackgroundColor: number = 5;
            public static TextInputLayout_boxBackgroundMode: number = 6;
            public static TextInputLayout_boxCollapsedPaddingTop: number = 7;
            public static TextInputLayout_boxCornerRadiusBottomEnd: number = 8;
            public static TextInputLayout_boxCornerRadiusBottomStart: number = 9;
            public static TextInputLayout_boxCornerRadiusTopEnd: number = 10;
            public static TextInputLayout_boxCornerRadiusTopStart: number = 11;
            public static TextInputLayout_boxStrokeColor: number = 12;
            public static TextInputLayout_boxStrokeErrorColor: number = 13;
            public static TextInputLayout_boxStrokeWidth: number = 14;
            public static TextInputLayout_boxStrokeWidthFocused: number = 15;
            public static TextInputLayout_counterEnabled: number = 16;
            public static TextInputLayout_counterMaxLength: number = 17;
            public static TextInputLayout_counterOverflowTextAppearance: number = 18;
            public static TextInputLayout_counterOverflowTextColor: number = 19;
            public static TextInputLayout_counterTextAppearance: number = 20;
            public static TextInputLayout_counterTextColor: number = 21;
            public static TextInputLayout_endIconCheckable: number = 22;
            public static TextInputLayout_endIconContentDescription: number = 23;
            public static TextInputLayout_endIconDrawable: number = 24;
            public static TextInputLayout_endIconMode: number = 25;
            public static TextInputLayout_endIconTint: number = 26;
            public static TextInputLayout_endIconTintMode: number = 27;
            public static TextInputLayout_errorContentDescription: number = 28;
            public static TextInputLayout_errorEnabled: number = 29;
            public static TextInputLayout_errorIconDrawable: number = 30;
            public static TextInputLayout_errorIconTint: number = 31;
            public static TextInputLayout_errorIconTintMode: number = 32;
            public static TextInputLayout_errorTextAppearance: number = 33;
            public static TextInputLayout_errorTextColor: number = 34;
            public static TextInputLayout_expandedHintEnabled: number = 35;
            public static TextInputLayout_helperText: number = 36;
            public static TextInputLayout_helperTextEnabled: number = 37;
            public static TextInputLayout_helperTextTextAppearance: number = 38;
            public static TextInputLayout_helperTextTextColor: number = 39;
            public static TextInputLayout_hintAnimationEnabled: number = 40;
            public static TextInputLayout_hintEnabled: number = 41;
            public static TextInputLayout_hintTextAppearance: number = 42;
            public static TextInputLayout_hintTextColor: number = 43;
            public static TextInputLayout_passwordToggleContentDescription: number = 44;
            public static TextInputLayout_passwordToggleDrawable: number = 45;
            public static TextInputLayout_passwordToggleEnabled: number = 46;
            public static TextInputLayout_passwordToggleTint: number = 47;
            public static TextInputLayout_passwordToggleTintMode: number = 48;
            public static TextInputLayout_placeholderText: number = 49;
            public static TextInputLayout_placeholderTextAppearance: number = 50;
            public static TextInputLayout_placeholderTextColor: number = 51;
            public static TextInputLayout_prefixText: number = 52;
            public static TextInputLayout_prefixTextAppearance: number = 53;
            public static TextInputLayout_prefixTextColor: number = 54;
            public static TextInputLayout_shapeAppearance: number = 55;
            public static TextInputLayout_shapeAppearanceOverlay: number = 56;
            public static TextInputLayout_startIconCheckable: number = 57;
            public static TextInputLayout_startIconContentDescription: number = 58;
            public static TextInputLayout_startIconDrawable: number = 59;
            public static TextInputLayout_startIconTint: number = 60;
            public static TextInputLayout_startIconTintMode: number = 61;
            public static TextInputLayout_suffixText: number = 62;
            public static TextInputLayout_suffixTextAppearance: number = 63;
            public static TextInputLayout_suffixTextColor: number = 64;
            public static ThemeEnforcement: androidNative.Array<number>;
            public static ThemeEnforcement_android_textAppearance: number = 0;
            public static ThemeEnforcement_enforceMaterialTheme: number = 1;
            public static ThemeEnforcement_enforceTextAppearance: number = 2;
            public static Toolbar: androidNative.Array<number>;
            public static Toolbar_android_gravity: number = 0;
            public static Toolbar_android_minHeight: number = 1;
            public static Toolbar_buttonGravity: number = 2;
            public static Toolbar_collapseContentDescription: number = 3;
            public static Toolbar_collapseIcon: number = 4;
            public static Toolbar_contentInsetEnd: number = 5;
            public static Toolbar_contentInsetEndWithActions: number = 6;
            public static Toolbar_contentInsetLeft: number = 7;
            public static Toolbar_contentInsetRight: number = 8;
            public static Toolbar_contentInsetStart: number = 9;
            public static Toolbar_contentInsetStartWithNavigation: number = 10;
            public static Toolbar_logo: number = 11;
            public static Toolbar_logoDescription: number = 12;
            public static Toolbar_maxButtonHeight: number = 13;
            public static Toolbar_menu: number = 14;
            public static Toolbar_navigationContentDescription: number = 15;
            public static Toolbar_navigationIcon: number = 16;
            public static Toolbar_popupTheme: number = 17;
            public static Toolbar_subtitle: number = 18;
            public static Toolbar_subtitleTextAppearance: number = 19;
            public static Toolbar_subtitleTextColor: number = 20;
            public static Toolbar_title: number = 21;
            public static Toolbar_titleMargin: number = 22;
            public static Toolbar_titleMarginBottom: number = 23;
            public static Toolbar_titleMarginEnd: number = 24;
            public static Toolbar_titleMarginStart: number = 25;
            public static Toolbar_titleMarginTop: number = 26;
            public static Toolbar_titleMargins: number = 27;
            public static Toolbar_titleTextAppearance: number = 28;
            public static Toolbar_titleTextColor: number = 29;
            public static Tooltip: androidNative.Array<number>;
            public static Tooltip_android_layout_margin: number = 0;
            public static Tooltip_android_minHeight: number = 1;
            public static Tooltip_android_minWidth: number = 2;
            public static Tooltip_android_padding: number = 3;
            public static Tooltip_android_text: number = 4;
            public static Tooltip_android_textAppearance: number = 5;
            public static Tooltip_backgroundTint: number = 6;
            public static Transform: androidNative.Array<number>;
            public static Transform_android_elevation: number = 0;
            public static Transform_android_rotation: number = 1;
            public static Transform_android_rotationX: number = 2;
            public static Transform_android_rotationY: number = 3;
            public static Transform_android_scaleX: number = 4;
            public static Transform_android_scaleY: number = 5;
            public static Transform_android_transformPivotX: number = 6;
            public static Transform_android_transformPivotY: number = 7;
            public static Transform_android_translationX: number = 8;
            public static Transform_android_translationY: number = 9;
            public static Transform_android_translationZ: number = 10;
            public static Transition: androidNative.Array<number>;
            public static Transition_android_id: number = 0;
            public static Transition_autoTransition: number = 1;
            public static Transition_constraintSetEnd: number = 2;
            public static Transition_constraintSetStart: number = 3;
            public static Transition_duration: number = 4;
            public static Transition_layoutDuringTransition: number = 5;
            public static Transition_motionInterpolator: number = 6;
            public static Transition_pathMotionArc: number = 7;
            public static Transition_staggered: number = 8;
            public static Transition_transitionDisable: number = 9;
            public static Transition_transitionFlags: number = 10;
            public static Variant: androidNative.Array<number>;
            public static Variant_constraints: number = 0;
            public static Variant_region_heightLessThan: number = 1;
            public static Variant_region_heightMoreThan: number = 2;
            public static Variant_region_widthLessThan: number = 3;
            public static Variant_region_widthMoreThan: number = 4;
            public static View: androidNative.Array<number>;
            public static View_android_focusable: number = 0;
            public static View_android_theme: number = 1;
            public static View_paddingEnd: number = 2;
            public static View_paddingStart: number = 3;
            public static View_theme: number = 4;
            public static ViewBackgroundHelper: androidNative.Array<number>;
            public static ViewBackgroundHelper_android_background: number = 0;
            public static ViewBackgroundHelper_backgroundTint: number = 1;
            public static ViewBackgroundHelper_backgroundTintMode: number = 2;
            public static ViewPager2: androidNative.Array<number>;
            public static ViewPager2_android_orientation: number = 0;
            public static ViewStubCompat: androidNative.Array<number>;
            public static ViewStubCompat_android_id: number = 0;
            public static ViewStubCompat_android_inflatedId: number = 1;
            public static ViewStubCompat_android_layout: number = 2;
            public static '<clinit>'(): void;
          }
          export class xml {
            public static class: java.lang.Class<com.cloudinary.android.core.R.xml>;
            public static standalone_badge: number = 0;
            public static standalone_badge_gravity_bottom_end: number = 0;
            public static standalone_badge_gravity_bottom_start: number = 0;
            public static standalone_badge_gravity_top_start: number = 0;
            public static standalone_badge_offset: number = 0;
          }
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module download {
        export class DownloadRequest {
          public static class: java.lang.Class<com.cloudinary.android.download.DownloadRequest>;
          /**
           * Constructs a new instance of the com.cloudinary.android.download.DownloadRequest interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { cancel(): void });
          public constructor();
          public cancel(): void;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module download {
        export class DownloadRequestBuilder {
          public static class: java.lang.Class<com.cloudinary.android.download.DownloadRequestBuilder>;
          /**
           * Constructs a new instance of the com.cloudinary.android.download.DownloadRequestBuilder interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            load(param0: number): com.cloudinary.android.download.DownloadRequestBuilder;
            load(param0: string): com.cloudinary.android.download.DownloadRequestBuilder;
            transformation(param0: com.cloudinary.Transformation): com.cloudinary.android.download.DownloadRequestBuilder;
            responsive(param0: com.cloudinary.android.ResponsiveUrl): com.cloudinary.android.download.DownloadRequestBuilder;
            responsive(param0: com.cloudinary.android.ResponsiveUrl.Preset): com.cloudinary.android.download.DownloadRequestBuilder;
            placeholder(param0: number): com.cloudinary.android.download.DownloadRequestBuilder;
            callback(param0: com.cloudinary.android.download.DownloadRequestCallback): com.cloudinary.android.download.DownloadRequestBuilder;
            into(param0: globalAndroid.widget.ImageView): com.cloudinary.android.download.DownloadRequest;
          });
          public constructor();
          public into(param0: globalAndroid.widget.ImageView): com.cloudinary.android.download.DownloadRequest;
          public responsive(param0: com.cloudinary.android.ResponsiveUrl.Preset): com.cloudinary.android.download.DownloadRequestBuilder;
          public placeholder(param0: number): com.cloudinary.android.download.DownloadRequestBuilder;
          public callback(param0: com.cloudinary.android.download.DownloadRequestCallback): com.cloudinary.android.download.DownloadRequestBuilder;
          public transformation(param0: com.cloudinary.Transformation): com.cloudinary.android.download.DownloadRequestBuilder;
          public responsive(param0: com.cloudinary.android.ResponsiveUrl): com.cloudinary.android.download.DownloadRequestBuilder;
          public load(param0: number): com.cloudinary.android.download.DownloadRequestBuilder;
          public load(param0: string): com.cloudinary.android.download.DownloadRequestBuilder;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module download {
        export class DownloadRequestBuilderFactory {
          public static class: java.lang.Class<com.cloudinary.android.download.DownloadRequestBuilderFactory>;
          /**
           * Constructs a new instance of the com.cloudinary.android.download.DownloadRequestBuilderFactory interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { createDownloadRequestBuilder(param0: globalAndroid.content.Context): com.cloudinary.android.download.DownloadRequestBuilder });
          public constructor();
          public createDownloadRequestBuilder(param0: globalAndroid.content.Context): com.cloudinary.android.download.DownloadRequestBuilder;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module download {
        export class DownloadRequestCallback {
          public static class: java.lang.Class<com.cloudinary.android.download.DownloadRequestCallback>;
          /**
           * Constructs a new instance of the com.cloudinary.android.download.DownloadRequestCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { onSuccess(): void; onFailure(param0: java.lang.Throwable): void });
          public constructor();
          public onSuccess(): void;
          public onFailure(param0: java.lang.Throwable): void;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module payload {
        export class ByteArrayPayload extends com.cloudinary.android.payload.Payload<androidNative.Array<number>> {
          public static class: java.lang.Class<com.cloudinary.android.payload.ByteArrayPayload>;
          public static ENCODING_CHARSET: string = 'UTF8';
          public prepare(context: globalAndroid.content.Context): any;
          public getLength(context: globalAndroid.content.Context): number;
          public constructor();
          public constructor(data: androidNative.Array<number>);
          public toUri(): string;
          public constructor(data: any);
          public equals(o: any): boolean;
          public hashCode(): number;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module payload {
        export class EmptyByteArrayException extends com.cloudinary.android.payload.PayloadNotFoundException {
          public static class: java.lang.Class<com.cloudinary.android.payload.EmptyByteArrayException>;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module payload {
        export class FileNotFoundException extends com.cloudinary.android.payload.PayloadNotFoundException {
          public static class: java.lang.Class<com.cloudinary.android.payload.FileNotFoundException>;
          public constructor(message: string);
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module payload {
        export class FilePayload extends com.cloudinary.android.payload.Payload<string> {
          public static class: java.lang.Class<com.cloudinary.android.payload.FilePayload>;
          public prepare(context: globalAndroid.content.Context): any;
          public getLength(context: globalAndroid.content.Context): number;
          public constructor();
          public constructor(filePath: string);
          public toUri(): string;
          public constructor(data: any);
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module payload {
        export class LocalUriNotFoundException extends com.cloudinary.android.payload.PayloadNotFoundException {
          public static class: java.lang.Class<com.cloudinary.android.payload.LocalUriNotFoundException>;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module payload {
        export class LocalUriPayload extends com.cloudinary.android.payload.Payload<globalAndroid.net.Uri> {
          public static class: java.lang.Class<com.cloudinary.android.payload.LocalUriPayload>;
          public static PROJECTION: androidNative.Array<string>;
          public constructor(data: globalAndroid.net.Uri);
          public getLength(context: globalAndroid.content.Context): number;
          public constructor();
          public toUri(): string;
          public prepare(this_: globalAndroid.content.Context): any;
          public constructor(data: any);
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module payload {
        export abstract class Payload<T> extends java.lang.Object {
          public static class: java.lang.Class<com.cloudinary.android.payload.Payload<any>>;
          public data: T;
          public prepare(param0: globalAndroid.content.Context): any;
          public constructor();
          public constructor(data: T);
          public toUri(): string;
          public getLength(param0: globalAndroid.content.Context): number;
          public getData(): T;
          public equals(o: any): boolean;
          public hashCode(): number;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module payload {
        export class PayloadFactory {
          public static class: java.lang.Class<com.cloudinary.android.payload.PayloadFactory>;
          public constructor();
          public static fromUri(payload: string): com.cloudinary.android.payload.Payload<any>;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module payload {
        export class PayloadNotFoundException {
          public static class: java.lang.Class<com.cloudinary.android.payload.PayloadNotFoundException>;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module payload {
        export class ResourceNotFoundException extends com.cloudinary.android.payload.PayloadNotFoundException {
          public static class: java.lang.Class<com.cloudinary.android.payload.ResourceNotFoundException>;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module payload {
        export class ResourcePayload extends com.cloudinary.android.payload.Payload<java.lang.Integer> {
          public static class: java.lang.Class<com.cloudinary.android.payload.ResourcePayload>;
          public constructor();
          public getLength(this_: globalAndroid.content.Context): number;
          public toUri(): string;
          public prepare(this_: globalAndroid.content.Context): any;
          public constructor(data: any);
          public constructor(rawResourceId: java.lang.Integer);
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module policy {
        export class GlobalUploadPolicy extends com.cloudinary.android.policy.UploadPolicy {
          public static class: java.lang.Class<com.cloudinary.android.policy.GlobalUploadPolicy>;
          public static defaultPolicy(): com.cloudinary.android.policy.GlobalUploadPolicy;
          public static defaultPolicy(): com.cloudinary.android.policy.UploadPolicy;
          public getMaxConcurrentRequests(): number;
        }
        export module GlobalUploadPolicy {
          export class Builder extends com.cloudinary.android.policy.UploadPolicy.BaseBuilder<com.cloudinary.android.policy.GlobalUploadPolicy.Builder> {
            public static class: java.lang.Class<com.cloudinary.android.policy.GlobalUploadPolicy.Builder>;
            public build(): com.cloudinary.android.policy.UploadPolicy;
            public constructor();
            public build(): com.cloudinary.android.policy.GlobalUploadPolicy;
            public maxConcurrentRequests(maxConcurrentRequests: number): com.cloudinary.android.policy.GlobalUploadPolicy.Builder;
          }
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module policy {
        export class TimeWindow {
          public static class: java.lang.Class<com.cloudinary.android.policy.TimeWindow>;
          public getMinLatencyOffsetMillis(): number;
          public isImmediate(): boolean;
          public getMaxExecutionDelayMillis(): number;
          public newDeferredWindow(minutes: number): com.cloudinary.android.policy.TimeWindow;
          public static getDefault(): com.cloudinary.android.policy.TimeWindow;
          public static immediate(): com.cloudinary.android.policy.TimeWindow;
          public isStartNow(): boolean;
        }
        export module TimeWindow {
          export class Builder {
            public static class: java.lang.Class<com.cloudinary.android.policy.TimeWindow.Builder>;
            public constructor();
            public minLatencyMillis(minLatencyMillis: number): com.cloudinary.android.policy.TimeWindow.Builder;
            public build(): com.cloudinary.android.policy.TimeWindow;
            public maxExecutionDelayMillis(maxExecutionDelayMillis: number): com.cloudinary.android.policy.TimeWindow.Builder;
          }
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module policy {
        export class UploadPolicy {
          public static class: java.lang.Class<com.cloudinary.android.policy.UploadPolicy>;
          public hasRequirements(): boolean;
          public newBuilder(): com.cloudinary.android.policy.UploadPolicy.Builder;
          public getBackoffPolicy(): com.cloudinary.android.policy.UploadPolicy.BackoffPolicy;
          public static defaultPolicy(): com.cloudinary.android.policy.UploadPolicy;
          public constructor(networkType: com.cloudinary.android.policy.UploadPolicy.NetworkType, requiresCharging: boolean, requiresIdle: boolean, maxErrorRetries: number, backoffMillis: number, backoffPolicy: com.cloudinary.android.policy.UploadPolicy.BackoffPolicy);
          public getNetworkType(): com.cloudinary.android.policy.UploadPolicy.NetworkType;
          public isRequiresIdle(): boolean;
          public getMaxErrorRetries(): number;
          public getBackoffMillis(): number;
          public isRequiresCharging(): boolean;
        }
        export module UploadPolicy {
          export class BackoffPolicy {
            public static class: java.lang.Class<com.cloudinary.android.policy.UploadPolicy.BackoffPolicy>;
            public static LINEAR: com.cloudinary.android.policy.UploadPolicy.BackoffPolicy;
            public static EXPONENTIAL: com.cloudinary.android.policy.UploadPolicy.BackoffPolicy;
            public static valueOf(name: string): com.cloudinary.android.policy.UploadPolicy.BackoffPolicy;
            public static values(): androidNative.Array<com.cloudinary.android.policy.UploadPolicy.BackoffPolicy>;
          }
          export abstract class BaseBuilder<T> extends java.lang.Object {
            public static class: java.lang.Class<com.cloudinary.android.policy.UploadPolicy.BaseBuilder<any>>;
            public backoffCriteria(backoffMs: number, backoffPolicy: com.cloudinary.android.policy.UploadPolicy.BackoffPolicy): T;
            public build(): com.cloudinary.android.policy.UploadPolicy;
            public networkPolicy(networkPolicy: com.cloudinary.android.policy.UploadPolicy.NetworkType): T;
            public requiresCharging(requiresCharging: boolean): T;
            public maxRetries(maxRetries: number): T;
            public requiresIdle(requiresIdle: boolean): T;
          }
          export class Builder extends com.cloudinary.android.policy.UploadPolicy.BaseBuilder<com.cloudinary.android.policy.UploadPolicy.Builder> {
            public static class: java.lang.Class<com.cloudinary.android.policy.UploadPolicy.Builder>;
            public constructor();
          }
          export class NetworkType {
            public static class: java.lang.Class<com.cloudinary.android.policy.UploadPolicy.NetworkType>;
            public static NONE: com.cloudinary.android.policy.UploadPolicy.NetworkType;
            public static ANY: com.cloudinary.android.policy.UploadPolicy.NetworkType;
            public static UNMETERED: com.cloudinary.android.policy.UploadPolicy.NetworkType;
            public static values(): androidNative.Array<com.cloudinary.android.policy.UploadPolicy.NetworkType>;
            public static valueOf(name: string): com.cloudinary.android.policy.UploadPolicy.NetworkType;
          }
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module preprocess {
        export class PayloadDecodeException extends com.cloudinary.android.preprocess.PreprocessException {
          public static class: java.lang.Class<com.cloudinary.android.preprocess.PayloadDecodeException>;
          public constructor(message: string);
          public constructor();
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module preprocess {
        export class Preprocess<T> extends java.lang.Object {
          public static class: java.lang.Class<com.cloudinary.android.preprocess.Preprocess<any>>;
          /**
           * Constructs a new instance of the com.cloudinary.android.preprocess.Preprocess<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { execute(param0: globalAndroid.content.Context, param1: T): T });
          public constructor();
          public execute(param0: globalAndroid.content.Context, param1: T): T;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module preprocess {
        export abstract class PreprocessChain<T> extends java.lang.Object {
          public static class: java.lang.Class<com.cloudinary.android.preprocess.PreprocessChain<any>>;
          public isEmpty(): boolean;
          public addStep(step: com.cloudinary.android.preprocess.Preprocess<T>): com.cloudinary.android.preprocess.PreprocessChain<T>;
          public constructor();
          public getDefaultDecoder(): com.cloudinary.android.preprocess.ResourceDecoder<T>;
          public loadWith(decoder: com.cloudinary.android.preprocess.ResourceDecoder<T>): com.cloudinary.android.preprocess.PreprocessChain<T>;
          public getDefaultEncoder(): com.cloudinary.android.preprocess.ResourceEncoder<T>;
          public saveWith(encoder: com.cloudinary.android.preprocess.ResourceEncoder<T>): com.cloudinary.android.preprocess.PreprocessChain<T>;
          public execute(this_: globalAndroid.content.Context, context: com.cloudinary.android.payload.Payload<any>): string;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module preprocess {
        export class PreprocessException {
          public static class: java.lang.Class<com.cloudinary.android.preprocess.PreprocessException>;
          public constructor(message: string);
          public constructor();
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module preprocess {
        export class ResourceCreationException extends com.cloudinary.android.preprocess.PreprocessException {
          public static class: java.lang.Class<com.cloudinary.android.preprocess.ResourceCreationException>;
          public constructor(message: string);
          public constructor();
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module preprocess {
        export class ResourceDecoder<T> extends java.lang.Object {
          public static class: java.lang.Class<com.cloudinary.android.preprocess.ResourceDecoder<any>>;
          /**
           * Constructs a new instance of the com.cloudinary.android.preprocess.ResourceDecoder<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { decode(param0: globalAndroid.content.Context, param1: com.cloudinary.android.payload.Payload<any>): T });
          public constructor();
          public decode(param0: globalAndroid.content.Context, param1: com.cloudinary.android.payload.Payload<any>): T;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module preprocess {
        export class ResourceEncoder<T> extends java.lang.Object {
          public static class: java.lang.Class<com.cloudinary.android.preprocess.ResourceEncoder<any>>;
          /**
           * Constructs a new instance of the com.cloudinary.android.preprocess.ResourceEncoder<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { encode(param0: globalAndroid.content.Context, param1: T): string });
          public constructor();
          public encode(param0: globalAndroid.content.Context, param1: T): string;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module preprocess {
        export class ValidationException extends com.cloudinary.android.preprocess.PreprocessException {
          public static class: java.lang.Class<com.cloudinary.android.preprocess.ValidationException>;
          public constructor(message: string);
          public constructor();
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module signed {
        export class Signature {
          public static class: java.lang.Class<com.cloudinary.android.signed.Signature>;
          public getSignature(): string;
          public getTimestamp(): number;
          public constructor(signature: string, apiKey: string, timestamp: number);
          public getApiKey(): string;
        }
      }
    }
  }
}

declare module com {
  export module cloudinary {
    export module android {
      export module signed {
        export class SignatureProvider {
          public static class: java.lang.Class<com.cloudinary.android.signed.SignatureProvider>;
          /**
           * Constructs a new instance of the com.cloudinary.android.signed.SignatureProvider interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { provideSignature(param0: java.util.Map<any, any>): com.cloudinary.android.signed.Signature; getName(): string });
          public constructor();
          public provideSignature(param0: java.util.Map<any, any>): com.cloudinary.android.signed.Signature;
          public getName(): string;
        }
      }
    }
  }
}

//Generics information:
//com.cloudinary.android.UploadContext:1
//com.cloudinary.android.UploadRequest:1
//com.cloudinary.android.payload.Payload:1
//com.cloudinary.android.policy.UploadPolicy.BaseBuilder:1
//com.cloudinary.android.preprocess.Preprocess:1
//com.cloudinary.android.preprocess.PreprocessChain:1
//com.cloudinary.android.preprocess.ResourceDecoder:1
//com.cloudinary.android.preprocess.ResourceEncoder:1
