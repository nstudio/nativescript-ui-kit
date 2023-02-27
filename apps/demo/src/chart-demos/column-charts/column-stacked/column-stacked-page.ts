import { NavigatedData, Page } from '@nativescript/core/ui/page';
import { fromObject } from '@nativescript/core/data/observable';

let chartView;
const viewModel = fromObject({
  chartOptions: {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Stacked column chart',
    },
    xAxis: {
      categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total fruit consumption',
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: 'gray',
        },
      },
    },
    legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor: 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false,
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        // TODO: add support for dataLabels
        // dataLabels: {
        //   enabled: true,
        // },
      },
    },
    series: [
      {
        name: 'John',
        data: [5, 3, 4, 7, 2],
      },
      {
        name: 'Jane',
        data: [2, 2, 3, 2, 1],
      },
      {
        name: 'Joe',
        data: [3, 4, 4, 2, 5],
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
