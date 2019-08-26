import { Component, OnInit } from '@angular/core';

import { forkJoin } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Aggregation } from '../shared/ajs/chart.directive';
import { SinkService } from './sink.service';

@Component({
  selector: 'sink',
  templateUrl: './sink.component.html'
  // template: `
  //   <c8y-action-bar-item [placement]="'right'">
  //     <a class="btn btn-link" (click)="saveTheEarth()">
  //       <i c8yIcon="ravelry"></i>&nbsp; {{ 'Save the Earth' | translate }}
  //     </a>
  //   </c8y-action-bar-item>
  //   <div translate>hello, world</div>
  //   <marquee>the sink!!</marquee>
  //   <foo [(bar)]="bar"></foo>
  //   <button (click)="printBar()">print bar</button>
  // `
})
export class SinkComponent implements OnInit {
  // bar = { baz: 42 };
  private readonly EXAMPLE_WIDGETS = [
    {
      name: 'Recent Alarms', // each widget is uniquely identified by the `name` prop
      title: 'Recent alarms',
      _width: 4,
      _height: 4, // we play by 12-column grid
      config: {} // widget config goes here
    },
    {
      name: 'Map',
      title: 'Device locations',
      _width: 8,
      _height: 4,
      config: {}
    },
    {
      name: 'Html widget',
      title: 'HTML widget',
      _width: 12,
      _height: 4,
      config: {
        html: '<div><marquee><h3>sphinx of black quartz, judge my vow.</h3></marquee></div>',
        unsafe: true
      }
    }
    // any other built-in or custom widgets...
  ];

  private readonly EXAMPLE_DATAPOINTS = [
    {
      __active: true,
      __target: {
        id: '145075',
        name: 'temperature simulator #1'
      },
      color: '#3366cc',
      fragment: 'c8y_Temperature',
      label: 'T',
      lineType: 'line', // possible values: 'line', 'points', 'linePoints', 'bars'
      min: 0,
      max: 100,
      renderType: 'max', // other possible values: 'min', 'max', 'area'
      series: 'T',
      unit: '°C'
    },
    {
      __active: true,
      __target: {
        id: '145075',
        name: 'temperature simulator #1'
      },
      color: '#dc3912',
      fragment: 'c8y_Temperature',
      label: 'T1',
      lineType: 'line',
      min: 0,
      max: 100,
      renderType: 'max',
      series: 'T1',
      unit: '°C'
    },
    {
      __active: true,
      __target: {
        id: '145075',
        name: 'temperature simulator #1'
      },
      color: '#ff9900',
      fragment: 'c8y_Temperature',
      label: 'T2',
      lineType: 'linePoints',
      min: 0,
      max: 100,
      renderType: 'max',
      series: 'T2',
      unit: '°C'
    },
    {
      __active: true,
      __target: {
        id: '145075',
        name: 'temperature simulator #1'
      },
      color: '#109618',
      fragment: 'c8y_Temperature',
      label: 'T3',
      lineType: 'bars',
      min: 0,
      max: 25,
      renderType: 'min',
      series: 'T3',
      unit: '°C'
    }
  ];

  chart = {
    datapoints: this.EXAMPLE_DATAPOINTS,
    dateFrom: (<any>window).moment('2018-06-09').format(),
    dateTo: (<any>window).moment('2018-06-10').format(),
    showTime: () => false,
    selectable: () => true,
    aggregation: Aggregation.HOURLY, // possible values are: NONE, MINUTELY, HOURLY, DAILY
    onUpdateDates(dateFrom, dateTo) {
      console.log(dateFrom, dateTo);
    },
    onDataChange(chart) {
      console.dir(chart);
    }
  };

  dashboard = {
    EXAMPLE_WIDGETS: this.EXAMPLE_WIDGETS,
    useContext: () => true
  };

  list = {
    columns: () => [],
    columnsConfig: () => ({}),
    disableColumnsConfig: () => false,
    onColumnsConfigChanged(columnsConfig) {
      console.dir(columnsConfig);
    },
    items: () => [],
    onItemClick(item) {
      console.dir(item);
    },
    noItemsMessage: () => 'No devices to display.',
    showLoadMore: () => true,
    onLoadMore() {
      console.log('// load more items here');
    }
  };

  constructor(private sinkService: SinkService) {}

  ngOnInit() {
    const deviceId = '145075';

    forkJoin([
      this.sinkService.getTheFirstDevice(),
      this.sinkService.getFirstThreeDatapoints(deviceId)
    ])
      .pipe(
        tap(console.dir),
        switchMap(() =>
          forkJoin([this.sinkService.getDeviceColumns(), this.sinkService.getDeviceColumnsConfig()])
        ),
        tap(console.dir),
        tap(([columns, columnsConfig]) =>
          Object.assign(this.list, { columns: () => columns, columnsConfig: () => columnsConfig })
        ),
        switchMap(([columns, columnsConfig]) =>
          this.sinkService.getDevices({ columns, columnsConfig })
        ),
        tap(console.dir),
        map(devices =>
          devices.map(device => ({
            ...device,
            properName: device.name || device.id || '<no name>'
          }))
        )
      )
      .subscribe(devicesWithProperName => {
        this.list.items = () => devicesWithProperName;
      });
  }

  saveTheEarth() {
    alert('we love the earth, it is our planet. we love the earth, it is our home.');
  }

  // printBar() {
  //   console.dir(this.bar);
  // }
}
