import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'c8y-hello-widget-config',
  templateUrl: './hello-widget-config.component.html'
})
export class HelloWidgetConfigComponent implements OnChanges, AfterViewInit {
  private defaultConfig = {
    helloText: ''
  };

  @Input() config;
  @Input() ng1FormRef;

  @ViewChild('configForm') configForm;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      Object.assign(this.config, {
        ...this.defaultConfig,
        ...this.config
      });
    }
  }

  ngAfterViewInit() {
    this.configForm.statusChanges.pipe(distinctUntilChanged()).subscribe(() => {
      // console.log(this.configForm.valid);
      // console.dir(this.ng1FormRef);
      this.ng1FormRef.$setValidity('configFormError', this.configForm.valid);
    });
  }
}
