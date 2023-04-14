import UIKit
import RiveRuntime

@objc public class NSCRiveController: UIViewController {
    @objc public var riveViewModel: RiveViewModel?
    @objc public var riveView: RiveView?

    @objc public func setModelResource(name: String, fit: RiveFit) {        
        riveViewModel = RiveViewModel(fileName: name, autoPlay: false)
        setFit(fit)
        addRiveView()
    }
    
    @objc public func setModel(file: RiveFile, fit: RiveFit) {
        riveViewModel = RiveViewModel(RiveModel(riveFile: file), autoPlay: false)
        setFit(fit)
        addRiveView()
    }
    
    @objc public func configureModel(artboard: String?, stateMachine: String?, animation: String?) {
        if (riveViewModel != nil) {
            try? riveViewModel?.configureModel(artboardName: artboard, stateMachineName: stateMachine, animationName: animation)
        }
    }
    
    func addRiveView() {
        if (riveView != nil) {
            try? riveView?.setModel(riveViewModel!.riveModel!)
        } else {
            riveView = riveViewModel?.createRiveView()
            
            riveView!.translatesAutoresizingMaskIntoConstraints = false
            view.addSubview(riveView!)
            NSLayoutConstraint.activate([
                riveView!.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
                riveView!.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor),
                riveView!.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor),
                riveView!.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor)
            ])
        }
    }
    
    @objc public func setDelegate(delegate: RiveStateMachineDelegate) {
        riveView?.stateMachineDelegate = delegate
    }
    
    @objc public func setInput(name: String, value: Bool) {
        riveViewModel?.setInput(name, value: value)
    }
    
    @objc public func triggerInput(name: String) {
        riveViewModel?.triggerInput(name)
    }

    @objc public func stop() {
        riveViewModel?.stop()
    }
    
    @objc public func pause() {
        riveViewModel?.pause()
    }

    @objc public func isPlaying() -> Bool {
        return riveViewModel?.isPlaying ?? false
    }
    
    @objc public func play(direction: NSNumber?, loop: String?, name: String?) {
        if (riveViewModel != nil) {
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
            default:
                riveLoop = .autoLoop
            }
            riveViewModel?.play(animationName: name ?? nil, loop: riveLoop ?? .autoLoop, direction: dir ?? .autoDirection);
        }
    }
    
    @objc public func setFit(_ fit: RiveFit) {
        if (riveViewModel != nil) {
            riveViewModel?.fit = fit
        }
    }
}
