
declare class SecondViewController extends UIViewController {

	static alloc(): SecondViewController; // inherited from NSObject

	static new(): SecondViewController; // inherited from NSObject

	greenView: UIView;

	popVC(): void;
}

declare class ViewController extends UIViewController {

	static alloc(): ViewController; // inherited from NSObject

	static new(): ViewController; // inherited from NSObject

	openSecondVC(): void;
}
