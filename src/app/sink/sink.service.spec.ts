import { TestBed } from '@angular/core/testing';
import { InventoryService } from '@c8y/client';
import { CoreModule } from '@c8y/ngx-components';
import { TranslateService } from '@ngx-translate/core';
import _ from 'lodash-es';
import { of } from 'rxjs';

import { SinkService } from './sink.service';

describe('SinkModule: SinkService', () => {
  it('should get first three data points for a device', done => {
    const { sinkService } = setup();

    // given
    const device = { id: '42', name: 'device a' };

    const possibleDatapoints = [
      { _id: '4242', fragment: 'c8y_Temperature', series: 'T0' },
      { _id: '4243', fragment: 'c8y_Temperature', series: 'T1' },
      { _id: '4244', fragment: 'c8y_Temperature', series: 'T2' },
      { _id: '4245', fragment: 'c8y_Temperature', series: 'T3' }
    ];

    // when
    sinkService.getPossibleDatapoints = jest.fn(() => of(possibleDatapoints));

    sinkService.getFirstThreeDatapoints(device).subscribe(datapoints => {
      // then
      expect(datapoints).toEqual([
        { _id: '4242', fragment: 'c8y_Temperature', series: 'T0' },
        { _id: '4243', fragment: 'c8y_Temperature', series: 'T1' },
        { _id: '4244', fragment: 'c8y_Temperature', series: 'T2' }
      ]);

      expect(sinkService.getPossibleDatapoints).toHaveBeenCalledWith({
        id: '42',
        name: 'device a'
      });

      done();
    });
  });

  it('should get possible data points for a device', done => {
    const { sinkService, c8yDataPoint } = setup();

    // given
    const device = { id: '42', name: 'device a' };

    const possibleDatapoints = [
      { _id: '4242', fragment: 'c8y_Temperature', series: 'T0' },
      { _id: '4243', fragment: 'c8y_Temperature', series: 'T1' }
    ];

    // when
    c8yDataPoint.listPossible = jest.fn(() => Promise.resolve(possibleDatapoints));

    sinkService.getPossibleDatapoints(device).subscribe(datapoints => {
      // then
      expect(datapoints).toEqual([
        { _id: '4242', fragment: 'c8y_Temperature', series: 'T0' },
        { _id: '4243', fragment: 'c8y_Temperature', series: 'T1' }
      ]);

      expect(c8yDataPoint.listPossible).toHaveBeenCalledWith({ id: '42', name: 'device a' });

      done();
    });
  });

  it('should get the first device', done => {
    const { sinkService, inventoryService } = setup();

    // given
    const devices = [
      { id: '42', name: 'device a' },
      { id: '43', name: 'device b' },
      { id: '44', name: 'device c' }
    ];

    // when
    inventoryService.list = jest.fn(() => Promise.resolve(devices));

    sinkService.getTheFirstDevice().subscribe(device => {
      // then
      expect(device).toEqual({ id: '42', name: 'device a' });

      expect(inventoryService.list).toHaveBeenCalledWith({
        fragmentType: 'c8y_IsDevice',
        pageSize: 2000
      });

      done();
    });
  });

  it('should get device columns', done => {
    const { sinkService, c8yDeviceListColumns } = setup();

    // given
    const deviceColumns = [{ name: 'column a' }, { name: 'column b' }];

    // when
    c8yDeviceListColumns.getParentDeviceColumns = jest.fn(() => deviceColumns);

    sinkService.getDeviceColumns().subscribe(columns => {
      // then
      expect(columns).toEqual([{ name: 'column a' }, { name: 'column b' }]);

      expect(c8yDeviceListColumns.getParentDeviceColumns).toHaveBeenCalled();

      done();
    });
  });

  it('should get device columns config', done => {
    const { sinkService, c8yUserPreferences } = setup();

    // given
    const deviceColumnsConfig = {};

    // when
    c8yUserPreferences.get = jest.fn(() => Promise.resolve(deviceColumnsConfig));

    sinkService.getDeviceColumnsConfig().subscribe(config => {
      // then
      expect(config).toEqual(deviceColumnsConfig);

      expect(c8yUserPreferences.get).toHaveBeenCalledWith('all-devices-columns-config');

      done();
    });
  });

  it('should get devices for specific columns and columns config', done => {
    const { sinkService, c8yFilteringSortingInventoryQueries, inventoryService } = setup();

    // given
    const columns = [];
    const columnsConfig = {};

    const query = {
      __filter: {
        testFilter: {
          __in: ['a', 'b']
        }
      },
      __orderby: [
        {
          test: 1
        }
      ]
    };

    const fakeDevices = [{ id: '42', name: 'device x' }, { id: '43', name: 'device y' }];

    // when
    c8yFilteringSortingInventoryQueries.getQuery = jest.fn(() => query);
    inventoryService.listQueryDevices = jest.fn(() => Promise.resolve(fakeDevices));

    sinkService.getDevices({ columns, columnsConfig }).subscribe(devices => {
      // then
      expect(devices).toEqual(fakeDevices);

      expect(c8yFilteringSortingInventoryQueries.getQuery).toHaveBeenCalledWith(
        columns,
        columnsConfig
      );
      expect(inventoryService.listQueryDevices).toHaveBeenCalledWith(query, {
        withGroups: true,
        pageSize: 100
      });

      done();
    });
  });

  function setup(): any {
    const setupVariables = {};

    TestBed.configureTestingModule({
      imports: [CoreModule.forRoot()],
      providers: [
        SinkService,
        { provide: TranslateService, useValue: { instant: _.identity } },
        /**
         *
         * @see https://stackoverflow.com/a/57225503/2013891
         */
        {
          provide: '$injector',
          useValue: {
            get(serviceName?: string) {
              // console.log('looking for serviceName:', serviceName);
              return {}; // this will break things differently
            }
          }
        }
      ]
    });

    const sinkService = TestBed.get(SinkService);

    _.assign(setupVariables, {
      sinkService,
      inventoryService: TestBed.get(InventoryService),
      ..._.pick(sinkService, [
        'c8yDataPoint',
        'c8yDeviceListColumns',
        'c8yUserPreferences',
        'c8yFilteringSortingInventoryQueries',
        'alertService'
      ])
    });

    return setupVariables;
  }
});
