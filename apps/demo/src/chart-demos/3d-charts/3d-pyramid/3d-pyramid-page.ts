import { NavigatedData, Page } from '@nativescript/core/ui/page';
import { fromObject } from '@nativescript/core/data/observable';

let chartView;
const viewModel = fromObject({
  chartOptions: {
    chart: {
      type: 'pyramid3d',
      options3d: {
        enabled: true,
        alpha: 10,
        depth: 50,
        viewDistance: 50,
      },
    },
    title: {
      text: 'Highcharts Pyramid3D Chart',
    },
    plotOptions: {
      pyramid: {
        // TODO: support data labels
        // dataLabels: {
        //   enabled: true,
        //   format: '<b>{point.name}</b> ({point.y:,.0f})',
        //   allowOverlap: true,
        //   x: 10,
        //   y: -5,
        // },
        width: '60%',
        height: '80%',
        center: ['50%', '45%'],
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
