import UIKit
import RiveRuntime

@objc public class NSCRiveController: UIViewController {
     var riveView: RiveView?
    var fileName: String?

    @objc public func setFile(name: String) {
        fileName = name
        riveView = try? RiveView(resource: name)
        riveView?.fit = .fitScaleDown
        riveView?.translatesAutoresizingMaskIntoConstraints = false
        // riveModel = RiveViewModel(fileName: name)
        // let riveView = riveModel?.createRiveView()
        
        // riveModel?.fit = .scaleDown
        // riveView?.translatesAutoresizingMaskIntoConstraints = false
         view.addSubview(riveView!)
         NSLayoutConstraint.activate([
             riveView!.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
             riveView!.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor),
             riveView!.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor),
             riveView!.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor)
         ])
    
                
        
    }

    @objc public func stop() {
        riveView?.stop()
    }
    
    @objc public func pause() {
        riveView?.pause()
    }

    @objc public func isPlaying() -> Bool {
         return riveView?.isPlaying ?? false
    }
    
    @objc public func play(name: String?, direction: NSNumber?, loop: String?) {
         let dir: Direction?
         switch (direction) {
         case -1:
             dir = .directionBackwards
         case 1:
             dir = .directionForwards
         case 0:
             dir = .none
         default:
             dir = .directionAuto
         }
         let riveLoop: Loop?
         switch (loop) {
         case "loop":
             riveLoop = .loopLoop
         case "oneShot":
             riveLoop = .loopOneShot
         case "pingPong":
             riveLoop = .loopPingPong
         case "none":
             riveLoop = .none
         default:
             riveLoop = .loopAuto
         }
//          riveView?.play(animationName: name ?? nil, loop: riveLoop ?? .autoLoop, direction: dir ?? .autoDirection);
        try? riveView?.play(animationName: (name ?? fileName)!, loop: riveLoop ?? .loopAuto, direction: dir ?? .directionAuto)
    }
}
