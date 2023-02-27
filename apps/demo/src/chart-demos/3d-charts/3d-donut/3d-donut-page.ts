import { NavigatedData, Page } from '@nativescript/core/ui/page';
import { fromObject } from '@nativescript/core/data/observable';

let chartView;
const viewModel = fromObject({
  chartOptions: {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45,
      },
    },
    title: {
      text: "Contents of Highsoft's weekly fruit delivery",
    },
    subtitle: {
      text: '3D donut in Highcharts',
    },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45,
      },
    },
    series: [
      {
        name: 'Delivered amount',
        data: [
          ['Bananas', 8],
          ['Kiwi', 3],
          ['Mixed nuts', 1],
          ['Oranges', 6],
          ['Apples', 8],
          ['Pears', 4],
          ['Clementines', 4],
          ['Reddish (bag)', 1],
          ['Grapes (bunch)', 1],
        ],
      },
    ],
  },
});

export function chartViewLoaded(args) {
  chartView = args.object;
  chartView.setOptions(viewModel.get('chartOptions'));
}

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object;

  if (args.isBackNavigation) return;

  page.bindingContext = viewModel;
}

export function goBack(args) {
  args.object.page.frame.goBack();
}
