import { NavigatedData, Page } from '@nativescript/core/ui/page';
import { fromObject } from '@nativescript/core/data/observable';

let chartView;
const viewModel = fromObject({
  chartOptions: {
    chart: {
      type: 'column',
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        viewDistance: 25,
        depth: 40,
      },
    },

    title: {
      text: 'Total fruit consumption, grouped by gender',
    },

    xAxis: {
      categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
      labels: {
        skew3d: true,
        style: {
          fontSize: '16px',
        },
      },
    },

    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: 'Number of fruits',
        skew3d: true,
      },
    },

    tooltip: {
      headerFormat: '<b>{point.key}</b><br>',
      pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}',
    },

    plotOptions: {
      column: {
        stacking: 'normal',
        depth: 40,
      },
    },

    series: [
      {
        name: 'John',
        data: [5, 3, 4, 7, 2],
        stack: 'male',
      },
      {
        name: 'Joe',
        data: [3, 4, 4, 2, 5],
        stack: 'male',
      },
      {
        name: 'Jane',
        data: [2, 5, 6, 2, 1],
        stack: 'female',
      },
      {
        name: 'Janet',
        data: [3, 0, 4, 4, 3],
        stack: 'female',
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
