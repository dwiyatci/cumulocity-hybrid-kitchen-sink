import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'foo',
  template: '<div>bar: {{bar | json}}</div>'
})
export class FooComponent {
  @Input() bar;
  @Output() barChange = new EventEmitter<object>();

  ngOnInit() {
    // this.bar = { baz: 43 };
    // this.barChange.emit(this.bar);

    this.bar.baz = 43;
  }
}
