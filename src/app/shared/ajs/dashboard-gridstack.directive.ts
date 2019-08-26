import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
  selector: 'c8y-dashboard-gridstack'
})
export class DashboardGridstackDirective extends UpgradeComponent {
  @Input() id: string;

  /**
   * Cr*ap, we're really, really screwed here.
   * @see https://stackoverflow.com/questions/50378510/angular-upgradecomponent-with-name-binding
   */
  // @Input() name: string;
  @Input() dashboardName: string;

  @Input() setPageTitle: boolean;
  @Input() predefinedReadOnly: boolean;
  @Input() defaultChildren: object[];
  @Input('isFrozen') isFrozenDirective: boolean;

  @Input() useContext: () => boolean;

  @Input() setGlobal: boolean;

  constructor(elementRef: ElementRef, injector: Injector) {
    super('c8yDashboardGridstack', elementRef, injector);
  }
}
