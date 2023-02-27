import { NavigatedData, Page } from '@nativescript/core/ui/page';
import { fromObject } from '@nativescript/core/data/observable';

let chartView;
const viewModel = fromObject({
  chartOptions: {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Historic World Population by Region',
    },
    subtitle: {
      text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>',
    },
    xAxis: {
      categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Population (millions)',
        align: 'high',
      },
      labels: {
        overflow: 'justify',
      },
    },
    tooltip: {
      valueSuffix: ' millions',
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'Year 1800',
        data: [107, 31, 635, 203, 2],
      },
      {
        name: 'Year 1900',
        data: [133, 156, 947, 408, 6],
      },
      {
        name: 'Year 2000',
        data: [814, 841, 3714, 727, 31],
      },
      {
        name: 'Year 2016',
        data: [1216, 1001, 4436, 738, 40],
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
