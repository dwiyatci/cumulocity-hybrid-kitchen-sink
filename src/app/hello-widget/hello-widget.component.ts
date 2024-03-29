import { Component, Input, OnInit } from '@angular/core';

import { HelloWidgetService } from './hello-widget.service';

@Component({
  selector: 'c8y-hello-widget',
  templateUrl: './hello-widget.component.html',
  // styles: [require('!raw-loader!less-loader!./styles.less')]
  styleUrls: ['./styles.less']
})
export class HelloWidgetComponent implements OnInit {
  data: any;

  @Input() config;

  constructor(private helloService: HelloWidgetService) {}

  ngOnInit() {
    this.helloService.getData().subscribe(data => {
      this.data = data;
    });
  }
}
