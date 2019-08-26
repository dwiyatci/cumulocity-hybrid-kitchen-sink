import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule as C8YCoreModule } from '@c8y/ngx-components';

import { ChartDirective } from './ajs/chart.directive';
import { DashboardGridstackDirective } from './ajs/dashboard-gridstack.directive';
import { FilteredSortedListDirective } from './ajs/filtered-sorted-list.directive';
import { FooComponent } from './foo.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, C8YCoreModule],
  declarations: [
    FooComponent,
    PageNotFoundComponent,
    ChartDirective,
    DashboardGridstackDirective,
    FilteredSortedListDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    C8YCoreModule,
    FooComponent,
    PageNotFoundComponent,
    ChartDirective,
    DashboardGridstackDirective,
    FilteredSortedListDirective
  ]
})
export class SharedModule {}
