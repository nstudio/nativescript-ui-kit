import UIKit
import RiveRuntime

@objc public class NSCRiveController: UIViewController {
    var simpleVM = RiveViewModel(fileName: "basketball")
        
        override func viewWillAppear(_ animated: Bool) {
            let riveView = simpleVM.createRiveView()
            view.addSubview(riveView)
            riveView.frame = view.frame
        }
}
