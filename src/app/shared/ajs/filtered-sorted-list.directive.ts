import { Directive, ElementRef, EventEmitter, Injector, Input, Output } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
  selector: 'c8y-filtered-sorted-list'
})
export class FilteredSortedListDirective extends UpgradeComponent {
  @Input() columns: () => object[];
  @Input() columnsConfig: () => object;

  @Output() onColumnsConfigChanged: EventEmitter<{ columnsConfig: object }>;

  @Input() disableColumnsConfig: () => boolean;
  @Input() items: () => object[];

  @Output() onItemClick: EventEmitter<{ item: object }>;

  @Input() noItemsMessage: () => string;
  @Input() showLoadMore: () => boolean;

  @Output() onLoadMore: EventEmitter<void>;
  @Input() emptyListLabel: string;

  constructor(elementRef: ElementRef, injector: Injector) {
    super('c8yFilteredSortedList', elementRef, injector);
  }
}
