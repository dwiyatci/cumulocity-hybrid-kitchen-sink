import { Injectable } from '@angular/core';
import { IManagedObject, InventoryService, IResult } from '@c8y/client';
import { AlertService } from '@c8y/ngx-components';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, first, map, switchMap, take, tap, toArray } from 'rxjs/operators';

import { UpgradedDataPointService } from '../shared/ajs/data-point.service';
import { UpgradedDeviceListColumnsService } from '../shared/ajs/device-list-columns.service';
// tslint:disable-next-line:ter-max-len
import { UpgradedFilteringSortingInventoryQueriesService } from '../shared/ajs/filtering-sorting-inventories-query.service';
import { SimpleUpgradedService } from '../shared/ajs/upgraded.model';
import { UpgradedUserPreferencesService } from '../shared/ajs/user-preferences.service';
import _ from '../utils/lodash-treeshaking-helper';

@Injectable({
  providedIn: 'root'
})
export class SinkService {
  private c8yDataPoint: SimpleUpgradedService;
  private c8yDeviceListColumns: SimpleUpgradedService;
  private c8yUserPreferences: SimpleUpgradedService;
  private c8yFilteringSortingInventoryQueries: SimpleUpgradedService;

  constructor(
    private inventoryService: InventoryService,
    c8yDataPoint: UpgradedDataPointService,
    c8yDeviceListColumns: UpgradedDeviceListColumnsService,
    c8yUserPreferences: UpgradedUserPreferencesService,
    c8yFilteringSortingInventoryQueries: UpgradedFilteringSortingInventoryQueriesService,
    private alertService: AlertService
  ) {
    this.c8yDataPoint = c8yDataPoint;
    this.c8yDeviceListColumns = c8yDeviceListColumns;
    this.c8yUserPreferences = c8yUserPreferences;
    this.c8yFilteringSortingInventoryQueries = c8yFilteringSortingInventoryQueries;
  }

  getFirstThreeDatapointsForTheFirstDevice(): Observable<object[]> {
    return this.getTheFirstDevice().pipe(switchMap(device => this.getFirstThreeDatapoints(device)));
  }

  getFirstThreeDatapoints(device): Observable<object[]> {
    return this.getPossibleDatapoints(device).pipe(
      // return this.getPossibleDatapoints('145075').pipe(
      switchMap(datapoints => from(datapoints)),
      take(3),
      toArray()
    );
  }

  getPossibleDatapoints(device): Observable<object[]> {
    return this.toObservableData(this.c8yDataPoint.listPossible(device));
  }

  getTheFirstDevice(): Observable<IManagedObject> {
    return this.toObservableData(
      this.inventoryService.list({ fragmentType: 'c8y_IsDevice', pageSize: 2000 })
    ).pipe(
      switchMap(devices => from(devices)),
      first()
    );
  }

  getDeviceColumns(): Observable<object[]> {
    return of(this.c8yDeviceListColumns.getParentDeviceColumns());
  }

  getDeviceColumnsConfig(): Observable<object> {
    return this.toObservableData(this.c8yUserPreferences.get('all-devices-columns-config'));
  }

  getDevices({ columns, columnsConfig }): Observable<IManagedObject[]> {
    const query = this.c8yFilteringSortingInventoryQueries.getQuery(columns, columnsConfig);

    return this.toObservableData(
      this.inventoryService.listQueryDevices(query, { withGroups: true, pageSize: 100 })
    );
  }

  private toObservableData(resultPromise: Promise<IResult<any>>, options?): Observable<any> {
    const silentError = _.get(options, 'silentError');

    return from(resultPromise).pipe(
      map(res => res.data || res),
      catchError(errorRes => {
        const { data } = errorRes;

        if (!silentError) {
          // this.alertService.add({
          //   type: 'danger',
          //   text: data.message,
          //   detailedData: data
          // });
        }

        return throwError({ ...errorRes, c8y_Error: {} });
      })
    );
  }
}
