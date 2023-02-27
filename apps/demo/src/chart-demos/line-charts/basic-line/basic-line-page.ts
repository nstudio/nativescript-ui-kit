import { NavigatedData, Page } from '@nativescript/core/ui/page';
import { fromObject } from '@nativescript/core/data/observable';

let viewModel;
let chartView;

export function onNavigatingTo(args: NavigatedData) {
  viewModel = fromObject({
    loading: true,

    // onAndroid it is required for you to pass a series skeleton if the data
    // will be loaded asynchronously
    chartOptions: {
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      yAxis: {
        title: {
          text: '',
        }
      },
      series: [
        {
          name: 'Installation',
          data: [],
        },
        {
          name: 'Manufacturing',
          data: [],
        },
        {
          name: 'Sales & Distribution',
          data: [],
        },
        {
          name: 'Project Development',
          data: [],
        },
        {
          name: 'Other',
          data: [],
        },
      ],
    },
  });
  const page = <Page>args.object;

  if (args.isBackNavigation) return;

  page.bindingContext = viewModel;

  setTimeout(() => {
    viewModel.set('chartOptions', {
      title: {
        text: 'Solar Employment Growth by Sector, 2010-2016',
      },
  
      subtitle: {
        text: 'Source: thesolarfoundation.com',
      },
  
      yAxis: {
        title: {
          text: 'Number of Employees',
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: 'gray'
          }
        }
      },
  
      xAxis: {
        accessibility: {
          rangeDescription: 'Range: 2010 to 2017',
        },
      },
  
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        enabled: true
      },
      credits: {
        enabled: true
      },
  
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: 2010,
        },
      },
      series: [
        {
          name: 'Installation',
          data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
        },
        {
          name: 'Manufacturing',
          data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
        },
        {
          name: 'Sales & Distribution',
          data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
        },
        {
          name: 'Project Development',
          data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227],
        },
        {
          name: 'Other',
          data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
        },
      ],
    });
    if (chartView) {
      chartView.updateOptions(viewModel.get('chartOptions'));
    }
    viewModel.set('loading', false);
  }, 2000);
}

export function chartViewLoaded(args) {
  chartView = args.object;
  chartView.setOptions(viewModel.get('chartOptions'));
}

export function goBack(args) {
  args.object.page.frame.goBack();
}

export function changeData(args) {
  const cOpts = viewModel.get('chartOptions');
  if (cOpts.title.text === 'Title Changed') {
    cOpts.title.text = "Title Changed Again into a very long sentence making it span across multiple lines";
    cOpts.subtitle.text = "Subtitle Changed Again";
    cOpts.series = [
      {
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
      },
      {
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
      },
      {
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
      },
      {
        name: 'Project Development',
        data: [ 7988, 12169, 15112, 22452, 34400, 34227,null, null,],
      },
      {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
      },
    ];
  } else {
    cOpts.title.text = "Title Changed";
    cOpts.subtitle.text = "Subtitle Changed";
    cOpts.series = [
      {
        name: 'Project Development',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227].reverse(),
      },
      {
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175].reverse(),
      },
      {
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
      },
      {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
      },
    ];
  }
  
  viewModel.set('chartOptions', Object.assign({}, cOpts));
  chartView.updateOptions(viewModel.chartOptions);
}
