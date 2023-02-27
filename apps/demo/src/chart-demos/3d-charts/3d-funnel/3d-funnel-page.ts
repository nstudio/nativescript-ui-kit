import { NavigatedData, Page } from '@nativescript/core/ui/page';
import { fromObject } from '@nativescript/core/data/observable';

let chartView;
const viewModel = fromObject({
  chartOptions: {
    chart: {
      type: 'funnel3d',
      options3d: {
        enabled: true,
        alpha: 10,
        depth: 50,
        viewDistance: 50,
      },
    },
    title: {
      text: 'Highcharts Funnel3D Chart',
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b> ({point.y:,.0f})',
          allowOverlap: true,
          y: 10,
        },
        neckWidth: '30%',
        neckHeight: '25%',
        width: '80%',
        height: '80%',
      },
    },
    series: [
      {
        name: 'Unique users',
        data: [
          ['Website visits', 15654],
          ['Downloads', 4064],
          ['Requested price list', 1987],
          ['Invoice sent', 976],
          ['Finalized', 846],
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
