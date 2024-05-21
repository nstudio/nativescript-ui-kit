import Foundation
import UIKit
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

    @objc public static func setUser(id: String, name: String?, email: String?, extraData: NSDictionary?) {
        Smartlook.instance.user.identifier = id
        if (name != nil) {
            Smartlook.instance.user.name = name
        }
        if (email != nil) {
            Smartlook.instance.user.email = email
        }
        if (extraData != nil) {
            for (key, value) in extraData! {
                Smartlook.instance.user.setProperty(key as! String, to: value as? String)
            }

        }
    }

    @objc public static func sessionUrl(_ withTimestamp: Bool) -> String {
        if (withTimestamp == true) {
            return Smartlook.instance.user.session.urlWithTimestamp!.absoluteString
        } else {
            return Smartlook.instance.user.session.url!.absoluteString
        }
    }

    @objc public static func setRenderingMode(_ mode: NSNumber) {
        switch mode.intValue {
        case 0:
            Smartlook.instance.preferences.renderingMode = .native
            break;
            case 1:
            Smartlook.instance.preferences.renderingMode = .wireframe()
            break;
            case 2:
            Smartlook.instance.preferences.renderingMode = .noRendering
            break;
        default:
            Smartlook.instance.preferences.renderingMode = .native
            break;

        }
    }

    @objc public static func getRenderingMode() -> NSNumber {
        switch(Smartlook.instance.preferences.renderingMode) {
        case .native:
            return 0;
        case .wireframe:
            return 1;
        case .noRendering:
            return 2;
        default:
            return 0;
        }
    }

    @objc public static func setSensitivity(_ view: UIView, sensitive: Bool) {
        view.slSensitive = sensitive
    }

    @objc public static func trackEvent(_ name: String, properties: NSDictionary?) {
        if (properties != nil) {
            let props = Properties()
            for (key, value) in properties! {
                props.setProperty(key as! String, to: value as? String)
            }
            Smartlook.instance.track(event: name, properties: props)
        } else {
            Smartlook.instance.track(event: name)
        }
    }

    @objc public static func trackNavigationEvent(_ name: String, properties: NSDictionary?) {
        if (properties != nil) {
            let props = Properties()
            for (key, value) in properties! {
                props.setProperty(key as! String, to: value as? String)
            }
            Smartlook.instance.track(navigationEvent: name, properties: props)
        } else {
            Smartlook.instance.track(navigationEvent: name)
        }
    }
}
