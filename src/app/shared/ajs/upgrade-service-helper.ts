import { InjectableProvider } from '@angular/core';

export function createInjectableOptions(name): { providedIn: 'root' } & InjectableProvider {
  return {
    providedIn: 'root',
    useFactory: function serviceFactory(i) {
      return i.get(name);
    },
    deps: ['$injector']
  };
}
