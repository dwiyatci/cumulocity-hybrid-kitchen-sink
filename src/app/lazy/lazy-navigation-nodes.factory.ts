import { Injectable } from '@angular/core';
import { gettext, NavigatorNode, NavigatorNodeFactory } from '@c8y/ngx-components';

@Injectable()
export class LazyNavigationNodesFactory implements NavigatorNodeFactory {
  get(): NavigatorNode[] {
    return [
      new NavigatorNode({
        path: '/lazy',
        label: gettext('Lazy'),
        icon: 'houzz',
        priority: 99
      })
    ];
  }
}
