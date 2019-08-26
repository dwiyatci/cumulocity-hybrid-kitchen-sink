import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterModule as C8YRouterModule } from '@c8y/ngx-components';
import { UPGRADE_ROUTES } from '@c8y/ngx-components/upgrade';

import { SelectivePreloadingStrategy } from './core/selective-preloading-strategy';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'lazy',
    loadChildren: './lazy/lazy.module#LazyModule'
  },
  {
    path: '',
    redirectTo: '/sink',
    pathMatch: 'full'
  },
  ...UPGRADE_ROUTES,
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    C8YRouterModule.forRoot(),
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: SelectivePreloadingStrategy
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
