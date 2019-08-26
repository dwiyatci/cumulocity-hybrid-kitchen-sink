import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SinkRoutingModule } from './sink-routing.module';
import { SinkComponent } from './sink.component';

@NgModule({
  imports: [SharedModule, SinkRoutingModule],
  declarations: [SinkComponent],
  exports: []
})
export class SinkModule {}
