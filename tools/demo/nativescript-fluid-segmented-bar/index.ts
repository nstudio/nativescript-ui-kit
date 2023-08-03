import { Color, Page, Screen, ScrollView } from '@nativescript/core';
import { DemoSharedBase } from '../utils';
import { FluidSegmentedBarDidScrollEvent, FluidSegmentedBarIndexChangedEvent, FluidSegmentedBarItem } from '@nstudio/nativescript-fluid-segmented-bar';

export class DemoSharedNativescriptFluidSegmentedBar extends DemoSharedBase {
  page: Page;
  scrollViews: { [key: string]: ScrollView } = {};
  items: Array<FluidSegmentedBarItem> = [
    {
      title: 'Enjoy',
      colors: [new Color('#485ae6'), new Color('#87aeed')],
    },
    {
      title: 'Your',
      colors: [new Color('#87aeed'), new Color('#e53ca9')],
    },
    {
      title: 'Life',
      colors: [new Color('#c2c96a'), new Color('#678d50')],
    },
  ];
  gradientColorSides = {
    left: [new Color('#87aeed')],
    right: [new Color('#c2c96a')],
  };

  selectedIndexChanged(args: FluidSegmentedBarIndexChangedEvent) {
    console.log('selectedIndexChanged:', args.newIndex);
  }
  didScrollOffset(args: FluidSegmentedBarDidScrollEvent) {
    // console.log('didScrollOffset:', args.offset);
    if (global.isIOS) {
      const backgroundScrollView = this.scrollViews['background'].ios as UIScrollView;
      const waterScrollView = this.scrollViews['water'].ios as UIScrollView;
      const roadScrollView = this.scrollViews['road'].ios as UIScrollView;
      const cloudsScrollView = this.scrollViews['clouds-back'].ios as UIScrollView;
      const rocksLeftScrollView = this.scrollViews['rocks-left'].ios as UIScrollView;
      const rocksRightScrollView = this.scrollViews['rocks-right'].ios as UIScrollView;
      const landScrollView = this.scrollViews['land'].ios as UIScrollView;
      const roadSignScrollView = this.scrollViews['road-sign'].ios as UIScrollView;
      const birdsScrollView = this.scrollViews['birds'].ios as UIScrollView;
      const girlBikeScrollView = this.scrollViews['girl-bike'].ios as UIScrollView;
  
      let width = this.page.viewController.view.frame.size.width * 0.1;
      let leftDistance = (backgroundScrollView.contentSize.width - width) * 0.2;
      let rightDistance = (backgroundScrollView.contentSize.width - width) * 0.8;
  
      let scrollOffset = leftDistance + (args.offset / args.maxOffset) * (backgroundScrollView.contentSize.width - rightDistance - leftDistance);
      backgroundScrollView.contentOffset = CGPointMake(scrollOffset, 0);
  
      scrollOffset = (args.offset * 100) / args.maxOffset;
      landScrollView.contentOffset = CGPointMake(scrollOffset, 0);
  
      scrollOffset = (args.offset * 100) / args.maxOffset;
      roadScrollView.contentOffset = CGPointMake(scrollOffset, 0);
  
      scrollOffset = (args.offset * 5) / args.maxOffset;
      waterScrollView.contentOffset = CGPointMake(scrollOffset, 0);
  
      scrollOffset = (args.offset * 20) / args.maxOffset;
      cloudsScrollView.contentOffset = CGPointMake(scrollOffset, 0);
  
      scrollOffset = (args.offset * 100) / args.maxOffset;
      rocksLeftScrollView.contentOffset = CGPointMake(scrollOffset, 0);
  
      scrollOffset = (args.offset * 100) / args.maxOffset;
      rocksRightScrollView.contentOffset = CGPointMake(scrollOffset, 0);
  
      scrollOffset = (args.offset * 109) / args.maxOffset;
      roadSignScrollView.contentOffset = CGPointMake(scrollOffset, 0);
  
      scrollOffset = (args.offset * 130) / args.maxOffset;
      birdsScrollView.contentOffset = CGPointMake(scrollOffset, 0);
      this.scrollViews['birds'].translateY = -args.offset / 2;
  
      scrollOffset = (args.offset * 80) / args.maxOffset;
      girlBikeScrollView.contentOffset = CGPointMake(scrollOffset, 0);
      this.scrollViews['girl-bike'].scaleX = this.scrollViews['girl-bike'].scaleY = 1-((args.offset / args.maxOffset)/30);
    }
  }

  loadedScroll(args) {
    this.scrollViews[args.object.id] = args.object;
  }
}
