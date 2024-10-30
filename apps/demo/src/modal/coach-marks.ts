import { fromObject, Page, Button, ShownModallyData, EventData, Color } from '@nativescript/core';
import { CoachMark, CoachMarks, ICoachMarkOptions } from '@nstudio/nativescript-coachmarks';

export function onShownModally(args: ShownModallyData) {
  const page = args.object as Page;
  const context: any = fromObject({
    ...args.context,
    _coachMarks: undefined,
    onClose(args: EventData) {
      const button = args.object as Button;
      button.closeModal({
        name: context['name'],
      });
    },
    startWithOptions() {
      // configure instance to wire up events
      this._coachMarks = new CoachMarks();
      // required: ensure your desire to setup events
      this._coachMarks.initEvents();
      // wire them up
      this.setupEvents();

      let options: ICoachMarkOptions = {
        continueLabelText: 'Tap Screen for Next Tip',
        continueLabelBackgroundColor: '#FFE108',
        // continueLabelOffset: { y: -60 },
        skipButtonText: 'Exit',
        //  skipButtonOffset: { y: -60 },
        lblSpacing: 20,
        lblTextColor: '#FFE108',
        maskColor: global.isIOS ? UIColor.colorWithRedGreenBlueAlpha(0.3, 0.46, 0.89, 0.9) : new Color(0.9 * 255, 0.3 * 255, 0.46 * 255, 0.89 * 255),
      };
      CoachMarks.start(this.getMarks(), options, this._coachMarks);
    },
    getMarks() {
      const input = page.getViewById('input');
      const show = page.getViewById('showView');
      const close = page.getViewById('closeView');
      if (global.isIOS) {
        /*
          let menuPosition = this._menu.frame;
          let firstPosition = this._first.ios.frame;
          let secondPosition = this._second.ios.frame;
          let thirdPosition = this._third.ios.frame;
          return [
            new CoachMark({
              position: CGRectMake(menuPosition.origin.x + 164, menuPosition.origin.y + 58, menuPosition.size.width + 10, menuPosition.size.height),
              caption: '1. Main menu.',
              shape: CoachMark.SHAPES.DEFAULT,
              labelPosition: CoachMark.LABEL_POSITIONS.RIGHT_BOTTOM,
              labelAlignment: CoachMark.LABEL_ALIGNMENTS.CENTER,
              showArrow: true,
            }),
            new CoachMark({
              position: CGRectMake(firstPosition.origin.x, firstPosition.origin.y, firstPosition.size.width, firstPosition.size.height),
              caption: '2. View customer listings.',
              shape: CoachMark.SHAPES.DEFAULT,
              labelPosition: CoachMark.LABEL_POSITIONS.BOTTOM,
              labelAlignment: CoachMark.LABEL_ALIGNMENTS.CENTER,
              showArrow: true,
            }),
            new CoachMark({
              position: CGRectMake(thirdPosition.origin.x, thirdPosition.origin.y, thirdPosition.size.width, thirdPosition.size.height),
              caption: '3. View account settings.',
              shape: CoachMark.SHAPES.DEFAULT,
              labelPosition: CoachMark.LABEL_POSITIONS.TOP,
              labelAlignment: CoachMark.LABEL_ALIGNMENTS.CENTER,
              showArrow: true,
            }),
            new CoachMark({
              position: CGRectMake(secondPosition.origin.x - 5, secondPosition.origin.y - 5, secondPosition.size.width + 10, secondPosition.size.height + 10),
              caption: '4. Just a circular shape.',
              shape: CoachMark.SHAPES.CIRCLE,
              labelPosition: CoachMark.LABEL_POSITIONS.BOTTOM,
              labelAlignment: CoachMark.LABEL_ALIGNMENTS.CENTER,
            }),
          ];
          */
      } else {
        return [
          new CoachMark({
            view: input,
            shape: CoachMark.SHAPES.DEFAULT,
            caption: 'Modal Example 1',
            labelPosition: CoachMark.LABEL_POSITIONS.RIGHT_BOTTOM,
            labelAlignment: CoachMark.LABEL_ALIGNMENTS.CENTER,
            // showArrow: true,
          }),
          new CoachMark({
            view: show,
            shape: CoachMark.SHAPES.CIRCLE,
            caption: 'Modal Example 2',
            labelPosition: CoachMark.LABEL_POSITIONS.RIGHT_BOTTOM,
            labelAlignment: CoachMark.LABEL_ALIGNMENTS.CENTER,
            // showArrow: true,
          }),
          new CoachMark({
            view: close,
            shape: CoachMark.SHAPES.SQUARE,
            caption: 'Modal Example 3',
            labelPosition: CoachMark.LABEL_POSITIONS.RIGHT_BOTTOM,
            labelAlignment: CoachMark.LABEL_ALIGNMENTS.CENTER,
            // showArrow: true,
          }),
        ];
      }
    },
    setupEvents() {
      this._coachMarks.events.on('navigate', (eventData) => {
        console.log(`navigated to index in demo:`);
        console.log(eventData.data.index);
        // you can customize buttons and bar at each step
        // this.customizeStyle(eventData.data);
      });
      this._coachMarks.events.on('click', (eventData) => {
        console.log(`clicked at index in demo:`);
        console.log(eventData.data);
      });
      this._coachMarks.events.on('cleanup', (eventData) => {
        console.log(`ready to cleanup in demo.`);
        this._coachMarks = undefined;
      });
    },
  });
  page.bindingContext = context;
}
