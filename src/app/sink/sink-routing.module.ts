import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SinkComponent } from './sink.component';

const routes: Routes = [
  {
    path: 'sink',
    component: SinkComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SinkRoutingModule {}
