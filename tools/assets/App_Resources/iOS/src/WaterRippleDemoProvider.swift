import SwiftUI

@objc
class WaterRippleDemoProvider: UIViewController, SwiftUIProvider {
    private var swiftUIView = WaterRippleDemo()
  // MARK: INIT

  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
  }

  required public init() {
    super.init(nibName: nil, bundle: nil)
  }

  public override func viewDidLoad() {
    super.viewDidLoad()
    setupSwiftUIView(content: swiftUIView)
    registerObservers()
  }

  private func registerObservers() {
       
  }

  /// Receive data from NativeScript
  func updateData(data: NSDictionary) {
      data.forEach { (k,v) in swiftUIView.data.props[k] = v }
  }

  /// Allow sending of data to NativeScript
  var onEvent: ((NSDictionary) -> ())?
}
