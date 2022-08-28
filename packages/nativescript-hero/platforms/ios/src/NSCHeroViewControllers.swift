import UIKit
import Stevia
import Hero

@objc public class ViewController: UIViewController {
    
    lazy var greenView: UIView = {
        let v = UIView()
        v.backgroundColor = .green
        return v
    }()
    
    @objc public func setupViews() {
        
    }

    public override func viewDidLoad() {
         super.viewDidLoad()
         print("ViewController viewDidLoad")
        
//        greenView.hero.id = "greenView"
        greenView._heroID = "greenView"
        
//        greenView.addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(openSecondVC)))
        
        view.backgroundColor = .white
        
        view.subviews(
            greenView
        )
        
        greenView.height(50).width(50).centerInContainer()
        
    }
    
    @objc public func openSecondVC() {
        print("CONSOLE LOG: swift openSecondVC!")
        let sc = SecondViewController()
        let nc = UINavigationController(rootViewController: sc)
//        nc.hero.isEnabled = true
        nc._heroEnabled = true
        sc.setupViews()

        self.navigationController?.pushViewController(sc, animated: true)
        
    }
    
}

@objc public class SecondViewController: UIViewController {
    
    @objc public lazy var greenView: UIView = {
        let v = UIView()
        v.backgroundColor = .green
        return v
    }()

    @objc public func setupViews() {
//    public override func viewDidLoad() {
//        super.viewDidLoad()
        print("SecondViewController viewDidLoad")
//        self.hero.isEnabled = true
        self._heroEnabled = true
//        greenView.hero.id = "greenView"
        greenView._heroID = "greenView"
        
        view.backgroundColor = .blue
        
        greenView.addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(popVC)))

        view.subviews(
            greenView
        )
        
        
        greenView.height(150).width(150).centerHorizontally().centerVertically(offset: 300)
        
    }
    
    @objc public func popVC() {
        self.navigationController?.popViewController(animated: true)
    }
}
