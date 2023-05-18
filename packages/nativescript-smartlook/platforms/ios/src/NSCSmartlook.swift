import Foundation
import SmartlookAnalytics

@objc public class NSCSmartlook: NSObject {
    @objc public static func start(_ key: String) {
        Smartlook.instance.preferences.projectKey = key
        Smartlook.instance.start() 
    }

    @objc public static func stop() {
        Smartlook.instance.stop() 
    }

    @objc public static func isRecording() -> Bool {
        return Smartlook.instance.state.status == .recording
    }
}