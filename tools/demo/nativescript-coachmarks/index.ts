import { DemoSharedBase } from '../utils';
// import { ICoachMarkOptions, CoachMark, CoachMarks } from '@nstudio/nativescript-coachmarks';
import { Color } from '@nativescript/core';

export class DemoSharedNativescriptCoachmarks extends DemoSharedBase {
  private _coachMarks;
  private _menu;
  private _first;
  private _second;
  private _third;

  constructor(first: any, second: any, third: any) {
    super();
    this._first = first;
    this._second = second;
    this._third = third;
  }

  loadedMenuItem(args) {
    this._menu = args.object.ios;
    

    // CoachMarks.DEBUG = true; // view logs of coach marks setup
  }

  public startWithOptions() {
    // configure instance to wire up events
    // this._coachMarks = new CoachMarks();
    // required: ensure your desire to setup events
    this._coachMarks.initEvents();
    // wire them up
    this.setupEvents();

    // let options: ICoachMarkOptions = {
    //   continueLabelText: 'Tap Screen for Next Tip',
    //   skipButtonText: 'Exit',
    //   lblSpacing: 20,
    //   maskColor: global.isIOS ? UIColor.colorWithRedGreenBlueAlpha(0.30, 0.46, 0.89, .9) : null
    // };
    // CoachMarks.start(this.getMarks(), options, this._coachMarks);    
  }

  private getMarks() {
   

    // if (global.isIOS) {
    //   let menuPosition = this._menu.frame;
    //   let firstPosition = this._first.ios.frame;
    //   let secondPosition = this._second.ios.frame;
    //   let thirdPosition = this._third.ios.frame;
    //   return [
    //     new CoachMark({
    //       position: CGRectMake(
    //         menuPosition.origin.x +164, 
    //         menuPosition.origin.y + 58, 
    //         menuPosition.size.width + 10, 
    //         menuPosition.size.height
    //       ),
    //       caption: '1. Main menu.',
    //       shape: CoachMark.SHAPES.DEFAULT,
    //       labelPosition: CoachMark.LABEL_POSITIONS.RIGHT_BOTTOM,
    //       labelAlignment: CoachMark.LABEL_ALIGNMENTS.CENTER,
    //       showArrow: true
    //     }),
    //     new CoachMark({
    //       position: CGRectMake(
    //         firstPosition.origin.x, 
    //         firstPosition.origin.y, 
    //         firstPosition.size.width, 
    //         firstPosition.size.height
    //       ),
    //       caption: '2. View customer listings.',
    //       shape: CoachMark.SHAPES.DEFAULT,
    //       labelPosition: CoachMark.LABEL_POSITIONS.BOTTOM,
    //       labelAlignment: CoachMark.LABEL_ALIGNMENTS.CENTER,
    //       showArrow: true
    //     }),
    //     new CoachMark({
    //       position: CGRectMake(
    //         thirdPosition.origin.x, 
    //         thirdPosition.origin.y, 
    //         thirdPosition.size.width, 
    //         thirdPosition.size.height
    //       ),
    //       caption: '3. View account settings.',
    //       shape: CoachMark.SHAPES.DEFAULT,
    //       labelPosition: CoachMark.LABEL_POSITIONS.TOP,
    //       labelAlignment: CoachMark.LABEL_ALIGNMENTS.CENTER,
    //       showArrow: true
    //     }),
    //     new CoachMark({
    //       position: CGRectMake(
    //         secondPosition.origin.x - 5, 
    //         secondPosition.origin.y - 5, 
    //         secondPosition.size.width + 10, 
    //         secondPosition.size.height + 10
    //       ),
    //       caption: '4. Just a circular shape.',
    //       shape: CoachMark.SHAPES.CIRCLE,
    //       labelPosition: CoachMark.LABEL_POSITIONS.BOTTOM,
    //       labelAlignment: CoachMark.LABEL_ALIGNMENTS.CENTER
    //     })
    //   ];
    // } else {
    //   return [
    //     new CoachMark({
    //       view: this._first,
    //       caption: '1. View customer listings.',
    //     }),
    //     new CoachMark({
    //       view: this._second,
    //       caption: '2. View account settings.',
    //     }),
    //     new CoachMark({
    //       view: this._third,
    //       caption: '3. Just a circular shape.',
    //     })
    //   ];
    // }
  }

  private setupEvents() {
    this._coachMarks.events.on('navigate', (eventData) => {
      console.log(`navigated to index in demo:`);
      console.log(eventData.data.index);
      // you can customize buttons and bar at each step
      this.customizeStyle(eventData.data);
    });
    this._coachMarks.events.on('click', (eventData) => {
      console.log(`clicked at index in demo:`);
      console.log(eventData.data);
    });
    this._coachMarks.events.on('cleanup', (eventData) => {
      console.log(`ready to cleanup in demo.`);
      this._coachMarks = undefined;
    });
  }

  private customizeStyle(data: any) {
    // Note: just experimentation for settings
    // console.log(data.instance.arrowImage.image);
    // could customize the arrowImage at each step 
    // data.instance.arrowImage.image = UIImage.imageNamed('someimage.png');
    // console.log(data.instance.btnSkipCoach);
    // console.log(data.instance.lblCaption);
    // console.log(data.instance.lblContinue);

    if (data.instance.lblContinue) {
      // only available when 'ready' is called
      // it disappears after the first tap and advance to next step
      let labelContinue = data.instance.lblContinue.frame;
      data.instance.lblContinue.frame = CGRectMake(labelContinue.origin.x, labelContinue.origin.y - 60, labelContinue.size.width, labelContinue.size.height + 60);
      data.instance.lblContinue.backgroundColor = new Color('#FFE108').ios; 
      
      // custom caption color
      data.instance.lblCaption.textColor = new Color('#FFE108').ios;

      // customize skip button
      let btnSkip = data.instance.btnSkipCoach.frame;
      data.instance.btnSkipCoach.frame = CGRectMake(btnSkip.origin.x, btnSkip.origin.y - 60, btnSkip.size.width, btnSkip.size.height + 60);
    }    
  }
}