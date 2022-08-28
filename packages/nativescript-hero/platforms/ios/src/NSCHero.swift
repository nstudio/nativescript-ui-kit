import UIKit
import Hero

@objc extension UIView {

//    public var _hero: HeroExtension<UIView>? {
//        get {
//            return self.hero
//        }
//    }

    public var _heroID: String? {
        set {
             print("setting hero.id in UIView extension!")
            print(newValue ?? "empty")
            self.hero.id = newValue
        }
        get {
            return self.hero.id
        }
    }
    
    public var _heroEnabled: Bool {
        set {
            self.hero.isEnabled = newValue
        }
        get {
            return self.hero.isEnabled
        }
    }
}

@objc extension UIViewController {
    public var _heroEnabled: Bool {
        set {
            self.hero.isEnabled = newValue
        }
        get {
            return self.hero.isEnabled
        }
    }
}

// @objc extension UINavigationController {
//     public var _heroEnabled: Bool {
//         set {
//             self.hero.isEnabled = newValue
//         }
//         get {
//             return self.hero.isEnabled
//         }
//     }
// }
