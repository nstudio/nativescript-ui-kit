import UIKit
import RiveRuntime

@objc public class NSCRiveController: UIViewController {
    var riveModel: RiveViewModel?

    @objc public func setFile(name: String) {
        riveModel = RiveViewModel(fileName: name)
        let riveView = riveModel?.createRiveView()
        
        riveModel?.fit = .scaleDown
        riveView?.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(riveView!)
        NSLayoutConstraint.activate([
            riveView!.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            riveView!.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor),
            riveView!.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor),
            riveView!.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor)
        ])
    }

    @objc public func stop() {
        riveModel?.stop()
    }
    
    @objc public func pause() {
        riveModel?.pause()
    }

    @objc public func isPlaying() -> Bool {
        return riveModel?.isPlaying ?? false
    }
    
    @objc public func play(name: String?, direction: NSNumber?, loop: String?) {
        let dir: RiveDirection?
        switch (direction) {
        case -1:
            dir = .backwards
        case 1:
            dir = .forwards
        case 0:
            dir = .none
        default:
            dir = .autoDirection
        }
        let riveLoop: RiveLoop?
        switch (loop) {
        case "loop":
            riveLoop = .loop
        case "oneShot":
            riveLoop = .oneShot
        case "pingPong":
            riveLoop = .pingPong
        case "none":
            riveLoop = .none
        default:
            riveLoop = .autoLoop
        }
         riveModel?.play(animationName: name ?? nil, loop: riveLoop ?? .autoLoop, direction: dir ?? .autoDirection);
    }
}
