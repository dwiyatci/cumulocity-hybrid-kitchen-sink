import { DebugElement } from '@angular/core';
import { async, ComponentFixture } from '@angular/core/testing';

import { configureTests } from '../../../testing/test-config.helper';
import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent (minimal)', () => {
  it('should create', async () => {
    const { component } = await setup();

    expect(component).toBeDefined();
  });

  function setup() {
    return configureTests(configure).then(configuredTestBed => {
      const fixture: ComponentFixture<PageNotFoundComponent> = configuredTestBed.createComponent(
        PageNotFoundComponent
      );
      const component: PageNotFoundComponent = fixture.componentInstance;

      fixture.detectChanges(); // trigger initial data binding

      const debugElement: DebugElement = fixture.debugElement;
      const nativeElement: HTMLElement = fixture.nativeElement;

      return { fixture, component, debugElement, nativeElement };
    });
  }

  function configure(testBed) {
    testBed.configureTestingModule({
      declarations: [PageNotFoundComponent]
    });
  }
});
