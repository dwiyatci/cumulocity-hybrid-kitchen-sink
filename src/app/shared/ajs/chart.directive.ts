import { Directive, ElementRef, EventEmitter, Injector, Input, Output } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
  selector: 'c8y-chart'
})
export class ChartDirective extends UpgradeComponent {
  @Input() dateFrom: string;
  @Input() dateTo: string;
  @Input() aggregation: Aggregation;
  @Input() realtime: boolean;
  @Input() datapoints: object[];
  @Input() datapointsInitialDisplayLimit: number;

  @Input() onData: any;
  // @Output() onDataChange: EventEmitter<(measurement: object) => void>;

  @Output() onUpdateDates: EventEmitter<{ $dateFrom: Date; $dateTo: Date }>;
  @Output() onUpdateDisplayedDates: EventEmitter<{ $dateFrom: Date; $dateTo: Date }>;
  @Output() onBoxChanged: EventEmitter<{ box: object }>;

  @Input() showTime: () => boolean;
  @Input() selectable: () => boolean;

  @Input() selected: object;
  @Output() selectedChange: EventEmitter<object>;

  @Output() onDataChange: EventEmitter<{ chart: object }>;
  @Input() appendDatepickerToBody: boolean;

  constructor(elementRef: ElementRef, injector: Injector) {
    super('c8yChart', elementRef, injector);
  }
}

export enum Aggregation {
  NONE = 'NONE',
  MINUTELY = 'MINUTELY',
  HOURLY = 'HOURLY',
  DAILY = 'DAILY'
}
