import { Injectable } from '@angular/core';
import { gettext, NavigatorNode, NavigatorNodeFactory } from '@c8y/ngx-components';

@Injectable()
export class SinkNavigationNodesFactory implements NavigatorNodeFactory {
  get(): NavigatorNode[] {
    return [
      new NavigatorNode({
        path: '/sink',
        label: gettext('Kitchen sink'),
        icon: 'ship',
        priority: 100
      })
    ];
  }
}
